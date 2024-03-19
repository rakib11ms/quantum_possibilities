"use client";
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "./EventModal.css"

import "react-datepicker/dist/react-datepicker.css";
import eventModalcover from "../../../public/eventModalcover.png";

import Switch from "@mui/material/Switch";
import Image from "next/image";
import { AutoCompleteWrapper } from "@/component/Reuseable";
import { Formik } from "formik";
import * as Yup from "yup";
import Link from "next/link";
import { host } from "@/environment";
import useToaster from "@/hooks/useToaster";

const label = { inputProps: { "aria-label": "Size switch demo" } };

const EventModal = ({ group_id }) => {
  const [userId, setUserId] = useState(undefined);
  const [fullName, setFullName] = useState("");
  const [userName, setUserName] = useState("");
  const [userImage, setuserImage] = useState("");

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const initialStartDate = new Date();
  const initialEndDate = new Date();
  initialStartDate.setHours(16, 0); // Set initial start time to 4:00 PM
  initialEndDate.setHours(18, 0);
  const [selectedTime, setSelectedTime] = useState(null);
  const [endtime, setEndtime] = useState(null);
  const [activeAccordion, setActiveAccordion] = useState("");
  const [activeAccordion2, setActiveAccordion2] = useState("");
  const [activeAccordion3, setActiveAccordion3] = useState("");
  const { showNotification } = useToaster()
  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const localStorageFullName = localStorage.getItem("fullname");

    setUserId(localStorage.getItem('userId'))

    if (userInfo) {
      setuserImage(userInfo[0].profile_pic);
      setFullName(localStorageFullName);
      setUserName(userInfo[0].username);
    }
  }, []);

  const handleAccordionClick = (accordionId) => {
    setActiveAccordion((prevAccordion) =>
      prevAccordion === accordionId ? "" : accordionId
    );
  };

  const isAccordionExpanded = (accordionId) => {
    return activeAccordion === accordionId;
  };

  const toggleAccordion = (accordionId) => {
    if (isAccordionExpanded(accordionId)) {
      setActiveAccordion("");
    } else {
      setActiveAccordion(accordionId);
    }
  };

  const handleAccordionClicks = (accordionId) => {
    setActiveAccordion2((prevAccordions) =>
      prevAccordions === accordionId ? "" : accordionId
    );
  };

  const isAccordionExpanded2 = (accordionId) => {
    return activeAccordion2 === accordionId;
  };

  const toggleAccordion2 = (accordionId) => {
    if (isAccordionExpanded2(accordionId)) {
      setActiveAccordion2("");
    } else {
      setActiveAccordion2(accordionId);
    }
  };

  const handleAccordionClick3 = (accordionId) => {
    setActiveAccordion3((prevAccordion3) =>
      prevAccordion3 === accordionId ? "" : accordionId
    );
  };

  const isAccordionExpanded3 = (accordionId) => {
    return activeAccordion3 === accordionId;
  };

  const toggleAccordion3 = (accordionId) => {
    if (isAccordionExpanded3(accordionId)) {
      setActiveAccordion3("");
    } else {
      setActiveAccordion3(accordionId);
    }
  };
  const handleFormSubmit = async (
    _values,
    { resetForm, setErrors, setStatus, setSubmitting }
  ) => {
    try {
      console.log("_values___", _values);
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
      <div className='event-full-modal-cover-div'>
        <div>
          <h3 className='create-tag-text' style={{ fontSize: '24px', color: 'black' }}>Select audience</h3>
        </div>
        <div className='modal-cover-div'>
          <img className='modal-cover-img' src={eventModalcover.src} alt='' />
          <button className='modal-cover-svg-div' style={{ borderRadius: '5px', backgroundColor: '#959595', color: 'white', border: '0px' }}>
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
        </div>

        <Formik
          initialValues={{
            group_id: group_id,
            title: undefined,
            host_user_id: userId,

            start_date: null,
            start_time: null,

            end_date: null,
            end_time: null,

            type: undefined,

            meeting_url: undefined,
            location: undefined,
            inviteAllMember: false,
            co_host_user_id: undefined,

            details: undefined

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
            console.log("__", values);
            // console.log({ errors }); 
            return (
              <form onSubmit={handleSubmit}>
                <div className='container-fluid '>
                  {/* Host profile */}
                  <div className="py-2">
                    <Link href={`/${userName}/timeline`} style={{ display: 'flex', gap: '15px', }} >
                      <div>
                        {userImage !== null ? (
                          <img alt="author" src={`${host}/uploads/${userImage}`} className="avatar " />
                        ) : (
                          <img
                            src="https://www.kindpng.com/picc/m/24-248253_user-profile-default-image-png-clipart-png-download.png"
                            className="bi bi-wallet2 olymp-explore-icon left-menu-icon"
                            style={{ width: "40px", height: "40px", objectFit: "cover" }}
                          />
                        )}
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                        <b>{fullName}</b>
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


                        {/* <AutoCompleteWrapper
                          options={['Virtual', 'Real']}
                          value={'Virtual'}
                          required={true}
                          disableClearable={true}
                          handleChange={(e, v) => {

                          }}
                        /> */}

                        <select
                          className='form-select select-event-modal'
                          aria-label=' select example' onChange={(e) => {
                            setFieldValue('type', e.target.value)
                          }}>
                          <option className=" py-2" selected value="Virtual">Virtual</option>
                          <option className=" py-2" value='Real'>Real</option>
                        </select>
                      </div>

                    </div>


                    {/* Meeting url */}
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
                    {/* Location */}
                    <div className='col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 mb-2'>
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
                    {/* Add Co-host */}
                    <div className='col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 mb-2'>
                      <input
                        className='inp-event-name'
                        name="co_host_user_id"
                        placeholder='Add Co-host'
                        error={Boolean(touched?.co_host_user_id && errors?.co_host_user_id)}
                        helperText={touched?.co_host_user_id && errors?.co_host_user_id}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values?.co_host_user_id}
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
                      <Switch {...label} value={values?.inviteAllMember} onChange={(_, v) => setFieldValue('inviteAllMember', v)} />
                    </div>
                    {/* details */}
                    <div className='modal-details-div'>
                      <input
                        className='modal-details'
                        name="details"
                        type='comment'
                        placeholder='What are the details'
                        alt=''
                        error={Boolean(touched?.details && errors?.details)}
                        helperText={touched?.details && errors?.details}
                        onBlur={handleBlur}
                        onChange={handleChange}
                      />
                    </div>

                  </div>

                  <div className='modal-create-btn-div'>
                    <button className='modal-create-btn' type='submit' style={{ backgroundColor: '#307777', color: 'white' }}> Create Event</button>
                  </div>
                </div>
              </form>
            );
          }}
        </Formik>


      </div>
    </div>
  );
};

export default EventModal;
