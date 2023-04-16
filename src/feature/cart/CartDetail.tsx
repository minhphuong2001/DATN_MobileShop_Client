import React from 'react'
import { Link } from 'react-router-dom';
import { MoneyFormat } from '../../utils/moneyFormat';
import { Close } from '@mui/icons-material';

export default function CartDetail() {
  // const dispatch = useDispatch();

  // const totalPrice = props.data.reduce((acc, cur) => {
  //   acc += cur.product.price * cur.quantity;
  //   return acc;
  // }, 0) || 0;

  // const handleDeleteCart = async cartId => {
  //   try {
  //     await dispatch(deleteCart({ id: cartId }));
  //   } catch (error) {
  //     console.log(error.message);
  //   }
  // }

  return (
    <div>
			<div className="cart_content">
				<div className="cart_item">
						<div className="cart_info">
							<img src="https://res.cloudinary.com/dtqc99syb/image/upload/v1681143125/tu6hkprckrixurbfhyfc.jpg" alt="" />
							<span className="cart_info_name">Samsung galaxy</span>
						</div>
						<div className="cart_qty">
							Qty: <span className="cart_qty_number">2</span>
						</div>
						<div className="cart_price">{ MoneyFormat(256662556) }</div>
						<div className="cart_delete">
							<div>
								<Close />
							</div>
						</div>
					</div>
        {/* {
          props.data.map((item, key) => {
            return (
              <div key={key} className="cart_item">
                <div className="cart_info">
                  <img src={ item.product.thumb[0] } alt="" />
                  <span className="cart_info_name">{ item.product.name }</span>
                </div>
                <div className="cart_qty">
                  Qty: <span className="cart_qty_number">{ item.quantity }</span>
                </div>
                <div className="cart_price">{ MoneyFormat(item.product.price) }</div>
                <div className="cart_delete">
                  <div>
                    <Close />
                  </div>
                </div>
              </div>
            );
          })
        } */}
      </div>

      <div className="cart_action">
        <Link to="/sober/checkout" className="button_checkout">
          <span className="button_checkout-subtotal">
            <span>{ MoneyFormat(1005242221) }</span>
            <span>Checkout</span>
          </span>
        </Link>

        <Link to="/user/carts" className="view_cart">
          View Cart
        </Link>
      </div>
    </div>
  )
}
