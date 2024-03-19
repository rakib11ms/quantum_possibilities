'use client';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';
import ForgetPassword from '@/app/resetpassword/page';
import axiosInstance from '../../../utils/axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
const style = {
   position: 'absolute',
   top: '50%',
   left: '50%',
   transform: 'translate(-50%, -50%)',
   width: 400,
   bgcolor: 'background.paper',
   border: 'none',
   boxShadow: 24,
   pt: 2,
   px: 4,
   pb: 3,
};

const Login = () => {
   const router = useRouter();
   const [open, setOpen] = React.useState(false);

   const [formData, setFormData] = useState({
      email: '',
      password: '',
   });

   const [resetFormData, setResetFormData] = useState({
      email: '',
   });

   const [error, setError] = useState('');

   const handleFormChange = (e) => {
      setFormData({
         ...formData,
         [e.target.name]: e.target.value,
      });
   };

   const handleResetFormChange = (e) => {
      setResetFormData({
         ...resetFormData,
         [e.target.name]: e.target.value,
      });
   };

   // const [cookiesAuthRender, setCookiesAuthRender] = useState('');

   // console.log('cooki', cookiesAuthRender)

   // function getRender() {
   //   if (cookiesAuthRender !== null) {
   //     axiosInstance.get('/api/login-status-cookies'
   //       , {
   //         withCredentials: true,

   //       }
   //     ).then(res => {
   //       console.log('res', res)
   //       // router.push("/newsfeed");

   //     });
   //   }
   // }

   // useEffect(() => {
   //   if (cookiesAuthRender !== '') {
   //     getRender();
   //   }
   // }, [cookiesAuthRender])
   const [eyePassword, setEyePassword] = useState(true);

   const handleLogin = async (e) => {
      setError('');
      e.preventDefault();

      axiosInstance
         .post('api/login', formData, {
            withCredentials: true,
         })
         .then((res) => {
            if (res.data.status == 200) {
               // router.push("/newsfeed");

               // setCookiesAuthRender(res.data)
               if (typeof window !== 'undefined') {
                  localStorage.setItem('refreshToken', res.data.refreshToken);
                  localStorage.setItem('userInfo', JSON.stringify(res.data.user));
                  localStorage.setItem(
                     'fullname',
                     res.data.user[0].first_name + ' ' + res.data.user[0].last_name,
                  );
                  localStorage.setItem('username', res.data.user[0].username);
                  localStorage.setItem('userId', res.data.user[0]._id);
               }

               // setTimeout(() => {
               //   window.location.reload();
               // }, 3500)

               // if (typeof window === "undefined") {
               //   // Redirect to the newsfeed page if the login is successful
               //   return {
               //     redirect: {
               //       destination: "/newsfeed",
               //       permanent: false,
               //     },
               //   };
               // }
               window.location.replace('/newsfeed');
               // window.location.reload();
            } else if (res.data.status == 401) {
               toast.error('Login failed. Please check your email and password.', {
                  position: 'top-right',
                  style: {
                     background: 'white',
                     color: 'black',
                  },
               });
            } else {
               toast.error('Login failed. Invalid Credentials.', {
                  position: 'top-right',
                  style: {
                     background: 'white',
                     color: 'black',
                  },
               });
            }
         });
   };

   const handleForgetPassword = async (e) => {
      e.preventDefault();

      axiosInstance.post('api/forgot-password', resetFormData).then((res) => {
         if (res.data.status == 200) {
            console.log(res);
            // Cookies.set("token", res.data.accessToken, { expires: 1, path: "/" });
            setOpen(false);

            setResetFormData({
               ...resetFormData,
               ['email']: '',
            });

            toast.success(res.data.message, {
               position: 'top-right',
               style: {
                  background: 'white',
                  color: 'black',
               },
            });
         } else if (res.data.status == 401) {
            toast.error('Invalid Email. ', {
               position: 'top-right',
               style: {
                  background: 'white',
                  color: 'black',
               },
            });
         } else {
            toast.error('Invalid Email.', {
               position: 'top-right',
               style: {
                  background: 'white',
                  color: 'black',
               },
            });
         }
      });
   };

   const handleChange = (event) => {
      setSelectedValue(event.target.value);
   };

   const handleOpen = () => {
      setOpen(true);
   };
   const handleClose = () => {
      setOpen(false);
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
                        We are the best and biggest social network with 5 billion active users all
                        around the world. Share you thoughts, write blog posts, show your favourite
                        music via Spotify, earn badges and much more!
                     </p>
                     <Link href="/register">
                        <p className="register_now_button">Register Now!</p>
                     </Link>
                  </div>
               </div>
               <div className="col col-xl-5 col-lg-6 col-md-12 col-sm-12 col-12">
                  <div className="registration-login-form">
                     <div className="tab-content">
                        <div
                           className="tab-pane active"
                           id="profile"
                           role="tabpanel"
                           data-mh="log-tab"
                        >
                           <div className="title h6">Login to your Account</div>
                           <form className="content" method="post" onSubmit={handleLogin}>
                              <div className="row">
                                 <div className="col col-12 col-xl-12 col-lg-12 col-md-12 col-sm-12">
                                    <div className="form-group ">
                                       <input
                                          className="form-control"
                                          required
                                          type="email"
                                          name="email"
                                          placeholder="Enter your email address"
                                          value={formData.email}
                                          onChange={handleFormChange}
                                       />
                                    </div>
                                    <div className="form-group ">
                                       <input
                                          className="form-control"
                                          type={eyePassword ? 'password' : 'text'}
                                          name="password"
                                          placeholder="Password"
                                          required
                                          value={formData.password}
                                          onChange={handleFormChange}
                                       />
                                       <div
                                          className=""
                                          style={{ position: 'absolute', right: 10, top: '33%' }}
                                          onClick={(e) => setEyePassword(!eyePassword)}
                                       >
                                          <FontAwesomeIcon icon={faEye} />
                                       </div>
                                    </div>
                                    {/* <div className="remember">
                          <div className="checkbox">
                            <label>
                              <input name="optionsCheckboxes" type="checkbox" />
                              Remember Me
                            </label>
                          </div>
                          <a
                            onClick={handleOpen}
                            href="#"
                            className="forgot"
                            data-toggle="modal"
                            data-target="#restore-password"
                          >
                            Forgot my Password
                          </a>

                        </div> */}

                                    <div class="form-checks  d-flex  ">
                                       <div>
                                          <input
                                             class="accept-checkBox "
                                             type="checkbox"
                                             // onChange={handleInputChange}
                                             // onChange={() => alert("Hello")}

                                             // value={registerInputState.isAccept}
                                             id="flexCheckChecked"
                                             name="optionsCheckboxes"
                                          />
                                       </div>
                                       <div className="mx-2 ">
                                          <label>Remember Me</label>
                                       </div>
                                       <div className="float-right">
                                          <a
                                             onClick={handleOpen}
                                             href="#"
                                             className="forgot"
                                             data-toggle="modal"
                                             data-target="#restore-password"
                                          >
                                             Forgot my Password
                                          </a>
                                       </div>
                                    </div>

                                    <button
                                       type="submit"
                                       className="btn btn-sm btn-primary full-width"
                                    >
                                       Login
                                    </button>
                                    <div className="or" />

                                    <p className="custom-text-color">
                                       Don’t you have an account?{' '}
                                       <Link href="/register" className="register-btn">
                                          Register Now!
                                       </Link>{' '}
                                       it’s really simple and you can start enjoing all the
                                       benefits!
                                    </p>
                                 </div>
                              </div>
                           </form>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
         {/* Modal  */}
         <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="parent-modal-title"
            aria-describedby="parent-modal-description"
         >
            <Box sx={{ ...style, width: 600 }}>
               <div>
                  <form onSubmit={handleForgetPassword} method="post">
                     <h2>Restore your Password</h2>
                     <div>
                        <p>
                           Enter your email and click the send code button. You’ll receive a code in
                           your email. Please use that code below to change the old password for a
                           new one.
                        </p>
                     </div>

                     <div className="form-group label-floating">
                        <label className="control-label">Your Email</label>
                        <input
                           className="form-control"
                           value={resetFormData.email}
                           onChange={handleResetFormChange}
                           name="email"
                           type="email"
                           required
                        />
                     </div>
                     <button type="submit" className="btn btn-sm btn-primary full-width">
                        Send Me The Code
                     </button>
                  </form>
               </div>
            </Box>
         </Modal>
      </div>
   );
};

export default Login;
