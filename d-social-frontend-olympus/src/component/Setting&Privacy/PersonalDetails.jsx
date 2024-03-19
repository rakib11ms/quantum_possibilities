import { Formik } from 'formik';
import React, { useEffect, useState } from 'react'
import * as Yup from 'yup';
import { AutoCompleteWrapper, Loader, TextFieldWrapper } from '@/component/Reuseable';
import ReactDatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { MuiTelInput } from 'mui-tel-input';
import { Box, Button, CircularProgress, Dialog, Grid, TextField } from '@mui/material';
import axiosInstance from '../../../utils/axios';
import useToaster from '@/hooks/useToaster';

export default function PersonalDetails() {
    const { showNotification } = useToaster()
    const [addContactModal, setAddContactModal] = useState(false)
    const [prevData, setPrevData] = useState(null)

    const getUserInfo = () => {
        setPrevData(null)
        const username = localStorage.getItem('username')
        if (username) {
            axiosInstance.post('/api/get-user-info', { username })
                .then(res => setPrevData(res.data.userInfo[0]))
                .catch(err => console.log(err))
        }
    }

    useEffect(() => {
        getUserInfo()
    }, [])

    const handleClose = () => {
        setAddContactModal(false)
    }
    const handleOnpen = () => {
        setAddContactModal(true)
    }
    const handleFormSubmit = async (_values, { resetForm, setErrors, setStatus, setSubmitting }) => {
        axiosInstance.patch('/api/settings-privacy/personal-details', _values)
            .then(res => {
                showNotification(res?.data?.message)
                getUserInfo()
            })
            .catch(err => {
                console.log(err);
                showNotification('Information Update failed', 'error')
            })
    }
    return (

        <div className="ui-block">
            <div className="ui-block-title " style={{ border: 0 }}>
                <h6 className="title" style={{ textAlign: 'start', borderBottom: '0px' }}>Personal Details</h6>
            </div>
            <div className="ui-block-content pl-4">
                <Grid display={'grid'} gridTemplateColumns={'66.66%'}>
                    {
                        prevData ?
                            <Formik
                                enableReinitialize
                                initialValues={{
                                    first_name: prevData?.first_name || undefined,
                                    last_name: prevData?.last_name || undefined,
                                    email: prevData?.email || undefined,
                                    phone: prevData?.phone || '+880',
                                    date_of_birth: prevData?.date_of_birth ? new Date(prevData?.date_of_birth) : null,

                                }}
                                validationSchema={Yup.object().shape({
                                    first_name: Yup.string()
                                        .max(255)
                                        .required("First Name is required"),
                                    last_name: Yup.string()
                                        .max(255)
                                        .required("Last Name is required"),
                                    // email: Yup.string()
                                    //     .max(255)
                                    //     .required("Email is required"),
                                    phone: Yup.string()
                                        .max(255)
                                        .required("Phone number is required"),
                                    date_of_birth: Yup.date()
                                        .required("Date of birth is required"),


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
                                    console.log(errors);
                                    return (
                                        <form onSubmit={handleSubmit}>
                                            <Grid sx={{
                                                display: 'grid',
                                                gridTemplateColumns: '1fr 1fr',
                                                gap: 2
                                            }}>
                                                <div>
                                                    <label className="ads-create-label-text ">First Name</label>
                                                    <TextFieldWrapper
                                                        name="first_name"
                                                        placeholder='John doe'
                                                        value={values?.first_name}
                                                        touched={touched?.first_name}
                                                        errors={errors?.first_name}
                                                        handleChange={handleChange}
                                                        handleBlur={handleChange}
                                                    />
                                                </div>
                                                <div>
                                                    <label className="ads-create-label-text ">last Name</label>
                                                    <TextFieldWrapper
                                                        name="last_name"
                                                        placeholder='John doe'
                                                        value={values?.last_name}
                                                        touched={touched?.last_name}
                                                        errors={errors?.last_name}
                                                        handleChange={handleChange}
                                                        handleBlur={handleChange}
                                                    />
                                                </div>

                                                <div>
                                                    <label className="ads-create-label-text ">
                                                        Email
                                                    </label>
                                                    <AutoCompleteWrapper
                                                        options={prevData?.email_list || []}
                                                        value={prevData?.email_list?.find(i => i == values?.email)}
                                                        placeholder={'shantoshah@gmail.com'}
                                                        // required={true}
                                                        // disableClearable={true}
                                                        handleChange={(e, v) => {
                                                            // setSelectedCat(v);
                                                            setFieldValue('email', v);
                                                        }}
                                                    />
                                                </div>

                                                <div>
                                                    <label className="ads-create-label-text ">
                                                        Mobile Number
                                                    </label>
                                                    <AutoCompleteWrapper
                                                        options={prevData?.phone_list}
                                                        value={prevData?.phone_list?.find(i => i == values?.phone)}

                                                        handleChange={(e, v) => {
                                                            setFieldValue('phone', v)
                                                        }}
                                                        
                                                    />


                                                </div>

                                                <div>
                                                    <label className="ads-create-label-text ">Date of Birth</label>

                                                    <TextField
                                                        size='small'
                                                        sx={{
                                                            [`& fieldset`]: {
                                                                borderRadius: 0.6,
                                                            },
                                                            width: '100%'
                                                            // border:'1px solid red'
                                                        }}
                                                        read
                                                        InputProps={{
                                                            startAdornment: (
                                                                <div className="datepicker-input-div" style={{ height: '40px', borderRadius: "12px", border: '0px', width: '100%', position: 'absolute' }}>
                                                                    <span>
                                                                        <svg
                                                                            xmlns="http://www.w3.org/2000/svg"
                                                                            width="14"
                                                                            height="14"
                                                                            fill="gray"
                                                                            class="bi bi-calendar4"
                                                                            viewBox="0 0 16 16"
                                                                        >
                                                                            <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5M2 2a1 1 0 0 0-1 1v1h14V3a1 1 0 0 0-1-1zm13 3H1v9a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1z" />
                                                                        </svg>
                                                                    </span>
                                                                    <ReactDatePicker
                                                                        placeholderText="Date"
                                                                        className="datepicker-input"
                                                                        selected={values?.date_of_birth}
                                                                        // minDate={new Date()}
                                                                        onChange={(date) => {
                                                                            console.log("date__", date);
                                                                            setFieldValue('date_of_birth', date)
                                                                        }}
                                                                        dateFormat="MMM dd, yyyy"

                                                                    />
                                                                </div>
                                                            ),
                                                        }}
                                                    />

                                                </div>
                                                <div></div>
                                                <div className="d-flex justify-content-between align-items-center">
                                                    <button
                                                        type='button'
                                                        style={{
                                                            cursor: "pointer",
                                                            border: "1px solid #307777",
                                                            textAlign: 'center',
                                                            width: '100%',
                                                            borderRadius: '5px',
                                                            backgroundColor: 'transparent'
                                                        }}
                                                        // className="create-back-svg"
                                                        className='py-1'
                                                        onClick={handleOnpen}
                                                    >

                                                        <h5 style={{ color: "#307777", paddingTop: 4 }}>Add Contacts</h5>
                                                    </button>

                                                </div>
                                                <div className="d-flex justify-content-between align-items-center">
                                                    <button
                                                        type='submit'
                                                        style={{
                                                            cursor: "pointer",
                                                            border: "none",
                                                            textAlign: 'center',
                                                            width: '100%',
                                                        }}
                                                        className="create-back-svg"
                                                        onClick={() => {

                                                        }}
                                                    >

                                                        <h5 style={{ color: "white", paddingTop: 4 }}>Update Information</h5>
                                                    </button>
                                                </div>


                                            </Grid>
                                        </form>
                                    );
                                }}
                            </Formik>
                            : <Loader />
                    }
                    <Dialog
                        fullWidth
                        // maxWidth='md'
                        maxWidth='xs'
                        open={addContactModal}
                        onClose={handleClose}
                    >
                        <AddPhoneAndEmail handleClose={handleClose} getUserInfo={getUserInfo} />

                    </Dialog>
                </Grid>
            </div>

        </div>
    )
}
const temp = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8
}

