import React, { useState, useEffect } from "react";
import {
	Box,
  CircularProgress,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import orderApi from "../../api/orderApi";
import { useNavigate, useParams } from "react-router-dom";
import { OrderTypes } from "../../types/order";
import { MoneyFormat } from "../../utils/moneyFormat";
import { ArrowBack } from "@mui/icons-material";

const initialOrder = {
  _id: "",
  id: "",
  note: "",
  status: 0,
  payment_method: "",
  coupon: [],
  address: "",
  phone: "",
  total_amount: 0,
  user: {
    email: "",
    password: "",
    role: "",
    fullname: "",
    address: "",
    phone: "",
  },
  order_details: [
    {
      _id: "",
      id: "",
      discount: 0,
      order: "",
      quantity: 0,
      price: 0,
      amount: 0,
      product_version: {
        _id: "",
        quantity: 0,
        price: 0,
        sale_price: 0,
        product: {
          _id: "",
          images: [],
          discount: 0,
          sold: 0,
          deleted: 0,
          product_name: "",
          description: "",
          specification: "",
          category: {
            name: "",
            logo: "",
            slug: "",
          },
          slug: "",
          price: 0,
        },
        storage: {
          name: "",
        },
        color: {
          name: "",
        },
      },
    },
  ],
  createdAt: "",
  updatedAt: "",
};

export default function UserOrderDetail() {
	const { id }: any = useParams();
	const navigate = useNavigate();
  const [order, setOrder] = useState<OrderTypes>(initialOrder);
	const [isLoading, setisLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setisLoading(true);
        const response: any = await orderApi.getOrderDetail(id);

        if (response.success) {
          setOrder(response.data);
        }

        setisLoading(false);
      } catch (err: any) {
        console.log(err.message);
      }
    };

    fetchData();
  }, [id]);

  const body = isLoading ? (
    <CircularProgress />
  ) : !order ? (
    <div>Đơn hàng của bạn không tồn tại.</div>
  ) : (
			<div className="order-detail">
				<IconButton size="medium" sx={{ mb: 1 }} onClick={() => navigate(-1)}>
					<ArrowBack fontSize="inherit" />
				</IconButton>
      <Table component={Paper}>
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: 'bold'}}>Sản phẩm</TableCell>
            <TableCell sx={{ fontWeight: 'bold'}}>Đơn giá</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {order.order_details
            ? order.order_details.map((item) => {
                const price =
                  item.quantity *
                  (item.price - (item.price * item.discount) / 100);

                return (
                  <TableRow key={item._id}>
                    <TableCell>
                      {item.product_version.product.product_name}
                      <span style={{ fontWeight: 550, marginLeft: "5px" }}>
                        x {item.quantity}
                      </span>
                    </TableCell>
                    <TableCell>{MoneyFormat(price)}</TableCell>
                  </TableRow>
                );
              })
            : ""}
        </TableBody>

        <TableHead>
          <TableRow>
            <TableCell>Tổng tiền sản phẩm</TableCell>
            <TableCell>
              {order.total_amount ? MoneyFormat(order.total_amount) : ""}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Phí vận chuyển</TableCell>
            <TableCell>{MoneyFormat(15000)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Phương thức thanh toán</TableCell>
            <TableCell>Thanh toán khi nhận hàng</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Tổng tiền</TableCell>
            <TableCell>
              {order.total_amount ? MoneyFormat(order.total_amount) : ""}
            </TableCell>
          </TableRow>
        </TableHead>
      </Table>

      <Table component={Paper} sx={{ mt: 2 }}>
        <Typography component="h5" variant="h5" sx={{ fontWeight: 'bold', p: 2 }}>
          Địa chỉ nhận hàng
        </Typography>
        <Box sx={{ pl: 2, pr: 2, pb: 2 }}>
          <Typography>Họ tên: {order.user ? order.user.fullname : ""}</Typography>
          <Typography>Địa chỉ: {order.address ? order.address : ""}</Typography>
          <Typography>Số điện thoại: {order.phone ? order.phone : ""}</Typography>
        </Box>
      </Table>
    </div>
  );

  return body;
}
