

import Modal from 'react-modal';
import React, { useEffect, useState } from 'react'
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import axiosInstance from '../../../utils/axios';
import { host } from '@/environment';
import { toast } from "react-toastify";



function InviteForPage({ isOpen, onRequestClose, selectedPageId }) {
    const [friendList, setFriendList] = useState([]);


    const [username, setUsername] = useState("");



    useEffect(() => {
        const localStorageUserName = localStorage.getItem("username");
        setUsername(localStorageUserName);
        fetchData(localStorageUserName);
    }, []);

    const fetchData = async (username) => {
        const formData = {
            username: username,
        };
        axiosInstance.post('/api/friend-list', formData).then((res) => {
            if (res.data.status == 200) {
                setFriendList(res.data.results);

            }
        })
    };

    const handleAutoComplete = (event, newInputValue) => {
        fetchData(newInputValue);
    };


    const [checkboxStates, setCheckboxStates] = useState({});

    const handleCheckboxChange = (itemId) => {
        console.log(itemId)
        setCheckboxStates((prevState) => ({
            ...prevState,
            [itemId]: !prevState[itemId],
        }));
    };
    const customStyles = {
        overlay: {
            zIndex: 1001,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
        },
        content: {

            maxWidth: '35%',
            height: '60%',
            margin: 'auto',
        },

    };

    const handleInvitation = () => {
        const formdata = {
            page_id: selectedPageId,
            user_id_arr: checkboxStates
        }
        axiosInstance.post('/api/send-page-invitation', formdata).then((res) => {
            if (res.data.status == 200) {
                toast.success("Post reaction updated", {
                    position: "top-right",
                    style: {
                        background: "white",
                        color: "black",
                    },
                });
                onRequestClose(false)
            }
        })
    }

    return (
        <Modal isOpen={isOpen}
            style={customStyles}
            onRequestClose={onRequestClose}>
            <div className='row mx-auto'>
                <div className='col-md-8'>
                    <p className='lead'>Invite Your connection to this pages</p>
                </div>
                <div className='col-md-4 d-flex justify-content-end align-items-center'>
                    <div>
                        {/* <button onClick={onRequestClose}>Close</button> */}
                        <span onClick={onRequestClose}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
                                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                            </svg>
                        </span>
                    </div>
                </div>
            </div>
            <div className='row mx-auto'>

                <div className='col-md-12 mt-5'>
                    <h6>
                        <b>
                            Suggestions
                        </b>
                    </h6>
                </div>
                <div className='col-md-12'>

                    <ul className="widget w-personal-info item-block">
                        <div className="row">
                            {friendList.map((item) => (
                                <div
                                    className="col-12 col-sm-12 col-md-12 col-lg-12"
                                    key={item.id}
                                >

                                    <div className="info-item">
                                        {item.user_id?.username == username ?
                                            <div className='row'>
                                                <div className='col-md-2'>
                                                    {
                                                        item.connected_user_id?.profile_pic !== null ? <img
                                                            src={`${host}/uploads/${item.connected_user_id?.profile_pic}`} style={{ height: '25px', width: '25px', objectFit: "contain" }}
                                                        />
                                                            :
                                                            <img src={`${host}/uploads/location.png`} className="avatar " style={{ height: '25px', width: '25px', objectFit: "contain" }} />

                                                    }

                                                </div>
                                                <div className='col-md-8'>
                                                    <div className="info-row">
                                                        <span className="title">
                                                            {item.connected_user_id?.first_name}{" "} {item.connected_user_id?.last_name}
                                                        </span>

                                                    </div>
                                                    <div className="info-row">
                                                        <span className="text">

                                                        </span>
                                                    </div>
                                                </div>
                                                <div className='col-md-2 text-right'>
                                                    <div className='float-right'>
                                                        <input
                                                            type="checkbox"
                                                            checked={checkboxStates[item.connected_user_id?._id] || false}
                                                            onChange={() => handleCheckboxChange(item.connected_user_id?._id)}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            :
                                            <div className='row'>
                                                <div className='col-md-2'>
                                                    {
                                                        item.user_id?.profile_pic !== null ? <img
                                                            src={`${host}/uploads/${item.user_id?.profile_pic}`} style={{ height: '25px', width: '25px', objectFit: "contain" }}
                                                        />
                                                            :
                                                            <img src={`${host}/uploads/location.png`} className="avatar " style={{ height: '25px', width: '25px', objectFit: "contain" }} />

                                                    }

                                                </div>
                                                <div className='col-md-8'>
                                                    <div className="info-row">
                                                        <span className="title">
                                                            {item.user_id?.first_name}{" "} {item.user_id?.last_name}
                                                        </span>

                                                    </div>
                                                    <div className="info-row">
                                                        <span className="text">

                                                        </span>
                                                    </div>
                                                </div>
                                                <div className='col-md-2 text-right'>
                                                     <div className='float-right'>
                                                    <input
                                                        type="checkbox"
                                                        checked={checkboxStates[item.user_id?._id] || false}
                                                        onChange={() => handleCheckboxChange(item.user_id?._id)}
                                                    />
                                                    </div>
                                                </div>
                                            </div>
                                        }


                                    </div>
                                </div>
                            ))}
                        </div>
                        <button className='post-btton' onClick={handleInvitation}>Send Invitation </button>
                    </ul>

                </div>
            </div>

        </Modal>
    )
}

export default InviteForPage