// socket.js

const Chat = require("./models/Messenger/Chat");
const chatNotification = require("./models/Messenger/ChatNotification");
const GroupChat = require("./models/Messenger/GroupChat");
const GroupChatInfo = require("./models/Messenger/GroupChatInfo");
const User = require("./models/User");
const fs = require("fs");

const handleSocketConnection = (io) => {
  const emailToSocketIdMap = new Map();
  const socketidToEmailMap = new Map();

  let users = [];
  const addUser = (userId, socketId) => {
    if (userId.trim() !== "") {
      !users.some((user) => user.userId === userId) &&
        users.push({ userId, socketId });
    }
  };
  const removeUser = (socketId) => {
    users = users.filter((user) => user.socketId !== socketId);
  };

  io.on("connection", (socket) => {
    console.log("A user connected", socket.id);
    socket.on("addUser", (userId) => {
      addUser(userId, socket.id);
      io.emit("getUsers", users);
    });
    // console.log("users",users)

    socket.on(
      "joinGroup",
      async ({ groupId, message, userId, sender_id, file }) => {
        const fileData = file;
        try {
          // Fetch group members from the database based on groupId
          const group = await GroupChatInfo.findById(groupId);

          if (group && group.members && Array.isArray(group.members)) {
            let uniqueFileName;
            // Handle the file data if available
            if (fileData) {
              const base64Data = fileData.base64Data;
              const fileName = fileData.fileName;
              // Generate a unique filename
              uniqueFileName = generateUniqueFileName(fileName);
              // Save file to a folder (for demonstration purposes)
              fs.writeFileSync(
                `uploads/${uniqueFileName}`,
                Buffer.from(base64Data, "base64")
              );
            }

            const groupMembers = group.members.map((member) =>
              member.toString()
            );
            console.log("group members", groupMembers);

            // Filter connected users by group members
            const groupUsers = users.filter((user) =>
              groupMembers.includes(user.userId)
            );
            // const groupUsers = users.filter((user) => {return user});
            console.log("group users", groupUsers);
            try {
              const newGroupMessage = new GroupChat({
                group_id: groupId,
                message: message,
                sender_id: sender_id,
                file: file?.fileName !== undefined ? uniqueFileName : undefined,
                // Add other relevant fields as needed
              });

              await newGroupMessage.save();

              const populatedChat = await GroupChat.findById(
                newGroupMessage._id
              ).populate(
                "sender_id",
                "first_name last_name email username profile_pic"
              );
              // Emit a message to the users in the group
              groupUsers.forEach((user) => {
                io.to(user.socketId).emit("newGroupMessage", {
                  status: 200,
                  data: populatedChat,
                });
              });
            } catch (error) {
              console.log(error);
            }

            // // Join all group users to the room based on the group ID
            // groupUsers.forEach((user) => {
            //     socket.join(groupId);
            // });

            // // Emit a message to all users in the group room
            // io.to(groupId).emit('newGroupMessage', { groupId, message: 'Hello Group!' });
          } else {
            console.error("Group or members not found.");
          }
        } catch (error) {
          console.error("Error fetching group members:", error);
        }
      }
    );

    socket.on("user_message", async (data) => {
      try {
        const message = data && data.message;
        const sender_id = data && data.sender_id;
        const receiver_id = data && data.receiver_id;
        const fileData = data && data.file;

        let uniqueFileName;
        // Handle the file data if available
        if (fileData) {
          const base64Data = fileData.base64Data;
          const fileName = fileData.fileName;
          // Generate a unique filename
          uniqueFileName = generateUniqueFileName(fileName);
          // Save file to a folder (for demonstration purposes)
          fs.writeFileSync(
            `uploads/${uniqueFileName}`,
            Buffer.from(base64Data, "base64")
          );
        }

        // Check if either message or file is present before saving
        if (message || uniqueFileName) {
          const chat = new Chat({
            message: data.message,
            sender_id: data.sender_id,
            receiver_id: data.receiver_id,
            file:
              data.file?.fileName !== undefined ? uniqueFileName : undefined,
          });

          await chat.save();

          const data_save = new chatNotification({
            sender_id: data.sender_id,
            receiver_id: data.receiver_id,
          });
          await data_save.save();

          // Populate the sender and receiver fields
          const populatedChat = await Chat.findById(chat._id)
            .populate(
              "sender_id",
              "first_name last_name email username profile_pic"
            )
            .populate(
              "receiver_id",
              "first_name last_name email username profile_pic"
            );

          // // Emit the message to the sender's room
          // io.emit("message", {
          //     status: 200,
          //     data: populatedChat,
          // });

          // Emit the message to the sender's room
          const senderSocket = users.find((user) => user.userId === sender_id);
          console.log("🚀 ~ socket.on ~ senderSocket:", senderSocket);
          if (senderSocket) {
            io.to(senderSocket.socketId).emit("message", {
              status: 200,
              data: populatedChat,
            });
          }

          // Emit the message to the receiver's room
          const receiverSocket = users.find(
            (user) => user.userId === receiver_id
          );
          console.log("🚀 ~ socket.on ~ receiverSocket:", receiverSocket);
          if (receiverSocket) {
            io.to(receiverSocket.socketId).emit("message", {
              status: 200,
              data: populatedChat,
            });
            // io.to(receiverSocket.socketId).emit("messageNotification", {
            //     status: 200,
            //     data: "A new message came",
            // });
          }
        }
        console.log("users", users);
      } catch (error) {
        console.error("Error handling user_message:", error);
        // Handle errors during the process
      }
    });

    socket.on("messageNotification", (data) => {
      try {
        const receiverSocket = users.find(
          (user) => user.userId === data.receiver_id
        );
        // console.log("receiverSocket", receiverSocket);

        if (receiverSocket) {
          io.to(receiverSocket.socketId).emit("getMessageNotification", data);
        }
      } catch (error) {
        console.error("Error sending message notification:", error);
      }
    });

    // Handle the "deleteMessage" event
    socket.on("deleteMessage", (data) => {
      console.log("test", data);
      try {
        // Find the receiver's socket information based on the sender's data
        const receiverSocket = users.find(
          (user) => user.userId === data.receiver_id
        );
        const senderSocket = users.find(
          (user) => user.userId === data.sender_id
        );

        // Log the receiver's socket information (for debugging purposes)
        console.log("receiverSocket", receiverSocket);

        // If the receiver's socket is found, emit the "deleteMessage" event to that socket
        if (receiverSocket) {
          io.to(receiverSocket.socketId).emit("getDeleteMessage", data);
        }
        if (senderSocket) {
          io.to(senderSocket.socketId).emit("getDeleteMessage", data);
        }
      } catch (error) {
        console.error("Error sending message notification:", error);
      }
    });

    // Handle the "delete Gropup single Message" event
    socket.on("deleteGroupSingleMessage", async (data) => {
      console.log("delete group ", data);
      try {
        // Find the receiver's socket information based on the sender's data
        const group = await GroupChatInfo.findById(data.groupId);
        if (group && group.members && Array.isArray(group.members)) {
          const groupMembers = group.members.map((member) => member.toString());

          const groupUsers = users.filter((user) =>
            groupMembers.includes(user.userId)
          );
          groupUsers.forEach((user) => {
            io.to(user.socketId).emit("getDeleteGroupSingleMessage", {
              status: 200,
              data,
            });
          });
        }
      } catch (error) {
        console.error("Error sending message notification:", error);
      }
    });

    // const getGroupMembersFromDatabase = async (groupId) => {
    //     try {
    //         const group = await GroupChatInfo.findById(groupId);
    //         if (group && group.members && Array.isArray(group.members)) {
    //             // Extract user IDs from the resolved members and convert ObjectId to string
    //             const groupMembers = group.members.map(member => member.toString());

    //             console.log("dd",groupMembers)
    //             return groupMembers;

    //         } else {
    //             // Return an empty array if the group or members are not found
    //             return [];
    //         }
    //     } catch (error) {
    //         console.error("Error fetching group members:", error);
    //         // Handle the error appropriately (e.g., logging, returning a default value, etc.)
    //         return [];
    //     }
    // };

    // console.log("connected users",users)

    // Handle call initiation
    // socket.on("callUser", (data) => {
    //   const userToCallSocket = users.find(
    //     (user) => user.userId === data.userToCall
    //   );
    //   if (userToCallSocket) {
    //     io.to(userToCallSocket.socketId).emit("callUser", {
    //       signal: data.signalData,
    //       from: data.from,
    //     });
    //   } else {
    //     // Handle the case where the user to call is not found
    //     console.log(`User ${data.userToCall} not found.`);
    //     socket.emit("callFailed", { message: "User not found." });
    //   }
    // });

    // // Answer call event
    // socket.on("answerCall", (data) => {
    //   const receiverSocket = users.find((user) => user.userId === data.to);
    //   console.log("Boom", data);

    //   if (receiverSocket) {
    //     io.to(receiverSocket.socketId).emit("callAccepted", {
    //       signal: data.signal,
    //     });
    //   } else {
    //     // Handle the case where the receiver socket is not found
    //     console.log(`Receiver socket for user ${data.to} not found.`);
    //     socket.emit("callFailed", { message: "Receiver not found." });
    //   }
    // });

    // socket.on("disconnect", async () => {
    //   console.log("A user is disconnected");

    //   const disconnectedUser = users.find((user) => user.socketId == socket.id);
    //   console.log("socket.id", socket.id);
    //   console.log("users", users);

    //   console.log("user discon", disconnectedUser);

    //   try {
    //     if (disconnectedUser) {
    //       const disconnect = {
    //         time: () => {
    //           return new Date(); // Replace this with your actual disconnection time logic
    //         },
    //       };
    //       // Calculate the offline time
    //       const offlineTime = disconnect.time(); // You need to implement this function

    //       // Update only the offline_time field
    //       await User.findByIdAndUpdate(disconnectedUser.userId, {
    //         $set: { last_login: offlineTime },
    //       });
    //     }
    //   } catch (error) {
    //     console.error("Error updating offline_time:", error);
    //   }

    //   removeUser(socket.id);
    //   io.emit("getUsers", users);
    // });

    // video chat app

    socket.on("room:join", (data) => {
      const { email, room } = data;
      emailToSocketIdMap.set(email, socket.id);
      socketidToEmailMap.set(socket.id, email);
      io.to(room).emit("user:joined", { email, id: socket.id });
      socket.join(room);
      io.to(socket.id).emit("room:join", data);
      console.log("data", data);
      console.log("socket", socket.id);
    });

    socket.on("user:call", ({ to, offer }) => {
      io.to(to).emit("incomming:call", { from: socket.id, offer });
    });

    socket.on("call:accepted", ({ to, ans }) => {
      io.to(to).emit("call:accepted", { from: socket.id, ans });
    });

    socket.on("peer:nego:needed", ({ to, offer }) => {
      console.log("peer:nego:needed", offer);
      io.to(to).emit("peer:nego:needed", { from: socket.id, offer });
    });

    socket.on("peer:nego:done", ({ to, ans }) => {
      console.log("peer:nego:done", ans);
      io.to(to).emit("peer:nego:final", { from: socket.id, ans });
    });
  });
};

module.exports = { handleSocketConnection };

// Function to generate a unique filename
const generateUniqueFileName = (originalFileName) => {
  const timestamp = Date.now();
  const randomString = Math.random().toString(36).substring(2, 8);
  const fileExtension = originalFileName.split(".").pop(); // Get the file extension

  // Combine the original filename, timestamp, and random string to create a unique filename
  return `${originalFileName}_${timestamp}_${randomString}.${fileExtension}`;
};
