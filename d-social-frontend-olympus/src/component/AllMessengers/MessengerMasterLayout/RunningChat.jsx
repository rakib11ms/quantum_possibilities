import React from "react";
import ChatBodyAuthor from "../../../../public/img/avatar3-sm.jpg";
import mssengrIdimg from "../../../../public/mssengr-idimg.png";

const ChatMiddledaboard = () => {
  return (
    <div>
      <div>
        <div className='Msnchat-head-full-div'>
          <div className='row'>
            <div className='col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6'>
              <div className='mschat-head-full'>
                {/* <div className='chat-head-name-div'>
            <span>To: </span>
            <p className='chat-head-name'>Zahidul Islam</p>
          </div> */}
                <div className='head-chat-img-div'>
                  <div>
                    <img
                      className='cht-heead-img'
                      src={mssengrIdimg.src}
                      alt=''
                    />
                  </div>
                  <div>
                    <h5>Zahidul Islam</h5>
                    <p className='cht-heead-text'>Last seen 11:03 am</p>
                  </div>
                </div>
              </div>
            </div>
            <div className='col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6'>
              <div className='chat-head-full-div'>
                {/* <div className='chat-head-name-div'>
            <span>To: </span>
            <p className='chat-head-name'>Zahidul Islam</p>
          </div> */}
                <div className=''>
                  <div className='head-chat-icon-div'>
                    <span>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        width='25'
                        height='25'
                        viewBox='0 0 25 25'
                        fill='none'>
                        <g clip-path='url(#clip0_3_225)'>
                          <path
                            d='M16.6666 4.16666C17.2416 4.16666 17.7083 4.63332 17.7083 5.20832V9.58332L23.1385 5.78124C23.3739 5.61666 23.6989 5.67395 23.8645 5.91041C23.925 5.99791 23.9583 6.10207 23.9583 6.20832V18.7917C23.9583 19.0792 23.725 19.3125 23.4375 19.3125C23.3302 19.3125 23.226 19.2792 23.1385 19.2187L17.7083 15.4167V19.7917C17.7083 20.3667 17.2416 20.8333 16.6666 20.8333H2.08329C1.50829 20.8333 1.04163 20.3667 1.04163 19.7917V5.20832C1.04163 4.63332 1.50829 4.16666 2.08329 4.16666H16.6666ZM8.33329 8.33332V11.4583H5.20829V13.5417H8.33225L8.33329 16.6667H10.4166L10.4156 13.5417H13.5416V11.4583H10.4166V8.33332H8.33329Z'
                            fill='#002046'
                          />
                        </g>
                        <defs>
                          <clipPath id='clip0_3_225'>
                            <rect width='25' height='25' fill='white' />
                          </clipPath>
                        </defs>
                      </svg>
                    </span>
                    <span>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        width='25'
                        height='25'
                        viewBox='0 0 25 25'
                        fill='none'>
                        <g clip-path='url(#clip0_3_229)'>
                          <path
                            d='M21.875 17.1042V20.7875C21.8751 21.0512 21.7752 21.3052 21.5954 21.4981C21.4156 21.6911 21.1693 21.8086 20.9062 21.8271C20.451 21.8583 20.0792 21.875 19.7917 21.875C10.5865 21.875 3.125 14.4135 3.125 5.20833C3.125 4.92083 3.14063 4.54896 3.17292 4.09375C3.19138 3.83067 3.30894 3.58439 3.50188 3.40459C3.69482 3.2248 3.94877 3.12488 4.2125 3.125H7.89583C8.02504 3.12487 8.14968 3.17277 8.24555 3.2594C8.34142 3.34602 8.40166 3.46519 8.41458 3.59375C8.43854 3.83333 8.46042 4.02396 8.48125 4.16875C8.68826 5.61346 9.1125 7.01858 9.73958 8.33646C9.83854 8.54479 9.77396 8.79375 9.58646 8.92708L7.33854 10.5333C8.71297 13.7359 11.2652 16.2881 14.4677 17.6625L16.0719 15.4187C16.1374 15.3271 16.2331 15.2613 16.3422 15.233C16.4513 15.2046 16.5668 15.2154 16.6688 15.2635C17.9865 15.8894 19.3912 16.3126 20.8354 16.5187C20.9802 16.5396 21.1708 16.5625 21.4083 16.5854C21.5367 16.5986 21.6556 16.6589 21.742 16.7548C21.8284 16.8506 21.8762 16.9751 21.876 17.1042H21.875Z'
                            fill='#002046'
                          />
                        </g>
                        <defs>
                          <clipPath id='clip0_3_229'>
                            <rect width='25' height='25' fill='white' />
                          </clipPath>
                        </defs>
                      </svg>
                    </span>
                    <span>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        width='25'
                        height='25'
                        viewBox='0 0 25 25'
                        fill='none'>
                        <g clip-path='url(#clip0_3_216)'>
                          <path
                            d='M12.5 3.125C11.3541 3.125 10.4166 4.0625 10.4166 5.20833C10.4166 6.35417 11.3541 7.29167 12.5 7.29167C13.6458 7.29167 14.5833 6.35417 14.5833 5.20833C14.5833 4.0625 13.6458 3.125 12.5 3.125ZM12.5 17.7083C11.3541 17.7083 10.4166 18.6458 10.4166 19.7917C10.4166 20.9375 11.3541 21.875 12.5 21.875C13.6458 21.875 14.5833 20.9375 14.5833 19.7917C14.5833 18.6458 13.6458 17.7083 12.5 17.7083ZM12.5 10.4167C11.3541 10.4167 10.4166 11.3542 10.4166 12.5C10.4166 13.6458 11.3541 14.5833 12.5 14.5833C13.6458 14.5833 14.5833 13.6458 14.5833 12.5C14.5833 11.3542 13.6458 10.4167 12.5 10.4167Z'
                            fill='#002046'
                          />
                        </g>
                        <defs>
                          <clipPath id='clip0_3_216'>
                            <rect width='25' height='25' fill='white' />
                          </clipPath>
                        </defs>
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='mschat-full-boddy-div'>
          <div className='incomming-div'>
            <div>
              <img className='incomming-img' src={ChatBodyAuthor.src} alt='' />
            </div>
            <div className='incomming-chat-text-div'>
              <p className='incomming-chat-text-short'>Hey How are you?</p>
              <p className='incomming-chat-text-big'>
                I was asking for your New Year Plans, ask we are going to host a
                party
              </p>
            </div>
          </div>
          <div className='Outgoing-div'>
            <div className='Outgoing-chat-text-div'>
              <div className='Outgoing-chat-text-short-div'>
                <p className='Outgoing-chat-text-short'>Hey How are you?</p>
              </div>
              <div className='Outgoing-chat-text-short-div'>
                <p className='Outgoing-chat-text-big'>
                  I was asking for your New Year Plans, ask we are going to host
                  a party
                </p>
              </div>
            </div>
            <div>
              <img className='incomming-img' src={ChatBodyAuthor.src} alt='' />
            </div>
          </div>
          <div className='Outgoing-div'>
            <div className='Outgoing-chat-text-div'>
              <div className='Outgoing-chat-text-short-div'>
                <p className='Outgoing-chat-text-short'>Hey How are you?</p>
              </div>
              <div className='Outgoing-chat-text-short-div'>
                <p className='Outgoing-chat-text-big'>
                  I was asking for your New Year Plans, ask we are going to host
                  a party
                </p>
              </div>
            </div>
            <div>
              <img className='incomming-img' src={ChatBodyAuthor.src} alt='' />
            </div>
          </div>
          <div className='incomming-div'>
            <div>
              <img className='incomming-img' src={ChatBodyAuthor.src} alt='' />
            </div>
            <div className='incomming-chat-text-div'>
              <p className='incomming-chat-text-short'>Hey How are you?</p>
              <p className='incomming-chat-text-big'>
                I was asking for your New Year Plans, ask we are going to host a
                party
              </p>
            </div>
          </div>
          <div className='Outgoing-div'>
            <div className='Outgoing-chat-text-div'>
              <div className='Outgoing-chat-text-short-div'>
                <p className='Outgoing-chat-text-short'>Hey How are you?</p>
              </div>
              <div className='Outgoing-chat-text-short-div'>
                <p className='Outgoing-chat-text-big'>
                  I was asking for your New Year Plans, ask we are going to host
                  a party
                </p>
              </div>
            </div>
            <div>
              <img className='incomming-img' src={ChatBodyAuthor.src} alt='' />
            </div>
          </div>
          <div className='Outgoing-div'>
            <div className='Outgoing-chat-text-div'>
              <div className='Outgoing-chat-text-short-div'>
                <p className='Outgoing-chat-text-short'>Hey How are you?</p>
              </div>
              <div className='Outgoing-chat-text-short-div'>
                <p className='Outgoing-chat-text-big'>
                  I was asking for your New Year Plans, ask we are going to host
                  a party
                </p>
              </div>
            </div>
            <div>
              <img className='incomming-img' src={ChatBodyAuthor.src} alt='' />
            </div>
          </div>

          <div className='incomming-div'>
            <div>
              <img className='incomming-img' src={ChatBodyAuthor.src} alt='' />
            </div>
            <div className='incomming-chat-text-div'>
              <p className='incomming-chat-text-short'>Hey How are you?</p>
              <p className='incomming-chat-text-big'>
                I was asking for your New Year Plans, ask we are going to host a
                party
              </p>
            </div>
          </div>
          <div className='incomming-div'>
            <div>
              <img className='incomming-img' src={ChatBodyAuthor.src} alt='' />
            </div>
            <div className='incomming-chat-text-div'>
              <p className='incomming-chat-text-short'>Hey How are you?</p>
              <p className='incomming-chat-text-big'>
                I was asking for your New Year Plans, ask we are going to host a
                party
              </p>
            </div>
          </div>
          <div className='incomming-div'>
            <div>
              <img className='incomming-img' src={ChatBodyAuthor.src} alt='' />
            </div>
            <div className='incomming-chat-text-div'>
              <p className='incomming-chat-text-short'>Hey How are you?</p>
              <p className='incomming-chat-text-big'>
                I was asking for your New Year Plans, ask we are going to host a
                party
              </p>
            </div>
          </div>
        </div>
        <div>
          <div className='mainchat-inputs-full-div'>
            <div className='row'>
              <div className='col-3 col-sm-3 col-md-3 col-lg-3 col-xl-3'>
                <div className='mainchat-left-side-div'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='100'
                    height='25'
                    viewBox='0 0 100 20'
                    fill='none'>
                    <path
                      d='M40 10C40 4.47715 44.4772 0 50 0C55.5228 0 60 4.47715 60 10C60 10.3931 59.9773 10.7811 59.9331 11.1628L58.2215 11.1628C56.6343 11.1625 55.6657 11.1624 54.8587 11.4246C53.2304 11.9537 51.9537 13.2304 51.4246 14.8587C51.1624 15.6657 51.1625 16.6343 51.1628 18.2215L51.1628 19.9331C50.7811 19.9773 50.3931 20 50 20C44.4772 20 40 15.5228 40 10Z'
                      fill='#307777'
                    />
                    <path
                      d='M52.5581 19.6696C56.0256 18.7546 58.7546 16.0256 59.6696 12.5581H58.3721C56.5864 12.5581 55.859 12.5667 55.2899 12.7516C54.0863 13.1427 53.1427 14.0863 52.7516 15.2899C52.5667 15.859 52.5581 16.5864 52.5581 18.3721V19.6696Z'
                      fill='#307777'
                    />
                    <path
                      fill-rule='evenodd'
                      clip-rule='evenodd'
                      d='M0 10C0 5.83363 0 3.75045 1.06102 2.29008C1.40368 1.81844 1.81844 1.40368 2.29008 1.06102C3.75045 0 5.83363 0 10 0C10.9322 0 11.76 0 12.5 0.0118828L12.5 0.0898001C12.4999 1.03649 12.4999 1.61314 12.5787 2.11055C13.0116 4.84431 15.1557 6.98836 17.8894 7.42134C18.3869 7.50013 18.9635 7.50008 19.9102 7.50001L19.9881 7.5C20 8.23996 20 9.06784 20 10C20 14.1664 20 16.2496 18.939 17.7099C18.5963 18.1816 18.1816 18.5963 17.7099 18.939C16.2496 20 14.1664 20 10 20C5.83363 20 3.75045 20 2.29008 18.939C1.81844 18.5963 1.40368 18.1816 1.06102 17.7099C0 16.2496 0 14.1664 0 10ZM9.77057 7.88692C9.75413 7.87372 9.73802 7.86097 9.72222 7.84866V15.5556C9.72222 16.0158 9.34913 16.3889 8.88889 16.3889C8.42865 16.3889 8.05556 16.0158 8.05556 15.5556V7.84866C8.03976 7.86097 8.02365 7.87372 8.00721 7.88692C7.64874 8.17481 7.22259 8.60298 6.58949 9.24176L5.03632 10.8088C4.71234 11.1357 4.18471 11.1381 3.85782 10.8141C3.53094 10.4901 3.52858 9.96249 3.85257 9.6356L5.43961 8.03433C6.03004 7.43858 6.52247 6.94171 6.9636 6.58744C7.4263 6.21585 7.91257 5.93321 8.50501 5.8577C8.75991 5.82521 9.01787 5.82521 9.27277 5.8577C9.86521 5.93321 10.3515 6.21585 10.8142 6.58744C11.2553 6.9417 11.7477 7.43856 12.3381 8.0343L13.9252 9.6356C14.2492 9.96249 14.2468 10.4901 13.92 10.8141C13.5931 11.1381 13.0654 11.1357 12.7415 10.8088L11.1883 9.24176C10.5552 8.60298 10.129 8.17481 9.77057 7.88692Z'
                      fill='#307777'
                    />
                    <path
                      d='M14.2248 1.84983C14.1705 1.50717 14.1668 1.08408 14.1667 0.0725961C15.7663 0.177494 16.8469 0.433963 17.7099 1.06102C18.1816 1.40368 18.5963 1.81844 18.939 2.29008C19.566 3.15315 19.8225 4.23375 19.9274 5.83333C18.9159 5.83319 18.4928 5.82947 18.1502 5.7752C16.1296 5.45516 14.5448 3.87043 14.2248 1.84983Z'
                      fill='#307777'
                    />
                    <path
                      fill-rule='evenodd'
                      clip-rule='evenodd'
                      d='M85.422 0.126901C86.5934 -1.48706e-05 88.07 -8.20888e-06 89.9536 1.34974e-07H90.0464C91.93 -8.20888e-06 93.4066 -1.48706e-05 94.578 0.126901C95.7734 0.256417 96.742 0.525461 97.569 1.12631C98.0697 1.49006 98.5099 1.93035 98.8737 2.43101C99.4745 3.25801 99.7436 4.2266 99.8731 5.42203C100 6.59343 100 8.06999 100 9.95357V10.0061C100 10.9644 100 11.8136 99.9845 12.5646C99.9387 14.774 99.7659 16.341 98.8737 17.569C98.5099 18.0697 98.0697 18.5099 97.569 18.8737C96.742 19.4745 95.7734 19.7436 94.578 19.8731C93.4066 20 91.9301 20 90.0465 20H89.9536C88.07 20 86.5934 20 85.422 19.8731C84.2266 19.7436 83.258 19.4745 82.431 18.8737C81.9485 18.5231 81.5221 18.1015 81.1662 17.6233C81.1528 17.6052 81.1395 17.5872 81.1263 17.569C80.5255 16.742 80.2564 15.7734 80.1269 14.578C80 13.4066 80 11.93 80 10.0464V9.95359C80 8.06997 80 6.59345 80.1269 5.42203C80.2564 4.2266 80.5255 3.25801 81.1263 2.43101C81.4901 1.93035 81.9304 1.49006 82.431 1.12631C83.258 0.525461 84.2266 0.256417 85.422 0.126901ZM98.4567 11.7966L98.3921 11.7342C98.1091 11.4623 97.8999 11.2783 97.7032 11.1386C95.4993 9.57383 92.4593 9.98821 90.7546 12.0858C90.5488 12.3391 90.3427 12.6766 90.0187 13.2433L89.4872 13.0769C88.261 12.8317 87.6479 12.7091 87.0852 12.721C85.5793 12.753 84.1636 13.4454 83.2139 14.6144C82.8973 15.0041 82.6406 15.4913 82.1918 16.386C82.2472 16.4839 82.3068 16.5764 82.371 16.6647L82.4004 16.7048C82.6635 17.0583 82.9787 17.3699 83.3353 17.6291C83.8563 18.0076 84.5232 18.2283 85.5877 18.3436C86.6667 18.4605 88.0599 18.4615 90 18.4615C91.9401 18.4615 93.3333 18.4605 94.4123 18.3436C95.4768 18.2283 96.1437 18.0076 96.6647 17.6291C97.0348 17.3602 97.3602 17.0348 97.6291 16.6647C98.2051 15.8718 98.4 14.7719 98.4463 12.5328C98.4512 12.298 98.4545 12.053 98.4567 11.7966ZM88.9744 8.97436C87.8415 8.97436 86.9231 8.05597 86.9231 6.92308C86.9231 5.79019 87.8415 4.8718 88.9744 4.8718C90.1073 4.8718 91.0256 5.79019 91.0256 6.92308C91.0256 8.05597 90.1073 8.97436 88.9744 8.97436Z'
                      fill='#307777'
                    />
                  </svg>
                </div>
              </div>
              <div className='col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6'>
                <div>
                  <input
                    className='mainchat-input'
                    type='text'
                    placeholder='Type your Message..'
                  />
                </div>
              </div>
              <div className='col-3 col-sm-3 col-md-3 col-lg-3 col-xl-3'>
                <div className='mainchat-right-side-div'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='25'
                    height='25'
                    viewBox='0 0 20 20'
                    fill='none'>
                    <path
                      fill-rule='evenodd'
                      clip-rule='evenodd'
                      d='M10 20C15.5228 20 20 15.5228 20 10C20 4.47715 15.5228 0 10 0C4.47715 0 0 4.47715 0 10C0 15.5228 4.47715 20 10 20ZM6.90017 5.25465C7.31858 5.01872 7.99432 4.79563 8.57787 5.3246C9.96312 6.5803 7.58754 9 6.5 9C5.41247 9 3.03688 6.5803 4.42213 5.3246C5.00568 4.79563 5.68141 5.01873 6.09982 5.25465C6.33624 5.38796 6.66375 5.38796 6.90017 5.25465ZM15.5779 5.3246C14.9943 4.79563 14.3186 5.01872 13.9002 5.25465C13.6637 5.38796 13.3362 5.38796 13.0998 5.25465C12.6814 5.01873 12.0057 4.79563 11.4221 5.3246C10.0369 6.5803 12.4125 9 13.5 9C14.5875 9 16.9631 6.5803 15.5779 5.3246ZM10 17C8.29876 17 6.832 15.6362 5.88467 14.384C5.43226 13.7861 5.89514 13 6.64496 13H13.355C14.1049 13 14.5677 13.7861 14.1153 14.384C13.168 15.6362 11.7012 17 10 17Z'
                      fill='#307777'
                    />
                  </svg>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='20'
                    height='20'
                    viewBox='0 0 20 20'
                    fill='none'>
                    <g clip-path='url(#clip0_6_4237)'>
                      <path
                        d='M9.99999 0.833374C10.5472 0.833374 11.089 0.941148 11.5945 1.15054C12.1 1.35994 12.5594 1.66685 12.9463 2.05376C13.3332 2.44067 13.6401 2.9 13.8495 3.40553C14.0589 3.91105 14.1667 4.45287 14.1667 5.00004V10C14.1667 11.1051 13.7277 12.1649 12.9463 12.9463C12.1649 13.7277 11.1051 14.1667 9.99999 14.1667C8.89493 14.1667 7.83512 13.7277 7.05372 12.9463C6.27231 12.1649 5.83333 11.1051 5.83333 10V5.00004C5.83333 3.89497 6.27231 2.83516 7.05372 2.05376C7.83512 1.27236 8.89493 0.833374 9.99999 0.833374ZM1.82666 11.635L3.46166 11.3075C3.76532 12.8179 4.58252 14.1766 5.77442 15.1527C6.96632 16.1288 8.4594 16.6622 9.99999 16.6622C11.5406 16.6622 13.0337 16.1288 14.2256 15.1527C15.4175 14.1766 16.2347 12.8179 16.5383 11.3075L18.1733 11.635C17.4133 15.4542 14.0417 18.3334 9.99999 18.3334C5.95833 18.3334 2.58666 15.4542 1.82666 11.635Z'
                        fill='#307777'
                      />
                    </g>
                    <defs>
                      <clipPath id='clip0_6_4237'>
                        <rect width='20' height='20' fill='white' />
                      </clipPath>
                    </defs>
                  </svg>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='21'
                    height='20'
                    viewBox='0 0 21 20'
                    fill='none'>
                    <path
                      d='M0.388544 6.98257C-0.128686 6.81016 -0.13364 6.53173 0.398452 6.35437L19.311 0.0505081C19.8352 -0.123884 20.1354 0.169411 19.9888 0.682678L14.5846 19.5943C14.436 20.1184 14.1338 20.1363 13.9118 19.6388L10.3507 11.6248L16.2958 3.69787L8.36894 9.64304L0.388544 6.98257Z'
                      fill='#307777'
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatMiddledaboard;
