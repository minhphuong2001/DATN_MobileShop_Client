import axios from "axios";
import queryString from "query-string";
import authApi from "./authApi";
import setAuthToken from "../utils/authToken";
import { LOCAL_STORAGE } from "../constants/global";

const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    "content-type": "application/json",
  },
  paramsSerializer: (params) => queryString.stringify(params),
});

axiosClient.interceptors.request.use((config) => {
  return config;
});

axiosClient.interceptors.response.use(
  (response) => {
    if (response && response.data) return response.data;

    return response;
  },
  async function (error) {
    console.log(error.response);

    const originalRequest = error.config;
    const refreshToken = localStorage[LOCAL_STORAGE.refreshToken];

    if (
      error?.response.status === 401 &&
      error.response.data.message === "jwt expired" &&
      !originalRequest._retry &&
      refreshToken
    ) {
      originalRequest._retry = true;

      const getAccessTokenData: any = await authApi.getAccessToken({ refreshToken });

      if (getAccessTokenData?.success) {
        const { accessToken, refreshToken } = getAccessTokenData;

        localStorage.setItem(LOCAL_STORAGE.accessToken, accessToken);
        localStorage.setItem(LOCAL_STORAGE.refreshToken, refreshToken);

        setAuthToken(accessToken);
        originalRequest.headers["Authorization"] = `Bearer ${accessToken}`;

        return axiosClient(originalRequest);
      }
    }

    if (error?.response.data) {
      return error.response.data;
    }
    return { success: false, message: error.message };
  }
);

export default axiosClient;
