
import { ENDPOINT } from "../constants/endpoint";
import { UserChangePassword, UserLogin, UserRegister, UserResetPassword, UserToken } from "../types/user";
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
  logout: () => {
    return axiosClient.get(`${ENDPOINT.auth}/logout`);
  },
  register: (userForm: UserRegister) => {
    return axiosClient.post(`${ENDPOINT.auth}/register`, userForm);
  },
  updateInfor: (userForm: any) => {
    return axiosClient.put(ENDPOINT.auth, userForm);
  },
  changePassword: (userForm: UserChangePassword) => {
    return axiosClient.put(`${ENDPOINT.auth}/password`, userForm);
  },
  forgetPassword: (email: string) => {
    return axiosClient.post(`${ENDPOINT.auth}/forget-password`, email);
  },
  resetPassword: (resetToken: string, userForm: UserResetPassword) => {
    const url = `${ENDPOINT.auth}/reset-password/${resetToken}`;

    return axiosClient.put(url, userForm);
  },
};

export default authApi;
