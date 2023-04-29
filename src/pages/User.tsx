import React from "react";
import Header from "../components/header/Header";
import Helmet from "../components/helmet/Helmet";
import Footer from "../components/footer/Footer";
import MyAccount from "../feature/auth/MyAccount";

export default function UserPage() {
	return (
		<>
			<Header />
			<Helmet title="Tài khoản">
				<div className="User">
					<MyAccount />
				</div>
			</Helmet>
			<Footer />
		</>
	)
}
