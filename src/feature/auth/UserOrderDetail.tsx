import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import orderApi from "../../api/orderApi";
import { useNavigate, useParams } from "react-router-dom";
import { OrderTypes } from "../../types/order";
import { MoneyFormat } from "../../utils/moneyFormat";
import { ArrowBack } from "@mui/icons-material";
import OrderStep from "../../components/step/OrderStep";
import { toast } from "react-toastify";

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
  statusPayment: 1,
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
  const [confirmDelete, setConfirmDelete] = useState(false);

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

  const handleCancelOrder = async () => {
    const res: any = await orderApi.updateStatus(order._id, {
      status: 6, //huy don
    });
    if (res) {
      toast.success("Hủy đơn hàng thành công");
      setOrder(res);
      setConfirmDelete(false);
    }
  };

  const body = isLoading ? (
    <CircularProgress />
  ) : !order ? (
    <div>Đơn hàng của bạn không tồn tại.</div>
  ) : (
    <div className="order-detail">
      <IconButton size="medium" sx={{ mb: 1 }} onClick={() => navigate(-1)}>
        <ArrowBack fontSize="inherit" />
      </IconButton>

      {/* step order */}
      {order.status !== 6 && <OrderStep status={order.status} />}

      {order.status === 1 && (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            mt: 2,
          }}
        >
          <Button
            variant="outlined"
            color="error"
            size="small"
            onClick={() => setConfirmDelete(true)}
          >
            Hủy đơn hàng
          </Button>
        </Box>
      )}

      {order.status === 6 && (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
          }}
        >
          <Button variant="outlined" color="error" size="small">
            Đơn hàng đã được hủy
          </Button>
        </Box>
      )}
      <Table component={Paper} sx={{ mt: 2 }}>
        <div className="letter"></div>

        <Grid container>
          <Grid item lg={4}>
            <Box
              sx={{
                padding: "15px",
                mr: 2,
                borderRight: "1px solid #ccc",
                height: "100%",
              }}
            >
              <Typography
                component="h5"
                variant="h6"
                sx={{ fontWeight: "bold" }}
              >
                Địa chỉ nhận hàng
              </Typography>
              <Typography>
                Họ tên: {order.user ? order.user.fullname : ""}
              </Typography>
              <Typography>Số ĐT: {order.phone ? order.phone : ""}</Typography>
              <Typography>
                Địa chỉ: {order.address ? order.address : ""}
              </Typography>
            </Box>
          </Grid>
          <Grid item lg={8}>
            {order.order_details
              ? order.order_details.map((item) => {
                  const price =
                    item.quantity *
                    (item.price - (item.price * item.discount) / 100);

                  return (
                    <div key={item._id} className="order-detail-item">
                      <div className="order-detail-item__img">
                        <img
                          src={item.product_version.product.images[0]}
                          alt=""
                        />
                      </div>
                      <div className="order-detail-item__info">
                        <p>{item.product_version.product.product_name}</p>
                        <p className="order-detail-item__info__color">
                          {item.product_version.color.name} -{" "}
                          {item.product_version.storage.name}
                        </p>
                        <p className="order-detail-item__info__price">
                          {MoneyFormat(price)} x {item.quantity}
                        </p>
                      </div>
                    </div>
                  );
                })
              : ""}

            <div
              style={{
                display: "flex",
                alignItems: "flex-end",
                justifyContent: "flex-end",
              }}
            >
              <TableBody>
                <TableRow>
                  <TableCell colSpan={4}>Tổng tiền sản phẩm</TableCell>
                  <TableCell>
                    {order.total_amount ? MoneyFormat(order.total_amount) : ""}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={4}>Phí vận chuyển</TableCell>
                  <TableCell>{MoneyFormat(15000)}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={4}>Phương thức thanh toán</TableCell>
                  <TableCell colSpan={4}>
                    {order.payment_method === "onPaypalPayment"
                      ? "Thanh toán bằng Paypal"
                      : "Thanh toán khi nhận hàng"}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={4}>Trạng thái thanh toán</TableCell>
                  <TableCell>
                    <Button variant="outlined" color={order.statusPayment === Number(1) ? "warning" : "success"} size="small">
                      {order.statusPayment === Number(1)
                        ? "Chưa thanh toán"
                        : "Đã thanh toán"}
                    </Button>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={4}>Tổng tiền</TableCell>
                  <TableCell>
                    {order.total_amount
                      ? MoneyFormat(order.total_amount + 15000)
                      : ""}
                  </TableCell>
                </TableRow>
              </TableBody>
            </div>
          </Grid>
        </Grid>
      </Table>
      <Dialog
        open={confirmDelete}
        PaperProps={{
          style: {
            padding: "10px",
          },
        }}
      >
        <DialogTitle sx={{ borderBottom: "1px solid #cccccc" }}>
          <Typography
            sx={{ fontWeight: 600, textAlign: "center", fontSize: "20px" }}
          >
            Xác nhận hủy đơn hàng
          </Typography>
        </DialogTitle>
        <DialogContent
          sx={{ borderBottom: "1px solid #cccccc", margin: "10px 0" }}
        >
          Bạn có chắc muốn hủy đơn hàng không?
        </DialogContent>
        <DialogActions>
          <Box
            width="100%"
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
            }}
          >
            <Button
              variant="contained"
              size="small"
              sx={{ marginRight: "1rem", color: "#fff" }}
              onClick={handleCancelOrder}
            >
              Đồng ý
            </Button>
            <Button
              variant="outlined"
              size="small"
              color="error"
              onClick={() => setConfirmDelete(false)}
            >
              Hủy
            </Button>
          </Box>
        </DialogActions>
      </Dialog>
    </div>
  );

  return body;
}
