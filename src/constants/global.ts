export const PAGE_DEFAULT = 1;
export const LIMIT_DEFAULT = 12;

export const LOCAL_STORAGE = {
	accessToken: 'dtmp-shop-token',
	refreshToken: 'dtmp-shop-refresh-token',
	userInfo: 'dtmp-shop-user-info'
};

export const CURRENCY = {
	USD: "USD",
	VND: "VND"
}

export const PAYMENT_METHOD_TYPE = {
	onDeliveryPayment: "Thanh toán khi nhận hàng",
	onPaypalPayment: "Thanh toán bằng Paypal"
}

export const PAYMENT_METHOD = {
	onDeliveryPayment: "onDeliveryPayment",
	onPaypalPayment: "onPaypalPayment"
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