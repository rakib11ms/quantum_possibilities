"use client";
import React, { useEffect, useState } from "react";
import { TextFieldWrapper, getFileUrl } from "@/component/Reuseable";
import { toast } from "react-toastify";
import { Card, Grid } from "@mui/material";
import Image from "next/image";
import styled from "styled-components";
import { Formik } from "formik";
import * as Yup from "yup";
import useToaster from "@/hooks/useToaster";
import axiosInstance from "../../../../../utils/axios";
import { AutoCompleteWrapper } from "@/component/Reuseable";
import timeFormat from "../../../../../utils/CommentTimeFormat";
import { useParams } from "next/navigation";
import { useGetPageInfoMutation } from "@/redux/features/Page/pageApiSlice";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
const labelStyle = {
  fontFamily: "Segoe UI",
  fontWeight: 600,
  fontSize: "16px",
  lineHeight: "21px",
};
const divContainerStyle = {
  display: "flex",
  flexDirection: "column",
  gap: 10,
};

const settingsTabs = [
  {
    title: "Page Basic Information",
    value: 1,
  },
  {
    title: "Page Privacy",
    value: 2,
  },
  {
    title: "Members",
    value: 3,
  },
  {
    title: "Admin & Moderator",
    value: 4,
  },
];

const page = () => {
  const [pageData, setPageData] = useState({});
  const [activeDiv, setActiveDiv] = useState(1);
  const [pageAdmins, setPageAdmins] = useState([]);
  const [pageFollowers, setPageFollowers] = useState([]);
  const { showNotification } = useToaster();
  const params = useParams();
  const [getPageInfo, { data, isloading, error, isError, isSuccess }] =
    useGetPageInfoMutation();
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const handleClose = () => {
    setOpenDeleteModal(false);
  };
  useEffect(() => {
    axiosInstance
      .post(`/api/get-page-details`, { page_user_name: params?.username })
      .then((res) => {
        setPageData(res.data?.pageDetails);
      });
  }, [params?.username]);

  useEffect(() => {
    getPageInfo({ page_user_name: params?.username });
  }, [pageData]);

  const fetchMembers = () => {
    axiosInstance
      .post(`/api/get-all-followers`, { page_id: data?.pageDetails?._id })
      .then((res) => {
        setPageFollowers(res?.data?.data);
      });
  };

  const fetchAdmins = () => {
    axiosInstance
      .post(`/api/get-page-admins`, { page_id: data?.pageDetails?._id })
      .then((res) => setPageAdmins(res?.data?.data))
      .catch((err) => console.log(err));
  };

  console.log("_pageData", pageData);
  const handleFormSubmit = async (
    _values,
    { resetForm, setErrors, setStatus, setSubmitting }
  ) => {
    try {
      console.log("clicked");
      axiosInstance.post(`/api/update-page-info`, _values).then((res) => {
        console.log(_values, "res.data");
        showNotification("Page updated successfully", "success");
        setStatus({ success: true });
        setSubmitting(false);
      });
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
        display: "grid",
        gridTemplateColumns: "1.1fr 3fr",
        height: "756px",
        backgroundColor: "white",
      }}
    >
      <Grid className="prof-side-bar-sec" style={{ height: "456px" }}>
        <div className="container-fluid">
          <ul style={{ display: "flex", flexDirection: "column", gap: 15 }}>
            {settingsTabs.map((tab) => (
              <li
                onClick={() => {
                  setActiveDiv(tab.value);
                  if (tab.value == 3) {
                    fetchMembers();
                  }
                  if (tab.value == 4) {
                    fetchAdmins();
                  }
                }}
                className={`prof-side-bar-li-sec`}
                style={{
                  padding: "6px 15px 6px 15px",
                  color: "#686868",
                  fontWeight: 600,
                  fontSize: "14px",
                  fontFamily: "Segoe UI",
                  backgroundColor:
                    activeDiv === tab.value ? "#E4E6EB" : "transparent",
                }}
              >
                <div>
                  <p>{tab.title}</p>
                </div>
              </li>
            ))}
            <li>
              <hr />
            </li>
            {/* <li
              className={`prof-side-bar-li-sec `}
              style={{ padding: "2px 15px 2px 15px" }}
              onClick={() => {
                axiosInstance
                  .post(`/api/delete-page`, { page_id: pageData?._id })
                  .then((res) => {
                    toast.success(res.data.message, {
                      position: "top-right",
                      style: {
                        background: "white",
                        color: "black",
                      },
                    });
                    window.location.href = "/newsfeed";
                  })
                  .catch((err) => console.log(err));
              }}
            >
              <div>
                <p
                  style={{
                    color: "#FF5555",
                  }}
                >
                  Delete Page
                </p>
              </div>
            </li> */}
            <li
              className={`prof-side-bar-li-sec `}
              style={{ padding: "2px 15px 2px 15px", cursor: "pointer" }}
              onClick={() => setOpenDeleteModal(true)}
            >
              <p style={{ color: "#FF5555" }}>Delete Page</p>
            </li>
          </ul>
        </div>
      </Grid>

      <Grid
        sx={{
          borderLeft: "1px solid #E3EDED",
          px: 2,
          pt: 2,
        }}
      >
        {activeDiv == 1 && (
          <Formik
            enableReinitialize
            initialValues={{
              _id: pageData ? pageData?._id : undefined,
              pageName: pageData ? pageData?.page_name : undefined,
              page_description: pageData ? pageData?.bio : undefined,
              privacy: pageData ? pageData?.privacy : "public",
              location: pageData ? pageData?.address : undefined,
              address: pageData ? pageData?.address : undefined,
              phone_number: pageData ? pageData?.phone_number : undefined,
              email: pageData ? pageData?.email : undefined,
              website: pageData ? pageData?.website : undefined,
              zip_code: pageData ? pageData?.zip_code : undefined,
              page_rule: pageData ? pageData?.page_rule : undefined,
              page_message: pageData ? pageData?.page_message : undefined,
              page_reaction: pageData ? pageData?.page_reaction : undefined,
              invite_friends: pageData ? pageData?.invite_friends : [],
            }}
            // validationSchema={Yup.object().shape({
            //     pageName: Yup.string().max(255).required("Group name field is required"),
            //     page_description: Yup.string().max(255).required("Group description field is required"),
            //     privacy: Yup.string().max(255).required("Group privacy field is required"),

            //     location: Yup.string().max(255).required("Group location field is required"),
            //     zip_code: Yup.number().required("Group zip code field is required"),
            //     invite_friends: Yup.array().required("Group invited users field is required"),
            // })}
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
              // {
              //   console.log("__valuesOnSetting", values);
              //   console.log("__errorsOnSetting", { errors });
              // }
              return (
                <form onSubmit={handleSubmit} style={divContainerStyle}>
                  <div>
                    <label style={labelStyle}> Page Name</label>
                    <TextFieldWrapper
                      name="pageName"
                      value={values?.pageName}
                      touched={touched?.pageName}
                      errors={errors?.pageName}
                      handleChange={handleChange}
                      handleBlur={handleChange}
                      sx={{
                        [`& fieldset`]: {
                          borderRadius: "8px",
                        },
                      }}
                    />
                  </div>

                  <div>
                    <label style={labelStyle}>Page Description</label>
                    <TextFieldWrapper
                      name="page_description"
                      value={values?.page_description}
                      touched={touched?.page_description}
                      errors={errors?.page_description}
                      handleChange={handleChange}
                      handleBlur={handleChange}
                      minRows={4}
                      maxRows={5}
                      multiline
                      sx={{
                        [`& fieldset`]: {
                          borderRadius: "8px",
                        },
                      }}
                    />
                  </div>

                  <div>
                    <label style={labelStyle}> Location</label>
                    <TextFieldWrapper
                      name="location"
                      value={values?.location}
                      touched={touched?.location}
                      errors={errors?.location}
                      handleChange={handleChange}
                      handleBlur={handleChange}
                      sx={{
                        [`& fieldset`]: {
                          borderRadius: "8px",
                        },
                      }}
                    />
                  </div>
                  <div>
                    <label style={labelStyle}> Phone Number</label>
                    <TextFieldWrapper
                      name="phone_number"
                      value={values?.phone_number}
                      touched={touched?.phone_number}
                      errors={errors?.phone_number}
                      handleChange={handleChange}
                      handleBlur={handleChange}
                      sx={{
                        [`& fieldset`]: {
                          borderRadius: "8px",
                        },
                      }}
                    />
                  </div>
                  <div>
                    <label style={labelStyle}> Email</label>
                    <TextFieldWrapper
                      name="email"
                      value={values?.email}
                      touched={touched?.email}
                      errors={errors?.email}
                      handleChange={handleChange}
                      handleBlur={handleChange}
                      sx={{
                        [`& fieldset`]: {
                          borderRadius: "8px",
                        },
                      }}
                    />
                  </div>
                  <div>
                    <label style={labelStyle}> Page Custom Link</label>
                    <TextFieldWrapper
                      name="website"
                      value={values?.website}
                      touched={touched?.website}
                      errors={errors?.website}
                      handleChange={handleChange}
                      handleBlur={handleChange}
                      sx={{
                        [`& fieldset`]: {
                          borderRadius: "8px",
                        },
                      }}
                    />
                  </div>

                  <div className="mt-4">
                    <button
                      className="create-next-svg group-demo-invite-btn py-3"
                      type="submit"
                    >
                      Save Changes
                    </button>
                  </div>
                </form>
              );
            }}
          </Formik>
        )}
        {activeDiv == 3 && (
          <div>
            <label style={labelStyle}> Page Members</label>
            {pageFollowers?.map(
              (member, index) => (
                console.log("__member", member),
                (
                  <div className="all-people-div" key={index}>
                    <div className="people-img-div">
                      <img
                        className="people-img"
                        src={getFileUrl(
                          "/uploads/" + member?.user_id?.profile_pic
                        )}
                        alt=""
                      />
                      <div>
                        <h6>
                          {member?.user_id?.first_name}{" "}
                          {member?.user_id?.last_name}
                        </h6>
                        <p>
                          Joined about {timeFormat(member?.user_id?.createdAt)}{" "}
                          ago
                        </p>
                      </div>
                    </div>

                    <div
                      style={{ display: "flex", padding: "0 1em 0", gap: 3 }}
                    >
                      <div className="more">
                        <svg
                          width="3"
                          height="14"
                          viewBox="0 0 3 14"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <circle cx="1.5" cy="12" r="1.5" fill="#242634" />
                          <circle cx="1.5" cy="7" r="1.5" fill="#242634" />
                          <circle cx="1.5" cy="2" r="1.5" fill="#242634" />
                        </svg>

                        <ul className="more-dropdown">
                          <li>
                            <p
                              type="button"
                              onClick={() => {
                                axiosInstance
                                  .post(`/api/make-page-admin`, {
                                    user_id: member?.user_id?._id,
                                    page_id: member?.page_id?._id,
                                    user_role: "moderator",
                                  })
                                  .then((res) => {
                                    toast.success(res.data.message, {
                                      position: "top-right",
                                      style: {
                                        background: "white",
                                        color: "black",
                                      },
                                    });
                                    fetchMembers();
                                  })
                                  .catch((err) => console.log(err));
                              }}
                            >
                              Make moderator
                            </p>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                )
              )
            )}
          </div>
        )}
        {activeDiv == 2 && (
          <Formik
            initialValues={{
              _id: pageData ? pageData?._id : undefined,
              pageName: pageData ? pageData?.page_name : undefined,
              page_description: pageData ? pageData?.bio : undefined,
              privacy: pageData ? pageData?.privacy : "public",
              location: pageData ? pageData?.address : undefined,
              address: pageData ? pageData?.address : undefined,
              phone_number: pageData ? pageData?.phone_number : undefined,
              email: pageData ? pageData?.email : undefined,
              website: pageData ? pageData?.website : undefined,
              zip_code: pageData ? pageData?.zip_code : undefined,
              page_rule: pageData ? pageData?.page_rule : undefined,
              page_message: pageData ? pageData?.page_message : undefined,
              page_reaction: pageData ? pageData?.page_reaction : undefined,
              invite_friends: pageData ? pageData?.invite_friends : [],
            }}
            // validationSchema={Yup.object().shape({
            //     pageName: Yup.string().max(255).required("Group name field is required"),
            //     page_description: Yup.string().max(255).required("Group description field is required"),
            //     privacy: Yup.string().max(255).required("Group privacy field is required"),

            //     location: Yup.string().max(255).required("Group location field is required"),
            //     zip_code: Yup.number().required("Group zip code field is required"),
            //     invite_friends: Yup.array().required("Group invited users field is required"),
            // })}
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
              return (
                <form onSubmit={handleSubmit} style={divContainerStyle}>
                  <div>
                    <label style={labelStyle}>
                      {" "}
                      Who can post on your Page?
                    </label>
                    <AutoCompleteWrapper
                      // name="page_rule"
                      options={["Admin", "Moderator", "Everyone"]}
                      value={values?.page_rule || []}
                      required={true}
                      disableClearable={true}
                      handleChange={(e, v) => setFieldValue("page_rule", v)}
                      sx={{
                        [`& fieldset`]: {
                          borderRadius: "8px",
                        },
                      }}
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>
                      Allow people to message your Page?
                    </label>
                    <AutoCompleteWrapper
                      // name="page_message"
                      options={["On", "Off"]}
                      value={values?.page_message || []}
                      required={true}
                      disableClearable={true}
                      handleChange={(e, v) => setFieldValue("page_message", v)}
                      sx={{
                        [`& fieldset`]: {
                          borderRadius: "8px",
                        },
                      }}
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>Hide number of reactions</label>
                    <AutoCompleteWrapper
                      // name="page_reaction"
                      options={["Yes", "No"]}
                      value={values?.page_reaction}
                      required={true}
                      disableClearable={true}
                      handleChange={(e, v) => setFieldValue("page_reaction", v)}
                      sx={{
                        [`& fieldset`]: {
                          borderRadius: "8px",
                        },
                      }}
                    />
                  </div>

                  <div className="mt-4">
                    <button
                      className="create-next-svg group-demo-invite-btn py-3"
                      type="submit"
                    >
                      Save Changes
                    </button>
                  </div>
                </form>
              );
            }}
          </Formik>
        )}
        {activeDiv == 4 && (
          <>
            <div>
              <label style={labelStyle}> Page Admin</label>
              {pageAdmins && pageAdmins.length > 0 ? (
                pageAdmins?.map((member, index) => (
                  // console.log("_member0", member?.user_id),
                  <div className="all-people-div" key={index}>
                    <div className="people-img-div">
                      <img
                        className="people-img"
                        src={getFileUrl(
                          "/uploads/" + member?.user_id?.profile_pic
                        )}
                        alt=""
                      />
                      <div>
                        <h6>
                          {member?.user_id?.first_name}{" "}
                          {member?.user_id?.last_name}
                        </h6>
                        <p>
                          Joined about {timeFormat(member?.user_id?.createdAt)}{" "}
                          ago
                        </p>
                      </div>
                    </div>

                    <div
                      style={{
                        display: "flex",
                        padding: "0 1em 0",
                        gap: 3,
                      }}
                    >
                      <div className="more">
                        <svg
                          width="3"
                          height="14"
                          viewBox="0 0 3 14"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <circle cx="1.5" cy="12" r="1.5" fill="#242634" />
                          <circle cx="1.5" cy="7" r="1.5" fill="#242634" />
                          <circle cx="1.5" cy="2" r="1.5" fill="#242634" />
                        </svg>

                        <ul className="more-dropdown">
                          <li>
                            <p
                              type="button"
                              onClick={() => {
                                member?.user_id?._id;
                                axiosInstance
                                  .post(`/api/remove-page-admin`, {
                                    _id: member?._id,
                                  })
                                  .then((res) => {
                                    toast.success(res.data.message, {
                                      position: "top-right",
                                      style: {
                                        background: "white",
                                        color: "black",
                                      },
                                    });
                                    fetchMembers();
                                  })
                                  .catch((err) => console.log(err));
                              }}
                            >
                              Remove
                            </p>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div
                  style={{
                    border: "1px solid #E3EDED",
                    textAlign: "center",
                    fontSize: "16px",
                    padding: "20px",
                  }}
                >
                  <p>No Admin Found!</p>
                </div>
              )}
            </div>
            <br />
            <div>
              <label style={labelStyle}> Page Moderator</label>
              {pageAdmins && pageAdmins.length > 0 ? (
                pageFollowers?.map((member, index) => (
                  <div className="all-people-div" key={index}>
                    <div className="people-img-div">
                      <img
                        className="people-img"
                        src={getFileUrl(
                          "/uploads/" + member?.user_id?.profile_pic
                        )}
                        alt=""
                      />
                      <div>
                        <h6>
                          {member?.user_id?.first_name}{" "}
                          {member?.user_id?.last_name}
                        </h6>
                        <p>
                          Joined about {timeFormat(member?.user_id?.createdAt)}{" "}
                          ago
                        </p>
                      </div>
                    </div>

                    <div
                      style={{ display: "flex", padding: "0 1em 0", gap: 3 }}
                    >
                      <div className="more">
                        <svg
                          width="3"
                          height="14"
                          viewBox="0 0 3 14"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <circle cx="1.5" cy="12" r="1.5" fill="#242634" />
                          <circle cx="1.5" cy="7" r="1.5" fill="#242634" />
                          <circle cx="1.5" cy="2" r="1.5" fill="#242634" />
                        </svg>

                        <ul className="more-dropdown">
                          <li>
                            <p
                              type="button"
                              onClick={() => {
                                member?.user_id?._id;
                                axiosInstance
                                  .post(`/api/remove-page-admin`, {
                                    _id: member?._id,
                                  })
                                  .then((res) => {
                                    toast.success(res.data.message, {
                                      position: "top-right",
                                      style: {
                                        background: "white",
                                        color: "black",
                                      },
                                    });
                                    fetchMember();
                                  })
                                  .catch((err) => console.log(err));
                              }}
                            >
                              Remove
                            </p>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div
                  style={{
                    border: "1px solid #E3EDED",
                    textAlign: "center",
                    fontSize: "16px",
                    padding: "20px",
                  }}
                >
                  <p>No Moderators Found!</p>
                </div>
              )}
            </div>
          </>
        )}
      </Grid>
      {/* delete modal */}
      <Dialog
        open={openDeleteModal}
        onClose={handleClose}
        // fullWidth
        maxWidth="md"
      >
        <DialogTitle>Do you want to delete this Page?</DialogTitle>

        <DialogActions>
          <Button
            size="small"
            variant="contained"
            onClick={() => handleClose()}
          >
            Cancel
          </Button>
          <Button
            size="small"
            variant="contained"
            color="error"
            onClick={() => {
              axiosInstance
                .post(`/api/delete-page`, { page_id: pageData?._id })
                .then((res) => {
                  showNotification(res.data?.message);
                  handleClose();
                })
                .catch((err) =>
                  showNotification("Page deletion failed !!", "error")
                );
            }}
            autoFocus
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
};
export default page;
