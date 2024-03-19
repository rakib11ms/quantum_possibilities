import React, { useState } from 'react';
import "./PrivateGroupPageBlockRightView.css"
import PrivateIcon from './Icons/PrivateIcon';
import VisibilityIcon from './Icons/VisibilityIcon';
import LocationIcon from './Icons/LocationIcon';

function PrivateGroupPageBlockRightView({ about, address }) {
    const [seeMore, setSeeMore] = useState(false);

    return (
        <div className='private_group_page_block_right_view_container'>
            <p className='private_group_page_block_right_view_about_title'>About</p>
            <p className='private_group_page_block_right_view_about'>
                {seeMore ?
                    <>
                        {about}{" "}
                        <span title='see_less' className='private_group_page_block_right_view_about_button' onClick={() => { setSeeMore(false) }}>See less</span>
                    </> :
                    <>
                        {about?.slice(0, 50)}...
                        <span title='see_more' className='private_group_page_block_right_view_about_button' onClick={() => { setSeeMore(true) }}>See More</span>
                    </>
                }
            </p>
            <div className='private_group_page_block_right_view_text_title_container'>
                <PrivateIcon />
                <p className='private_group_page_block_right_view_text_title'>Private</p>
            </div>
            <p className='private_group_page_block_right_view_text'>Only members can see who's in the group and what they post.</p>
            <div className='private_group_page_block_right_view_text_title_container'>
                <VisibilityIcon />
                <p className='private_group_page_block_right_view_text_title'>Visible</p>
            </div>
            <p className='private_group_page_block_right_view_text'>Anyone can find this group.</p>
            <div className='private_group_page_block_right_view_text_title_container'>
                <LocationIcon />
                <p className='private_group_page_block_right_view_text_title'>{address}</p>
            </div>
        </div>
    );
}

export default PrivateGroupPageBlockRightView;