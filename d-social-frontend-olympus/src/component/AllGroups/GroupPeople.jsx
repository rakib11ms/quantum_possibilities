import React, { useState } from "react";
import author from "../../../public/img/author-page.jpg";
import timeFormat from "../../../utils/CommentTimeFormat";
import { TextFieldWrapper, getFileUrl } from "@/component/Reuseable";
import axiosInstance from "../../../utils/axios";
import { toast } from "react-toastify";

const GroupPeople = ({ groupMembers, memberCount, fetchMember }) => {
  const [activeDivs, setActiveDivs] = useState(1)
  return (
    <div>
      {/* <div className='group-people-div'>
        <div className='group-peo-head-tag-div'>
          <h5>Group People</h5>
          <input
            className='grp-ppl-inp'
            type='search'
            placeholder='Search people'
          />
        </div>
        <div className='group-peo-head-text-div'>
          <div>
            <h5 className='accounts-num'>
              <strong>{memberCount} </strong>
              members
            </h5>
            <h6 className='accounts-num'>
              These are people who've joined your group.
            </h6>
          </div>
          <p className='accounts-nump'>See All</p>
        </div>
      </div> */}

      <div className='all-people-full-div'>

        <div className="d-flex justify-content-between border-bottom">
          <div className="group-right-nav-div py-3 "  >
            <div
              onClick={() => setActiveDivs(1)}
              className={`p-0 dashboard-side-bar-lis ${activeDivs === 1 ? "active-dass" : ""}`}
              style={activeDivs === 1 ? { borderBottom: "3px solid gray", padding: '0px' } : {}}
            >
              All Members
            </div>
            <div
              onClick={() => setActiveDivs(2)}
              className={`p-0 dashboard-side-bar-lis ${activeDivs === 2 ? "active-dass" : ""
                }`}
              style={activeDivs === 2 ? { borderBottom: "3px solid gray", padding: '0px' } : {}}
            >
              Group Admins & moderators
            </div>
          </div>



          <div className="h-2">
            <div className="input-group">
              <span className="input-group-text"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                <g clip-path="url(#clip0_500_2117)">
                  <path d="M10.7431 2.25703C11.8685 3.38221 12.5007 4.90834 12.5008 6.49968C12.5009 8.09102 11.8688 9.61722 10.7436 10.7425C9.61846 11.8678 8.09234 12.5001 6.501 12.5002C4.90966 12.5003 3.38346 11.8682 2.25814 10.743C1.13283 9.61785 0.500582 8.09173 0.500488 6.50039C0.500395 4.90905 1.13246 3.38285 2.25764 2.25753C3.38282 1.13222 4.90895 0.499972 6.50029 0.499878C8.09163 0.499784 9.61783 1.13185 10.7431 2.25703ZM9.68314 3.31703C8.83922 2.47298 7.69457 1.99875 6.501 1.99865C5.30742 1.99856 4.16269 2.47261 3.31864 3.31653C2.47459 4.16045 2.00036 5.3051 2.00026 6.49868C2.00017 7.69225 2.47422 8.83698 3.31814 9.68103C4.16537 10.5082 5.3045 10.9682 6.48858 10.9612C7.67265 10.9541 8.80623 10.4807 9.64358 9.64346C10.4809 8.80625 10.9545 7.67274 10.9618 6.48867C10.969 5.3046 10.5092 4.16539 9.68214 3.31803L9.68314 3.31703Z" fill="#8E8E8E" />
                  <path d="M10.3901 8.75C10.3122 8.88838 10.2456 9.03286 10.1911 9.182C10.0361 9.599 9.96107 10.031 10.0191 10.466C10.0741 10.881 10.2511 11.26 10.5591 11.569C10.695 11.7054 10.8781 11.7843 11.0706 11.7894C11.263 11.7944 11.4501 11.7253 11.593 11.5963C11.7359 11.4673 11.8237 11.2882 11.8382 11.0963C11.8528 10.9043 11.7929 10.7141 11.6711 10.565L11.6201 10.508C11.5552 10.4438 11.5148 10.3589 11.5061 10.268C11.4851 10.113 11.5201 9.912 11.5961 9.705C11.6271 9.624 11.6561 9.56 11.6761 9.523L11.6881 9.501C11.7374 9.4157 11.7695 9.32152 11.7825 9.22382C11.7955 9.12612 11.7891 9.02683 11.7637 8.9316C11.7383 8.83638 11.6944 8.74708 11.6345 8.66882C11.5746 8.59057 11.4999 8.52487 11.4146 8.4755C11.3293 8.42612 11.2351 8.39402 11.1374 8.38105C11.0397 8.36807 10.9404 8.37446 10.8452 8.39986C10.7499 8.42525 10.6607 8.46916 10.5824 8.52906C10.5041 8.58897 10.4384 8.6637 10.3891 8.749L10.3901 8.75Z" fill="#8E8E8E" />
                  <path d="M9.55724 11.659C9.59524 11.641 9.64724 11.619 9.70724 11.595C9.91424 11.518 10.1152 11.483 10.2692 11.503C10.3492 11.513 10.4122 11.537 10.4672 11.58L10.5082 11.616C10.6504 11.7485 10.8385 11.8206 11.0328 11.8172C11.2271 11.8137 11.4125 11.735 11.5499 11.5976C11.6873 11.4602 11.766 11.2748 11.7694 11.0805C11.7728 10.8862 11.7007 10.6982 11.5682 10.556C11.2713 10.2577 10.883 10.0675 10.4652 10.016C10.0302 9.95799 9.59824 10.034 9.18124 10.191C8.99224 10.261 8.84524 10.334 8.74824 10.391C8.58768 10.4851 8.46783 10.6355 8.41199 10.813C8.35616 10.9906 8.36832 11.1825 8.44612 11.3516C8.52392 11.5207 8.6618 11.6548 8.83296 11.7278C9.00411 11.8009 9.19633 11.8077 9.37224 11.747L9.43824 11.72L9.55824 11.659H9.55724Z" fill="#8E8E8E" />
                  <path d="M13.4632 15.142L13.4232 15.098L9.84922 10.906C9.25022 10.203 10.2042 9.24997 10.9072 9.84897L15.0982 13.423L15.1422 13.463C15.2002 13.522 15.2642 13.6 15.3242 13.703C15.5732 14.128 15.5732 14.663 15.1702 15.113L15.1132 15.17C14.6632 15.573 14.1272 15.573 13.7022 15.324C13.6148 15.2738 13.5351 15.2126 13.4632 15.142Z" fill="#8E8E8E" />
                </g>
                <defs>
                  <clipPath id="clip0_500_2117">
                    <rect width="16" height="16" fill="white" />
                  </clipPath>
                </defs>
              </svg>
              </span>
              <input type="text" className="form-control" placeholder="Search files" />
            </div>
          
          </div>



        </div>

        {activeDivs == 1 && <div>
          {
            groupMembers?.map((member, index) =>
            (
              <div className='all-people-div' key={index}>

                <div className='people-img-div'>
                  <img className='people-img' src={getFileUrl('/uploads/' + member?.group_member_user_id?.profile_pic)} alt='' />
                  <div>
                    <h6>{member?.group_member_user_id?.first_name} {member?.group_member_user_id?.last_name}</h6>
                    <p>Joined about {timeFormat(member?.createdAt)} ago</p>
                  </div>
                </div>

                <div style={{ display: 'flex', padding: '0 1em 0', gap: 3 }}>

                  {member?.group_member_user_id?._id !== member?.group_id?.group_created_user_id &&
                    (<div style={{
                      display: 'flex',
                      gap: 20
                    }}>
                      <button className="group-demo-invite-btn px-2">
                        Add Friend
                      </button>
                      <div className='more'>
                        <svg
                          className='threedotsvg'
                          xmlns='http://www.w3.org/2000/svg'
                          width='16'
                          height='16'
                          fill='currentColor'
                          class='bi bi-three-dots'
                          viewBox='0 0 16 16'>
                          <path d='M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3' />
                        </svg>
                        <ul className='more-dropdown'>
                          <li>
                            <p type='button' onClick={() => {
                              // member?.group_member_user_id?._id
                              axiosInstance.patch(`/api/group-member-status-change?group_id=${member?.group_id?._id}&user_id=${member?.group_member_user_id?._id}&status=delete`)
                                .then(res => {
                                  toast.success(res.data.message, {
                                    position: "top-right",
                                    style: {
                                      background: "white",
                                      color: "black",
                                    },
                                  });
                                  fetchMember()
                                })
                                .catch(err => console.log(err))

                            }}>
                              Remove member
                            </p>
                          </li>
                          {/* <li>
                      <a href='#'>Turn Off Notifications</a>
                    </li>
                    <li>
                      <a href='#'>Select as Featured</a>
                    </li> */}
                        </ul>
                      </div>
                    </div>)
                  }
                </div>
              </div>
            ))
          }
        </div>}
      </div>
    </div>
  );
};

export default GroupPeople;
