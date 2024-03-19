import React, { useEffect, useState } from 'react'
import Modal from 'react-modal';
import searchIcon from "../../../public/custom-svg-icon/circum_search.svg";
import groupSvg from "../../../public/custom-svg-icon/Group.svg";
import friendSvg from "../../../public/custom-svg-icon/friends.svg";
import Image from 'next/image';
import axiosInstance from '../../../utils/axios';
import { toast } from "react-toastify";


function SocialMediaModal({ isOpen, onRequestClose, page_id, pageDetails, backToParent, pageSocialMedia }) {
    console.log(page_id);
    const [socialMedia, setSocialMedia] = useState([]);
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

    const handlePageSocialLink = (e) => {
        e.preventDefault();
        const formdata = {
            page_id: page_id,
            additionalAddresses: additionalAddresses
        }

        axiosInstance.post('/api/save-pages-social-link', formdata).then((res) => {

            if (res.data.status == 200) {


                toast.success(res.data.message, {
                    position: "top-right",
                    style: {
                        background: "white",
                        color: "black",
                    },
                });
                // setSocialMedia(res.data.socialMedia)
                backToParent(res.data.pageSocialMedia)
                onRequestClose(true)
            }
        });
    }

    const [pageLink, setPageLink] = useState({
        url: '',
        media: '',
    });
    const [additionalAddresses, setAdditionalAddresses] = useState([]);

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        console.log(name);
        console.log(value);
        setPageLink({
            ...pageLink,
            [name]: value,
        });
    };
    console.log(additionalAddresses);
    const handleAddMore = () => {

        setAdditionalAddresses([...additionalAddresses, pageLink]);

        setPageLink({
            ...pageLink,
            'url': '',
            'media': ''
        })
    };

    useEffect(() => {
        axiosInstance.get('/api/get-social-media').then((res) => {

            if (res.data.status == 200) {
                setSocialMedia(res.data.socialMedia)
            }
        });

        const newAddresses = pageSocialMedia.map((item) => ({
            url: item.url,
            media: item.social_media_id._id,
        }));
        setAdditionalAddresses([...additionalAddresses, ...newAddresses]);
    }, [isOpen])


    return (
        <Modal isOpen={isOpen}
            style={customStyles}
            onRequestClose={onRequestClose}>
            <form onSubmit={handlePageSocialLink}>
                <div className="modal-content">

                    <h2 className='text-center lock-modal-header'>
                        Add Your Social Link
                    </h2>


                    <div className='p-3'>

                        <div className='row'>
                            <div className='col-md-8'>
                                <div className="form-group label-floating">
                                    <label className="control-label">URl</label>
                                    <input
                                        className="form-control"


                                        type="text"
                                        name="url"
                                        value={pageLink.url}
                                        onChange={handleFormChange}
                                    />
                                </div>
                            </div>
                            <div className='col-md-2'>
                                <div className="form-group label-floating">
                                    <label className="control-label">Media</label>
                                    <select name='media' onChange={handleFormChange}>
                                        <option value="">Select one</option>
                                        {socialMedia.map((item, index) => (
                                            <option key={item._id} value={item._id}>{item.media_name}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className='col-md-2'>
                                <button type='button' className='page-setting-save-btn' onClick={handleAddMore}>Add More</button>
                            </div>
                        </div>



                        {additionalAddresses.map((address, index) => (
                            <div className="row" key={index}>
                                <div className="col-md-8">
                                    <div className="form-group label-floating">
                                        <label className="control-label">Additional URL</label>
                                        <input
                                            required
                                            className="form-control"
                                            type="text"
                                            name={`additionalAddress${index}`}
                                            value={address.url}
                                            onChange={(e) => {
                                                const updatedAddresses = [...additionalAddresses];
                                                updatedAddresses[index] = e.target.value;
                                                setAdditionalAddresses(updatedAddresses);
                                            }}
                                        />
                                    </div>
                                </div>
                                <div className="col-md-2">
                                    <select name='media' onChange={handleFormChange} value={address.media}>
                                        <option value="">Select one</option>
                                        {socialMedia.map((item, index) => (
                                            <option key={item._id} value={item._id}>{item.media_name}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="col-md-2">
                                    <button type='button' className='page-setting-save-btn' onClick={(e) => {
                                        const updatedAddresses = [...additionalAddresses];
                                        updatedAddresses.splice(index, 1);
                                        setAdditionalAddresses(updatedAddresses);
                                    }}>Remove</button>
                                </div>
                            </div>
                        ))}




                    </div>

                    <button className='post-btton' type='submit'>Update Link </button>
                </div>
            </form>

        </Modal>
    )
}

export default SocialMediaModal
