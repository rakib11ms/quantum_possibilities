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

function WorkPlaceModal({ setIsOpenModal, getAllWorkPlace, workplace = {}, userName }) {
    let fromDate = workplace.from_date ? new Date(workplace.from_date) : ""
    let toDate = workplace.to_date ? new Date(workplace.to_date) : ""
    const [org_name, set_org_name] = React.useState(workplace.org_name)
    const [from_date, set_from_date] = React.useState(fromDate)
    const [to_date, set_to_date] = React.useState(toDate)
    const [is_Working, set_is_Working] = React.useState(workplace.is_Working)
    const [expandSize, setExpandSize] = React.useState(false)
    const [selectedPrivacy, setSelectedPrivacy] = React.useState(workplace.privacy ? workplace.privacy : "public");

    const handleCancel = () => {
        set_org_name("")
        set_from_date("")
        set_to_date("")
        set_is_Working(false)
        setIsOpenModal({ "workplace": false })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        axiosInstance.post(`${host}/api/save-workplace`, {
            "_id": workplace._id,
            "org_name": org_name,
            "from_date": from_date,
            "to_date": is_Working ? new Date() : to_date,
            "is_working": is_Working,
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
                setIsOpenModal({ "workplace": false })
                getAllWorkPlace()
            }
        });
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
                    Workplace Name
                </label>
                <input name='org_name' className="tas_form_workplace_input" value={org_name} type="text" onChange={handleInputChange} />
                <div className="tas_form_time_container">
                    <div> <label className="tas_form_lable">
                        From
                    </label>
                        {/* <input name="from_date" className="tas_form_workplace_input" type="text" value={from_date} onChange={handleInputChange} /> */}
                        <span onClick={() => setExpandSize(true)}>
                            <DatePicker placeholderText='01/01/2024' className="tas_form_workplace_date_input" selected={from_date} onChange={(date) => set_from_date(date)} />
                        </span>
                    </div>
                    <div>
                        <label className="tas_form_lable">
                            To
                        </label>
                        {/* <input name="to" className="tas_form_workplace_input" type="text" value={workPlaceData.to} onChange={handleInputChange} /> */}
                        <span style={{ padding: 0, margin: 0 }} onClick={() => setExpandSize(true)}>
                            <DatePicker placeholderText='01/01/2024' disabled={is_Working} className="tas_form_workplace_date_input" selected={to_date} onChange={(date) => set_to_date(date)} />
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
                        Currently work
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

export default WorkPlaceModal;