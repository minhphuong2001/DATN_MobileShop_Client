import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MoneyFormat } from "../../utils/moneyFormat";
import { Close } from "@mui/icons-material";
import { CartProps } from "../../types/cart";
import { Box, Button, CircularProgress, Typography } from "@mui/material";
import cartApi from "../../api/cartApi";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../app/store";
import { deleteCart, getAllCarts, getCountCart } from "./cartSlice";
import { toast } from "react-toastify";

interface CartDetailProps {
  data: CartProps[];
  loading: boolean;
}
// const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

export default function CartDetail({ data, loading }: CartDetailProps) {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [carts, setCarts] = useState<CartProps[]>([]);

  useEffect(() => {
    setCarts([...data]);
  }, [data]);

  // const handleClickCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const { id, checked, value } = e.target;
  //   let cartSelected = JSON.parse(value);
  //   setSelected([...selected, cartSelected]);

  //   if (!checked) {
  //     setSelected(selected.filter(item =>  item._id !== id));
  //   }
  // };
  // console.log(selected);

  const totalPrice =
    carts.reduce((acc, cur) => {
      acc += cur.product_version.price * cur.quantity;
      return acc;
    }, 0) || 0;

  const handleChangeQty = (cartId: string, quantity: number) => {
    let newCarts = JSON.parse(JSON.stringify(carts));

    newCarts.map((cart: CartProps) => {
      if (cart._id === cartId) {
        cart.quantity = quantity;
      }
      return cart;
    });
    setCarts(newCarts);
  };

  const handleUpdateCart = async () => {
    try {
      setIsSubmitting(true);
      const res: any = await cartApi.updateMany({ newCarts: carts });
      if (!res.success) {
        return;
      }
      toast.success("Cập nhật giỏ hành thành công");
      dispatch(getAllCarts());
      setIsSubmitting(false);
    } catch (error: any) {
      console.log(error);
    }
  };

  const handleDeleteCart = async (cartId: string) => {
    try {
      await dispatch(deleteCart({ id: cartId }));
      dispatch(getAllCarts());
      dispatch(getCountCart());
    } catch (error: any) {
      console.log(error);
    }
  };

  return carts.length !== 0 ? (
    <div>
      <div className="cart_title">
        <p>Sản phẩm</p>
        <p>Giá</p>
        <p>Số lượng</p>
        <p>Tạm tính</p>
      </div>
      <div className="cart_content">
        {loading ? (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "20px 0",
            }}
          >
            <CircularProgress size={40} color="success" />
          </Box>
        ) : (
          carts.map((item, index) => {
            if (item.quantity) {
              return (
                <div className="cart_item" key={index}>
                  {/* <div>
                  <Checkbox
                      {...label}
                      size='small'
                      id={item._id}
                      value={JSON.stringify(item)}
                      checked={selected.includes(item._id)}
                      onChange={handleClickCheckbox}
                    />
                  </div> */}
                  <div className="cart_info">
                    <img src={item.product_version.product.images[0]} alt="" />
                    <div className="cart_info_name">
                      <p>{item.product_version.product.product_name}</p>
                      <p className="cart_info_attribute">
                        {item.product_version.color.name} -{" "}
                        {item.product_version.storage.name}
                      </p>
                    </div>
                  </div>
                  <div className="cart_price">
                    {MoneyFormat(item.product_version.price)}
                  </div>
                  <div className="cart_qty">
                    <p>
                      <Button
                        variant="contained"
                        color="inherit"
                        sx={{ mr: 1 }}
                        onClick={() =>
                          handleChangeQty(item._id, item.quantity - 1)
                        }
                      >
                        -
                      </Button>
                      <span>{item.quantity}</span>
                      <Button
                        variant="contained"
                        color="inherit"
                        sx={{ ml: 1 }}
                        onClick={() =>
                          handleChangeQty(item._id, item.quantity + 1)
                        }
                      >
                        +
                      </Button>
                    </p>
                  </div>
                  <div className="cart_price">
                    {MoneyFormat(item.product_version.price * item.quantity)}
                  </div>
                  <div className="cart_delete">
                    <div onClick={() => handleDeleteCart(item._id)}>
                      <Close />
                    </div>
                  </div>
                </div>
              );
            }
            return null;
          })
        )}
      </div>
      <div className="cart_action">
        <button className="button_update" onClick={handleUpdateCart}>
          {isSubmitting ? (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <CircularProgress size={24} color="success" /> {"  "} Cập nhật giỏ
              hàng
            </Box>
          ) : (
            <span>Cập nhật giỏ hàng</span>
          )}
        </button>
        <button
          onClick={() => navigate("/thanh-toan")}
          className="button_checkout"
        >
          <span className="button_checkout-subtotal">
            <span>{MoneyFormat(totalPrice)}</span>
            <span>Thanh toán</span>
          </span>
        </button>
      </div>
    </div>
  ) : (
    <Box sx={{ textAlign: "center" }}>
      <Typography component="h6" variant="h6" sx={{ pb: 2 }}>
        Bạn chưa có sản phẩm nào trong giỏ hàng.
      </Typography>
      <Link to="/" className="back">
        Đến ngay gian hàng để mua.
      </Link>
    </Box>
  );
}
