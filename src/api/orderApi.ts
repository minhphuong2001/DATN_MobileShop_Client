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
    const url = `${ENDPOINT.paypal}`;
    return axiosClient.post(url, data);
  },
  updateStatus: (id: string, data: any) => {
    const url = `${ENDPOINT.order}/update-status/${id}`;
    return axiosClient.patch(url, data);
  }
};

export default orderApi;
