import React, { useEffect, useState } from 'react';
import './TagPeopleModal.modules.css';
import BackButton from '../_svg-components/BackButton';
import Divider from '@/component/Divider';
import SearchIcon from '../_svg-components/SearchIcon';
import axiosInstance from '../../../../utils/axios';
import { host } from '@/environment';
import CrossIcon from './Icons/CrossIcon';
import { useDispatch } from 'react-redux';
import { insertPostData, setLocalPostInfo } from '@/redux/features/NewsFeed/newsFeedSlice';

export default function TagPeopleModal({ setIsOpenModal }) {
   const [tagPeople, setTagPeople] = useState([]);
   const [filterTagPeople, setFilterTagPeople] = useState();
   const [searchPeople, setSearchPeople] = useState([]);
   const userName = JSON.parse(localStorage.getItem('userInfo'))[0].username;

   const [selectedTag, setSelectedTag] = useState([]);
   const [selectedTagId, setSelectedTagId] = useState([]);
   const dispatch = useDispatch();

   const TagPeople = ({ name, index }) => {
      return (
         <div className="tas_tag_people_container">
            <p className="tas_tag_people">{name}</p>
            <button
               title="delete"
               onClick={() => {
                  removeTag(index);
               }}
               className="tas_delete_tag_people"
            >
               <CrossIcon />
            </button>
         </div>
      );
   };

   const addTags = (name, id) => {
      if (!selectedTag.includes(name)) {
         setSelectedTag([...selectedTag, name]);
         setSelectedTagId([...selectedTagId, id]);
      }
   };

   const removeTag = (index) => {
      setSelectedTag([...selectedTag.filter((_, i) => i !== index)]);
   };

   const handleChange = (event) => {
      const query = event.target.value;
      setSearchPeople(query);

      let updatedTagPeople = [...tagPeople];
      updatedTagPeople = updatedTagPeople.filter((item) => {
         return (
            `${item.first_name} ${item.last_name}`.toLowerCase().indexOf(query.toLowerCase()) !== -1
         );
      });
      console.log('_updatedTagPeople', updatedTagPeople);
      setFilterTagPeople(updatedTagPeople);
   };

   function SuggestedLocation({ profileImg, name, id }) {
      return (
         <button
            className="tas__tag__name__wrapper"
            onClick={() => {
               addTags(name, id);
            }}
         >
            <div className="profile_image">
               <img className="profile_image" src={`${host}/uploads/${profileImg}`} />
            </div>
            <div>
               <p className="tittle">{name}</p>
            </div>
         </button>
      );
   }

   useEffect(() => {
      const localStorageUserName = localStorage.getItem('username');
      axiosInstance
         .post(`/api/friend-list`, {
            username: userName,
         })
         .then((res) => {
            if (res.data.status === 200) {
               let response = res.data.results;
               response = response.map((item) => {
                  if (item.connected_user_id.username !== localStorageUserName) {
                     return item.connected_user_id;
                  } else {
                     return item.user_id;
                  }
               });
               console.log('__response', response);
               setTagPeople(response);
               setFilterTagPeople(response);
            }
         });
   }, []);
   return (
      <div className="tag__modal__wrapper">
         <div className="top__wrapper">
            <BackButton setIsOpenModal={setIsOpenModal} />
            <p>Tag People</p>
            <p></p>
         </div>
         <Divider />

         <div className="">
            <div className="search__done__wrapper">
               <div className="search__wrapper">
                  <SearchIcon className={'searchIcon'} />
                  <input
                     className="location__search__input"
                     value={searchPeople}
                     onChange={handleChange}
                     type="text"
                     placeholder="Search for friends"
                  />
               </div>
               <p
                  onClick={() => {
                     console.log('_found', selectedTagId);
                     dispatch(insertPostData({ tags: selectedTagId }));
                     dispatch(setLocalPostInfo({ tagsPeople: selectedTag }));
                     setIsOpenModal({ post: true });
                  }}
               >
                  Done
               </p>
            </div>
            <div style={{ maxHeight: '300px', overflowY: true }}>
               <div className="tas_tag_people_wrapper">
                  {selectedTag.map((item, index) => {
                     console.log('_item', item);
                     return <TagPeople name={item} index={index} />;
                  })}
               </div>
               <p className="suggestion">SUGGESTIONS</p>
               {filterTagPeople?.map((item) => {
                  return (
                     <SuggestedLocation
                        profileImg={item?.profile_pic ? item?.profile_pic : 'noimg.jpg'}
                        name={`${item?.first_name} ${item?.last_name}`}
                        id={item._id}
                     />
                  );
               })}
            </div>
         </div>
      </div>
   );
}
