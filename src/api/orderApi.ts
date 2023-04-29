import { ENDPOINT } from "../constants/endpoint";
import { AddOrderType } from "../types/cart";
import axiosClient from "./axiosClient";

const orderApi = {
  addOrder: (data: AddOrderType) => {
    return axiosClient.post(ENDPOINT.order, data);
  },
  getOrderUser: () => {
    return axiosClient.get(`${ENDPOINT.order}/user-order`);
  },
  getOrderDetail: (id: string) => {
    const url = `${ENDPOINT.order}/user-order/${id}`;
    return axiosClient.get(url);
  },
  paymentPaypal: (data: any) => {
    const url = `pay`;
    return axiosClient.post(url, data);
  },
};

export default orderApi;
