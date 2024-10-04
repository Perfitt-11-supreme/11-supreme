import axios from "axios";

   const { VITE_BASE_REQUEST_URL } = import.meta.env;
   console.log("Base URL:", VITE_BASE_REQUEST_URL);

   export const axiosClient = axios.create({
     baseURL: VITE_BASE_REQUEST_URL,
     withCredentials: false
   });

    // 요청 인터셉터
    axiosClient.interceptors.request.use(config => {
      // S3 URL로 요청이 가는 것을 방지
      if (config.url?.startsWith('http://perfitt-supreme.s3-website.ap-northeast-2.amazonaws.com')) {
        config.url = config.url.replace('http://perfitt-supreme.s3-website.ap-northeast-2.amazonaws.com', VITE_BASE_REQUEST_URL);
      }
      console.log("Full Request URL:", config.baseURL + config.url);
      return config;
    }, error => {
      console.error("Request error:", error);
      return Promise.reject(error);
    });
 
    // 응답 인터셉터
    axiosClient.interceptors.response.use(
      response => {
        console.log("Response received from:", response.config.url);
        return response;
      },
      error => {
        console.error("Request failed:", error.config?.url, error.message);
        return Promise.reject(error);
      }
    );
    