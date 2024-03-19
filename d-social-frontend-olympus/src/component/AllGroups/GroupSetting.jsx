import React, { useEffect, useState } from "react";
import timeFormat from "../../../utils/CommentTimeFormat";
import { TextFieldWrapper, getFileUrl } from "@/component/Reuseable";
import axiosInstance from "../../../utils/axios";
import { toast } from "react-toastify";
import { Button, Card, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid } from "@mui/material";
import Image from "next/image";
import styled from "styled-components";
import { Formik } from "formik";
import * as Yup from "yup";
import { AutoCompleteWrapper } from "@/component/Reuseable";
import useToaster from "@/hooks/useToaster";
import { groupPrivacyList } from "@/app/grouppage/createGroup";


const lebelStyle = {
    fontFamily: 'Segoe UI',
    fontWeight: 600,
    fontSize: '16px',
    lineHeight: '21px'
}
const divContainerStle = {
    display: 'flex',
    flexDirection: 'column',
    gap: 10
}

const settingsTabs = [
    {
        title: 'Group Basic Information',
        value: 1
    },
    {
        title: 'Customize group',
        value: 2
    },
    {
        title: 'Group Privacy',
        value: 3
    },
    {
        title: 'Admin & Moderator',
        value: 4
    },
]
const participant_approval_list = [
    {
        label: 'Approved by group admin and Moderator',
        value: 'admin&monderator'
    },
    {
        label: 'Admin',
        value: 'admin'
    },
    {
        label: 'Monderator',
        value: 'monderator'
    }
]
const post_approval_list = [
    {
        label: 'Admin',
        value: 'admin'
    },
    {
        label: 'Moderator',
        value: 'moderator'
    }
]
const visibilityList = [
    {
        label: 'Visible',
        value: 'visible'
    },
    {
        label: 'Invisible',
        value: 'invisible'
    },
]
const isPostapprovalList = [{ label: 'Off', value: false }, { label: 'On', value: true }]

