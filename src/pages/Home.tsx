import { useCallback, useState, useEffect } from "react";
import Header from "../components/header/Header";
import Helmet from "../components/helmet/Helmet";
import Policy from "../components/policy/Policy";
import {
  Section,
  SectionBody,
  SectionTitle,
} from "../components/section/Section";
import Footer from "../components/footer/Footer";
import ListProduct from "../feature/product/components/ListProduct";
import { ProductProps } from "../types/product";
import CategoryList from "../feature/category/components/CategoryList";
import productApi from "../api/productApi";
import { Box, CircularProgress } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getAllCate } from "../feature/category/categorySlice";
import { AppDispatch } from "../app/store";
import { getCountCart } from "../feature/cart/cartSlice";
import Banner from "../components/banner/Banner";

const categoriesData = [
  {
    title: "Apple",
    image:
      "http://cellphones.maugiaodien.com/wp-content/uploads/2022/04/phu-kien-apple.png",
    background: "pink",
  },
  {
    title: "Samsung",
    image:
      "http://cellphones.maugiaodien.com/wp-content/uploads/2022/04/dan-man-hinh.png",
    background: "orange",
  },
  {
    title: "Xiaomi",
    image:
      "http://cellphones.maugiaodien.com/wp-content/uploads/2022/04/bao-da-op-lung.png",
    background: "lightgreen",
  },
  {
    title: "Realme",
    image:
      "http://cellphones.maugiaodien.com/wp-content/uploads/2022/04/phu-kien-apple.png",
    background: "skyblue",
  },
  {
    title: "Oppo",
    image:
      "http://cellphones.maugiaodien.com/wp-content/uploads/2022/04/dan-man-hinh.png",
    background: "burlywood",
  },
  {
    title: "Vivo",
    image:
      "http://cellphones.maugiaodien.com/wp-content/uploads/2022/04/bao-da-op-lung.png",
    background: "steelblue",
  },
];
function HomePage() {
  const dispatch: AppDispatch = useDispatch();
  const isAuthenticated = useSelector(
    (state: any) => state.auth.isAuthenticated
  );
  const [loading, setLoading] = useState(false);
  const [listProduct, setListProduct] = useState<ProductProps[]>([]);

  const getProducts = useCallback(async () => {
    setLoading(true);
    const res = await productApi.getAll();
    setListProduct([...listProduct, ...res.data]);
    setLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    dispatch(getAllCate());
  }, [dispatch]);

  useEffect(() => {
    const fetchCountCarts = async () => {
      if (isAuthenticated) {
        await dispatch(getCountCart());
      }
    };

    fetchCountCarts();
  }, [dispatch, isAuthenticated]);

  useEffect(() => {
    getProducts();
  }, [getProducts]);

  const sellingProduct = listProduct.filter(item => item.sold >= 5)
  const saleProduct = listProduct.filter((item) => item.discount > 10);
  const newProduct = listProduct.filter(
    (product) =>
      (Date.now() - Date.parse(product.createdAt)) / (1000 * 3600 * 24) < 30
  );

  return (
    <Helmet title="Trang chủ">
      <Header />
      {/* <Slider data={sliderData} /> */}
      <Banner />
      <Policy />
      <CategoryList data={categoriesData} />

      <Section>
        <SectionTitle>Top sản phẩm mới</SectionTitle>
        <SectionBody>
          {loading ? (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "40px 0",
              }}
            >
              <CircularProgress color="success" />
            </Box>
          ) : (
            <ListProduct product={newProduct} count={2} />
          )}
        </SectionBody>
      </Section>
      <Section>
        <SectionTitle>Top sản phẩm bán chạy</SectionTitle>
        <SectionBody>
          <ListProduct product={sellingProduct} count={2} />
        </SectionBody>
      </Section>
      <Section>
        <SectionTitle>Top sản phẩm giảm giá</SectionTitle>
        <SectionBody>
          <ListProduct product={saleProduct} count={2} />
        </SectionBody>
      </Section>
      <Footer />
    </Helmet>
  );
}

export default (HomePage);