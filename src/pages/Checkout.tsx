import React from "react";
import Header from "../components/header/Header";
import Helmet from "../components/helmet/Helmet";
import Footer from "../components/footer/Footer";
import CheckoutBody from "../feature/checkout/CheckoutBody";

export default function CheckoutPage() {
	return (
		<>
			<Header />
			<Helmet title="Thanh toán">
				<div className="checkout">
					<CheckoutBody />
				</div>
			</Helmet>
			<Footer />
		</>
	)
}
