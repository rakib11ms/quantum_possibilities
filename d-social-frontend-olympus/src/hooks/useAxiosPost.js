import axiosInstance from "../../utils/axios";
import { useState } from "react";
import { toast } from "react-toastify";

const useAxiosPost = () => {
  const [response, setResponse] = useState([]);
  const [error, setError] = useState(null);
  const [responseLoader, setResponseLoader] = useState(false);

  const postData = (
    requestUrl,
    payload,
    callBack,
    isToast,
    successMessage,
    errorMessage
  ) => {
    setResponseLoader && setResponseLoader(true);
    axiosInstance
      .post(requestUrl, payload)
      .then((res) => {
        setResponse(res?.data);
        callBack && callBack(res?.data);
        setResponseLoader(false);
        if (isToast) {
          toast.success(
            res?.data?.message ||
              successMessage ||
              res?.data?.[0]?.message ||
              "Submitted Successfully"
          );
        }
      })
      .catch((err) => {
        setResponse([]);
        setError(err);
        setResponseLoader(false);
        if (isToast) {
          toast.warn(
            err?.response?.data?.message ||
              errorMessage ||
              err?.response?.data?.[0]?.message ||
              "Failed, try again"
          );
        }
      });
  };

  return [response, postData, responseLoader, setResponse, error];
};

export default useAxiosPost;
