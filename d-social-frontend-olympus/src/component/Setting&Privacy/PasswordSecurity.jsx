import { Formik } from 'formik';
import React, { useState } from 'react'
import * as Yup from 'yup';
import { AutoCompleteWrapper, TextFieldWrapper } from '@/component/Reuseable';
import ReactDatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { MuiTelInput } from 'mui-tel-input';
import { Button, Grid, IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import useToaster from '@/hooks/useToaster';
import axiosInstance from '../../../utils/axios';

export default function PasswordSecurity() {
    const { showNotification } = useToaster()


    const [password, setPassword] = useState({
        showPassword: false,
        showNewPassword: false,
        showConfirmPassword: false,

    });


    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    return (

        <div className="ui-block">
            <div className="ui-block-title " style={{ border: 0 }}>
                <h6 className="title" style={{ textAlign: 'start', borderBottom: '0px' }}>Password and security</h6>
            </div>
            <div className="ui-block-content pl-4">
                <Grid display={'grid'} gridTemplateColumns={'50%'}>

                    <Formik
                        enableReinitialize

                        initialValues={{
                            password: undefined,
                            newPassword: undefined,
                            confirmPassword: undefined,

                        }}
                        validationSchema={Yup.object().shape({
                            password: Yup.string()
                                .max(255)
                                .required("Password field is required"),
                            newPassword: Yup.string()
                                .max(255)
                                .required('New password field is required')
                                .min(8, 'Password is too short - should be 8 chars minimum.')
                                .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
                                    "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
                                )
                            ,
                            confirmPassword: Yup.string()
                                .max(255)
                                .required('Confirm password field is required')
                                .oneOf([Yup.ref('newPassword'), null], 'Password must match'),


                        })}
                        onSubmit={async (_values, { resetForm, setErrors, setStatus, setSubmitting }) => {
                            axiosInstance.post('/api/settings-privacy/password-change', _values)
                                .then(res => {
                                    showNotification(res?.data?.message)
                                    resetForm()
                                })
                                .catch(err => {
                                    console.log(err);
                                    showNotification(err?.response?.data?.message, 'error');
                                })
                        }}
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
                            resetForm
                        }) => {
                            console.log(errors);
                            return (
                                <form onSubmit={handleSubmit}>
                                    <Grid sx={{
                                        display: 'grid',
                                        gridTemplateColumns: '1fr',
                                        gap: 2
                                    }}>
                                        {/* Current Password */}
                                        <div>
                                            <label className="ads-create-label-text ">Current Password</label>
                                            <TextFieldWrapper
                                                name="password"
                                                placeholder='DesignWITHdesigners12345'
                                                value={values?.password}
                                                touched={touched?.password}
                                                errors={errors?.password}
                                                handleChange={handleChange}
                                                handleBlur={handleChange}
                                                type={
                                                    password.showPassword
                                                        ? "text"
                                                        : "password"
                                                }
                                                InputProps={{
                                                    endAdornment: (
                                                        <InputAdornment position="end">
                                                            <IconButton
                                                                onClick={() => {
                                                                    setPassword(p => ({
                                                                        ...p,
                                                                        showPassword: !p.showPassword,
                                                                    }));
                                                                }}
                                                                onMouseDown={handleMouseDownPassword}
                                                            >
                                                                {password?.showPassword ? (
                                                                    <Visibility />
                                                                ) : (
                                                                    <VisibilityOff />
                                                                )}
                                                            </IconButton>
                                                        </InputAdornment>
                                                    )
                                                }}
                                            />
                                        </div>
                                        {/* New Password */}
                                        <div>
                                            <label className="ads-create-label-text ">New Password</label>
                                            <TextFieldWrapper
                                                name="newPassword"
                                                placeholder='DesignWITHdesigners@@12345'
                                                value={values?.newPassword}
                                                touched={touched?.newPassword}
                                                errors={errors?.newPassword}
                                                handleChange={handleChange}
                                                handleBlur={handleChange}
                                                type={
                                                    password.showNewPassword
                                                        ? "text"
                                                        : "password"
                                                }
                                                InputProps={{
                                                    endAdornment: (
                                                        <InputAdornment position="end">
                                                            <IconButton
                                                                onClick={() => {
                                                                    setPassword(p => ({
                                                                        ...p,
                                                                        showNewPassword: !p.showNewPassword,
                                                                    }));
                                                                }}
                                                                onMouseDown={handleMouseDownPassword}
                                                            >
                                                                {password?.showNewPassword ? (
                                                                    <Visibility />
                                                                ) : (
                                                                    <VisibilityOff />
                                                                )}
                                                            </IconButton>
                                                        </InputAdornment>
                                                    )
                                                }}
                                                autocomplete="new-password"
                                            />
                                        </div>
                                        {/* Confirm Password */}
                                        <div>
                                            <label className="ads-create-label-text ">Confirm Password</label>
                                            <TextFieldWrapper
                                                name="confirmPassword"
                                                placeholder='DesignWITHdesigners@@12345'
                                                value={values?.confirmPassword}
                                                touched={touched?.confirmPassword}
                                                errors={errors?.confirmPassword}
                                                handleChange={handleChange}
                                                handleBlur={handleChange}
                                                type={
                                                    password.showConfirmPassword
                                                        ? "text"
                                                        : "password"
                                                }
                                                InputProps={{
                                                    endAdornment: (
                                                        <InputAdornment position="end">
                                                            <IconButton
                                                                onClick={() => {
                                                                    setPassword(p => ({
                                                                        ...p,
                                                                        showConfirmPassword: !p.showConfirmPassword,
                                                                    }));
                                                                }}
                                                                onMouseDown={handleMouseDownPassword}
                                                            >
                                                                {password?.showConfirmPassword ? (
                                                                    <Visibility />
                                                                ) : (
                                                                    <VisibilityOff />
                                                                )}
                                                            </IconButton>
                                                        </InputAdornment>
                                                    )
                                                }}
                                            />
                                        </div>

                                        <Grid sx={{
                                            display: 'grid',
                                            gridTemplateColumns: '1fr 1fr',
                                            gap: 2
                                        }}>
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
                                                    onClick={() => { 
                                                        console.log('cliiubuhb', resetForm());
                                                        resetForm()
                                                     }}
                                                >

                                                    <h5 style={{ color: "#307777", paddingTop: 4 }}>Reset Field</h5>
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

                                                >

                                                    <h5 style={{ color: "white", paddingTop: 4 }}>Update</h5>
                                                </button>
                                            </div>
                                        </Grid>


                                    </Grid>
                                </form>
                            );
                        }}
                    </Formik>
                </Grid>
            </div>

        </div >
    )
}
