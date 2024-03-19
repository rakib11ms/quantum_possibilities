import React, { useEffect, useState } from 'react';
import axiosInstance from '../../../utils/axios';
import Link from 'next/link';
import useToaster from '@/hooks/useToaster';
import { host } from '@/environment';
import { formatDate } from '../NewsFeed/Post/utils';

export default function FriendRequestList({ setFriendList = (e) => {} }) {
   const [friendRequestList, setFriendRequestList] = useState([]);
   const [username, setUsername] = useState('');
   const { showNotification } = useToaster();

   const getFriendRequests = () => {
      axiosInstance.post('/api/friend-request-list').then((res) => {
         if (res.data.status == 200) {
            setFriendRequestList(res.data?.results);
         }
      });
   };

   useEffect(() => {
      const user = JSON.parse(localStorage.getItem('userInfo'));
      if (user && user.length > 0) {
         setUsername(user[0]?.username);
      }
      getFriendRequests();
   }, []);

   const acceptRequest = (request_id, accept_reject_ind) => {
      const formData = {
         request_id: request_id,
         accept_reject_ind: accept_reject_ind,
      };
      axiosInstance.post('/api/friend-accept-friend-request', formData).then((res) => {
         if (res.data.status == 200) {
            setFriendList((prevFriends) =>
               prevFriends.filter((friend) => friend._id !== request_id),
            );
            if (accept_reject_ind == 1) {
               showNotification('Request Accepted successfully');
            } else {
               showNotification('Request Declined successfully');
            }
         }
      });
   };
   return (
      <div>
         <div className="frnd-see-all-div">
            <span className="single-frnd-see-all">Friend request</span>
            <Link href={'/friendsrequest'}>
               <p className="frnd-see-all">See all</p>
            </Link>
         </div>
         <div>
            {console.log(friendRequestList, 'friendRequestList_2')}
            {friendRequestList.length > 0 ? (
               friendRequestList.map((item) => (
                  <div className="single-friend-request-div">
                     <div className="">
                        {item.connected_user_id?.username == username ? (
                           <img
                              className="singl-frind-authr-img"
                              src={
                                 item.user_id?.profile_pic == '' ||
                                 item.user_id?.profile_pic == null
                                    ? NoImage.src
                                    : `${host}/uploads/${item.user_id?.profile_pic}`
                              }
                              alt=""
                           />
                        ) : (
                           <img
                              className="singl-frind-authr-img"
                              src={
                                 item.connected_user_id?.profile_pic == '' ||
                                 item.connected_user_id?.profile_pic == null
                                    ? NoImage.src
                                    : `${host}/uploads/${item.connected_user_id?.profile_pic}`
                              }
                              alt=""
                           />
                        )}
                     </div>
                     <div>
                        <div className="single-tag-hur-div">
                           {item.connected_user_id?.username == username ? (
                              <h6>
                                 {item.user_id?.first_name} {item.user_id?.last_name}{' '}
                              </h6>
                           ) : (
                              <h6>
                                 {item.connected_user_id?.first_name}{' '}
                                 {item.connected_user_id?.last_name}{' '}
                              </h6>
                           )}
                           <p className="single-tag-hur-p">
                              {formatDate(item.createdAt)}{' '}
                              <span>
                                 <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    fill="green"
                                    class="bi bi-dot"
                                    viewBox="0 0 16 16"
                                 >
                                    <path d="M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3" />
                                 </svg>
                              </span>
                           </p>
                        </div>
                        <div className="single-frend-rqest-btn-div">
                           <button
                              className="single-conferm-btn"
                              onClick={() => acceptRequest(item._id, 1)}
                           >
                              Confirm
                           </button>
                           <button
                              className="single-delete-btn"
                              onClick={() => acceptRequest(item._id, 0)}
                           >
                              Delete
                           </button>
                        </div>
                     </div>
                  </div>
               ))
            ) : (
               <>
                  <div className="single-friend-request-div">
                     <div></div>
                     <div>
                        <div className="single-tag-hur-div">No Friends Request</div>
                     </div>
                  </div>
               </>
            )}
         </div>
      </div>
   );
}
