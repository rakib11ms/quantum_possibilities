import React from 'react';
import "./PrivacyModal.css"
import { toast } from "react-toastify";
import axiosInstance from '../../../../../utils/axios';
import { host } from '@/environment';

import CrossRoundIcon from './Icons/CrossRoundIcon';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import PublicCircleIcon from './Icons/PublicCircleIcon';
import FriendsCircleIcon from './Icons/FriendsCircleIcon';
import OnlymeCircleIcon from './Icons/OnlymeCircleIcon';

const CustomLabel = ({ icon, title, details }) => (
    <div className='d-flex mt-3 tas_custome_label_container'>
        {icon}
        <div className='mt-1 mx-3'>
            <p className={details ? 'tas_custome_label_title' : 'tas_custome_label_title mt-2'}>{title}</p>
            {details ? <p className='tas_custome_label_details'>{details}</p> : null}
        </div>
    </div>
);

const theme = createTheme({
    palette: {
        primary: {
            main: '#307777', // Set your desired color for the filled circle when selected
        },
    },
});

function PrivacyModal({ setIsOpenModal, privacyModalInfo, getUserInfo }) {
    const [value, setValue] = React.useState(privacyModalInfo.privacy);

    const handleChange = (event) => {
        setValue(event.target.value);
    };

    const handleCloseModal = () => {
        setIsOpenModal({ privacy: false })
    }

    const handleSubmit = () => {
        axiosInstance.post(`${host}/api/save-user-privacy`, {
            field_name: privacyModalInfo.field_Name,
            privacy: value
        }).then((res) => {
            if (res.data.status == 200) {
                toast.success(res.data.message, {
                    position: "top-right",
                    style: {
                        background: "white",
                        color: "black",
                    },
                });
            }
        });
        getUserInfo()
        setIsOpenModal({ privacy: false })
    }
    return (
        <div className='tas_privacy_modal_container'>
            <div className='d-flex justify-content-between p-3'>
                <div></div>
                <p className='tas_privacy_modal_title'>Select audience</p>

                <span className='tas_workplace_three_dots' onClick={handleCloseModal}>
                    <CrossRoundIcon />
                </span>
            </div>
            <div className='w-100 tas_privacy_modal_line'></div>
            <ThemeProvider theme={theme}>
                <FormControl>
                    <RadioGroup
                        aria-labelledby="demo-controlled-radio-buttons-group"
                        name="controlled-radio-buttons-group"
                        value={value}
                        onChange={handleChange}
                        sx={{ width: "520px" }}
                    >
                        <FormControlLabel
                            value="public"
                            control={<Radio sx={{ marginTop: "15px", marginLeft: "120px" }} />}
                            label={<CustomLabel icon={<PublicCircleIcon />} title={"Public"} details={"Anyone on or off Quantum Possibilities"} ></CustomLabel>}
                            labelPlacement="start"
                        />
                        <FormControlLabel
                            value="friends"
                            control={<Radio sx={{ marginTop: "15px", marginLeft: "128px" }} />}
                            label={<CustomLabel icon={<FriendsCircleIcon />} title={"Friends"} details={"Your friends on Quantum Possibilities"} ></CustomLabel>}
                            labelPlacement="start"
                        />
                        <FormControlLabel
                            value="only_me"
                            control={<Radio sx={{ marginTop: "15px", marginLeft: "300px" }} />}
                            label={<CustomLabel icon={<OnlymeCircleIcon />} title={"Only me"}  ></CustomLabel>}
                            labelPlacement="start"
                        />
                    </RadioGroup>
                </FormControl>
            </ThemeProvider>
            <div className='w-100 tas_privacy_modal_line mt-3'></div>
            <div className='tas_privacy_modal_btn_container'>
                <button onClick={handleCloseModal} className='tas_privacy_modal_cancel_btn' title='Cancel'>Cancel</button>
                <button onClick={handleSubmit} className='tas_privacy_modal_done_btn' title='Done'>Done</button>

            </div>
        </div>
    );
}

export default PrivacyModal;