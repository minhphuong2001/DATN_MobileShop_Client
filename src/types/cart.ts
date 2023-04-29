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
	coupon?: string[];
	carts: CartProps[];
	payment_method: string;
	status: number;
	total_amount: number;
}

export interface CartProps {
	_id: string;
	user?: UserProps;
	product_version: ProductVersionProps;
	quantity: number;
	createdAt?: any;
	updatedAt?: any;
}