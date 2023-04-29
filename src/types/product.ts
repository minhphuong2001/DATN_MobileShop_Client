import { ColorProps } from "./color";
import { StorageProps } from "./storage";

export interface CategryProps{
	_id?: string;
	name: string;
	logo: string;
	slug: string;
	createdAt?: string | Date;
	updatedAt?: string | Date;
}
export interface ProductProps {
	_id: string;
	images: string[];
	discount: number;
	sold: number;
	deleted?: number;
	product_name: string;
	description: string;
	specification: string;
	category?: CategryProps;
	slug: string;
	price: number;
	createdAt?: any;
	updatedAt?: any;
}

export interface ProductVersionProps {
	_id: string;
	quantity: number;
	price: number;
	sale_price: number;
	product: ProductProps;
	storage: StorageProps;
	color: ColorProps;
	createdAt?: any;
	updatedAt?: any;
}