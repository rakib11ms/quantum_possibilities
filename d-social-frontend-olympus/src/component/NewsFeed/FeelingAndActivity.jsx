import Modal from "react-modal";
import React, { useEffect, useState } from "react";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";

import axiosInstance from "../../../utils/axios";
import { host } from "@/environment";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

// Feeling & Activity
function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 1 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function FeelingAndActivity({ isFeelingOpen, onRequestClose, sendDataToParent }) {
  const [selectedValue, setSelectedValue] = useState(null);

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };



  const handleOptionSelect = (value) => {
    console.log({ value })
    sendDataToParent({

      activity_type: "Feeling",
      activity_name: value.feeling_name,
      logo:  'logo/'+value.logo,
      feeling_id: value._id

    })
  };

  const handleActivitySelect = (value) => {

    setSelectedValue(value);
    sendDataToParent({
      activity_type: value.activity_name,
      activity_name: '',
      logo: 'activity/' + value.logo
    })
  };


  const handleSubActivitySelect = (value) => {
    setSelectedValue(value);
    sendDataToParent({
      // activity_type: value.activity_id?.activity_name,
      activity_type: value.activity_id?.activity_name || "",

      activity_name: value.sub_activity_name,
      logo: 'activity/' + value.logo,
      activity_id: value.activity_id,
      sub_activity_id: value._id,

    })
  };
  const [feelingAutoCompleteOptions, setFeelingAutoCompleteOptions] = useState([]);
  const [activityAutoCompleteOptions, setActivityAutoCompleteOptions] = useState([]);
  const [subActivityAutoCompleteOptions, setSubActivityAutoCompleteOptions] = useState([]);
  const [isSubModule, setIsSubModule] = useState(false);

  useEffect(() => {
    fetchData("");
    fetchActivityData("");
    setIsSubModule(false)
  }, [isFeelingOpen]);


  const fetchData = async (searchTerm) => {
    const postData = {
      searchTerm: searchTerm,
    };
    axiosInstance.post("/api/search-feelings", postData).then((res) => {
      if (res.data.status == 200) {
        console.log("feeling__", res.data.postFeelings);
        setFeelingAutoCompleteOptions(res.data.postFeelings);
      }
    });
  };

  const fetchActivityData = async (searchTerm) => {
    const postData = {
      searchTerm: searchTerm,
    };
    axiosInstance.post("/api/search-activity", postData).then((res) => {
      if (res.data.status == 200) {
        setActivityAutoCompleteOptions(res.data.postActivity);

      }
    });
  };



  const handleAutoComplete = (event, newInputValue) => {
    fetchData(newInputValue);
  };

  const handleSubActivty = (acitivity_id) => {
    axiosInstance.get("/api/get-subactivity-by-id/" + acitivity_id).then((res) => {
      if (res.data.status == 200) {
        setSubActivityAutoCompleteOptions(res.data.postSubActivity);
        setIsSubModule(true);
      }
    });
  }

  const customStyles = {
    overlay: {
      zIndex: 1001,
      backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    content: {
      maxWidth: "35%",
      height: "60%",
      margin: "auto",
    },
  };
  return (
    <Modal
      isOpen={isFeelingOpen}
      style={customStyles}
      onRequestClose={onRequestClose}
    >
      <div className="row mx-auto">
        <div className="col-md-10">
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              <Tab label="Feelings" {...a11yProps(0)} />
              <Tab label="Activity" {...a11yProps(1)} />
              {/* <Tab
              icon={<PersonPinIcon />}
              label="Item Three"
              {...a11yProps(2)}
            /> */}
            </Tabs>
          </Box>
        </div>
        <div className="col-md-2 d-flex justify-content-end align-items-center">
          <div>
            {/* <button onClick={onRequestClose}>Close</button> */}
            <span onClick={onRequestClose}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="25"
                height="25"
                fill="currentColor"
                class="bi bi-x"
                viewBox="0 0 16 16"
              >
                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
              </svg>
            </span>
          </div>
        </div>
      </div>
      <Box sx={{ width: "100%" }}>
        <CustomTabPanel value={value} index={0}>
          <div className="mb-2">
            <Autocomplete
              id={`autocomplete-activity-search`}
              options={feelingAutoCompleteOptions}
              getOptionLabel={(option) => option?.feeling_name || ''}
              onInputChange={handleAutoComplete}
              freeSolo
              value={selectedValue}
              onChange={(e, newValue) => handleOptionSelect(newValue)}
              // onKeyDown={(e) => handleInputChange('school', index, e)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Search feelings"
                  variant="outlined"
                  id="fullWidth"
                  name="name"
                  fullWidth
                />
              )}

            />
            {/* <TextField fullWidth label="Search-feelings" id="fullWidth" /> */}
          </div>
          <div className="scrollable-tab-panel ">
            <div className="row">
              {feelingAutoCompleteOptions.map((item, index) => (
                <div
                  key={index}
                  className=" col-12 col-sm-12 col-md-6 col-lg-6"
                  onClick={(e) => handleOptionSelect(item)}
                >
                  <div className="feeling-list">
                    <img src={`${host}/assets/logo/${item.logo}`} className="feeling-icon" />
                    <p className="pt-2">{item.feeling_name}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          {isSubModule == false ?
            <>
              <div className="mb-2">

                <Autocomplete
                  id={`autocomplete-activity-search`}
                  options={activityAutoCompleteOptions}
                  getOptionLabel={(option) => option?.activity_name || ''}
                  onInputChange={handleAutoComplete}
                  freeSolo
                  value={selectedValue}
                  onChange={(e, newValue) => handleActivitySelect(newValue)}
                  // onKeyDown={(e) => handleInputChange('school', index, e)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Search activities"
                      variant="outlined"
                      id="fullWidth"
                      name="name"
                      fullWidth
                    />
                  )}

                />

              </div>
              <div className="scrollable-tab-panel ">
                <div className="row">
                  {activityAutoCompleteOptions.map((item, index) => (
                    <div
                      key={index}
                      className=" col-12 col-sm-12 col-md-6 col-lg-6"
                    >
                      <div className="feeling-list" onClick={(e) => handleSubActivty(item._id)}>
                        <img src={`${host}/assets/activity/${item.logo}`} className="feeling-icon" />
                        <p className="pt-2">{item.activity_name}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
            :
            <>
              <div className="mb-2">

                <Autocomplete
                  id={`autocomplete-subactivity-search`}
                  options={subActivityAutoCompleteOptions}
                  getOptionLabel={(option) => option?.sub_activity_name || ''}
                  onInputChange={handleAutoComplete}
                  freeSolo
                  value={selectedValue}
                  onChange={(e, newValue) => handleSubActivitySelect(newValue)}
                  // onKeyDown={(e) => handleInputChange('school', index, e)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Search activities"
                      variant="outlined"
                      id="fullWidth"
                      name="name"
                      fullWidth
                    />
                  )}

                />

              </div>
              <div className="scrollable-tab-panel ">
                <div className="row">
                  {subActivityAutoCompleteOptions.map((item, index) => (
                    <div
                      key={index}
                      className=" col-12 col-sm-12 col-md-6 col-lg-6"
                      onClick={(e) => handleSubActivitySelect(item)}
                    >
                      <div className="feeling-list">
                        <img src={`${host}/assets/activity/${item.logo}`} className="feeling-icon" />
                        <p className="pt-2">{item.sub_activity_name}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          }

        </CustomTabPanel>

      </Box>
    </Modal>
  );
}

export default FeelingAndActivity;
