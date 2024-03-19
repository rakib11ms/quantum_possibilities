"use client";

import React, { useEffect, useState } from "react";
import axiosInstance from "../../../utils/axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import TextField from '@mui/material/TextField';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';

//



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

const generateOptionsMinus = (start, end) => {
  const options = [];
  for (let i = start; i >= end; i--) {
    options.push(
      <option key={i} value={i}>
        {i}
      </option>
    );
  }
  return options;
};


const EducationExperience = () => {
  const router = useRouter();
  const [userName, setUserName] = React.useState('');
  const [currentYear, setCurrentYear] = useState('');
  const [educationInfo, setEducationInfo] = useState([]);

  const [educationFields, setEducationFields] = useState({
    school: [
      {
        id: 1,
        name: "",
        startDay: "",
        startMonth: "",
        startYear: "",
        endDay: "",
        endMonth: "",
        endYear: "",
        description: "",
        institute_id: ""
      },
    ],
    college: [
      {
        id: 1,
        name: "",
        startDay: "",
        startMonth: "",
        startYear: "",
        endDay: "",
        endMonth: "",
        endYear: "",
        description: "",
        institute_id: ""
      },
    ],
    university: [
      {
        id: 1,
        name: "",
        startDay: "",
        startMonth: "",
        startYear: "",
        endDay: "",
        endMonth: "",
        endYear: "",
        description: "",
        institute_id: ""
      },
    ],
  });

  const handleInputChange = (section, index, event) => {
    const { name, value } = event.target;
    const updatedFields = { ...educationFields };
    updatedFields[section][index][name] = value;
    if (name == 'name')
      updatedFields[section][index]["institute_id"] = '';
    setEducationFields(updatedFields);
  };

  const handleOptionSelect = (section, index, newValue) => {
    const updatedFields = { ...educationFields };
    if (newValue && newValue.institute_name) {
      updatedFields[section][index]["name"] = newValue.institute_name;
      updatedFields[section][index]["institute_id"] = newValue._id;
      setEducationFields(updatedFields);
    }
  };
  console.log(educationFields);

  const addEducationField = (section) => {
    const uniqueId = Date.now();
    setEducationFields((prevFields) => ({
      ...prevFields,
      [section]: [
        ...prevFields[section],
        {
          id: uniqueId,
          name: "",
          startDay: "",
          startMonth: "",
          startYear: "",
          endDay: "",
          endMonth: "",
          endYear: "",
          description: "",
        },
      ],
    }));
  };

  useEffect(() => {
    const currentDate = new Date();
    setCurrentYear(getYearFromDate(currentDate));
    fetchEducationInfo();
    fetchData('');

    if (typeof window !== "undefined") {
      const localStorageUsername = localStorage.getItem('username');
      setUserName(localStorageUsername);
    }

  }, [])


  const removeEducationField = (section, id) => {
    if (educationFields[section]) {
      setEducationFields((prevFields) => ({
        ...prevFields,
        [section]: prevFields[section].filter((field) => field.id !== id),
      }));
    }
  };

  function getYearFromDate(dateString) {
    const date = new Date(dateString);

    // Get the year from the date
    const year = date.getFullYear();


    return year;
  }

  function getMonthFromDate(dateString) {
    const date = new Date(dateString);

    // Get the year from the date
    const month = date.toLocaleDateString('en-US', { month: 'numeric' });


    return parseInt(month);
  }

  function getDateFromDate(dateString) {
    const date = new Date(dateString);

    // Get the year from the date
    const day = date.toLocaleDateString('en-US', { day: '2-digit' });


    return parseInt(day);
  }


  function fetchEducationInfo() {
    axiosInstance.get("/api/get-user-education-info").then((res) => {

      if (res.data.status == 200) {
        let userEducationRespone = res.data.userEducation;
        userEducationRespone.map((educationData) => {
          if (educationData.institute_type_id.institute_type.toLowerCase() == 'school') {
            setEducationFields((prevFields) => ({
              ...prevFields,
              ['school']: [
                ...prevFields['school'],
                {
                  id: educationData._id,
                  name: educationData.institute_id?.institute_name,
                  institute_id: educationData.institute_id?.institute_id,
                  startDay: getDateFromDate(educationData.start_at),
                  startMonth: getMonthFromDate(educationData.start_at),
                  startYear: getYearFromDate(educationData.start_at),
                  endDay: getDateFromDate(educationData.end_at),
                  endMonth: getMonthFromDate(educationData.end_at),
                  endYear: getYearFromDate(educationData.end_at),
                  description: educationData.description,
                },
              ],
            }));
          } else if (educationData.institute_type_id.institute_type.toLowerCase() == 'college') {
            setEducationFields((prevFields) => ({
              ...prevFields,
              ['college']: [
                ...prevFields['college'],
                {
                  id: educationData._id,
                  name: educationData.institute_id.institute_name,
                  institute_id: educationData.institute_id?.institute_id,
                  startDay: getDateFromDate(educationData.start_at),
                  startMonth: getMonthFromDate(educationData.start_at),
                  startYear: getYearFromDate(educationData.start_at),
                  endDay: getDateFromDate(educationData.end_at),
                  endMonth: getMonthFromDate(educationData.end_at),
                  endYear: getYearFromDate(educationData.end_at),
                  description: educationData.description,
                },
              ],
            }));
          } else {
            setEducationFields((prevFields) => ({
              ...prevFields,
              ['university']: [
                ...prevFields['university'],
                {
                  id: educationData._id,
                  name: educationData.institute_id.institute_name,
                  institute_id: educationData.institute_id?.institute_id,
                  startDay: getDateFromDate(educationData.start_at),
                  startMonth: getMonthFromDate(educationData.start_at),
                  startYear: getYearFromDate(educationData.start_at),
                  endDay: getDateFromDate(educationData.end_at),
                  endMonth: getMonthFromDate(educationData.end_at),
                  endYear: getYearFromDate(educationData.end_at),
                  description: educationData.description,
                },
              ],
            }));
          }

        });

      }
    });


    filterOutEmptyNames("school");
    filterOutEmptyNames("college");
    filterOutEmptyNames("university");
  }



  const handleEducation = () => {
    let error = false;
    let success = true;

    axiosInstance.post("api/delete-education")
      .then((res) => {
        if (res.data.status == 200) {

          educationFields.school.map((schoolData) => {
            const data = {
              institute_name: schoolData.name,
              startDay: schoolData.startDay,
              startMonth: schoolData.startMonth,
              startYear: schoolData.startYear,
              endDay: schoolData.endDay,
              endMonth: schoolData.endMonth,
              endYear: schoolData.endYear,
              description: schoolData.description,
              instituteType: 'School',
              institute_id: schoolData.institute_id
            }
            axiosInstance
              .post("api/save-education", data)
              .then((res) => {
                if (res.data.status == 401) {
                  error = true;
                  success = false
                }
              })
          })

          educationFields.college.map((collegeData) => {
            const data = {
              institute_name: collegeData.name,
              startDay: collegeData.startDay,
              startMonth: collegeData.startMonth,
              startYear: collegeData.startYear,
              endDay: collegeData.endDay,
              endMonth: collegeData.endMonth,
              endYear: collegeData.endYear,
              description: collegeData.description,
              instituteType: 'College',
              institute_id: collegeData.institute_id
            }
            axiosInstance
              .post("api/save-education", data)
              .then((res) => {
                if (res.data.status == 401) {
                  error = true;
                  success = false
                }
              })
          })

          educationFields.university.map((universityData) => {
            const data = {
              institute_name: universityData.name,
              startDay: universityData.startDay,
              startMonth: universityData.startMonth,
              startYear: universityData.startYear,
              endDay: universityData.endDay,
              endMonth: universityData.endMonth,
              endYear: universityData.endYear,
              description: universityData.description,
              instituteType: 'Graduate School',
              institute_id: universityData.institute_id
            }
            axiosInstance
              .post("api/save-education", data)
              .then((res) => {
                if (res.data.status == 401) {
                  error = true;
                  success = false
                }
              })
          })


        }
      })



    if (success) {
      toast.success("Education added successfully", {
        position: "top-right",
        style: {
          background: "white",
          color: "black",
        },
      });
    } else {
      toast.warning("Invalid Institute  ", {
        position: "top-right",
        style: {
          background: "white",
          color: "black",
        },
      });
    }

    router.push('/editprofile/' + userName);
  }

  const filterOutEmptyNames = (section) => {

    const filteredSection = educationFields[section].filter(
      (field) => field.name.trim() !== ""
    );
    setEducationFields((prevFields) => ({
      ...prevFields,
      [section]: filteredSection,
    }));

  };

  const sections = ["school", "college", "university"];

  const [searchTerm, setSearchTerm] = useState('');
  const [autoCompleteOptions, setAutoCompleteOptions] = useState([]);

  const fetchData = async (searchTerm) => {
    const postData = {
      searchTerm: searchTerm
    };
    axiosInstance.post('/api/search-institute', postData).then((res) => {
      if (res.data.status == 200) {
        setAutoCompleteOptions(res.data.instituteList);

      }
    })
  };
  console.log(educationFields);
  const handleAutoComplete = (event, newInputValue) => {
    fetchData(newInputValue);
  };



  return (
    <div>
      <div className="education-section">
        <h6>School</h6>

        {educationFields.school.map((field, index) => (

          <form key={field.id} className="row">
            <div className="col col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
              <div className="edu-close-div">
                <svg
                  onClick={() => removeEducationField("school", field.id)}
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-x-circle edu-icon"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                  <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                </svg>
              </div>
            </div>
            <div className="col col-lg-12 col-md-12 col-sm-12 col-12">
              <div className="form-group label-floating">
                {/* <label className="control-label">

                </label> */}

                {/* Autocomplete  */}

                <Autocomplete
                  key={index}
                  id={`autocomplete-search${index}`}
                  options={autoCompleteOptions}
                  defaultValue={{ institute_name: field.name }}
                  getOptionLabel={(option) => option?.institute_name || ''}
                  onInputChange={handleAutoComplete}
                  freeSolo
                  onChange={(e, newValue) => handleOptionSelect('school', index, newValue)}
                  onKeyDown={(e) => handleInputChange('school', index, e)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label=" Education or Workplace Name"
                      variant="outlined"
                      name="name"
                      fullWidth
                    />
                  )}

                // renderOption={(option) => option}
                // renderOption={(option) => option}
                />




                {/* <input
                  className="form-control"
                  placeholder="Education or Workplace Name"
                  type="text"
                  name="name"
                  value={field.name}
                  onChange={(e) => handleInputChange('school', index, e)}
                /> */}
              </div>
            </div>

            <div className="col col-lg-12 col-md-12 col-sm-12 col-12">
              <div className="row">
                <div className="col col-lg-6 col-md-6 col-sm-12 col-12">
                  <label>Start Day </label>
                  <div className="dob-register">
                    <div>
                      <select
                        className="dob-register-day"
                        onChange={(e) => handleInputChange('school', index, e)}
                        value={field.startDay}
                        name="startDay"
                        required
                      >
                        <option value="">Day</option>
                        {generateOptions(1, 31)}
                      </select>
                    </div>
                    <div>
                      <select
                        className="dob-register-month"
                        onChange={(e) => handleInputChange('school', index, e)}
                        value={field.startMonth}
                        name="startMonth"
                        required
                      >
                        <option value="">Month</option>
                        {generateOptions(1, 12)}
                      </select>
                    </div>
                    <div>
                      <select
                        className="dob-register-year"
                        onChange={(e) => handleInputChange('school', index, e)}
                        value={field.startYear}
                        name="startYear"
                        required
                      >
                        <option value="">Year</option>
                        {generateOptionsMinus(currentYear, 1900)}{" "}
                        {/* Choose a suitable range */}
                      </select>
                    </div>
                  </div>
                </div>
                <div className="col col-lg-6 col-md-6 col-sm-12 col-12">
                  <label>End Day</label>
                  <div className="dob-register">
                    <div>
                      <select
                        className="dob-register-day"
                        onChange={(e) => handleInputChange('school', index, e)}
                        value={field.endDay}
                        name="endDay"
                        required
                      >
                        <option value="">Day</option>
                        {generateOptions(1, 31)}
                      </select>
                    </div>
                    <div>
                      <select
                        className="dob-register-month"
                        onChange={(e) => handleInputChange('school', index, e)}
                        value={field.endMonth}
                        name="endMonth"
                        required
                      >
                        <option value="">Month</option>
                        {generateOptions(1, 12)}
                      </select>
                    </div>
                    <div>
                      <select
                        className="dob-register-year"
                        onChange={(e) => handleInputChange('school', index, e)}
                        value={field.endYear}
                        name="endYear"
                        required
                      >
                        <option value="">Year</option>
                        {generateOptionsMinus(currentYear, 1900)}{" "}
                        {/* Choose a suitable range */}
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
              <div className="form-group">
                <textarea
                  className="form-control"
                  placeholder="Description"
                  name="description"
                  value={field.description}
                  onChange={(e) => handleInputChange('school', index, e)}
                />
              </div>
            </div>
          </form>
        ))}
        <div className="edu-icon">
          <p>
            <span onClick={() => addEducationField("school")}>
              + Add More School
            </span>
          </p>
        </div>
      </div>

      <div className="education-section">
        <h6>College</h6>
        {educationFields.college.map((field, index) => (
          <form key={field.id} className="row">
            <div className="col col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
              <div className="edu-close-div">
                <svg
                  onClick={() => removeEducationField("college", field.id)}
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-x-circle mb-2 edu-icon"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                  <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                </svg>
              </div>
            </div>

            <div className="col col-lg-12 col-md-12 col-sm-12 col-12">
              <div className="form-group label-floating">
                {/* <label className="control-label">
                  Education or Workplace Name
                </label>
                <input
                  className="form-control"
                  placeholder="Education or Workplace Name"
                  type="text"
                  name="name"
                  value={field.name}
                  onChange={(e) => handleInputChange('college', index, e)}
                /> */}
                {/* Autocomplete  */}

                <Autocomplete
                  key={index}
                  id={`autocomplete-search${index}`}
                  options={autoCompleteOptions}
                  defaultValue={{ institute_name: field.name }}
                  getOptionLabel={(option) => option?.institute_name || ''}
                  onInputChange={handleAutoComplete}
                  freeSolo
                  onChange={(e, newValue) => handleOptionSelect('college', index, newValue)}
                  onKeyDown={(e) => handleInputChange('college', index, e)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label=" Education or Workplace Name"
                      variant="outlined"
                      name="name"
                      fullWidth
                    />
                  )}
                />
                {/* Endsection  */}

              </div>
            </div>

            <div className="col col-lg-12 col-md-12 col-sm-12 col-12">
              <div className="row">
                <div className="col col-lg-6 col-md-6 col-sm-12 col-12">
                  <label>Start Day </label>
                  <div className="dob-register">
                    <div>
                      <select
                        className="dob-register-day"
                        onChange={(e) => handleInputChange('college', index, e)}
                        value={field.startDay}
                        name="startDay"
                        required
                      >
                        <option value="">Day</option>
                        {generateOptions(1, 31)}
                      </select>
                    </div>
                    <div>
                      <select
                        className="dob-register-month"
                        onChange={(e) => handleInputChange('college', index, e)}
                        value={field.startMonth}
                        name="startMonth"
                        required
                      >
                        <option value="">Month</option>
                        {generateOptions(1, 12)}
                      </select>
                    </div>
                    <div>
                      <select
                        className="dob-register-year"
                        onChange={(e) => handleInputChange('college', index, e)}
                        value={field.startYear}
                        name="startYear"
                        required
                      >
                        <option value="">Year</option>
                        {generateOptionsMinus(currentYear, 1900)}{" "}
                        {/* Choose a suitable range */}
                      </select>
                    </div>
                  </div>
                </div>
                <div className="col col-lg-6 col-md-6 col-sm-12 col-12">
                  <label>End Day</label>
                  <div className="dob-register">
                    <div>
                      <select
                        className="dob-register-day"
                        onChange={(e) => handleInputChange('college', index, e)}
                        value={field.endDay}
                        name="endDay"
                        required
                      >
                        <option value="">Day</option>
                        {generateOptions(1, 31)}
                      </select>
                    </div>
                    <div>
                      <select
                        className="dob-register-month"
                        onChange={(e) => handleInputChange('college', index, e)}
                        value={field.endMonth}
                        name="endMonth"
                        required
                      >
                        <option value="">Month</option>
                        {generateOptions(1, 12)}
                      </select>
                    </div>
                    <div>
                      <select
                        className="dob-register-year"
                        onChange={(e) => handleInputChange('college', index, e)}
                        value={field.endYear}
                        name="endYear"
                        required
                      >
                        <option value="">Year</option>
                        {generateOptionsMinus(currentYear, 1900)}{" "}
                        {/* Choose a suitable range */}
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
              <div className="form-group">
                <textarea
                  className="form-control"
                  placeholder="Description"
                  name="description"
                  value={field.description}
                  onChange={(e) => handleInputChange('college', index, e)}
                />
              </div>
            </div>
          </form>
        ))}
        <div className="edu-icon">
          <p>
            <span onClick={() => addEducationField("college")}>
              + Add More College
            </span>
          </p>
        </div>
      </div>

      <div className="education-section">
        <h6>University</h6>
        {educationFields.university.map((field, index) => (
          <form key={field.id} className="row">
            <div className="col col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
              <div className="edu-close-div">
                <svg
                  onClick={() => removeEducationField("university", field.id)}
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-x-circle mb-2 edu-icon"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                  <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                </svg>
              </div>
            </div>

            <div className="col col-lg-12 col-md-12 col-sm-12 col-12">
              <div className="form-group label-floating">
                {/* <label className="control-label">
                  Education or Workplace Name
                </label>
                <input
                  className="form-control"
                  placeholder="Education or Workplace Name"
                  type="text"
                  name="name"
                  value={field.name}
                  onChange={(e) => handleInputChange('university', index, e)}
                /> */}


                {/* Autocomplete  */}

                <Autocomplete
                  key={index}
                  id={`autocomplete-search${index}`}
                  options={autoCompleteOptions}
                  defaultValue={{ institute_name: field.name }}
                  getOptionLabel={(option) => option?.institute_name || ''}
                  onInputChange={handleAutoComplete}
                  freeSolo
                  onChange={(e, newValue) => handleOptionSelect('university', index, newValue)}
                  onKeyDown={(e) => handleInputChange('university', index, e)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label=" Education or Workplace Name"
                      variant="outlined"
                      name="name"
                      fullWidth
                    />
                  )}
                />
                {/* Endsection  */}

              </div>
            </div>

            <div className="col col-lg-12 col-md-12 col-sm-12 col-12">
              <div className="row">
                <div className="col col-lg-6 col-md-6 col-sm-12 col-12">
                  <label>Start Day </label>
                  <div className="dob-register">
                    <div>
                      <select
                        className="dob-register-day"
                        onChange={(e) => handleInputChange('university', index, e)}
                        value={field.startDay}
                        name="startDay"
                        required
                      >
                        <option value="">Day</option>
                        {generateOptions(1, 31)}
                      </select>
                    </div>
                    <div>
                      <select
                        className="dob-register-month"
                        onChange={(e) => handleInputChange('university', index, e)}
                        value={field.startMonth}
                        name="startMonth"
                        required
                      >
                        <option value="">Month</option>
                        {generateOptions(1, 12)}
                      </select>
                    </div>
                    <div>
                      <select
                        className="dob-register-year"
                        onChange={(e) => handleInputChange('university', index, e)}
                        value={field.startYear}
                        name="startYear"
                        required
                      >
                        <option value="">Year</option>
                        {generateOptionsMinus(currentYear, 1900)}{" "}
                        {/* Choose a suitable range */}
                      </select>
                    </div>
                  </div>
                </div>
                <div className="col col-lg-6 col-md-6 col-sm-12 col-12">
                  <label>End Day</label>
                  <div className="dob-register">
                    <div>
                      <select
                        className="dob-register-day"
                        onChange={(e) => handleInputChange('university', index, e)}
                        value={field.endDay}
                        name="endDay"
                        required
                      >
                        <option value="">Day</option>
                        {generateOptions(1, 31)}
                      </select>
                    </div>
                    <div>
                      <select
                        className="dob-register-month"
                        onChange={(e) => handleInputChange('university', index, e)}
                        value={field.endMonth}
                        name="endMonth"
                        required
                      >
                        <option value="">Month</option>
                        {generateOptions(1, 12)}
                      </select>
                    </div>
                    <div>
                      <select
                        className="dob-register-year"
                        onChange={(e) => handleInputChange('university', index, e)}
                        value={field.endYear}
                        name="endYear"
                        required
                      >
                        <option value="">Year</option>
                        {generateOptionsMinus(currentYear, 1900)}{" "}
                        {/* Choose a suitable range */}
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
              <div className="form-group">
                <textarea
                  className="form-control"
                  placeholder="Description"
                  name="description"
                  value={field.description}
                  onChange={(e) => handleInputChange("university", index, e)}
                />
              </div>
            </div>
          </form>
        ))}
        <div className="edu-icon">
          <p>
            <span onClick={() => addEducationField("university")}>
              + Add More University
            </span>
          </p>
        </div>
      </div>
      <div className="edu-buttons">
        <div className="">
          <button className="btn btn-secondary btn-lg full-width">
            Cancel
          </button>
        </div>
        <div className="">
          <button className="btn btn-primary btn-lg full-width" onClick={handleEducation}>
            Save all Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default EducationExperience;
