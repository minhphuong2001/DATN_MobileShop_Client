import React, {useEffect, useState} from 'react'
import CartDetail from './CartDetail';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCarts } from './cartSlice';
import { AppDispatch } from '../../app/store';
import { CartProps } from '../../types/cart';

export default function CartBody() {
  const dispatch: AppDispatch = useDispatch();
  const numOfProduct = useSelector((state: any) => state.cart.countCart);
  const [currentTab, setCurrentTab] = useState(1);
  const [isActive, setIsActive] = useState(1);
  const cart: CartProps[]  = useSelector((state: any) => state.cart.cartList)

  useEffect(() => {
    const fetchCarts = async () => {
      try {
        await dispatch(getAllCarts());
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
          currentTab === 1 && <CartDetail data={cart} /> //<CartDetail data={carts} />
        }
        {
          currentTab === 2 && <p>Bạn chưa có sản phẩm nào! Vui lòng quay lại trang chủ để thêm sản phẩm yêu thích</p> //<Wishlist data={wishList} />
        }
      </div>

    </div>
  )
}
