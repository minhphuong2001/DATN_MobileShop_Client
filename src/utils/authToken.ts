import axiosClient from "../api/axiosClient";

const setAuthToken = (accessToken: string | null) => {
  if (accessToken) {
    axiosClient.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${accessToken}`;
  } else {
    delete axiosClient.defaults.headers.common["Authorization"];
  }
};

export default setAuthToken;
