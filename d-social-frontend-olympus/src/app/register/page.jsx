"use client";
import React, { useState, useEffect } from "react";
// import pagLogo from "../../../public/qp.png";
import Link from "next/link";

import axiosInstance from "../../../utils/axios";

// import countryCodes from 'country-codes-list';

import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
const Register = () => {
  const countryCodes = require("country-codes-list");

  const router = useRouter();


  const [registerInputState, setRegisterInputState] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    phone: "",
    gender: "",
    day: "",
    month: "",
    year: "",
    isAccept: false,
  });


  console.log("accept status", registerInputState.isAccept)

  const [strength, setStrength] = useState(null);

  console.log("password", registerInputState.password)

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "password") {
      checkPasswordStrength(value);
    }

    setRegisterInputState({
      ...registerInputState,
      [name]: value,
    });
  };


  // const submitFinal=(e)=>{
  //   e.preventDefault();
  //   axiosInstance.post(`api/signup`, registerInputState).then((res) => {
  //     if (res.data.status === 200) {
  //       toast(res.data.message, {
  //         type: "success",
  //         position: "top-right",
  //       });
  //       router.push("/login");
  //     } else if (res.data.status === 400) {
  //       toast(res.data.error, {
  //         type: "error",
  //         position: "top-right",
  //         style: {
  //           background: "",
  //           color: "red",
  //         },
  //       });
  //     } else if (res.data.status === 404) {
  //       console.log("yes 404", res.data.errors);
  //       res.data.errors.forEach((item, i) => {
  //         return toast(item.msg, {
  //           type: "error",
  //           position: "top-right",
  //           style: {
  //             background: "",
  //             color: "red",
  //           },
  //         });
  //       });
  //     } else {
  //       toast(res.data.error, {
  //         type: "error",
  //         position: "top-right",
  //         style: {
  //           background: "",
  //           color: "red",
  //         },
  //       });
  //     }
  //   });
  // }
  const submitRegistration = (e) => {
    e.preventDefault();
    if (registerInputState.first_name === "") {
      toast("First name is required", {
        type: "error",
        position: "top-right",
        style: {
          background: "",
          color: "red",
        },
      });
    }
    else if (registerInputState.last_name === "") {
      toast("Last name is required", {
        type: "error",
        position: "top-right",
        style: {
          background: "",
          color: "red",
        },
      });
    }
    else if (registerInputState.email === "") {
      toast("Email is required", {
        type: "error",
        position: "top-right",
        style: {
          background: "",
          color: "red",
        },
      });
    }
    else if (registerInputState.day === "" || registerInputState.month === "" || registerInputState.year === "") {
      toast("Date is invalid.Provide date all required", {
        type: "error",
        position: "top-right",
        style: {
          background: "",
          color: "red",
        },
      });
    }
    else if (registerInputState.password === "") {
      toast("Please provide password", {
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

    else if (registerInputState.gender === "") {
      toast(" Gender is required", {
        type: "error",
        position: "top-right",
        style: {
          background: "",
          color: "red",
        },
      });
    }
    else if (registerInputState.isAccept === false) {
      toast("Please checked accept the terms and conditions", {
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
      axiosInstance.post(`api/signup`, registerInputState).then((res) => {
        if (res.data.status === 200) {
          toast(res.data.message, {
            type: "success",
            position: "top-right",
          });
          router.push("/login");
        } else if (res.data.status === 400) {
          toast(res.data.error, {
            type: "error",
            position: "top-right",
            style: {
              background: "",
              color: "red",
            },
          });
        } else if (res.data.status === 404) {
          console.log("yes 404", res.data.errors);
          res.data.errors.forEach((item, i) => {
            return toast(item.msg, {
              type: "error",
              position: "top-right",
              style: {
                background: "",
                color: "red",
              },
            });
          });
        } else {
          toast(res.data.error, {
            type: "error",
            position: "top-right",
            style: {
              background: "",
              color: "red",
            },
          });
        }
      });
      // }
      // else {
      //   toast("Password must be both strong and at least 8 characters in length.", {
      //     type: "error",
      //     position: "top-right",
      //     style: {
      //       background: "",
      //       color: "red",
      //     },
      //   });
      // }
    }
  };

  const generateOptions = (start, end) => {
    const options = [];
    for (let i = start; i <= end; i++) {
      options.push(
        <option key={i} value={i}>
          {i}
        </option>
      );
    }
    return options;
  };


  // const generateMonthOptions = (start, end) => {

  //   let options = [];
  //   let arr = [
  //     { id: 1, value: "January" }, { id: 2, value: "February" }, { id: 3, value: "March" }, { id: 4, value: "April" }, { id: 5, value: "May" }, { id: 6, value: "June" }, { id: 7, value: "July" }, { id: 8, value: "August" }, { id: 9, value: "September" }, { id: 10, value: "October" }, { id: 11, value: "November" }, { id: 12, value: "December" }];

  //   const data = arr.forEach((item, i) => {
  //     const data = options.push(
  //       <option key={item.id}> {item.value} </option>
  //     )
  //   })
  //   return data;

  // }

  const [allGender, setAllGender] = useState([]);
  // console.log('genders', allGender)
  async function fetchGender() {
    axiosInstance.get(`/api/gender`).then((res) => {
      console.log("res", res);
      if (res.data.status == 200) {
        setAllGender(res.data.allGender);
      }
    });
  }
  useEffect(() => {
    fetchGender();
  }, []);


  const [eyePassword, setEyePassword] = useState(true)







  const [password, setPassword] = useState('');
  const [isValid, setIsValid] = useState(false);

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
    setRegisterInputState({ ...registerInputState, password: newPassword })
    setIsValid(isValidPassword);
  };

  return (
    <div className="landing-page">
      {/* <Navbar/> */}
      <div className="content-bg-wrap" />

      {/* <div className="header-spacer--standard" /> */}
      <div className="container mt-5">
        <div className="row display-flex">
          <div className="col col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
            <div className="landing-content">
              <h1 className="landing-content-h1">
                Welcome to the Biggest Social Network in the World
              </h1>
              <p>
                We are the best and biggest social network with 5 billion active
                users all around the world. Share you thoughts, write blog
                posts, show your favourite music via Spotify, earn badges and
                much more!
              </p>
              <Link href="/login">
                <p className="register_now_button">Login Now!</p>
              </Link>
            </div>
          </div>
          <div className="col col-xl-5 col-lg-6 col-md-12 col-sm-12 col-12">
            <div className="registration-login-form">
              <ul className="nav nav-tabs" role="tablist">
                {/* <li className="nav-item">
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
                </li> */}
              </ul>
              <div className="tab-content">
                <div
                  className="tab-pane active"
                  id="home"
                  role="tabpanel"
                  data-mh="log-tab"
                >
                  <div className="title h6">Register Here</div>
                  <form className="content">
                    <div className="row">
                      <div className="col col-12 col-xl-6 col-lg-6 col-md-6 col-sm-12">
                        <div className="form-group label-floating">
                          <label className="control-label">First Name</label>
                          <input
                            className="form-control"
                            placeholder
                            onChange={handleInputChange}
                            name="first_name"
                            value={registerInputState.first_name}
                            type="text"
                            required
                          />
                        </div>
                      </div>
                      <div className="col col-12 col-xl-6 col-lg-6 col-md-6 col-sm-12">
                        <div className="form-group label-floating">
                          <label className="control-label">Last Name</label>
                          <input
                            className="form-control"
                            placeholder
                            type="text"
                            onChange={handleInputChange}
                            value={registerInputState.last_name}
                            name="last_name"
                            required
                          />
                        </div>
                      </div>
                      <div className="col col-12 col-xl-12 col-lg-12 col-md-12 col-sm-12">
                        <div className="form-group label-floating">
                          <label className="control-label">Your Email</label>
                          <input
                            className="form-control"
                            placeholder
                            type="email"
                            onChange={handleInputChange}
                            value={registerInputState.email}
                            name="email"
                            required
                          />
                        </div>
                        <div className="form-group label-floating" style={{ position: "relative" }}>
                          <label className="control-label">Your Password</label>
                          <input
                            className="form-control"
                            placeholder
                            type={eyePassword ? "password" : "text"}
                            // onChange={handleInputChange}
                            // value={registerInputState.password}
                            name="password"
                            required
                            value={registerInputState.password}
                            onChange={handlePasswordChange}
                          />

                          {/* {registerInputState.password !== "" && (
                            <div>
                              <p id="strength-text" className={`text-danger mt-2 ${strength < 40 ? 'text-danger' : 'text-success'}`}>
                                Strength:{" "}
                                {strength === 0
                                  ? "Very Weak"
                                  : strength < 40
                                    ? "Weak"
                                    : strength < 60
                                      ? "Moderate"
                                      : strength < 80
                                        ? "Strong"
                                        : "Very Strong"}
                              </p>
                              {registerInputState.password.length < 8 && (
                                <p className="text-danger mt-2">Password must be at least 8 characters long.</p>
                              )}
                            </div>
                          )} */}

                          {isValid && registerInputState.password.length > 8 ? <>
                            <p style={{ color: 'green' }}>Password is valid!</p>
                          </> : <>
                            <p style={{ color: 'red' }}>
                              Password must contain at least one uppercase letter, one lowercase
                              letter, one number, and one symbol.
                            </p>
                          </>
                          }

                          <div className="" style={{ position: "absolute", right: 10, top: "33%" }} onClick={(e) => setEyePassword(!eyePassword)}>

                            <FontAwesomeIcon icon={faEye} />
                          </div>

                        </div>
                        {/* <div className="form-group date-time-picker label-floating">
                          <label className="control-label">Your Birthday</label>
                          <input
                            name="datetimepicker"
                            defaultValue="10/24/1984"
                          />
                          <span className="input-group-addon">
                            <svg className="olymp-calendar-icon">
                              <use xlinkHref="svg-icons/sprites/icons.svg#olymp-calendar-icon" />
                            </svg>
                          </span>
                        </div> */}
                        <div className="">
                          <div className="dob-register">
                            <div>
                              <select
                                className="dob-register-day"
                                onChange={handleInputChange}
                                value={registerInputState.day}
                                name="day"
                                required
                              >
                                <option value="">Day</option>
                                {generateOptions(1, 31)}
                              </select>
                            </div>
                            <div>
                              <select
                                className="dob-register-day"
                                onChange={handleInputChange}
                                value={registerInputState.month}
                                name="month"
                                required
                              >
                                <option value="">Month</option>

                                <option value="1"> January</option>
                                <option value="2"> February</option>
                                <option value="3"> March</option>
                                <option value="4"> April</option>
                                <option value="5"> May</option>
                                <option value="6"> June</option>
                                <option value="7"> July</option>
                                <option value="8"> August</option>
                                <option value="9"> September</option>
                                <option value="10"> October</option>
                                <option value="11"> November</option>
                                <option value="12"> December</option>
                              </select>
                            </div>
                            <div>
                              <select
                                className="dob-register-day"
                                onChange={handleInputChange}
                                value={registerInputState.year}
                                name="year"
                                required
                              >
                                <option value="">Year</option>
                                {generateOptions(1900, 2024)}{" "}
                                {/* Choose a suitable range */}
                              </select>
                            </div>
                          </div>
                        </div>
                        <div className="form-group d-flex">
                          <select
                            className="register-mobile-num"
                            id="countryCode"
                            name="phone"
                          >
                            {Object.entries(
                              countryCodes.customList(
                                "countryCode",
                                "+{countryCallingCode}"
                              )
                            ).map(([code, description]) => (
                              <option key={code} value={description}>
                                {code} ({description})
                              </option>
                            ))}
                          </select>
                          <input
                            type="tel"
                            className="form-control"
                            id="phoneNumber"
                            placeholder="Enter your phone number"
                            onChange={handleInputChange}
                            value={registerInputState.phone}
                            name="phone"
                            required
                          />
                        </div>

                        <div className="form-group label-floating is-select pb-2">
                          <label className="control-label">Your Gender</label>

                          {/* <select className=" selectpicker form-control" name="gender" value={registerInputState.gender} onChange={handleInputChange}> */}
                          <select
                            className=" form-control"
                            name="gender"
                            value={registerInputState.gender}
                            onChange={handleInputChange}
                          >
                            <option value="">Choose gender</option>

                            {allGender.map((item, i) => {
                              return (
                                <option value={item._id}>
                                  {item.gender_name}
                                </option>
                              );
                            })}
                          </select>
                        </div>


                        <div class="form-checks  d-flex  ">
                          <div>
                            <input
                              class="accept-checkBox " type="checkbox"
                              onChange={() => setRegisterInputState({ ...registerInputState, isAccept: !registerInputState.isAccept })}
                              // onChange={() => alert("Hello")}

                              value={registerInputState.isAccept} id="flexCheckChecked" name="optionsCheckboxes"

                            />

                          </div>
                          <div className="mx-2 ">
                            <label>
                              I accept the <a href="#" className="register-btn">Terms and Conditions</a>{" "}
                              of the website

                            </label>
                          </div>

                        </div>




                        <button
                          type="button"
                          onClick={submitRegistration}
                          className={`btn btn-purple btn-sm full-width mt-1`}
                        >
                          Complete Registration!
                        </button>


                      </div>
                    </div>
                  </form>
                </div>
                <div
                  className="tab-pane"
                  id="profile"
                  role="tabpanel"
                  data-mh="log-tab"
                >
                  <div className="title h6">Login to your Account</div>
                </div>
              </div>
            </div>
          </div>
        </div >
      </div >
    </div >
  );
};

export default Register;
