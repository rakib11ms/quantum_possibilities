import React from "react";
import "./suggestedfriend-global.modules.css";
import Leftsidebar from "@/component/leftsidebar/page";

import Navbar from "@/component/navbar/page";

export default function SuggestedfriendLayout({ children }) {
    return (
        <div className="master__layout">
            <Navbar />
            <div className="tas_suggested_friend_wrapper">
                <div>
                    <Leftsidebar />
                </div>
                <div>
                    {children}
                </div>
            </div>
        </div>
    );
}
