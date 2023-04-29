import { ProductVersionProps } from "./product";
import { UserProps } from "./user";

export interface OrderTypes {
	_id: string;
	id: string;
	note: string;
	status: number;
	payment_method: string;
	coupon: string[];
	address: string;
	phone: string;
	total_amount: number;
	user: UserProps;
	order_details: OrderDetailTypes[];
	createdAt: string;
	updatedAt: string;
}

export interface OrderDetailTypes {
	discount: number;
	_id: string;
	id: string;
	order: string;
	quantity: number;
	price: number;
	amount: number;
	product_version: ProductVersionProps;
	createdAt?: string;
	updatedAt?: string;
}