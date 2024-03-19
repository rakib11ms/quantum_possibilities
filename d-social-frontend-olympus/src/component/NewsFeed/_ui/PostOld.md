 <article className="hentry post video  " key={i}>
            <div className="post__author author vcard inline-items">
              {/* <img src={feedauthtwo.src} alt="author" /> */}
              {item.user_id.profile_pic !== null ? (
                <div className="author-thumbs">
                  <div className="more">
                    {/* <div>
                                    <span className="post-qp-points">1000 QPoints </span>
                                </div> */}
                    <div>
                      {item.page_id != null ? (
                        <img
                          src={`${host}/uploads/pages/${item.page_id?.profile_pic}`}
                          alt=""
                          className="avatar "
                          style={{
                            width: "35px",
                            height: "35px",
                            borderRadius: "50%",
                            objectFit: "contain",
                          }}
                        />
                      ) : (
                        <img
                          src={`${host}/uploads/${item.user_id.profile_pic}`}
                          alt=""
                          className="avatar "
                          style={{
                            width: "35px",
                            height: "35px",
                            borderRadius: "50%",
                            objectFit: "contain",
                          }}
                        />
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="author-thumbs">
                  <img
                    src="https://www.kindpng.com/picc/m/24-248253_user-profile-default-image-png-clipart-png-download.png"
                    className="avatar "
                    style={{
                      width: "35px",
                      height: "35px",
                      borderRadius: "50%",
                      objectFit: "contain",
                    }}
                  />
                </div>
              )}

              <div className="author-date">
                {/* <a className="h6 post__author-name fn" href="#">
                                        {`${item.user_id.first_name} ${item.user_id.last_name}`}
                                    </a>{" "} */}
                {/* shared a <a href="#">link</a> */}
                <h6>
                  {item.page_id != null ? (
                    <Link className="h6 post__author-name fn" href={`pagePublicView/${item.page_id?.page_user_name}`}>
                      {item.page_id?.page_name}
                    </Link>
                  ) : (
                    <Link className="h6 post__author-name fn" href={`profile/${item.user_id.username}`}>
                      {`${item.user_id.first_name} ${item.user_id.last_name}`}
                    </Link>
                  )}

                  {item.activity_id !== null && item.activity_id.logo !== "" ? (
                    <img
                      src={`${host}/assets/activity/${item.activity_id.logo}`}
                      className="feeling-icon"
                      alt="Activity Icon"
                    />
                  ) : null}

                  {item.feeling_id !== null && item.feeling_id.logo !== "" ? (
                    <span>
                      {" Feeling "}
                      <img
                        src={`${host}/assets/logo/${item.feeling_id.logo}`}
                        className="feeling-icon"
                        alt="Feeling Icon"
                      />
                      {` ${item.feeling_id.feeling_name}`}
                    </span>
                  ) : null}

                  {item.activity_id !== null && item.activity_id.activity_name !== "" ? (
                    <span>{` is celebrating`}</span>
                  ) : null}

                  {item.location_id !== null ? <span>{` at ${item.location_id.location_name}`}</span> : null}
                </h6>
                {item.post_type == "profile_picture" ? (
                  <span className="mx-1 fw-400">has changed profile picture</span>
                ) : item.post_type == "cover_picture" ? (
                  <span className="mx-1 fw-400">has changed cover picture</span>
                ) : (
                  ""
                )}

                {item.post_type == "Shared" ? <span className="mx-1 fw-400">has shared a post</span> : ""}

                <div className="d-flex align-items-center">
                  <div className="post__date ">
                    <time className="published" dateTime="2004-07-24T18:18">
                      {/* March 4 at 2:05pm */}
                      {/* {moment(item.createdAt).format('LLL')} */}
                      {formatDate(item.createdAt)}
                    </time>
                  </div>
                  <div
                    key={item._id}
                    className="mx-2 "
                    class={item.user_id._id !== userId ? "post-privacy-trigger" : ""}
                  >
                    <FormControl
                      size="small"
                      fullWidth
                      sx={{
                        "& fieldset": {border: "none"},
                      }}
                    >
                      {/* <InputLabel id="privacy-label">Privacy</InputLabel> */}
                      <Select
                        labelId={`privacy-label-${item._id}`}
                        id={`privacy-select-${item._id}`}
                        value={selectedOption.find((option) => option.id === item._id)?.post_privacy || "public"}
                        onChange={(e) => handlePostPrivacyChange(item._id, e.target.value)}
                        // label="Privacy"
                        // onChange={(e) => handlePostPrivacyChange(item._id, e.target.value)}
                        style={{
                          fontSize: "12px",
                          backgroundColor: "white",
                          "& .MuiSelect-select:focus": {
                            border: "none !important",
                            outline: "none !important",
                          },
                          "& .MuiFilledInput-root": {
                            border: "none !important",
                          },
                        }}
                        sx={{
                          "& fieldset": {border: "none"},
                        }}
                      >
                        {options.map((option) => (
                          <MenuItem
                            key={option.value}
                            value={option.value}
                            style={{
                              fontSize: "12px",
                              "& .MuiSelect-select": {
                                border: "none",
                                backgroundColor: "white",
                                outline: "0",
                              },
                            }}
                          >
                            <span class=""> {option.icon}</span>
                            <span class="mx-1"> {option.label}</span>
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </div>
                </div>
              </div>

              <div className="more">
                <div>
                  <Image src={threedot.src} width="5" height="5" className="threedotsvg" />
                  <ul className="more-dropdown">
                    {userId == item.user_id._id ? (
                      <>
                        <li>
                          <Link href={`edit-post/` + item._id}>Edit Post</Link>
                        </li>
                        <li>
                          <a href="#" type="button" onClick={() => deletePost(item._id)}>
                            Delete Post
                          </a>
                        </li>
                      </>
                    ) : (
                      <></>
                    )}

                    <li>
                      <a href="#">Turn Off Notifications</a>
                    </li>
                    <li>
                      <a href="#">Select as Featured</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="">
              <p dangerouslySetInnerHTML={{__html: item.description}} />
            </div>

            <div className="post-videos">
              {item.media.length !== undefined && item.media.length >= 1 && (
                <div className="post-multiple-image-video ">
                  {item.media.map((imageItem, imageIndex) => {
                    if (isImage(imageItem.media)) {
                      // This is an image.
                      return (
                        // <Image
                        //     src={`${host}/uploads/posts/${imageItem.media}`}
                        //     width="400"
                        //     height="400"
                        //     className="inner"
                        //     loading="lazy"
                        //     onClick={(e) => console.log('clicked image', imageItem.media)}
                        // />

                        // <Link
                        //   href={`/posts/${userName}/photos/${imageItem.post_id}/${imageItem.media}`} >

                        <div
                          className={`${
                            item.media.length > 1
                              ? "post-multiple-image-video-item"
                              : item.media.length === 1
                              ? "one-item"
                              : ""
                          }`}
                        >
                          {/* <Image
                                                                src={`${host}/uploads/posts/${imageItem.media}`}
                                                                width="400"
                                                                height="400"
                                                                className="img1"
                                                                loading="lazy"
                                                                onClick={(e) => console.log('clicked image', imageItem.media)}
                                                            /> */}
                          <img
                            src={`${host}/uploads/posts/${imageItem.media}`}
                            // width='400'
                            // height='400'
                            onClick={(e) => console.log("clicked image", imageItem.media)}
                          />
                        </div>
                        // </Link>

                        // <img src={`${host}/uploads/posts/${imageItem.media}`} className="" key={imageIndex} />
                      );
                    } else if (isVideo(imageItem.media)) {
                      // This is a video.
                      return (
                        <div
                          className="post-multiple-image-video-item"
                          key={imageIndex}
                          onClick={(e) => console.log("clicked video", imageItem.media)}
                        >
                          {" "}
                          {/* <Link
                            href={`/posts/${userName}/videos/${imageItem.post_id}/${imageItem.media}`}> */}
                          <video
                            controls
                            // poster={`${host}/uploads/posts/${imageItem.image}`}
                            src={`${host}/uploads/posts/${imageItem.media}`}
                            key={imageIndex}
                            // onClick={() => handleVideoClick(imageItem)}
                            className="one-more-videos "
                            lazy
                            controlsList="nodownload"
                            onClick={(e) => console.log("clicked video", imageItem.media)}
                          >
                            <source
                              src={`${host}/uploads/posts/${imageItem.media}`}
                              type="video/mp4"
                              onClick={(e) => console.log("clicked video", imageItem.media)}
                            />
                            Your browser does not support the video tag.
                          </video>
                          {/* </Link> */}
                        </div>
                      );
                    }
                    return null;
                  })}
                </div>
              )}

              {/* {playingVideo && (
                                    <div className="video-overlay" onClick={handleCloseVideo}>
                                        <button className="close-button" onClick={handleCloseVideo}>
                                            &times;
                                        </button>
                                        <video autoPlay controls className="fullscreen-video">
                                            <source src={`${host}/uploads/posts/${playingVideo}`} type="video/mp4" />
                                        </video>
                                    </div>
                                )} */}
            </div>
            {item.post_type == "Shared" ? (
              <div className="pst-img-full-div">
                <div>
                  {item?.shareMedia?.length !== undefined && item?.shareMedia?.length >= 1 && (
                    <div className="post-share-multiple-image-video ">
                      {item?.shareMedia?.map((imageItem, imageIndex) => {
                        if (isImage(imageItem.media)) {
                          return (
                            <div
                              className={`${
                                item?.shareMedia?.length > 1
                                  ? "post-share-multiple-image-video-item"
                                  : item?.shareMedia?.length === 1
                                  ? "one-item"
                                  : ""
                              }`}
                            >
                              <img
                                src={`${host}/uploads/posts/${imageItem.media}`}
                                className="pst-img"
                                onClick={(e) => console.log("clicked image", imageItem.media)}
                              />
                            </div>
                          );
                        } else if (isVideo(imageItem.media)) {
                          // This is a video.
                          return (
                            <div
                              className="post-share-multiple-image-video-item"
                              key={imageIndex}
                              onClick={(e) => console.log("clicked video", imageItem.media)}
                            >
                              {" "}
                              <video
                                controls
                                // poster={`${host}/uploads/posts/${imageItem.image}`}
                                src={`${host}/uploads/posts/${imageItem.media}`}
                                key={imageIndex}
                                className="one-more-videos "
                                lazy
                                controlsList="nodownload"
                                onClick={(e) => console.log("clicked video", imageItem.media)}
                              >
                                <source
                                  src={`${host}/uploads/posts/${imageItem.media}`}
                                  type="video/mp4"
                                  onClick={(e) => console.log("clicked video", imageItem.media)}
                                />
                                Your browser does not support the video tag.
                              </video>
                            </div>
                          );
                        }
                        return null;
                      })}
                    </div>
                  )}
                </div>
                <div className="post-img-auth-img-div">
                  <div className="id-img-name-div">
                    <div>
                      {item?.share_post_id?.user_id?.profile_pic !== null ? (
                        <img
                          src={`${host}/uploads/${item?.share_post_id?.user_id?.profile_pic}`}
                          className="modalAuth-img"
                          width={40}
                          height={40}
                        />
                      ) : (
                        <img
                          src="https://www.kindpng.com/picc/m/24-248253_user-profile-default-image-png-clipart-png-download.png"
                          className="comment-header-image-person"
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                          }}
                        />
                      )}
                    </div>
                    <div className="modal-min-text-div">
                      <h5>
                        {item?.share_post_id?.user_id?.first_name} {item?.share_post_id?.user_id?.last_name}
                      </h5>
                      <p className="modal-min-text">{formatDate(item?.share_post_id?.createdAt)}</p>
                    </div>
                  </div>

                  <div>
                    <p className="post-p-text" dangerouslySetInnerHTML={{__html: item.share_post_id.description}} />
                  </div>
                </div>
              </div>
            ) : (
              ""
            )}

            {/* onClick={(e) => handlePostClick(e, item._id)} */}
            <hr className="my-0" />
            <div className="reaction-count d-flex justify-content-between align-items-center">
              <div className="d-flex align-items-center  " onClick={(e) => openWhoesReactOnPostModal(e, item._id)}>
                <div className="">
                  <img src="/logo/like.png" className="" style={{width: "35px"}} />
                </div>

                <div className="px-0">
                  <img src="/logo/love.png" style={{width: "21px"}} />
                </div>
                <div className=" mx-1 mb-1">
                  <span className="fw-bold"> {`(${item.reactionCount})`}</span>
                  {/* <span className='fw-bold'>(220)</span> */}
                </div>
              </div>

              <div className="d-flex align-items-center">
                <div className="d-flex align-items-center">
                  <div>{item.totalComments}</div>
                  <div className="">
                    <Image className="mx-2 " src={commentSvg.src} width="13" height="13" />
                  </div>
                </div>
                <div className="mx-3">
                  {item.postShareCount}
                  <Image className="mx-2" src={shareSvg.src} width="16" height="16" />
                </div>
              </div>
            </div>

            <hr className="my-0" />

            <div className="reaction-container  my-0 px-1" style={{background: "#f2f2f2"}}>
              {isHovered && (
                <div
                  className="d-flex "
                  onMouseEnter={() => {
                    setIsHovered(true);
                  }}
                  onMouseLeave={() => setIsHovered(false)}
                >
                  <figure
                    className="post-reaction-icons mt-1"
                    onClick={(e) => {
                      setReactionPostId(item._id);
                    }}
                  >
                    <img
                      src={`${host}/assets/reactions/like.gif`}
                      alt="Like emoji"
                      onClick={() => {
                        console.log("like reactions button clicked");
                        setPostReactionCurrentType("like");
                      }}
                    />
                    <img
                      src={`${host}/assets/reactions/love.gif`}
                      onClick={() => {
                        console.log("love reactions button clicked");
                        setPostReactionCurrentType("love");
                      }}
                      alt="Love emoji"
                    />
                    <img
                      src={`${host}/assets/reactions/haha.gif`}
                      onClick={() => {
                        console.log("hahah reactions button clicked");
                        setPostReactionCurrentType("haha");
                      }}
                      alt="Haha emoji"
                    />
                    <img
                      src={`${host}/assets/reactions/wow.gif`}
                      onClick={() => {
                        console.log("wow reactions button clicked");
                        setPostReactionCurrentType("wow");
                      }}
                      alt="Wow emoji"
                    />
                    <img
                      src={`${host}/assets/reactions/sad.gif`}
                      onClick={() => {
                        console.log("sad reactions button clicked");
                        setPostReactionCurrentType("sad");
                      }}
                      alt="Sad emoji"
                    />
                    <img
                      src={`${host}/assets/reactions/angry.gif`}
                      onClick={() => {
                        console.log("angry reactions button clicked");
                        setPostReactionCurrentType("angry");
                      }}
                      alt="Angry emoji"
                    />
                  </figure>
                </div>
              )}

              <div className="d-flex justify-content-between align-items-center pb-1 my-0" style={{cursor: "pointer"}}>
                <div
                  className="cursor-pointer  d-flex align-items-center"
                  onMouseEnter={() => {
                    setIsHovered(true);
                  }}
                  onMouseLeave={() => setIsHovered(false)}
                >
                  {userHasReacted ? (
                    // User has reacted, display the reaction image
                    allMainPostReactions
                      .filter((reaction) => reaction.post_id === item._id)
                      .map((reaction) => (
                        <img
                          key={reaction.reaction_id}
                          className="reaction-icon"
                          src={getReactionImageSrc(reaction.reaction_type)}
                          alt={`${reaction.reaction_type} emoji`}
                        />
                      ))
                  ) : (
                    // User hasn't reacted, display "Like" text button
                    <div className="mx-1" onClick={() => handleReactionSelect("like", item._id)}>
                      Like
                    </div>
                  )}
                </div>
                <div
                  className="d-flex "
                  // onClick={() => { setCommentTabIconClick(true) }}
                  // onMouseLeave={() => setCommentTabIconClick(false)}

                  // onClick={(e) => openModal(e, item._id)}
                >
                  <div>
                    <Image className="mx-1 " src={commentSvg.src} width="16" height="16" />
                  </div>
                  <div className="mx-1">Comment</div>
                </div>
                <div className="">
                  <Image className="mx-2" src={shareSvg.src} width="16" height="16" />
                  <span
                    // className='dropdown-toggle'
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    {" "}
                    Share
                  </span>

                  <ul class="dropdown-menu abt-drops">
                    <li>
                      <div
                        className="share-popup"
                        onClick={() => {
                          shareToPublic(item._id);
                        }}
                      >
                        <span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="13"
                            height="13"
                            viewBox="0 0 18 16"
                            fill="#344054"
                          >
                            <path
                              d="M16 15.7004V11.2378C16 10.3082 15.7083 9.51791 15.125 8.86712C14.5417 8.21633 13.8333 7.89094 13 7.89094H3.825L7.425 11.9072L6 13.4691L0 6.7753L6 0.0814819L7.425 1.64337L3.825 5.65967H13C14.3833 5.65967 15.5625 6.20354 16.5375 7.29128C17.5125 8.37903 18 9.69455 18 11.2378V15.7004H16Z"
                              fill="#344054"
                            />
                          </svg>
                        </span>
                        <span className="share-text">Share now (Public)</span>
                      </div>
                    </li>
                    <li onClick={handleOpen}>
                      <div
                        className="share-popup"
                        onClick={() => {
                          setSharePost(item);
                        }}
                      >
                        <span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="#344054"
                            class="bi bi-pencil-square"
                            viewBox="0 0 16 16"
                          >
                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                            <path
                              fill-rule="evenodd"
                              d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"
                            />
                          </svg>
                        </span>
                        <span className="share-text">Share to Feed</span>
                      </div>
                    </li>
                  </ul>
                </div>
                <Modal
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <Box sx={style}>
                    <div className="share-modal-full-div">
                      <div className="row share-modal-header">
                        <div className="col-12 col-sm-4 col-md-4 col-lg-4 col-xl-4"></div>
                        <div className="col-12 col-sm-4 col-md-4 col-lg-4 col-xl-4">
                          <span className="share-modal-tages">Share post</span>
                        </div>
                        <div className="col-12 col-sm-4 col-md-4 col-lg-4 col-xl-4">
                          <span className="close-icon" onClick={handleClose}>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="30"
                              height="30"
                              viewBox="0 0 30 30"
                              fill="none"
                            >
                              <circle cx="15" cy="15" r="11.25" fill="#7E869E" fill-opacity="0.25" />
                              <path
                                d="M20 10L10 20"
                                stroke="#222222"
                                stroke-width="1.2"
                                stroke-linecap="square"
                                stroke-linejoin="round"
                              />
                              <path
                                d="M10 10L20 20"
                                stroke="#222222"
                                stroke-width="1.2"
                                stroke-linecap="square"
                                stroke-linejoin="round"
                              />
                            </svg>
                          </span>
                        </div>
                      </div>
                      <hr className="share-modal-header" />

                      <div className="id-img-name-full-div">
                        <div className="id-img-name-div">
                          <div>
                            {profileImage !== null ? (
                              <img src={`${host}/uploads/${profileImage}`} className="comment-header-image-person" />
                            ) : (
                              <img
                                src="https://www.kindpng.com/picc/m/24-248253_user-profile-default-image-png-clipart-png-download.png"
                                className="comment-header-image-person"
                                style={{
                                  width: "100%",
                                  height: "100%",
                                  objectFit: "cover",
                                }}
                              />
                            )}
                          </div>
                          <div className="modal-privancy-div">
                            <h5>{fullName}</h5>
                            <div className="modal-privancy-dropdown">
                              <FormControl
                                size="small"
                                fullWidth
                                sx={{
                                  "& fieldset": {border: "none"},
                                }}
                              >
                                {/* <InputLabel id="privacy-label">Privacy</InputLabel> */}
                                <Select
                                  labelId={`privacy-label-${item._id}`}
                                  id={`privacy-select-${item._id}`}
                                  value={"public"}
                                  onChange={(e) => {
                                    setSingleSharePost((prevData) => ({
                                      ...prevData,
                                      privacy: e.target.value,
                                    }));
                                  }}
                                  style={{
                                    fontSize: "12px",
                                    backgroundColor: "white",
                                    "& .MuiSelect-select:focus": {
                                      border: "none !important",
                                      outline: "none !important",
                                    },
                                    "& .MuiFilledInput-root": {
                                      border: "none !important",
                                    },
                                  }}
                                  sx={{
                                    "& fieldset": {border: "none"},
                                  }}
                                >
                                  {options.map((option) => (
                                    <MenuItem
                                      key={option.value}
                                      value={option.value}
                                      style={{
                                        fontSize: "12px",
                                        "& .MuiSelect-select": {
                                          border: "none",
                                          backgroundColor: "white",
                                          outline: "0",
                                        },
                                      }}
                                    >
                                      <span class=""> {option.icon}</span>
                                      <span class="mx-1"> {option.label}</span>
                                    </MenuItem>
                                  ))}
                                </Select>
                              </FormControl>
                            </div>
                          </div>
                        </div>

                        <div>
                          <input
                            className="modal-post-input"
                            type="text"
                            onChange={(e) => {
                              setSingleSharePost((prevData) => ({
                                ...prevData,
                                description: e.target.value,
                              }));
                            }}
                            placeholder={`What's on your mind, ${fullName}?`}
                          />
                        </div>
                        <div className="pst-img-full-div">
                          <div>
                            {sharePost?.media?.length !== undefined && sharePost?.media?.length >= 1 && (
                              <div className="post-share-multiple-image-video ">
                                {sharePost?.media?.map((imageItem, imageIndex) => {
                                  if (isImage(imageItem.media)) {
                                    return (
                                      <div
                                        className={`${
                                          sharePost?.media?.length > 1
                                            ? "post-share-multiple-image-video-item"
                                            : sharePost?.media?.length === 1
                                            ? "one-item"
                                            : ""
                                        }`}
                                      >
                                        <img
                                          src={`${host}/uploads/posts/${imageItem.media}`}
                                          className="pst-img"
                                          onClick={(e) => console.log("clicked image", imageItem.media)}
                                        />
                                      </div>
                                    );
                                  } else if (isVideo(imageItem.media)) {
                                    // This is a video.
                                    return (
                                      <div
                                        className="post-share-multiple-image-video-item"
                                        key={imageIndex}
                                        onClick={(e) => console.log("clicked video", imageItem.media)}
                                      >
                                        {" "}
                                        <video
                                          controls
                                          // poster={`${host}/uploads/posts/${imageItem.image}`}
                                          src={`${host}/uploads/posts/${imageItem.media}`}
                                          key={imageIndex}
                                          className="one-more-videos "
                                          lazy
                                          controlsList="nodownload"
                                          onClick={(e) => console.log("clicked video", imageItem.media)}
                                        >
                                          <source
                                            src={`${host}/uploads/posts/${imageItem.media}`}
                                            type="video/mp4"
                                            onClick={(e) => console.log("clicked video", imageItem.media)}
                                          />
                                          Your browser does not support the video tag.
                                        </video>
                                      </div>
                                    );
                                  }
                                  return null;
                                })}
                              </div>
                            )}
                          </div>
                          <div className="post-img-auth-img-div">
                            <div className="id-img-name-div">
                              <div>
                                {sharePost?.user_id?.profile_pic !== null ? (
                                  <img
                                    src={`${host}/uploads/${sharePost?.user_id?.profile_pic}`}
                                    className="modalAuth-img"
                                    width={40}
                                    height={40}
                                  />
                                ) : (
                                  <img
                                    src="https://www.kindpng.com/picc/m/24-248253_user-profile-default-image-png-clipart-png-download.png"
                                    className="comment-header-image-person"
                                    style={{
                                      width: "100%",
                                      height: "100%",
                                      objectFit: "cover",
                                    }}
                                  />
                                )}
                              </div>
                              <div className="modal-min-text-div">
                                <h5>
                                  {sharePost?.user_id?.first_name} {sharePost?.user_id?.last_name}
                                </h5>
                                <p className="modal-min-text">{formatDate(sharePost?.createdAt)}</p>
                              </div>
                            </div>

                            <div>
                              <p className="post-p-text" dangerouslySetInnerHTML={{__html: sharePost.description}} />
                            </div>
                          </div>
                        </div>
                        <div className="post-modal-btn-div">
                          <button
                            onClick={(e) => {
                              saveSharePost(sharePost?._id);
                            }}
                            className="post-modal-btn"
                          >
                            Share Post
                          </button>
                        </div>
                      </div>
                    </div>
                  </Box>
                </Modal>
              </div>
            </div>

            <div className="comment-section py-2  ">
              <div
                className={`comment-section-wrapper bg-white ${
                  item.comments.length > 1
                    ? "comment-scrollbar"
                    : item.comments.length === 0
                    ? "comment-scrollbar-default"
                    : ""
                }`}
              >
                <div className="comment-header-with-form">
                  <div className="comment-header-image ">
                    {profileImage !== null ? (
                      // <Image
                      //   className='comment-icon'
                      //   src={`${host}/uploads/${profileImage}`}
                      //   width={30}
                      //   height={25}
                      //   alt=''
                      // />
                      <img src={`${host}/uploads/${profileImage}`} className="comment-header-image-person" />
                    ) : (
                      <img
                        src="https://www.kindpng.com/picc/m/24-248253_user-profile-default-image-png-clipart-png-download.png"
                        className="comment-header-image-person"
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                    )}
                  </div>

                  <div className="w-100 main-comment-div ">
                    <form onSubmit={(e) => handleCommentSubmit(e, item._id)}>
                      <textarea
                        id="scrollstyle"
                        placeholder="Type your comment!"
                        className="external-class  px-3 "
                        value={commentTextState[item._id] || ""}
                        onChange={(e) => {
                          const postId = item._id;
                          const newText = e.target.value;
                          setCommentTextState((prevState) => ({
                            ...prevState,
                            [postId]: newText,
                          }));
                        }}
                        onKeyDown={(e) => handleKeyDown(e, item._id)}
                      />
                    </form>

                    <div className="comments-icons d-flex px-1">
                      <div className="">
                        <label htmlFor="formFileSm" className="form-label">
                          <FontAwesomeIcon icon={faPhotoVideo} style={{fontSize: 16, cursor: "pointer"}} />
                        </label>
                        <input
                          className="form-control form-control-sm"
                          id="formFileSm"
                          accept="image/*, video/*"
                          type="file"
                          onChange={(e) => {
                            handleCommentImageVideo(e, item._id, "main_comment");
                          }}
                        />
                      </div>

                      {commentImageOrVideoFile && (
                        <div className="mx-2 " onClick={submitMainCommentWithImageOrVideo}>
                          <FontAwesomeIcon
                            icon={faPaperPlane}
                            className="mx-1"
                            style={{cursor: "pointer", marginTop: "-20px"}}
                          />
                        </div>
                      )}
                    </div>

                    {commentImageOrVideoFile && commenttype == "main_comment" && postid == item._id && (
                      <div className="comment-image-or-video-portion-render">
                        {/* wqeqw */}
                        <div className="cross-icon-comment-or-video" onClick={() => setCommentImageOrVideoFile(null)}>
                          X
                        </div>

                        {commentImageOrVideoFile && commentImageOrVideoFile.type.startsWith("image/") && (
                          <img src={URL.createObjectURL(commentImageOrVideoFile)} />
                        )}
                        {commentImageOrVideoFile.type.startsWith("video/") && (
                          // <video width="200" height="200" controls>
                          <video controls>
                            <source
                              key={commentImageOrVideoFile.name}
                              src={URL.createObjectURL(commentImageOrVideoFile)}
                              type={commentImageOrVideoFile.type}
                            />
                            Your browser does not support the video tag.
                          </video>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {item.comments.map((commentitem, commentIndex) => {
                  return (
                    <div
                      className="main-comment-wrapper  py-1 px-2 border  "
                      scrollstyleReply
                      style={{backgroundColor: "#f1f1f1"}}
                    >
                      {commentitem.user_id.profile_pic !== null ? (
                        // <img src={`${ host } / uploads / ${ profileImage }`} alt="" />
                        // <Image className='reply-icon' src={`${host}/uploads/${item.user_id.profile_pic}`} width={25} height={25} alt='' />
                        <img
                          className="main-comment-person-image-1"
                          src={`${host}/uploads/${commentitem.user_id.profile_pic}`}
                          alt=""
                        />
                      ) : (
                        <img
                          src="https://www.kindpng.com/picc/m/24-248253_user-profile-default-image-png-clipart-png-download.png"
                          className="main-comment-person-image-1"
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                          }}
                        />
                      )}

                      <div className="main-comment-text">
                        <div className="d-flex justify-content-between ">
                          <div className="comment-txt-person-name">
                            <span className="">{`${commentitem.user_id.first_name} ${commentitem.user_id.last_name}`}</span>
                          </div>
                          <div className="">{timeFormat(commentitem.createdAt)}</div>
                        </div>

                        {isLoading === true && editMainCommentId !== commentitem._id
                          ? "Loading..."
                          : editMainCommentId !== commentitem._id && (
                              <>
                                <div className="comment-txt ">
                                  <span className="py-2">{commentitem.comment_name}</span>
                                </div>

                                {commentitem.image_or_video !== null && (
                                  <div className="view-comment-image-video-image mt-1" key={commentitem.image_or_video}>
                                    {commentitem.image_or_video.endsWith(".jpg") ||
                                    commentitem.image_or_video.endsWith(".jpeg") ||
                                    commentitem.image_or_video.endsWith(".png") ? (
                                      <img src={`${host}/${commentitem.image_or_video}`} alt="Comment Image" />
                                    ) : commentitem.image_or_video.endsWith(".mp4") ||
                                      commentitem.image_or_video.endsWith(".webm") ||
                                      commentitem.image_or_video.endsWith(".ogg") ? (
                                      <video controls>
                                        <source
                                          key={commentitem.image_or_video}
                                          src={`${host}/${commentitem.image_or_video}`}
                                          type="video/mp4"
                                        />
                                        Your browser does not support the video tag.
                                      </video>
                                    ) : null}
                                  </div>
                                )}
                              </>
                            )}

                        {/* if someone wants edit main comment */}
                        {editMainCommentStatus && editMainCommentId == commentitem._id && (
                          <div className="">
                            <textarea
                              id="scrollstyle"
                              placeholder="Type your comment!"
                              className="external-class  px-3 border"
                              onChange={(e) => setEditMainCommentData(e.target.value)}
                              onKeyDown={(e) => {
                                if (e.key === "Enter" && !e.shiftKey) {
                                  e.preventDefault();
                                  const formData = new FormData();
                                  formData.append("comment_type", "main_comment");
                                  formData.append("comment_name", editCommentData);
                                  formData.append("image_or_video", editcommentImageOrVideoFile);

                                  axiosInstance
                                    .post(
                                      `api/update-comments-by-direct-post/${editMainCommentPostId}/${editMainCommentId}`,
                                      formData,
                                      {
                                        headers: {
                                          "Content-Type": "multipart/form-data",
                                        },
                                      }
                                    )
                                    .then((res) => {
                                      if (res.data.status == 200) {
                                        setRenderComments(res.data);
                                        setEditMainCommentPostId(null);
                                        setEditMainCommentId(null);
                                        setEditMainCommentStatus(false);
                                        toast.success("Comment Updated successfully", {
                                          position: "top-right",
                                          style: {
                                            background: "white",
                                            color: "black",
                                          },
                                        });
                                        axiosInstance
                                          .get(`/api/view-single-main-post-with-comments/${item._id}`)
                                          .then((res) => {
                                            if (res.data.status === 200) {
                                              setCommentTextState("");
                                              const postIndex = allPosts.findIndex((post) => post._id === item._id);

                                              if (postIndex !== -1) {
                                                const updatedPosts = [...allPosts];
                                                updatedPosts[postIndex] = res.data.post[0];
                                                setAllposts(updatedPosts);
                                              }
                                            }
                                          });
                                      }
                                    });
                                }
                              }}
                              value={editCommentData}
                            ></textarea>
                            <span
                              href=""
                              className="float-right"
                              style={{color: "red", cursor: "pointer"}}
                              onClick={() => {
                                setEditMainCommentStatus(false),
                                  setEditMainCommentId(null),
                                  setEditMainCommentPostId(null);
                              }}
                            >
                              Cancel
                            </span>

                            {/* edit comment with image/video code main comment  */}
                            <div className="comments-icons d-flex px-1 ">
                              <div className="">
                                <label htmlFor="formFileSmEdit" className="form-label">
                                  <FontAwesomeIcon
                                    icon={faPhotoVideo}
                                    style={{
                                      fontSize: 16,
                                      cursor: "pointer",
                                    }}
                                  />
                                </label>
                                <input
                                  className="form-control form-control-sm"
                                  id="formFileSmEdit"
                                  type="file"
                                  onChange={(e) => {
                                    handleEditCommentImageVideo(e, item._id, "main_comment");
                                  }}
                                />
                              </div>

                              {
                                // commentImageOrVideoFile &&
                                <div
                                  className="mx-2 "
                                  onClick={(e) => {
                                    e.preventDefault();
                                    const formData = new FormData();
                                    formData.append("comment_type", "main_comment");
                                    formData.append("comment_name", editCommentData);
                                    formData.append("image_or_video", editcommentImageOrVideoFile);

                                    axiosInstance
                                      .post(
                                        `api/update-comments-by-direct-post/${editMainCommentPostId}/${editMainCommentId}`,
                                        formData,
                                        {
                                          headers: {
                                            "Content-Type": "multipart/form-data",
                                          },
                                        }
                                      )
                                      .then((res) => {
                                        if (res.data.status == 200) {
                                          setRenderComments(res.data);
                                          setEditMainCommentPostId(null);
                                          setEditMainCommentId(null);
                                          setEditMainCommentStatus(false);
                                          toast.success("Comment Updated successfully", {
                                            position: "top-right",
                                            style: {
                                              background: "white",
                                              color: "black",
                                            },
                                          });
                                          axiosInstance
                                            .get(`/api/view-single-main-post-with-comments/${item._id}`)
                                            .then((res) => {
                                              if (res.data.status === 200) {
                                                setCommentTextState("");
                                                const postIndex = allPosts.findIndex((post) => post._id === item._id);

                                                if (postIndex !== -1) {
                                                  const updatedPosts = [...allPosts];
                                                  updatedPosts[postIndex] = res.data.post[0];
                                                  setAllposts(updatedPosts);
                                                }
                                              }
                                            });
                                        }
                                      });
                                  }}
                                >
                                  <FontAwesomeIcon
                                    icon={faPaperPlane}
                                    className="mx-1"
                                    style={{
                                      cursor: "pointer",
                                      marginTop: "-20px",
                                    }}
                                  />
                                </div>
                              }
                            </div>

                            {editcommentImageOrVideoFile &&
                            editcommenttype === "main_comment" &&
                            editMainCommentPostId === item._id ? (
                              <div className="comment-image-or-video-portion-render">
                                <div
                                  className="cross-icon-comment-or-video"
                                  onClick={() => setEditCommentImageOrVideoFile(null)}
                                >
                                  X
                                </div>

                                {editcommentImageOrVideoFile &&
                                editcommentImageOrVideoFile.type.startsWith("image/") ? (
                                  <img
                                    src={URL.createObjectURL(editcommentImageOrVideoFile)}
                                    // alt={`Uploaded Image ${index}`}
                                  />
                                ) : editcommentImageOrVideoFile &&
                                  editcommentImageOrVideoFile.type.startsWith("video/") ? (
                                  <video controls>
                                    <source
                                      src={URL.createObjectURL(editcommentImageOrVideoFile)}
                                      type={editcommentImageOrVideoFile.type}
                                    />
                                    Your browser does not support the video tag.
                                  </video>
                                ) : null}
                              </div>
                            ) : (
                              editCommentImageOrVideo !== null && (
                                <div className="view-comment-image-video-imagessss comment-image-or-video-portion-render">
                                  <div
                                    className="cross-icon-comment-or-video"
                                    onClick={() => {
                                      axiosInstance
                                        .patch(
                                          `api/remove-image-or-videofile-comment-by-direct-post/${editMainCommentPostId}/${editMainCommentId}/main_comment`
                                        )
                                        .then((res) => {
                                          if (res.data.status == 200) {
                                            setRenderComments(res.data);
                                            setEditMainCommentPostId(null);
                                            setEditMainCommentId(null);
                                            setEditMainCommentStatus(false);
                                            toast.success("Comment Updated successfully", {
                                              position: "top-right",
                                              style: {
                                                background: "white",
                                                color: "black",
                                              },
                                            });
                                            axiosInstance
                                              .get(`/api/view-single-main-post-with-comments/${item._id}`)
                                              .then((res) => {
                                                if (res.data.status === 200) {
                                                  setCommentTextState("");
                                                  const postIndex = allPosts.findIndex((post) => post._id === item._id);

                                                  if (postIndex !== -1) {
                                                    const updatedPosts = [...allPosts];
                                                    updatedPosts[postIndex] = res.data.post[0];
                                                    setAllposts(updatedPosts);
                                                  }
                                                }
                                              });
                                          }
                                        });
                                    }}
                                  >
                                    X
                                  </div>
                                  {editCommentImageOrVideo &&
                                  (editCommentImageOrVideo.endsWith(".jpg") ||
                                    editCommentImageOrVideo.endsWith(".jpeg") ||
                                    editCommentImageOrVideo.endsWith(".png")) ? (
                                    <img src={`${host}/${editCommentImageOrVideo}`} alt="Comment Image" />
                                  ) : editCommentImageOrVideo &&
                                    (editCommentImageOrVideo.endsWith(".mp4") ||
                                      editCommentImageOrVideo.endsWith(".webm") ||
                                      editCommentImageOrVideo.endsWith(".ogg")) ? (
                                    <video controls>
                                      <source src={`${host}/${editCommentImageOrVideo}`} type="video/mp4" />
                                      Your browser does not support the video tag.
                                    </video>
                                  ) : null}
                                </div>
                              )
                            )}
                          </div>
                        )}

                        <div className="main-comment-reaction-emoji-share-wrapper p-1 " style={{cursor: "pointer"}}>
                          <div
                            className="reaction-comment-container "
                            onMouseEnter={() => {
                              setIsCommentReactionHover(true);
                              setIsCommentReactionHoverId(commentitem._id);
                            }}
                            onMouseLeave={() => {
                              setIsCommentReactionHover(false), setIsCommentReactionHoverId(null);
                            }}
                          >
                            {/* comment reaction logics of a user if this user has reacted or not */}

                            {commentitem.comment_reactions
                              .filter(
                                (reaction) => reaction.user_id === userId && reaction.comment_id === commentitem._id
                              )
                              .map((filteredReaction) => (
                                <div key={filteredReaction._id} style={{marginTop: "-5px"}}>
                                  {/* <img
                                        src={`${host}/assets/reactions/${filteredReaction.reaction_type}.gif`}
                                        alt={`Reaction: ${filteredReaction.reaction_type}`}
                                        style={{ width: '30px' }}
                                      /> */}
                                  <span className="" style={{color: "red", fontSize: "12px"}}>
                                    {filteredReaction.reaction_type}{" "}
                                  </span>
                                </div>
                              ))}

                            {/* Render default emoji if no reactions */}
                            {commentitem.comment_reactions.filter(
                              (reaction) => reaction.user_id === userId && reaction.comment_id === commentitem._id
                            ).length === 0 && (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="currentColor"
                                className="bi bi-emoji-smile"
                                viewBox="0 0 16 16"
                              >
                                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"></path>
                                <path d="M4.285 9.567a.5.5 0 0 1 .683.183A3.498 3.498 0 0 0 8 11.5a3.498 3.498 0 0 0 3.032-1.75.5.5 0 1 1 .866.5A4.498 4.498 0 0 1 8 12.5a4.498 4.498 0 0 1-3.898-2.25.5.5 0 0 1 .183-.683zM7 6.5C7 7.328 6.552 8 6 8s-1-.672-1-1.5S5.448 5 6 5s1 .672 1 1.5zm4 0c0 .828-.448 1.5-1 1.5s-1-.672-1-1.5S9.448 5 10 5s1 .672 1 1.5z"></path>
                              </svg>
                            )}
                          </div>

                          {/* comment reaction hover and shows the reactions */}
                          {isCommentReactionHover && isCommentReactionHoverId == commentitem._id && (
                            <div
                              onMouseEnter={() => {
                                setIsCommentReactionHover(true);
                                setIsCommentReactionHoverId(commentitem._id);
                              }}
                              onMouseLeave={() => {
                                setIsCommentReactionHover(false);
                              }}
                              className="reaction-comment-icons-wrapper "
                            >
                              <figure className="reaction-comment-icons mt-1">
                                <img
                                  src={`${host}/assets/reactions/like.gif`}
                                  alt="Like emoji"
                                  onClick={(e) => {
                                    handleCommentReactionSubmit(e, item._id, commentitem._id, "", "like");
                                  }}
                                />
                                <img
                                  src={`${host}/assets/reactions/love.gif`}
                                  onClick={(e) => {
                                    handleCommentReactionSubmit(e, item._id, commentitem._id, "", "love");
                                  }}
                                  alt="Love emoji"
                                />
                                <img
                                  src={`${host}/assets/reactions/haha.gif`}
                                  onClick={(e) => {
                                    handleCommentReactionSubmit(e, item._id, commentitem._id, "", "haha");
                                  }}
                                  alt="Haha emoji"
                                />
                                <img
                                  src={`${host}/assets/reactions/wow.gif`}
                                  onClick={(e) => {
                                    handleCommentReactionSubmit(e, item._id, commentitem._id, "", "wow");
                                  }}
                                  alt="Wow emoji"
                                />
                                <img
                                  src={`${host}/assets/reactions/sad.gif`}
                                  onClick={(e) => {
                                    handleCommentReactionSubmit(e, item._id, commentitem._id, "", "sad");
                                  }}
                                  alt="Sad emoji"
                                />
                                <img
                                  src={`${host}/assets/reactions/angry.gif`}
                                  onClick={(e) => {
                                    handleCommentReactionSubmit(e, item._id, commentitem._id, "", "angry");
                                  }}
                                  alt="Angry emoji"
                                />
                              </figure>
                            </div>
                          )}

                          <div
                            className=""
                            onClick={(e) => {
                              handleReplyComment(e, true, commentitem._id, item._id);
                            }}
                          >
                            <a href={`#${commentitem._id}${item._id}`} className="" style={{color: "black"}}>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="currentColor"
                                className="bi bi-reply-all  ml-2"
                                viewBox="0 0 16 16"
                              >
                                <path d="M8.098 5.013a.144.144 0 0 1 .202.134V6.3a.5.5 0 0 0 .5.5c.667 0 2.013.005 3.3.822.984.624 1.99 1.76 2.595 3.876-1.02-.983-2.185-1.516-3.205-1.799a8.74 8.74 0 0 0-1.921-.306 7.404 7.404 0 0 0-.798.008h-.013l-.005.001h-.001L8.8 9.9l-.05-.498a.5.5 0 0 0-.45.498v1.153c0 .108-.11.176-.202.134L4.114 8.254a.502.502 0 0 0-.042-.028.147.147 0 0 1 0-.252.497.497 0 0 0 .042-.028l3.984-2.933zM9.3 10.386c.068 0 .143.003.223.006.434.02 1.034.086 1.7.271 1.326.368 2.896 1.202 3.94 3.08a.5.5 0 0 0 .933-.305c-.464-3.71-1.886-5.662-3.46-6.66-1.245-.79-2.527-.942-3.336-.971v-.66a1.144 1.144 0 0 0-1.767-.96l-3.994 2.94a1.147 1.147 0 0 0 0 1.946l3.994 2.94a1.144 1.144 0 0 0 1.767-.96v-.667z" />
                                <path d="M5.232 4.293a.5.5 0 0 0-.7-.106L.54 7.127a1.147 1.147 0 0 0 0 1.946l3.994 2.94a.5.5 0 1 0 .593-.805L1.114 8.254a.503.503 0 0 0-.042-.028.147.147 0 0 1 0-.252.5.5 0 0 0 .042-.028l4.012-2.954a.5.5 0 0 0 .106-.699z" />
                              </svg>
                            </a>
                          </div>

                          {userId == commentitem.user_id._id && (
                            <div
                              className=""
                              onClick={() => {
                                setEditMainCommentStatus(true);
                                setEditMainCommentId(commentitem._id), setEditMainCommentPostId(item._id);
                              }}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="currentColor"
                                class="bi bi-pencil-square ml-2 "
                                viewBox="0 0 16 16"
                              >
                                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                <path
                                  fill-rule="evenodd"
                                  d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
                                />
                              </svg>
                            </div>
                          )}

                          <div className="">
                            {commentitem.user_id._id === userId || item.user_id._id === userId ? (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="currentColor"
                                class="bi bi-trash ml-2"
                                viewBox="0 0 16 16"
                                onClick={() => {
                                  const formData = {
                                    comment_id: commentitem._id,
                                  };

                                  axiosInstance.post("/api/delete-single-comment", formData).then((res) => {
                                    allPostss();
                                    toast.success("Comments removed successfully", {
                                      position: "top-right",
                                      style: {
                                        background: "white",
                                        color: "black",
                                      },
                                    });
                                  });
                                }}
                              >
                                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z" />
                                <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z" />
                              </svg>
                            ) : (
                              <></>
                            )}
                          </div>

                          <div className="mx-2 lead" style={{fontSize: "11px"}}>
                            {commentitem.comment_edited == true ? "Edited" : ""}
                          </div>

                          <div
                            className="comment-icon-lists-btn d-flex "
                            onClick={(e) => openWhoesReactOnCommentModal(e, item._id, commentitem._id, "")}
                          >
                            {[...new Set(commentitem.comment_reactions.map((reaction) => reaction.reaction_type))]
                              .slice(0, 2)
                              .map((uniqueReaction, index) => (
                                <div key={index} className="">
                                  <img
                                    src={`${host}/assets/reactions/${uniqueReaction}.gif`}
                                    alt={`Reaction: ${uniqueReaction}`}
                                    style={{width: "30px"}}
                                  />
                                </div>
                              ))}
                            {commentitem.comment_reactions.length > 0 && (
                              <div className="mt-1 text-muted">{`${commentitem.comment_reactions.length}`}</div>
                            )}
                          </div>
                        </div>

                        {
                          // replyCommentStatus &&
                          commentitem.replies.length == 0 &&
                            commentReplyTextRender &&
                            commentIdReplyId == commentitem._id && (
                              <div className="main-comment-reply-div-wrapper" id={`${commentitem._id}${item._id}`}>
                                {/* <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0Opx0jptaraMHRgaEhdaLxmcxCo87mHrToJ9akQA&s' className='main-comment-person-image-1' /> */}
                                {profileImage !== null ? (
                                  // <Image
                                  //   className='comment-icon'
                                  //   src={`${host}/uploads/${profileImage}`}
                                  //   width={30}
                                  //   height={25}
                                  //   alt=''
                                  // />
                                  <img
                                    src={`${host}/uploads/${profileImage}`}
                                    className="main-comment-person-image-1"
                                  />
                                ) : (
                                  <img
                                    src="https://www.kindpng.com/picc/m/24-248253_user-profile-default-image-png-clipart-png-download.png"
                                    className="main-comment-person-image-1 "
                                    style={{
                                      width: "100%",
                                      height: "100%",
                                      objectFit: "cover",
                                    }}
                                  />
                                )}

                                {/* </div> */}
                                {/* <div className='main-comment-text '> */}

                                <div className="w-100 main-comment-div ">
                                  <form onSubmit={(e) => handleCommentReplySubmit(e)}>
                                    <textarea
                                      aria-label="empty textarea"
                                      placeholder="Type your comment..."
                                      value={commentReplyText}
                                      onChange={(e) => setCommentReplyText(e.target.value)}
                                      onKeyDown={(e) => {
                                        if (e.key === "Enter" && !e.shiftKey) {
                                          e.preventDefault();
                                          handleCommentReplySubmit(e);
                                        }
                                      }}
                                      className="external-class px-3 "
                                    />
                                  </form>
                                  {/* //reply comment with image or video code  */}
                                  <div className="comments-icons d-flex px-1">
                                    <div className="">
                                      <label htmlFor="formFileSm1" className="form-label">
                                        <FontAwesomeIcon
                                          icon={faPhotoVideo}
                                          style={{
                                            fontSize: 16,
                                            cursor: "pointer",
                                          }}
                                        />
                                      </label>
                                      <input
                                        className="form-control form-control-sm"
                                        id="formFileSm1"
                                        type="file"
                                        onChange={(e) => {
                                          handleCommentReplyImageVideo(e, item._id, commentitem._id, "reply_comment");
                                        }}
                                      />
                                    </div>

                                    {commentReplyImageOrVideoFile && (
                                      <div className="mx-2 " onClick={submitMainCommentReplyWithImageOrVideo}>
                                        {/* Add */}
                                        {/* <span className="badge badge-danger "> Submit */}
                                        <FontAwesomeIcon
                                          icon={faPaperPlane}
                                          className="mx-1"
                                          style={{
                                            cursor: "pointer",
                                            marginTop: "-20px",
                                          }}
                                        />

                                        {/* </span> */}
                                        {/* <button className="btn btn-danger py-0 px-2 btn-sm"> Add</button> */}
                                      </div>
                                    )}
                                  </div>

                                  {commentReplyImageOrVideoFile &&
                                    commenttype == "reply_comment" &&
                                    item._id == postid &&
                                    commentitem._id == commentid && (
                                      <div className="comment-image-or-video-portion-render">
                                        {/* wqeqw */}
                                        <div
                                          className="cross-icon-comment-or-video"
                                          onClick={() => setCommentReplyImageOrVideoFile(null)}
                                        >
                                          X
                                        </div>

                                        {commentReplyImageOrVideoFile &&
                                        item._id == postid &&
                                        commentitem._id == commentid &&
                                        commentReplyImageOrVideoFile.type.startsWith("image/") ? (
                                          <img src={URL.createObjectURL(commentReplyImageOrVideoFile)} />
                                        ) : commentReplyImageOrVideoFile &&
                                          item._id == postid &&
                                          commentitem._id == commentid &&
                                          commentReplyImageOrVideoFile.type.startsWith("video/") ? (
                                          // <video width="200" height="200" controls>
                                          <video controls>
                                            <source
                                              src={URL.createObjectURL(commentReplyImageOrVideoFile)}
                                              type={commentReplyImageOrVideoFile.type}
                                            />
                                            Your browser does not support the video tag.
                                          </video>
                                        ) : null}
                                      </div>
                                    )}
                                </div>
                                {/* </div> */}
                              </div>
                            )
                        }

                        {commentitem.replies.length > 0 && (
                          <a
                            className={`${
                              viewMoreRepliesLogicCommentId === commentitem._id &&
                              viewMoreRepliesLogicPostId === item._id
                                ? "d-none"
                                : ""
                            }`}
                            data-toggle="collapse"
                            href={`#collapseExample${commentitem._id}`}
                            role="button"
                            aria-expanded="false"
                            aria-controls={`collapseExample${commentitem._id}`}
                            onClick={() => {
                              setViewMoreRepliesLogicCommentId(commentitem._id);
                              setViewMoreRepliesLogicPostId(item._id);
                            }}
                          >
                            <span style={{color: "black", fontWeight: "600"}}> View more replies</span>
                          </a>
                        )}

                        <div class="collapse" id={`collapseExample${commentitem._id}`}>
                          {commentitem.replies.length > 0 &&
                            commentitem.replies.map((replyComment, replyIndex) => {
                              return (
                                <div
                                  className="main-comment-reply-div-wrapper border rounded-right py-1 px-2"
                                  style={{backgroundColor: "#f5f5f5"}}
                                >
                                  <img
                                    className="main-comment-person-image-1"
                                    src={`${host}/uploads/${
                                      replyComment.replies_user_id && replyComment.replies_user_id.profile_pic
                                    }`}
                                    alt=""
                                  />
                                  {/* </div> */}
                                  <div className="main-comment-text rounded">
                                    <div className="d-flex justify-content-between">
                                      <div className="comment-txt-person-name">
                                        {/* <span className=''>Monir Hossain</span> */}
                                        <span className="">{`${replyComment.replies_user_id.first_name} ${replyComment.replies_user_id.last_name}`}</span>
                                      </div>
                                      <div>{timeFormat(replyComment.createdAt)}</div>
                                    </div>

                                    {editMainCommentReplyId !== replyComment._id && (
                                      <>
                                        <div className="comment-txt">
                                          <span className="py-2">{replyComment.replies_comment_name}</span>
                                        </div>

                                        {replyComment.image_or_video !== null && (
                                          <div className="view-comment-image-video-image mt-1">
                                            {replyComment.image_or_video.endsWith(".jpg") ||
                                            replyComment.image_or_video.endsWith(".jpeg") ||
                                            replyComment.image_or_video.endsWith(".png") ? (
                                              <img src={`${host}/${replyComment.image_or_video}`} alt="Comment Image" />
                                            ) : replyComment.image_or_video.endsWith(".mp4") ||
                                              replyComment.image_or_video.endsWith(".webm") ||
                                              replyComment.image_or_video.endsWith(".ogg") ? (
                                              <video controls>
                                                <source
                                                  src={`${host}/${replyComment.image_or_video}`}
                                                  type="video/mp4"
                                                />
                                                Your browser does not support the video tag.
                                              </video>
                                            ) : null}
                                          </div>
                                        )}
                                      </>
                                    )}

                                    {/* if someone wants edit  reply comment */}
                                    {editMainCommentReplyStatus && editMainCommentReplyId == replyComment._id && (
                                      <>
                                        <div className="">
                                          <textarea
                                            id="scrollstyle"
                                            placeholder="Type your comment!"
                                            className="external-class  px-3 border"
                                            onChange={(e) => setEditReplyCommentData(e.target.value)}
                                            onKeyDown={(e) => {
                                              if (e.key === "Enter" && !e.shiftKey) {
                                                e.preventDefault();
                                                const editedData = {
                                                  comment_type: "reply_comment",
                                                  replies_comment_name: editReplyCommentData,
                                                };
                                                axiosInstance
                                                  .post(
                                                    `api/update-comments-by-direct-post/${editMainCommentPostId}/${editMainCommentReplyId}`,
                                                    editedData
                                                  )
                                                  .then((res) => {
                                                    if (res.data.status == 200) {
                                                      setRenderComments(res.data);
                                                      setEditMainCommentPostId(null);
                                                      setEditMainCommentReplyId(null);
                                                      setEditMainCommentReplyStatus(false);

                                                      axiosInstance
                                                        .get(`/api/view-single-main-post-with-comments/${item._id}`)
                                                        .then((res) => {
                                                          if (res.data.status === 200) {
                                                            setCommentTextState("");
                                                            const postIndex = allPosts.findIndex(
                                                              (post) => post._id === item._id
                                                            );

                                                            if (postIndex !== -1) {
                                                              const updatedPosts = [...allPosts];
                                                              updatedPosts[postIndex] = res.data.post[0];
                                                              setAllposts(updatedPosts);
                                                            }
                                                          }
                                                        });
                                                    }
                                                  });
                                              }
                                            }}
                                            value={editReplyCommentData}
                                          ></textarea>
                                          <span
                                            href=""
                                            className="float-right "
                                            style={{
                                              color: "red",
                                              cursor: "pointer",
                                            }}
                                            onClick={() => {
                                              setEditMainCommentReplyStatus(false),
                                                setEditMainCommentReplyId(null),
                                                setEditMainCommentPostId(null);
                                              setEditReplyCommentImageOrVideo(null);
                                              setEditReplyCommentImageOrVideoFile(null);
                                            }}
                                          >
                                            Cancel
                                          </span>
                                        </div>
                                        {/* edit reply comment with image/video code fetching from db  */}
                                        <div className="comments-icons d-flex px-1 ">
                                          <div className="">
                                            <label htmlFor="formFileSmEdit" className="form-label">
                                              <FontAwesomeIcon
                                                icon={faPhotoVideo}
                                                style={{
                                                  fontSize: 16,
                                                  cursor: "pointer",
                                                }}
                                              />
                                            </label>
                                            <input
                                              className="form-control form-control-sm"
                                              id="formFileSmEdit"
                                              type="file"
                                              onChange={(e) => {
                                                handleEditReplyCommentImageVideo(e, item._id, "reply_comment");
                                              }}
                                            />
                                          </div>

                                          {
                                            // ReplycommentImageOrVideoFile &&
                                            <div
                                              className="mx-2 "
                                              onClick={(e) => {
                                                e.preventDefault();
                                                const formData = new FormData();
                                                formData.append("comment_type", "reply_comment");
                                                formData.append("comment_name", editReplyCommentData);
                                                formData.append("image_or_video", editReplyCommentImageOrVideoFile);

                                                axiosInstance
                                                  .post(
                                                    `api/update-comments-by-direct-post/${editMainCommentPostId}/${editMainCommentReplyId}`,
                                                    formData,
                                                    {
                                                      headers: {
                                                        "Content-Type": "multipart/form-data",
                                                      },
                                                    }
                                                  )
                                                  .then((res) => {
                                                    if (res.data.status == 200) {
                                                      setRenderComments(res.data);
                                                      setEditMainCommentPostId(null);
                                                      setEditMainCommentReplyId(null);
                                                      setEditReplyCommentImageOrVideoFile(null);
                                                      setEditReplyCommentImageOrVideo(null);
                                                      setEditMainCommentReplyStatus(false);
                                                      toast.success("Reply Comment Updated successfully", {
                                                        position: "top-right",
                                                        style: {
                                                          background: "white",
                                                          color: "black",
                                                        },
                                                      });
                                                      axiosInstance
                                                        .get(`/api/view-single-main-post-with-comments/${item._id}`)
                                                        .then((res) => {
                                                          if (res.data.status === 200) {
                                                            setCommentTextState("");
                                                            const postIndex = allPosts.findIndex(
                                                              (post) => post._id === item._id
                                                            );

                                                            if (postIndex !== -1) {
                                                              const updatedPosts = [...allPosts];
                                                              updatedPosts[postIndex] = res.data.post[0];
                                                              setAllposts(updatedPosts);
                                                            }
                                                          }
                                                        });
                                                    }
                                                  });
                                              }}
                                            >
                                              <FontAwesomeIcon
                                                icon={faPaperPlane}
                                                className="mx-1"
                                                style={{
                                                  cursor: "pointer",
                                                  marginTop: "-20px",
                                                }}
                                              />
                                            </div>
                                          }
                                        </div>
                                      </>
                                    )}

                                    {editReplyCommentImageOrVideo &&
                                    editcommenttype === "reply_comment" &&
                                    editMainCommentPostId === item._id ? (
                                      <div className="comment-image-or-video-portion-render">
                                        <div
                                          className="cross-icon-comment-or-video"
                                          onClick={() => setEditReplyCommentImageOrVideoFile(null)}
                                        >
                                          X
                                        </div>

                                        {editReplyCommentImageOrVideoFile &&
                                        editReplyCommentImageOrVideoFile.type.startsWith("image/") ? (
                                          <img
                                            src={URL.createObjectURL(editReplyCommentImageOrVideoFile)}
                                            // alt={`Uploaded Image ${index}`}
                                          />
                                        ) : editReplyCommentImageOrVideoFile &&
                                          editReplyCommentImageOrVideoFile.type.startsWith("video/") ? (
                                          <video controls>
                                            <source
                                              src={URL.createObjectURL(editReplyCommentImageOrVideoFile)}
                                              type={editReplyCommentImageOrVideoFile.type}
                                            />
                                            Your browser does not support the video tag.
                                          </video>
                                        ) : null}
                                      </div>
                                    ) : (
                                      editReplyCommentImageOrVideo !== null && (
                                        <div className="view-comment-image-video-imagessss comment-image-or-video-portion-render">
                                          <div
                                            className="cross-icon-comment-or-video"
                                            onClick={() => {
                                              axiosInstance
                                                .patch(
                                                  `api/remove-image-or-videofile-comment-by-direct-post/${editMainCommentPostId}/${editMainCommentId}/main_comment`
                                                )
                                                .then((res) => {
                                                  if (res.data.status == 200) {
                                                    setRenderComments(res.data);
                                                    setEditMainCommentPostId(null);
                                                    setEditMainCommentId(null);
                                                    setEditMainCommentStatus(false);
                                                    toast.success("Comment Updated successfully", {
                                                      position: "top-right",
                                                      style: {
                                                        background: "white",
                                                        color: "black",
                                                      },
                                                    });
                                                    axiosInstance
                                                      .get(`/api/view-single-main-post-with-comments/${item._id}`)
                                                      .then((res) => {
                                                        if (res.data.status === 200) {
                                                          setCommentTextState("");
                                                          const postIndex = allPosts.findIndex(
                                                            (post) => post._id === item._id
                                                          );

                                                          if (postIndex !== -1) {
                                                            const updatedPosts = [...allPosts];
                                                            updatedPosts[postIndex] = res.data.post[0];
                                                            setAllposts(updatedPosts);
                                                          }
                                                        }
                                                      });
                                                  }
                                                });
                                            }}
                                          >
                                            X
                                          </div>
                                          {editReplyCommentImageOrVideo &&
                                          (editReplyCommentImageOrVideo.endsWith(".jpg") ||
                                            editReplyCommentImageOrVideo.endsWith(".jpeg") ||
                                            editReplyCommentImageOrVideo.endsWith(".png")) ? (
                                            <img src={`${host}/${editReplyCommentImageOrVideo}`} alt="Comment Image" />
                                          ) : editReplyCommentImageOrVideo &&
                                            (editReplyCommentImageOrVideo.endsWith(".mp4") ||
                                              editReplyCommentImageOrVideo.endsWith(".webm") ||
                                              editReplyCommentImageOrVideo.endsWith(".ogg")) ? (
                                            <video controls>
                                              <source
                                                src={`${host}/${editReplyCommentImageOrVideo}`}
                                                type="video/mp4"
                                              />
                                              Your browser does not support the video tag.
                                            </video>
                                          ) : null}
                                        </div>
                                      )
                                    )}

                                    <div className="main-comment-reaction-emoji-share-wrapper py-2">
                                      <div
                                        className="reaction-comment-container "
                                        onMouseEnter={() => {
                                          setIsReplyCommentReactionHover(true);
                                          setIsReplyCommentReactionHoverId(replyComment._id);
                                        }}
                                        onMouseLeave={() => {
                                          setIsReplyCommentReactionHover(false), setIsReplyCommentReactionHoverId(null);
                                        }}
                                      >
                                        {/* comment reply reaction logics of a user if this user has reacted or not */}

                                        {replyComment.replies_comment_reactions
                                          .filter(
                                            (reaction) =>
                                              reaction.user_id === userId &&
                                              reaction.comment_replies_id === replyComment._id
                                          )
                                          .map((filteredReaction) => (
                                            <div key={filteredReaction._id} style={{marginTop: "-5px"}}>
                                              {/* <img
                                        src={`${host}/assets/reactions/${filteredReaction.reaction_type}.gif`}
                                        alt={`Reaction: ${filteredReaction.reaction_type}`}
                                        style={{ width: '30px' }}
                                      /> */}
                                              <span
                                                className=""
                                                style={{
                                                  color: "red",
                                                  fontSize: "12px",
                                                }}
                                              >
                                                {filteredReaction.reaction_type}{" "}
                                              </span>
                                            </div>
                                          ))}

                                        {/* Render default emoji if no reactions */}
                                        {replyComment.replies_comment_reactions.filter(
                                          (reaction) =>
                                            reaction.user_id === userId &&
                                            reaction.comment_replies_id === replyComment._id
                                        ).length === 0 && (
                                          <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="16"
                                            height="16"
                                            fill="currentColor"
                                            className="bi bi-emoji-smile"
                                            viewBox="0 0 16 16"
                                          >
                                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"></path>
                                            <path d="M4.285 9.567a.5.5 0 0 1 .683.183A3.498 3.498 0 0 0 8 11.5a3.498 3.498 0 0 0 3.032-1.75.5.5 0 1 1 .866.5A4.498 4.498 0 0 1 8 12.5a4.498 4.498 0 0 1-3.898-2.25.5.5 0 0 1 .183-.683zM7 6.5C7 7.328 6.552 8 6 8s-1-.672-1-1.5S5.448 5 6 5s1 .672 1 1.5zm4 0c0 .828-.448 1.5-1 1.5s-1-.672-1-1.5S9.448 5 10 5s1 .672 1 1.5z"></path>
                                          </svg>
                                        )}
                                      </div>

                                      {/* comment reaction hover and shows the reactions */}
                                      {isReplyCommentReactionHover &&
                                        isReplyCommentReactionHoverId == replyComment._id && (
                                          <div
                                            onMouseEnter={() => {
                                              setIsReplyCommentReactionHover(true);
                                              setIsReplyCommentReactionHoverId(replyComment._id);
                                            }}
                                            onMouseLeave={() => {
                                              setIsReplyCommentReactionHoverId(false);
                                            }}
                                            className="reaction-comment-icons-wrapper "
                                          >
                                            <figure className="reaction-comment-icons mt-1">
                                              <img
                                                src={`${host}/assets/reactions/like.gif`}
                                                alt="Like emoji"
                                                onClick={(e) => {
                                                  handleCommentReactionSubmit(
                                                    e,
                                                    item._id,
                                                    commentitem._id,
                                                    replyComment._id,
                                                    "like"
                                                  );
                                                }}
                                              />
                                              <img
                                                src={`${host}/assets/reactions/love.gif`}
                                                onClick={(e) => {
                                                  handleCommentReactionSubmit(
                                                    e,
                                                    item._id,
                                                    commentitem._id,
                                                    replyComment._id,
                                                    "love"
                                                  );
                                                }}
                                                alt="Love emoji"
                                              />
                                              <img
                                                src={`${host}/assets/reactions/haha.gif`}
                                                onClick={(e) => {
                                                  handleCommentReactionSubmit(
                                                    e,
                                                    item._id,
                                                    commentitem._id,
                                                    replyComment._id,
                                                    "haha"
                                                  );
                                                }}
                                                alt="Haha emoji"
                                              />
                                              <img
                                                src={`${host}/assets/reactions/wow.gif`}
                                                onClick={(e) => {
                                                  handleCommentReactionSubmit(
                                                    e,
                                                    item._id,
                                                    commentitem._id,
                                                    replyComment._id,
                                                    "wow"
                                                  );
                                                }}
                                                alt="Wow emoji"
                                              />
                                              <img
                                                src={`${host}/assets/reactions/sad.gif`}
                                                onClick={(e) => {
                                                  handleCommentReactionSubmit(
                                                    e,
                                                    item._id,
                                                    commentitem._id,
                                                    replyComment._id,
                                                    "sad"
                                                  );
                                                }}
                                                alt="Sad emoji"
                                              />
                                              <img
                                                src={`${host}/assets/reactions/angry.gif`}
                                                onClick={(e) => {
                                                  handleCommentReactionSubmit(
                                                    e,
                                                    item._id,
                                                    commentitem._id,
                                                    replyComment._id,
                                                    "angry"
                                                  );
                                                }}
                                                alt="Angry emoji"
                                              />
                                            </figure>
                                          </div>
                                        )}

                                      <div className="">
                                        <svg
                                          onClick={(e) => setReplyCommentStatusChain(e, true)}
                                          xmlns="http://www.w3.org/2000/svg"
                                          width="16"
                                          height="16"
                                          fill="currentColor"
                                          className="bi bi-reply-all  ml-2"
                                          viewBox="0 0 16 16"
                                        >
                                          <path d="M8.098 5.013a.144.144 0 0 1 .202.134V6.3a.5.5 0 0 0 .5.5c.667 0 2.013.005 3.3.822.984.624 1.99 1.76 2.595 3.876-1.02-.983-2.185-1.516-3.205-1.799a8.74 8.74 0 0 0-1.921-.306 7.404 7.404 0 0 0-.798.008h-.013l-.005.001h-.001L8.8 9.9l-.05-.498a.5.5 0 0 0-.45.498v1.153c0 .108-.11.176-.202.134L4.114 8.254a.502.502 0 0 0-.042-.028.147.147 0 0 1 0-.252.497.497 0 0 0 .042-.028l3.984-2.933zM9.3 10.386c.068 0 .143.003.223.006.434.02 1.034.086 1.7.271 1.326.368 2.896 1.202 3.94 3.08a.5.5 0 0 0 .933-.305c-.464-3.71-1.886-5.662-3.46-6.66-1.245-.79-2.527-.942-3.336-.971v-.66a1.144 1.144 0 0 0-1.767-.96l-3.994 2.94a1.147 1.147 0 0 0 0 1.946l3.994 2.94a1.144 1.144 0 0 0 1.767-.96v-.667z" />
                                          <path d="M5.232 4.293a.5.5 0 0 0-.7-.106L.54 7.127a1.147 1.147 0 0 0 0 1.946l3.994 2.94a.5.5 0 1 0 .593-.805L1.114 8.254a.503.503 0 0 0-.042-.028.147.147 0 0 1 0-.252.5.5 0 0 0 .042-.028l4.012-2.954a.5.5 0 0 0 .106-.699z" />
                                        </svg>
                                      </div>

                                      {replyComment.replies_user_id._id == userId && (
                                        <div
                                          className=""
                                          onClick={() => {
                                            setEditMainCommentReplyStatus(true);
                                            setEditMainCommentReplyId(replyComment._id),
                                              setEditMainCommentPostId(item._id);
                                          }}
                                        >
                                          <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="16"
                                            height="16"
                                            fill="currentColor"
                                            class="bi bi-pencil-square ml-2"
                                            viewBox="0 0 16 16"
                                          >
                                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                            <path
                                              fill-rule="evenodd"
                                              d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
                                            />
                                          </svg>
                                        </div>
                                      )}
                                      <div className="">
                                        {replyComment.replies_user_id._id == userId || item.user_id._id === userId ? (
                                          <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="16"
                                            height="16"
                                            fill="currentColor"
                                            class="bi bi-trash ml-2"
                                            viewBox="0 0 16 16"
                                            onClick={() => {
                                              const formData = {
                                                comment_id: replyComment._id,
                                              };

                                              axiosInstance
                                                .post("/api/delete-single-reply-comment", formData)
                                                .then((res) => {
                                                  allPostss();
                                                  toast.success("Comments removed successfully", {
                                                    position: "top-right",
                                                    style: {
                                                      background: "white",
                                                      color: "black",
                                                    },
                                                  });
                                                });
                                            }}
                                          >
                                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z" />
                                            <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z" />
                                          </svg>
                                        ) : (
                                          <></>
                                        )}
                                      </div>

                                      <div className="mx-2 lead" style={{fontSize: "11px"}}>
                                        {replyComment.comment_edited == true ? "Edited" : ""}
                                      </div>

                                      <div
                                        className="comment-icon-lists-btn d-flex "
                                        onClick={(e) =>
                                          openWhoesReactOnCommentModal(e, item._id, commentitem._id, replyComment._id)
                                        }
                                      >
                                        {[
                                          ...new Set(
                                            replyComment.replies_comment_reactions.map(
                                              (reaction) => reaction.reaction_type
                                            )
                                          ),
                                        ]
                                          .slice(0, 2)
                                          .map((uniqueReaction, index) => (
                                            <div key={index} className="">
                                              <img
                                                className="mx-0 px-0 "
                                                src={`${host}/assets/reactions/${uniqueReaction}.gif`}
                                                alt={`Reaction: ${uniqueReaction}`}
                                                style={{width: "30px"}}
                                              />
                                            </div>
                                          ))}
                                        {replyComment.replies_comment_reactions.length > 0 && (
                                          <div className="mt-1 text-muted">
                                            {`${replyComment.replies_comment_reactions.length}`}
                                          </div>
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              );
                            })}
                        </div>

                        {/* comment input logic */}
                        {
                          // replyCommentStatus &&
                          commentitem.replies.length > 0 &&
                            commentReplyTextRender &&
                            commentIdReplyId == commentitem._id && (
                              <div className="main-comment-reply-div-wrapper">
                                {/* <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0Opx0jptaraMHRgaEhdaLxmcxCo87mHrToJ9akQA&s' className='main-comment-person-image-1' /> */}
                                {profileImage !== null ? (
                                  // <Image
                                  //   className='comment-icon'
                                  //   src={`${host}/uploads/${profileImage}`}
                                  //   width={30}
                                  //   height={25}
                                  //   alt=''
                                  // />
                                  <img
                                    src={`${host}/uploads/${profileImage}`}
                                    className="main-comment-person-image-1"
                                  />
                                ) : (
                                  <img
                                    src="https://www.kindpng.com/picc/m/24-248253_user-profile-default-image-png-clipart-png-download.png"
                                    className="main-comment-person-image-1 "
                                    style={{
                                      width: "100%",
                                      height: "100%",
                                      objectFit: "cover",
                                    }}
                                  />
                                )}

                                {/* </div> */}
                                {/* <div className='main-comment-text '> */}

                                <div className="w-100 main-comment-div">
                                  <form onSubmit={(e) => handleCommentReplySubmit(e)}>
                                    <textarea
                                      aria-label="empty textarea"
                                      placeholder="Type your comment..."
                                      value={commentReplyText}
                                      onChange={(e) => setCommentReplyText(e.target.value)}
                                      onKeyDown={(e) => {
                                        if (e.key === "Enter" && !e.shiftKey) {
                                          e.preventDefault();
                                          handleCommentReplySubmit(e);
                                        }
                                      }}
                                      className="external-class px-3 "
                                    />
                                  </form>
                                </div>
                                {/* </div> */}
                              </div>
                            )
                        }
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </article>