import { ENDPOINT } from "../constants/endpoint";
import { LIMIT_DEFAULT, PAGE_DEFAULT } from "../constants/global";
import axiosClient from "./axiosClient";

const productApi = {
	getAll: (page?: number, limit?: number) => {
		const page_default = page ? page : PAGE_DEFAULT;
		const limit_default = limit ? limit : LIMIT_DEFAULT;

    const url = `${ENDPOINT.product}?page=${page_default}&limit=${limit_default}`;
    return axiosClient.get(url);
  },
  getById: (id: string) => {
    const url = `${ENDPOINT.product}/${id}`;

    return axiosClient.get(url);
  },
  searchByCategory: (categoryId: string) => {
    const url = `${ENDPOINT.product}?category_id=${categoryId}`;
    return axiosClient.get(url);
  },
  searchByPrice: (minPrice: number, maxPrice: number) => {
    const url = `${ENDPOINT.product}?min_price=${minPrice}&max_price=${maxPrice}`;
    return axiosClient.get(url);
	},
	// product version
	getProductVersion: () => {
		const url = `${ENDPOINT.productVersion}`;
    return axiosClient.get(url);
	},
	getProductDedetail: (productId: string) => {
		const url = `${ENDPOINT.productVersion}/product/${productId}`;
    return axiosClient.get(url);
  },
	getProductByCategory: (categoryId: string) => {
		const url = `${ENDPOINT.productVersion}/category/${categoryId}`;
    return axiosClient.get(url);
  },
};

export default productApi;
