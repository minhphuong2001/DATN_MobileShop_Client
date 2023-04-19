import React from "react";
import Helmet from "../components/helmet/Helmet";
import CartBody from "../feature/cart/CartBody";
import Footer from "../components/footer/Footer";
import Header from "../components/header/Header";

export default function CartPage() {
	return (
		<>
			<Header />
			<Helmet title="Giỏ hàng">
				<div className="Cart">
					<CartBody />
				</div>
			</Helmet>
			<Footer />
		</>
	)
}
