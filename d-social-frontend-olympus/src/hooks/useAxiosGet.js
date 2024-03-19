import axios from "axios";
import { useState } from "react";
import axiosInstance from "../../utils/axios";

const useAxiosGet = () => {
   const [response, setResponse] = useState([]);
   const [error, setError] = useState(null);
   const [responseLoader, setResponseLoader] = useState(false);

   const getResponseData = (requestUrl, callBack) => {
      setResponseLoader(true);
      axiosInstance
         .get(requestUrl)
         .then((res) => {
            setResponse(res?.data);
            setResponseLoader(false);
            callBack && callBack(res?.data);
         })
         .catch((err) => {
            setResponse([]);
            setError(err);
            setResponseLoader(false);
         });
   };

   return [response, getResponseData, responseLoader, setResponse, error];
};

export default useAxiosGet;
