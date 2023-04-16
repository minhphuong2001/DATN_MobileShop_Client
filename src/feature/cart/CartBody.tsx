import React, {useState} from 'react'
import CartDetail from './CartDetail';

export default function CartBody() {
  const [currentTab, setCurrentTab] = useState(1);
  const [isActive, setIsActive] = useState(1);

  // const wishList  = useSelector(state => state.carts.wishList)
  // const carts  = useSelector(state => state.carts.cartList)

  // const dispatch = useDispatch();

  // useEffect(() => {
  //   const fetchCarts = async () => {
  //     try {
  //       await dispatch(getAllCarts());
  //     } catch (error) {
  //       console.log(error.message);
  //     }
  //   };

  //   fetchCarts();
  // }, [dispatch]);

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
          Shopping Cart
          <span className="cart-counter">{2}</span>
        </div>
        <div
          onClick={() => {setCurrentTab(2); setIsActive(2)}}
          className={isActive === 2 ? 'main-tab-item active' : 'main-tab-item'}
        >
          Wishlist
          <span className="cart-counter">{ 2 }</span>
        </div>
      </div>
      <div className="tab-content">
        {
          currentTab === 1 && <CartDetail /> //<CartDetail data={carts} />
        }
        {
          currentTab === 2 && <p>whilist list</p> //<Wishlist data={wishList} />
        }
      </div>

    </div>
  )
}
