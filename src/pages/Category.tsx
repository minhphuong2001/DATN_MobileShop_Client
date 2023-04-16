import React from "react";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import Helmet from "../components/helmet/Helmet";
import CategoryProduct from "../feature/category/components/CategoryProduct";

export default function CategoryPage() {
	return (
		<div>
			<Header />
			<Helmet title="Danh mục sản phẩm">
				<CategoryProduct />
			</Helmet>
			<Footer />
		</div>
	)
}
