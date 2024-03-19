import React from "react";

const PagePost = () => {
  return (
    <div>
      {" "}
      <div className='mt-3'>
        <div className='row mt-2 '>
          <div className='col-12 col-sm-3 col-md-3 col-lg-3  col-xl-3'>
            {pageDetails.website == "" ||
            pageDetails.instagram == "" ||
            pageDetails.whatsapp == "" ? (
              <div className='page-suggestons-side-div'>
                <div className='page-suggestons-side container-fluid'>
                  <p className='Sugge-tag'>Page Suggestion</p>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='16'
                    height='16'
                    fill='currentColor'
                    className='bi bi-x-lg'
                    viewBox='0 0 16 16'>
                    <path d='M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z' />
                  </svg>
                </div>

                <div className='container-fluid'>
                  <h6>Page Health</h6>
                  <p className='Sugge-tag-p'>
                    Your page health is <strong>‘Good’</strong> <br /> you are
                    about to engage more by adding followings
                  </p>

                  <div>
                    <ul>
                      {pageDetails.whatsapp == "" ? (
                        <li>
                          <button
                            className='add-whatsapp'
                            onClick={() => {
                              setSettingModal(true);
                              setSettingType("whatsapp");
                            }}>
                            <span>
                              <svg
                                xmlns='http://www.w3.org/2000/svg'
                                width='20'
                                height='20'
                                fill='currentColor'
                                className='bi bi-whatsapp'
                                viewBox='0 0 16 16'>
                                <path d='M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z' />
                              </svg>
                            </span>
                            Add Whatsapp
                          </button>
                        </li>
                      ) : (
                        <></>
                      )}

                      {pageDetails.instagram == "" ? (
                        <li>
                          <button
                            className='add-whatsapp'
                            onClick={() => {
                              setSettingModal(true);
                              setSettingType("instagram");
                            }}>
                            <span>
                              <svg
                                xmlns='http://www.w3.org/2000/svg'
                                width='20'
                                height='20'
                                fill='currentColor'
                                className='bi bi-instagram'
                                viewBox='0 0 16 16'>
                                <path d='M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z' />
                              </svg>
                            </span>
                            Add Instagram
                          </button>
                        </li>
                      ) : (
                        <></>
                      )}

                      {pageDetails.website == "" ? (
                        <li>
                          {" "}
                          <button
                            className='add-whatsapp'
                            onClick={() => {
                              setSettingModal(true);
                              setSettingType("website");
                            }}>
                            <svg
                              xmlns='http://www.w3.org/2000/svg'
                              width='20'
                              height='20'
                              fill='currentColor'
                              className='bi bi-globe-asia-australia'
                              viewBox='0 0 16 16'>
                              <path d='m10.495 6.92 1.278-.619a.483.483 0 0 0 .126-.782c-.252-.244-.682-.139-.932.107-.23.226-.513.373-.816.53l-.102.054c-.338.178-.264.626.1.736a.476.476 0 0 0 .346-.027ZM7.741 9.808V9.78a.413.413 0 1 1 .783.183l-.22.443a.602.602 0 0 1-.12.167l-.193.185a.36.36 0 1 1-.5-.516l.112-.108a.453.453 0 0 0 .138-.326ZM5.672 12.5l.482.233A.386.386 0 1 0 6.32 12h-.416a.702.702 0 0 1-.419-.139l-.277-.206a.302.302 0 1 0-.298.52l.761.325Z' />
                              <path d='M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0ZM1.612 10.867l.756-1.288a1 1 0 0 1 1.545-.225l1.074 1.005a.986.986 0 0 0 1.36-.011l.038-.037a.882.882 0 0 0 .26-.755c-.075-.548.37-1.033.92-1.099.728-.086 1.587-.324 1.728-.957.086-.386-.114-.83-.361-1.2-.207-.312 0-.8.374-.8.123 0 .24-.055.318-.15l.393-.474c.196-.237.491-.368.797-.403.554-.064 1.407-.277 1.583-.973.098-.391-.192-.634-.484-.88-.254-.212-.51-.426-.515-.741a6.998 6.998 0 0 1 3.425 7.692 1.015 1.015 0 0 0-.087-.063l-.316-.204a1 1 0 0 0-.977-.06l-.169.082a1 1 0 0 1-.741.051l-1.021-.329A1 1 0 0 0 11.205 9h-.165a1 1 0 0 0-.945.674l-.172.499a1 1 0 0 1-.404.514l-.802.518a1 1 0 0 0-.458.84v.455a1 1 0 0 0 1 1h.257a1 1 0 0 1 .542.16l.762.49a.998.998 0 0 0 .283.126 7.001 7.001 0 0 1-9.49-3.409Z' />
                            </svg>
                            Add Website
                          </button>
                        </li>
                      ) : (
                        <></>
                      )}
                    </ul>

                    <button className='see-more-btn'>See more</button>
                  </div>
                </div>
              </div>
            ) : (
              <></>
            )}
            <div className=''>
              <div className='page-sidebar-div'>
                <div className='page-sidebar-intro'>
                  <h5>Intro</h5>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='16'
                    height='16'
                    fill='gray'
                    className='bi bi-pencil-square'
                    viewBox='0 0 16 16'>
                    <path d='M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z' />
                    <path
                      fill-rule='evenodd'
                      d='M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z'
                    />
                  </svg>
                </div>

                <div>
                  <p className='page-bio'>{pageDetails.bio}</p>
                </div>
              </div>
              <div className='page-sidebar-div'>
                <ul>
                  <li className='page-li-icon'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='16'
                      height='16'
                      fill='gray'
                      className='bi bi-info-circle-fill'
                      viewBox='0 0 16 16'>
                      <path d='M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z' />
                    </svg>
                    <strong>Page:</strong> {pageDetails.category}
                  </li>
                  <li className='page-li-icon'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='16'
                      height='16'
                      fill='gray'
                      className='bi bi-geo-alt-fill'
                      viewBox='0 0 16 16'>
                      <path d='M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z' />
                    </svg>
                    {pageDetails.address} {pageDetails.city}
                  </li>
                  <li className='page-li-icon'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='16'
                      height='16'
                      fill='gray'
                      className='bi bi-telephone-fill'
                      viewBox='0 0 16 16'>
                      <path
                        fill-rule='evenodd'
                        d='M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z'
                      />
                    </svg>
                    {pageDetails.bio}
                  </li>
                  <li className='page-li-icon'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='16'
                      height='16'
                      fill='gray'
                      className='bi bi-envelope-fill'
                      viewBox='0 0 16 16'>
                      <path d='M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414.05 3.555ZM0 4.697v7.104l5.803-3.558L0 4.697ZM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586l-1.239-.757Zm3.436-.586L16 11.801V4.697l-5.803 3.546Z' />
                    </svg>
                    {/* {pageDetails.email} */}
                  </li>
                  <li className='page-li-icon'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='16'
                      height='16'
                      fill='gray'
                      className='bi bi-star-fill'
                      viewBox='0 0 16 16'>
                      <path d='M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z' />
                    </svg>
                    Not yet rated
                  </li>
                  <li className='page-li-icon'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='16'
                      height='16'
                      fill='gray'
                      className='bi bi-symmetry-horizontal'
                      viewBox='0 0 16 16'>
                      <path d='M13.5 7a.5.5 0 0 0 .24-.939l-11-6A.5.5 0 0 0 2 .5v6a.5.5 0 0 0 .5.5h11zm.485 2.376a.5.5 0 0 1-.246.563l-11 6A.5.5 0 0 1 2 15.5v-6a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 .485.376zM11.539 10H3v4.658L11.54 10z' />
                    </svg>
                    Offers free stickers
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className='col-12 col-sm-9 col-md-9 col-lg-9  col-xl-9'>
            <div className='container-fluid'>
              <form onSubmit={handleSubmit}>
                <div className='settings-post-full-div'>
                  <div className='settings-post-div'>
                    <div className='post-img-div'>
                      <img
                        className='post-img'
                        src={`${host}/uploads/pages/${pageDetails.profile_pic}`}
                        alt=''
                      />
                    </div>
                    <div className='settings-post-in-div'>
                      <input
                        type='text'
                        placeholder='Want to share something'
                        onChange={handleContentChange}
                        className='settings-post-in'
                      />
                    </div>
                  </div>
                  <div className='grid-container'>
                    {files.length > 0 &&
                      files.map((file, index) => (
                        <div key={`file-${index}`} className='grid-item'>
                          {file.type.startsWith("image/") ? (
                            <img
                              src={URL.createObjectURL(file)}
                              alt={`Uploaded Image ${index}`}
                              // width="200"
                              // height="200"
                            />
                          ) : file.type.startsWith("video/") ? (
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
                  <div className='seetings-post-files-div'>
                    <div className='settings-file-icon-text'>
                      <Image
                        src={settingpostlive}
                        width={33}
                        height={33}
                        alt=''
                      />
                      <span>Live Video</span>
                    </div>
                    <div
                      className='settings-file-icon-text'
                      onClick={handlePostImageUpload}>
                      <Image
                        src={settingpostgallery}
                        width={33}
                        height={33}
                        alt=''
                      />
                      <span>Gallery</span>
                    </div>

                    <input
                      id='fileInput'
                      type='file'
                      className='media-file'
                      name='media'
                      accept='image/*,video/*'
                      multiple
                      onChange={handleFileUpload}
                    />

                    <div className='settings-file-icon-text'>
                      <Image
                        src={settingpostreels}
                        width={33}
                        height={33}
                        alt=''
                      />
                      <span>Reels</span>
                    </div>
                  </div>
                </div>
              </form>
              <div className='settings-highlight-text-div container-fluid'>
                <div>
                  <h3>Highlight</h3>
                  <p>People won’t see this unless you pin something.</p>
                </div>
                <h6 className='settings-highlight-maange-text'>
                  Manage Highlights
                </h6>
              </div>

              {/* Page Post and Comment  */}
              <PagePostList pageDetails={pageDetails} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PagePost;