const GroupSetting = ({ groupDetails, fetchGroupDetails }) => {
    const [activeDiv, setActiveDiv] = useState(1);
    const [groupAdmins, setGroupAdmins] = useState([]);
    const [groupModerators, setGroupModerators] = useState([]);
    const [groupMembers, setGroupMembers] = useState([]);
    const { showNotification } = useToaster();
    const [openDeleteModal, setOpenDeleteModal] = useState(false)
    const [addAdminModal, setAddAdminModal] = useState(false)

    const handleClose = () => {
        setOpenDeleteModal(false)
    }

    const fetchMember = () => {
        axiosInstance
            .get(`/api/get-group-resource/${groupDetails?._id}?type=member`)
            .then((res) => {
                setGroupMembers(res?.data?.groupMembers?.data?.map(i => ({
                    label: [i?.group_member_user_id?.first_name, i?.group_member_user_id?.last_name].join(' '),
                    id: i?._id,
                    group_member_user_id: i?.group_member_user_id?._id
                })))
            })
            .catch((err) => console.log(err));
    };
    const fetchAdmins = () => {
        axiosInstance
            .get(`/api/get-group-resource/${groupDetails?._id}?type=admin`)
            .then((res) => setGroupAdmins(res?.data?.groupAdmins?.data))
            .catch((err) => console.log(err));
    };
    const fetchModerators = () => {
        axiosInstance
            .get(`/api/get-group-resource/${groupDetails?._id}?type=moderator`)
            .then((res) => setGroupModerators(res?.data?.groupModerator?.data))
            .catch((err) => console.log(err));
    };

    const handleFormSubmit = async (
        _values,
        { resetForm, setErrors, setStatus, setSubmitting }
    ) => {
        try {
            console.log("_values__", _values);
            const res = await axiosInstance.patch(`/api/groups/edit-group/${groupDetails?._id}`, _values)
            showNotification(res.data.message)
            fetchGroupDetails()
        } catch (err) {
            console.error(err);
            showNotification("There was an error, try again later", "error");
            setStatus({ success: false });
            setErrors({ submit: err.message });
            setSubmitting(false);
        }
    }


    return (
        <Grid sx={{ display: "grid", gridTemplateColumns: '1.1fr 3fr', height: '456px', backgroundColor: 'white' }}>

            <Grid className="" style={{ height: '456px', paddingTop: '15px' }}>
                <div className="container-fluid">
                    <ul style={{ display: "flex", flexDirection: "column", gap: 15 }}>
                        {
                            settingsTabs.map(tab => (
                                <li
                                    onClick={() => {
                                        setActiveDiv(tab.value);
                                        if (tab.value == 4) {
                                            fetchAdmins()
                                            fetchModerators()
                                        }
                                    }}
                                    className="prof-side-bar-li-sec"
                                    style={{
                                        padding: '6px 15px 6px 15px',
                                        color: '#686868',
                                        fontWeight: 600,
                                        fontSize: '14px',
                                        fontFamily: 'Segoe UI',
                                        backgroundColor: activeDiv === tab.value ? '#E4E6EB' : 'transparent',
                                        cursor: 'pointer'
                                    }}
                                >

                                    <div
                                    // className="prof-side-text-div"
                                    >
                                        <p>{tab.title}</p>
                                    </div>
                                </li>
                            ))
                        }
                        <li>

                            <hr />
                        </li>
                        <li
                            className={`prof-side-bar-li-sec `}
                            style={{ padding: '2px 15px 2px 15px', cursor: 'pointer' }}
                            onClick={() => setOpenDeleteModal(true)}
                        >

                            <p style={{ color: '#FF5555' }}>Delete Group</p>

                        </li>

                    </ul>
                </div>
            </Grid>

            <Grid
                sx={{
                    borderLeft: '1px solid #E3EDED',
                    px: 2,
                    pt: 2
                }}
            >
                {activeDiv == 1 &&

                    <Formik
                        initialValues={{
                            group_name: groupDetails ? groupDetails?.group_name : undefined,
                            group_description: groupDetails ? groupDetails?.group_description : undefined,
                            location: groupDetails ? groupDetails?.location : undefined,
                        }}
                        validationSchema={Yup.object().shape({
                            group_name: Yup.string().max(255).required("Group name field is required"),
                            group_description: Yup.string().max(255).required("Group description field is required"),
                            location: Yup.string().max(255).required("Group location field is required"),
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
                            {/* console.log("T__values__", values);
            console.log({ errors }); */}
                            return (
                                <form onSubmit={handleSubmit} style={divContainerStle}>
                                    {/* Group Name */}
                                    <div >

                                        <label style={lebelStyle}> Group Name</label>
                                        <TextFieldWrapper
                                            // label={"Group name"}
                                            // placeholder={"Name here..."}
                                            name="group_name"
                                            value={values?.group_name}
                                            touched={touched?.group_name}
                                            errors={errors?.group_name}
                                            handleChange={handleChange}
                                            handleBlur={handleChange}
                                            sx={{
                                                [`& fieldset`]: {
                                                    borderRadius: '8px',
                                                }
                                            }}
                                        />
                                    </div>
                                    {/* Description */}
                                    <div >
                                        <label style={lebelStyle}>
                                            Group Description
                                        </label>
                                        <TextFieldWrapper
                                            // label={"Description"}
                                            name="group_description"
                                            value={values?.group_description}
                                            touched={touched?.group_description}
                                            errors={errors?.group_description}
                                            handleChange={handleChange}
                                            handleBlur={handleChange}
                                            minRows={4}
                                            maxRows={5}
                                            multiline
                                            sx={{
                                                [`& fieldset`]: {
                                                    borderRadius: '8px',
                                                }
                                            }}
                                        />

                                    </div>
                                    {/* Location */}
                                    <div >

                                        <label style={lebelStyle}> Location</label>
                                        <TextFieldWrapper
                                            // label={"Group name"}
                                            // placeholder={"Name here..."}
                                            name="location"
                                            value={values?.location}
                                            touched={touched?.location}
                                            errors={errors?.location}
                                            handleChange={handleChange}
                                            handleBlur={handleChange}
                                            sx={{
                                                [`& fieldset`]: {
                                                    borderRadius: '8px',
                                                }
                                            }}
                                        />
                                    </div>

                                    <div className="mt-4">
                                        <button
                                            className="create-next-svg group-demo-invite-btn py-3"
                                            type="submit"
                                        >
                                            Save Changes
                                        </button>
                                    </div>

                                </form>
                            );
                        }}
                    </Formik>
                }
                {activeDiv == 2 &&

                    <Formik
                        initialValues={{
                            custom_link: groupDetails ? groupDetails?.custom_link : undefined,
                            participant_approve_by: groupDetails ? groupDetails?.participant_approve_by : undefined,
                            visibility: groupDetails ? groupDetails?.visibility : undefined,

                        }}
                        // validationSchema={Yup.object().shape({
                        //     group_name: Yup.string().max(255).required("Group name field is required"),
                        //     group_description: Yup.string().max(255).required("Group description field is required"),
                        //     group_privacy: Yup.string().max(255).required("Group privacy field is required"),

                        //     location: Yup.string().max(255).required("Group location field is required"),
                        //     zip_code: Yup.number().required("Group zip code field is required"),
                        //     invited_users: Yup.array().required("Group invited users field is required"),
                        // })}
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
                            {/* console.log("T__values__", values);
            console.log({ errors }); */}
                            return (
                                <form onSubmit={handleSubmit} style={divContainerStle}>
                                    {/* Custom Link */}
                                    <div >
                                        <label style={lebelStyle}> Group Custom Link</label>
                                        <TextFieldWrapper
                                            name="custom_link"
                                            value={values?.custom_link}
                                            touched={touched?.custom_link}
                                            errors={errors?.custom_link}
                                            handleChange={handleChange}
                                            handleBlur={handleChange}
                                            sx={{
                                                [`& fieldset`]: {
                                                    borderRadius: '8px',
                                                }
                                            }}
                                        />
                                    </div>
                                    {/* Participant approval */}
                                    <div >
                                        <label style={lebelStyle}> Participant approval</label>
                                        <AutoCompleteWrapper
                                            options={participant_approval_list}
                                            value={participant_approval_list.find(i => i.value == values?.participant_approve_by)}
                                            required={true}
                                            disableClearable={true}
                                            handleChange={(e, v) => setFieldValue("participant_approve_by", v?.value)}
                                            sx={{
                                                [`& fieldset`]: {
                                                    borderRadius: '8px',
                                                }
                                            }}
                                        />

                                    </div>
                                    {/* Hide group */}
                                    <div >
                                        <label style={lebelStyle}> Hide group</label>
                                        <AutoCompleteWrapper
                                            options={visibilityList}
                                            value={visibilityList.find(i => i.value == values?.visibility)}
                                            required={true}
                                            disableClearable={true}
                                            handleChange={(e, v) => setFieldValue("visibility", v?.value)}
                                            sx={{
                                                [`& fieldset`]: {
                                                    borderRadius: '8px',
                                                }
                                            }}
                                        />
                                    </div>

                                    <div className="mt-4">
                                        <button
                                            className="create-next-svg group-demo-invite-btn py-3"
                                            type="submit"
                                        >
                                            Save Changes
                                        </button>
                                    </div>

                                </form>
                            );
                        }}
                    </Formik>
                }
                {activeDiv == 3 &&

                    <Formik
                        initialValues={{
                            group_privacy: groupDetails ? groupDetails?.group_privacy : undefined,
                            is_post_approve: groupDetails ? groupDetails?.is_post_approve : undefined,
                            post_approve_by: groupDetails ? groupDetails?.post_approve_by : undefined,

                        }}
                        // validationSchema={Yup.object().shape({
                        //     group_name: Yup.string().max(255).required("Group name field is required"),
                        //     group_description: Yup.string().max(255).required("Group description field is required"),
                        //     group_privacy: Yup.string().max(255).required("Group privacy field is required"),

                        //     location: Yup.string().max(255).required("Group location field is required"),
                        //     zip_code: Yup.number().required("Group zip code field is required"),
                        //     invited_users: Yup.array().required("Group invited users field is required"),
                        // })}
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
                            {/* console.log("T__values__", values);
            console.log({ errors }); */}
                            return (
                                <form onSubmit={handleSubmit} style={divContainerStle}>
                                    {/* Group Type */}
                                    <div >
                                        <label style={lebelStyle}> Group Type</label>
                                        <AutoCompleteWrapper
                                            options={groupPrivacyList}
                                            value={groupPrivacyList.find(i => i == values?.group_privacy)}
                                            required={true}
                                            disableClearable={true}
                                            handleChange={(e, v) => setFieldValue("group_privacy", v)}
                                            sx={{
                                                [`& fieldset`]: {
                                                    borderRadius: '8px',
                                                }
                                            }}
                                        />

                                    </div>
                                    {/* Require post approval */}
                                    <div >

                                        <label style={lebelStyle}> Require post approval</label>
                                        <AutoCompleteWrapper
                                            options={isPostapprovalList}
                                            value={isPostapprovalList.find(i => i.value == values?.is_post_approve)}
                                            required={true}
                                            disableClearable={true}
                                            handleChange={(e, v) => setFieldValue("is_post_approve", v?.value)}
                                            sx={{
                                                [`& fieldset`]: {
                                                    borderRadius: '8px',
                                                }
                                            }}
                                        />
                                    </div>

                                    {/* Who can approved Post */}
                                    <div >
                                        <label style={lebelStyle}> Who can approved Post</label>
                                        <AutoCompleteWrapper
                                            options={post_approval_list}
                                            value={post_approval_list.find(i => i.value == values?.post_approve_by)}
                                            required={true}
                                            disableClearable={true}
                                            handleChange={(e, v) => setFieldValue("post_approve_by", v?.value)}
                                            sx={{
                                                [`& fieldset`]: {
                                                    borderRadius: '8px',
                                                }
                                            }}
                                        />
                                    </div>

                                    <div className="mt-4">
                                        <button
                                            className="create-next-svg group-demo-invite-btn py-3"
                                            type="submit"
                                        >
                                            Save Changes
                                        </button>
                                    </div>

                                </form>
                            );
                        }}
                    </Formik>
                }
                {
                    activeDiv == 4 &&
                    <>
                        <div>
                            <Grid display={'flex'} justifyContent={'space-between'}>
                                <label style={lebelStyle}> Group Admin</label>
                                <button
                                    className="group-demo-invite-btn"
                                    onClick={() => {
                                        setAddAdminModal(true)
                                        fetchMember()
                                    }}
                                >
                                    + Add{" "}
                                </button>
                            </Grid>
                            {
                                groupAdmins?.map((member, index) =>
                                (
                                    <div className='all-people-div' key={index}>

                                        <div className='people-img-div'>
                                            <img className='people-img' src={getFileUrl('/uploads/' + member?.group_member_user_id?.profile_pic)} alt='' />
                                            <div>
                                                <h6>{member?.group_member_user_id?.first_name} {member?.group_member_user_id?.last_name}</h6>
                                                <p>Joined about {timeFormat(member?.createdAt)} ago</p>
                                            </div>
                                        </div>

                                        <div style={{ display: 'flex', padding: '0 1em 0', gap: 3 }}>

                                            <div className='more'>
                                                <svg width="3" height="14" viewBox="0 0 3 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <circle cx="1.5" cy="12" r="1.5" fill="#242634" />
                                                    <circle cx="1.5" cy="7" r="1.5" fill="#242634" />
                                                    <circle cx="1.5" cy="2" r="1.5" fill="#242634" />
                                                </svg>

                                                <ul className='more-dropdown'>
                                                    <li>
                                                        <p type='button' onClick={() => {
                                                            axiosInstance.patch(`/api/groups/edit-group-member/${member?._id}`,
                                                                {
                                                                    role: 'member',
                                                                    group_id: groupDetails?._id,
                                                                    group_member_user_id: member?.group_member_user_id?._id
                                                                }).then(res => {
                                                                    showNotification(res.data.message);
                                                                    fetchAdmins()
                                                                })
                                                                .catch(err => console.log(err))

                                                        }}>
                                                            Remove admin
                                                        </p>
                                                    </li>

                                                </ul>
                                            </div>

                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                        <br />
                        <div>
                            <label style={lebelStyle}> Group Moderator</label>
                            {
                                groupModerators?.map((member, index) =>
                                (
                                    <div className='all-people-div' key={index}>

                                        <div className='people-img-div'>
                                            <img className='people-img' src={getFileUrl('/uploads/' + member?.group_member_user_id?.profile_pic)} alt='' />
                                            <div>
                                                <h6>{member?.group_member_user_id?.first_name} {member?.group_member_user_id?.last_name}</h6>
                                                <p>Joined about {timeFormat(member?.createdAt)} ago</p>
                                            </div>
                                        </div>

                                        <div style={{ display: 'flex', padding: '0 1em 0', gap: 3 }}>
                                            <div className='more'>
                                                <svg width="3" height="14" viewBox="0 0 3 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <circle cx="1.5" cy="12" r="1.5" fill="#242634" />
                                                    <circle cx="1.5" cy="7" r="1.5" fill="#242634" />
                                                    <circle cx="1.5" cy="2" r="1.5" fill="#242634" />
                                                </svg>

                                                <ul className='more-dropdown'>
                                                    <li>
                                                        <p type='button' onClick={() => {
                                                            axiosInstance.patch(`/api/groups/edit-group-member/${member?._id}`,
                                                                {
                                                                    role: 'member',
                                                                    group_id: groupDetails?._id,
                                                                    group_member_user_id: member?.group_member_user_id?._id
                                                                }).then(res => {
                                                                    showNotification(res.data.message);
                                                                    fetchModerators()
                                                                })
                                                                .catch(err => console.log(err))

                                                        }}>
                                                            Remove moderator
                                                        </p>
                                                    </li>

                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </>
                }
            </Grid>
            {/* Admin - Moderator assigning modal  */}
            <Dialog
                fullWidth
                maxWidth='sm'
                open={addAdminModal}
                onClose={() => setAddAdminModal(false)}
            >
                <Grid
                    p={2}
                // className='event-full-modal-cover-div'
                >
                    <div>
                        <h3 className='create-tag-text' style={{ fontSize: '24px', color: 'black' }}>Add Group Admin or Monderator</h3>
                    </div>
                    <div className='container-fluid '>
                        <Formik
                            initialValues={{
                                group_member_id: undefined,
                                role: undefined,
                                group_member_user_id: undefined,


                            }}
                            validationSchema={Yup.object().shape({
                                group_member_id: Yup.string().max(255).required("Field is required"),
                                role: Yup.string().max(255).required("Field is required"),
                                // start_date: Yup.required("Event start date field is required"),
                                // start_time: Yup.required("Event start time field is required"),
                            })}
                            onSubmit={async (
                                _values,
                                { resetForm, setErrors, setStatus, setSubmitting }
                            ) => {
                                try {
                                    console.log("_values__", _values);
                                    const res = await axiosInstance.patch(`/api/groups/edit-group-member/${_values?.group_member_id}`,
                                        {
                                            role: _values?.role,
                                            group_id: groupDetails?._id,
                                            group_member_user_id: _values?.group_member_user_id
                                        })
                                    showNotification(res.data.message)
                                    fetchAdmins()
                                    fetchModerators()
                                    setAddAdminModal(false)
                                } catch (err) {
                                    console.error(err);
                                    showNotification(err?.response?.data?.message, 'error');
                                    setStatus({ success: false });
                                    setErrors({ submit: err.message });
                                    setSubmitting(false);
                                }
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
                            }) => {
                                console.log("__", values);
                                // console.log({ errors }); 
                                return (
                                    <form onSubmit={handleSubmit}>
                                        <div className='row'>

                                            {/* Event Title */}
                                            <div className='col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 pb-3'>
                                                <lebel className='inputs-tag'>Select Group member</lebel>

                                                <AutoCompleteWrapper
                                                    // className='inp-event-name'
                                                    style={{
                                                        borderRadius: '16px'
                                                    }}
                                                    options={groupMembers}
                                                    value={groupMembers?.find(i => i?.id == values?.group_member_id)}
                                                    required={true}
                                                    placeholder='Select Group member'
                                                    // disableClearable={true}
                                                    handleChange={(e, v) => {
                                                        setFieldValue('group_member_id', v?.id)
                                                        setFieldValue('group_member_user_id', v?.group_member_user_id)
                                                    }}
                                                />

                                            </div>
                                            <div className='col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 pb-3'>

                                                <lebel className='inputs-tag'>Select Role</lebel>

                                                <AutoCompleteWrapper
                                                    // className='inp-event-name'
                                                    style={{
                                                        borderRadius: '16px'
                                                    }}
                                                    options={post_approval_list}
                                                    value={post_approval_list?.find(i => i?.value == values?.role)}
                                                    required={true}
                                                    placeholder='Select Role'
                                                    // disableClearable={true}
                                                    handleChange={(e, v) => {
                                                        setFieldValue('role', v?.value)
                                                    }}
                                                />

                                            </div>
                                            <div className='col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12  pt-3'>
                                                <button className='modal-create-btn' type='submit' style={{ backgroundColor: '#307777', color: 'white' }}> Submit</button>
                                            </div>
                                        </div>
                                    </form>
                                );
                            }}
                        </Formik>
                    </div>


                </Grid>

            </Dialog>

            {/* delete modal */}
            <Dialog
                open={openDeleteModal}
                onClose={handleClose}
                // fullWidth
                maxWidth='md'
            >
                <DialogTitle>
                    Do you want to delete this Group?
                </DialogTitle>

                <DialogActions>
                    <Button size="small" variant='contained' onClick={() => handleClose()}>Cancel</Button>
                    <Button size="small" variant="contained" color="error" onClick={() => {
                        axiosInstance.patch(`/api/groups/delete-group/${groupDetails?._id}`)
                            .then(res => {
                                showNotification(res.data?.message)
                                handleClose()
                            })
                            .catch(err => showNotification('Group deletion failed !!', 'error'))
                    }} autoFocus>
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>

        </Grid >
    );
};

export default GroupSetting;
