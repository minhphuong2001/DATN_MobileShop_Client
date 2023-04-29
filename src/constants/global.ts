export const PAGE_DEFAULT = 1;
export const LIMIT_DEFAULT = 12;

export const LOCAL_STORAGE = {
	accessToken: 'mimin-shop-token',
	refreshToken: 'mimin-shop-refresh-token',
};

export const CURRENCY = {
	USD: "USD",
	VND: "VND"
}

export const PAYMENT_METHOD_TYPE = {
	onDelivery: "Payment on delivery",
	paypal: "Paypal"
}

export enum StatusType {
	STATUS1 = "1",
	STATUS2 = "2",
	STATUS3 = "3",
	STATUS4 = "4",
	STATUS5 = "5"
}

export const StatusTypeName = {
	[StatusType.STATUS1]: "Đang chờ",
	[StatusType.STATUS2]: "Đã thanh toán",
	[StatusType.STATUS3]: "Đang giao hàng",
	[StatusType.STATUS4]: "Giao hàng thành công",
	[StatusType.STATUS5]: "Đã hủy"
};