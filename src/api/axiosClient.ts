import axios from "axios";

const { VITE_BASE_REQUEST_URL } = import.meta.env;
axios.defaults.baseURL = VITE_BASE_REQUEST_URL;

export const axiosClient = axios.create({
  withCredentials:false
})