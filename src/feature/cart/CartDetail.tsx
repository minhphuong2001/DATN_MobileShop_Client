import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MoneyFormat } from "../../utils/moneyFormat";
import { Close } from "@mui/icons-material";
import { CartProps } from "../../types/cart";
import { Box, Button, CircularProgress } from "@mui/material";
import cartApi from "../../api/cartApi";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../app/store";
import { deleteCart, getAllCarts, getCountCart } from "./cartSlice";
import { toast } from 'react-toastify'

interface CartDetailProps {
  data: CartProps[];
}

export default function CartDetail({ data }: CartDetailProps) {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const [carts, setCarts] = useState<CartProps[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setCarts([...data]);
  }, [data]);

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
  }

  return (
    <div>
      <div className="cart_title">
        <p>Sản phẩm</p>
        <p>Giá</p>
        <p>Số lượng</p>
        <p>Tạm tính</p>
      </div>
      <div className="cart_content">
        {carts.map((item, index) => {
          if (item.quantity) {
            return (
              <div className="cart_item" key={index}>
                <div className="cart_info">
                  <img src={item.product_version.product.images[0]} alt="" />
                  <p className="cart_info_name">
                    {item.product_version.product.product_name}
                  </p>
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
                  {MoneyFormat(item.product_version.price)}
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
        })}
      </div>
      <div className="cart_action">
        <button className="button_update" onClick={handleUpdateCart}>
          {isSubmitting ? (
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
              <CircularProgress size={24} color="success" /> {"  "} Cập nhật giỏ hàng
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
  );
}
