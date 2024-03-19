import { useState } from "react";
import authorImage from "../../../public/img/avatar10-sm.jpg";
import Image from "next/image";

const ManageContributers = () => {
  const [showSettings, setShowSettings] = useState(false);

  const toggleSettings = () => {
    setShowSettings(!showSettings);
  };

  return (
    <div className='container-fluid'>
      <div className='contributors-header-tag-div' onClick={toggleSettings}>
        <h5> Contributors</h5>
        <div className='settings-svg-div'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='28'
            height='28'
            fill='currentColor'
            class='bi bi-gear'
            viewBox='0 0 16 16'>
            <path d='M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z' />
            <path d='M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115l.094-.319z' />
          </svg>
        </div>
      </div>

      <div className='contributors-header-tag-btn-div'>
        <div className='contributors-header-tag-btn'>
          <h6>Manage page contributors</h6>
          <button className='add-manage-btn'>+ Add new</button>
        </div>

        <div className='admin-moderator-full-div'>
          <div>
            <h6 className='mt-3'>Admin</h6>
            <hr />

            <div className='row'>
              <div className='col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6'>
                <div className='row mt-2'>
                  <div className='col-3 col-sm-3 col-md-3 col-lg-3 col-xl-3'>
                    <div className='auth-img-contributer-div'>
                      <Image
                        className='auth-img-contributer'
                        src={authorImage}
                        width={60}
                        height={60}
                        alt=''
                      />
                    </div>
                  </div>
                  <div className='col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6'>
                    <h6 className='auth-texth6-contributer'>Anila De cruz</h6>
                    <p className='auth-textp-contributer'>
                      Member since July 2023
                    </p>
                  </div>
                  <div className='col-3 col-sm-3 col-md-3 col-lg-3 col-xl-3'>
                    <div className='more'>
                      <div>
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          width='16'
                          height='16'
                          fill='currentColor'
                          class='bi bi-three-dots'
                          viewBox='0 0 16 16'>
                          <path d='M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z' />
                        </svg>
                        <ul className='more-dropdown'>
                          <li>Change role</li>
                          <hr />
                          <li>Remove</li>
                          <hr />
                          <li>Block</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className='col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6'>
                <div className='row mt-4'>
                  <div className='col-2 col-sm-2 col-md-2 col-lg-2 col-xl-2'>
                    <div className='auth-img-contributer-div'>
                      <Image
                        className='auth-img-contributer'
                        src={authorImage}
                        width={60}
                        height={60}
                        alt=''
                      />
                    </div>
                  </div>
                  <div className='col-8 col-sm-8 col-md-8 col-lg-8 col-xl-8'>
                    <h6 className='auth-texth6-contributer'>Anila De cruz</h6>
                    <p className='auth-textp-contributer'>
                      Member since July 2023
                    </p>
                  </div>
                  <div className='col-2 col-sm-2 col-md-2 col-lg-2 col-xl-2'>
                    <div className='more'>
                      <div>
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          width='16'
                          height='16'
                          fill='currentColor'
                          class='bi bi-three-dots'
                          viewBox='0 0 16 16'>
                          <path d='M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z' />
                        </svg>
                        <ul className='more-dropdown'>
                          <li>Change role</li>
                          <hr />
                          <li>Remove</li>
                          <hr />
                          <li>Block</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h6 className='mt-5'>Moderator</h6>
            <hr />

            <div className='row'>
              <div className='col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6'>
                <div className='row mt-2'>
                  <div className='col-3 col-sm-3 col-md-3 col-lg-3 col-xl-3'>
                    <div className='auth-img-contributer-div'>
                      <Image
                        className='auth-img-contributer'
                        src={authorImage}
                        width={60}
                        height={60}
                        alt=''
                      />
                    </div>
                  </div>
                  <div className='col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6'>
                    <h6 className='auth-texth6-contributer'>Anila De cruz</h6>
                    <p className='auth-textp-contributer'>
                      Member since July 2023
                    </p>
                  </div>
                  <div className='col-3 col-sm-3 col-md-3 col-lg-3 col-xl-3'>
                    <div className='more'>
                      <div>
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          width='16'
                          height='16'
                          fill='currentColor'
                          class='bi bi-three-dots'
                          viewBox='0 0 16 16'>
                          <path d='M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z' />
                        </svg>
                        <ul className='more-dropdown'>
                          <li>Change role</li>
                          <hr />
                          <li>Remove</li>
                          <hr />
                          <li>Block</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className='col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6'>
                <div className='row mt-4'>
                  <div className='col-2 col-sm-2 col-md-2 col-lg-2 col-xl-2'>
                    <div className='auth-img-contributer-div'>
                      <Image
                        className='auth-img-contributer'
                        src={authorImage}
                        width={60}
                        height={60}
                        alt=''
                      />
                    </div>
                  </div>
                  <div className='col-8 col-sm-8 col-md-8 col-lg-8 col-xl-8'>
                    <h6 className='auth-texth6-contributer'>Anila De cruz</h6>
                    <p className='auth-textp-contributer'>
                      Member since July 2023
                    </p>
                  </div>
                  <div className='col-2 col-sm-2 col-md-2 col-lg-2 col-xl-2'>
                    <div className='more'>
                      <div>
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          width='16'
                          height='16'
                          fill='currentColor'
                          class='bi bi-three-dots'
                          viewBox='0 0 16 16'>
                          <path d='M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z' />
                        </svg>
                        <ul className='more-dropdown'>
                          <li>Change role</li>
                          <hr />
                          <li>Remove</li>
                          <hr />
                          <li>Block</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showSettings && (
        <div className='settings-div'>
          <div className='contributors-header-tag-div'>
            <h5>Contributor Permission settings</h5>
            <div className='settings-svg-div'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='28'
                height='28'
                fill='currentColor'
                class='bi bi-people'
                viewBox='0 0 16 16'>
                <path d='M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1h8Zm-7.978-1A.261.261 0 0 1 7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.002a.274.274 0 0 1-.014.002H7.022ZM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM6.936 9.28a5.88 5.88 0 0 0-1.23-.247A7.35 7.35 0 0 0 5 9c-4 0-5 3-5 4 0 .667.333 1 1 1h4.216A2.238 2.238 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816ZM4.92 10A5.493 5.493 0 0 0 4 13H1c0-.26.164-1.03.76-1.724.545-.636 1.492-1.256 3.16-1.275ZM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0Zm3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4Z' />
              </svg>
            </div>
          </div>

          <div className='contributors-header-tag-btn-div'>
            <div className='contributors-header-tag-btn'>
              <h6>Manage page contributors</h6>
              <button className='add-manage-btn'>+ Add new</button>
            </div>

            <div className='admin-moderator-full-div'>
              <div>
                <h6 className='mt-3'>Admin</h6>
                <hr />

                <div className='row'>
                  <div className='col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6'>
                    <div className='row mt-2'>
                      <div className='col-3 col-sm-3 col-md-3 col-lg-3 col-xl-3'>
                        <div className='auth-img-contributer-div'>
                          <Image
                            className='auth-img-contributer'
                            src={authorImage}
                            width={60}
                            height={60}
                            alt=''
                          />
                        </div>
                      </div>
                      <div className='col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6'>
                        <h6 className='auth-texth6-contributer'>
                          Anila De cruz
                        </h6>
                        <p className='auth-textp-contributer'>
                          Member since July 2023
                        </p>
                      </div>
                      <div className='col-3 col-sm-3 col-md-3 col-lg-3 col-xl-3'>
                        <div className='more'>
                          <div>
                            <svg
                              xmlns='http://www.w3.org/2000/svg'
                              width='16'
                              height='16'
                              fill='currentColor'
                              class='bi bi-three-dots'
                              viewBox='0 0 16 16'>
                              <path d='M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z' />
                            </svg>
                            <ul className='more-dropdown'>
                              <li>Change role</li>
                              <hr />
                              <li>Remove</li>
                              <hr />
                              <li>Block</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6'>
                    <div className='row mt-4'>
                      <div className='col-2 col-sm-2 col-md-2 col-lg-2 col-xl-2'>
                        <div className='auth-img-contributer-div'>
                          <Image
                            className='auth-img-contributer'
                            src={authorImage}
                            width={60}
                            height={60}
                            alt=''
                          />
                        </div>
                      </div>
                      <div className='col-8 col-sm-8 col-md-8 col-lg-8 col-xl-8'>
                        <h6 className='auth-texth6-contributer'>
                          Anila De cruz
                        </h6>
                        <p className='auth-textp-contributer'>
                          Member since July 2023
                        </p>
                      </div>
                      <div className='col-2 col-sm-2 col-md-2 col-lg-2 col-xl-2'>
                        <div className='more'>
                          <div>
                            <svg
                              xmlns='http://www.w3.org/2000/svg'
                              width='16'
                              height='16'
                              fill='currentColor'
                              class='bi bi-three-dots'
                              viewBox='0 0 16 16'>
                              <path d='M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z' />
                            </svg>
                            <ul className='more-dropdown'>
                              <li>Change role</li>
                              <hr />
                              <li>Remove</li>
                              <hr />
                              <li>Block</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h6 className='mt-5'>Moderator</h6>
                <hr />

                <div className='row'>
                  <div className='col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6'>
                    <div className='row mt-2'>
                      <div className='col-3 col-sm-3 col-md-3 col-lg-3 col-xl-3'>
                        <div className='auth-img-contributer-div'>
                          <Image
                            className='auth-img-contributer'
                            src={authorImage}
                            width={60}
                            height={60}
                            alt=''
                          />
                        </div>
                      </div>
                      <div className='col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6'>
                        <h6 className='auth-texth6-contributer'>
                          Anila De cruz
                        </h6>
                        <p className='auth-textp-contributer'>
                          Member since July 2023
                        </p>
                      </div>
                      <div className='col-3 col-sm-3 col-md-3 col-lg-3 col-xl-3'>
                        <div className='more'>
                          <div>
                            <svg
                              xmlns='http://www.w3.org/2000/svg'
                              width='16'
                              height='16'
                              fill='currentColor'
                              class='bi bi-three-dots'
                              viewBox='0 0 16 16'>
                              <path d='M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z' />
                            </svg>
                            <ul className='more-dropdown'>
                              <li>Change role</li>
                              <hr />
                              <li>Remove</li>
                              <hr />
                              <li>Block</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6'>
                    <div className='row mt-4'>
                      <div className='col-2 col-sm-2 col-md-2 col-lg-2 col-xl-2'>
                        <div className='auth-img-contributer-div'>
                          <Image
                            className='auth-img-contributer'
                            src={authorImage}
                            width={60}
                            height={60}
                            alt=''
                          />
                        </div>
                      </div>
                      <div className='col-8 col-sm-8 col-md-8 col-lg-8 col-xl-8'>
                        <h6 className='auth-texth6-contributer'>
                          Anila De cruz
                        </h6>
                        <p className='auth-textp-contributer'>
                          Member since July 2023
                        </p>
                      </div>
                      <div className='col-2 col-sm-2 col-md-2 col-lg-2 col-xl-2'>
                        <div className='more'>
                          <div>
                            <svg
                              xmlns='http://www.w3.org/2000/svg'
                              width='16'
                              height='16'
                              fill='currentColor'
                              class='bi bi-three-dots'
                              viewBox='0 0 16 16'>
                              <path d='M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z' />
                            </svg>
                            <ul className='more-dropdown'>
                              <li>Change role</li>
                              <hr />
                              <li>Remove</li>
                              <hr />
                              <li>Block</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageContributers;
