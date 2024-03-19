import React from 'react';
import axiosInstance from '../../../../../utils/axios';
import { host } from '@/environment';
import { toast } from "react-toastify";
import "@/app/[username]/about/_ui/WorkPlaceModal.css"

function GroupNameChangeModal({ setIsOpenModal, groupItem, setGroupItem, getGroupChatList }) {
    const [group_name, set_group_name] = React.useState(groupItem?.group_name)

    const handleCancel = () => {
        set_group_name("")
        setIsOpenModal({ "groupModal": false })
    }

    const handleInputChange = (event) => {
        set_group_name(event.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        axiosInstance.patch(`/api/update-group-chat-info/${groupItem?._id}`, {
            group_name: group_name,
        }).then((res) => {
            if (res.data.status == 200) {
                toast.success(res.data.message, {
                    position: "top-right",
                    style: {
                        background: "white",
                        color: "black",
                    },
                });
                set_group_name("")
                setIsOpenModal({ "groupModal": false })
                setGroupItem(res.data.data)
                getGroupChatList()
            }
        });
    }

    return (
        <div className="tas_workplace_modal_wrapper">
            <form onSubmit={() => { }}>
                <label className="tas_form_lable">
                    Group Name
                </label>
                <input name='Website' className="tas_form_workplace_input" value={group_name} type="text" onChange={handleInputChange} />

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

export default GroupNameChangeModal;