import React from "react";
import "@/app/newsfeed/_ui/LocationModal.modules.css";


import Divider from "@/component/Divider";
import axiosInstance from "../../../../../utils/axios";
import BackButton from "@/app/newsfeed/_svg-components/BackButton";
import LocationSvg from "@/app/newsfeed/_svg-components/location";
import { useDispatch } from "react-redux";
import { insertPostData, setLocalPostInfo } from "@/redux/features/GroupPost/groupPostSlice";

export default function LocationModal({ setIsOpenModal }) {
  const [location, setLocation] = React.useState([]);
  const [fileterLocation, setFilterLocation] = React.useState();
  const [searchLocation, setSearchLocation] = React.useState([]);

  const handleChange = (event) => {
    const query = event.target.value;
    setSearchLocation(query);
    setFilterLocation(location.filter((item) => item.location_name.toLowerCase().includes(query.toLowerCase())))
  }

  React.useEffect(() => {
    axiosInstance
      .post(`/api/search-location`, {
        searchTerm: ""
      })
      .then((res) => {
        if (res.data.status === 200) {
          setLocation(res.data.allLocation)
          setFilterLocation(res.data.allLocation)
        }
      });
  }, [])
  return (
    <div className="location__wrapper">
      <div className="top__wrapper">
        <BackButton setIsOpenModal={setIsOpenModal} />
        <p>Search for Location</p>
        <p></p>
      </div>
      <Divider />

      <div className="location__search__wrapper">
        <input className="location__search__input" value={searchLocation} onChange={handleChange} type="text" placeholder="Search for location" />
        <p className="suggestion">SUGGESTIONS</p>
        {fileterLocation?.map(item => {
          return <SuggestedLocation item={item} setIsOpenModal={setIsOpenModal} />
        })}
      </div>
    </div>
  );
}

function SuggestedLocation({ item, setIsOpenModal }) {
  const dispatch = useDispatch();
  return (
    <div className="location__name__wrapper"
      onClick={() => {
        dispatch(insertPostData({ location_id: item._id }));
        dispatch(setLocalPostInfo({ location: item.location_name }));
        setIsOpenModal({ post: true });
      }}
    >
      <LocationSvg />
      <div>
        <p className="tittle">{item.location_name}</p>
      </div>
    </div>
  );
}
