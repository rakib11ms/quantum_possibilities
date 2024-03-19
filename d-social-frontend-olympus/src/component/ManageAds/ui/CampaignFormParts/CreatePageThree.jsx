import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { host } from '@/environment';
import { useRouter } from 'next/navigation';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Card, Grid, TextField } from '@mui/material';
import useToaster from '@/hooks/useToaster';
import { AutoCompleteWrapper } from '@/component/Reuseable';
import { campaignPlacementList } from '../../../../component/ManageAds/CampaignStepForm';
export default function CreatePageThree({ setStep, pageData, setPageData }) {
   const router = useRouter();
   const { showNotification } = useToaster();

   const handleFormSubmit = async (_values, { resetForm, setErrors, setStatus, setSubmitting }) => {
      try {
         setPageData((values) => ({ ...values, ..._values }));
         setStep(4);
      } catch (err) {
         console.error(err);
         showNotification('There was an error, try again later', 'error');
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
         <h4 className="ads-header-text">Select Format & Placements</h4>
         <p className="ads-create-inputs-div ui-block-container-card-text">
            Manually choose the places to show your ad. The more placements you select, the more
            opportunities you'll have to reach your target audience and achieve your business goals.
         </p>
         <Grid
            sx={{
               borderRadius: '13px',
            }}
         >
            <Formik
               enableReinitialize
               initialValues={{
                  ads_placement: pageData?.ads_placement || undefined,
               }}
               //   validationSchema={Yup.object().shape({
               //     campaign_name: Yup.string()
               //       .max(255)
               //       .required("campaign name field is required"),
               //     campaign_description: Yup.string()
               //       .max(255)
               //       .required("campaign description field is required"),
               //     campaign_privacy: Yup.string()
               //       .max(255)
               //       .required("campaign privacy field is required"),

               //     location: Yup.string()
               //       .max(255)
               //       .required("campaign location field is required"),
               //     zip_code: Yup.number().required("campaign zip code field is required"),
               //     invited_users: Yup.array().required(
               //       "campaign invited users field is required"
               //     ),
               //   })}
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
                           <div>
                              <div>
                                 <label className="ads-create-label-text ">Ads Placement</label>
                                 <AutoCompleteWrapper
                                    placeholder={'Ads Placement'}
                                    options={campaignPlacementList}
                                    style={{ marginBottom: '15px' }}
                                    value={campaignPlacementList?.find(
                                       (i) => i === values?.ads_placement,
                                    )}
                                    required={true} // should change to true
                                    disableClearable={true}
                                    handleChange={(e, v) => setFieldValue('ads_placement', v)}
                                 />
                                 <div
                                    style={{
                                       marginBottom: '15px',
                                    }}
                                 >
                                    {values?.campaign_category?.map((location, index) => (
                                       <span
                                          key={index}
                                          style={{
                                             border: '1px solid #000000',
                                             borderRadius: '20px',
                                             padding: '5px 10px',
                                             margin: ' 0px 5px',
                                          }}
                                       >
                                          {location}
                                          <span
                                             style={{
                                                cursor: 'pointer',
                                                marginLeft: '5px',
                                                padding: '5px',
                                             }}
                                             onClick={() => {
                                                const updatedLocations =
                                                   values?.campaign_category?.filter(
                                                      (loc) => loc !== location,
                                                   );
                                                setFieldValue(
                                                   'campaign_category',
                                                   updatedLocations,
                                                );
                                             }}
                                          >
                                             &#x2716;
                                          </span>
                                       </span>
                                    ))}
                                 </div>
                              </div>
                              <section>
                                 <p className="ads-title-bar">Left/Right Side Ads</p>
                                 <Grid
                                    sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', p: 4 }}
                                 >
                                    <div>
                                       <img src={'/ads_headline.jpg'} alt="" />
                                    </div>
                                    <div>
                                       <img src={'/ads_headline.jpg'} alt="" />
                                    </div>
                                 </Grid>
                              </section>
                              {/* <section>
                                 <p className="ads-title-bar">Newsfeed Ads</p>
                                 <div className="d-flex justify-content-center align-items-center mt-3">
                                    <div className="border border-1 m-1 p-2">
                                       <div className="d-flex justify-content-between align-items-center p-1">
                                          <div className="d-flex justify-content-center align-items-center">
                                             <span
                                                style={{
                                                   border: '1px solid sliver',
                                                   borderRadius: '50px',
                                                   backgroundColor: 'blue',
                                                   padding: '10px',
                                                }}
                                             >
                                                img
                                             </span>
                                             <div>
                                                <h6>Page_Name</h6>
                                                <span className="d-flex justify-content-center align-items-center">
                                                   <p>Sponsored</p>
                                                   <span className="p-1 border mx-1">i</span>
                                                </span>
                                             </div>
                                          </div>
                                          <h3>...</h3>
                                       </div>
                                       <div>
                                          <p>Insert text here.</p>
                                       </div>
                                       <div
                                          style={{
                                             color: 'blue',
                                          }}
                                       >
                                          <p>
                                             #tagOne #tagTwo #tagThree #tagOne
                                             <p>https://enter-url</p>
                                          </p>
                                       </div>
                                       <div className="border mt-2">
                                          <p
                                             style={{
                                                backgroundColor: 'lightblue',
                                                height: '75px',
                                                weight: '100%',
                                             }}
                                          ></p>
                                       </div>
                                       <div
                                          className="d-flex justify-content-between align-items-center p-2"
                                          style={{
                                             backgroundColor: '#9fa2a6',
                                          }}
                                       >
                                          <div>
                                             <p>WEBSITENAME.COM</p>
                                             <h6>Headline Copy Here</h6>
                                          </div>
                                          <p
                                             className="border p-2"
                                             style={{
                                                cursor: 'pointer',
                                                borderRadius: '10px',
                                             }}
                                          >
                                             Learn More
                                          </p>
                                       </div>
                                       <div className="d-flex justify-content-between align-items-center p-2">
                                          <p>Likes Ico. 541</p>
                                          <div>
                                             <span>26 Comments</span>
                                             <span className="mx-2">2 Shares</span>
                                          </div>
                                       </div>
                                       <hr
                                          style={{
                                             width: '95%',
                                             margin: '5px',
                                          }}
                                       />
                                       <div className="d-flex justify-content-between align-items-center p-2">
                                          <p>ico. Like</p>
                                          <p>ico. Comment</p>
                                          <p>ico. Share</p>
                                       </div>
                                    </div>
                                 </div>
                              </section> */}
                           </div>
                        </div>
                        <div>
                           <div className="row container">
                              <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 mt-4">
                                 <div className="mt-4">
                                    <button
                                       className="create-next-svg"
                                       type="submit"
                                       style={{
                                          border: 'none',
                                          display: 'flex',
                                          justifyContent: 'center',
                                          alignItems: 'center',
                                          alignContent: 'center',
                                          padding: 2,
                                          width: '200px',
                                       }}
                                    >
                                       <h5
                                          style={{
                                             color: 'white',
                                             paddingTop: 4,
                                          }}
                                       >
                                          Next
                                       </h5>
                                       <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          width="26"
                                          height="16"
                                          fill="white"
                                          class="bi bi-chevron-double-right"
                                          viewBox="0 0 16 16"
                                       >
                                          <path
                                             fill-rule="evenodd"
                                             d="M3.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L9.293 8 3.646 2.354a.5.5 0 0 1 0-.708"
                                          />
                                          <path
                                             fill-rule="evenodd"
                                             d="M7.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L13.293 8 7.646 2.354a.5.5 0 0 1 0-.708"
                                          />
                                       </svg>
                                    </button>
                                 </div>

                                 <div className="create-next-svg-div">
                                    <div
                                       style={{
                                          cursor: 'pointer',
                                          border: 'none',
                                          display: 'flex',
                                          justifyContent: 'center',
                                          alignItems: 'center',
                                          alignContent: 'center',
                                          padding: 2,
                                          width: '150px',
                                       }}
                                       className="create-back-svg"
                                       onClick={() => {
                                          setPageData((p) => ({ ...p, ...values }));
                                          setStep(2);
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
                                       <h5
                                          style={{
                                             color: 'white',
                                             paddingTop: 4,
                                          }}
                                       >
                                          Back
                                       </h5>
                                    </div>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </form>
                  );
               }}
            </Formik>
         </Grid>
      </Grid>
   );
}
