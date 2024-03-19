'use client'
import React from 'react';
import "./photo.css"
import "../video/videos.css"
import { host } from '@/environment';
import axiosInstance from '../../../../utils/axios';

function page(props) {
    const [allPhotos, setAllPhotos] = React.useState([])
    const [username, setUsername] = React.useState('');

    const getAllPhotos = (username) => {
        axiosInstance.post('/api/get-users-latest-image', {
            username: username
        }).then((res) => {
            if (res.data.status == 200) {
                setAllPhotos(res.data.posts);
            }
        })
    }
    React.useEffect(() => {
        const localStorageUserName = localStorage.getItem("username");
        setUsername(localStorageUserName);
        getAllPhotos(localStorageUserName)
    }, [])

    const PhotoItem = ({ img }) => {
        return <div className='tas_profile_photo_item'>
            <div className='tas_profile_photo_edit_container'>
                <span className='tas_profile_photo_edit_span_container'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M3 12C3 13.1 3.9 14 5 14C6.1 14 7 13.1 7 12C7 10.9 6.1 10 5 10C3.9 10 3 10.9 3 12ZM17 12C17 13.1 17.9 14 19 14C20.1 14 21 13.1 21 12C21 10.9 20.1 10 19 10C17.9 10 17 10.9 17 12ZM10 12C10 13.1 10.9 14 12 14C13.1 14 14 13.1 14 12C14 10.9 13.1 10 12 10C10.9 10 10 10.9 10 12Z" fill="#132362" />
                    </svg>
                </span>
            </div>
            <img className='tas_profile_photo' src={`${host}/uploads/posts/${img}`} />
        </div>
    }

    const [activeDiv, setActiveDiv] = React.useState(1);
    const handleTextClick = (divId) => {
        setActiveDiv(divId);
    };
    return (
        <div className='tas_photo_wrapper'>
            <p className='tas_all_photo_grid_title'>My photos</p>
            <div className='col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12'>
                <div className='prof-ful-work-edu-div'>
                    <div className='prof-work-edu-div'>
                        <div
                            onClick={() => handleTextClick(1)}
                            className={`prof-about-side-bar-li ${activeDiv === 1 ? "active-prof-about" : ""
                                }`}>
                            <h6 className='about-profile-bartext'>
                                Photos of you {" "}
                            </h6>
                        </div>
                        <div
                            onClick={() => handleTextClick(2)}
                            className={`prof-about-side-bar-li ${activeDiv === 2 ? "active-prof-about" : ""
                                }`}>
                            <h6 className='about-profile-bartext'>
                                Albums
                            </h6>
                        </div>
                    </div>

                    <div>
                        {activeDiv === 1 && (<div className='tas_photo_grid_container'>
                            {allPhotos.map(item => {
                                return <PhotoItem img={item.media} />
                            })}
                        </div>)}

                        {activeDiv === 2 && (<div className='tas_profile_no_video'>
                            <p>No Albums found</p>
                        </div>)}
                    </div>
                </div>
            </div>

        </div>
    );
}

export default page;