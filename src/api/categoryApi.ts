import axiosClient from "./axiosClient";
import { ENDPOINT } from "../constants/endpoint";

const categoryApi = {
  getAllCate: () => {
    return axiosClient.get(ENDPOINT.category);
  },
  getCateById: (id: string) => {
    return axiosClient.get(`${ENDPOINT.category}/${id}`);
  },
};

export default categoryApi;
