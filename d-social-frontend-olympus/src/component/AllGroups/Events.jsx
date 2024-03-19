import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";

import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import EventModal from "./EventModal";
import { Dialog, Grid } from "@mui/material";
import { Formik } from "formik";
import * as Yup from "yup";
import Link from "next/link";
import { host } from "@/environment";
import useToaster from "@/hooks/useToaster";
import DatePicker from "react-datepicker";
import Switch from "@mui/material/Switch";
import axiosInstance from "../../../utils/axios";
import { AutoCompleteWrapper } from "@/component/Reuseable";
import "./EventModal.css"
import { formatDate } from "../Group/GroupPost/utils";

const label = { inputProps: { "aria-label": "Size switch demo" } };


const Events = ({ group_id, groupMembers }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);

  const handleClose = () => {
    setOpen(false);
    setEditEvent(null)
  }
  const fileInputRef = useRef(null);
  const { showNotification } = useToaster()

  const [userInfo, setUserInfo] = useState(null)
  const [editEvent, setEditEvent] = useState(null)
  const [eventList, setEventList] = useState([])


  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));

    if (userInfo) {
      setUserInfo(userInfo[0]);
    }
  }, []);

  const fetchEvent = (id) => {
    axiosInstance.get(`/api/groups/get-my-event-list/${id}`)
      .then(res => {
        setEventList(res.data?.EventList)
      })
      .catch(err => console.log(err))
  }

  useEffect(() => {
    if (group_id) {
      fetchEvent(group_id)
    }
  }, [group_id])

  // useEffect(() => {
  //   console.log("editEvent__", editEvent);
  // }, [editEvent])

  const handleFormSubmit = async (
    _values,
    { resetForm, setErrors, setStatus, setSubmitting }
  ) => {
    try {
      console.log("_values___", _values);

      const handleSuccess = (message) => {
        showNotification(message)
        resetForm()
        handleClose()
        fetchEvent(group_id)
      }

      const formData = new FormData();

      for (const index in _values) {
        if (_values[index]) {
          formData.append(index, _values[index]);
        }
      }

      if (editEvent) {
        axiosInstance
          .patch(`/api/groups/edit-event/${editEvent?._id}`, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((res) => {
            if (res.data.status == 200) {
              handleSuccess(res.data.message)
            }
          })
          .catch((err) => {
            console.log(err);
            showNotification("Group creation failed", 'error')
          });

      }
      else {
        axiosInstance
          .post("/api/groups/save-event", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((res) => {
            if (res.data.status == 200) {
              handleSuccess(res.data.message)
            }
          })
          .catch((err) => {
            console.log(err);
            showNotification("Group creation failed", 'error')
          });
      }

    } catch (err) {
      console.error(err);
      showNotification("There was an error, try again later", "error");
      setStatus({ success: false });
      setErrors({ submit: err.message });
      setSubmitting(false);
    }
  }


  return (
    <div>
      <div className='group-single-event-div'>
        <div className='group-single-event-tag-btn-div'>
          <h6>Upcoming events</h6>
          <Grid display={'flex'} gap={1}>
            <button className='group-single-event-btn'>Find events</button>
            <button onClick={handleOpen} className='group-single-Create-btn' style={{ color: "white", backgroundColor: '#307777' }}>
              + Create
            </button>
          </Grid>
        </div>
        {
          eventList.length > 0 ?
            <Grid display={'flex'} flexDirection={'column'} gap={4}>
              {eventList.map(i => (
                <Grid sx={{
                  display: 'grid',
                  gridTemplateColumns: '2fr 3fr',
                  // border: '1px solid',
                  width: "313px",
                  height: "104px",
                  top: "594px",
                  left: "299px"

                }}>
                  <Grid>
                    <img src={i?.photo ? `${host}/uploads/groupEvent/${i?.photo}` : ""} style={{
                      objectFit: 'cover',
                      height: '100%',
                      width: '100%',
                      borderRadius: '10px'
                    }} alt="Event Photo" />
                  </Grid>

                  <Grid p={1}>
                    <p className="event-created-at" >{formatDate(i?.createdAt)}</p>
                    <h5 className="event-title">{i?.title}</h5>

                    <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>

                      <img alt="author" src={i?.created_by?.profile_pic ? `${host}/uploads/${i?.created_by?.profile_pic}` : ''} style={{
                        height: '17px',
                        width: '17px',
                        borderRadius: '17px'
                      }} />
                      <span className="host-small-text">Created by {[i?.created_by?.first_name, i?.created_by?.last_name].join(' ')}</span>

                    </div>
                    <br />

                    <div style={{ display: 'flex', gap: '3px' }}>
                      <button className="event-btn">
                        <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 13 13" fill="none">
                          <g clip-path="url(#clip0_526_6222)">
                            <path d="M12.9142 5.11655C12.8536 4.97903 12.7636 4.85485 12.6451 4.75585L11.0218 3.39999V2.68377C11.0218 2.13843 10.578 1.69463 10.0326 1.69463H8.97988L7.32768 0.31485C6.84775 -0.0963762 6.15197 -0.0963762 5.67646 0.31127L4.02015 1.69463H2.9674C2.42206 1.69463 1.97826 2.13841 1.97826 2.68377V3.40001L0.355189 4.75585C0.236666 4.85477 0.146631 4.97878 0.0859981 5.11612C0.069291 5.15314 0 5.34321 0 5.51508V11.7224C0 12.4237 0.570477 12.9941 1.27174 12.9941H11.7283C12.4295 12.9941 13 12.4237 13 11.7224V5.51508C13 5.35357 12.9358 5.16448 12.9142 5.11655ZM1.97826 5.99636L1.0854 5.25058L1.97826 4.50486V5.99636ZM6.22428 0.958426C6.38381 0.821393 6.61588 0.82152 6.77983 0.962007L7.657 1.6946H5.34295L6.22428 0.958426ZM10.1739 6.70453L6.77572 9.54295C6.61619 9.67998 6.38381 9.67985 6.22017 9.53937L2.82608 6.7045V2.68374C2.82608 2.60577 2.88955 2.54245 2.96738 2.54245H10.0326C10.1104 2.54245 10.1739 2.60577 10.1739 2.68374V6.70453H10.1739ZM11.0217 5.99638V4.50473L11.9147 5.25051L11.0217 5.99638Z" fill="black" />
                            <path d="M8.47825 5.36852C8.47825 4.27769 7.59069 3.39026 6.49999 3.39026C5.40928 3.39026 4.52173 4.27769 4.52173 5.36852C4.52173 6.36678 5.26578 7.19248 6.22788 7.32578L6.03704 7.70748C5.99004 7.80145 6.05834 7.91197 6.16346 7.91197H6.83659C6.94166 7.91197 7.00996 7.80142 6.96301 7.70748L6.77218 7.32578C7.7342 7.19248 8.47825 6.36678 8.47825 5.36852Z" fill="black" />
                          </g>
                          <defs>
                            <clipPath id="clip0_526_6222">
                              <rect width="13" height="13" fill="white" />
                            </clipPath>
                          </defs>
                        </svg>
                        Invite</button>

                      <button className="event-btn" onClick={() => {

                        setEditEvent(i)
                        handleOpen()
                      }}>Edit</button>
                      <button className="event-btn">Share</button>

                      <div className="event-btn" style={{
                        borderRadius: "15px",
                        background: "rgba(48, 119, 119, 0.20)"
                      }}>


                        <div className='more'>

                          <svg xmlns="http://www.w3.org/2000/svg" width="15" height="4" viewBox="0 0 15 4" fill="none">
                            <path d="M1.85185 2.30303e-08C0.833333 1.03636e-08 1.3028e-08 0.9 2.89512e-08 2C4.48743e-08 3.1 0.833333 4 1.85185 4C2.87037 4 3.7037 3.1 3.7037 2C3.7037 0.9 2.87037 3.5697e-08 1.85185 2.30303e-08ZM12.963 1.61212e-07C11.9444 1.48546e-07 11.1111 0.9 11.1111 2C11.1111 3.1 11.9444 4 12.963 4C13.9815 4 14.8148 3.1 14.8148 2C14.8148 0.9 13.9815 1.73879e-07 12.963 1.61212e-07ZM7.40741 9.21213e-08C6.38889 7.94547e-08 5.55556 0.9 5.55556 2C5.55556 3.1 6.38889 4 7.40741 4C8.42593 4 9.25926 3.1 9.25926 2C9.25926 0.9 8.42593 1.04788e-07 7.40741 9.21213e-08Z" fill="#307777" />
                          </svg>
                          <ul className='more-dropdown'
                          // style={{border:'1px solid'}}
                          >
                            <li type='button' onClick={() => {
                              alert('Do you want to delete this event ?')
                              axiosInstance.patch(`/api/groups/delete-event/${i?._id}`)
                                .then(res => {
                                  showNotification(res.data.message);
                                  fetchEvent(group_id)
                                })
                                .catch(err => console.log(err))

                            }}>Delete</li>

                          </ul>

                        </div>
                      </div>
                    </div>
                  </Grid>
                </Grid>))}
            </Grid>
            :
            <div className='event-not-found-div'>
              <svg xmlns="http://www.w3.org/2000/svg" width="126" height="140" viewBox="0 0 126 140" fill="none">
                <path d="M94.71 70.42L87.29 63L53.13 97.16L38.29 82.32L30.87 89.74L53.13 112L94.71 70.42ZM112 14H105V0H91V14H35V0H21V14H14C6.23 14 0.0699999 20.3 0.0699999 28L0 126C0 133.7 6.23 140 14 140H112C119.7 140 126 133.7 126 126V28C126 20.3 119.7 14 112 14ZM112 126H14V49H112V126Z" fill="#858585" />
              </svg>
              <p>No Upcoming event found</p>
              <br />
            </div>
        }

      </div>
      <Dialog
        fullWidth
        maxWidth='sm'
        open={open}
        onClose={handleClose}
      >

        <div className='event-full-modal-cover-div'>
          <div>
            <h3 className='create-tag-text' style={{ fontSize: '24px', color: 'black' }}>Select audience</h3>
          </div>


          <Formik
            initialValues={{
              group_id: editEvent?.group_id || group_id,
              title: editEvent?.title || undefined,

              photo_url: editEvent?.photo ? `${host}/uploads/groupEvent/${editEvent?.photo}` : undefined,
              photo: null,

              start_date: editEvent?.start_date ? new Date(editEvent?.start_date) : null,
              start_time: editEvent?.start_time ? new Date(editEvent?.start_time) : null,

              end_date: editEvent?.end_date ? new Date(editEvent?.end_date) : null,
              end_time: editEvent?.end_time ? new Date(editEvent?.end_time) : null,

              type: editEvent?.type || "Virtual",
              inviteAllMember: editEvent?.inviteAllMember ? editEvent?.inviteAllMember : false,

              meeting_url: editEvent?.meeting_url || undefined,
              location: editEvent?.location || undefined,
              co_host_user_id: editEvent?.co_host_user_id?._id || undefined,

              details: editEvent?.details || undefined

            }}
            validationSchema={Yup.object().shape({
              title: Yup.string().max(255).required("Event title field is required"),
              // start_date: Yup.required("Event start date field is required"),
              // start_time: Yup.required("Event start time field is required"),
            })}
            onSubmit={handleFormSubmit}
          >
            {({
              errors,
              handleBlur,
              handleChange,
              handleSubmit,
              isSubmitting,
              touched,
              values,
              setFieldValue,
            }) => {
              // console.log("__", values);
              // console.log({ errors }); 
              return (
                <form onSubmit={handleSubmit}>
                  <div className='modal-cover-div'>
                    {
                      values?.photo_url
                        ?
                        <img className='modal-cover-img' src={`${values?.photo_url}`} alt='Event cover photo' />
                        :
                        <div className='modal-cover-img' style={{ backgroundColor: '#D9D9D9' }} />
                    }

                    {
                      <button type='button' className='modal-cover-svg-div' style={{ borderRadius: '5px', backgroundColor: '#959595', color: 'white', border: '0px' }}
                        onClick={() => {
                          fileInputRef.current.click();
                        }}
                      >
                        Add Photo
                        {/* <svg
                                    xmlns='http://www.w3.org/2000/svg'
                                    width='16'
                                    height='16'
                                    fill='currentColor'
                                    class='bi bi-pencil-square'
                                    viewBox='0 0 16 16'>
                                    <path d='M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z' />
                                    <path
                                      fill-rule='evenodd'
                                      d='M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z'
                                    />
                                  </svg> */}
                      </button>
                    }


                    <input
                      className="file-upload-input"
                      type="file"
                      accept="image/*"
                      ref={fileInputRef}
                      style={{ display: "none" }}
                      // style={{
                      //   display: 'inline-block',
                      //   borderRadius: '5px', backgroundColor: '#959595', color: 'white', border: '0px'
                      // }}
                      onChange={(e) => {
                        // e.preventDefault()
                        const file = e.target.files[0];
                        console.log("changed", file);
                        if (file) {
                          const blob = URL.createObjectURL(file)
                          setFieldValue('photo_url', blob)
                          setFieldValue('photo', file)

                        }
                      }}
                    />


                  </div>
                  <div className='container-fluid '>
                    {/* Host profile */}
                    <div className="py-2">
                      <Link href={`/${userInfo?.username}/timeline`} style={{ display: 'flex', gap: '15px', }} >
                        <div>
                          {userInfo?.profile_pic !== null ? (
                            <img alt="author" src={`${host}/uploads/${userInfo?.profile_pic}`} className="avatar " />
                          ) : (
                            <img
                              src="https://www.kindpng.com/picc/m/24-248253_user-profile-default-image-png-clipart-png-download.png"
                              className="bi bi-wallet2 olymp-explore-icon left-menu-icon"
                              style={{ width: "40px", height: "40px", objectFit: "cover" }}
                            />
                          )}
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                          <b>{[userInfo?.first_name, userInfo?.last_name].join(' ')}</b>
                          <span className="host-small-text">Host - Your Profile</span>
                        </div>

                      </Link>
                    </div>

                    <div className='row'>
                      {/* Event Title */}
                      <div className='col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 mb-2'>
                        <input
                          className='inp-event-name'
                          name="title"
                          error={Boolean(touched?.title && errors?.title)}
                          helperText={touched?.title && errors?.title}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values?.title}
                          placeholder='Event name'
                        />
                      </div>

                      <div className='col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6'>

                        <div className='row'>
                          {/* Start Date */}
                          <div className='col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 mb-2'>
                            {values?.start_date && <lebel className='inputs-tag'>Start date</lebel>}
                            <div className='datepicker-input-div'>
                              <svg
                                xmlns='http://www.w3.org/2000/svg'
                                width='16'
                                height='16'
                                fill='gray'
                                class='bi bi-calendar4'
                                viewBox='0 0 16 16'>
                                <path d='M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5M2 2a1 1 0 0 0-1 1v1h14V3a1 1 0 0 0-1-1zm13 3H1v9a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1z' />
                              </svg>
                              <DatePicker
                                placeholderText="Start date"
                                className='datepicker-input'
                                selected={values?.start_date}
                                onChange={(date) => setFieldValue("start_date", date)}
                                dateFormat='MMM dd, yyyy'
                              />
                            </div>
                          </div>
                          {/* End date */}
                          <div className='col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 mb-2'>
                            {values?.end_date && <lebel className='inputs-tag'>End date</lebel>}
                            <div className='datepicker-input-div'>
                              <svg
                                xmlns='http://www.w3.org/2000/svg'
                                width='16'
                                height='16'
                                fill='gray'
                                class='bi bi-calendar4'
                                viewBox='0 0 16 16'>
                                <path d='M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5M2 2a1 1 0 0 0-1 1v1h14V3a1 1 0 0 0-1-1zm13 3H1v9a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1z' />
                              </svg>
                              <DatePicker
                                placeholderText="End date"
                                className='datepicker-input'
                                selected={values?.end_date}
                                onChange={(date) => setFieldValue("end_date", date)}
                                selectsEnd
                                startDate={values?.start_date}
                                endDate={values?.end_date}
                                minDate={values?.start_date} // Ensures that the end date cannot be before the start date
                                dateFormat='MMM dd, yyyy'
                              />
                            </div>
                          </div>

                        </div>
                      </div>

                      <div className='col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6'>
                        <div className='row'>
                          {/* Start Time */}
                          <div className='col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 mb-2'>
                            {values?.start_time && <lebel className='inputs-tag'>Start Time</lebel>}
                            <div className='datepicker-input-div'>
                              <svg
                                xmlns='http://www.w3.org/2000/svg'
                                width='16'
                                height='16'
                                fill='gray'
                                class='bi bi-clock'
                                viewBox='0 0 16 16'>
                                <path d='M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71z' />
                                <path d='M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16m7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0' />
                              </svg>
                              <DatePicker
                                className='datepicker-input'
                                placeholderText="Start Time"
                                selected={values?.start_time}
                                onChange={(time) => setFieldValue("start_time", time)}
                                showTimeSelect
                                showTimeSelectOnly
                                timeIntervals={15}
                                dateFormat='h:mm aa'
                                timeCaption='Time'
                              />
                            </div>
                          </div>
                          {/* End Time */}
                          <div className='col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 mb-2'>
                            {values?.end_time && <lebel className='inputs-tag'>End Time</lebel>}
                            <div className='datepicker-input-div'>
                              <svg
                                xmlns='http://www.w3.org/2000/svg'
                                width='16'
                                height='16'
                                fill='gray'
                                class='bi bi-clock'
                                viewBox='0 0 16 16'>
                                <path d='M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71z' />
                                <path d='M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16m7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0' />
                              </svg>
                              <DatePicker
                                className='datepicker-input'
                                placeholderText="End Time"
                                selected={values?.end_time}
                                onChange={(date) => setFieldValue('end_time', date)}
                                showTimeSelect
                                showTimeSelectOnly
                                timeIntervals={15}
                                dateFormat='h:mm aa'
                                timeCaption='Time'
                              />
                            </div>
                          </div>

                        </div>
                      </div>

                      {/* In-person or virtual? */}
                      <div className='col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 mb-2'>
                        <lebel className='inputs-tag'>In-person or virtual?</lebel>

                        <div className='datepicker-input-div'>

                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                            <g clip-path="url(#clip0_514_3188)">
                              <path fill-rule="evenodd" clip-rule="evenodd" d="M15.3203 19.4826C15.5887 19.6726 15.9345 19.7201 16.2428 19.6035C16.5512 19.486 16.7778 19.2226 16.8462 18.9035C17.5703 15.5001 19.327 6.88596 19.9862 3.79012C20.0362 3.55679 19.9528 3.31429 19.7695 3.15846C19.5862 3.00262 19.332 2.95762 19.1053 3.04179C15.6112 4.33512 4.85033 8.37262 0.451998 10.0001C0.172832 10.1035 -0.00883512 10.3718 0.000331545 10.666C0.0103315 10.961 0.208665 11.2168 0.494498 11.3026C2.467 11.8926 5.05616 12.7135 5.05616 12.7135C5.05616 12.7135 6.26616 16.3676 6.897 18.226C6.97616 18.4593 7.15866 18.6426 7.3995 18.706C7.6395 18.7685 7.89616 18.7026 8.07533 18.5335C9.08866 17.5768 10.6553 16.0976 10.6553 16.0976C10.6553 16.0976 13.632 18.2801 15.3203 19.4826ZM6.14533 12.2518L7.5445 16.8668L7.85533 13.9443C7.85533 13.9443 13.2612 9.06846 16.3428 6.28929C16.4328 6.20762 16.4453 6.07096 16.3703 5.97512C16.2962 5.87929 16.1595 5.85679 16.057 5.92179C12.4853 8.20262 6.14533 12.2518 6.14533 12.2518Z" fill="#858585" />
                            </g>
                            <defs>
                              <clipPath id="clip0_514_3188">
                                <rect width="20" height="20" fill="white" />
                              </clipPath>
                            </defs>
                          </svg>

                          <select
                            className='form-select select-event-modal'
                            aria-label=' select example'
                            value={values?.type}
                            onChange={(e) => {
                              setFieldValue('type', e.target.value)
                            }}>
                            <option className=" py-2" value="Virtual">Virtual</option>
                            <option className=" py-2" value='Real'>Real</option>
                          </select>
                        </div>

                      </div>


                      {/* Meeting url */}
                      {
                        values?.type == 'Virtual' && (
                          <div className='col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 mb-2'>
                            <lebel className='inputs-tag'>Meeting url</lebel>
                            <div className='datepicker-input-div'>
                              <svg
                                xmlns='http://www.w3.org/2000/svg'
                                width='16'
                                height='16'
                                fill='currentColor'
                                class='bi bi-camera-video'
                                viewBox='0 0 16 16'>
                                <path
                                  fill-rule='evenodd'
                                  d='M0 5a2 2 0 0 1 2-2h7.5a2 2 0 0 1 1.983 1.738l3.11-1.382A1 1 0 0 1 16 4.269v7.462a1 1 0 0 1-1.406.913l-3.111-1.382A2 2 0 0 1 9.5 13H2a2 2 0 0 1-2-2zm11.5 5.175 3.5 1.556V4.269l-3.5 1.556zM2 4a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h7.5a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1z'
                                />
                              </svg>
                              <input
                                className='datepicker-input'
                                type='text'
                                name="meeting_url"
                                placeholder='meeting link'
                                error={Boolean(touched?.meeting_url && errors?.meeting_url)}
                                helperText={touched?.meeting_url && errors?.meeting_url}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values?.meeting_url}
                              />
                            </div>
                          </div>
                        )
                      }
                      {/* Location */}
                      {
                        values?.type == 'Real' && (
                          <div className='col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 mb-2'>
                            <lebel className='inputs-tag'>Location</lebel>
                            <input
                              className='inp-event-name'
                              name="location"
                              placeholder='Add Location'
                              error={Boolean(touched?.location && errors?.location)}
                              helperText={touched?.location && errors?.location}
                              onBlur={handleBlur}
                              onChange={handleChange}
                              value={values?.location}
                            />
                          </div>
                        )
                      }

                      {/* Add Co-host */}
                      <div className='col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 mb-2'>
                        <lebel className='inputs-tag'>Add Co-host</lebel>
                        {/* <input
                            className='inp-event-name'
                            name="co_host_user_id"
                            placeholder='Add Co-host'
                            error={Boolean(touched?.co_host_user_id && errors?.co_host_user_id)}
                            helperText={touched?.co_host_user_id && errors?.co_host_user_id}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values?.co_host_user_id}
                          /> */}

                        <AutoCompleteWrapper
                          // className='inp-event-name'
                          style={{
                            borderRadius: '16px'
                          }}
                          options={groupMembers}
                          value={groupMembers?.find(i => i?.id == values?.co_host_user_id)}
                          required={true}
                          placeholder='Add Co-host'
                          // disableClearable={true}
                          handleChange={(e, v) => {
                            setFieldValue('co_host_user_id', v?.id)
                          }}
                        />
                      </div>

                    </div>

                    <div>
                      {/* Invite all group members */}
                      <div className='Invite-div'>
                        <div>
                          <h6>Invite all group members</h6>
                          <p>All group members will be invited to the event</p>
                        </div>
                        <Switch {...label} checked={values?.inviteAllMember} onChange={(e, checked) => {
                          setFieldValue('inviteAllMember', checked)
                        }} />
                      </div>
                      {/* details */}
                      <div className='modal-details-div'>
                        <input
                          className='modal-details'
                          name="details"
                          type='comment'
                          placeholder='What are the details'
                          alt=''
                          value={values?.details}
                          error={Boolean(touched?.details && errors?.details)}
                          helperText={touched?.details && errors?.details}
                          onBlur={handleBlur}
                          onChange={handleChange}
                        />
                      </div>

                    </div>

                    <div className='modal-create-btn-div'>
                      <button className='modal-create-btn' type='submit' style={{ backgroundColor: '#307777', color: 'white' }} >{editEvent ? "Edit" : "Create"} Event</button>
                    </div>
                  </div>
                </form>
              );
            }}
          </Formik>


        </div>

      </Dialog>
    </div>
  );
};

export default Events;
