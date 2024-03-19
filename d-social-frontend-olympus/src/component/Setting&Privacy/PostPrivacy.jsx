import { Formik } from 'formik';
import React, { useEffect, useState } from 'react'
import * as Yup from 'yup';
import { AutoCompleteWrapper, Loader, TextFieldWrapper } from '@/component/Reuseable';
import ReactDatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { MuiTelInput } from 'mui-tel-input';
import { Button, Grid, IconButton, InputAdornment, TextField } from '@mui/material';
import PublicIcon from '@mui/icons-material/Public';
import { post_pricay_optionlist } from '@/app/[username]/profile/_old';
import axiosInstance from '../../../utils/axios';
import useToaster from '@/hooks/useToaster';
export default function PostPrivacy() {
    const { showNotification } = useToaster()
    const [prevData, setPrevData] = useState(null)

    const getUserPostPrivacy = () => {
        setPrevData(null)
        axiosInstance.get(`/api/settings-privacy/get-post-privacy?post_type=timeline_post`)
            .then(res => setPrevData(res.data?.privacy ? res.data?.privacy : {}))
            .catch(err => {
                showNotification('Previous settings getting failed', 'error')
                console.log(err)
            })
    }

    useEffect(() => {
        getUserPostPrivacy()
    }, [])


    const handleFormSubmit = async (_values, { resetForm, setErrors, setStatus, setSubmitting }) => {
        axiosInstance.post('/api/settings-privacy/update-post-privacy', _values)
            .then(res => {
                showNotification(res?.data?.message)
            })
            .catch(err => {
                console.log(err);
                showNotification('Information Update failed', 'error')
            })
    }
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    return (

        <div className="ui-block">
            <div className="ui-block-title " style={{ border: 0 }}>
                <h6 className="title" style={{ textAlign: 'start', borderBottom: '0px' }}>Post Privacy</h6>
            </div>
            <div className="ui-block-content pl-4">
                <Grid display={'grid'} gridTemplateColumns={'50%'}>
                    {
                        prevData ?
                            <Formik
                                enableReinitialize
                                initialValues={{
                                    who_can_see: prevData?.who_can_see || undefined,
                                    who_can_share: prevData?.who_can_share || undefined,
                                    who_can_comment: prevData?.who_can_comment || undefined,
                                    post_type: 'timeline_post'
                                }}
                                validationSchema={Yup.object().shape({
                                    who_can_see: Yup.string()
                                        .max(255)
                                        .required("Field is required"),
                                    who_can_share: Yup.string()
                                        .max(255)
                                        .required("Field is required"),
                                    who_can_comment: Yup.string()
                                        .max(255)
                                        .required("Field is required"),
                                    
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
                                                gridTemplateColumns: '1fr',
                                                gap: 2
                                            }}>
                                                <div>
                                                    <label className="ads-create-label-text ">
                                                        Who can see your posts?
                                                    </label>
                                                    <AutoCompleteWrapper
                                                        options={post_pricay_optionlist}
                                                        value={post_pricay_optionlist.find(i => i.value == values?.who_can_see)}
                                                        required={true} // should change to true
                                                        // disableClearable={true}
                                                        handleChange={(e, v) => {
                                                            setFieldValue('who_can_see', v?.value)
                                                        }}
                                                        renderInput={(rnParams) => (
                                                            <TextField
                                                                size="small"
                                                                fullWidth
                                                                required={true}
                                                                {...rnParams}
                                                                // label={label}
                                                                // placeholder={placeholder}
                                                                InputProps={{
                                                                    ...rnParams.InputProps,
                                                                    startAdornment: (
                                                                        <InputAdornment position='start'>
                                                                            <IconButton
                                                                                onMouseDown={handleMouseDownPassword}
                                                                            >
                                                                                {/* <PublicIcon /> */}
                                                                                {post_pricay_optionlist.find(i => i.value == (values?.who_can_see ? values?.who_can_see : 'public'))?.icon}
                                                                            </IconButton>
                                                                        </InputAdornment>
                                                                    )
                                                                }}

                                                            />
                                                        )}
                                                    />
                                                </div>
                                                <div>
                                                    <label className="ads-create-label-text ">
                                                        Who can share your posts?
                                                    </label>
                                                    <AutoCompleteWrapper
                                                        options={post_pricay_optionlist}
                                                        value={post_pricay_optionlist.find(i => i.value == values?.who_can_share)}
                                                        required={true} // should change to true
                                                        // disableClearable={true}
                                                        handleChange={(e, v) => {
                                                            // setSelectedCat(v);
                                                            setFieldValue('who_can_share', v?.value);
                                                        }}
                                                        renderInput={(rnParams) => (
                                                            <TextField
                                                                size="small"
                                                                fullWidth
                                                                required={true}
                                                                {...rnParams}
                                                                // label={label}
                                                                // placeholder={placeholder}
                                                                InputProps={{
                                                                    ...rnParams.InputProps,
                                                                    startAdornment: (
                                                                        <InputAdornment position='start'>
                                                                            <IconButton
                                                                                onClick={() => {

                                                                                }}
                                                                                onMouseDown={handleMouseDownPassword}
                                                                            >
                                                                                {post_pricay_optionlist.find(i => i.value == (values?.who_can_share ? values?.who_can_share : 'public'))?.icon}
                                                                            </IconButton>
                                                                        </InputAdornment>
                                                                    )
                                                                }}

                                                            />
                                                        )}
                                                    />
                                                </div>
                                                <div>
                                                    <label className="ads-create-label-text ">
                                                        Who can Comment your posts?
                                                    </label>
                                                    <AutoCompleteWrapper
                                                        options={post_pricay_optionlist}
                                                        value={post_pricay_optionlist.find(i => i.value == values?.who_can_comment)}
                                                        required={true} // should change to true
                                                        // disableClearable={true}
                                                        handleChange={(e, v) => {
                                                            // setSelectedCat(v);
                                                            setFieldValue('who_can_comment', v?.value);
                                                        }}
                                                        renderInput={(rnParams) => (
                                                            <TextField
                                                                size="small"
                                                                fullWidth
                                                                required={true}
                                                                {...rnParams}
                                                                // label={label}
                                                                // placeholder={placeholder}
                                                                InputProps={{
                                                                    ...rnParams.InputProps,
                                                                    startAdornment: (
                                                                        <InputAdornment position='start'>
                                                                            <IconButton
                                                                                onClick={() => {

                                                                                }}
                                                                                onMouseDown={handleMouseDownPassword}
                                                                            >
                                                                                {post_pricay_optionlist.find(i => i.value == (values?.who_can_comment ? values?.who_can_comment : 'public'))?.icon}
                                                                            </IconButton>
                                                                        </InputAdornment>
                                                                    )
                                                                }}

                                                            />
                                                        )}
                                                    />
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

                                                        <h5 style={{ color: "white", paddingTop: 4 }}>Update</h5>
                                                    </button>
                                                </div>




                                            </Grid>
                                        </form>
                                    );
                                }}
                            </Formik>
                            : <Loader />
                    }
                </Grid>
            </div>

        </div>
    )
}
