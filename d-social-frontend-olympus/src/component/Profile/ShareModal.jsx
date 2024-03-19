import React from 'react'
import Modal from 'react-modal';
import { frontendHost } from "@/environment";
import { toast } from "react-toastify";

function ShareModal({ isOpen, onRequestClose, username }) {
    const customStyles = {
        overlay: {
            zIndex: 1001,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
        },
        content: {
            top: '50%',
            left: '50%',
            width: '30%',
            minHeight: '100px',
            right: 'auto',
            // bottom: 'auto',
            // marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
        },
    };

    const copyToClipboard = () => {
        const inputValue = frontendHost + '/profile/' + username;
        navigator.clipboard.writeText(inputValue)
            .then(() => {

                toast.success("URL Copied", {
                    position: "top-right",
                    style: {
                        background: "white",
                        color: "black",
                    },
                });
            })
            .catch((error) => {
                console.error('Failed to copy text: ', error);
            });

    };

    return (
        <Modal isOpen={isOpen}
            style={customStyles}
            onRequestClose={onRequestClose}>
            <div className="modal-content">

                <h2 className='text-center lock-modal-header'>
                    Your Profile Link
                </h2>


                <p className='text-center'>Your personalized link on QP</p>

                <div className='p-3'>
                    <ul className="notification-list privacy-list">
                        <li>
                            <input type="text" value={`${frontendHost}/profile/${username}`} readOnly />
                        </li>



                    </ul>

                </div>

                <button className='post-btton' onClick={copyToClipboard}>Copy Link</button>
            </div>
        </Modal>
    )
}

export default ShareModal
