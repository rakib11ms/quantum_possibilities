import React from "react";
import { isImage, isVideo } from "../../utils";
import { host } from "@/environment";
import PostPhotoOnly from "../photo/PostPhotoOnly";
import Divider from "@/component/Divider";
import PostThumbanail from "../photo/PostThumbanail";

export default function SharedPost({ post, setPostState, setSelectedImageIndex }) {
   console.log("share__post", post);

   const sharePostInfo = {
      media: post.shareMedia,
      post_id: post?.share_post_id,
      post_holder_user: post?.share_post_id?.user_id,
      share_post: post?.share_post_id,
   };

   return (
      <div
         style={{
            margin: "20px",
         }}
      >
         <>
            <p style={{ marginBottom: "20px" }}>{post?.description}</p>

            <div
               style={{
                  width: "100%",
                  margin: "auto",
                  border: "0.5px solid rgba(112, 112, 112, 0.50)",
                  borderRadius: "8px",
               }}
            >
               {sharePostInfo?.media.length > 0 ? (
                  <PostPhotoOnly postInformation={sharePostInfo} setPostState={setPostState} setSelectedImageIndex={setSelectedImageIndex} />
               ) : null}

               <Divider />

               <div
                  style={{
                     padding: "10px",
                  }}
                  className="profile__picture__name__wrapper"
               >
                  <img src={`${host}/uploads/${sharePostInfo.post_holder_user?.profile_pic}`} className="avatar" />
                  <div>
                     <p>{sharePostInfo.post_holder_user?.first_name + " " + sharePostInfo.post_holder_user?.last_name}</p>
                     <select disabled className="select__option__wrapper" name="status" id="status">
                        <option value="public">Public</option>
                        <option value="friends">Friends</option>
                        <option value="only-me">Only me</option>
                     </select>
                  </div>
               </div>
               <div
                  style={{
                     padding: "10px",
                  }}
               >
                  <p className="">{sharePostInfo.share_post?.description}</p>
                  {post?.share_post_id?.link_image != null && post?.share_post_id?.link_image != "" && <PostThumbanail postInformation={post?.share_post_id} />}
               </div>
            </div>
         </>
      </div>
   );
}
