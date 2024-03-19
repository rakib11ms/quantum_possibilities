import React from 'react';
import "./GenderModal.css";
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import axiosInstance from '../../../../../utils/axios';
import { host } from '@/environment';
import { toast } from "react-toastify";
import CapitalizeFirstLetter from '@/utils/CapitalizeFirstLetter';

function GenderModal({ setIsOpenModal, getUserInfo, userInfo }) {
    const [selectedGender, setSelectedGender] = React.useState(userInfo?.gender?._id);
    const [allGender, setAllGender] = React.useState([]);
    const [selectedPrivacy, setSelectedPrivacy] = React.useState(userInfo?.privacy?.gender);


    React.useEffect(() => {
        axiosInstance.get(`${host}/api/gender/`).then((res) => {
            if (res.data.status == 200) {
                setAllGender(res.data.allGender)
            }
        });
    }, [])

    const handleCancel = () => {
        setSelectedGender("")
        setIsOpenModal({ "gender": false })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        axiosInstance.patch(`${host}/api/update-user-gender/`, {
            gender_id: selectedGender,
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
                setSelectedGender("")
                setIsOpenModal({ "gender": false })
                getUserInfo()
            }
        });
    }

    const handleChange = (event) => {
        setSelectedGender(event.target.value);
    };

    const handlePrivacyChange = (event) => {
        setSelectedPrivacy(event.target.value);
    };


    return (
        <div className='tas_gender_modal_wrapper'>
            <p className='tas_gender_modal_title'>Select gender</p>
            <Box sx={{ minWidth: 120 }}>
                <FormControl fullWidth>
                    <Select
                        value={selectedGender}
                        onChange={handleChange}
                        displayEmpty
                        inputProps={{ 'aria-label': 'Without label' }}
                    >
                        {allGender?.map((item, index) => {
                            return <MenuItem value={item._id}>{item.gender_name ? CapitalizeFirstLetter(item.gender_name) : null}</MenuItem>
                        })}
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

export default GenderModal;