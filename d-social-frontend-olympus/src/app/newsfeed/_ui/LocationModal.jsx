import React from 'react';
import './LocationModal.modules.css';
import BackButton from '../_svg-components/BackButton';
import Divider from '@/component/Divider';
import LocationSvg from '../_svg-components/location';
import axiosInstance from '../../../../utils/axios';
import { host } from '@/environment';
import { useDispatch } from 'react-redux';
import { insertPostData, setLocalPostInfo } from '@/redux/features/NewsFeed/newsFeedSlice';

export default function LocationModal({ setIsOpenModal }) {
   const [location, setLocation] = React.useState([]);
   const [fileterLocation, setFilterLocation] = React.useState();
   const [searchLocation, setSearchLocation] = React.useState([]);

   const handleChange = (event) => {
      const query = event.target.value;
      setSearchLocation(query);

      let updatedLocation = [...location];
      updatedLocation = updatedLocation.filter((item) => {
         return item.location_name.toLowerCase().indexOf(query.toLowerCase()) !== -1;
      });
      setFilterLocation(updatedLocation);
   };

   React.useEffect(() => {
      axiosInstance
         .post(`/api/search-location`, {
            searchTerm: '',
         })
         .then((res) => {
            if (res.data.status === 200) {
               setLocation(res.data.allLocation);
               setFilterLocation(res.data.allLocation);
            }
         });
   }, []);

   return (
      <div className="location__wrapper">
         <div className="top__wrapper">
            <BackButton setIsOpenModal={setIsOpenModal} />
            <p>Search for Location</p>
            <p></p>
         </div>
         <Divider />

         <div className="location__search__wrapper">
            <input
               className="location__search__input"
               value={searchLocation}
               onChange={handleChange}
               type="text"
               placeholder="Search for location"
            />
            <p className="suggestion">SUGGESTIONS</p>
            {fileterLocation?.map((item) => {
               return <SuggestedLocation item={item} setIsOpenModal={setIsOpenModal} />;
            })}
         </div>
      </div>
   );
}

function SuggestedLocation({ item, setIsOpenModal }) {
   const dispatch = useDispatch();

   return (
      <div
         onClick={() => {
            dispatch(insertPostData({ location_id: item._id }));
            dispatch(setLocalPostInfo({ location: item.location_name }));
            setIsOpenModal({ post: true });
         }}
         className="location__name__wrapper"
      >
         <LocationSvg />
         <div>
            <p className="tittle">{item.location_name}</p>
         </div>
      </div>
   );
}
