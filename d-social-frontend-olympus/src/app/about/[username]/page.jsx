"use client";
import Masterdashboardlayout from "@/component/Masterdashboardlayout/Masterdashboardlayout";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import ProfileHeader from "@/component/ProfileHeader";
import axiosInstance from "../../../../utils/axios";
import { useParams } from 'next/navigation'



const Page = () => {
  const params = useParams();


  const [userInfo, setUserInfo] = React.useState({});
  const [joinDate, setJoinDate] = React.useState("");
  const [birthDate, setBirthDay] = React.useState("");
  const [educationInfo, setEducationInfo] = useState([]);
  const [lockState, setLockState] = useState("");

  useEffect(() => {

    if (typeof window !== "undefined") {
      const localStorageUserName = localStorage.getItem('username');
      if (localStorageUserName == params.username) {
        const localUserInfo = localStorage.getItem("userInfo");

        const localDOB = JSON.parse(localUserInfo)[0].date_of_birth;
        const localJoinDate = JSON.parse(localUserInfo)[0].createdAt;
        const formattedDate = formatDate(localDOB);
        const formattedJoinDate = formatDate(localJoinDate);

        setBirthDay(formattedDate);
        setJoinDate(formattedJoinDate);

        setUserInfo(JSON.parse(localUserInfo)[0]);
      } else {
        getUserInfoByUserName(params.username)
      }
    } else {
      getUserInfoByUserName(params.username)
    }
    fetchEducationInfo(params.username);
  }, []);

  const formatDate = (inputDate) => {
    const dateOptions = {
      // weekday: 'short',
      month: "short",
      day: "2-digit",
      year: "numeric",
    };

    const formattedDate = new Date(inputDate).toLocaleDateString(
      "en-US",
      dateOptions
    );

    return formattedDate;
  };


  const getUserInfoByUserName = (username) => {
    const formData = {
      username: username
    }
    axiosInstance.post('/api/get-user-info', formData).then((res) => {

      if (res.data.status == 200) {
        setUserInfo(res.data.userInfo[0]);


        const localDOB = res.data.userInfo[0].date_of_birth;
        const localJoinDate = res.data.userInfo[0].createdAt;
        const formattedDate = formatDate(localDOB);
        const formattedJoinDate = formatDate(localJoinDate);

        setBirthDay(formattedDate);
        setJoinDate(formattedJoinDate);

      }
    }

    )
  }

  function fetchEducationInfo(username) {
    const formData = {
      username: username
    };
    axiosInstance.post("/api/get-user-education-info", formData).then((res) => {
      console.log(res.data.status);
      if (res.data.status == 200) {
        console.log(res.data.userEducation);
        setEducationInfo(res.data.userEducation);
      }
    });
  }

  function getYearFromDate(dateString) {
    const date = new Date(dateString);

    // Get the year from the date
    const year = date.getFullYear();

    console.log(year);
    return year;
  }

  return (
    <div>
      <Masterdashboardlayout headerName="About">
        <div>
          <div className="container-fluid">
            <div className="row">
              <div className="col col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                <div className="ui-block">
                  <ProfileHeader active="about" lockState={setLockState} />
                </div>
              </div>
            </div>
          </div>
          {/* ... end Top Header-Profile */}
          <div className="container-fluid">
            <div className="row">
              <div className="col col-xl-8 order-xl-2 col-lg-8 order-lg-2 col-md-12 order-md-1 col-sm-12 col-12">
                <div className="ui-block">
                  <div className="ui-block-title">
                    <h6 className="title">Hobbies and Interests</h6>
                    <a href="#" className="more">
                      <svg className="olymp-three-dots-icon">
                        <use xlinkHref="../svg-icons/sprites/icons.svg#olymp-three-dots-icon" />
                      </svg>
                    </a>
                  </div>
                  {/* <div className="ui-block-content">
                    <div className="row">
                      <ul className="widget w-personal-info item-block">
                        <div className="row">
                          {educationInfo.map((item) => (
                            <div
                              className="col-12 col-sm-12 col-md-6 col-lg-6"
                              key={item.id}
                            >
                              <div className="info-item">
                                <div className="info-row">
                                  <span className="title">
                                    {item.institute_id.institute_name}
                                  </span>
                                  <span className="date">
                                    {getYearFromDate(item.start_at)} -{" "}
                                    {getYearFromDate(item.end_at)}
                                  </span>
                                </div>
                                <div className="info-row">
                                  <span className="text">
                                    {item.description}
                                  </span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </ul>
                    </div>
                  </div> */}

                  <div className="ui-block-content">
                    <div className="row">
                      <div className="col col-lg-6 col-md-6 col-sm-12 col-12">
                        {/* W-Personal-Info */}
                        <ul className="widget w-personal-info item-block">
                          <li>
                            <span className="title">Hobbies:</span>
                            <span className="text">
                              I like to ride the bike to work, swimming, and
                              working out. I also like reading design magazines,
                              go to museums, and binge watching a good tv show
                              while it’s raining outside.
                            </span>
                          </li>
                          <li>
                            <span className="title">Favourite TV Shows:</span>
                            <span className="text">
                              Breaking Good, RedDevil, People of Interest, The
                              Running Dead, Found, American Guy.
                            </span>
                          </li>
                          <li>
                            <span className="title">Favourite Movies:</span>
                            <span className="text">
                              Idiocratic, The Scarred Wizard and the Fire Crown,
                              Crime Squad, Ferrum Man.{" "}
                            </span>
                          </li>
                          <li>
                            <span className="title">Favourite Games:</span>
                            <span className="text">
                              The First of Us, Assassin’s Squad, Dark Assylum,
                              NMAK16, Last Cause 4, Grand Snatch Auto.{" "}
                            </span>
                          </li>
                        </ul>
                        {/* ... end W-Personal-Info */}
                      </div>
                      <div className="col col-lg-6 col-md-6 col-sm-12 col-12">
                        {/* W-Personal-Info */}
                        <ul className="widget w-personal-info item-block">
                          <li>
                            <span className="title">
                              Favourite Music Bands / Artists:
                            </span>
                            <span className="text">
                              Iron Maid, DC/AC, Megablow, The Ill, Kung
                              Fighters, System of a Revenge.
                            </span>
                          </li>
                          <li>
                            <span className="title">Favourite Books:</span>
                            <span className="text">
                              The Crime of the Century, Egiptian Mythology 101,
                              The Scarred Wizard, Lord of the Wings, Amongst
                              Gods, The Oracle, A Tale of Air and Water.
                            </span>
                          </li>
                          <li>
                            <span className="title">Favourite Writers:</span>
                            <span className="text">
                              Martin T. Georgeston, Jhonathan R. Token, Ivana
                              Rowle, Alexandria Platt, Marcus Roth.{" "}
                            </span>
                          </li>
                          <li>
                            <span className="title">Other Interests:</span>
                            <span className="text">
                              Swimming, Surfing, Scuba Diving, Anime,
                              Photography, Tattoos, Street Art.
                            </span>
                          </li>
                        </ul>
                        {/* ... end W-Personal-Info */}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="ui-block">
                  <div className="ui-block-title">
                    <h6 className="title">Education and Employement</h6>
                    <a href="#" className="more">
                      <svg className="olymp-three-dots-icon">
                        <use xlinkHref="svg-icons/sprites/icons.svg#olymp-three-dots-icon" />
                      </svg>
                    </a>
                  </div>
                  <div className="ui-block-content">
                    <div className="row">
                      <div className="col col-lg-12 col-md-12 col-sm-12 col-12">
                        {/* W-Personal-Info */}
                        <ul className="widget w-personal-info item-block">
                          <div className="row">
                            {educationInfo.map((item) => (
                              <div
                                className="col-12 col-sm-12 col-md-6 col-lg-6"
                                key={item.id}
                              >
                                <div className="info-item">
                                  <div className="info-row">
                                    <span className="title">
                                      {item.institute_id.institute_name}
                                    </span>
                                    <span className="date">
                                      {getYearFromDate(item.start_at)} -{" "}
                                      {getYearFromDate(item.end_at)}
                                    </span>
                                  </div>
                                  <div className="info-row">
                                    <span className="text">
                                      {item.description}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </ul>
                        {/* ... end W-Personal-Info */}
                      </div>
                      {/* <div className="col col-lg-6 col-md-6 col-sm-12 col-12">
                        <ul className="widget w-personal-ianfo item-block">
                          <li>
                            <span className="title">Digital Design Intern</span>
                            <span className="date">2006-2008</span>
                            <span className="text">
                              Digital Design Intern for the “Multimedz” agency.
                              Was in charge of the communication with the
                              clients.
                            </span>
                          </li>
                          <li>
                            <span className="title">UI/UX Designer</span>
                            <span className="date">2008-2013</span>
                            <span className="text">
                              UI/UX Designer for the “Daydreams” agency.{" "}
                            </span>
                          </li>
                          <li>
                            <span className="title">Senior UI/UX Designer</span>
                            <span className="date">2013-Now</span>
                            <span className="text">
                              Senior UI/UX Designer for the “Daydreams” agency.
                              I’m in charge of a ten person group, overseeing
                              all the proyects and talking to potential clients.
                            </span>
                          </li>
                        </ul>
                      </div> */}
                    </div>
                  </div>
                </div>
              </div>
              <div className="col col-xl-4 order-xl-1 col-lg-4 order-lg-1 col-md-12 order-md-2 col-sm-12 col-12">
                <div className="ui-block">
                  <div className="ui-block-title">
                    <h6 className="title">Personal Info</h6>
                    <a href="#" className="more">
                      <svg className="olymp-three-dots-icon">
                        <use xlinkHref="svg-icons/sprites/icons.svg#olymp-three-dots-icon" />
                      </svg>
                    </a>
                  </div>
                  <div className="ui-block-content">
                    {/* W-Personal-Info */}
                    <ul className="widget w-personal-info">
                      <li>
                        <span className="title">About Me:</span>
                        <span className="text">{userInfo.user_bio}</span>
                      </li>
                      <li>
                        <span className="title">Birthday:</span>
                        <span className="text">{birthDate}</span>
                      </li>
                      <li>
                        <span className="title">Birthplace:</span>
                        <span className="text"> {userInfo.birth_place}</span>
                      </li>
                      <li>
                        <span className="title">Lives in:</span>
                        <span className="text">{userInfo.home_town}</span>
                      </li>
                      {/* <li>
                        <span className="title">Occupation:</span>
                        <span className="text">UI/UX Designer</span>
                      </li> */}
                      <li>
                        <span className="title">Joined:</span>
                        <span className="text">{joinDate}</span>
                      </li>
                      <li>
                        <span className="title">Gender:</span>
                        <span className="text">
                          {userInfo.gender?.gender_name}
                        </span>
                      </li>
                      {/* <li>
                        <span className="title">Status:</span>
                        <span className="text">Married</span>
                      </li> */}
                      <li>
                        <span className="title">Email:</span>
                        <a href="#" className="text">
                          {userInfo.email}
                        </a>
                      </li>
                      {/* <li>
                        <span className="title">Website:</span>
                        <a href="#" className="text">
                          daydreamsagency.com
                        </a>
                      </li> */}
                      <li>
                        <span className="title">Phone Number:</span>
                        <span className="text"> {userInfo.phone}</span>
                      </li>
                      <li>
                        <span className="title">Religious Belifs:</span>
                        <span className="text">
                          {userInfo.religion?.religion_name}
                        </span>
                      </li>
                    </ul>
                    {/* ... end W-Personal-Info */}
                    {/* W-Socials */}
                    <div className="widget w-socials">
                      <h6 className="title">Other Social Networks:</h6>
                      <a href="#" className="social-item bg-facebook">
                        <i className="fab fa-facebook-f" aria-hidden="true" />
                        Facebook
                      </a>
                      <a href="#" className="social-item bg-twitter">
                        <i className="fab fa-twitter" aria-hidden="true" />
                        Twitter
                      </a>
                      <a href="#" className="social-item bg-dribbble">
                        <i className="fab fa-dribbble" aria-hidden="true" />
                        Dribbble
                      </a>
                    </div>
                    {/* ... end W-Socials */}
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Window-popup Update Header Photo */}
          <div
            className="modal fade"
            id="update-header-photo"
            tabIndex={-1}
            role="dialog"
            aria-labelledby="update-header-photo"
            aria-hidden="true"
          >
            <div
              className="modal-dialog window-popup update-header-photo"
              role="document"
            >
              <div className="modal-content">
                <a
                  href="#"
                  className="close icon-close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <svg className="olymp-close-icon">
                    <use xlinkHref="svg-icons/sprites/icons.svg#olymp-close-icon" />
                  </svg>
                </a>
                <div className="modal-header">
                  <h6 className="title">Update Header Photo</h6>
                </div>
                <div className="modal-body">
                  <a href="#" className="upload-photo-item">
                    <svg className="olymp-computer-icon">
                      <use xlinkHref="svg-icons/sprites/icons.svg#olymp-computer-icon" />
                    </svg>
                    <h6>Upload Photo</h6>
                    <span>Browse your computer.</span>
                  </a>
                  <a
                    href="#"
                    className="upload-photo-item"
                    data-toggle="modal"
                    data-target="#choose-from-my-photo"
                  >
                    <svg className="olymp-photos-icon">
                      <use xlinkHref="svg-icons/sprites/icons.svg#olymp-photos-icon" />
                    </svg>
                    <h6>Choose from My Photos</h6>
                    <span>Choose from your uploaded photos</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
          {/* ... end Window-popup Update Header Photo */}
          {/* Window-popup Choose from my Photo */}
          <div
            className="modal fade"
            id="choose-from-my-photo"
            tabIndex={-1}
            role="dialog"
            aria-labelledby="choose-from-my-photo"
            aria-hidden="true"
          >
            <div
              className="modal-dialog window-popup choose-from-my-photo"
              role="document"
            >
              <div className="modal-content">
                <a
                  href="#"
                  className="close icon-close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <svg className="olymp-close-icon">
                    <use xlinkHref="svg-icons/sprites/icons.svg#olymp-close-icon" />
                  </svg>
                </a>
                <div className="modal-header">
                  <h6 className="title">Choose from My Photos</h6>
                  {/* Nav tabs */}
                  <ul className="nav nav-tabs" role="tablist">
                    <li className="nav-item">
                      <a
                        className="nav-link active"
                        data-toggle="tab"
                        href="#home"
                        role="tab"
                        aria-expanded="true"
                      >
                        <svg className="olymp-photos-icon">
                          <use xlinkHref="svg-icons/sprites/icons.svg#olymp-photos-icon" />
                        </svg>
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        className="nav-link"
                        data-toggle="tab"
                        href="#profile"
                        role="tab"
                        aria-expanded="false"
                      >
                        <svg className="olymp-albums-icon">
                          <use xlinkHref="svg-icons/sprites/icons.svg#olymp-albums-icon" />
                        </svg>
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="modal-body">
                  {/* Tab panes */}
                  <div className="tab-content">
                    <div
                      className="tab-pane active"
                      id="home"
                      role="tabpanel"
                      aria-expanded="true"
                    >
                      <div className="choose-photo-item" data-mh="choose-item">
                        <div className="radio">
                          <label className="custom-radio">
                            <img src="img/choose-photo1.jpg" alt="photo" />
                            <input type="radio" name="optionsRadios" />
                          </label>
                        </div>
                      </div>
                      <div className="choose-photo-item" data-mh="choose-item">
                        <div className="radio">
                          <label className="custom-radio">
                            <img src="img/choose-photo2.jpg" alt="photo" />
                            <input type="radio" name="optionsRadios" />
                          </label>
                        </div>
                      </div>
                      <div className="choose-photo-item" data-mh="choose-item">
                        <div className="radio">
                          <label className="custom-radio">
                            <img src="img/choose-photo3.jpg" alt="photo" />
                            <input type="radio" name="optionsRadios" />
                          </label>
                        </div>
                      </div>
                      <div className="choose-photo-item" data-mh="choose-item">
                        <div className="radio">
                          <label className="custom-radio">
                            <img src="img/choose-photo4.jpg" alt="photo" />
                            <input type="radio" name="optionsRadios" />
                          </label>
                        </div>
                      </div>
                      <div className="choose-photo-item" data-mh="choose-item">
                        <div className="radio">
                          <label className="custom-radio">
                            <img src="img/choose-photo5.jpg" alt="photo" />
                            <input type="radio" name="optionsRadios" />
                          </label>
                        </div>
                      </div>
                      <div className="choose-photo-item" data-mh="choose-item">
                        <div className="radio">
                          <label className="custom-radio">
                            <img src="img/choose-photo6.jpg" alt="photo" />
                            <input type="radio" name="optionsRadios" />
                          </label>
                        </div>
                      </div>
                      <div className="choose-photo-item" data-mh="choose-item">
                        <div className="radio">
                          <label className="custom-radio">
                            <img src="img/choose-photo7.jpg" alt="photo" />
                            <input type="radio" name="optionsRadios" />
                          </label>
                        </div>
                      </div>
                      <div className="choose-photo-item" data-mh="choose-item">
                        <div className="radio">
                          <label className="custom-radio">
                            <img src="img/choose-photo8.jpg" alt="photo" />
                            <input type="radio" name="optionsRadios" />
                          </label>
                        </div>
                      </div>
                      <div className="choose-photo-item" data-mh="choose-item">
                        <div className="radio">
                          <label className="custom-radio">
                            <img src="img/choose-photo9.jpg" alt="photo" />
                            <input type="radio" name="optionsRadios" />
                          </label>
                        </div>
                      </div>
                      <a
                        href="#"
                        className="btn btn-secondary btn-lg btn--half-width"
                      >
                        Cancel
                      </a>
                      <a
                        href="#"
                        className="btn btn-primary btn-lg btn--half-width"
                      >
                        Confirm Photo
                      </a>
                    </div>
                    <div
                      className="tab-pane"
                      id="profile"
                      role="tabpanel"
                      aria-expanded="false"
                    >
                      <div className="choose-photo-item" data-mh="choose-item">
                        <figure>
                          <img src="img/choose-photo10.jpg" alt="photo" />
                          <figcaption>
                            <a href="#">South America Vacations</a>
                            <span>Last Added: 2 hours ago</span>
                          </figcaption>
                        </figure>
                      </div>
                      <div className="choose-photo-item" data-mh="choose-item">
                        <figure>
                          <img src="img/choose-photo11.jpg" alt="photo" />
                          <figcaption>
                            <a href="#">Photoshoot Summer 2016</a>
                            <span>Last Added: 5 weeks ago</span>
                          </figcaption>
                        </figure>
                      </div>
                      <div className="choose-photo-item" data-mh="choose-item">
                        <figure>
                          <img src="img/choose-photo12.jpg" alt="photo" />
                          <figcaption>
                            <a href="#">Amazing Street Food</a>
                            <span>Last Added: 6 mins ago</span>
                          </figcaption>
                        </figure>
                      </div>
                      <div className="choose-photo-item" data-mh="choose-item">
                        <figure>
                          <img src="img/choose-photo13.jpg" alt="photo" />
                          <figcaption>
                            <a href="#">Graffity &amp; Street Art</a>
                            <span>Last Added: 16 hours ago</span>
                          </figcaption>
                        </figure>
                      </div>
                      <div className="choose-photo-item" data-mh="choose-item">
                        <figure>
                          <img src="img/choose-photo14.jpg" alt="photo" />
                          <figcaption>
                            <a href="#">Amazing Landscapes</a>
                            <span>Last Added: 13 mins ago</span>
                          </figcaption>
                        </figure>
                      </div>
                      <div className="choose-photo-item" data-mh="choose-item">
                        <figure>
                          <img src="img/choose-photo15.jpg" alt="photo" />
                          <figcaption>
                            <a href="#">The Majestic Canyon</a>
                            <span>Last Added: 57 mins ago</span>
                          </figcaption>
                        </figure>
                      </div>
                      <a
                        href="#"
                        className="btn btn-secondary btn-lg btn--half-width"
                      >
                        Cancel
                      </a>
                      <a
                        href="#"
                        className="btn btn-primary btn-lg disabled btn--half-width"
                      >
                        Confirm Photo
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* ... end Window-popup Choose from my Photo */}
          <a className="back-to-top" href="#">
            <img
              src="../svg-icons/back-to-top.svg"
              alt="arrow"
              className="back-icon"
            />
          </a>
        </div>
      </Masterdashboardlayout>
    </div>
  );
};

export default Page;
