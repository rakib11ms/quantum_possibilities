import React from 'react';
import axiosInstance from '../../../../../utils/axios';
import { host } from '@/environment';
import { toast } from "react-toastify";
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

function PlaceModal({ userInfo = {}, setIsOpenModal, getUserInfo }) {
    const [hometown, setHomeTown] = React.useState(userInfo?.home_town)
    const [current, setCurrent] = React.useState(userInfo?.present_town);
    const [selectedPrivacy, setSelectedPrivacy] = React.useState(userInfo?.privacy?.home_town ? userInfo?.privacy?.home_town : "public");


    const handleCancel = () => {
        setHomeTown("")
        setCurrent("")
        setIsOpenModal({ "place": false })
    }

    const handleHomeInputChange = (event) => {
        setHomeTown(event.target.value)
    }

    const handleCurrentInputChange = (event) => {
        setCurrent(event.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        axiosInstance.patch(`${host}/api/update-user-location/`, {
            home_town: hometown,
            present_town: current,
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
                setHomeTown("")
                setCurrent("")
                setIsOpenModal({ "place": false })
                getUserInfo()
            }
        });
    }

    const handlePrivacyChange = (event) => {
        setSelectedPrivacy(event.target.value);
    };
    return (
        <div className="tas_workplace_modal_wrapper">
            <form onSubmit={() => { }}>
                <label className="tas_form_lable">
                    Hometown
                </label>
                <input name='Home' className="tas_form_workplace_input" value={hometown} type="text" onChange={handleHomeInputChange} />

                <label className="mt-4 tas_form_lable">
                    Current Location
                </label>
                <input name='Current' className="tas_form_workplace_input" value={current} type="text" onChange={handleCurrentInputChange} />

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
            </form>
        </div>
    );
}

export default PlaceModal;