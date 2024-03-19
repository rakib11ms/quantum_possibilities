'use client';
import '../../style.css';
import { Field, Formik } from 'formik';
import * as Yup from 'yup';
import { Box, CircularProgress, Grid, Slider } from '@mui/material';
import useToaster from '@/hooks/useToaster';
import { AutoCompleteWrapper, Loader, TextFieldWrapper } from '@/component/Reuseable';
import { categories } from '@/component/ManageAds/CampaignStepForm';
import DatePicker from 'react-datepicker';
import { useEffect, useState } from 'react';

export default function CreatePageOne({ setStep, pageData, setPageData, pages }) {
   const { showNotification } = useToaster();

   const [selectedCat, setSelectedCat] = useState(null);
   const [selectedPage, setSelectedPage] = useState(null);
   useEffect(() => {
      if (pages?.length > 0 && pageData?.page_id && !selectedPage) {
         setSelectedPage(pages?.find((i) => i.id == pageData?.page_id));
      }
      if (categories?.length > 0 && pageData?.campaign_category && !selectedCat) {
         setSelectedCat(categories?.find((i) => i == pageData?.campaign_category));
      }
   }, [pages, categories, pageData]);
   const handleFormSubmit = async (_values, { resetForm, setErrors, setStatus, setSubmitting }) => {
      try {
         setPageData((values) => ({ ...values, ..._values }));
         console.log('pageData_2', pageData);

         setStep(2);
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
         <h4 className="ads-header-text">Campaign Details</h4>
         <Grid
            sx={{
               borderRadius: '13px',
            }}
         >
            {pages ? (
               <Formik
                  enableReinitialize
                  initialValues={{
                     campaign_name: pageData?.campaign_name || undefined,
                     campaign_category: pageData?.campaign_category || undefined,

                     page_name: pageData?.page_name || undefined,
                     page_id: pageData?.page_id || undefined,

                     start_date: pageData?.start_date ? new Date(pageData?.start_date) : null,
                     end_date: pageData?.end_date ? new Date(pageData?.end_date) : null,

                     total_budget: pageData?.total_budget || undefined,
                     daily_budget: pageData?.daily_budget || undefined,
                     gender: pageData?.gender || undefined,
                     age_group: pageData?.age_group || undefined,
                     from_age: pageData?.from_age || undefined,
                     to_age: pageData?.to_age || undefined,
                  }}
                  validationSchema={Yup.object().shape({
                     campaign_name: Yup.string()
                        .max(255)
                        .required("campaign name field is required"),
                     campaign_category: Yup.string()
                        .max(255)
                        .required("campaign description field is required"),
                     page_id: Yup.string()
                        .max(255)
                        .required("campaign privacy field is required"),
                     start_date: Yup.date().required("start date field is required"),
                     end_date: Yup.date().required("End date field is required"),


                     total_budget: Yup.number().required("Total budget field is required"),
                     daily_budget: Yup.number().required("Total budget filed field is required"),
                     // daily_budget: Yup.number().when(['total_budget','daily_budget'], {
                     //    is: (total_budget, daily_budget) => total_budget < daily_budget,
                     //    then: Yup.number().required('total_budget must be greater then daily_budget')
                     // }),
                     gender: Yup.string().max(255).required("Gender field is required"),
                     age_group: Yup.string().max(255).required("Age group field is required"),


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
                     console.log(errors);
                     return (
                        <form onSubmit={handleSubmit}>
                           <div className="ads-create-inputs-div">
                              <div>
                                 <div>
                                    <label className="ads-create-label-text ">Campaign Name</label>
                                    <TextFieldWrapper
                                       name="campaign_name"
                                       value={values?.campaign_name}
                                       touched={touched?.campaign_name}
                                       errors={errors?.campaign_name}
                                       handleChange={handleChange}
                                       handleBlur={handleChange}
                                    />
                                 </div>

                                 <div>
                                    <label className="ads-create-label-text ">
                                       Campaign Category
                                    </label>
                                    <AutoCompleteWrapper
                                       options={categories}
                                       value={selectedCat}
                                       required={true} // should change to true
                                       // disableClearable={true}
                                       handleChange={(e, v) => {
                                          setSelectedCat(v);
                                          setFieldValue('campaign_category', v);
                                       }}
                                    />
                                 </div>

                                 <div>
                                    <label className="ads-create-label-text ">Page Name</label>
                                    <AutoCompleteWrapper
                                       options={pages}
                                       value={selectedPage}
                                       required={true}
                                       handleChange={(e, v) => {
                                          setSelectedPage(v);
                                          setFieldValue('page_name', v?.label);
                                          setFieldValue('page_id', v?.id);
                                       }}
                                    />
                                 </div>
                              </div>
                           </div>
                           <div>
                              <h4 className="ads-header-text">Date & Time</h4>
                              <div className="ads-create-inputs-div-group">
                                 <div>
                                    <label className="ads-create-label-text ">Start Date</label>
                                    <div className="datepicker-input-div">
                                       <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          width="16"
                                          height="16"
                                          fill="gray"
                                          class="bi bi-calendar4"
                                          viewBox="0 0 16 16"
                                       >
                                          <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5M2 2a1 1 0 0 0-1 1v1h14V3a1 1 0 0 0-1-1zm13 3H1v9a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1z" />
                                       </svg>
                                       <DatePicker
                                          placeholderText="Start date"
                                          className="datepicker-input"
                                          selected={values?.start_date}
                                          minDate={new Date()}
                                          onChange={(date) => setFieldValue('start_date', date)}
                                          dateFormat="MMM dd, yyyy"

                                       />
                                    </div>
                                    {errors?.start_date && <span className='text-danger'>{errors?.start_date}</span>}
                                 </div>
                                 <div>
                                    <label className="ads-create-label-text ">End Date</label>
                                    <div className="datepicker-input-div">
                                       <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          width="16"
                                          height="16"
                                          fill="gray"
                                          class="bi bi-calendar4"
                                          viewBox="0 0 16 16"
                                       >
                                          <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5M2 2a1 1 0 0 0-1 1v1h14V3a1 1 0 0 0-1-1zm13 3H1v9a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1z" />
                                       </svg>

                                       <DatePicker
                                          placeholderText="End date"
                                          className="datepicker-input"
                                          selected={values?.end_date}
                                          onChange={(date) => setFieldValue('end_date', date)}
                                          selectsEnd
                                          startDate={values?.start_date}
                                          endDate={values?.end_date}
                                          minDate={values?.start_date} // Ensures that the end date cannot be before the start date
                                          dateFormat="MMM dd, yyyy"
                                       />
                                    </div>
                                    {errors?.end_date && <span className='text-danger'>{errors?.end_date}</span>}
                                 </div>
                              </div>
                           </div>
                           <div>
                              <h4 className="ads-header-text">Budget</h4>
                              <div className="ads-create-inputs-div-group">
                                 <div>
                                    <label className="ads-create-label-text ">Total Budget</label>
                                    <TextFieldWrapper
                                       name="total_budget"
                                       type="number"
                                       value={values?.total_budget}
                                       touched={touched?.total_budget}
                                       errors={errors?.total_budget}
                                       handleChange={handleChange}
                                       handleBlur={handleChange}
                                    />
                                 </div>
                                 <div>
                                    <label className="ads-create-label-text ">Daily Budget</label>
                                    <TextFieldWrapper
                                       name="daily_budget"
                                       value={values?.daily_budget}
                                       type="number"
                                       touched={touched?.daily_budget}
                                       errors={errors?.daily_budget}
                                       handleChange={handleChange}
                                       handleBlur={handleChange}
                                    />
                                 </div>
                              </div>
                           </div>
                           <div className="ml-4">
                              {values?.total_budget > 0 && values?.daily_budget > 0 && (
                                 <span style={{ color: 'blue' }}>
                                    Estimated Total {Number(values?.total_budget * 10).toFixed(1)}{' '}
                                    impression and {Number(values?.total_budget * 5).toFixed(1)}{' '}
                                    Clicks on current plan
                                 </span>
                              )}
                           </div>
                           <div>
                              <h4 className="ads-header-text">Target People</h4>
                              <div className="ads-create-inputs-div-group">
                                 <div>
                                    <label className="ads-create-label-text">Gender</label>
                                    <div className=' d-flex justify-content-between '>
                                       <button
                                          type="button"
                                          className={`ads-choose-button ${values?.gender === 'Any' ? 'active' : ''
                                             }`}
                                          onClick={() => setFieldValue('gender', 'Any')}
                                       >
                                          Any
                                       </button>
                                       <button
                                          type="button"
                                          className={`ads-choose-button ${values?.gender === 'Woman' ? 'active' : ''
                                             }`}
                                          onClick={() => setFieldValue('gender', 'Woman')}
                                       >
                                          Woman
                                       </button>
                                       <button
                                          type="button"
                                          className={`ads-choose-button ${values?.gender === 'Men' ? 'active' : ''
                                             }`}
                                          onClick={() => setFieldValue('gender', 'Men')}
                                       >
                                          Men
                                       </button>
                                    </div>
                                    {errors?.gender && <span className='text-danger pt-2'>{errors?.gender}</span>}
                                 </div>
                              </div>
                           </div>
                           <div>
                              <h4 className="ads-header-text">Age Group</h4>
                              <div className="row pl-4">
                                 <div className="col-lg-4">
                                    <label className="ads-create-label-text">
                                       <Field
                                          type="radio"
                                          name="age_group"
                                          value="allAges"
                                          checked={values?.age_group === 'allAges'}
                                          onChange={(e) => {
                                             const v = e.target.value
                                             console.log(v);
                                             setFieldValue('age_group', v)
                                             setFieldValue('from_age', undefined)
                                             setFieldValue('to_age', undefined)
                                          }}
                                       />
                                       <br />
                                       <span className='pt-4'>All Ages</span>
                                    </label>
                                 </div>
                                 <div>
                                    <label className="ads-create-label-text ">
                                       <Field
                                          type="radio"
                                          name="age_group"
                                          value="ageRange"
                                          checked={values?.age_group === 'ageRange'}
                                          onChange={(e) => {
                                             const v = e.target.value
                                             console.log(v);
                                             setFieldValue('age_group', v)
                                             setFieldValue('from_age', 20)
                                             setFieldValue('to_age', 40)
                                          }}
                                       />
                                       <br />
                                       <span>Age Range</span>
                                    </label>
                                 </div>
                                 {values?.age_group === 'ageRange' && (
                                    <div
                                       className="d-flex justify-content-center align-items-center"
                                       style={{ width: '50%' }}
                                    >
                                       {/* <TextFieldWrapper
                                          placeholder="From"
                                          type="number"
                                          name="from_age"
                                          value={values?.from_age}
                                          onChange={handleChange}
                                          style={{ margin: '0 10px' }}
                                       />
                                       <p>-</p>
                                       <TextFieldWrapper
                                          placeholder="To"
                                          type="number"
                                          name="to_age"
                                          value={values?.to_age}
                                          onChange={handleChange}
                                          style={{ margin: '0 10px' }}
                                       /> */}
                                       <Box sx={{ width: 300, pl: 4, }}>
                                          <Slider
                                             getAriaLabel={() => 'Age range'}
                                             orientation='horizontal'
                                             value={[values?.from_age, values?.to_age]}
                                             valueLabelDisplay="on"
                                             sx={{
                                                '& .MuiSlider-thumb': { color: "white", border: '1px solid #65B7B7' },
                                                '& .MuiSlider-track': {
                                                   color: "#307777"
                                                },
                                                '& .MuiSlider-rail': {
                                                   color: "#acc4e4"
                                                },

                                             }}
                                             onChange={(e, v) => {
                                                console.log(v);
                                                setFieldValue('from_age', v[0])
                                                setFieldValue('to_age', v[1])
                                             }}
                                          />
                                          {/* <Typography>
                                             Seeking : {seekingSec} seconds

                                          </Typography> */}
                                       </Box>
                                    </div>
                                 )}
                              </div>
                              {errors?.age_group && <span className='text-danger p-4 '>{errors?.age_group}</span>}
                            
                           </div>

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
                                    width: '150px',
                                 }}
                              >
                                 <div>
                                    <h5 style={{ color: 'white', paddingTop: 4 }}>Next</h5>
                                 </div>
                                 <div>
                                    <svg
                                       xmlns="http://www.w3.org/2000/svg"
                                       width="16"
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
                                 </div>
                              </button>
                           </div>
                        </form>
                     );
                  }}
               </Formik>
            ) : (
                  <Loader />
            )}
         </Grid>
      </Grid>
   );
}
