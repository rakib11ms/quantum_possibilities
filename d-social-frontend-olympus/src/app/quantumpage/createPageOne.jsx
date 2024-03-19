"use client";
import React, { useEffect, useState, useRef } from "react";
import axiosInstance from "../../../utils/axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { Formik } from "formik";
import * as Yup from "yup";
import { TextFieldWrapper } from "@/component/Reuseable";
import { AutoCompleteWrapper } from "@/component/Reuseable";
import { host } from "@/environment";
import Switch from "@mui/material/Switch";
import axios from "axios";
import { Card } from "@mui/material";

const CreatePageOne = ({ onNext, pageData, setPageData, userList }) => {
  const handleFormSubmit = async (
    _values,
    { setErrors, setStatus, setSubmitting }
  ) => {
    try {
      console.log("Handle form clicked");
      setPageData((values) => ({ ...values, ..._values }));
      onNext();
    } catch (err) {
      console.error(err);
      toast.error("There was an error, try again later");
      setStatus({ success: false });
      setErrors({ submit: err.message });
      setSubmitting(false);
    }
  };

  console.log("pageData__", pageData);

  const categoryList = ["Business", "Entertainment", "Education"];
  const friendList = ["Anik", "Ruhul", "Banna", "Tasluf", "Ashik"];
  const privacyList = ["public", "friends", "only me"];
  const locationList = ["Dhaka,Bangladesh", "Dhaka", "Dinajpur", "Rajshahi"];

  return (
    <div className="container">
      <div className="px-4">
        <h4 className="page-header-text">Create Page</h4>
        <p>
          Your Page is where people go to learn more about you. Make sure You
          have all the information they may need
        </p>
      </div>
      <hr />

      <div className="row">
        <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
          <Formik
            initialValues={{
              name: pageData ? pageData?.name : undefined,
              category: pageData ? pageData?.category : [],
              bio: pageData ? pageData?.bio : undefined,

              privacy: pageData ? pageData?.privacy : [],
              location: pageData ? pageData?.location : undefined,
              zip_code: pageData ? pageData?.zip_code : undefined,
              friends: pageData ? pageData?.friends : [],
            }}
            validationSchema={Yup.object().shape({
              name: Yup.string().max(255).required("name field is required"),
              category: Yup.array().required("category field is required"),
              bio: Yup.string().max(255).required("bio field is required"),
              privacy: Yup.string().required("privacy field is required"),
            })}
            onSubmit={handleFormSubmit}
          >
            {({
              errors,
              handleBlur,
              handleChange,
              handleSubmit,
              isSubmitting,
              touched,
              values,
              setFieldValue,
            }) => {
              console.log(errors, "values__", values);
              return (
                <form onSubmit={handleSubmit}>
                  <Card sx={{ py: 4, pb: 8, borderRadius: '15px' }}>
                    <div className="create-progressbar">
                      <div
                        className="progress"
                        role="progressbar"
                        aria-label="Success example"
                        aria-valuenow="50"
                        aria-valuemin="0"
                        aria-valuemax="100"
                      >
                        <div
                          className="progress-bar bg-success"
                          style={{ width: "50%" }}
                        ></div>
                      </div>
                      <p className="step-p">Step 1 of 2</p>
                    </div>


                    <div className="create-inputs-div">
                      <div className="row container">
                        <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 mb-4">
                          <div className="row">
                            <div className="col-12 col-sm-12 col-md-4 col-lg-6 col-xl-6">
                              <lebel className="create-lebel-text">
                                Page Name
                              </lebel>
                              <TextFieldWrapper
                                name="name"
                                value={values?.name}
                                touched={touched?.name}
                                errors={errors?.name}
                                handleChange={handleChange}
                                handleBlur={handleChange}
                                placeholder="Enter Page Name"
                              />
                            </div>
                            <div className="col-12 col-sm-12 col-md-4 col-lg-6 col-xl-6">
                              <lebel className="create-lebel-text">
                                Category
                              </lebel>
                              <AutoCompleteWrapper
                                placeholder={"Select Category"}
                                options={categoryList}
                                value={values?.category || []}
                                required={
                                  values?.category?.length > 0 ? false : true
                                }
                                disableClearable={true}
                                multiple={true}
                                handleChange={(e, v) =>
                                  setFieldValue("category", v)
                                }
                              />
                              {/* <TextFieldWrapper
                                  name="category"
                                  value={values?.category}
                                  touched={touched?.category}
                                  errors={errors?.category}
                                  handleChange={handleChange}
                                  handleBlur={handleChange}
                                  placeholder="Enter Page Category"
                                /> */}
                            </div>
                          </div>
                        </div>

                        <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                          <lebel className="create-lebel-text">
                            Bio (optional)
                          </lebel>
                          <TextFieldWrapper
                            placeholder="Enter Page Bio"
                            name="bio"
                            value={values?.bio}
                            touched={touched?.bio}
                            errors={errors?.bio}
                            handleChange={handleChange}
                            handleBlur={handleChange}
                            // minRows={1}
                            // maxRows={1}
                            multiline
                          />
                        </div>
                      </div>
                    </div>
                  </Card>

                  <Card sx={{ py: 4, pb: 8, borderRadius: '15px', mt: 3 }}>
                    <div className="create-inputs-div ">
                      <div className="row container">
                        <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 mb-4">
                          <h5 className="create-page-header">Contact</h5>
                          <div className="row">
                            <div className=" col-sm-12 col-md-6 col-lg-4 col-xl-4">
                              <lebel className="create-lebel-text">
                                Privacy
                              </lebel>
                              <AutoCompleteWrapper
                                placeholder={"Select Privacy"}
                                options={privacyList}
                                value={values?.privacy || []}
                                required={
                                  values?.privacy?.length > 0 ? false : true
                                }
                                disableClearable={true}
                                handleChange={(e, v) =>
                                  setFieldValue("privacy", v)
                                }
                              />
                            </div>

                            <div className=" col-sm-12 col-md-6 col-lg-4 col-xl-4">
                              <lebel className="create-lebel-text">
                                Location
                              </lebel>
                              <AutoCompleteWrapper
                                placeholder={"Select Location"}
                                options={locationList}
                                value={values?.location || []}
                                required={
                                  values?.location?.length > 0 ? false : true
                                }
                                disableClearable={true}
                                multiple={true}
                                handleChange={(e, v) =>
                                  setFieldValue("location", v)
                                }
                              />
                            </div>

                            <div className=" col-sm-12 col-md-6 col-lg-4 col-xl-4">
                              <lebel className="create-lebel-text">
                                Zip Code
                              </lebel>
                              <TextFieldWrapper
                                name="zip_code"
                                value={values?.zip_code}
                                touched={touched?.zip_code}
                                errors={errors?.zip_code}
                                handleChange={handleChange}
                                handleBlur={handleChange}
                                placeholder="Zip Code"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="row container">
                        <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 mb-4">
                          <h5 className="create-page-header">
                            Invite Friends
                          </h5>
                          <div className="row">
                            <div className="col-12 col-sm-12 col-md-4 col-lg-12 col-xl-12">
                              <AutoCompleteWrapper
                                // options={friendList}
                                // value={values?.friends || []}
                                // required={
                                //   values?.friends?.length > 0 ? false : true
                                // }
                                // disableClearable={true}
                                // multiple={true}
                                // handleChange={(e, v) =>
                                //   setFieldValue("friends", v)
                                // }
                                placeholder="Select Friends"
                                options={userList}
                                multiple={true}
                                value={values?.friends}
                                required={
                                  values?.friends?.length > 0 ? false : true
                                }
                                handleChange={(e, v) =>
                                  setFieldValue("friends", v)
                                }
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-12 col-lg-12 col-xl-12 d-flex justify-content-end pt-3 pr-4">
                        <button
                          className="create-back-svg create-next-text"
                          type="submit"
                        >
                          Next
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="21"
                            height="20"
                            viewBox="0 0 21 20"
                            fill="none"
                          >
                            <path
                              d="M5.05731 4.81756C4.9992 4.75945 4.95311 4.69046 4.92166 4.61454C4.89021 4.53861 4.87402 4.45724 4.87402 4.37506C4.87402 4.29288 4.89021 4.2115 4.92166 4.13558C4.95311 4.05965 4.9992 3.99067 5.05731 3.93256C5.11542 3.87445 5.18441 3.82835 5.26033 3.7969C5.33626 3.76545 5.41763 3.74927 5.49981 3.74927C5.58199 3.74927 5.66337 3.76545 5.73929 3.7969C5.81522 3.82835 5.8842 3.87445 5.94231 3.93256L11.5673 9.55756C11.6255 9.61561 11.6717 9.68458 11.7032 9.76052C11.7347 9.83645 11.7509 9.91785 11.7509 10.0001C11.7509 10.0823 11.7347 10.1637 11.7032 10.2396C11.6717 10.3155 11.6255 10.3845 11.5673 10.4426L5.94231 16.0676C5.8842 16.1257 5.81522 16.1718 5.73929 16.2032C5.66337 16.2347 5.58199 16.2508 5.49981 16.2508C5.41763 16.2508 5.33626 16.2347 5.26033 16.2032C5.18441 16.1718 5.11542 16.1257 5.05731 16.0676C4.9992 16.0094 4.95311 15.9405 4.92166 15.8645C4.89021 15.7886 4.87402 15.7072 4.87402 15.6251C4.87402 15.5429 4.89021 15.4615 4.92166 15.3856C4.95311 15.3097 4.9992 15.2407 5.05731 15.1826L10.2411 10.0001L5.05731 4.81756ZM15.4998 4.37506C15.4998 4.2093 15.434 4.05033 15.3168 3.93312C15.1995 3.81591 15.0406 3.75006 14.8748 3.75006C14.7091 3.75006 14.5501 3.81591 14.4329 3.93312C14.3157 4.05033 14.2498 4.2093 14.2498 4.37506V15.6251C14.2498 15.7908 14.3157 15.9498 14.4329 16.067C14.5501 16.1842 14.7091 16.2501 14.8748 16.2501C15.0406 16.2501 15.1995 16.1842 15.3168 16.067C15.434 15.9498 15.4998 15.7908 15.4998 15.6251V4.37506Z"
                              fill="white"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </Card>

                </form>
              );
            }}
          </Formik>
        </div>
      </div>

    </div>
  );
};

