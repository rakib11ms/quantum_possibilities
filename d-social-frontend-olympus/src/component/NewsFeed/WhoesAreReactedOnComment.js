import Modal from 'react-modal';
import React, { useState, useEffect, useRef } from "react";
import { host } from "@/environment";
import moment from 'moment';
import Image from "next/image";
import axiosInstance from "../../../utils/axios";
import Link from "next/link";
import '../../assets/css/post.css';
import { Tabs, Tab, Box, Typography, Paper } from '@mui/material';

function WhoesAreReactedOnComment(props) {
    // Modal.setAppElement("#root");

    const whoesAreReactedOnPostStyles = {
        content: {
            top: "50%",
            left: "50%",
            width: "45%",
            height: "70%",
            // minHeight: '500px',
            right: "auto",
            // bottom: 'auto',
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
        },
    };

    //   const [value, setValue] = React.useState(0);

    //   const handleChange = (event, newValue) => {
    //     setValue(newValue);
    //   };
    return (
        <Modal
            isOpen={props.isOpen}
            // onAfterOpen={afterOpenModal}
            onRequestClose={props.onClose}

            style={whoesAreReactedOnPostStyles}
            contentLabel='Example Modal'>
            <div className='whoes-reaction-header'>
                <div>
                    <h4>All Reactions</h4>
                </div>
                <button className='btn btn-secondary' onClick={props.onClose}>
                    Close
                </button>
            </div>

            <div className='whoes-react border-bottom'>
                <Tabs
                    value={props.value}
                    onChange={props.handleChange}
                    indicatorColor='primary'
                    textColor='primary'
                    centered
                // className="custom-whoes-post-reactions-tabs"
                >
                    <Tab
                        label={`ALL (${props.reactedUserListsOfDirectPostsComments && props.
                            reactedUserListsOfDirectPostsComments.length
                            })`}></Tab>

                    <Tab
                        label={
                            <>
                                <img
                                    className='whoes-post-reactions-header-item'
                                    src={`${host}/assets/reactions/like.gif`}
                                    alt='Like'
                                />
                                <span>
                                    {
                                        props.reactedUserListsOfDirectPostsComments.filter(
                                            (item) => item.reaction_type === "like"
                                        ).length
                                    }
                                </span>
                            </>
                        }
                    />
                    <Tab
                        label={
                            <>
                                <img
                                    className='whoes-post-reactions-header-item'
                                    src={`${host}/assets/reactions/love.gif`}
                                    alt='Love'
                                />
                                <span>
                                    {
                                        props.reactedUserListsOfDirectPostsComments.filter(
                                            (item) => item.reaction_type === "love"
                                        ).length
                                    }
                                </span>
                            </>
                        }
                    />
                    <Tab
                        label={
                            <>
                                <img
                                    className='whoes-post-reactions-header-item'
                                    src={`${host}/assets/reactions/sad.gif`}
                                    alt='Love'
                                />
                                <span>
                                    {
                                        props.reactedUserListsOfDirectPostsComments.filter(
                                            (item) => item.reaction_type === "sad"
                                        ).length
                                    }
                                </span>
                            </>
                        }
                    />
                    <Tab
                        label={
                            <>
                                <img
                                    className='whoes-post-reactions-header-item'
                                    src={`${host}/assets/reactions/wow.gif`}
                                    alt='Wow'
                                />
                                <span>
                                    {
                                        props.reactedUserListsOfDirectPostsComments.filter(
                                            (item) => item.reaction_type === "wow"
                                        ).length
                                    }
                                </span>
                            </>
                        }
                    />
                    <Tab
                        label={
                            <>
                                <img
                                    className='whoes-post-reactions-header-item'
                                    src={`${host}/assets/reactions/haha.gif`}
                                    alt='Haha'
                                />
                                <span>
                                    {
                                        props.reactedUserListsOfDirectPostsComments.filter(
                                            (item) => item.reaction_type === "haha"
                                        ).length
                                    }
                                </span>
                            </>
                        }
                    />
                    <Tab
                        label={
                            <>
                                <img
                                    className='whoes-post-reactions-header-item'
                                    src={`${host}/assets/reactions/angry.gif`}
                                    alt='Angry'
                                />
                                <span>
                                    {
                                        props.reactedUserListsOfDirectPostsComments.filter(
                                            (item) => item.reaction_type === "angry"
                                        ).length
                                    }
                                </span>
                            </>
                        }
                    />
                </Tabs>
            </div>

            <div className='whoes-reactions-content'>
                <div
                    role='tabpanel'
                    className=''
                    hidden={props.value !== 0}
                    id='tab1'
                    aria-labelledby='tab1-tab'>
                    {props.reactedUserListsOfDirectPostsComments.map(
                        (reactionItem, reactionIndex) => {
                            return (
                                <div
                                    className='whoes-post-reactions-persons'
                                    key={reactionItem}>
                                    <div className='whoes-post-reactions-persons-img'>
                                        <img
                                            src={`${host}/uploads/${reactionItem.user_id.profile_pic}`}
                                            alt=''
                                            className='avatar-profile '
                                        />
                                    </div>
                                    <div className='whoes-post-reactions-persons-info'>
                                        <div className=''>
                                            <Link href={`/profile/${reactionItem.user_id.username}`} className='' style={{ color: "black", textDecoration: "underline" }}>
                                                {`${reactionItem.user_id.first_name} ${reactionItem.user_id.last_name}`}

                                            </Link>
                                        </div>                    {/* <div className=''>
                                                Software Engineer1
                                            </div> */}
                                    </div>
                                </div>
                            );
                        }
                    )}
                </div>
                <div
                    role='tabpanel'
                    className=''
                    hidden={props.value !== 1}
                    id='tab2'
                    aria-labelledby='tab2-tab'>
                    {props.reactedUserListsOfDirectPostsComments
                        .filter((reactionItem) => reactionItem.reaction_type === "like")
                        .map((reactionItem, reactionIndex) => {
                            // console.log('dd', reactionItem)
                            return (
                                <div
                                    className='whoes-post-reactions-persons'
                                    key={reactionItem._id}>
                                    <div className='whoes-post-reactions-persons-img'>
                                        <img
                                            src={`${host}/uploads/${reactionItem.user_id.profile_pic}`}
                                            alt=''
                                            className='avatar-profile '
                                        />
                                    </div>
                                    <div className='whoes-post-reactions-persons-info'>
                                        <div className=''>
                                            <Link href={`/profile/${reactionItem.user_id.username}`} className='' style={{ color: "black", textDecoration: "underline" }}>
                                                {`${reactionItem.user_id.first_name} ${reactionItem.user_id.last_name}`}

                                            </Link>
                                        </div>

                                    </div>
                                </div>
                            );
                        })}
                </div>
                <div
                    role='tabpanel'
                    className=''
                    hidden={props.value !== 2}
                    id='tab3'
                    aria-labelledby='tab3-tab'>
                    {props.reactedUserListsOfDirectPostsComments
                        .filter((reactionItem) => reactionItem.reaction_type === "love")
                        .map((reactionItem, reactionIndex) => {
                            return (
                                <div
                                    className='whoes-post-reactions-persons'
                                    key={reactionItem._id}>
                                    <div className='whoes-post-reactions-persons-img'>
                                        <img
                                            src={`${host}/uploads/${reactionItem.user_id.profile_pic}`}
                                            alt=''
                                            className='avatar-profile '
                                        />
                                    </div>
                                    <div className='whoes-post-reactions-persons-info'>
                                        <div className=''>
                                            <Link href={`/profile/${reactionItem.user_id.username}`} className='' style={{ color: "black", textDecoration: "underline" }}>
                                                {`${reactionItem.user_id.first_name} ${reactionItem.user_id.last_name}`}

                                            </Link>
                                        </div>                  </div>
                                </div>
                            );
                        })}
                </div>


                <div
                    role='tabpanel'
                    className=''
                    hidden={props.value !== 3}
                    id='tab3'
                    aria-labelledby='tab3-tab'>
                    {props.reactedUserListsOfDirectPostsComments
                        .filter((reactionItem) => reactionItem.reaction_type === "sad")
                        .map((reactionItem, reactionIndex) => {
                            return (
                                <div
                                    className='whoes-post-reactions-persons'
                                    key={reactionItem._id}>
                                    <div className='whoes-post-reactions-persons-img'>
                                        <img
                                            src={`${host}/uploads/${reactionItem.user_id.profile_pic}`}
                                            alt=''
                                            className='avatar-profile '
                                        />
                                    </div>
                                    <div className='whoes-post-reactions-persons-info'>
                                        <div className=''>
                                            <Link href={`/profile/${reactionItem.user_id.username}`} className='' style={{ color: "black", textDecoration: "underline" }}>
                                                {`${reactionItem.user_id.first_name} ${reactionItem.user_id.last_name}`}

                                            </Link>
                                        </div>                  </div>
                                </div>
                            );
                        })}
                </div>
                <div
                    role='tabpanel'
                    className=''
                    hidden={props.value !== 4}
                    id='tab4'
                    aria-labelledby='tab4-tab'>
                    {props.reactedUserListsOfDirectPostsComments
                        .filter((reactionItem) => reactionItem.reaction_type === "wow")
                        .map((reactionItem, reactionIndex) => {
                            return (
                                <div
                                    className='whoes-post-reactions-persons'
                                    key={reactionItem._id}>
                                    <div className='whoes-post-reactions-persons-img'>
                                        <img
                                            src={`${host}/uploads/${reactionItem.user_id.profile_pic}`}
                                            alt=''
                                            className='avatar-profile '
                                        />
                                    </div>
                                    <div className='whoes-post-reactions-persons-info'>
                                        <div className=''>
                                            <Link href={`/profile/${reactionItem.user_id.username}`} className='' style={{ color: "black", textDecoration: "underline" }}>
                                                {`${reactionItem.user_id.first_name} ${reactionItem.user_id.last_name}`}

                                            </Link>
                                        </div>                  </div>
                                </div>
                            );
                        })}
                </div>

                <div
                    role='tabpanel'
                    className=''
                    hidden={props.value !== 5}
                    id='tab5'
                    aria-labelledby='tab5-tab'>
                    {props.reactedUserListsOfDirectPostsComments
                        .filter((reactionItem) => reactionItem.reaction_type === "haha")
                        .map((reactionItem, reactionIndex) => {
                            return (
                                <div
                                    className='whoes-post-reactions-persons'
                                    key={reactionItem._id}>
                                    <div className='whoes-post-reactions-persons-img'>
                                        <img
                                            src={`${host}/uploads/${reactionItem.user_id.profile_pic}`}
                                            alt=''
                                            className='avatar-profile '
                                        />
                                    </div>
                                    <div className='whoes-post-reactions-persons-info'>
                                        <div className=''>
                                            <Link href={`/profile/${reactionItem.user_id.username}`} className='' style={{ color: "black", textDecoration: "underline" }}>
                                                {`${reactionItem.user_id.first_name} ${reactionItem.user_id.last_name}`}

                                            </Link>
                                        </div>                  </div>
                                </div>
                            );
                        })}
                </div>

                <div
                    role='tabpanel'
                    className=''
                    hidden={props.value !== 6}
                    id='tab6'
                    aria-labelledby='tab6-tab'>
                    {props.reactedUserListsOfDirectPostsComments
                        .filter((reactionItem) => reactionItem.reaction_type === "angry")
                        .map((reactionItem, reactionIndex) => {
                            return (
                                <div
                                    className='whoes-post-reactions-persons'
                                    key={reactionItem._id}>
                                    <div className='whoes-post-reactions-persons-img'>
                                        <img
                                            src={`${host}/uploads/${reactionItem.user_id.profile_pic}`}
                                            alt=''
                                            className='avatar-profile '
                                        />
                                    </div>
                                    <div className='whoes-post-reactions-persons-info'>
                                        <div className=''>
                                            <Link href={`/profile/${reactionItem.user_id.username}`} className='' style={{ color: "black", textDecoration: "underline" }}>
                                                {`${reactionItem.user_id.first_name} ${reactionItem.user_id.last_name}`}

                                            </Link>
                                        </div>                  </div>
                                </div>
                            );
                        })}
                </div>
            </div>
        </Modal>
    )
}

export default WhoesAreReactedOnComment