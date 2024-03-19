import axios from "axios";

let token = "";

if (typeof window !== "undefined") {
   token = localStorage.getItem("refreshToken");
}

const axiosInstance = axios.create({
   // baseURL: "http://localhost:9000/",
   baseURL: "https://quantumpossibilities.eu:82/",
   // baseURL: 'http://157.245.56.52:9000/',
   headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
   },
});

export default axiosInstance;