function AddPhoneAndEmail({ handleClose, getUserInfo }) {
    const { showNotification } = useToaster()
    const [data, setData] = useState({})
    const [activeTab, setActiveTab] = useState(1)

    useEffect(() => {
        setData({})
    }, [activeTab])

    const handleSubmit = (e) => {
        e.preventDefault();

        if (Object.keys(data).length) {

            axiosInstance.post('/api/settings-privacy/add-phone-email', data)
                .then(res => {
                    showNotification(res?.data?.message)
                    getUserInfo()
                    handleClose()
                })
                .catch(err => {
                    console.log(err);
                    showNotification(err.response.data.message, "error");
                })
        }

    }
    return (
        <Grid display={'grid'} gridTemplateColumns={'1fr'} p={3} gap={2}>
            <Grid display={'grid'} gridTemplateColumns={'1fr 1fr'} gap={1}>
                <button
                    className="create-back-svg"
                    style={{
                        ...temp,
                        border: "1px solid #D0D5DD",
                        backgroundColor: activeTab == 1 ? '#307777' : 'transparent'

                    }}
                    onClick={() => setActiveTab(1)}
                >
                    <span>
                        <svg width="15" height="15" viewBox="0 0 15 15" fill="#D0D5DD" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12.3387 9.12816L14.3213 11.1108C14.6961 11.4856 14.6961 12.0933 14.3213 12.4682C12.2948 14.4947 9.08645 14.7227 6.79367 13.0031L6.66001 12.9029C4.93054 11.6058 3.3942 10.0695 2.09709 8.33999L1.99685 8.20633C0.277271 5.91355 0.505277 2.70525 2.53182 0.678704C2.90666 0.303866 3.51439 0.303866 3.88923 0.678704L5.87184 2.66131C6.26236 3.05184 6.26236 3.685 5.87184 4.07553L4.47409 5.47328C4.2224 5.72497 4.16 6.10948 4.31919 6.42784C5.2394 8.26828 6.73172 9.7606 8.57216 10.6808C8.89052 10.84 9.27503 10.7776 9.52672 10.5259L10.9245 9.12816C11.315 8.73764 11.9482 8.73763 12.3387 9.12816Z"
                                fill={activeTab == 1 ? "#FFFFFF" : "#222222"} />
                        </svg>
                    </span>

                    <h6 style={{ color: activeTab == 1 ? 'white' : 'black', }}> Phone Number</h6>
                </button>
                <button
                    className="create-back-svg"
                    style={{
                        ...temp,
                        border: "1px solid #D0D5DD",
                        backgroundColor: activeTab == 2 ? '#307777' : 'transparent'

                    }}
                    onClick={() => setActiveTab(2)}
                >
                    <span>
                        <svg width="19" height="14" viewBox="0 0 19 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M1.37868 0.87868C0.5 1.75736 0.5 3.17157 0.5 6V8C0.5 10.8284 0.5 12.2426 1.37868 13.1213C2.25736 14 3.67157 14 6.5 14H12.5C15.3284 14 16.7426 14 17.6213 13.1213C18.5 12.2426 18.5 10.8284 18.5 8V6C18.5 3.17157 18.5 1.75736 17.6213 0.87868C16.7426 0 15.3284 0 12.5 0H6.5C3.67157 0 2.25736 0 1.37868 0.87868ZM4.0547 3.16795C3.59517 2.8616 2.9743 2.98577 2.66795 3.4453C2.3616 3.90483 2.48577 4.5257 2.9453 4.83205L8.3906 8.46225C9.0624 8.91012 9.9376 8.91012 10.6094 8.46225L16.0547 4.83205C16.5142 4.5257 16.6384 3.90483 16.3321 3.4453C16.0257 2.98577 15.4048 2.8616 14.9453 3.16795L9.5 6.79815L4.0547 3.16795Z"
                                fill={activeTab == 2 ? "#FFFFFF" : "#222222"} />
                        </svg>
                    </span>

                    <h6 style={{ color: activeTab == 2 ? 'white' : 'black', }}>Email Address</h6>
                </button>
            </Grid>

            <form onSubmit={handleSubmit}>
                <label className="ads-create-label-text ">{activeTab == 1 ? 'Phone Number' : 'Email Address'}</label>
                {
                    activeTab == 1 ? <MuiTelInput
                        value={data?.phone || '+880'}
                        onChange={(e) => setData({ phone: e })}
                        placeholder='+44 0000 0000000'
                        size='small'
                        required={true}
                        sx={{
                            [`& fieldset`]: {
                                borderRadius: 0.6,
                            },
                            width: '100%',
                        }}
                    />
                        :
                        <TextFieldWrapper
                            type='email'
                            required={true}
                            placeholder='rakibulbanna@gmail.com'
                            value={data?.email}
                            handleChange={(e) => setData({ email: e.target.value })}
                        />
                }

                <button
                    className="create-back-svg"
                    style={{
                        color: 'white',
                        width: '100%',
                        marginTop: '20px'
                    }}
                    type='submit'
                >

                    Add
                </button>
            </form>

        </Grid>
    )
}

