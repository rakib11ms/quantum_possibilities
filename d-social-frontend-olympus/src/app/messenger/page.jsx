import React from "react";
import Navbar from "../../component/navbar/page";
import MessengerMasterLayout from "@/component/AllMessengers/MessengerMasterLayout/MessengerMasterLayout";
import ChatMiddledaboard from "@/component/AllMessengers/MessengerMasterLayout/ChatMiddledaboard";
import DownloadMessengerView from "./DownloadMessengerView";

const page = () => {
    return (
        <MessengerMasterLayout>
            <DownloadMessengerView />
        </MessengerMasterLayout>
    );
};

export default page;
