import React, { useState } from 'react'
import Modal from 'react-modal';
import { liveurl } from "@/environment";
import { toast } from "react-toastify";
import axiosInstance from '../../../utils/axios';



function PageSettings({ isOpen, onRequestClose, setting_type, page_id }) {
    const [data, setData] = useState(null);
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

    const handlePageSettings = () => {

        const formData = {
            page_id: page_id,
            setting_type: setting_type,
        }
        axiosInstance.post('/api/update-page-settings', formData).then((res) => {
            if (res.data.status == 200) {
                setData("");
                toast.success(res.data.message, {
                    position: "top-right",
                    style: {
                        background: "white",
                        color: "black",
                    },
                })
                onRequestClose(false);
            }
        })
    }

    return (
        <Modal isOpen={isOpen}
            style={customStyles}
            onRequestClose={onRequestClose}>
            <div className="modal-content">

                <h4 className='text-center lock-modal-header'>
                    Update Your {setting_type}
                </h4>


                <p className='text-center'>Your personalized your QP Page</p>

                <div className='p-3'>
                    <ul className="notification-list privacy-list">
                        <li>
                            <input type="text" value={data} onChange={(e) => {
                                setData(e.target.value)
                            }} />
                        </li>



                    </ul>

                </div>

                <button className='post-btton' onClick={handlePageSettings}>Update</button>
            </div>
        </Modal>
    )
}

export default PageSettings
