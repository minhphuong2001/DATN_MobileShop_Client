import React, { useState } from "react";
import CheckoutForm from "./CheckoutForm";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Home,
  LocalShipping,
  Note,
  Payment,
  PhoneAndroid,
} from "@mui/icons-material";
import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { MoneyFormat } from "../../utils/moneyFormat";
import { AddOrderType, CartProps } from "../../types/cart";
import * as Yup from "yup";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import orderApi from "../../api/orderApi";
import { toast } from "react-toastify";

export default function CheckoutBody() {
  const navigate = useNavigate();
  const carts: CartProps[] = useSelector((state: any) => state.cart.cartList);
  const [isSubmiting, setIsSubmiting] = useState(false);

  const validationSchema = Yup.object().shape({
    phone: Yup.string()
      .required("Vui lòng nhập số điện thoại")
      .matches(/^[0]\d{9}$/, "Đây không phải là số điện thoại"),
    address: Yup.string().required("Vui lòng nhập địa chỉ"),
    paymentMethod: Yup.string().required(
      "Vui lòng chọn phương thức thanh toán"
    ),
    note: Yup.string(),
    coupon: Yup.string(),
  });
  const { control, handleSubmit } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const totalMoney = carts.reduce((total, cart) => {
    return total + cart.quantity * cart.product_version.price;
  }, 0);

  const totalDiscount = carts.reduce((total, cart) => {
    return total + cart.product_version.product.discount;
  }, 0);

  const handleOrder = async (data: any) => {
    try {
      const orderData: AddOrderType = {
        address: data.address,
        phone: data.phone,
        note: data.note ? data.note : "",
        coupon: data.coupon ? [data.coupon] : [],
        payment_method: data.paymentMethod,
        status: 1,
        carts: carts,
        total_amount: totalMoney - (totalMoney * totalDiscount) / 100
      }
      setIsSubmiting(true);
      const res: any = await orderApi.addOrder(orderData);

      if (res.success) {
        // await dispatch(getUser());
        toast.success("Đặt hàng thành công. Cảm ơn bạn đã ủng hộ shop ^_^");
        navigate("/");
      } else {
        setIsSubmiting(false);
        toast.error(res?.message)
      }

      setTimeout(() => {
        setIsSubmiting(false);
      }, 1000);
    } catch (error: any) {
      console.log(error.message);
    }
  };

  return (
    <div className="row checkout-body">
      <Grid container spacing={4}>
        <Grid item xs={8}>
          <div className={`checkout-body__order`}>
            <div className="letter"></div>
            <div className="orders-detail">
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell align="center" colSpan={2} sx={{ fontSize: 18 }}>
                      Chi tiết
                    </TableCell>
                    <TableCell align="right" sx={{ fontSize: 18 }}>
                      Giá
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{ fontWeight: "bold" }}>
                      Tên sản phẩm
                    </TableCell>
                    <TableCell align="right" sx={{ fontWeight: "bold" }}>
                      Số lượng
                    </TableCell>
                    <TableCell align="right" sx={{ fontWeight: "bold" }}>
                      Giá tiền
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {carts.length
                    ? carts.map((item) => (
                        <TableRow key={item._id}>
                          <TableCell>
                            {item.product_version.product.product_name}
                          </TableCell>
                          <TableCell align="right">x {item.quantity}</TableCell>
                          <TableCell align="right">
                            {MoneyFormat(
                              item.product_version.price -
                                (item.product_version.price *
                                  item.product_version.product.discount) /
                                  100
                            )}
                          </TableCell>
                        </TableRow>
                      ))
                    : ""}

                  <TableRow>
                    <TableCell rowSpan={4} />
                    <TableCell colSpan={1}>Tổng tiền</TableCell>
                    <TableCell align="right">
                      {MoneyFormat(totalMoney)}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell colSpan={1}>Phí vận chuyển</TableCell>
                    <TableCell align="right">Miễn phí</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell colSpan={1}>Giảm giá</TableCell>
                    <TableCell align="right">{totalDiscount}%</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell colSpan={1} style={{ fontWeight: 550 }}>
                      Thành tiền
                    </TableCell>
                    <TableCell align="right" style={{ fontWeight: 550 }}>
                      {MoneyFormat(
                        totalMoney - (totalMoney * totalDiscount) / 100
                      )}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </div>
        </Grid>

        <Grid item xs={4}>
          <div className="checkout-body__main">
            <div className="letter"></div>
            <CheckoutForm
              name="address"
              label="Địa chỉ *"
              icon={<Home />}
              control={control}
            />
            <CheckoutForm
              name="phone"
              label="Điện thoại *"
              icon={<PhoneAndroid />}
              control={control}
            />
            <CheckoutForm
              name="note"
              label="Ghi chú"
              icon={<Note />}
              row={3}
              control={control}
            />
            <Controller
              name="coupon"
              control={control}
              render={({ field }) => {
                return (
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "flex-start",
                      marginBottom: "20px",
                    }}
                  >
                    <Typography sx={{ width: "20%" }}>Voucher</Typography>
                    <FormControl sx={{ width: "80%" }} size="small">
                      <InputLabel sx={{ textAlign: "center" }}>
                        Voucher
                      </InputLabel>
                      <Select
                        label="Voucher"
                        value={field.value}
                        onChange={(e) => field.onChange(e)}
                      >
                        <MenuItem value={1}>Giảm 1k</MenuItem>
                        <MenuItem value={2}>Giảm 2k</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                );
              }}
            />

            <Controller
              name="paymentMethod"
              control={control}
              render={({ field, fieldState: { error } }) => {
                return (
                  <FormControl fullWidth>
                    <RadioGroup
                      aria-labelledby="demo-controlled-radio-buttons-group"
                      name="controlled-radio-buttons-group"
                      value={field.value}
                      onChange={(e) => field.onChange(e)}
                    >
                      <Box className="payment-border">
                        <FormControlLabel
                          sx={{ width: "100% " }}
                          value="onDeliveryPayment"
                          control={<Radio />}
                          label={
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "flex-start",
                              }}
                            >
                              {" "}
                              <LocalShipping
                                sx={{ marginLeft: 2, color: "#ccc" }}
                              />{" "}
                              <Typography ml={2}>
                                Thanh toán khi nhận hàng
                              </Typography>
                            </Box>
                          }
                        />
                      </Box>
                      <Box className="payment-border">
                        <FormControlLabel
                          value="onlinePayment"
                          control={<Radio />}
                          label={
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "flex-start",
                              }}
                            >
                              {" "}
                              <Payment sx={{ marginLeft: 2, color: "#ccc" }} />
                              <Typography ml={2}>
                                Thanh toán bằng Paypal
                              </Typography>
                            </Box>
                          }
                        />
                      </Box>
                    </RadioGroup>
                    <FormHelperText sx={{ color: "#d32f2f", marginLeft: "20%" }}>{error ? error.message : ""}</FormHelperText>
                  </FormControl>
                );
              }}
            />

            <div className="btn-checkout">
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                onClick={handleSubmit(handleOrder)}
              >
                {isSubmiting ? <CircularProgress /> : "Thanh toán"}
              </Button>
            </div>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}
