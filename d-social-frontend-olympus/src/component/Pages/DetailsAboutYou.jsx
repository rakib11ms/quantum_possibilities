import Image from "next/image";
import React from "react";
import Sidenav1 from "../../../public/settingsprivecy.svg";

const DetailsAboutYou = () => {
  return (
    <div>
      <div>
        <div className=' '>
          <div className='about-Privacy-page-img-div'>
            <Image
              className='about-Privacy-page-img'
              src={Sidenav1}
              width={30}
              height={30}
              alt='page-nav'
            />
            <div className=''>
              <p className='about-transparency-tag-first'>
                Details information
              </p>
              <p className='about-Privacy-tag'>
                {" "}
                <span>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='16'
                    height='16'
                    fill='currentColor'
                    class='bi bi-plus-circle'
                    viewBox='0 0 16 16'>
                    <path d='M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z' />
                    <path d='M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z' />
                  </svg>
                </span>{" "}
                Add something ...
              </p>
              <p className='about-Privacy-tag'>
                {" "}
                <span>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='16'
                    height='16'
                    fill='currentColor'
                    class='bi bi-plus-circle'
                    viewBox='0 0 16 16'>
                    <path d='M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z' />
                    <path d='M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z' />
                  </svg>
                </span>{" "}
                Add something ...
              </p>
            </div>
          </div>

          {/* <div>
            <ul className='container contactInfo-ul'>
              <li className='about-Privacy-page-div'>
                <Image
                  className='about-Privacy-page-img'
                  src={Sidenav1}
                  width={30}
                  height={30}
                  alt='page-nav'
                />
                <p className='about-Privacy-tag'>Privacy and legal info</p>
              </li>
              <li>
                <span>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='16'
                    height='16'
                    fill='currentColor'
                    class='bi bi-plus-circle'
                    viewBox='0 0 16 16'>
                    <path d='M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z' />
                    <path d='M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z' />
                  </svg>
                </span>{" "}
                Add privacy policy link
              </li>
              <li>
                <span>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='16'
                    height='16'
                    fill='currentColor'
                    class='bi bi-plus-circle'
                    viewBox='0 0 16 16'>
                    <path d='M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z' />
                    <path d='M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z' />
                  </svg>
                </span>{" "}
                Add Impressum
              </li>
            </ul>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default DetailsAboutYou;
