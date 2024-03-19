import React, { useState } from 'react'
import { toast } from "react-toastify";
import axiosInstance from '../../../utils/axios';

function ChangePassword() {
    const [formData, setFormData] = useState({
        'old_password': '',
        'new_password': '',
        'confirm_password': ''
    })

    
    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleChangePassword = (e) => {
        e.preventDefault();
        if (formData.new_password == formData.confirm_password) {
            axiosInstance.post('api/change-password', formData).then(res => {

                if (res.data.status == 200) {

                    toast.success(res.data.message, {
                        position: "top-right",
                        style: {
                            background: "white",
                            color: "black",
                        },
                    });
                  
                } else if (res.data.status == 400) {
                    toast.error(res.data.message, {
                        position: "top-right",
                        style: {
                            background: "white",
                            color: "black",
                        },
                    });
                }
                else {
                    toast.error(res.data.message, {
                        position: "top-right",
                        style: {
                            background: "white",
                            color: "black",
                        },
                    });
                }
            })
        } else {
            toast("Password Not matched ", {
                type: "error",
                position: "top-right",
                style: {
                    background: "",
                    color: "red",
                },
            });
        }
    }
    return (
        <form onSubmit={handleChangePassword} method='post'>
            <div className="row">
                <div className="col col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                    <div className="form-group label-floating">
                        <label className="control-label">
                            Confirm Current Password
                        </label>
                        <input
                            className="form-control"
                            placeholder
                            type="password"
                            value={formData.old_password}
                            name='old_password'
                            onChange={handleInputChange}
                        />
                    </div>
                </div>
                <div className="col col-lg-6 col-md-6 col-sm-12 col-12">
                    <div className="form-group label-floating is-empty">
                        <label className="control-label">
                            Your New Password
                        </label>
                        <input
                            className="form-control"
                            placeholder
                            type="password"
                            value={formData.new_password}
                            name='new_password'
                            onChange={handleInputChange}
                        />
                    </div>
                </div>
                <div className="col col-lg-6 col-md-6 col-sm-12 col-12">
                    <div className="form-group label-floating is-empty">
                        <label className="control-label">
                            Confirm New Password
                        </label>
                        <input
                            className="form-control"
                            placeholder
                            type="password"
                            value={formData.confirm_password}
                            name='confirm_password'
                            onChange={handleInputChange}
                        />
                    </div>
                </div>
                <div className="col col-lg-12 col-sm-12 col-sm-12 col-12">
                    <div className="remember">
                        <div className="checkbox">
                            <label>
                                <input
                                    name="optionsCheckboxes"
                                    type="checkbox"
                                />
                                Remember Me
                            </label>
                        </div>
                        <a
                            href="#"
                            className="forgot"
                            data-toggle="modal"
                            data-target="#restore-password"
                        >
                            Forgot my Password
                        </a>
                    </div>
                </div>
                <div className="col col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                    <button type='submit' className="btn btn-primary btn-lg full-width">
                        Change Password Now!
                    </button>
                </div>
            </div>
        </form>
    )
}

export default ChangePassword
