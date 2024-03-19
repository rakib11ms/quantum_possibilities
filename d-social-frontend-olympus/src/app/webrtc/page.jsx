"use client";
import Masterdashboardlayout from '@/component/Masterdashboardlayout/Masterdashboardlayout';
import React, { useState, useEffect, useRef } from 'react';
import Peer from 'simple-peer';
import { host } from "@/environment";
import io from "socket.io-client";
import axiosInstance from '../../../utils/axios';

const socket = io(host, { transports: ["websocket"] });

function Page() {
    const [authUserId, setAuthUserId] = useState("");
    const [connectedUsers, setConnectedUsers] = useState([]);
    const [stream, setStream] = useState(null);
    const [otherUser, setOtherUser] = useState(null);
    const [incomingCall, setIncomingCall] = useState(null);
    const [isReceivingCall, setIsReceivingCall] = useState(false);
    const myAudioRef = useRef();
    const otherUserAudioRef = useRef();
    const peerRef = useRef();

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

    const callUser = (userId, stream) => {
        const peer = new Peer({
            initiator: true,
            trickle: false,
            stream: stream,
        });

        peer.on('signal', (data) => {
            socket.emit('offer', { userIdToCall: userId, signalData: data });
        });

        peer.on('stream', (remoteStream) => {
            otherUserAudioRef.current.srcObject = remoteStream;
        });

        socket.on('answer', (signal) => {
            peer.signal(signal);
            setOtherUser(userId);
        });

        socket.on('ice-candidate', (candidate) => {
            peer.addIceCandidate(candidate);
        });

        peerRef.current = peer;
    };

    const receiveCall = () => {
        console.log('Receiving call...');

        const acceptCall = () => {
            console.log('Accepting call...');
            const peer = new Peer({
                initiator: false,
                trickle: false,
                stream: stream,
            });

            peer.on('signal', (data) => {
                socket.emit('answer', { signalData: data, callerId: incomingCall.callerId });
            });

            peer.on('stream', (remoteStream) => {
                otherUserAudioRef.current.srcObject = remoteStream;
            });

            socket.on('ice-candidate', (candidate) => {
                peer.addIceCandidate(candidate);
            });

            setOtherUser(incomingCall.callerId);
            setIncomingCall(null);
            peer.signal(incomingCall.signal); // Corrected this line
            peerRef.current = peer;
        };

        return (
            <div>
                <p>{`Incoming call from ${incomingCall.callerId}`}</p>
                <button onClick={acceptCall}>Accept</button>
                <button onClick={rejectCall}>Reject</button>
            </div>
        );
    };

    const handleCallUserClick = () => {
        const userIdToCall = prompt('Enter user ID to call:');
        if (userIdToCall && userIdToCall.trim() !== '') {
            callUser(userIdToCall.trim(), stream);
        } else {
            console.log('Invalid user ID provided.');
        }
    };

    const endCall = () => {
        if (peerRef.current) {
            peerRef.current.destroy();
        }
        setOtherUser(null);
    };

    useEffect(() => {
        navigator.mediaDevices.getUserMedia({ video: false, audio: true })
            .then((myStream) => {
                setStream(myStream);
                myAudioRef.current.srcObject = myStream;

                socket.emit('join-room', 'user123');

                socket.on('other-user-connected', (otherUserId) => {
                    callUser(otherUserId, myStream);
                });

                socket.on('incoming-call', ({ signal, callerId }) => {
                    console.log('Received incoming call:', { signal, callerId });
                    setIncomingCall({ callerId, signal });
                    setIsReceivingCall(true);
                });

                socket.on('call-rejected', () => {
                    alert('Call rejected by the other user.');
                    endCall();
                });

            })
            .catch((error) => console.error('Error accessing microphone:', error));

        return () => {
            if (peerRef.current) {
                peerRef.current.destroy();
                setOtherUser(null);
            }
        };
    }, []);

    return (
        <Masterdashboardlayout>
            <div className="App">
                <div>
                    <audio ref={myAudioRef} autoPlay muted></audio>
                    {otherUser && <audio ref={otherUserAudioRef} autoPlay></audio>}
                </div>
                {!otherUser && !isReceivingCall && <button onClick={handleCallUserClick}>Call User</button>}
                {isReceivingCall && receiveCall()}
                {otherUser && <button onClick={endCall}>End Call</button>}
            </div>
        </Masterdashboardlayout>
    );
}

export default Page;
