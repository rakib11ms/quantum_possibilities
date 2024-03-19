"use client";
import "./sty.css";
import React, { useState, useEffect } from "react";
import { TextareaAutosize as BaseTextareaAutosize } from "@mui/base/TextareaAutosize";
import { styled } from "@mui/system";

function Check() {
  // const [content, setContent] = useState('');
  // const [updateContent, setUpdateContent] = useState('');
  // console.log('contents', content)
  // console.log('update contents', updateContent)

  // const [files, setFiles] = useState([]);

  // console.log('files', files)

  // const handleFileUpload = (e) => {
  //     const uploadedFiles = e.target.files;
  //     const newFilesArray = [];

  //     for (let i = 0; i < uploadedFiles.length; i++) {
  //         const file = uploadedFiles[i];
  //         newFilesArray.push(file);
  //     }

  //     // Update state with the combined array of files
  //     setFiles([...files, ...newFilesArray]);
  // };

  // const handleContentChange = (e) => {
  //     setContent(e.target.value)

  //     const newText = e.target.value.replace(/\n/g, '<br>'); // Replace newline characters with <br> tags
  //     setUpdateContent(newText);
  // }

  //     const TextareaAutosize = styled(BaseTextareaAutosize)`
  //   width: 100%;
  //   height: auto;
  //   font-family: IBM Plex Sans, sans-serif;
  //   font-size: 0.875rem;
  //   font-weight: 400;
  //   line-height: 1.5;
  //   padding: 8px 12px;
  //   border-radius: 10px;
  //   color: #333; /* Set your desired text color */
  //   background-color: #f1f1f1;
  //   border: 1px solid #ccc; /* Set your desired border color */
  //   box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.1);

  //   &:hover {
  //     border-color: #007FFF; /* Set your desired hover border color */
  //   }

  //   &:focus {
  //     border-color: #007FFF; /* Set your desired focus border color */
  //     box-shadow: 0 0 0 3px rgba(0, 127, 255, 0.3); /* Set your desired focus box shadow */
  //   }

  //   &:focus-visible {
  //     outline: 0;
  //   }
  // `;

  // const [mentionedName, setMentionedName] = useState("");

  // console.log('mentioned name', mentionedName)

  const [replyCommentStatus, setReplyCommentStatus] = useState(false);
  const [replyCommentStatusChain, setReplyCommentStatusChain] = useState(false);
  const [valueOfReply, setValueOfReply] = useState("");

  console.log("value of reply", valueOfReply);
  const handleChange = (event) => {
    // console.log('handleChange called',even);

    setValueOfReply(event.target.value);
    // Additional logic can be added here if needed
  };

  return (
    <>
      <div className='comment-section card p-3'>
        <div className='comment-section-wrapper bg-white '>
          <div className='comment-header-with-form '>
            <div className='comment-header-image'>
              <img
                src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTy2hMfXwz82PCLi8Cz1AzwHsNp9jOd9iqZd9fhHFI1&s'
                className='comment-header-image-person'
              />
            </div>
            {/* <div className='comment-header-form '>

                        <input type="text" class="form-control comment-input border -pill" id="exampleFormControlInput1" placeholder="Type comment" />
                    </div> */}

            <div className='w-100 main-comment-div'>
              {/* <TextareaAutosize aria-label="empty textarea" placeholder="Type your comment..." className="external-class  px-3"
                                value={valueOfReply}
                                // onChange={(e) => setValueOfReply(e.target.value)}
                                onChange={handleChange}
                            /> */}

              <BaseTextareaAutosize
                aria-label='empty textarea'
                placeholder='Type your comment...'
                // value={valueOfReply}
                // onChange={handleChange}
                className='external-class  px-3'
              />
            </div>
          </div>

          <div
            className='main-comment-wrapper'  >
            {/* <div className='main-comment-person-image border'> */}
            <img
              src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTy2hMfXwz82PCLi8Cz1AzwHsNp9jOd9iqZd9fhHFI1&s'
              className='main-comment-person-image-1'
            />
            {/* </div> */}
            <div className='main-comment-text'>
              <div className='d-flex justify-content-between'>
                <div className='comment-txt-person-name'>
                  <span className=''>Rakib Hossain</span>
                </div>
                <div className=''>2 weeks ago</div>
              </div>
              <div className='comment-txt'>
                <p>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s Lorem Ipsum is simply
                  dummy text of the printing and typesetting industry. Lorem
                  Ipsum has been the industry's standard dummy text ever since
                  the 1500s Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s
                </p>
              </div>

              <div className='main-comment-reaction-emoji-share-wrapper '>
                <div className=''>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='16'
                    height='16'
                    fill='currentColor'
                    class='bi bi-emoji-smile'
                    viewBox='0 0 16 16'>
                    <path d='M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z'></path>
                    <path d='M4.285 9.567a.5.5 0 0 1 .683.183A3.498 3.498 0 0 0 8 11.5a3.498 3.498 0 0 0 3.032-1.75.5.5 0 1 1 .866.5A4.498 4.498 0 0 1 8 12.5a4.498 4.498 0 0 1-3.898-2.25.5.5 0 0 1 .183-.683zM7 6.5C7 7.328 6.552 8 6 8s-1-.672-1-1.5S5.448 5 6 5s1 .672 1 1.5zm4 0c0 .828-.448 1.5-1 1.5s-1-.672-1-1.5S9.448 5 10 5s1 .672 1 1.5z'></path>
                  </svg>
                </div>
                <div
                  className='border'
                  onClick={(e) => {
                    setReplyCommentStatus(e, true);
                    setValueOfReply("Rakib Hossain ");
                  }}>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='16'
                    height='16'
                    fill='currentColor'
                    className='bi bi-reply-all  ml-2'
                    viewBox='0 0 16 16'>
                    <path d='M8.098 5.013a.144.144 0 0 1 .202.134V6.3a.5.5 0 0 0 .5.5c.667 0 2.013.005 3.3.822.984.624 1.99 1.76 2.595 3.876-1.02-.983-2.185-1.516-3.205-1.799a8.74 8.74 0 0 0-1.921-.306 7.404 7.404 0 0 0-.798.008h-.013l-.005.001h-.001L8.8 9.9l-.05-.498a.5.5 0 0 0-.45.498v1.153c0 .108-.11.176-.202.134L4.114 8.254a.502.502 0 0 0-.042-.028.147.147 0 0 1 0-.252.497.497 0 0 0 .042-.028l3.984-2.933zM9.3 10.386c.068 0 .143.003.223.006.434.02 1.034.086 1.7.271 1.326.368 2.896 1.202 3.94 3.08a.5.5 0 0 0 .933-.305c-.464-3.71-1.886-5.662-3.46-6.66-1.245-.79-2.527-.942-3.336-.971v-.66a1.144 1.144 0 0 0-1.767-.96l-3.994 2.94a1.147 1.147 0 0 0 0 1.946l3.994 2.94a1.144 1.144 0 0 0 1.767-.96v-.667z' />
                    <path d='M5.232 4.293a.5.5 0 0 0-.7-.106L.54 7.127a1.147 1.147 0 0 0 0 1.946l3.994 2.94a.5.5 0 1 0 .593-.805L1.114 8.254a.503.503 0 0 0-.042-.028.147.147 0 0 1 0-.252.5.5 0 0 0 .042-.028l4.012-2.954a.5.5 0 0 0 .106-.699z' />
                  </svg>
                </div>

                <div className=''>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='16'
                    height='16'
                    fill='gray'
                    class='bi bi-trash ml-2'
                    viewBox='0 0 16 16'>
                    <path d='M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z' />
                    <path d='M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z' />
                  </svg>
                </div>
              </div>

              {replyCommentStatus && (
                <div className='main-comment-reply-div-wrapper'>
                  <img
                    src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0Opx0jptaraMHRgaEhdaLxmcxCo87mHrToJ9akQA&s'
                    className='main-comment-person-image-1'
                  />
                  {/* </div> */}
                  {/* <div className='main-comment-text '> */}

                  <div className='w-100 main-comment-div'>
                    <BaseTextareaAutosize
                      aria-label='empty textarea'
                      placeholder='Type your comment...'
                      // value={valueOfReply}
                      value={valueOfReply}
                      onChange={handleChange}
                      // dangerouslySetInnerHTML={{ __html: valueOfReply }}

                      className='external-class  px-3 border'
                    />
                  </div>
                  {/* </div> */}
                </div>
              )}
            </div>
          </div>

          <div
            className='main-comment-wrapper  '>
            {/* <div className='main-comment-person-image border'> */}
            <img
              src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0Opx0jptaraMHRgaEhdaLxmcxCo87mHrToJ9akQA&s'
              className='main-comment-person-image-1'
            />
            {/* </div> */}
            <div className='main-comment-text  '>
              <div className='commeent-date-div'>
                <div className='comment-txt-person-name'>
                  <span className=''>Rasel Hossain</span>
                </div>
                <div>2 weeks ago</div>
              </div>
              <div className='comment-txt '>
                <p>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s
                </p>
              </div>

              <div className='main-comment-reaction-emoji-share-wrapper'>
                <div className=''>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='16'
                    height='16'
                    fill='currentColor'
                    class='bi bi-emoji-smile'
                    viewBox='0 0 16 16'>
                    <path d='M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z'></path>
                    <path d='M4.285 9.567a.5.5 0 0 1 .683.183A3.498 3.498 0 0 0 8 11.5a3.498 3.498 0 0 0 3.032-1.75.5.5 0 1 1 .866.5A4.498 4.498 0 0 1 8 12.5a4.498 4.498 0 0 1-3.898-2.25.5.5 0 0 1 .183-.683zM7 6.5C7 7.328 6.552 8 6 8s-1-.672-1-1.5S5.448 5 6 5s1 .672 1 1.5zm4 0c0 .828-.448 1.5-1 1.5s-1-.672-1-1.5S9.448 5 10 5s1 .672 1 1.5z'></path>
                  </svg>
                </div>
                <div className=''>
                  <svg
                    onClick={(e) => setReplyCommentStatusChain(e, true)}
                    xmlns='http://www.w3.org/2000/svg'
                    width='16'
                    height='16'
                    fill='currentColor'
                    className='bi bi-reply-all  ml-2'
                    viewBox='0 0 16 16'>
                    <path d='M8.098 5.013a.144.144 0 0 1 .202.134V6.3a.5.5 0 0 0 .5.5c.667 0 2.013.005 3.3.822.984.624 1.99 1.76 2.595 3.876-1.02-.983-2.185-1.516-3.205-1.799a8.74 8.74 0 0 0-1.921-.306 7.404 7.404 0 0 0-.798.008h-.013l-.005.001h-.001L8.8 9.9l-.05-.498a.5.5 0 0 0-.45.498v1.153c0 .108-.11.176-.202.134L4.114 8.254a.502.502 0 0 0-.042-.028.147.147 0 0 1 0-.252.497.497 0 0 0 .042-.028l3.984-2.933zM9.3 10.386c.068 0 .143.003.223.006.434.02 1.034.086 1.7.271 1.326.368 2.896 1.202 3.94 3.08a.5.5 0 0 0 .933-.305c-.464-3.71-1.886-5.662-3.46-6.66-1.245-.79-2.527-.942-3.336-.971v-.66a1.144 1.144 0 0 0-1.767-.96l-3.994 2.94a1.147 1.147 0 0 0 0 1.946l3.994 2.94a1.144 1.144 0 0 0 1.767-.96v-.667z' />
                    <path d='M5.232 4.293a.5.5 0 0 0-.7-.106L.54 7.127a1.147 1.147 0 0 0 0 1.946l3.994 2.94a.5.5 0 1 0 .593-.805L1.114 8.254a.503.503 0 0 0-.042-.028.147.147 0 0 1 0-.252.5.5 0 0 0 .042-.028l4.012-2.954a.5.5 0 0 0 .106-.699z' />
                  </svg>
                </div>

                <div className=''>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='16'
                    height='16'
                    fill='gray'
                    class='bi bi-trash ml-2'
                    viewBox='0 0 16 16'>
                    <path d='M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z' />
                    <path d='M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z' />
                  </svg>
                </div>
              </div>

              <div className='main-comment-reply-div-wrapper'>
                <img
                  src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0Opx0jptaraMHRgaEhdaLxmcxCo87mHrToJ9akQA&s'
                  className='main-comment-person-image-1'
                />
                {/* </div> */}
                <div className='main-comment-text '>
                  <div className='d-flex justify-content-between'>
                    <div className='comment-txt-person-name'>
                      <span className=''>Monir Hossain</span>
                    </div>
                    <div>2 weeks ago</div>
                  </div>

                  <div className='comment-txt '>
                    <p>
                      Oka Ipsum is simply dummy text of the printing and
                      typesetting industry. Lorem Ipsum has been the industry's
                      standard dummy text ever since the 1500s
                    </p>
                  </div>

                  <div className='main-comment-reaction-emoji-share-wrapper'>
                    <div className=''>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        width='16'
                        height='16'
                        fill='currentColor'
                        class='bi bi-emoji-smile'
                        viewBox='0 0 16 16'>
                        <path d='M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z'></path>
                        <path d='M4.285 9.567a.5.5 0 0 1 .683.183A3.498 3.498 0 0 0 8 11.5a3.498 3.498 0 0 0 3.032-1.75.5.5 0 1 1 .866.5A4.498 4.498 0 0 1 8 12.5a4.498 4.498 0 0 1-3.898-2.25.5.5 0 0 1 .183-.683zM7 6.5C7 7.328 6.552 8 6 8s-1-.672-1-1.5S5.448 5 6 5s1 .672 1 1.5zm4 0c0 .828-.448 1.5-1 1.5s-1-.672-1-1.5S9.448 5 10 5s1 .672 1 1.5z'></path>
                      </svg>
                    </div>
                    <div className=''>
                      <svg
                        onClick={(e) => setReplyCommentStatusChain(e, true)}
                        xmlns='http://www.w3.org/2000/svg'
                        width='16'
                        height='16'
                        fill='currentColor'
                        className='bi bi-reply-all  ml-2'
                        viewBox='0 0 16 16'>
                        <path d='M8.098 5.013a.144.144 0 0 1 .202.134V6.3a.5.5 0 0 0 .5.5c.667 0 2.013.005 3.3.822.984.624 1.99 1.76 2.595 3.876-1.02-.983-2.185-1.516-3.205-1.799a8.74 8.74 0 0 0-1.921-.306 7.404 7.404 0 0 0-.798.008h-.013l-.005.001h-.001L8.8 9.9l-.05-.498a.5.5 0 0 0-.45.498v1.153c0 .108-.11.176-.202.134L4.114 8.254a.502.502 0 0 0-.042-.028.147.147 0 0 1 0-.252.497.497 0 0 0 .042-.028l3.984-2.933zM9.3 10.386c.068 0 .143.003.223.006.434.02 1.034.086 1.7.271 1.326.368 2.896 1.202 3.94 3.08a.5.5 0 0 0 .933-.305c-.464-3.71-1.886-5.662-3.46-6.66-1.245-.79-2.527-.942-3.336-.971v-.66a1.144 1.144 0 0 0-1.767-.96l-3.994 2.94a1.147 1.147 0 0 0 0 1.946l3.994 2.94a1.144 1.144 0 0 0 1.767-.96v-.667z' />
                        <path d='M5.232 4.293a.5.5 0 0 0-.7-.106L.54 7.127a1.147 1.147 0 0 0 0 1.946l3.994 2.94a.5.5 0 1 0 .593-.805L1.114 8.254a.503.503 0 0 0-.042-.028.147.147 0 0 1 0-.252.5.5 0 0 0 .042-.028l4.012-2.954a.5.5 0 0 0 .106-.699z' />
                      </svg>
                    </div>

                    <div className=''>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        width='16'
                        height='16'
                        fill='gray'
                        class='bi bi-trash ml-2'
                        viewBox='0 0 16 16'>
                        <path d='M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z' />
                        <path d='M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z' />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
              {replyCommentStatusChain && (
                <div className='main-comment-reply-div-wrapper'>
                  <img
                    src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0Opx0jptaraMHRgaEhdaLxmcxCo87mHrToJ9akQA&s'
                    className='main-comment-person-image-1'
                  />
                  {/* </div> */}
                  {/* <div className='main-comment-text '> */}

                  <div className='w-100 main-comment-div'>
                    <BaseTextareaAutosize
                      aria-label='empty textarea'
                      placeholder='Type your comment...'
                      // value={valueOfReply}
                      // onChange={handleChange}
                      className='external-class  px-3 border'
                    />
                  </div>
                  {/* </div> */}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Check;
