import Image from 'next/image';
import React from 'react';
import { toast } from "react-toastify";
import axiosInstance from '../../../../../utils/axios';
import { host } from '@/environment';
import Modal from "react-modal";
import { customStyles } from '../../../../../utils/customeStyle';
import WorkPlaceModal from './WorkPlaceModal';
import ThreedotIcon from './Icons/ThreedotIcon';
import EditIcon from './Icons/EditIcon';
import DeleteIcon from './Icons/DeleteIcon';
import "./WorkPlaceItem.css"
import PublicSmallIcon from './Icons/PublicSmallIcon';
import FriendSmallIcon from './Icons/FriendSmallIcon';
import OnlymeSmallIcon from './Icons/OnlymeSmallIcon';


function WorkPlaceItem({ setAllWorkPlace, getAllWorkPlace, workplace, editOption }) {
    const [isOpenModal, setIsOpenModal] = React.useState({
        post: false,
        workplace: false,
    });

    const handleDelete = (_id) => {
        axiosInstance.post(`${host}/api/delete-workplace`, {
            _id: _id
        }).then((res) => {
            if (res.data.status == 200) {
                setAllWorkPlace(state => state.filter(item => item._id !== _id))
                toast.success(res.data.message, {
                    position: "top-right",
                    style: {
                        background: "white",
                        color: "black",
                    },
                });
            }
        });
    }

    const handleEdit = () => {
        setIsOpenModal({ workplace: true })
    }

    const getMonthYear = (date) => {
        let d = new Date(date);
        const monthName = d.toLocaleString('default', { month: 'long' });
        return monthName + " " + d.getFullYear()
    }
    return (
        <>
            <div className='col-10 col-sm-10 col-md-10 col-lg-10 col-xl-10 pb-3'>
                <div className='prfworkabt-full-img-div'>
                    <div className='prfworkabt-img-div'>
                        <div className='tas_letter_container'>
                            <p className='tas_letter'>{workplace?.org_name.slice(0, 1)}</p>
                        </div>
                    </div>
                    <div>
                        {/* className='wr-statsn-tags'
                                className='wr-stasn-texts' */}
                        <h5 className='wr-statsn-tags'>
                            {workplace.org_name}
                        </h5>
                        <span className='wr-stasn-texts'>
                            {getMonthYear(workplace.from_date)} - {workplace.is_Working ? "Current" : getMonthYear(workplace.to_date)}
                        </span>
                    </div>
                </div>
            </div>
            {editOption ? <div className='col-2 col-sm-2 col-md-2 col-lg-2 col-xl-2'>
                <div className='d-flex tas_privacy_Edit_container'>
                    <span className='tas_privacy_container '>
                        {workplace.privacy === "public" ? <PublicSmallIcon /> : workplace.privacy === "friends" ? <FriendSmallIcon /> : <OnlymeSmallIcon />}
                    </span>
                    <span
                        className='abt-three-dots tas_workplace_three_dots'
                        data-bs-toggle='dropdown'
                        aria-expanded='false'>
                        <ThreedotIcon />
                    </span>

                    <ul class='dropdown-menu abt-wr-drops'>
                        <span className='abt-wr-ed-tag'>
                            Edit options
                        </span>
                        <li>
                            <div className='share-popup'>
                                <span>
                                    <EditIcon />
                                </span>
                                <span onClick={handleEdit} className='share-text-wr tas_workplace_delete_btn'>
                                    Edit
                                </span>
                                <Modal isOpen={isOpenModal.workplace} onRequestClose={() => setIsOpenModal({ workplace: false })} style={customStyles}>
                                    {isOpenModal.workplace && <WorkPlaceModal getAllWorkPlace={getAllWorkPlace} setIsOpenModal={setIsOpenModal} workplace={workplace} />}
                                </Modal>
                            </div>
                        </li>
                        <li>
                            <div className='share-popup'>
                                <span>
                                    <DeleteIcon />
                                </span>
                                <span onClick={() => handleDelete(workplace._id)} className='share-text-wr-dlt tas_workplace_delete_btn'>
                                    Delete
                                </span>
                            </div>
                        </li>
                    </ul>
                </div>
            </div> : null}
        </>
    );
}

export default WorkPlaceItem;