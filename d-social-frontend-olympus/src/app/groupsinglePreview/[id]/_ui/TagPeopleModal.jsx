import React from "react";
import "@/app/newsfeed/_ui/TagPeopleModal.modules.css";
import Divider from "@/component/Divider";
import { host } from "@/environment";
// import CrossIcon from "./Icons/CrossIcon";
import { addTag } from "@/assets/newsfeed";
import BackButton from "@/app/newsfeed/_svg-components/BackButton";
import SearchIcon from "@/app/newsfeed/_svg-components/SearchIcon";
import axiosInstance from "../../../../../utils/axios";
import CrossIcon from "@/app/newsfeed/_ui/Icons/CrossIcon";

export default function TagPeopleModal({ setIsOpenModal }) {
  const [tagPeople, setTagPeople] = React.useState([]);
  const [fileterTagPeople, setFilterTagPeople] = React.useState();
  const [searchPeople, setSearchPeople] = React.useState([]);
  const userName = JSON.parse(localStorage.getItem("userInfo"))[0].username;

  const [selectedTag, setSelectedTag] = React.useState([]);

  const TagPeople = ({ name, index }) => {
    return (
      <div className="tas_tag_people_container">
        <p className="tas_tag_people">{name}</p>
        <button
          title="delete"
          onClick={() => {
            removeTag(index);
          }}
          className="tas_delete_tag_people"
        >
          <CrossIcon />
        </button>
      </div>
    );
  };

  const addTags = (name) => {
    setSelectedTag([...selectedTag, name]);
  };

  const removeTag = (index) => {
    setSelectedTag([...selectedTag.filter((_, i) => i !== index)]);
  };

  const handleChange = (event) => {
    const query = event.target.value;
    setSearchPeople(query);

    let updatedTagPeople = [...tagPeople];
    updatedTagPeople = updatedTagPeople.filter((item) => {
      return (
        `${item.first_name} ${item.last_name}`
          .toLowerCase()
          .indexOf(query.toLowerCase()) !== -1
      );
    });
    setFilterTagPeople(updatedTagPeople);
  };

  function SuggestedLocation({ profileImg, name }) {
    return (
      <button
        className="tas__tag__name__wrapper"
        onClick={() => {
          addTags(name);
        }}
      >
        {/* <LocationSvg /> */}
        <div className="profile_image">
          <img
            className="profile_image"
            src={`${host}/uploads/${profileImg}`}
          />
        </div>
        <div>
          <p className="tittle">{name}</p>
          {/* <p className="sub_tittle">Dhaka, Dhaka Division, Bangladesh</p> */}
        </div>
      </button>
    );
  }

  React.useEffect(() => {
    const localStorageUserName = localStorage.getItem("username");
    axiosInstance
      .post(`/api/friend-list`, {
        username: userName,
      })
      .then((res) => {
        if (res.data.status === 200) {
          let response = res.data.results;
          response = response.map((item) => {
            if (item.connected_user_id.username !== localStorageUserName) {
              return item.connected_user_id;
            } else {
              return item.user_id;
            }
          });
          setTagPeople(response);
          setFilterTagPeople(response);
        }
      });
  }, []);
  return (
    <div className="location__wrapper">
      <div className="top__wrapper">
        <BackButton setIsOpenModal={setIsOpenModal} />
        <p>Tag People</p>
        <p></p>
      </div>
      <Divider />

      <div className="location__search__wrapper">
        <div className="search__done__wrapper">
          <div className="search__wrapper">
            <SearchIcon className={"searchIcon"} />
            <input
              className="location__search__input"
              value={searchPeople}
              onChange={handleChange}
              type="text"
              placeholder="Search for friends"
            />
          </div>
          <p>Done</p>
        </div>
        <div>
          <p className="suggestion">SUGGESTIONS</p>
          <div className="tas_tag_people_wrapper">
            {selectedTag.map((item, index) => {
              return <TagPeople name={item} index={index} />;
            })}
          </div>
          {fileterTagPeople?.map((item) => {
            return (
              <SuggestedLocation
                profileImg={item.profile_pic ? item.profile_pic : "noimg.jpg"}
                name={`${item.first_name} ${item.last_name}`}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
