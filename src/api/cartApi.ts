import { ENDPOINT } from "../constants/endpoint";
import { AddToCartType } from "../types/cart";
import axiosClient from "./axiosClient";

const cartApi = {
  add: (cart: AddToCartType) => {
    return axiosClient.post(ENDPOINT.cart, cart);
  },
  getAll: () => {
    return axiosClient.get(ENDPOINT.cart);
  },
  getCount: () => {
    return axiosClient.get(`${ENDPOINT.cart}/count`);
  },
  updateMany: (newCarts: any) => {
    return axiosClient.put(ENDPOINT.cart, newCarts);
  },
  delete: (cartId: string) => {
    return axiosClient.delete(`${ENDPOINT.cart}/${cartId}`);
  },
};

export default cartApi;
