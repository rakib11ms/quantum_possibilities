'use client'
import React from 'react';
import "./WorkPlaceModal.css"
import axiosInstance from '../../../../../utils/axios';
import { toast } from "react-toastify";
import { host } from '@/environment';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

function EducationModal({ setIsOpenModal, getAllEducation, education = {}, userName }) {
    let fromDate = education.startDate ? new Date(education.startDate) : ""
    let toDate = education.endDate ? new Date(education.endDate) : ""

    const [org_name, set_org_name] = React.useState(education.institute_name)
    const [from_date, set_from_date] = React.useState(fromDate)
    const [to_date, set_to_date] = React.useState(toDate)
    const [is_Working, set_is_Working] = React.useState(education.is_Stuyding)
    const [expandSize, setExpandSize] = React.useState(false)
    const [selectedPrivacy, setSelectedPrivacy] = React.useState(education.privacy ? education.privacy : "public");


    const handleCancel = () => {
        set_org_name("")
        set_from_date("")
        set_to_date("")
        set_is_Working(0)
        setIsOpenModal({ "education": false })
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (education._id) {
            axiosInstance.patch(`${host}/api/update-user-education-info/${education._id}`, {
                "institute_name": org_name,
                "startDate": from_date,
                "endDate": is_Working ? new Date() : to_date,
                "is_Stuyding": is_Working,
                "privacy": selectedPrivacy
            }).then((res) => {
                if (res.data.status == 200) {

                    toast.success(res.data.message, {
                        position: "top-right",
                        style: {
                            background: "white",
                            color: "black",
                        },
                    });
                    set_org_name("")
                    set_from_date("")
                    set_to_date("")
                    set_is_Working(false)
                    setIsOpenModal({ "education": false })
                    getAllEducation()
                }
            });
        } else {
            axiosInstance.post(`${host}/api/save-user-education-info`, {
                "institute_name": org_name,
                "startDate": from_date,
                "endDate": is_Working ? new Date() : to_date,
                "is_Stuyding": is_Working,
                "username": userName,
                "privacy": selectedPrivacy
            }).then((res) => {
                if (res.data.status == 200) {

                    toast.success(res.data.message, {
                        position: "top-right",
                        style: {
                            background: "white",
                            color: "black",
                        },
                    });
                    set_org_name("")
                    set_from_date("")
                    set_to_date("")
                    set_is_Working(false)
                    setIsOpenModal({ "education": false })
                    getAllEducation()
                }
            });
        }

    }

    const handleInputChange = (event) => {
        if (event.target.name === "org_name") {
            set_org_name(event.target.value)
        } else if (event.target.name === "from_date") {
            set_from_date(event.target.value)
        } else {
            set_is_Working(state => !state)
        }
    }

    const handleChange = (event) => {
        setSelectedPrivacy(event.target.value);
    };
    return (
        <div className={expandSize ? "expand_tas_workplace_modal_wrapper" : "tas_workplace_modal_wrapper"}>
            <form onSubmit={() => { }}>
                <label className="tas_form_lable">
                    Institution Name
                </label>
                <input name='org_name' className="tas_form_workplace_input" value={org_name} type="text" onChange={handleInputChange} />
                <div className="tas_form_time_container">
                    <div> <label className="tas_form_lable">
                        From
                    </label>
                        <span onClick={() => setExpandSize(true)}>
                            <DatePicker placeholderText='01/01/2024' className="tas_form_workplace_input" selected={from_date} onChange={(date) => set_from_date(date)} />
                        </span>
                    </div>
                    <div>
                        <label className="tas_form_lable">
                            To
                        </label>
                        <span onClick={() => setExpandSize(true)}>
                            <DatePicker placeholderText='01/01/2024' disabled={is_Working} className="tas_form_workplace_input" selected={to_date} onChange={(date) => set_to_date(date)} />
                        </span>
                    </div>
                </div>

                <Box sx={{ minWidth: 120, marginBottom: 3 }}>
                    <FormControl fullWidth>
                        <Select
                            value={selectedPrivacy}
                            onChange={handleChange}
                            displayEmpty
                            inputProps={{ 'aria-label': 'Without label' }}
                            sx={{ maxHeight: 45 }}
                        >
                            <MenuItem value={"public"}>Public</MenuItem>
                            <MenuItem value={"friends"}>Friends</MenuItem>
                            <MenuItem value={"only_me"}>Only me</MenuItem>
                        </Select>
                    </FormControl>
                </Box>

                <div className="tas_form_workplace_buttons_container">

                    <label className="tas_form_lable tas_form_checkbox_lable">
                        <input name='is_Working' className="tas_form_workplace_checkbox" type="checkbox" checked={is_Working} onChange={handleInputChange} />
                        Currently study
                    </label>
                    <div className="tas_form_workplace_buttons">
                        <input type="submit" onClick={handleCancel} className="tas_form_cancle_btn" value="Cancel" />
                        <input type="submit" onClick={handleSubmit} className="tas_form_submit_btn" value="Save" />
                    </div>
                </div>
            </form>
        </div>
    );
}

export default EducationModal;