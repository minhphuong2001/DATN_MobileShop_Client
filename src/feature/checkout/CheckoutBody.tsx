import React, { useState } from "react";
import CheckoutForm from "./CheckoutForm";
import { useDispatch, useSelector } from "react-redux";
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
  Radio,
  RadioGroup,
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
import { PAYMENT_METHOD } from "../../constants/global";
import { AppDispatch } from "../../app/store";
import { orderPaymentPaypal } from "../cart/cartSlice";
import { UserProps } from "../../types/user";
import { getUser } from "../auth/authSlice";

export default function CheckoutBody() {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const carts: CartProps[] = useSelector((state: any) => state.cart.cartList);
  const user: UserProps = useSelector((state: any) => state.auth.user);
  const [isSubmiting, setIsSubmiting] = useState(false);

  const initialValue = {
    phone: user.phone ? user.phone : "",
    address: user.address ? user.address : "",
    paymentMethod: "",
    note: ""
  };

  const validationSchema = Yup.object().shape({
    phone: Yup.string()
      .required("Vui lòng nhập số điện thoại")
      .matches(/^[0]\d{9}$/, "Đây không phải là số điện thoại"),
    address: Yup.string().required("Vui lòng nhập địa chỉ"),
    paymentMethod: Yup.string().required(
      "Vui lòng chọn phương thức thanh toán"
    ),
    note: Yup.string(),
    // coupon: Yup.string(),
  });
  const { control, handleSubmit, reset } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: initialValue
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
        // coupon: data.coupon ? [data.coupon] : [],
        payment_method: data.paymentMethod,
        status: 1,
        carts: carts,
        total_amount: totalMoney - (totalMoney * totalDiscount) / 100,
      };
      setIsSubmiting(true);

      if (data.paymentMethod === PAYMENT_METHOD.onDeliveryPayment) {
        const res: any = await orderApi.addOrder(orderData);
        if (res.success) {
          await dispatch(getUser());
          toast.success("Đặt hàng thành công. Cảm ơn bạn đã ủng hộ shop ^_^");
          reset(initialValue);
          navigate("/tai-khoan/don-mua");
        } else {
          setIsSubmiting(false);
          toast.error(res?.message);
        }
      }

      if (data.paymentMethod === PAYMENT_METHOD.onPaypalPayment) {
        const res: any = await dispatch(
          orderPaymentPaypal({ body: orderData })
        );
        // console.log("res", res);
        if (res?.payload?.id) {
          window.open(res?.payload?.links[1].href, "_blank");
          reset(initialValue);
          navigate("/tai-khoan/don-mua");
        }
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
                          <TableCell sx={{ fontWeight: "bold" }}>
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "flex-start",
                              }}
                            >
                              <img
                                src={item.product_version.product.images[0]}
                                alt=""
                                style={{
                                  width: 50,
                                  height: 50,
                                  objectFit: "cover",
                                  border: '1px solid #ccc'
                                }}
                              />
                              <div style={{ marginLeft: 10 }}>
                                <p>
                                  {item.product_version.product.product_name}
                                </p>
                                <p style={{ marginTop: "10px", color: "#aaa" }}>
                                  {item.product_version.color.name} -{" "}
                                  {item.product_version.storage.name}
                                </p>
                              </div>
                            </Box>
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
              row={5}
              control={control}
            />
            {/* <Controller
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
            /> */}

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
                          value="onPaypalPayment"
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
                    <FormHelperText
                      sx={{ color: "#d32f2f", marginLeft: "20%" }}
                    >
                      {error ? error.message : ""}
                    </FormHelperText>
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
