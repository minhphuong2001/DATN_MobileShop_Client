import React, {useEffect, useState} from 'react'
import CartDetail from './CartDetail';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCarts } from './cartSlice';
import { AppDispatch } from '../../app/store';
import { CartProps } from '../../types/cart';
import { Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

export default function CartBody() {
  const dispatch: AppDispatch = useDispatch();
  const numOfProduct = useSelector((state: any) => state.cart.countCart);
  const cart: CartProps[]  = useSelector((state: any) => state.cart.cartList)
  const [currentTab, setCurrentTab] = useState(1);
  const [isActive, setIsActive] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCarts = async () => {
      try {
        setLoading(true);
        await dispatch(getAllCarts());
        setLoading(false);
      } catch (error: any) {
        console.log(error.message);
      }
    };

    fetchCarts();
  }, [dispatch]);

  // useEffect(() => {
  //   const fetchWishList = async () => {
  //     try {
  //       await dispatch(getAllWishList());
  //     } catch (error) {
  //       console.log(error.message);
  //     }
  //   };

  //   fetchWishList();
  // }, [dispatch]);

  return (
    <div className="Carousel">
      <div className="main-tab">
        <div
          onClick={() => {setCurrentTab(1); setIsActive(1)}}
          className={isActive === 1 ? 'main-tab-item active' : 'main-tab-item'}
        >
          Giỏ hàng
          <span className="cart-counter">{numOfProduct > 0 ? numOfProduct : 0}</span>
        </div>
        <div
          onClick={() => {setCurrentTab(2); setIsActive(2)}}
          className={isActive === 2 ? 'main-tab-item active' : 'main-tab-item'}
        >
          Sản phẩm yêu thích
          <span className="cart-counter">{0}</span>
        </div>
      </div>
      <div className="tab-content">
        {
          currentTab === 1 && <CartDetail data={cart} loading={loading} /> 
        }
        {
          currentTab === 2 && <Box sx={{ textAlign: "center" }}>
          <Typography component="h6" variant="h6" sx={{ pb: 2 }}>
            Bạn chưa có sản phẩm yêu thích nào.
          </Typography>
          <Link to="/" className="back">
            Đến ngay gian hàng để mua.
          </Link>
        </Box> //<Wishlist data={wishList} />
        }
      </div>

    </div>
  )
}
