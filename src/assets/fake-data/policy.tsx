import { LocalShipping, CreditCard, Group, Shop } from "@mui/icons-material"

export interface PolicyProps {
	name: string;
	description: string;
	icon: any
}

const policy: PolicyProps[] = [
  {
    name: "Miễn phí giao hàng",
    description: "Miễn phí ship với đơn hàng lớn hơn 2 triệu đồng",
    icon: <LocalShipping />,
  },
  {
    name: "Thanh toán COD",
    description: "Hỗ trợ thanh toán online và thanh toán khi nhận hàng (COD)",
    icon: <CreditCard />,
  },
  {
    name: "Khách hàng VIP",
    description: "Ưu đãi dành riêng cho những khách hàng VIP",
    icon: <Group />,
  },
  {
    name: "Hỗ trợ bảo hành",
    description: "Đổi, trả đồ tại tất cả các cửa hàng trên toàn quốc",
    icon: <Shop />,
  },
];

export default policy;
