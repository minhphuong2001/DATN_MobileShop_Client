
import { ENDPOINT } from "../constants/endpoint";
import { UserChangePassword, UserForgotPassword, UserLogin, UserProps, UserRegister, UserResetPassword, UserToken } from "../types/user";
import axiosClient from "./axiosClient";

const authApi = {
  confirm: () => {
    return axiosClient.get(ENDPOINT.auth);
  },
  getAccessToken: (userForm: UserToken) => {
    return axiosClient.post(`${ENDPOINT.auth}/token`, userForm);
  },
  login: (userForm: UserLogin) => {
    return axiosClient.post(`${ENDPOINT.auth}/login`, userForm);
  },
  register: (userForm: UserRegister) => {
    return axiosClient.post(`${ENDPOINT.auth}/register`, userForm);
  },
  updateInfor: (userForm: UserProps) => {
    return axiosClient.put(ENDPOINT.auth, userForm);
  },
  changePassword: (userForm: UserChangePassword) => {
    return axiosClient.put(`${ENDPOINT.auth}/password`, userForm);
  },
  forgetPassword: (userForm: UserForgotPassword) => {
    return axiosClient.post(`${ENDPOINT.auth}/forget-password`, userForm);
  },
  resetPassword: (resetToken: string, userForm: UserResetPassword) => {
    const url = `${ENDPOINT.auth}/reset-password/${resetToken}`;

    return axiosClient.put(url, userForm);
  },
};

export default authApi;
