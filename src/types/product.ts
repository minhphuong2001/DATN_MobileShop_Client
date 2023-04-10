import { ColorProps } from "./color";
import { StorageProps } from "./storage";

export interface ProductProps {
	_id?: string;
	images: string[];
	discount: number;
	sold: number;
	deleted?: number;
	product_name: string;
	description: string;
	specification: string;
	category: string;
	slug: string;
	createdAt?: any;
	updatedAt?: any;
}

export interface ProductVersionProps {
	_id?: string;
	quantity: number;
	price: number;
	sale_price: number;
	product: ProductProps;
	storage: StorageProps;
	color: ColorProps;
	createdAt?: any;
	updatedAt?: any;
}