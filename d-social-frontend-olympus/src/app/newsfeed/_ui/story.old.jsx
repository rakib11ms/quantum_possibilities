import React from 'react';

export default function StoryOld() {
   return (
      <div>
         <div className="ui-block web-post-status">
            {/* News Feed Form */}
            <div className="news-feed-form">
               {/* Nav tabs */}
               {/* <ul className='nav nav-tabs' role='tablist'>
                  <li className='nav-item'>
                    <a
                      className='nav-link active inline-items'
                      data-toggle='tab'
                      href='#home-1'
                      role='tab'
                      aria-expanded='true'>
                     
                      <Image
                        src={statusSvg.src}
                        width='16'
                        height='16'
                        className='mr-1'
                      />
                      <span>Status</span>
                    </a>
                  </li>
                  <li className='nav-item'>
                    <a
                      className='nav-link inline-items'
                      data-toggle='tab'
                      href='#profile-1'
                      role='tab'
                      aria-expanded='false'>
                      <Image
                        src={storySvg.src}
                        width='16'
                        height='16'
                        className='mr-1'
                      />
                      <span>Story</span>
                    </a>
                  </li>
                  <li className='nav-item'>
                    <a
                      className='nav-link inline-items'
                      data-toggle='tab'
                      href='#blog'
                      role='tab'
                      aria-expanded='false'>
                      <Image
                        src={reelsSvg.src}
                        width='16'
                        height='16'
                        className='mr-1'
                      />
                      <span>Reels</span>
                    </a>
                  </li>
                </ul> */}
               {/* Tab panes */}
               <div>
                  <div className="create-post-text">Create post</div>
               </div>
               <div className="tab-content">
                  <div className="tab-pane active" id="home-1" role="tabpanel" aria-expanded="true">
                     <form onSubmit={handleSubmit}>
                        <div className="d-flex align-items-center mt-4 m-1">
                           {/* <div className=""> */}
                           {/* <div className="author-thumbs" >
                          <img src={feedauthone.src} alt="author" style={{ width: '30px', height: '30px', borderRadius: '50%', objectFit: 'contain' }} />


                        </div> */}

                           {profileImage !== null ? (
                              <div className="author-thumbs">
                                 <img
                                    src={`${host}/uploads/${profileImage}`}
                                    alt=""
                                    className="avatar "
                                 />
                              </div>
                           ) : (
                              <div className="author-thumbs">
                                 <img
                                    src="https://www.kindpng.com/picc/m/24-248253_user-profile-default-image-png-clipart-png-download.png"
                                    className="avatar "
                                 />
                              </div>
                           )}
                           <div className="name-and-privacy ">
                              <div className="mx-2">
                                 {/* activityData.activity_name  */}
                                 <h6 className="my-0 newsf-author-tags">
                                    {`${fullName} `}
                                    {` ${activityData.activity_name != '' ? 'is' : ''} `}
                                    {activityData.logo != '' ? (
                                       <img
                                          src={`${host}/assets/${activityData.logo}`}
                                          className="feeling-icon"
                                       />
                                    ) : (
                                       ''
                                    )}
                                    {` ${activityData.activity_type != '' ? activityData.activity_type : ''} `}
                                    {` ${activityData.activity_name != '' ? activityData.activity_name : ''} `}
                                    {`${locationChildData !== null ? `is at ${locationChildData.location_name}` : ''}`}
                                 </h6>

                                 {/* {
                            locationChildData !== null && locationChildData.location_name
                          } */}
                              </div>
                              <div className="">
                                 <div className="my-0 ">
                                    <FormControl size="small" fullWidth>
                                       {/* <InputLabel id="privacy-label">Privacy</InputLabel> */}
                                       <Select
                                          className="privacy-select-div"
                                          labelId="privacy-label"
                                          id="privacy-select"
                                          value={selectedOption}
                                          // label="Privacy"
                                          onChange={handleChange}
                                          sx={{
                                             fontSize: '12px',

                                             backgroundColor: '#E4E6EB',
                                             '& .MuiSelect-select': {
                                                border: 'none',
                                             },
                                             '& .MuiFilledInput-root': {
                                                borderBottom: 'none',
                                             },
                                             '& fieldset': { border: 'none' },
                                          }}
                                       >
                                          {options.map((option) => (
                                             <MenuItem
                                                key={option.value}
                                                value={option.value}
                                                sx={{
                                                   fontSize: '12px',
                                                   '& .MuiSelect-select': {
                                                      border: 'none',
                                                      backgroundColor: 'white',
                                                      outline: '0',
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
                        </div>

                        <div className="form-group with-icon label-floating is-empty border rounded m-1">
                           {/* <label className="control-label">
                          Share what you are thinking here...
                        </label> */}

                           {/* <textarea
                          ref={input}
                          type="text"
                          className="form-control"
                          style={{
                            height: height + 'px',
                            border: 'none',
                            width: '100%',
                            minHeight: '80px', // Set a minimum height
                          }}
                          onInput={handleInputChange}
                        /> */}

                           <div className="">
                              <textarea
                                 className={`${textColor != null ? 'form-controlss ' + textColor : 'form-control'} `}
                                 placeholder=" Share what you are thinking here..."
                                 // defaultValue={""}
                                 style={{ border: 'none', minHeight: '135px' }}
                                 value={content}
                                 onChange={handleContentChange}
                              />
                           </div>

                           {/* Display uploaded files in a single grid */}
                           <div className="grid-container">
                              {files.length > 0 &&
                                 files.map((file, index) => (
                                    <div key={`file-${index}`} className="grid-item ">
                                       <span
                                          className="cross-icon-post-image-video-item"
                                          onClick={() => {
                                             const filess = [...files];
                                             filess.splice(index, 1);
                                             setFiles(filess);
                                          }}
                                       >
                                          {' '}
                                          X{' '}
                                       </span>

                                       {file.type.startsWith('image/') ? (
                                          <img
                                             src={URL.createObjectURL(file)}
                                             alt={`Uploaded Image ${index}`}
                                             // width="200"
                                             // height="200"
                                          />
                                       ) : file.type.startsWith('video/') ? (
                                          // <video width="200" height="200" controls>
                                          <video controls>
                                             <source
                                                src={URL.createObjectURL(file)}
                                                type={file.type}
                                             />
                                             Your browser does not support the video tag.
                                          </video>
                                       ) : null}
                                    </div>
                                 ))}
                           </div>
                        </div>

                        {/* <div>
                        <div className='post-back-color-full-div'>
                          <div className='post-back-color-div'>
                            <img
                              className='post-back-color-img'
                              src={Colorselect.src}
                              alt=''
                            />
                          </div>

                          <div className='colors-div'></div>
                        </div>
                      </div> */}

                        <div className="post-back-color-full-div">
                           {files.length == 0 && (
                              <>
                                 <div
                                    className="post-back-color-div"
                                    onClick={() => {
                                       setShowColors(!showColors);
                                       handleBackgroundColors(null);
                                    }}
                                 >
                                    <img
                                       className="post-back-color-img"
                                       src={Colorselect.src}
                                       alt=""
                                    />
                                 </div>
                                 {showColors && (
                                    <div className="colors-div" ref={colorsRef}>
                                       <div
                                          className="color-div color-one"
                                          onClick={(e) => {
                                             handleBackgroundColors('color-one');
                                          }}
                                       />
                                       <div
                                          className="color-div color-two"
                                          onClick={(e) => {
                                             handleBackgroundColors('color-two');
                                          }}
                                       />
                                       <div
                                          className="color-div color-three"
                                          onClick={(e) => {
                                             handleBackgroundColors('color-three');
                                          }}
                                       />

                                       <div
                                          className="color-div color-four"
                                          onClick={(e) => {
                                             handleBackgroundColors('color-four');
                                          }}
                                       />
                                       <div
                                          className="color-div color-five"
                                          onClick={(e) => {
                                             handleBackgroundColors('color-five');
                                          }}
                                       />
                                       <div
                                          className="color-div color-six"
                                          onClick={(e) => {
                                             handleBackgroundColors('color-six');
                                          }}
                                       />
                                       <div
                                          className="color-div color-seven"
                                          onClick={(e) => {
                                             handleBackgroundColors('color-seven');
                                          }}
                                       />
                                       <div
                                          className="color-div color-nine"
                                          onClick={(e) => {
                                             handleBackgroundColors('color-nine');
                                          }}
                                       />
                                       <div
                                          className="color-div color-ten"
                                          onClick={(e) => {
                                             handleBackgroundColors('color-ten');
                                          }}
                                       />
                                       <div
                                          className="color-div color-nine"
                                          onClick={(e) => {
                                             handleBackgroundColors('color-nine');
                                          }}
                                       />
                                       <div
                                          className="color-div color-ten"
                                          onClick={(e) => {
                                             handleBackgroundColors('color-ten');
                                          }}
                                       />
                                       <div
                                          className="color-div color-eleven"
                                          onClick={(e) => {
                                             handleBackgroundColors('color-eleven');
                                          }}
                                       />
                                       <div
                                          className="color-div color-twelve"
                                          onClick={(e) => {
                                             handleBackgroundColors('color-twelve');
                                          }}
                                       />
                                       <div
                                          className="color-div color-thirteen"
                                          onClick={(e) => {
                                             handleBackgroundColors('color-thirteen');
                                          }}
                                       />
                                       <div
                                          className="color-div color-fortheen"
                                          onClick={(e) => {
                                             handleBackgroundColors('color-fortheen');
                                          }}
                                       />
                                       <div
                                          className="color-div color-fivteen"
                                          onClick={(e) => {
                                             handleBackgroundColors('color-fivteen');
                                          }}
                                       />
                                    </div>
                                 )}
                                 {showColors && (
                                    <>
                                       {colorsRef.current && colorsRef.current.scrollLeft > 0 && (
                                          <div className="arrow" onClick={() => scroll('left')}>
                                             {'<'}
                                          </div>
                                       )}
                                       {colorsRef.current &&
                                          colorsRef.current.scrollLeft <
                                             colorsRef.current.scrollWidth -
                                                colorsRef.current.clientWidth && (
                                             <div
                                                className="arrow"
                                                style={{ right: 0 }}
                                                onClick={() => scroll('right')}
                                             >
                                                {'>'}
                                             </div>
                                          )}
                                    </>
                                 )}
                              </>
                           )}
                        </div>

                        <div className="post-field-icons">
                           <div className="row">
                              <div className="col-lg-9 col-md-9 col-sm-9 col-6 ">
                                 <span className="p-text-add text-black">Add to your post</span>
                              </div>
                              <div className="post-field-single-icon  col-lg-3 col-md-3 col-sm-3 col-6 d-flex align-items-center ">
                                 {/* <Image src={photoSvg.src} width="20" height="20" onClick={handlePostImageUpload} /> */}
                                 {/* <input type="file" accept="image/*,video/*" multiple onChange={handleFileUpload} /> */}

                                 <div className="post-media-icon ">
                                    {textColor == null && (
                                       <>
                                          <Image
                                             src={photoSvg.src}
                                             width="20"
                                             height="20"
                                             className=""
                                             name="media"
                                             onClick={handlePostImageUpload}
                                          />
                                          <input
                                             id="fileInput"
                                             type="file"
                                             className="media-file"
                                             name="media"
                                             accept="image/*,video/*"
                                             multiple
                                             onChange={handleFileUpload}
                                          />
                                       </>
                                    )}
                                 </div>

                                 <div>
                                    <Image
                                       src={locationSvg.src}
                                       width="20"
                                       height="20"
                                       onClick={openModal}
                                    />
                                 </div>
                                 <div>
                                    <Image src={addfriendSvg.src} width="20" height="20" />
                                 </div>
                                 <div>
                                    <Image src={gallerySvg.src} width="20" height="20" />
                                 </div>
                                 <div className="">
                                    <span onClick={setFeelingModal}>
                                       <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          width="16"
                                          height="16"
                                          fill="black"
                                          className="bi bi-three-dots"
                                          viewBox="0 0 16 16"
                                       >
                                          <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z" />
                                       </svg>
                                    </span>
                                 </div>
                              </div>
                           </div>
                        </div>
                        <div className="post-btton-div">
                           <button className="post-btton" type="submit">
                              {loading ? <Loader /> : <>Post</>}
                           </button>
                        </div>
                     </form>
                  </div>

                  <div
                     className="tab-pane bg-dark"
                     id="profile-1"
                     role="tabpanel"
                     aria-expanded="true"
                  >
                     <form>
                        <div className="author-thumb">
                           <img src={feedauthone.src} alt="author" />
                        </div>
                        <div className="form-group with-icon label-floating is-empty">
                           <label className="control-label">
                              Share what you are thinking here...
                           </label>
                           <textarea className="form-control" placeholder defaultValue={''} />
                        </div>
                     </form>
                  </div>

                  <div className="tab-pane" id="blog" role="tabpanel" aria-expanded="true">
                     <form>
                        <div className="author-thumb">
                           <img src={feedauthone.src} alt="author" />
                        </div>
                        <div className="form-group with-icon label-floating is-empty">
                           <label className="control-label">
                              Share what you are thinking here...
                           </label>
                           <textarea className="form-control" placeholder defaultValue={''} />
                        </div>
                        <div className="add-options-message">
                           <a
                              href="#"
                              className="options-message"
                              data-toggle="tooltip"
                              data-placement="top"
                              data-original-title="ADD PHOTOS"
                           >
                              <svg
                                 className="olymp-camera-icon"
                                 data-toggle="modal"
                                 data-target="#update-header-photo"
                              >
                                 <use xlinkHref="svg-icons/sprites/icons.svg#olymp-camera-icon" />
                              </svg>
                           </a>
                           <a
                              href="#"
                              className="options-message"
                              data-toggle="tooltip"
                              data-placement="top"
                              data-original-title="TAG YOUR FRIENDS"
                           >
                              <svg className="olymp-computer-icon">
                                 <use xlinkHref="svg-icons/sprites/icons.svg#olymp-computer-icon" />
                              </svg>
                           </a>
                           <a
                              href="#"
                              className="options-message"
                              data-toggle="tooltip"
                              data-placement="top"
                              data-original-title="ADD LOCATION"
                           >
                              <svg className="olymp-small-pin-icon">
                                 <use xlinkHref="svg-icons/sprites/icons.svg#olymp-small-pin-icon" />
                              </svg>
                           </a>
                           <button className="btn btn-primary btn-md-2">Post Status</button>
                           <button className="btn btn-md-2 btn-border-think btn-transparent c-grey">
                              Preview
                           </button>
                        </div>
                     </form>
                  </div>
               </div>
            </div>
            {/* ... end News Feed Form */}
         </div>

         <div className="newsfeedreels-div ">
            <div className="newsfeedreels">
               <NewsfeedReels />
            </div>
         </div>
      </div>
   );
}
