import Masterdashboardlayout from "@/component/Masterdashboardlayout/Masterdashboardlayout";
import React from "react";
import "../../assets/css/storiesPage.css";
import authImg from "../../../public/img/author-page.jpg";
import strieImg from "../../../public/imgp3.jpg";

const page = () => {
  return (
    <div>
      <Masterdashboardlayout>
        <div className='row'>
          <div className='col-3 col-sm-3 col-md-3 col-lg-3 col-xl-3'>
            <div className='row'>
              <div className='col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6'>
                <h4 className='container-fluid'>All Story</h4>
              </div>
              <div className='col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6'>
                <span className='float-right'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='25'
                    height='25'
                    fill='currentColor'
                    class='bi bi-gear-fill'
                    viewBox='0 0 16 16'>
                    <path d='M9.405 1.05c-.413-1.4-2.397-1.4-2.81 0l-.1.34a1.464 1.464 0 0 1-2.105.872l-.31-.17c-1.283-.698-2.686.705-1.987 1.987l.169.311c.446.82.023 1.841-.872 2.105l-.34.1c-1.4.413-1.4 2.397 0 2.81l.34.1a1.464 1.464 0 0 1 .872 2.105l-.17.31c-.698 1.283.705 2.686 1.987 1.987l.311-.169a1.464 1.464 0 0 1 2.105.872l.1.34c.413 1.4 2.397 1.4 2.81 0l.1-.34a1.464 1.464 0 0 1 2.105-.872l.31.17c1.283.698 2.686-.705 1.987-1.987l-.169-.311a1.464 1.464 0 0 1 .872-2.105l.34-.1c1.4-.413 1.4-2.397 0-2.81l-.34-.1a1.464 1.464 0 0 1-.872-2.105l.17-.31c.698-1.283-.705-2.686-1.987-1.987l-.311.169a1.464 1.464 0 0 1-2.105-.872l-.1-.34zM8 10.93a2.929 2.929 0 1 1 0-5.86 2.929 2.929 0 0 1 0 5.858z' />
                  </svg>
                </span>
              </div>
            </div>
          </div>
          <div className='col-9 col-sm-9 col-md-9 col-lg-9 col-xl-9 stor-right-side'>
            <div className='stories-single-data-div'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='66'
                height='66'
                fill='currentColor'
                class='bi bi-arrow-left-circle-fill'
                viewBox='0 0 16 16'>
                <path d='M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm3.5 7.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z' />
              </svg>
              <div className='storss-nav-full-div'>
                <div className='stor-nav-div'>
                  <div className='stor-nav-auth-img-div'>
                    <img
                      className='stor-nav-auth-img'
                      src={authImg.src}
                      alt=''
                    />
                    <p>
                      Rakib Hossain{" "}
                      <span>
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          width='16'
                          height='16'
                          fill='currentColor'
                          class='bi bi-check-circle-fill'
                          viewBox='0 0 16 16'>
                          <path d='M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z' />
                        </svg>
                      </span>
                    </p>
                  </div>

                  <div className='stor-nav-icon-div'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='23'
                      height='23'
                      fill='white'
                      class='bi bi-pause-fill'
                      viewBox='0 0 16 16'>
                      <path d='M5.5 3.5A1.5 1.5 0 0 1 7 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5zm5 0A1.5 1.5 0 0 1 12 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5z' />
                    </svg>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='23'
                      height='23'
                      fill='white'
                      class='bi bi-volume-mute'
                      viewBox='0 0 16 16'>
                      <path d='M6.717 3.55A.5.5 0 0 1 7 4v8a.5.5 0 0 1-.812.39L3.825 10.5H1.5A.5.5 0 0 1 1 10V6a.5.5 0 0 1 .5-.5h2.325l2.363-1.89a.5.5 0 0 1 .529-.06zM6 5.04 4.312 6.39A.5.5 0 0 1 4 6.5H2v3h2a.5.5 0 0 1 .312.11L6 10.96V5.04zm7.854.606a.5.5 0 0 1 0 .708L12.207 8l1.647 1.646a.5.5 0 0 1-.708.708L11.5 8.707l-1.646 1.647a.5.5 0 0 1-.708-.708L10.793 8 9.146 6.354a.5.5 0 1 1 .708-.708L11.5 7.293l1.646-1.647a.5.5 0 0 1 .708 0z' />
                    </svg>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='23'
                      height='23'
                      fill='white'
                      class='bi bi-three-dots'
                      viewBox='0 0 16 16'>
                      <path d='M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z' />
                    </svg>
                  </div>
                </div>

                {/* sss */}

                <div className='storss-img-div'>
                  <img className='storss-img' src={strieImg.src} alt='' />
                </div>
              </div>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='66'
                height='66'
                fill='currentColor'
                class='bi bi-arrow-right-circle-fill'
                viewBox='0 0 16 16'>
                <path d='M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0zM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z' />
              </svg>
            </div>

            <div className='storie-input-full-div'>
              <div>
                <input
                  className='sotr-inp'
                  type='text'
                  placeholder='comment..'
                />
              </div>
              <div className='react-div'>
                <h5 className='react'>Reactions</h5>
              </div>
            </div>
          </div>
        </div>
      </Masterdashboardlayout>
    </div>
  );
};

export default page;
