import React, { useEffect, useState } from 'react'
import Modal from 'react-modal';
import searchIcon from "../../../public/custom-svg-icon/circum_search.svg";
import groupSvg from "../../../public/custom-svg-icon/Group.svg";
import friendSvg from "../../../public/custom-svg-icon/friends.svg";
import Image from 'next/image';
import axiosInstance from '../../../utils/axios';
import { toast } from "react-toastify";


function PageAddressModal({ isOpen, onRequestClose, page_id, pageDetails, backToParent }) {
    console.log(page_id);
    useEffect(() => {
        setAddressData({
            ...addressData,
            '_id': page_id,
            'address': pageDetails.address,
            'zip_code': pageDetails.zip_code,
            'city': pageDetails.city
        })
    }, [])
    const customStyles = {
        overlay: {
            zIndex: 1001,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
        },
        content: {

            maxWidth: '50%',
            height: '55%',
            margin: 'auto',
        },

    };


    const [addressData, setAddressData] = useState({
        _id: '',
        address: '',
        zip_code: '',
        city: ''
    });

    const handleFormChange = (e) => {
        setAddressData({
            ...addressData, [e.target.name]: e.target.value
        })
    }
    console.log(addressData)

    const handleUpdateAddress = () => {
        axiosInstance.post('/api/update-address-info', addressData).then((res) => {

            if (res.data.status == 200) {


                toast.success(res.data.message, {
                    position: "top-right",
                    style: {
                        background: "white",
                        color: "black",
                    },
                });
                backToParent(res.data.pageDetails)
                onRequestClose(true)
            }
        });
    }
    return (
        <Modal isOpen={isOpen}
            style={customStyles}
            onRequestClose={onRequestClose}>
            <div className="modal-content">

                <h2 className='text-center lock-modal-header'>
                    Update Your Page Address
                </h2>


                <div className='p-3'>
                    <ul className="notification-list privacy-list">

                        <div className="form-group label-floating">
                            <label className="control-label">Address</label>
                            <input
                                className="form-control"


                                type="text"
                                name="address"
                                value={addressData.address}
                                onChange={handleFormChange}
                            />
                        </div>

                        <div className="form-group label-floating">
                            <label className="control-label">City</label>
                            <input
                                className="form-control"


                                type="text"
                                name="city"
                                value={addressData.city}
                                onChange={handleFormChange}
                            />
                        </div>

                        <div className="form-group label-floating">
                            <label className="control-label">Zip Code</label>
                            <input
                                className="form-control"


                                type="text"
                                name="zip_code"
                                value={addressData.zip_code}
                                onChange={handleFormChange}
                            />
                        </div>



                    </ul>

                </div>

                <button className='post-btton' onClick={handleUpdateAddress}>Update Address </button>
            </div>
        </Modal>
    )
}

export default PageAddressModal
