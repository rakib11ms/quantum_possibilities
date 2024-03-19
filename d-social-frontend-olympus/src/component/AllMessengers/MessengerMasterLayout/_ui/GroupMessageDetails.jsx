import { host } from '@/environment';
import React from 'react';
import CameraIcon from './icons/CameraIcon';
import axiosInstance from '../../../../../utils/axios';

function GroupMessageDetails({ groupItem, handleImageClick }) {

    return (
        <>
            <div className='tas_group_info'>
                <div className='tas_group_img_container'>
                    <div className='profilesss-container'>
                        <div className='profile-img-div'>
                            <img className='tas_profile_img' src={`${host}/uploads/messenger/${groupItem?.group_image}`} alt='' />
                            <div className='tas_img_svg_overlay' onClick={handleImageClick}>
                                <CameraIcon />
                            </div>
                        </div>

                    </div>
                </div>
                <p className='tas_group_name'>{groupItem?.group_name}</p>
                <p className='tas_group_details'>Created this group with</p>
                <p className='tas_group_details'>{groupItem?.members.length} members</p>
            </div>
        </>

    );
}

export default GroupMessageDetails;