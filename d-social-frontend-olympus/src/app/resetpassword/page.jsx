"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Navbar from "../../component/navbar/page";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Radio from "@mui/material/Radio";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-toastify";

import forgetCss from "./resetpassword.module.css";
import axiosInstance from "../../../utils/axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

const ResetPassword = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // const [formData, setFormData] = useState({
  //   password: "",
  //   confirmpassword: "",
  //   reset_password_token: "",
  // });

  // useEffect(() => {

  //   setFormData({
  //     ...formData, ['reset_password_token']: searchParams.get('token')
  //   })
  // }, [])














  const handleFormChange = (e) => {
    setFormData({
      ...formData, [e.target.name]: e.target.value
    })
  }

  // const handleResetPassword = async (e) => {
  //   e.preventDefault();

  //   if (formData.password == formData.confirmpassword) {
  //     axiosInstance.post('api/reset-password', formData).then(res => {

  //       if (res.data.status == 200) {

  //         toast.success(res.data.message, {
  //           position: "top-right",
  //           style: {
  //             background: "white",
  //             color: "black",
  //           },
  //         });
  //         router.push("/login");
  //       } else if (res.data.status == 400) {
  //         toast.error(res.data.message, {
  //           position: "top-right",
  //           style: {
  //             background: "white",
  //             color: "black",
  //           },
  //         });
  //       }
  //       else {
  //         toast.error(res.data.message, {
  //           position: "top-right",
  //           style: {
  //             background: "white",
  //             color: "black",
  //           },
  //         });
  //       }
  //     })
  //   } else {
  //     toast.error("Password not matched", {
  //       position: "top-right",
  //       style: {
  //         background: "white",
  //         color: "black",
  //       },
  //     });
  //   }



  // };


  const [eyePassword, setEyePassword] = useState(true)
  const [eyeConfirmPassword, setEyeConfirmPassword] = useState(true)

  const [password, setPassword] = useState('');
  const [confirm_password, setConfirm_Password] = useState('');
  const [strength, setStrength] = useState(null);
  const [confirmStrength, setConfirmStrength] = useState(null);
  const [isValid, setIsValid] = useState(false);
  const [isConfirmValid, setIsConfirmValid] = useState(false);
  const checkPasswordStrength = (inputPassword) => {
    let currentStrength = 0;

    if (inputPassword.length >= 8) {
      currentStrength += 20;
    }
    if (inputPassword.match(/[a-z]/) && inputPassword.match(/[A-Z]/)) {
      currentStrength += 20;
    }
    if (inputPassword.match(/[0-9]/)) {
      currentStrength += 20;
    }
    if (inputPassword.match(/[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/)) {
      currentStrength += 20;
    }
    if (inputPassword.length >= 12) {
      currentStrength += 20;
    }

    setStrength(currentStrength);
  };
  const checkPasswordConfirmStrength = (inputPassword) => {
    let currentStrength = 0;

    if (inputPassword.length >= 8) {
      currentStrength += 20;
    }
    if (inputPassword.match(/[a-z]/) && inputPassword.match(/[A-Z]/)) {
      currentStrength += 20;
    }
    if (inputPassword.match(/[0-9]/)) {
      currentStrength += 20;
    }
    if (inputPassword.match(/[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/)) {
      currentStrength += 20;
    }
    if (inputPassword.length >= 12) {
      currentStrength += 20;
    }

    setStrength(currentStrength);
  };

  const handlePasswordChange = (event) => {
    const newPassword = event.target.value;

    // Define regex patterns for each requirement
    const uppercaseRegex = /[A-Z]/;
    const lowercaseRegex = /[a-z]/;
    const numberRegex = /[0-9]/;
    const symbolRegex = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/;

    // Check if the password meets all requirements
    const isUppercase = uppercaseRegex.test(newPassword);
    const isLowercase = lowercaseRegex.test(newPassword);
    const isNumber = numberRegex.test(newPassword);
    const isSymbol = symbolRegex.test(newPassword);

    const isValidPassword = isUppercase && isLowercase && isNumber && isSymbol;

    setPassword(newPassword);
    // setRegisterInputState({ ...registerInputState, password: newPassword })
    setIsValid(isValidPassword);
  };
  const handlePasswordChangeConfirm = (event) => {
    const newPassword = event.target.value;

    // Define regex patterns for each requirement
    const uppercaseRegex = /[A-Z]/;
    const lowercaseRegex = /[a-z]/;
    const numberRegex = /[0-9]/;
    const symbolRegex = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/;

    // Check if the password meets all requirements
    const isUppercase = uppercaseRegex.test(newPassword);
    const isLowercase = lowercaseRegex.test(newPassword);
    const isNumber = numberRegex.test(newPassword);
    const isSymbol = symbolRegex.test(newPassword);

    const isValidPassword = isUppercase && isLowercase && isNumber && isSymbol;

    setConfirm_Password(newPassword);
    // setRegisterInputState({ ...registerInputState, password: newPassword })
    setIsConfirmValid(isValidPassword);
  };


  const handleResetPassword = async (e) => {
    e.preventDefault();

    // if (formData.password == formData.confirmpassword) {
    //   axiosInstance.post('api/reset-password', formData).then(res => {

    //     if (res.data.status == 200) {

    //       toast.success(res.data.message, {
    //         position: "top-right",
    //         style: {
    //           background: "white",
    //           color: "black",
    //         },
    //       });
    //       router.push("/login");
    //     } else if (res.data.status == 400) {
    //       toast.error(res.data.message, {
    //         position: "top-right",
    //         style: {
    //           background: "white",
    //           color: "black",
    //         },
    //       });
    //     }
    //     else {
    //       toast.error(res.data.message, {
    //         position: "top-right",
    //         style: {
    //           background: "white",
    //           color: "black",
    //         },
    //       });
    //     }
    //   })
    // } else {
    //   toast.error("Password not matched", {
    //     position: "top-right",
    //     style: {
    //       background: "white",
    //       color: "black",
    //     },
    //   });
    // }

    if (password === "") {
      toast("Please provide password", {
        type: "error",
        position: "top-right",
        style: {
          background: "",
          color: "red",
        },
      });
    }
    else if (confirm_password === "") {
      toast("Please provide confirm password", {
        type: "error",
        position: "top-right",
        style: {
          background: "",
          color: "red",
        },
      });
    }

    else if (password !== confirm_password) {
      toast("Password both does not match", {
        type: "error",
        position: "top-right",
        style: {
          background: "",
          color: "red",
        },
      });
    }

    else if (isValid === false) {
      toast("Password must contain at least one uppercase letter, one lowercase letter, one number, and one symbol", {
        type: "error",
        position: "top-right",
        style: {
          background: "",
          color: "red",
        },
      });
    }
    else if (isConfirmValid === false) {
      toast("Confirm Password must contain at least one uppercase letter, one lowercase letter, one number, and one symbol", {
        type: "error",
        position: "top-right",
        style: {
          background: "",
          color: "red",
        },
      });
    }
    else if (password.length < 8) {
      toast("Password at least 8 characters should be long", {
        type: "error",
        position: "top-right",
        style: {
          background: "",
          color: "red",
        },
      });
    }


    // if (strength >= 60 && registerInputState.password.length >= 8) { // Check both criteria
    else {
      const updated_data = {
        password: password,
        confirmpassword: confirm_password,
        reset_password_token: searchParams.get("token"),
      }

      axiosInstance.post('api/reset-password', updated_data).then(res => {

        if (res.data.status == 200) {

          toast.success(res.data.message, {
            position: "top-right",
            style: {
              background: "white",
              color: "black",
            },
          });
          router.push("/login");
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
    }

  };

  return (
    <div className="landing-page">
      {/* <Navbar/> */}
      <div className="content-bg-wrap" />

      <div className="header-spacer--standard" />
      <div className="container">
        <div className="row display-flex">
          <div className="col col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
            <div className="landing-content">
              <h1 className="landing-content-h1">
                Welcome to the Biggest Social Network in the World
              </h1>
              <p>
                We are the best and biggest social network with 5 billion active
                users all around the world. Share you thoughts, write blog
                posts, show your favourite music via Stopify, earn badges and
                much more!
              </p>
              {/* <Link href="/register">
                <p className="register_now_button">Register Now!</p>
              </Link> */}
            </div>
          </div>
          <div className="col col-xl-5 col-lg-6 col-md-12 col-sm-12 col-12">
            <div className={forgetCss.forget_password_form}>
              {/* <ul className="nav nav-tabs" role="tablist">
                <li className="nav-item">
                  <a
                    className="nav-link active"
                    data-toggle="tab"
                    href="#home"
                    role="tab"
                  >
                    <svg className="olymp-login-icon">
                      <use xlinkHref="svg-icons/sprites/icons.svg#olymp-login-icon" />
                    </svg>
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    data-toggle="tab"
                    href="#profile"
                    role="tab"
                  >
                    <svg className="olymp-register-icon">
                      <use xlinkHref="svg-icons/sprites/icons.svg#olymp-register-icon" />
                    </svg>
                  </a>
                </li>
              </ul> */}
              <div className="tab-content">
                <div
                  className="tab-pane active"
                  id="profile"
                  role="tabpanel"
                  data-mh="log-tab"
                >
                  <div className="title h6">Change Password</div>

                  <form className="content" onSubmit={handleResetPassword} method="post">
                    <div className="row">
                      <div className="col col-12 col-xl-12 col-lg-12 col-md-12 col-sm-12">
                        <div className="form-group label-floating">
                          <label className="control-label">
                            Your new-password
                          </label>
                          {/* <input
                            className="form-control"
                            placeholder
                            type={eyePassword ? "password" : "text"}

                            name="password"
                            value={formData.password}
                            onChange={handleFormChange}
                          /> */}

                          <input
                            className="form-control"
                            placeholder
                            type={eyePassword ? "password" : "text"}
                            // onChange={handleInputChange}
                            // value={registerInputState.password}
                            name="password"
                            required
                            value={password}
                            onChange={handlePasswordChange}
                          />
                          <div className="" style={{ position: "absolute", right: 10, top: "33%" }} onClick={(e) => setEyePassword(!eyePassword)}>

                            <FontAwesomeIcon icon={faEye} />
                          </div>
                          {isValid && password.length > 8 ? <>
                            <p className="m-0 py-1" style={{ color: 'green' }}>Password is valid!</p>
                          </> : <>
                            <p className="m-0 py-1" style={{ color: 'red' }}>
                              Password must contain at least one uppercase letter, one lowercase
                              letter, one number, and one symbol.
                            </p>
                          </>
                          }
                        </div>


                        {/* <div className="form-group label-floating">
                          <label className="control-label">
                            {" "}
                            Re-enter password
                          </label>
                          <input
                            className="form-control"
                            placeholder
                            type={eyeConfirmPassword ? "password" : "text"}

                            name="confirmpassword"
                            value={formData.confirmpassword}
                            onChange={handleFormChange}
                          />
                          <div className="" style={{ position: "absolute", right: 10, top: "33%" }} onClick={(e) => setEyeConfirmPassword(!eyeConfirmPassword)}>

                            <FontAwesomeIcon icon={faEye} />
                          </div>
                        </div> */}
                        {/* <div className="remember">
                          <div className="checkbox">
                            <label>
                              <input name="optionsCheckboxes" type="checkbox" />
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
                        </div> */}

                        <div className="form-group label-floating">
                          <label className="control-label">
                            Your Confirm-password
                          </label>
                          {/* <input
                            className="form-control"
                            placeholder
                            type={eyePassword ? "password" : "text"}

                            name="password"
                            value={formData.password}
                            onChange={handleFormChange}
                          /> */}

                          <input
                            className="form-control"
                            placeholder
                            type={eyeConfirmPassword ? "password" : "text"}
                            // onChange={handleInputChange}
                            // value={registerInputState.password}
                            name="confirm_password"
                            required
                            value={confirm_password}
                            onChange={handlePasswordChangeConfirm}
                          />
                          <div className="" style={{ position: "absolute", right: 10, top: "33%" }} onClick={(e) => setEyeConfirmPassword(!eyeConfirmPassword)}>

                            <FontAwesomeIcon icon={faEye} />
                          </div>
                          {isConfirmValid && confirm_password.length > 8 ? <>
                            <p className="m-0 py-1" style={{ color: 'green' }}>Confirm Password is valid!</p>
                          </> : <>
                            <p className="m-0 py-1" style={{ color: 'red' }}>
                              Confirm Password must contain at least one uppercase letter, one lowercase
                              letter, one number, and one symbol.
                            </p>
                          </>
                          }
                        </div>

                        <button type="submit"

                          className="btn btn-sm btn-primary full-width"
                        >
                          Change Password
                        </button>
                        {/* <div className="or" />
                        <a
                          href="#"
                          className="btn btn-sm bg-facebook full-width btn-icon-left"
                        >
                          <i className="fab fa-facebook-f" aria-hidden="true" />
                          Login with Facebook
                        </a>
                        <a
                          href="#"
                          className="btn btn-sm bg-twitter full-width btn-icon-left"
                        >
                          <i className="fab fa-twitter" aria-hidden="true" />
                          Login with Twitter
                        </a>
                        <p>
                          Don’t you have an account?{" "}
                          <a href="/register">Register Now!</a> it’s really
                          simple and you can start enjoing all the benefits!
                        </p> */}
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
