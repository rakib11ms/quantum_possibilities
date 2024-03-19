"use client";
import React from "react";
import SearchIcon from "@/app/newsfeed/_svg-components/SearchIcon";
import {host} from "@/environment";
import BackButton from "@/app/newsfeed/_svg-components/BackButton";
import "./FeelingsModal.css";
import {useDispatch} from "react-redux";
import {insertPostData, setLocalPostInfo} from "@/redux/features/GroupPost/groupPostSlice";
import axiosInstance from "../../../../../utils/axios";

function FeelingsModal({setIsOpenModal}) {
  const [allFeelings, setAllFeelings] = React.useState([]);
  const [fileterAllFeelings, setFilterAllFeelings] = React.useState();
  const [searchFeeling, setSearchFeeling] = React.useState([]);

  const handleChange = (event) => {
    const query = event.target.value;
    setSearchFeeling(query);

    let updatedFeeling = [...allFeelings];
    updatedFeeling = updatedFeeling.filter((item) => {
      return item.feeling_name.toLowerCase().indexOf(query.toLowerCase()) !== -1;
    });
    setFilterAllFeelings(updatedFeeling);
  };

  React.useEffect(() => {
    axiosInstance.get(`/api/get-all-feelings`).then((res) => {
      if (res.data.status === 200) {
        setAllFeelings(res.data.postFeelings);
        setFilterAllFeelings(res.data.postFeelings);
      }
    });
  }, []);

 

  return (
    <div className="tas_gif_modal_wrapper">
      <div className="tas_gif_modal_top_part">
        <BackButton setIsOpenModal={setIsOpenModal} />
        <p className="tas_gif_modal_top_title">How are you feeling?</p>
      </div>
      <div className="tas_gif_modal_line"></div>
      <div className="search__done__wrapper tas_gif_modal_searchbar_wrapper">
        <div className="search__wrapper">
          <SearchIcon className={"searchIcon"} />
          <input
            value={searchFeeling}
            onChange={handleChange}
            className="location__search__input"
            type="text"
            placeholder="Search for feeling"
          />
        </div>
      </div>
      <div className="tas_feeling_grid_wrapper">
        {fileterAllFeelings?.map((item) => {
          return (
            <FeelingItem
              feelingName={item.feeling_name}
              feelingId={item._id}
              icon={item.logo}
              setIsOpenModal={setIsOpenModal}
            />
          );
        })}
      </div>
    </div>
  );
}
 const FeelingItem = ({feelingName, icon, feelingId, setIsOpenModal}) => {
    const dispatch = useDispatch();
    return (
      <div
        onClick={() => {
          dispatch(insertPostData({feeling_id: feelingId}));
          dispatch(setLocalPostInfo({feelings: feelingName, feelings_icon: icon}));
          setIsOpenModal({post: true});
        }}
        className="tas_feeling_wrapper"
      >
        <div className="tas_feeling_contaier">
          <img src={`${host}/assets/logo/${icon}`} alt="live-video-icon" className="tas_feeling_img" />
        </div>
        <p className="tas_feeling">{feelingName}</p>
      </div>
    );
  };
export default FeelingsModal;
