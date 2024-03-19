import React from 'react';
import axiosInstance from '../../../../../utils/axios';
import { host } from '@/environment';
import { toast } from "react-toastify";
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

function WebsiteModal({ item, setIsOpenModal, getUserInfo }) {
    const [Website, set_Website] = React.useState(item?.website_url)//item.website_url
    const [allSocialMedia, set_AllSocialMedia] = React.useState([])
    const [selectSocialMedia, set_selectSocialMedia] = React.useState(item?.socialMedia?._id ? item?.socialMedia?._id : "65488dbdfae170ad8c8b857f")//item.social_media_id
    const [selectedPrivacy, setSelectedPrivacy] = React.useState(item?.privacy ? item?.privacy : "public");

    React.useEffect(() => {
        axiosInstance.get(`${host}/api/get-social-media/`).then((res) => {
            if (res.data.status == 200) {
                set_AllSocialMedia(res.data.socialMedia)
            }
        });
    }, [])

    const handleCancel = () => {
        set_Website("")
        setIsOpenModal({ "website": false })
    }

    const handleInputChange = (event) => {
        set_Website(event.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        axiosInstance.patch(`${host}/api/upsert-user-website/`, {
            social_media_id: selectSocialMedia,
            website_url: Website,
            website_id: item?._id,
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
                set_Website("")
                setIsOpenModal({ "website": false })
                getUserInfo()
            }
        });
    }

    const handleChange = (event) => {
        set_selectSocialMedia(event.target.value);
    };

    const handlePrivacyChange = (event) => {
        setSelectedPrivacy(event.target.value);
    };
    return (
        <div className="tas_workplace_modal_wrapper">
            <form onSubmit={() => { }}>
                <label className="tas_form_lable">
                    Website
                </label>
                <Box sx={{ minWidth: 120, marginBottom: 3 }}>
                    <FormControl fullWidth>
                        <Select
                            value={selectSocialMedia}
                            onChange={handleChange}
                            displayEmpty
                            inputProps={{ 'aria-label': 'Without label' }}
                        >
                            {allSocialMedia?.map((item, index) => {
                                return <MenuItem value={item._id}>{item.media_name}</MenuItem>
                            })}
                        </Select>
                    </FormControl>
                </Box>
                <input name='Website' placeholder='www.example.com' className="tas_form_workplace_input" value={Website} type="text" onChange={handleInputChange} />

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

export default WebsiteModal;
