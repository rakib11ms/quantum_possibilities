import React from 'react';
import "./GenderModal.css";
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import axiosInstance from '../../../../../utils/axios';
import { host } from '@/environment';
import { toast } from "react-toastify";

function RelationshipModal({ setIsOpenModal, getUserInfo, userInfo }) {
    const [selectedRelationship, setSelectedRelationship] = React.useState(userInfo?.relation_status);
    const [selectedPrivacy, setSelectedPrivacy] = React.useState(userInfo?.privacy?.relationship);

    const handleCancel = () => {
        setSelectedRelationship("")
        setIsOpenModal({ "relationship": false })
    }
    const handleSubmit = (e) => {
        e.preventDefault();

        axiosInstance.patch(`${host}/api/update-user-relation/`, {
            relation_status: selectedRelationship,
            privacy: selectedPrivacy
        }).then((res) => {
            if (res.data.status == 200) {
                toast.success(res.data.message, {
                    position: "top-right",
                    style: {
                        background: "white",
                        color: "black",
                    },
                });
                setSelectedRelationship("")
                setIsOpenModal({ "relationship": false })
                getUserInfo()
            }
        });
    }

    const handleChange = (event) => {
        setSelectedRelationship(event.target.value);
    };

    const handlePrivacyChange = (event) => {
        setSelectedPrivacy(event.target.value);
    };
    return (
        <div className='tas_gender_modal_wrapper'>
            <p className='tas_gender_modal_title'>Select Relationship Status</p>
            <Box sx={{ minWidth: 120 }}>
                <FormControl fullWidth>
                    <Select
                        value={selectedRelationship}
                        onChange={handleChange}
                        displayEmpty
                        inputProps={{ 'aria-label': 'Without label' }}
                    >
                        <MenuItem value={"Single"}>Single</MenuItem>
                        <MenuItem value={"Married"}>Married</MenuItem>
                        <MenuItem value={"Divorced"}>Divorced</MenuItem>
                        <MenuItem value={"In a relationship"}>In a relationship</MenuItem>
                    </Select>
                </FormControl>
            </Box>

            <Box sx={{ minWidth: 120, marginBottom: 3, marginTop: 3 }}>
                <FormControl fullWidth>
                    <Select
                        value={selectedPrivacy}
                        onChange={handlePrivacyChange}
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
                <div className="tas_form_workplace_buttons mt-3">
                    <input type="submit" onClick={handleCancel} className="tas_form_cancle_btn" value="Cancel" />
                    <input type="submit" onClick={handleSubmit} className="tas_form_submit_btn" value="Save" />
                </div>
            </div>
        </div>
    );
}

export default RelationshipModal;