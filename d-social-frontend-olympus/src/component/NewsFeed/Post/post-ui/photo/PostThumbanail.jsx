import React from "react";
import "./PostThumbanail.modules.css";

export default function PostThumbanail({postInformation}) {
  return (
    <div>
      <a href={postInformation.link}>
        <div className="row thumbnail-div">
          <div className="col-md-12">
            <img className="thumb-imgeee" src={postInformation.link_image}  />
          </div>
          <div className="col-md-12 thumbnail-div-content">
            {/* <p className="thumbnail-div-content-margin-top">{postInformation.link}</p> */}
            <p className="thumbnail-div-content-margin-top thumbnail-div-content-title">{postInformation.link_title}</p>
            <p className="thumbnail-div-content-margin-top">{postInformation.link_description}</p>
          </div>
        </div>
      </a>
    </div>
  );
}
