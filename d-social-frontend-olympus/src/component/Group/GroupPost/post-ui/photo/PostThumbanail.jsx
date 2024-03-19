import React from "react";

export default function PostThumbanail({postInformation}) {
  return (
    <div>
      <a href={postInformation.link}>
        <div className="row thumbnail-div">
          <div className="col-md-3">
            <img className="thumb-img" src={postInformation.link_image} height={"120px"} />
          </div>
          <div className="col-md-9 thumbnail-div-content">
            <p className="thumbnail-div-content-margin-top">{postInformation.link}</p>
            <p className="thumbnail-div-content-margin-top thumbnail-div-content-title">{postInformation.link_title}</p>
            <p className="thumbnail-div-content-margin-top">{postInformation.link_description}</p>
          </div>
        </div>
      </a>
    </div>
  );
}
