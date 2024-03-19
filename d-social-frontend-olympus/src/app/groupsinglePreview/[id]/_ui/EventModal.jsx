import React from "react";

import { host } from "@/environment";
// import '/EventModal.css'
import '@/app/newsfeed/_ui/EventModal.css'


import BackButton from "@/app/newsfeed/_svg-components/BackButton";
import SearchIcon from "@/app/newsfeed/_svg-components/SearchIcon";
import HomeIcon from "@/app/newsfeed/_ui/Icons/HomeIcon";
import EducationIcon from "@/app/newsfeed/_ui/Icons/EducationIcon";
import RelationshipIcon from "@/app/newsfeed/_ui/Icons/RelationshipIcon";
import HomeLivingIcon from "@/app/newsfeed/_ui/Icons/HomeLivingIcon";
import FamilyIcon from "@/app/newsfeed/_ui/Icons/FamilyIcon";
import TravelIcon from "@/app/newsfeed/_ui/Icons/TravelIcon";
import InterestIcon from "@/app/newsfeed/_ui/Icons/InterestIcon";
import HealthIcon from "@/app/newsfeed/_ui/Icons/HealthIcon";
import Remembrance from "@/app/newsfeed/_ui/Icons/Remembrance";

export default function EventModal({ setIsOpenModal }) {
  const EventModalItem = ({ title, icon }) => {
    return (
      <button title="Event" className="tas_event_modal_item_container">
        {icon}
        <p className="tas_event_modal_item_title">{title}</p>
      </button>)
  }

  return <div className="tas_event_modal_wrapper">
    <div className="tas_gif_modal_top_part">
      <BackButton setIsOpenModal={setIsOpenModal} />
      <p className="tas_gif_modal_top_title">Create life event</p>
    </div>
    <div className="tas_gif_modal_line"></div>
    <div className="search__done__wrapper tas_gif_modal_searchbar_wrapper">
      <div className="search__wrapper">
        <SearchIcon className={"searchIcon"} />
        <input className="location__search__input" type="text" placeholder="Search for events" />
      </div>
    </div>
    <img src={`${host}/uploads/posts/lifeEvents/life_event.png`} className="" />
    <p className="tas_life_event_text">Share and remember important moments from your life.</p>
    <div className="tas_event_modal_line"></div>
    <p className="tas_event_modal_title">SELECT A CATEGORY</p>
    <div className="tas_event_item_grid_wrapper">
      <EventModalItem icon={<HomeIcon />} title={"Home"} />
      <EventModalItem icon={<EducationIcon />} title={"Education"} />
      <EventModalItem icon={<RelationshipIcon />} title={"Relationship"} />
      <EventModalItem icon={<HomeLivingIcon />} title={"Home & Living"} />
      <EventModalItem icon={<FamilyIcon />} title={"Family"} />
      <EventModalItem icon={<TravelIcon />} title={"Travel"} />
      <EventModalItem icon={<InterestIcon />} title={"Interests & Activities"} />
      <EventModalItem icon={<HealthIcon />} title={"Health & Wellness"} />
      <EventModalItem icon={<Remembrance />} title={"Remembrance"} />
    </div>
  </div>;
}
