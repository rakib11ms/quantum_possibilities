"use client"
import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import Peer from "simple-peer"
const socket = io(host, { transports: ["websocket"] });
import { host } from '@/environment';
import axiosInstance from '../../../utils/axios';
const page = () => {
    const [authUserId, setAuthUserId] = useState("");
    const [connectedUsers, setConnectedUsers] = useState([]);
    console.log("connected users", connectedUsers)

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


    const [stream, setStream] = useState(null);
    const [callerSignal, setCallerSignal] = useState(null);
    // console.log("stream", stream)
    // const [otherUserId, setOtherUserId] = useState('6545c99d858780bf50dfc1eb');
    const [idToCall, setIdToCall] = useState('6543e01d47af2368d6697a40');
    const myVideoRef = useRef(null);
    const otherUserVideoRef = useRef(null);
    // console.log("ref", myVideoRef)

    const peerRef = useRef(null);
    const [callAccepted, setCallAccepted] = useState(false)
    const [caller, setCaller] = useState("")

    const [receivingCall, setReceivingCall] = useState(false)


    useEffect(() => {
        navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((userStream) => {
            setStream(userStream);
            myVideoRef.current.srcObject = userStream;
        });
    }, []);

    socket.on("callUser", (data) => {
        console.log("signal bac", data.signal)
        setReceivingCall(true)
        // setCaller(data.from) old
        setCallerSignal(data.signal)
    })


    const handleCall = () => {
        const peer = new Peer({
            initiator: true,
            trickle: false,
            stream: stream
        });

        peer.on("signal", (data) => {
            // console.log("Signal offer:", data);
            socket.emit("callUser", {
                userToCall: idToCall,
                signalData: data,
                // from: caller,
                from: caller,
            })
        });

        socket.on("callAccepted", (signal) => {
            setCallAccepted(true);
            console.log("answer signal", signal.signal)
            peer.signal(signal.signal)
        })

        peerRef.current = peer;
    };


    const handleAcceptCall = () => {
        setCallAccepted(true);
        const peer = new Peer({
            initiator: false,
            trickle: false,
            stream: stream
        });

        peer.on("signal", (data) => {
            console.log("Signal answer:", data);
            socket.emit("answerCall", { signal: data, to: idToCall });
        });

        peer.on("stream", (stream) => {
            otherUserVideoRef.current.srcObject = stream;
            console.log("remote1", stream)

        });

        peer.signal(callerSignal);
        peerRef.current = peer;
    };


    const handleRejectCall = () => {
        // socket.emit('rejectCall', otherUserId);
        // setCallStatus('idle');
    };



    return (
       <div>
          <h4>Video call test</h4>
          <div className="mt-5">
             {receivingCall && (
                <div>
                   <p>Incoming call from {idToCall}</p>
                   <button onClick={handleAcceptCall}>Accept Call</button>
                   <button onClick={handleRejectCall}>Reject Call</button>
                </div>
             )}
             {callAccepted && (
                <div>
                   <button>End Call</button>
                </div>
             )}
             <button onClick={handleCall}>Call User</button>
          </div>

          <div className="d-flex">
             <div className="" style={{ width: '40%', height: '300px' }}>
                <h6>My Video</h6>
                <video controls ref={myVideoRef} autoPlay id="myVideoRef" />
             </div>

             {callAccepted && (
                <div className="mx-3" style={{ width: '40%', height: '300px' }}>
                   <h6>User Video</h6>
                   <video controls ref={otherUserVideoRef} autoPlay id="otherUserVideoRef" />
                </div>
             )}
          </div>
       </div>
    );
};

export default page;




