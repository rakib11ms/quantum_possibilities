"use client";
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { host } from "@/environment";
import { useRouter } from "next/navigation";
import { Field, Formik } from "formik";
import * as Yup from "yup";
import { Autocomplete, Card, Grid, TextField, createFilterOptions } from "@mui/material";
import useToaster from "@/hooks/useToaster";
import { AutoCompleteWrapper, DebounceInput, TextFieldWrapper } from "@/component/Reuseable";
import "../../style.css";
import { keywords, call_to_action_options } from "@/component/ManageAds/CampaignStepForm";
import { MuiTelInput } from "mui-tel-input";
const filter = createFilterOptions();
export default function CreatePageTwo({ setStep, pageData, setPageData }) {
  const router = useRouter();
  const { showNotification } = useToaster();

  const [locations, setLocations] = useState([])



  const handleFormSubmit = async (
    _values,
    { resetForm, setErrors, setStatus, setSubmitting }
  ) => {
    try {
      setPageData((values) => ({ ...values, ..._values }));
      console.log("pageData_test", _values);
      setStep(3);
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
      <h4 className="ads-header-text">Location</h4>
      <Grid
        sx={{
          borderRadius: "13px",
        }}
      >
        <Formik
          enableReinitialize
          initialValues={{
            locations: pageData?.locations || [],
            call_to_action: pageData?.call_to_action || undefined,
            phone_number: pageData?.phone_number || undefined,
            website_url: pageData?.website_url || "",
            keywords: pageData?.keywords || [],
          }}
          // validationSchema={Yup.object().shape({
          //   locations: Yup.string()
          //     .max(255)
          //     .required("locations field is required"),
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
              <form onSubmit={handleSubmit}>
                <div className="ads-create-inputs-div">
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    <div>
                      <label className="ads-create-label-text ">
                        Search For Location
                      </label>
                      <AutoCompleteWrapper
                        placeholder={"Enter the location to target audience"}
                        options={locations}
                        style={{ marginBottom: "15px" }}
                        value={values?.locations}
                        multiple={true}
                        required={true}
                        renderInput={(rnParams) => (
                          <DebounceInput
                            {...rnParams}
                            required={values?.locations?.length > 0 ? false : true}
                            handleDebounce={(v) => {
                              console.log(v);
                              // if (v?.length > 2) {
                              axios.get(`https://api.opencagedata.com/geocode/v1/json?q=${v}&key=0c145a6ebab94951a62338531c345f3d`)
                                .then(res => setLocations(res?.data?.results?.map(i => i?.formatted)))
                                .catch(err => console.log(err))
                              // }
                            }}
                            debounceTimeout={1500}
                          />
                        )}
                        handleChange={(e, v) => {
                          setFieldValue("locations", v)
                        }}
                      />
                      {/* <div
                        style={{
                          marginBottom: "15px",
                        }}
                      >
                        {values?.locations?.map((i, index) => (
                          <span
                            key={index}
                            style={{
                              border: "1px solid #000000",
                              borderRadius: "20px",
                              padding: "5px 10px",
                              margin: " 0px 5px",
                            }}
                          >
                            {i}
                            <span
                              style={{
                                cursor: "pointer",
                                marginLeft: "5px",
                                padding: "5px",
                              }}
                              onClick={() => {
                                const updatedLocations =
                                  values?.locations?.filter((loc) => loc !== i);
                                setFieldValue("locations", updatedLocations);
                              }}
                            >
                              &#x2716;
                            </span>
                          </span>
                        ))}
                      </div> */}
                    </div>
                    {/* <div>
                      <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3652.256540459697!2d90.37540857409994!3d23.738229489245867!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b93acb46113d%3A0xd6e9844905f40dd!2sPakiza%20Technovation%20Limited!5e0!3m2!1sen!2sbd!4v1707722081766!5m2!1sen!2sbd"
                        style={{
                          border: "1px solid silver",
                          borderRadius: "10px",
                          width: "100%",
                          height: "312px",
                          margin: "15px 0",
                        }}
                        allowfullscreen=""
                        loading="lazy"
                        referrerpolicy="no-referrer-when-downgrade"
                      ></iframe>
                    </div> */}
                    <div>
                      <label className="ads-create-label-text ">
                        Call to action button
                      </label>
                      <AutoCompleteWrapper
                        placeholder={"Select Call to action button"}
                        options={call_to_action_options}
                        style={{ marginBottom: "15px" }}
                        value={call_to_action_options?.find((i) => i === values?.call_to_action)}
                        required={false} // should change to true
                        handleChange={(e, v) =>
                          setFieldValue("call_to_action", v)
                        }
                      />
                    </div>
                    {
                       values?.call_to_action == "Call us"
                        ?
                        <MuiTelInput
                          value={values?.phone_number}
                          onChange={(e) => setFieldValue('phone_number', e)}
                          size='small'
                          required={values?.call_to_action ? true : false}
                          sx={{
                            [`& fieldset`]: {
                              borderRadius: 0.6,
                            },
                            width: '100%',
                          }}
                        />
                        :
                        <div>
                          <label className="ads-create-label-text ">
                            Website URL
                          </label>
                          <TextFieldWrapper
                            placeholder="Website URL"
                            type='url'
                            name="website_url"
                            required={values?.call_to_action ? true : false}
                            value={values?.website_url}
                            onChange={handleChange}
                            style={{ marginBottom: "10px" }}
                          />
                        </div>
                    }


                    <div>
                      <label className="ads-create-label-text ">Keywords</label>
                      <AutoCompleteWrapper
                        style={{ marginBottom: "15px" }}
                        placeholder={"Enter target keywords"}
                        options={keywords}
                        value={values?.keywords}
                        required={values?.keywords?.length > 0 ? false : true}
                        disableClearable={true}
                        multiple={true}
                        filterOptions={(options, params) => {
                          const filtered = filter(options, params);
                          if (params.inputValue !== '') {
                            filtered.push(params.inputValue);
                          }
                          return filtered;
                        }}
                        handleChange={(e, v) => setFieldValue("keywords", v)}
                      />
                      {/* <div
                        style={{
                          marginBottom: "15px",
                        }}
                      >
                        {values?.keywords?.map((keyword, index) => (
                          <span
                            key={index}
                            style={{
                              border: "1px solid #000000",
                              borderRadius: "20px",
                              padding: "5px 10px",
                              margin: " 0px 5px",
                            }}
                          >
                            {keyword}
                            <span
                              style={{
                                cursor: "pointer",
                                marginLeft: "5px",
                                padding: "5px",
                              }}
                              onClick={() => {
                                const updatedKeywords =
                                  values?.keywords?.filter(
                                    (key) => key !== keyword
                                  );
                                setFieldValue("keywords", updatedKeywords);
                              }}
                            >
                              &#x2716;
                            </span>
                          </span>
                        ))}
                      </div> */}
                    </div>
                  </div>
                </div>

                <div className="mt-4 d-flex justify-content-between align-items-center">
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
                      setStep(1);
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
}
