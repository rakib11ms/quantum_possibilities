"use client";
import React, { useEffect, useState } from "react";
import axiosInstance from "../../../utils/axios";
import { toast } from "react-toastify";


function PersonalInformation() {
  const [allGender, setAllGender] = useState([]);
  const [allReligion, setAllReligion] = useState([]);

  const [profileInputState, setProfileInputState] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    phone: "",
    gender: "",
    day: "",
    month: "",
    year: "",
    gender: "",
    user_bio: '',
    home_town: '',
    birth_place: '',
    religion: '',
  });

  async function fetchGender() {
    axiosInstance.get(`/api/gender`).then((res) => {
      console.log("res", res);
      if (res.data.status == 200) {
        setAllGender(res.data.allGender);
      }
    });
  }

  async function fetchReligion() {
    axiosInstance.get(`/api/religion`).then((res) => {
      console.log("res", res);
      if (res.data.status == 200) {
        setAllReligion(res.data.allReligion);
      }
    });
  }

  const handleInputChange = (e) => {
    setProfileInputState({
      ...profileInputState,
      [e.target.name]: e.target.value,
    });
  };


  useEffect(() => {
    fetchGender();
    fetchReligion();

    if (typeof window !== "undefined") {
      const localUserInfo = localStorage.getItem('userInfo');
      const localDOB = JSON.parse(localUserInfo)[0].date_of_birth;
      const formattedDate = formatDate(localDOB);
      const locaUserInfo = JSON.parse(localUserInfo)[0];

      setProfileInputState({
        first_name: locaUserInfo.first_name,
        last_name: locaUserInfo.last_name,
        email: locaUserInfo.email,
        phone: locaUserInfo.phone,
        home_town: locaUserInfo.home_town,
        birth_place: locaUserInfo.birth_place,
        gender: locaUserInfo.gender?._id,
        day: parseInt(formattedDate['day']),
        month: formattedDate['month'],
        year: formattedDate['year'],
        user_bio: locaUserInfo.user_bio,
        religion: locaUserInfo.religion?._id,
      })
    }

  }, []);


  const handleEditProfile = (e) => {
    e.preventDefault();

    axiosInstance.post(`api/update-profile`, profileInputState).then((res) => {
      console.log('res', res.data.status)
      if (res.data.status == 200) {
        toast(res.data.message, {
          type: "success",
          position: "top-right",
        });

        if (typeof window !== "undefined") {
          localStorage.setItem('userInfo', JSON.stringify(res.data.user));
          localStorage.setItem('fullname', res.data.user[0].first_name + ' ' + res.data.user[0].last_name);
        }
      } else if (res.data.status == 400) {
        toast(res.data.error, {
          type: "error",
          position: "top-right",
          style: {
            background: "",
            color: "red",
          },
        });
      } else {
        toast(res.data.error, {
          type: "error",
          position: "top-right",
          style: {
            background: "",
            color: "red",
          },
        });
      }
    });
  }

  const formatDate = (inputDate) => {
    const date = new Date(inputDate);

    const day = date.toLocaleDateString('en-US', { day: '2-digit' });
    const month = date.toLocaleDateString('en-US', { month: 'numeric' });
    const year = date.toLocaleDateString('en-US', { year: 'numeric' });

    return {
      day: day,
      month: month,
      year: year
    }
  };


  const generateOptions = (start, end) => {
    const options = [];
    for (let i = start; i <= end; i++) {
      options.push(
        <option key={i} value={i}>
          {i}
        </option>
      );
    }
    return options;
  };

  return (
    <form onSubmit={handleEditProfile}>
      <div className="row">
        <div className="col col-lg-6 col-md-6 col-sm-12 col-12">
          <div className="form-group label-floating">
            <label className="control-label">
              First Name
            </label>
            <input
              className="form-control"
              placeholder
              type="text" name="first_name"
              onChange={handleInputChange}
              defaultValue={profileInputState.first_name}
            />
          </div>
          <div className="form-group label-floating">
            <label className="control-label">
              Your Email
            </label>
            <input
              className="form-control"
              placeholder
              type="email"
              onChange={handleInputChange} defaultValue={profileInputState.email}
            />
          </div>
          <div className="dob-register">
            <div>
              <select
                className="dob-register-day"
                onChange={handleInputChange}
                value={profileInputState.day}
                name="day"
                required
              >
                <option value="s">Day</option>
                {generateOptions(1, 31)}
              </select>
            </div>
            <div>
              <select
                className="dob-register-day"
                onChange={handleInputChange}
                value={profileInputState.month}
                name="month"
                required
              >
                <option value="">Month</option>
                {generateOptions(1, 12)}
              </select>
            </div>
            <div>
              <select
                className="dob-register-day"
                onChange={handleInputChange}
                value={profileInputState.year}
                name="year"
                required
              >
                <option value="">Year</option>
                {generateOptions(1900, 2023)}{" "}
                {/* Choose a suitable range */}
              </select>
            </div>
          </div>
          {/* <div className="form-group date-time-picker label-floating">
          <label className="control-label">
            Your Birthday
          </label>
          <input
            name="datetimepicker"
            onChange={handleInputChange} value={birthDate}
          />
          <span className="input-group-addon">
            <svg className="olymp-month-calendar-icon icon">
              <use xlinkHref="svg-icons/sprites/icons.svg#olymp-month-calendar-icon" />
            </svg>
          </span>
        </div> */}
        </div>
        <div className="col col-lg-6 col-md-6 col-sm-12 col-12">
          <div className="form-group label-floating">
            <label className="control-label">Last Name</label>
            <input
              className="form-control"
              placeholder
              type="text"
              name="last_name"
              onChange={handleInputChange} defaultValue={profileInputState.last_name}
            />
          </div>
          {/* <div className="form-group label-floating">
          <label className="control-label">
            Your Website
          </label>
          <input
            className="form-control"
            placeholder
            type="email"
               onChange={handleInputChange} defaultValue={profileInputState.last_name}
          />
        </div> */}
          <div className="form-group label-floating">
            <label className="control-label">
              Your Phone Number
            </label>
            <input
              className="form-control"
              placeholder
              type="text"
              onChange={handleInputChange} defaultValue={profileInputState.phone}
            />
          </div>
          <div className="form-group label-floating">
            <label className="control-label">
              Hometown
            </label>
            <input
              className="form-control"
              placeholder
              type="text" name="home_town"
              onChange={handleInputChange} defaultValue={profileInputState.home_town}
            />
          </div>
        </div>
        {/* <div className="col col-lg-4 col-md-4 col-sm-12 col-12">
        <div className="form-group label-floating is-select">
          <label className="control-label">
            Your Country
          </label>
          <select className="selectpicker form-control">
            <option value="US">United States</option>
            <option value="AU">Australia</option>
          </select>
        </div>
      </div>
      <div className="col col-lg-4 col-md-4 col-sm-12 col-12">
        <div className="form-group label-floating is-select">
          <label className="control-label">
            Your State / Province
          </label>
          <select className="selectpicker form-control">
            <option value="CA">California</option>
            <option value="TE">Texas</option>
          </select>
        </div>
      </div>
      <div className="col col-lg-4 col-md-4 col-sm-12 col-12">
        <div className="form-group label-floating is-select">
          <label className="control-label">Your City</label>
          <select className="selectpicker form-control">
            <option value="SF">San Francisco</option>
            <option value="NY">New York</option>
          </select>
        </div>
      </div> */}
        <div className="col col-lg-6 col-md-6 col-sm-12 col-12">
          <div className="form-group">
            <textarea
              className="form-control"
              placeholder="Write a little description about you" name="user_bio"
              onChange={handleInputChange} defaultValue={
                profileInputState.user_bio
              }
            />
          </div>
          <div className="form-group label-floating  is-select">
            <label className="control-label">
              Your Gender
            </label>
            <select name="gender" value={profileInputState.gender} onChange={handleInputChange} className=" form-control">
              <option value=''>Choose gender</option>
              {allGender.map((item, i) => {
                return (
                  <option value={item._id} >
                    {item.gender_name}
                  </option>
                );
              })}
            </select>
          </div>

        </div>
        <div className="col col-lg-6 col-md-6 col-sm-12 col-12">
          <div className="form-group label-floating">
            <label className="control-label">
              Your Birthplace
            </label>
            <input
              className="form-control"
              placeholder
              type="text" name="birth_place"
              onChange={handleInputChange} defaultValue={profileInputState.birth_place}
            />
          </div>
          <div className="form-group label-floating is-select">
            <label className="control-label">
              Religious Belifs
            </label>
            <select name="religion" value={profileInputState.religion} onChange={handleInputChange} className=" form-control">
              <option value=''>Choose Religion</option>
              {allReligion.map((item, i) => {
                return (
                  <option value={item._id} >
                    {item.religion_name}
                  </option>
                );
              })}
            </select>

          </div>
          {/* <div className="form-group label-floating">
          <label className="control-label">
            Your Occupation
          </label>
          <input
            className="form-control"
            placeholder
            type="text"
               onChange={handleInputChange} defaultValue="UI/UX Designer"
          />
        </div> */}
          {/* <div className="form-group label-floating is-select">
          <label className="control-label">Status</label>
          <select className="selectpicker form-control">
            <option value="MA">Married</option>
            <option value="FE">Not Married</option>
          </select>
        </div> */}
          {/* <div className="form-group label-floating">
          <label className="control-label">
            Political Incline
          </label>
          <input
            className="form-control"
            placeholder
            type="text"
            onChange={handleInputChange} defaultValue="Democrat"
          />
        </div> */}
        </div>
        {/* <div className="col col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
        <div className="form-group with-icon label-floating">
          <label className="control-label">
            Your Facebook Account
          </label>
          <input
            className="form-control"
            type="text"
            defaultValue="www.facebook.com/james-spiegel95321"
          />
          <i
            className="fab fa-facebook-f c-facebook"
            aria-hidden="true"
          />
        </div>
        <div className="form-group with-icon label-floating">
          <label className="control-label">
            Your Twitter Account
          </label>
          <input
            className="form-control"
            type="text"
            defaultValue="www.twitter.com/james_spiegelOK"
          />
          <i
            className="fab fa-twitter c-twitter"
            aria-hidden="true"
          />
        </div>
        <div className="form-group with-icon label-floating is-empty">
          <label className="control-label">
            Your RSS Feed Account
          </label>
          <input className="form-control" type="text" />
          <i
            className="fa fa-rss c-rss"
            aria-hidden="true"
          />
        </div>
        <div className="form-group with-icon label-floating">
          <label className="control-label">
            Your Dribbble Account
          </label>
          <input
            className="form-control"
            type="text"
            defaultValue="www.dribbble.com/thecowboydesigner"
          />
          <i
            className="fab fa-dribbble c-dribbble"
            aria-hidden="true"
          />
        </div>
        <div className="form-group with-icon label-floating is-empty">
          <label className="control-label">
            Your Spotify Account
          </label>
          <input className="form-control" type="text" />
          <i
            className="fab fa-spotify c-spotify"
            aria-hidden="true"
          />
        </div>
      </div> */}
        {/* <div className="col col-lg-6 col-md-6 col-sm-12 col-12">
          <button className="btn btn-secondary btn-lg full-width">
            Restore all Attributes
          </button>
        </div> */}
        <div className="col col-lg-6 col-md-6 col-sm-12 col-12">
          <button type="submit" className="btn btn-primary btn-lg full-width">
            Save all Changes
          </button>
        </div>
      </div>
    </form>
  )
}

export default PersonalInformation
