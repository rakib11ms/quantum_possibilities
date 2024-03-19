'use client';
import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { host } from '@/environment';
import { useRouter } from 'next/navigation';
import { Field, Formik } from 'formik';
import * as Yup from 'yup';
import { Card, Grid, TextField } from '@mui/material';
import useToaster from '@/hooks/useToaster';
import { AutoCompleteWrapper, TextFieldWrapper } from '@/component/Reuseable';
import '../../style.css';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import ReactPlayer from 'react-player';
import { isImage, isVideo } from '@/utils/utlity';

export default function CreatePageFour({ setStep, pageData, setPageData }) {
  const router = useRouter();
  const { showNotification } = useToaster();
  const [image, setImage] = useState([]);
  const [prevImages, setPrevImages] = useState([]);
  const [removable_file, setRemovable_file] = useState([]);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    // const temp = pageData?.campaign_cover_pic || pageData?.removeableImage

    if (pageData?.image) {
      setImage(pageData?.image)
    }
    if (pageData?.prevImages) {
      setPrevImages(pageData?.prevImages)
    }
    if (pageData?.removable_file) {
      setRemovable_file(pageData?.removable_file)
    }

  }, [pageData])


  const fileInputRef = useRef(null);

  const handleFormSubmit = async (_values, { resetForm, setErrors, setStatus, setSubmitting }) => {
    try {
      if (prevImages?.length > 0 || image?.length > 0) {
        setPageData((values) => ({ ...values, ..._values, image: image, prevImages: prevImages, removable_file: removable_file }));
        setStep(5);
      }
    } catch (err) {
      console.error(err);
      showNotification('There was an error, try again later', 'error');
      setStatus({ success: false });
      setErrors({ submit: err.message });
      setSubmitting(false);
    }
  };
  const handleFileChangetw = (e) => {

    console.log("e.target?.files___", e.target?.files, e.target?.file);
    const uploadedFiles = e.target.files;
    const newFilesArray = [];
    const fileLength = uploadedFiles.length;

    let isAllFileImg = true

    for (const i in uploadedFiles) {
      console.log("uploadedFiles[i]__", uploadedFiles[i]);
      if (typeof (uploadedFiles[i]) == 'object' && !uploadedFiles[i].type.startsWith("image/")) {
        isAllFileImg = false;
        break;
      }
    }

    if (image?.length > 0 && !isAllFileImg) {

      for (const i in uploadedFiles) {
       
        if (typeof (uploadedFiles[i]) == 'object' && uploadedFiles[i].type.startsWith("video/")) {
  
          setImage([uploadedFiles[i]])
          return;
        }
      }
    }

    for (let i = 0; i < fileLength; i++) {
      const file = uploadedFiles[i];
      if (isAllFileImg) {
        newFilesArray.push(file);
      } else if (file.type.startsWith("video/")) {
        newFilesArray.push(file);
        break;
      }
      else break;
    }

    setImage(p => {

      if (p[0] && p[0].type.startsWith("video/")) return newFilesArray
      else if (newFilesArray.length) return [...p, ...newFilesArray]
      return p
    });


  };
  const handleUploadClicktw = () => {
    fileInputRef.current.click();
  };
  // const isImage = () => {
  //   if (pageData?.campaign_cover_pic) {
  //     return allowedVideoExtensions.includes(
  //       typeof pageData?.campaign_cover_pic == 'object'
  //         ? pageData?.campaign_cover_pic?.type
  //         : pageData?.campaign_cover_pic?.split('.')[1],
  //     );
  //   } else if (pageData?.url) {
  //     return allowedVideoExtensions.includes(pageData?.url?.split('.')[1]);
  //   }
  // };
  return (
    <Grid
      sx={{
        p: 1,
      }}
    >
      <h4 className="ads-header-text">Upload Assets</h4>
      <p className="ads-create-inputs-div ui-block-container-card-text">
        Upload ads Content and preview your ads in this section
      </p>
      <Grid
        sx={{
          borderRadius: '13px',
        }}
      >
        <Formik
          enableReinitialize
          initialValues={{
            headline: pageData?.headline || undefined,
            description: pageData?.description || undefined,
          }}
          validationSchema={Yup.object().shape({
            headline: Yup.string()
              .max(255)
              .required("Headline field is required"),
            description: Yup.string()
              .max(255)
              .required("Description field is required"),

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
            return (
              <form onSubmit={handleSubmit}>
                <div className="ads-create-inputs-div">
                  <div className="row">
                    <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                      <div className="ads-sponserd-full-div p-0">
                        <div className="one-upload">1</div>
                        <h4 className="ads-header-text">Upload Image</h4>
                      </div>
                    </div>

                  </div>
                </div>

                <div className='ads-create-inputs-div' style={{
                  // display: 'flex',
                  //  justifyContent:'end',
                  border: '1px dotted gray',
                  borderRadius: '10px',

                }}>
                  <div className='px-2 pb-2' style={{
                    display: 'flex',
                    justifyContent: 'end',
                    width: '100%',

                  }}>
                    <button
                      type="button"
                      className="add-man-up-btn"
                      onClick={() => handleUploadClicktw()}
                    >
                      <span className="add-man-upspan">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          class="bi bi-upload"
                          viewBox="0 0 16 16"
                        >
                          <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5" />
                          <path d="M7.646 1.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 2.707V11.5a.5.5 0 0 1-1 0V2.707L5.354 4.854a.5.5 0 1 1-.708-.708z" />
                        </svg>
                      </span>{" "}
                      Upload File
                    </button>
                  </div>


                  <Grid sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: 1, pl: 1, pb: 1, }}>

                    {
                      prevImages?.map((file, index) => (
                        <div key={index} style={{
                          // border: '1px solid blue',
                          position: 'relative'
                        }}>
                          <span style={{ position: 'absolute', top: 4, right: 4, cursor: 'pointer', zIndex: 1 }} onClick={() => {
                            setPrevImages(p => p.filter((i) => i !== file))
                            const new_removable_file = pageData?.campaign_cover_pic?.find(i => i == file)
                            // console.log(postData?.media?.map(j => j?._id),"removable_file_ids__",removable_file_ids);
                            setRemovable_file((values) => [...values, new_removable_file]);

                          }}>
                            <svg width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <circle cx="19" cy="19" r="14.25" fill="#7E869E" fill-opacity="0.25" />
                              <path d="M25.3337 12.6667L12.667 25.3334" stroke="#222222" stroke-width="1.2" stroke-linecap="square" stroke-linejoin="round" />
                              <path d="M12.6663 12.6667L25.333 25.3334" stroke="#222222" stroke-width="1.2" stroke-linecap="square" stroke-linejoin="round" />
                            </svg>
                          </span>

                          {isImage(file) && (
                            <img

                              className='card-img-head'
                              style={{ height: '103px' }}
                              src={`${host}/uploads/adsStorage/${file}`}
                              alt="upload-image"
                            />
                          )
                          }


                          {isVideo(file) && (
                            // <video width="200" height="200" controls>
                            <video
                              className='card-img-head'
                              style={{ height: '103px' }}
                              controls
                            >
                              <source src={`${host}/uploads/adsStorage/${file}`} />
                              Your browser does not support the video tag.
                            </video>
                          )}
                        </div>
                      ))
                    }

                    {image?.map((file, index) => (
                      <div key={index} style={{
                        // border: '1px solid blue',
                        position: 'relative',
                        objectFit: 'cover'
                      }}>
                        <span style={{ position: 'absolute', top: 4, right: 4, cursor: 'pointer', zIndex: 1 }} onClick={() => {
                          setImage(p => p.filter((i) => i !== file))
                        }}>
                          <svg width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="19" cy="19" r="14.25" fill="#7E869E" fill-opacity="0.25" />
                            <path d="M25.3337 12.6667L12.667 25.3334" stroke="#222222" stroke-width="1.2" stroke-linecap="square" stroke-linejoin="round" />
                            <path d="M12.6663 12.6667L25.333 25.3334" stroke="#222222" stroke-width="1.2" stroke-linecap="square" stroke-linejoin="round" />
                          </svg>
                        </span>

                        {file.type.startsWith("image/") ? (
                          <img
                            // style={{
                            //   width: "449px",
                            //   height: "auto",
                            //   cursor: 'pointer'
                            // }}
                            className='card-img-head'
                            style={{ height: '103px' }}
                            src={URL.createObjectURL(file)}
                            alt="upload-image"
                          />
                        ) : file.type.startsWith("video/") ? (
                          // <video width="200" height="200" controls>
                          <video
                            className='card-img-head'
                            style={{ height: '103px' }}
                            controls
                          >
                            <source src={URL.createObjectURL(file)} type={file.type} />
                            Your browser does not support the video tag.
                          </video>
                        ) : null}
                      </div>
                    ))}
                  </Grid>

                  <input ref={fileInputRef} accept="image/png, image/gif, image/jpeg,image/*,video/mp4,video/x-m4v,video/*" multiple={pageData?.ads_placement == "Newsfeed Ads" ? true : false} type="file" onChange={handleFileChangetw} />
                </div>
                {prevImages?.length < 1 && image?.length < 1 && <span className='text-danger pl-4'>Image or video is required</span>}
                {/* <span className='text-danger pl-4'>Image or video is required</span> */}

                <div className='ads-create-inputs-div'>
                  <div className="ads-sponserd-full-div p-0">
                    <div className="one-upload">2</div>
                    <h4 className="ads-header-text">Headline</h4>
                  </div>
                  <div className="">
                    {/* <textarea
                      id="manage-ads-txtid"
                      rows="4"
                      cols="50"
                      maxlength="200"
                      placeholder="enter here ...."
                      
                      name="headline"
                      value={values?.headline}
                      // touched={touched?.headline}
                      // errors={errors?.headline}
                      // handleChange={handleChange}
                      // handleBlur={handleChange}
                      
                    ></textarea> */}
                    <TextFieldWrapper
                      name="headline"
                      value={values?.headline}
                      touched={touched?.headline}
                      errors={errors?.headline}
                      handleChange={handleChange}
                      handleBlur={handleChange}
                      onBlur={() => {
                        setPageData((pre) => ({ ...pre, ...values }));
                      }}
                      placeholder="Enter here ...."
                      minRows={3}
                      maxRows={3}
                      multiline
                    />
                  </div>
                  <div className="number-of-texts">0/100</div>
                </div>

                <div className='ads-create-inputs-div'>
                  <div className="ads-sponserd-full-div p-0">
                    <div className="one-upload">3</div>
                    <h4 className="ads-header-text">Description</h4>
                  </div>
                  <div className="">
                    {/* <textarea
                      id="manage-ads-txtid"
                      name="description"
                      rows="4"
                      cols="50"
                      maxlength="200"
                      placeholder="enter here ...."
                    ></textarea> */}
                    <TextFieldWrapper
                      name="description"
                      value={values?.description}
                      touched={touched?.description}
                      errors={errors?.description}
                      handleChange={handleChange}
                      handleBlur={handleChange}
                      placeholder="Enter here,,,,"
                      onBlur={() => {
                        setPageData((pre) => ({ ...pre, ...values }));
                      }}
                      minRows={4}
                      maxRows={4}
                      multiline
                    />
                  </div>
                  <div className="number-of-texts">0/300</div>
                </div>


                <div className="row container">
                  <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">

                    <button
                      className="create-next-svg"
                      type="submit"
                      style={{
                        border: 'none',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        alignContent: 'center',
                        padding: 5,
                        width: '200px',
                      }}
                    >

                      <h5 className='pt-1' style={{ color: 'white' }}>Next</h5>

                      <span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="26"
                          height="12"
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
                      </span>
                    </button>


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
                          setPageData((p) => ({ ...p, ...values, image: image, prevImages: prevImages, removable_file: removable_file }));
                          setStep(3);
                        }}
                      >
                        <span>
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
                        </span>
                        <span className='pt-1'>
                          <h5 style={{ color: 'white', paddingTop: 4 }}>Back</h5>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

              </form>
            );
          }}
        </Formik>
        {/* <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <div>
              <div className="">
                <div className="row preview-adds-modaltext-div">
                  <div className="col-4 col-sm-4 col-md-4 col-lg-4 col-xl-4"></div>
                  <div className="col-4 col-sm-4 col-md-4 col-lg-4 col-xl-4">
                    <div>
                      <p className="preview-adds-modaltext">Ads Preview</p>
                    </div>
                  </div>
                  <div className="col-4 col-sm-4 col-md-4 col-lg-4 col-xl-4">
                    <div
                      className="cross-icon-svg-add"
                      style={{ cursor: 'pointer' }}
                      onClick={() => handleClose()}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        class="bi bi-x-circle"
                        viewBox="0 0 16 16"
                      >
                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
              <hr />
              <div className="ads-sponser-full-div">
                <div className="ads-sponserd-div">
                  {isImage() ? (
                    <ReactPlayer
                      url={pageData?.url}
                      className="rounded-3 custom-player "
                      width="100%"
                      height="100%"
                      controls
                      // playing
                      // style={{ position: 'relative' }}
                      config={{
                        youtube: {
                          playerVars: { controls: 0, disablekb: 1 },
                        },
                      }}
                    />
                  ) : (
                    <img
                      className="ads-sponserd-img"
                      src={pageData?.url || '/sponserdtwo.png'}
                      alt=""
                    />
                  )}
                  <div>
                    <span className="ads-sponserd-tags">{pageData?.headline}</span>
                    <p className="ads-sponserd-tagsp">{pageData?.description}</p>
                  </div>
                </div>
              </div>
            </div>
          </Box>
        </Modal> */}
      </Grid>
    </Grid >
  );
}
