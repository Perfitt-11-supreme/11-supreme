import axios from "axios";

const { VITE_BASE_REQUEST_URL } = import.meta.env;

export const axiosClient = axios.create({
  baseURL: VITE_BASE_REQUEST_URL,
  withCredentials:false
})