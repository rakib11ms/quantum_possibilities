import React from 'react'
import { useSelector } from 'react-redux';
import { userInfo } from '@/redux/features/Profile/profileSlice'
import { host } from '@/environment';
import Link from 'next/link';
import { useParams } from 'next/navigation';


export default function ProfileNavComponent() {
    const userInfoData = useSelector(userInfo)
    const [active, setActive] = React.useState({
        timeline: true,
        friends: false,
        photos: false,
        videos: false,
        stories: false,
        about: false,
    })

    return (
        <div>
            <div className='prof-timelines-divs'>
                <div className='row'>
                    <div className='col-12 col-sm-12 col-md-3 col-lg-3 col-lx-3'></div>
                    <div className='col-12 col-sm-12 col-md-9 col-lg-9 col-lx-9'>
                        <ul className='profile-menu'>
                            <li>
                                <Link href={`/${userInfoData.username}/timeline`} onClick={() => {
                                    setActive({
                                        timeline: true,
                                        friends: false,
                                        photos: false,
                                        videos: false,
                                        stories: false,
                                        about: false,
                                    })
                                }} className={active.timeline ? 'active' : null}>
                                    Timeline
                                </Link>
                            </li>
                            <li>
                                <Link href={`/${userInfoData.username}/friend`} onClick={() => {
                                    setActive({
                                        timeline: false,
                                        friends: true,
                                        photos: false,
                                        videos: false,
                                        stories: false,
                                        about: false,
                                    })
                                }} className={active.friends ? 'active' : null}>
                                    Friends
                                </Link>
                            </li>
                            <li>
                                <Link href={`/${userInfoData.username}/photo`} onClick={() => {
                                    setActive({
                                        timeline: false,
                                        friends: false,
                                        photos: true,
                                        videos: false,
                                        stories: false,
                                        about: false,
                                    })
                                }} className={active.photos ? 'active' : null}>
                                    Photos
                                </Link>
                            </li>
                            <li>
                                <Link href={`/${userInfoData.username}/video`} onClick={() => {
                                    setActive({
                                        timeline: false,
                                        friends: false,
                                        photos: false,
                                        videos: true,
                                        stories: false,
                                        about: false,
                                    })
                                }} className={active.videos ? 'active' : null}>
                                    Videos
                                </Link>
                            </li>
                            {/* <li>
                                <a href='14-FavouritePage-Statistics.html'>
                                    Statistics
                                </a>
                            </li> */}
                            <li>
                                <Link href={`/${userInfoData.username}/story`} onClick={() => {
                                    setActive({
                                        timeline: false,
                                        friends: false,
                                        photos: false,
                                        videos: false,
                                        stories: true,
                                        about: false,
                                    })
                                }} className={active.stories ? 'active' : null}>
                                    Stories
                                </Link>
                            </li>
                            <li>
                                <Link href={`/${userInfoData.username}/about`} onClick={() => {
                                    setActive({
                                        timeline: false,
                                        friends: false,
                                        photos: false,
                                        videos: false,
                                        stories: false,
                                        about: true,
                                    })
                                }} className={active.about ? 'active' : null}>
                                    About
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
                {/* <div className='control-block-button'>
                  <a href='#' className='btn btn-control bg-primary'>
                    <svg className='olymp-star-icon'>
                      <use xlinkHref='../svg-icons/sprites/icons.svg#olymp-star-icon' />
                    </svg>
                  </a>
                  <a href='#' className='btn btn-control bg-purple'>
                    <svg className='olymp-chat---messages-icon'>
                      <use xlinkHref='../svg-icons/sprites/icons.svg#olymp-chat---messages-icon' />
                    </svg>
                  </a>
                </div> */}
            </div>
        </div >
    )
}
