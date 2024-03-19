

import Modal from 'react-modal';
import React, { useEffect, useState } from 'react'
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import axiosInstance from '../../../utils/axios';
import { host } from '@/environment';




function PrivacyModal({ isOpen, onRequestClose, sendDataToParent }) {

    const [postAudience, setPostAudience] = useState([]);

    useEffect(() => {
        fetchData('');
    }, []);

    const fetchData = async (searchTerm) => {
        const postData = {
            searchTerm: searchTerm
        };
        axiosInstance.get('/api/get-post-audience').then((res) => {
            if (res.data.status == 200) {
                setPostAudience(res.data.postAudience);

            }
        })
    };

    const handleAutoComplete = (event, newInputValue) => {
        fetchData(newInputValue);
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
    return (
        <Modal isOpen={isOpen}
            style={customStyles}
            onRequestClose={onRequestClose}>
            <div className='row mx-auto'>
                <div className='col-md-6'>
                    <p className='lead'>Edit Privacy</p>

                </div>
                <div className='col-md-6 d-flex justify-content-end align-items-center'>
                    <div>
                        {/* <button onClick={onRequestClose}>Close</button> */}
                        <span onClick={onRequestClose}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
                                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                            </svg>
                        </span>
                    </div>
                </div>
                <div className='col-md-12'>
                    <b>Who can see your post?</b>
                    <p>Your post wil show up in Feed, on your profile and in search result</p>
                </div>

            </div>


            <div className='row mx-auto'>


                <div className='col-md-12'>

                    <ul className="widget w-personal-info item-block">
                        <div className="row">
                            {postAudience.map((item) => (
                                <div
                                    className="col-12 col-sm-12 col-md-12 col-lg-12"
                                    key={item.id} onClick={() => {
                                        sendDataToParent(item._id); onRequestClose();
                                    }}
                                >

                                    <div className="info-item" >
                                        <div className='row'>
                                            <div className='col-md-2'>
                                                {
                                                    item.logo !== null ? <img
                                                        src={`${host}/assets/logo/${item.logo}`} style={{ height: '25px', width: '25px', objectFit: "contain" }}
                                                    />
                                                        :
                                                        <img src={`${host}/uploads/location.png`} className="avatar " style={{ height: '25px', width: '25px', objectFit: "contain" }} />

                                                }

                                            </div>
                                            <div className='col-md-10'>
                                                <div className="info-row">
                                                    <span className="title">
                                                        {item.audience_name}
                                                    </span>

                                                </div>

                                            </div>
                                        </div>


                                    </div>
                                </div>
                            ))}
                        </div>
                    </ul>

                </div>
            </div>

        </Modal>
    )
}

export default PrivacyModal