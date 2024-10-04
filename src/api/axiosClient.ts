import axios from "axios";

   const { VITE_BASE_REQUEST_URL } = import.meta.env;
   console.log("Base URL:", VITE_BASE_REQUEST_URL); // 디버깅을 위해 추가

   axios.defaults.baseURL = VITE_BASE_REQUEST_URL;

   export const axiosClient = axios.create({
     withCredentials: false
   });

   // 요청 인터셉터 추가
   axiosClient.interceptors.request.use(config => {
     console.log("Request URL:", config.url); // 각 요청의 URL 로깅
     return config;
   });