// socket.js

const Chat = require("./models/Messenger/Chat");
const fs = require('fs');


let users = [];
const addUser = (userId, socketId) => {
    !users.some((user) => user.userId === userId) && users.push({ userId, socketId });
}
const removeUser = (socketId) => {
    users = users.filter((user) => user.socketId !== socketId)
}
const handleSocketConnection = (io) => {
    io.on("connection", (socket) => {
        console.log('A user connected', socket.id);
        socket.on("addUser", (userId) => {
            addUser(userId, socket.id)
            io.emit("getUsers", users)
        })

        // socket.on('user_message', async (data) => {
        //     // console.log("bal", data)
        //     try {
        //         const message = data && data.message;
        //         const sender_id = data && data.sender_id;
        //         const receiver_id = data && data.receiver_id;
        //         const fileData = data && data.file;

        //         let uniqueFileName;
        //         // Handle the file data if available
        //         if (fileData) {
        //             const base64Data = fileData.base64Data;
        //             const fileName = fileData.fileName;
        //             // Generate a unique filename
        //             uniqueFileName = generateUniqueFileName(fileName);
        //             // Save file to a folder (for demonstration purposes)
        //             fs.writeFileSync(`uploads/${uniqueFileName}`, Buffer.from(base64Data, 'base64'));
        //         }

        //         // Check if either message or file is present before saving
        //         if (message || uniqueFileName) {
        //             const chat = new Chat({
        //                 message: data.message,
        //                 sender_id: data.sender_id,
        //                 receiver_id: data.receiver_id,
        //                 file: data.file?.fileName !== undefined ? uniqueFileName : undefined
        //             });

        //             await chat.save();

        //             // Populate the sender and receiver fields
        //             const populatedChat = await Chat.findById(chat._id)
        //                 .populate('sender_id', 'first_name last_name email username profile_pic')
        //                 .populate('receiver_id', 'first_name last_name email username profile_pic');

        //             // Emit the message to the sender's room

        //             io.emit("message", {
        //                 status: 200,
        //                 data: populatedChat,
        //             });
        //         }
        //         console.log("users", users)

        //     } catch (error) {
        //         console.error("Error handling user_message:", error);
        //         // Handle errors during the process
        //     }

        // });




        socket.on('user_message', async (data) => {
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
                                fs.writeFileSync(`uploads/${uniqueFileName}`, Buffer.from(base64Data, 'base64'));          
                                 }
        
                // Check if either message or file is present before saving
                if (message || uniqueFileName) {
                    const chat = new Chat({
                        message: data.message,
                        sender_id: data.sender_id,
                        receiver_id: data.receiver_id,
                        file: data.file?.fileName !== undefined ? uniqueFileName : undefined
                    });
        
                    await chat.save();
        
                    // Populate the sender and receiver fields
                    const populatedChat = await Chat.findById(chat._id)
                        .populate('sender_id', 'first_name last_name email username profile_pic')
                        .populate('receiver_id', 'first_name last_name email username profile_pic');
        
                    // // Emit the message to the sender's room
                    // io.emit("message", {
                    //     status: 200,
                    //     data: populatedChat,
                    // });

                       // Emit the message to the sender's room
            const senderSocket = users.find(user => user.userId === sender_id);
            if (senderSocket) {
                io.to(senderSocket.socketId).emit("message", {
                    status: 200,
                    data: populatedChat,
                });
            }
        
                    // Emit the message to the receiver's room
                    const receiverSocket = users.find(user => user.userId === receiver_id);
                    if (receiverSocket) {
                        io.to(receiverSocket.socketId).emit("message", {
                            status: 200,
                            data: populatedChat,
                        });
                    }
                }
                console.log("users", users);
        
            } catch (error) {
                console.error("Error handling user_message:", error);
                // Handle errors during the process
            }
        });
        
        // Handling user disconnection
        socket.on("disconnect", () => {
            console.log("A user is disconnected");
            removeUser(socket.id)
            io.emit("getUsers", users)

        });
    });
};


module.exports = { handleSocketConnection };



// Function to generate a unique filename
const generateUniqueFileName = (originalFileName) => {
    const timestamp = Date.now();
    const randomString = Math.random().toString(36).substring(2, 8);
    const fileExtension = originalFileName.split('.').pop(); // Get the file extension

    // Combine the original filename, timestamp, and random string to create a unique filename
    return `${originalFileName}_${timestamp}_${randomString}.${fileExtension}`;
};






