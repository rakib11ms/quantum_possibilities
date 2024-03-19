"use client";
import React from 'react';
import "./suggestedfriend-global.modules.css";
import SuggestedFriendCard from './_ui/SuggestedFriendCard';
import axiosInstance from '../../../utils/axios';
import { toast } from "react-toastify";

function Suggestedfriend(props) {
    const [suggestionList, setSuggestionList] = React.useState([]);
    console.log("🚀 ~ Suggestedfriend ~ suggestionList:", suggestionList)

    const getPeopleMayKnow = () => {
        axiosInstance.get("/api/suggestion-list").then((res) => {
            if (res.data.status == 200) setSuggestionList(res.data.userlist);
        });
    };
    React.useEffect(() => {
        getPeopleMayKnow()
    }, [])

    const handleFriendReq = (user_id) => {
        axiosInstance
            .post("/api/send-friend-request", {
                connected_user_id: user_id
            })
            .then((res) => {
                if (res.data.status === 200) {
                    toast.success(res.data.message, {
                        position: "top-right",
                        style: {
                            background: "white",
                            color: "black",
                        },
                    });
                } else {
                    toast.error(res.data.message, {
                        position: "top-right",
                        style: {
                            background: "white",
                            color: "black",
                        },
                    });
                }

                getPeopleMayKnow();
            })
            .catch((error) => {
                toast.error("An error occurred while processing your request", {
                    position: "top-right",
                    style: {
                        background: "white",
                        color: "black",
                    },
                });
            });
    }
    return (
        <div className='tas_suggested_page_wrapper'>
            <p className='tas_suggested_page_title'>People you may know</p>
            <div className='tas_suggested_grid_wrapper'>
                {suggestionList.map((item => {
                    return <SuggestedFriendCard handleAddFriend={() => { handleFriendReq(item._id) }} profile={item} />
                }))}
            </div>
        </div>

    );
}

export default Suggestedfriend;