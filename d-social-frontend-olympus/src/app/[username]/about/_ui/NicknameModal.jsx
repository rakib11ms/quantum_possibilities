import React from 'react';
import axiosInstance from '../../../../../utils/axios';
import { host } from '@/environment';
import { toast } from "react-toastify";
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

function NicknameModal({ userInfo, setIsOpenModal, getUserInfo }) {
    const [Nickname, set_Nickname] = React.useState(userInfo?.user_nickname)
    const [selectedPrivacy, setSelectedPrivacy] = React.useState(userInfo?.privacy?.nickname);


    const handleCancel = () => {
        set_Nickname("")
        setIsOpenModal({ "nickname": false })
    }

    const handleInputChange = (event) => {
        set_Nickname(event.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        axiosInstance.patch(`${host}/api/update-user-nickname/`, {
            nick_name: Nickname,
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
                set_Nickname("")
                setIsOpenModal({ "relationship": false })
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
                    Nickname
                </label>
                <input name='Website' className="tas_form_workplace_input" value={Nickname} type="text" onChange={handleInputChange} />

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

export default NicknameModal;