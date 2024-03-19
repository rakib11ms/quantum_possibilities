"use client"
import React, { useState, useEffect, useRef } from "react";
import { host } from "@/environment";
import io from "socket.io-client"
import axiosInstance from "../../../utils/axios";
const socket = io(host, { transports: ["websocket"] });

const page = () => {
    const [authUserId, setAuthUserId] = useState("");
    const [connectedUsers, setConnectedUsers] = useState([]);

    useEffect(() => {
        if (typeof window !== "undefined") {
            const localUserInfo = localStorage.getItem("userInfo");

            if (localUserInfo) {
                setAuthUserId(JSON.parse(localUserInfo)[0]._id);
            }
        }
    }, []);

    useEffect(() => {
        const socket = io(host);
        const handleGetUsers = users => {
            if (connectedUsers.length !== users.length) {
                setConnectedUsers(users);
            }
        };

        socket.on("getUsers", handleGetUsers);
        return () => {
            socket.off("getUsers", handleGetUsers);
            socket.disconnect();
        };
    }, [connectedUsers]);

    useEffect(() => {
        if (authUserId) {
            socket.emit("addUser", authUserId);
        }
    }, [authUserId]);

    // const [allGroupIds, setAllGroupIds] = useState([]);
    // console.log("alls", allGroupIds)
    // useEffect(() => {
    //     axiosInstance.get("/api/get-all-group-chat-info").then(res => {
    //         setAllGroupIds(res.data.all_group)
    //     })
    // }, [])

    const [receiveMessage, setReceiveMessage] = useState("")


    const [message, setMessage] = useState("")
    const handleMessageChange = (e) => {
        setMessage(e.target.value)
    }
    // socket.emit('joinGroup', { groupId: '65c8579293ecc4f2f893b594', userId: authUserId });

    // const submitMessage=(e)=>{
    //     socket.emit('joinGroup', { groupId: '65c84e38a03a3450d4372c0d', message, userId: authUserId, sender_id: authUserId });

    //     // socket.emit('sendMessage', { groupId: '65c84e38a03a3450d4372c0d', message:message, userId: authUserId });
    // //     allGroupIds.forEach(groupId => {
    // //         socket.emit('sendMessage', { groupId: groupId._id, message, userId: authUserId, sender_id: authUserId });
    // // });
    // }
    // // console.log("users", connectedUsers);

    // socket.on('newGroupMessage',(test)=>{
    //     console.log("newMessage",test)
    // })



    // // // Emit 'joinGroup' events for each group
    // // allGroupIds.forEach(groupId => {
    // //     socket.emit('joinGroup', { groupId:groupId._id, userId: authUserId });
    // // });

    const data = {
        sender_id: authUserId,
        message: message
    }
    const submitMessage = (e) => {
        e.preventDefault();
        // alert("submitted")
        socket.emit("user_message", data)
    }

    socket.on("message", (receive) => {
        console.log("receive", receive)
        setReceiveMessage(receive.data.message)
    })
    return (
        <div className="bg-white container" style={{ height: "90vh" }}>
            {/* <h3>Testing  chat</h3> */}

            <h4> {receiveMessage}</h4>

            {/* Render connected users (you can modify this based on your UI) */}
            <div>
                Connected Users:
                <ul>
                    {connectedUsers.map(user => (
                        <li key={user.userId}>{user.userId}</li>
                    ))}
                </ul>
            </div>

            {/* Input field and button for sending messages */}
            <input type="text" className="form-control-sm mt-5" value={message} onChange={handleMessageChange} />
            <button className="btn btn-success mt-3" onClick={submitMessage}>
                Submit
            </button>
        </div>
    )
}


export default page