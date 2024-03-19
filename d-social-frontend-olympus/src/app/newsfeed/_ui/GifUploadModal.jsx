import React from "react";
import "./GifUploadModal.css"
import SearchIcon from "../_svg-components/SearchIcon";
import { host } from "@/environment";
import BackButton from "../_svg-components/BackButton";

export default function GifUploadModal({ setIsOpenModal }) {
  return <div className="tas_gif_modal_wrapper">
    <div className="tas_gif_modal_top_part">
      <BackButton setIsOpenModal={setIsOpenModal} />
      <p className="tas_gif_modal_top_title">Choose a GIF</p>
    </div>
    <div className="tas_gif_modal_line"></div>
    <div className="search__done__wrapper tas_gif_modal_searchbar_wrapper">
      <div className="search__wrapper">
        <SearchIcon className={"searchIcon"} />
        <input className="location__search__input" type="text" placeholder="Search for gif" />
      </div>
    </div>

    <div className="tas_gif_modal_gif_container">
      <img className="tas_gif_modal_gif" src={`${host}/uploads/posts/gif/post_gif_1.gif`} />
      <img className="tas_gif_modal_gif" src={`${host}/uploads/posts/gif/post_gif_2.gif`} />
    </div>
  </div>;
}
