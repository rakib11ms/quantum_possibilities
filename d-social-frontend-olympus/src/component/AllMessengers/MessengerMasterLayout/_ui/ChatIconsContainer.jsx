'use client'
import React from 'react';
import "./ChatIconsContainer.css"
import EmojiIcon2 from './icons/EmojiIcon2';
import ShareIcon from './icons/ShareIcon';
import DeleteIcon from './icons/DeleteIcon';
import ForwardIcon from './icons/ForwardIcon';
import LikeHoverGif from '@/component/Group/GroupPost/post-ui/like-share-action/LikeHoverGif';

function ChatIconsContainer({ incoming, deleteOneToOneMessages }) {
    let [emojiShow, setEmojiShow] = React.useState(false)

    const handleClick = (emoji) => {
        console.log(emoji)
    }
    
    return (
        <div className='tas_icon_container ' style={{ flexDirection: incoming ? "row-reverse" : "row" }}>
            {/* <span data-bs-toggle="tooltip" data-bs-placement="right" title="Forward">
                <ForwardIcon />
            </span> */}
            {incoming ? null :
                <span onClick={deleteOneToOneMessages} data-bs-toggle="tooltip" data-bs-placement="right" title="Delete">
                    <DeleteIcon />
                </span>}
            {/* <span data-bs-toggle="tooltip" data-bs-placement="right" title="Replay">
                <ShareIcon />
            </span> */}
            {/* <span data-bs-toggle="tooltip" style={{ position: "relative" }} onClick={() => setEmojiShow(state => !state)} data-bs-placement="right" title="Emoji">
                <EmojiIcon2 />
                {emojiShow ? <div
                    style={{
                        position: "absolute",
                        zIndex: 10,
                        width: "280px",
                        top: -11,
                        left: incoming ? 20 : -285,
                        height: "100px"
                    }}
                >
                    <LikeHoverGif handleClick={handleClick} />
                </div> : null}

            </span> */}

        </div>
    );
}

export default ChatIconsContainer;