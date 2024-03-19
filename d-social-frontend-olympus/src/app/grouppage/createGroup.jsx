"use client";
import React, { useEffect, useRef, useState } from "react";

import axiosInstance from "../../../utils/axios";
import axios from "axios";
import { host } from "@/environment";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { Formik } from "formik";
import * as Yup from "yup";
import { Card, Grid, TextField } from "@mui/material";
import { AutoCompleteWrapper, TextFieldWrapper } from "@/component/Reuseable";
import useToaster from "@/hooks/useToaster";

export const groupPrivacyList = ["public", "private"];

const CreatePageOne = ({ setStep, pageData, setPageData, userList }) => {
  const { showNotification } = useToaster();

  const handleFormSubmit = async (
    _values,
    { resetForm, setErrors, setStatus, setSubmitting }
  ) => {
    try {
      console.log("clicked");
      setPageData((values) => ({ ...values, ..._values }));
      setStep(2);
    } catch (err) {
      console.error(err);
      showNotification("There was an error, try again later", "error");
      setStatus({ success: false });
      setErrors({ submit: err.message });
      setSubmitting(false);
    }
  };
  return (
    <Grid
      sx={{
        p: 1,
      }}
    >
      <h4 className="page-header-text">Create Group</h4>
      <p>
        Your Group is where people go to learn more about you. Make sure yours
        has all the information they may need
      </p>
      <hr />

      <Grid
        // className="container-fluid create-page-div"
        sx={{
          // p: 2,
          borderRadius: "13px",
          // border: '1px solid'
        }}
      >
        <Formik
          initialValues={{
            group_name: pageData ? pageData?.group_name : undefined,
            group_description: pageData
              ? pageData?.group_description
              : undefined,
            group_privacy: pageData ? pageData?.group_privacy : "public",

            location: pageData ? pageData?.location : undefined,
            address: pageData ? pageData?.address : undefined,
            zip_code: pageData ? pageData?.zip_code : undefined,
            invited_users: pageData ? pageData?.invited_users : [],
          }}
          validationSchema={Yup.object().shape({
            group_name: Yup.string()
              .max(255)
              .required("Group name field is required"),
            group_description: Yup.string()
              .max(255)
              .required("Group description field is required"),
            group_privacy: Yup.string()
              .max(255)
              .required("Group privacy field is required"),

            location: Yup.string()
              .max(255)
              .required("Group location field is required"),
            zip_code: Yup.number().required("Group zip code field is required"),
            invited_users: Yup.array().required(
              "Group invited users field is required"
            ),
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
            {
              /* console.log("T__values__", values);
            console.log({ errors }); */
            }
            return (
              <form onSubmit={handleSubmit}>
                <Card
                  sx={{
                    p: 4,
                    borderRadius: "13px",
                    // border: '1px solid'
                  }}
                >
                  <div className="create-progressbar">
                    <div
                      className="progress"
                      role="progressbar"
                      aria-label="Success example"
                      aria-valuenow="33"
                      aria-valuemin="0"
                      aria-valuemax="100"
                    >
                      <div
                        className="progress-bar bg-success"
                        style={{ width: "33%" }}
                      ></div>
                    </div>
                    <p className="step-p">Step 1 of 2</p>
                  </div>
                  <h4 className="page-header-text pl-4">Basic Information</h4>
                  <div className="create-inputs-div px-4">
                    <div
                      className="row container"
                      style={{
                        display: "grid",
                        gridTemplateColumns: "70% 30%",
                        width: "100%",
                        gap: 8,
                        // border:'1px solid'
                      }}
                    >
                      <div>
                        <lebel className="create-lebel-text">Group Name</lebel>
                        <TextFieldWrapper
                          // label={"Group name"}
                          // placeholder={"Name here..."}
                          name="group_name"
                          value={values?.group_name}
                          touched={touched?.group_name}
                          errors={errors?.group_name}
                          handleChange={handleChange}
                          handleBlur={handleChange}
                        />
                      </div>
                      <div>
                        <lebel className="create-lebel-text">Privacy</lebel>
                        <AutoCompleteWrapper
                          options={groupPrivacyList}
                          value={groupPrivacyList?.find(
                            (i) => i === values?.group_privacy
                          )}
                          required={true}
                          disableClearable={true}
                          handleChange={(e, v) =>
                            setFieldValue("group_privacy", v)
                          }
                        />
                      </div>
                    </div>

                    <div className="row container">
                      <lebel className="create-lebel-text">
                        Group Description
                      </lebel>
                      <TextFieldWrapper
                        // label={"Description"}
                        name="group_description"
                        value={values?.group_description}
                        touched={touched?.group_description}
                        errors={errors?.group_description}
                        handleChange={handleChange}
                        handleBlur={handleChange}
                        minRows={3}
                        maxRows={3}
                        multiline
                      />
                      {/* <div className="create-next-svg-div">
                      <button
                        className="create-next-svg"
                        type="submit"
                        style={{
                          border: "none",
                        }}
                      >
                        <div>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="30"
                            height="35"
                            fill="gray"
                            className="bi bi-chevron-bar-right"
                            viewBox="0 0 16 16"
                          >
                            <path
                              fillRule="evenodd"
                              d="M4.146 3.646a.5.5 0 0 0 0 .708L7.793 8l-3.647 3.646a.5.5 0 0 0 .708.708l4-4a.5.5 0 0 0 0-.708l-4-4a.5.5 0 0 0-.708 0zM11.5 1a.5.5 0 0 1 .5.5v13a.5.5 0 0 1-1 0v-13a.5.5 0 0 1 .5-.5z"
                            />
                          </svg>
                        </div>
                      </button>
                    </div> */}
                    </div>
                  </div>
                </Card>
                <br />
                <Card
                  sx={{
                    p: 4,
                    borderRadius: "13px",
                    // border: '1px solid'
                  }}
                  className="create-inputs-div"
                >
                  <div className="row container">
                    <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 mb-4">
                      <h4 className="page-header-text">Contact</h4>

                      <Grid
                        sx={{
                          display: "grid",
                          gridTemplateColumns: {
                            md: "1fr 1fr 1fr",
                            sm: "1fr",
                          },
                          gap: 2,
                        }}
                      >
                        <div>
                          <lebel className="create-lebel-text">Address</lebel>
                          <TextFieldWrapper
                            name="address"
                            value={values?.address}
                            touched={touched?.address}
                            errors={errors?.address}
                            handleChange={handleChange}
                            handleBlur={handleChange}
                          />
                        </div>
                        <div>
                          <lebel className="create-lebel-text">Location</lebel>
                          <TextFieldWrapper
                            name="location"
                            value={values?.location}
                            touched={touched?.location}
                            errors={errors?.location}
                            handleChange={handleChange}
                            handleBlur={handleChange}
                          />
                        </div>
                        <div>
                          <lebel className="create-lebel-text">Zip Code</lebel>
                          <TextFieldWrapper
                            type="number"
                            name="zip_code"
                            value={values?.zip_code}
                            touched={touched?.zip_code}
                            errors={errors?.zip_code}
                            handleChange={handleChange}
                            handleBlur={handleChange}
                          />
                        </div>
                      </Grid>
                    </div>

                    <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                      <lebel className="create-lebel-text">
                        Invite Friends
                      </lebel>
                      <AutoCompleteWrapper
                        options={userList}
                        multiple={true}
                        value={values?.invited_users || []}
                        required={
                          values?.invited_users?.length > 0 ? false : true
                        }
                        handleChange={(e, v) =>
                          setFieldValue("invited_users", v)
                        }
                      />
                    </div>
                  </div>
                </Card>
                <div className="mt-4">
                  <button
                    className="create-next-svg"
                    type="submit"
                    style={{
                      border: "none",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      alignContent: "center",
                      padding: 2,
                      width: "150px",
                    }}
                  >
                    <div>
                      <h5 style={{ color: "white", paddingTop: 4 }}>Next</h5>
                    </div>
                    <div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="30"
                        height="20"
                        fill="white"
                        className="bi bi-chevron-bar-right"
                        viewBox="0 0 16 16"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4.146 3.646a.5.5 0 0 0 0 .708L7.793 8l-3.647 3.646a.5.5 0 0 0 .708.708l4-4a.5.5 0 0 0 0-.708l-4-4a.5.5 0 0 0-.708 0zM11.5 1a.5.5 0 0 1 .5.5v13a.5.5 0 0 1-1 0v-13a.5.5 0 0 1 .5-.5z"
                        />
                      </svg>
                    </div>
                  </button>
                </div>
              </form>
            );
          }}
        </Formik>
      </Grid>
    </Grid>
  );
};

const CreatePageTwo = ({ setStep, pageData, setPageData }) => {
  const router = useRouter();
  const { showNotification } = useToaster();
  const [selectedFile, setSelectedFile] = useState(null);
  const [url, setUrl] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileChangetw = (e) => {
    const file = e.target.files[0];
    if (file) {
      const blob = URL.createObjectURL(file);
      setPageData((values) => ({
        ...values,
        group_cover_pic: file,
        url: blob,
      }));
      setUrl(blob);
      setSelectedFile(file);
    }
  };

  const handleUploadClicktw = () => {
    fileInputRef.current.click();
  };

  const handleSubmit = () => {
    if (pageData?.group_cover_pic) {
      const formData = new FormData();
      console.log("pageData__", pageData);

      for (const index in pageData) {
        if (index === "invited_users") {
          const temp = pageData[index].map((i) => i?.value);
          for (const j of temp) {
            formData.append("invited_users[]", j);
          }
        } else {
          formData.append(index, pageData[index]);
        }
      }
      axios
        .post(host + "/api/create-group", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("refreshToken")}`,
          },
        })
        .then((res) => {
          if (res.data.status == 200) {
            showNotification(res.data.message);
            setPageData({});
            router.push("/grouppage");
          }
        })
        .catch((err) => {
          console.log(err);
          showNotification("Group creation failed", "error");
        });
    }
  };

  return (
    <Grid
      sx={{
        p: 1,
      }}
    >
      <h4 className="page-header-text">It’s Time to Customize</h4>
      <p>
        Your Group is where people go to learn more about you. Make sure yours
        has all the information they may need.
      </p>
      <hr />

      <div className="container create-page-div">
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
          {/* <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
            <div>
              <lebel>Profile picture</lebel>
              <button className="file-upload-btn" onClick={handleUploadClick}>
                Click to + Profile Photo
              </button>
              <input
                className="file-upload-input"
                type="file"
                accept="image/*"
                ref={(ref) => (fileInputRef = ref)} // Define the ref for the file input
                style={{ display: "none" }}
                onChange={handleFileChange}
              />
              {selectedFile && <p>Selected file: {selectedFile.name}</p>}
            </div>
          </div> */}
          <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 mt-4">
            <div>
              {/* <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                <rect width="40" height="40" fill="url(#pattern0)" />
                <defs>
                  <pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">
                    <use xlink:href="#image0_2969_4904" transform="scale(0.01)" />
                  </pattern>
                  <image id="image0_2969_4904" width="100" height="100" xlink:href="data:image/png;base64,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" />
                </defs>
              </svg> */}

              <button className="file-upload-btn" onClick={handleUploadClicktw}>
                Add Cover Photo
              </button>

              <input
                className="file-upload-input"
                type="file"
                accept="image/*"
                ref={fileInputRef}
                style={{ display: "none" }}
                onChange={handleFileChangetw}
              />
              {selectedFile && <p>Selected file: {selectedFile.name}</p>}
            </div>
            {(url || pageData?.url) && (
              <img src={url || pageData?.url} height={200} width={200} />
            )}
          </div>

          <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 mt-4">
            <div className="mt-4">
              <button
                className="create-next-svg"
                onClick={handleSubmit}
                style={{
                  border: "none",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  alignContent: "center",
                  padding: 2,
                  width: "200px",
                }}
              >
                <div>
                  <h5 style={{ color: "white", paddingTop: 4 }}>
                    Finish & Publish
                  </h5>
                </div>
              </button>
            </div>

            <div className="create-next-svg-div">
              <div
                style={{
                  cursor: "pointer",
                  border: "none",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  alignContent: "center",
                  padding: 2,
                  width: "150px",
                }}
                className="create-back-svg"
                onClick={() => {
                  setStep(1);
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="25"
                  fill="white"
                  className="bi bi-chevron-bar-left"
                  viewBox="0 0 16 16"
                >
                  <path
                    fillRule="evenodd"
                    d="M11.354 12.354a.5.5 0 0 1 0-.708L7.707 8l3.647-3.646a.5.5 0 0 1 .708.708L9.207 8l2.147 2.146a.5.5 0 0 1-.708.708z"
                  />
                  <path
                    fillRule="evenodd"
                    d="M4.146 8.354a.5.5 0 0 1 0 .708L7.793 12l-3.647-3.646a.5.5 0 1 1 .708-.708L8.207 12l-2.147-2.146a.5.5 0 0 1-.708-.708z"
                  />
                </svg>
                <h5 style={{ color: "white", paddingTop: 4 }}>Back</h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Grid>
  );
};

const MultiStepForm = () => {
  const [step, setStep] = useState(1);
  const [pageData, setPageData] = useState({});
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

  const handleNext = () => {
    setStep((p) => p + 1);
  };

  const handleBack = () => {
    setStep((p) => p - 1);
  };
  // console.log("step__", step);
  return (
    <div>
      {step === 1 && (
        <CreatePageOne
          setStep={setStep}
          pageData={pageData}
          setPageData={setPageData}
          userList={userList}
        />
      )}

      {step === 2 && (
        <CreatePageTwo
          setStep={setStep}
          pageData={pageData}
          setPageData={setPageData}
        />
      )}
    </div>
  );
};

export default MultiStepForm;
