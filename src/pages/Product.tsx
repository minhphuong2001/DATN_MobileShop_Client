import React, { useCallback, useEffect, useState } from "react";
import Header from "../components/header/Header";
import Helmet from "../components/helmet/Helmet";
import { Section, SectionBody } from "../components/section/Section";
import ProductDetail from "../feature/product/components/ProductDetail";
import Footer from "../components/footer/Footer";
import { useLocation } from "react-router-dom";
import { ProductVersionProps } from "../types/product";
import productApi from "../api/productApi";
import { Box, CircularProgress } from "@mui/material";

export const initialProductVersion: ProductVersionProps[] = [
  {
    _id: "",
    quantity: 0,
    price: 0,
    sale_price: 0,
    product: {
      _id: "",
      images: [],
      discount: 0,
      sold: 0,
      deleted: 0,
      product_name: "",
      description: "",
      specification: "",
      category: {
        name: "",
        logo: "",
        slug: "",
      },
      slug: "",
      price: 0,
    },
    storage: {
      name: "",
    },
    color: {
      name: "",
    },
  },
];

export default function ProductPage() {
  const location = useLocation();
  const [productVersion, setProductVersion] =
    useState<ProductVersionProps[]>(initialProductVersion);
  const [loading, setLoading] = useState(false);

  const productItem: any = location.state;
  const title: any = productItem?.product_name;
  const productId: string = productItem?._id;

  const getProductVersions = useCallback(async () => {
    setLoading(true);
    const res = await productApi.getProductDedetail(productId);
    setProductVersion(res.data);
    setLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    getProductVersions();
  }, [getProductVersions]);

  return (
    <div>
      <Header />
      <Helmet title={title}>
        {loading ? (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "50px 0",
            }}
          >
            <CircularProgress color="success" />
          </Box>
        ) : (
          <Section>
            <SectionBody>
              <ProductDetail productVersion={productVersion} />
            </SectionBody>
          </Section>
        )}
        {/* <Section>
          <SectionTitle>Khám phá thêm</SectionTitle>
          <SectionBody>
            <ListProduct count={8} />
          </SectionBody>
        </Section> */}
      </Helmet>
      <Footer />
    </div>
  );
}
