"use client"
import React, { useState, useEffect } from "react";
import Navbar from "../../../component/navbar/page";
import MessengerMasterLayout from "@/component/AllMessengers/MessengerMasterLayout/MessengerMasterLayout";
import ChatMiddledaboard from "@/component/AllMessengers/MessengerMasterLayout/ChatMiddledaboard";
// import { useRouter } from "next/navigation";
import { useParams } from 'next/navigation'

import io from "socket.io-client"
import { host } from "@/environment";
const socket = io(host);

const page = () => {
    const params = useParams()
    useEffect(() => {
        // Component did mount
        console.log('Socket connected');

        // Specify cleanup when the component unmounts
        return () => {
            console.log('Socket disconnected');
            socket.disconnect();
        };
    }, []);

    socket.on("message", (message) => {
        console.log("socket message", message);
    })

    return (
        <MessengerMasterLayout>
            <ChatMiddledaboard />
        </MessengerMasterLayout>
    );
};

export default page;