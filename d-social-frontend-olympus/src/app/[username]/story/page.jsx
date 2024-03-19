'use client'
import React from 'react';
import "../photo/photo.css"
import "../video/videos.css"
import "./story.css"
import { host } from '@/environment';
import axiosInstance from '../../../../utils/axios';

function page(props) {

    const [allStory, setAllStory] = React.useState([])
    const [username, setUsername] = React.useState('');

    const getAllStory = (username) => {
        axiosInstance.post('/api/get-users-latest-story', {
            username: username
        }).then((res) => {
            if (res.data.status == 200) {
                setAllStory(res.data.storylist);
            }
        })
    }
    React.useEffect(() => {
        const localStorageUserName = localStorage.getItem("username");
        setUsername(localStorageUserName);
        getAllStory(localStorageUserName)
    }, [])

    const StoryItem = ({ img }) => {
        return <div className='tas_profile_photo_item'>
            <img className='tas_story_photo' src={`${host}/uploads/story/${img}`} />
        </div>
    }
    return (
        <div className='tas_photo_wrapper'>
            <p className='tas_all_photo_grid_title'>My stories</p>
            <div className='tas_video_grid_container'>
                {allStory.length > 0 ? allStory.map(item => {
                    return <StoryItem img={item.media} />
                }) : <div className='tas_photo_grid_container'>
                    <div className='tas_profile_no_story'>
                        <p>No Stories found</p>
                    </div>
                </div>}
            </div>
        </div>
    );
}

export default page;