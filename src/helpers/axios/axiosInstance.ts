import { authKey } from "@/contants/authkey";
import { getFromLocalStorage } from "@/utils/local-storage";
import axios from "axios";

const instance = axios.create();

instance.defaults.baseURL = process.env.NEXT_PUBLIC_BACKEND_API_URL;
instance.defaults.headers.post["Content-Type"] = "application/json";
instance.defaults.headers["Accept"] = "application/json";
instance.defaults.timeout = 60000;

// Add a request interceptor
axios.interceptors.request.use(
  function (config) {
    // Add token to request headers
    const accessToken = getFromLocalStorage(authKey);

    if (accessToken) {
      config.headers.Authorization = accessToken;
    }

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// Add a response interceptor

axios.interceptors.response.use(
  //@ts-ignore
  function (response) {
    const responseData = {
      data: response?.data?.data,
      meta: response?.data?.meta,
      message: response?.data?.message,
    };

    return responseData;
  },
  function (error) {
    const errorResponse = {
      statusCode: error?.response?.data?.statusCode || 500,
      message: error?.response?.data?.message || "Something went wrong!",
      errorMessages: error?.response?.data?.message,
    };

    return errorResponse;
  }
);

export default instance;
