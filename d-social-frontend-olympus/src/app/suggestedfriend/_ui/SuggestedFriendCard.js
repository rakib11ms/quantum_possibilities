import React from 'react';
import "./SuggestedFriendCard.css"
import { host } from '@/environment';
import Link from 'next/link';

function SuggestedFriendCard({ profile, handleAddFriend }) {
    console.log("🚀 ~ SuggestedFriendCard ~ profile:", profile)
    return (
        <div className='tas_suggested_friend_card_wrapper'>
            <Link href={`/${profile.username}/timeline`}>
                <img src={profile?.profile_pic ? `${host}/uploads/${profile.profile_pic}` : `${host}/uploads/noimg.jpg`} className='tas_suggested_friend_card_img' />
            </Link>
            <div className='tas_suggested_friend_card_details_container'>
                <Link href={`/${profile.username}/timeline`}>
                    <p className='tas_suggested_friend_card_details_name'>{`${profile.first_name} ${profile.last_name}`}</p>
                </Link>
                <button onClick={handleAddFriend} title='addfriend' className='tas_suggested_friend_card_details_add_btn'>
                    Add Frind
                </button>
                <button title='addfriend' className='tas_suggested_friend_card_details_remove_btn'>
                    Remove
                </button>
            </div>
        </div>
    );
}

export default SuggestedFriendCard;