"use client";
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { host } from "@/environment";
import { useRouter } from "next/navigation";
import { Formik } from "formik";
import * as Yup from "yup";
import { Card, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, Grid, IconButton, InputAdornment, InputLabel, TextField } from "@mui/material";
import useToaster from "@/hooks/useToaster";
import { AutoCompleteWrapper, TextFieldWrapper } from "@/component/Reuseable";
import "../../style.css";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import moment from "moment";
import axiosInstance from "../../../../../utils/axios";
import CloseIcon from '@mui/icons-material/Close';

export default function CreatePageFive({ setStep, pageData, setPageData }) {
  const router = useRouter();
  const { showNotification } = useToaster();
  const [paymentModal, setPaymentModal] = useState(false)
  const [isSubmit, setIsSubmit] = useState(false)

  console.log("pageData__", pageData);
  const handleSaveCampaign = ({ status }) => {
    setIsSubmit(true)

    if (pageData?.campaign_id) {
      const formData = new FormData();

      for (const index in pageData) {
        if (index !== 'campaign_cover_pic' && pageData[index]) {
          if (index === "locations" || index === 'keywords' || index == 'image' || index == 'removable_file') {

            for (const j of pageData[index]) {
              if (typeof (j) !== 'object') {
                formData.append(`${index}[]`, j)
              }
              else {
                if (index == 'image') {
                  formData.append('campaign_cover_pic', j);
                }
                else {
                  formData.append(index, j);
                }
              }
            }

          }
          else {
            formData.append(index, pageData[index]);
          }
        }
      }
      if (status) {
        formData.append('status', status)
      }

      axiosInstance.patch(`/api/campaign/edit/${pageData?.campaign_id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
        .then(res => {
          if (res.data.status == 200) {
            showNotification(res.data.message, "success");
            setPageData({});
            router.push("/manage-ads");
          }
        })
        .catch(err => {
          console.log(err);
          showNotification("There was an error, try again later", "error")
        })
    }
    else {
      const formData = new FormData();

      for (const index in pageData) {
        if (pageData[index]) {
          if (index === "locations" || index === 'keywords' || index == 'image') {

            for (const j of pageData[index]) {
              if (typeof (j) !== 'object') {
                formData.append(`${index}[]`, j)
              }
              else {
                if (index == 'image') {
                  formData.append('campaign_cover_pic', j);
                }
                else {
                  formData.append(index, j);
                }
              }
            }

          }
          else {
            formData.append(index, pageData[index]);
          }
        }
      }
      if (status) {
        formData.append('status', status)
      }
      console.log("pageData__", pageData);
      axiosInstance.post("/api/campaign/save", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
        .then(res => {
          if (res.data.status == 200) {
            showNotification(res.data.message, "success");
            setPageData({});
            handleClose();
            router.push("/manage-ads");
          }
        })
        .catch(err => {
          console.log(err);
          showNotification("There was an error, try again later", "error")
        })
    }
  }

  const handleClose = () => {
    setPaymentModal(false)
  }
  const handlePayment = () => {

    handleSaveCampaign({ status: 'active' })

  }
  const handleFormSubmit = async (
    _values,
    { resetForm, setErrors, setStatus, setSubmitting }
  ) => {
    console.log("clik");
    if (pageData?.campaign_id) {
      handleSaveCampaign({ status: null })
    }
    else {
      setPaymentModal(true)
    }
  };

  // console.log("pageData__", pageData);
  return (
    <Grid
      sx={{
        borderRadius: "13px",
      }}
    >
      <Formik
        enableReinitialize
        initialValues={{
          test: 'test'
        }}
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
            <form onSubmit={handleSubmit}>
              <div className="create-Page-full-div">
                <div className="create-Page-div">
                  {
                    pageData?.campaign_id ?
                      <button className="lunch-btn" type='submit' disabled={isSubmit}>
                        Edit campaign
                      </button>
                      : <>
                        <div className="discard-btn" onClick={() => { setPageData({}); router.push("/manage-ads"); }}>Discard</div>
                        <button className="save-btn" type='button' disabled={isSubmit} style={{ cursor: 'pointer' }} onClick={() => handleSaveCampaign({ status: 'draft' })}>Save Draft</button>
                        <button className="lunch-btn" type='submit' disabled={isSubmit}>
                          Pay & Launch
                        </button>

                      </>
                  }

                </div>
              </div>
              <div className="col-6 col-md-6 col-lg-6 col-xl-6 pb-4">
                <div className="campaign-div">
                  <h4 className="campaign-details">Campaign Details</h4>
                </div>
              </div>
              <div className="container-fluid">
                <div className="row">
                  
                  {/* <div className="col-6 col-md-6 col-lg-6 col-xl-6">
                    <div className="create-edit-btn-div">
                      <div className="create-edit-btn">
                        <span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            class="bi bi-pen"
                            viewBox="0 0 16 16"
                          >
                            <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001m-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708z" />
                          </svg>
                        </span>
                        Edit
                      </div>
                    </div>
                  </div> */}

                  <div className="col-6 col-md-6 col-lg-6 col-xl-6">
                    <div className="campaign-name-div">
                      <p className="campaign-Name">Campaign Name</p>
                      <h6 className="campaign-Nameh6">
                        {pageData?.campaign_name}
                      </h6>
                    </div>
                  </div>
                  <div className="col-6 col-md-6 col-lg-6 col-xl-6">
                    <div className="campaign-name-div">
                      <p className="campaign-Name">Campaign Category</p>
                      <h6 className="campaign-Nameh6">{pageData?.campaign_category}</h6>
                    </div>
                  </div>
                  <div className="col-12 col-md-12 col-lg-12 col-xl-12">
                    <div className="budgt-div">
                      <h5 className="budget-tags">Budget</h5>
                      <div className="row">
                        <div className="col-5 col-md-5 col-lg-5 col-xl-5">
                          <p className="total-d-text">Total Budget</p>
                          <div className="total-amm-div">
                            <span className="doller-sign-span">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="currentColor"
                                class="bi bi-currency-dollar"
                                viewBox="0 0 16 16"
                              >
                                <path d="M4 10.781c.148 1.667 1.513 2.85 3.591 3.003V15h1.043v-1.216c2.27-.179 3.678-1.438 3.678-3.3 0-1.59-.947-2.51-2.956-3.028l-.722-.187V3.467c1.122.11 1.879.714 2.07 1.616h1.47c-.166-1.6-1.54-2.748-3.54-2.875V1H7.591v1.233c-1.939.23-3.27 1.472-3.27 3.156 0 1.454.966 2.483 2.661 2.917l.61.162v4.031c-1.149-.17-1.94-.8-2.131-1.718zm3.391-3.836c-1.043-.263-1.6-.825-1.6-1.616 0-.944.704-1.641 1.8-1.828v3.495l-.2-.05zm1.591 1.872c1.287.323 1.852.859 1.852 1.769 0 1.097-.826 1.828-2.2 1.939V8.73z" />
                              </svg>
                            </span>
                            <p> {pageData?.total_budget} </p>
                          </div>
                        </div>
                        <div className="col-7 col-md-7 col-lg-7 col-xl-7">
                          <p className="total-d-text">Daily Budget</p>
                          <div className="total-amm-div">
                            <span className="doller-sign-span">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="currentColor"
                                class="bi bi-currency-dollar"
                                viewBox="0 0 16 16"
                              >
                                <path d="M4 10.781c.148 1.667 1.513 2.85 3.591 3.003V15h1.043v-1.216c2.27-.179 3.678-1.438 3.678-3.3 0-1.59-.947-2.51-2.956-3.028l-.722-.187V3.467c1.122.11 1.879.714 2.07 1.616h1.47c-.166-1.6-1.54-2.748-3.54-2.875V1H7.591v1.233c-1.939.23-3.27 1.472-3.27 3.156 0 1.454.966 2.483 2.661 2.917l.61.162v4.031c-1.149-.17-1.94-.8-2.131-1.718zm3.391-3.836c-1.043-.263-1.6-.825-1.6-1.616 0-.944.704-1.641 1.8-1.828v3.495l-.2-.05zm1.591 1.872c1.287.323 1.852.859 1.852 1.769 0 1.097-.826 1.828-2.2 1.939V8.73z" />
                              </svg>
                            </span>
                            <p>{pageData?.daily_budget}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h5 className="budget-tags">Target People</h5>
                      <div className="row">
                        <div className="col-5 col-md-5 col-lg-5 col-xl-5">
                          <p className="total-d-text">Gender</p>
                          <div>
                            <span className="total-d-texts">{pageData?.gender}</span>
                          </div>
                        </div>
                        <div className="col-7 col-md-7 col-lg-7 col-xl-7">
                          <p className="total-d-text">Age Group</p>
                          <div>
                            <span className="total-d-texts">
                              {pageData?.age_group}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <hr />
                    <div>
                      {/* <div className="location-edit-div">
                        <h5 className="budget-tags">Locations</h5>
                        <button className="create-edit-btn">
                          <span>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              fill="currentColor"
                              class="bi bi-pen"
                              viewBox="0 0 16 16"
                            >
                              <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001m-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708z" />
                            </svg>
                          </span>
                          Edit
                        </button>
                      </div> */}

                      <div className="loc-div">
                        {
                          pageData?.locations?.map(i => <p className="loc-texts">{i}</p>)
                        }

                        {/* <p className="loc-texts">Dhanmondi Dhaka</p> */}
                      </div>

                      <div>
                        <h4 className="budget-tags">Ads Placement</h4>
                        <p className="loc-texts">{pageData?.ads_placement}</p>
                      </div>
                    </div>

                    <div>
                      <h5 className="budget-tags">Date & Time</h5>

                      <div className="row">
                        <div className="col-5 col-md-5 col-lg-5 col-xl-5">
                          <p className="total-d-text">Start Date</p>
                          <div>
                            <span className="total-d-texts">
                              {pageData?.start_date && moment(pageData?.start_date).format('LL')}
                            </span>
                          </div>
                        </div>
                        <div className="col-7 col-md-7 col-lg-7 col-xl-7">
                          <p className="total-d-text">End Date</p>
                          <div>
                            <span className="total-d-texts">
                              {pageData?.end_date && moment(pageData?.end_date).format('LL')}

                            </span>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h5 className="budget-tags">User Destination</h5>
                        {
                          pageData?.description && <p className="loc-texts">{pageData?.description}</p>
                        }
                      </div>

                      <div>
                        <h5 className="budget-tags">Call to Action</h5>
                        {pageData?.call_to_action && <p className="loc-texts">{pageData?.call_to_action}</p>}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4 d-flex justify-content-between align-items-center pl-2">
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
                    setPageData((p) => ({ ...p, ...values }));
                    setStep(4);
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="26"
                    height="16"
                    fill="white"
                    class="bi bi-chevron-bar-left"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M11.854 3.646a.5.5 0 0 1 0 .708L8.207 8l3.647 3.646a.5.5 0 0 1-.708.708l-4-4a.5.5 0 0 1 0-.708l4-4a.5.5 0 0 1 .708 0M4.5 1a.5.5 0 0 0-.5.5v13a.5.5 0 0 0 1 0v-13a.5.5 0 0 0-.5-.5"
                    />
                  </svg>
                  <h5 style={{ color: "white", paddingTop: 4 }}>Back</h5>
                </div>
              </div>
            </form>
          );
        }}
      </Formik>

      <Dialog
        fullWidth
        // maxWidth='md'
        maxWidth='xs'
        open={paymentModal}
        onClose={handleClose}

      >
        <DialogTitle>
          Payment
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: 'lightgray',
          }}
        >
          <CloseIcon />
        </IconButton>

        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Grid>
            {/* <Typography variant='h6' gutterBottom>How much would you like to Pay? </Typography> */}
            <InputLabel>How much would you like to Pay?</InputLabel>
            <TextFieldWrapper
              name="group_name"
              // value={values?.group_name}
              // touched={touched?.group_name}
              // errors={errors?.group_name}

              // sx={{ border: '1px solid red' }}
              value={pageData?.total_budget}
              InputProps={{
                readOnly: true,
                startAdornment: (
                  <InputAdornment position='start' >
                    <span>
                      <svg width="9" height="16" viewBox="0 0 9 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4.83327 7.08333C2.9416 6.59167 2.33327 6.08333 2.33327 5.29167C2.33327 4.38333 3.17493 3.75 4.58327 3.75C6.0666 3.75 6.6166 4.45833 6.6666 5.5H8.50827C8.44993 4.06667 7.57493 2.75 5.83327 2.325V0.5H3.33327V2.3C1.7166 2.65 0.416601 3.7 0.416601 5.30833C0.416601 7.23333 2.00827 8.19167 4.33327 8.75C6.4166 9.25 6.83327 9.98333 6.83327 10.7583C6.83327 11.3333 6.42493 12.25 4.58327 12.25C2.8666 12.25 2.1916 11.4833 2.09994 10.5H0.266602C0.366602 12.325 1.73327 13.35 3.33327 13.6917V15.5H5.83327V13.7083C7.45827 13.4 8.74994 12.4583 8.74994 10.75C8.74994 8.38333 6.72493 7.575 4.83327 7.08333Z" fill="#191D23" />
                      </svg>

                    </span>

                  </InputAdornment>
                ),
              }}
            />
          </Grid>

          <Grid>
            <InputLabel variant=''>From</InputLabel>
            <Grid display={'flex'} justifyContent={'space-between'}>
              <Box display={'flex'} alignItems={'center'} gap={2}>
                <img src="/qPlOgO.png" loading='lazy' height={'28px'} width={'30px'} />
                <Typography>QP Balance</Typography>
              </Box>
              <Typography>${pageData?.total_budget}</Typography>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <button style={{ width: '100%' }} className="group-demo-invite-btn py-4" onClick={handlePayment} >Pay QP ${pageData?.total_budget}</button>
        </DialogActions>
      </Dialog>
    </Grid>

  );
}
