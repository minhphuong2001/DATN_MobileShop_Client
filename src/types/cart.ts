import { ProductVersionProps } from "./product";
import { UserProps } from "./user";

export interface AddToCartType {
	userId: string;
	productVersionId: string;
	quantity: number;
}

export interface AddOrderType {
	address: string;
	phone: string;
	note: string;
	carts: string[];
}

export interface CartProps {
	_id: string;
	user?: UserProps;
	product_version: ProductVersionProps;
	quantity: number;
	createdAt?: any;
	updatedAt?: any;
}