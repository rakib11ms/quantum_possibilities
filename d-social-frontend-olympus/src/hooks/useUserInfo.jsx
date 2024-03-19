// useUserInfo.js

import {useState, useEffect} from "react";

const useUserInfo = () => {
   // Define the state to hold user information
   const [userInfo, setUserInfo] = useState(null);
   // Define a function to fetch user information from local storage
   const getUserInfoFromLocalStorage = () => {
      const storedUserInfo = localStorage.getItem("userInfo");
      if (storedUserInfo) {
         const parsedUserInfo = JSON.parse(storedUserInfo);
         if (parsedUserInfo) {
            setUserInfo(parsedUserInfo[0]);
         }
      }
   };

   // useEffect to fetch user information when the component mounts
   useEffect(() => {
      getUserInfoFromLocalStorage();
   }, []);
   // Return the user information, setter, and clear function
   return {userInfo};
};

export default useUserInfo;