const CreatePageTwo = ({ onBack, pageData, setPageData, setActiveDiv }) => {
  const router = useRouter();
  let fileInputRef;
  let fileInputCoverRef;

  const handleUploadClick = () => {
    if (fileInputRef) {
      fileInputRef.click();
    }
  };

  const handleUploadClicktw = () => {
    if (fileInputCoverRef) {
      fileInputCoverRef.click();
    }
  };
  const handleFormSubmit = async (
    _values,
    { setErrors, setStatus, setSubmitting }
  ) => {
    try {
      console.log("clicked");
      setPageData((values) => ({ ...values, ..._values }));
      console.log("pageData", pageData);

      if (pageData?.profilePic && pageData?.coverPic) {
        const formData = new FormData();

        for (const index in pageData) {
          if (index === "category") {
            const temp = pageData[index]
            for (const j of temp) {
              formData.append("category[]", j);
            }
          } else if (index === "friends") {
            const temp = pageData[index].map((i) => i?.value);
            for (const j of temp) {
              formData.append("friends[]", j);
            }
          } else if (index === "location") {
            const temp = pageData[index]
            for (const j of temp) {
              formData.append("location[]", j);
            }
          } else {
            formData.append(index, pageData[index]);
          }
        }
        axiosInstance
          .post("/api/create-pages", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((res) => {
            if (res.data.status == 200) {
              toast.success(res.data.message);
              setPageData({});
              setActiveDiv(6)
            }
          })
          .catch((err) => {
            console.log(err);
            toast.error("Page creation failed", "error");
          });
      }
    } catch (err) {
      console.error(err);
      toast.error("There was an error, try again later", "error");
      setStatus({ success: false });
      setErrors({ submit: err.message });
      setSubmitting(false);
    }
  };

  return (
    <div>
      <div className="px-4">
        <h4 className="page-header-text">Create Page</h4>
        <p>
          Your Page is where people go to learn more about you. Make sure You
          have all the information they may need
        </p>
      </div>
      <hr />
      <Formik
        initialValues={{
          profilePic: pageData ? pageData?.profilePic : undefined,
          coverPic: pageData ? pageData?.coverPic : undefined,
          pageNotification: pageData ? pageData?.pageNotification : false,
          marketingEmail: pageData ? pageData?.marketingEmail : false,
        }}
        validationSchema={Yup.object().shape({
          // profilePic: Yup.object()
          //   .required("Profile pic field is required"),
          // pageNotification: Yup.boolean()
          //   .required("page notification field is required"),
          // marketingEmail: Yup.boolean().required("marketing email field is required"),
        })}
        onSubmit={handleFormSubmit}
      >
        {({
          errors,
          handleBlur,
          handleChange,
          handleSubmit,
          isSubmitting,
          touched,
          values,
          setFieldValue,
        }) => {
          console.log("values__", errors);
          return (
            <form onSubmit={handleSubmit}>
              <div className="container create-page-div-third">
                <div className="create-progressbar">
                  <div
                    className="progress"
                    role="progressbar"
                    aria-label="Success example"
                    aria-valuenow="100"
                    aria-valuemin="0"
                    aria-valuemax="100"
                  >
                    <div
                      className="progress-bar bg-success"
                      style={{ width: "100%" }}
                    ></div>
                  </div>
                  <p className="step-p">Step 2 of 2</p>
                </div>

                <div className="row container">
                  <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                    <div>
                      <button
                        className="file-upload-btn"
                        onClick={handleUploadClick}
                      >
                        <img
                          src={`${host}/uploads/pages/AddImage.png`}
                          alt="Add Image"
                          className="file-upload-img"
                        />
                        <div>Add Your Profile Picture</div>
                      </button>

                      <input
                        className="file-upload-input"
                        type="file"
                        ref={(ref) => (fileInputRef = ref)}
                        style={{ display: "none" }}
                        onChange={(e) => {
                          const file = e.target.files[0];
                          console.log("a___", file);
                          if (file) {
                            setFieldValue("profilePic", file);
                          }
                        }}
                      />

                      {values?.profilePic && (
                        <img
                          src={URL.createObjectURL(values?.profilePic)}
                          alt={`Uploaded Image ${values?.profilePic}`}
                          height={120}
                          width={120}
                        />
                      )}
                    </div>
                  </div>
                  <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 mt-4">
                    <div>
                      <button
                        className="file-upload-btn"
                        onClick={handleUploadClicktw}
                      >
                        <img
                          src={`${host}/uploads/pages/AddImage.png`}
                          alt="Add Image"
                          className="file-upload-img"
                        />
                        <div>Add Your Cover Photo</div>
                      </button>
                      <input
                        className="file-upload-input"
                        type="file"
                        ref={(ref) => (fileInputCoverRef = ref)}
                        style={{ display: "none" }}
                        onChange={(e) => {
                          const file = e.target.files[0];
                          console.log("c___", file);
                          if (file) {
                            setFieldValue("coverPic", file);
                          }
                        }}
                      />

                      {values.coverPic && (
                        <img
                          src={URL.createObjectURL(values?.coverPic)}
                          alt={`Uploaded Image ${values?.coverPic}`}
                          height={120}
                          width={120}
                        />
                      )}
                      <div className="py-3">
                        <div className="d-flex justify-content-between">
                          <div>
                            Receiving notifications for your profile page
                          </div>
                          <Switch
                            value={values?.pageNotification}
                            onChange={(e) => {
                              const value = e.target.checked;
                              setFieldValue("pageNotification", value);
                            }}
                          />
                        </div>
                        <div className="d-flex justify-content-between">
                          <div>
                            Emails for marketing and promotions related to your
                            page
                          </div>
                          <Switch
                            value={values?.marketingEmail}
                            onChange={(e) => {
                              const value = e.target.checked;
                              setFieldValue("marketingEmail", value);
                            }}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="mt-4">
                      <div className="create-next-svg-div">
                        <div
                          className="create-back-svg create-next-text"
                          onClick={() => onBack()}
                        >
                          Back
                        </div>
                        <div
                          className="create-next-svg d-flex justify-content-between align-items-center"
                          onClick={() => handleSubmit()}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="21"
                            height="21"
                            viewBox="0 0 21 21"
                            fill="none"
                          >
                            <path
                              d="M10.5 14.6666V12.1666"
                              stroke="white"
                              stroke-width="1.25"
                              stroke-linecap="round"
                            />
                            <path
                              d="M10.5 3.83325V8.83325"
                              stroke="white"
                              stroke-width="1.25"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                            <path
                              d="M9.66699 2.99996V6.33329C9.66699 6.55431 9.75479 6.76627 9.91107 6.92255C10.0674 7.07883 10.2793 7.16663 10.5003 7.16663H15.3278C15.4103 7.16661 15.4909 7.14213 15.5594 7.09629C15.6279 7.05046 15.6813 6.98532 15.7128 6.90913C15.7443 6.83293 15.7525 6.74911 15.7363 6.66826C15.7201 6.58742 15.6804 6.51318 15.622 6.45496L13.9803 4.81329C13.9414 4.77424 13.9195 4.72135 13.9195 4.66621C13.9195 4.61107 13.9414 4.55818 13.9803 4.51913L15.622 2.87746C15.6801 2.81919 15.7196 2.74503 15.7356 2.66433C15.7516 2.58362 15.7434 2.49999 15.7119 2.42397C15.6804 2.34794 15.6272 2.28294 15.5588 2.23714C15.4905 2.19134 15.4101 2.16681 15.3278 2.16663H10.5003C10.2793 2.16663 10.0674 2.25442 9.91107 2.4107C9.75479 2.56698 9.66699 2.77895 9.66699 2.99996ZM16.167 18.8333H4.83366C3.90033 18.8333 3.43366 18.8333 3.07699 18.6516C2.7634 18.4918 2.50845 18.2369 2.34866 17.9233C2.16699 17.5666 2.16699 17.1 2.16699 16.1666V11.5C2.16699 10.5666 2.16699 10.1 2.34866 9.74329C2.50845 9.4297 2.7634 9.17475 3.07699 9.01496C3.43366 8.83329 3.90033 8.83329 4.83366 8.83329H6.35366C6.63283 8.83329 6.77199 8.83329 6.87033 8.89079C6.95565 8.94093 7.02035 9.01981 7.05283 9.11329C7.08949 9.22079 7.06199 9.35746 7.00783 9.62996L5.81949 15.5716C5.71033 16.1183 5.65533 16.3916 5.72949 16.605C5.79414 16.793 5.9239 16.9517 6.09533 17.0525C6.29033 17.1666 6.56949 17.1666 7.12699 17.1666H13.8737C14.432 17.1666 14.7103 17.1666 14.9053 17.0525C15.0769 16.9521 15.207 16.7936 15.272 16.6058C15.3453 16.3916 15.2903 16.1183 15.1812 15.5725L13.9928 9.63079C13.9387 9.35746 13.9112 9.22079 13.9478 9.11413C13.9803 9.0202 14.0454 8.94099 14.1312 8.89079C14.2287 8.83329 14.3678 8.83329 14.647 8.83329H16.167C17.1003 8.83329 17.567 8.83329 17.9237 9.01496C18.2372 9.17475 18.4922 9.4297 18.652 9.74329C18.8337 10.1 18.8337 10.5666 18.8337 11.5V16.1666C18.8337 17.1 18.8337 17.5666 18.652 17.9233C18.4922 18.2369 18.2372 18.4918 17.9237 18.6516C17.567 18.8333 17.1003 18.8333 16.167 18.8333Z"
                              fill="white"
                            />
                          </svg>
                          <span className="create-next-text">
                            Finish & Publish
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          );
        }}
      </Formik>
    </div>
  );
};
const MultiStepForm = ({ setActiveDiv }) => {
  const [step, setStep] = useState(1);
  const [pageData, setPageData] = useState({});
  const [files, setFiles] = useState([]);
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    const username = localStorage.getItem("username");
    axiosInstance
      .post("/api/friend-list", { username: username })
      .then((res) => {
        // console.log("res.data.results__", res.data.results);
        setUserList(
          res.data?.results
            ?.filter((j) => j?.connected_user_id?._id && j?.user_id?._id)
            ?.map((i) => {
              if (i.connected_user_id.username !== username) {
                return {
                  label: [
                    i?.connected_user_id?.first_name,
                    i?.connected_user_id?.last_name,
                  ].join(" "), // i.connected_user_id.username
                  value: i?.connected_user_id?._id,
                };
              } else {
                return {
                  label: [i?.user_id?.first_name, i?.user_id?.last_name].join(
                    " "
                  ), // i.connected_user_id.username
                  value: i?.user_id?._id,
                };
              }
            })
        );
      })
      .catch((err) => console.log(err));
  }, []);

  console.log("pageData", pageData);
  const handleNext = () => {
    setStep((p) => p + 1);
  };

  const handleBack = () => {
    setStep((p) => p - 1);
  };

  const handleInputChange = (e) => {
    setPageInfo({
      ...pageInfo,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileUpload = (e) => {
    const uploadedFiles = e.target.files;
    const newFilesArray = [];

    for (let i = 0; i < uploadedFiles.length; i++) {
      const file = uploadedFiles[i];
      newFilesArray.push(file);
    }

    setFiles([...files, ...newFilesArray]);
  };

  return (
    <div>
      {step === 1 && (
        <CreatePageOne
          onNext={handleNext}
          pageData={pageData}
          setPageData={setPageData}
          userList={userList}
        />
      )}
      {step === 2 && (
        <CreatePageTwo
          onBack={handleBack}
          pageData={pageData}
          setPageData={setPageData}
          setActiveDiv={setActiveDiv}
        />
      )}
    </div>
  );
};

export default MultiStepForm;
