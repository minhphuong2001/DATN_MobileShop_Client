import React, { useState } from "react";
import Loading from "../../../components/loading/Loading";
import ProductCard from "./ProductCard";
import { Box, Grid } from "@mui/material";
import { ProductProps } from "../../../types/product";

interface ListProductProps {
  product: ProductProps[];
  // onIncreasePage: () => void;
}

export default function ListProduct({ product }: ListProductProps) {
  // const [loading, setLoading] = useState(false);

  // const handleClickIncrease = () => {
  //   setLoading(true);
  //   setTimeout(() => {
  //     setLoading(false);
  //     onIncreasePage();
  //   }, 1000);
  // };

  return (
    <div className="margin-content">
      <div className="BestSeller">
        <div className="Product-Card">
          <Box>
            <Grid container spacing={2}>
              {product.map((item, index: number) => {
                return (
                  <Grid item xs={2} key={index}>
                    <ProductCard
                      images={item.images}
                      discount={item.discount}
                      sold={item.sold}
                      product_name={item.product_name}
                      description={item.description}
                      specification={item.specification}
                      category={item.category}
                      slug={item.slug}
                    />
                  </Grid>
                );
              })}
            </Grid>
          </Box>
        </div>
      </div>
      {/* <div className="loadmore">
        <div className="loadmore-btn">
          {loading === false && (
            <div
              className="loadmore-btn-text btn"
              onClick={handleClickIncrease}
            >
              Load more
            </div>
          )}
          {loading === true && (
            <div className="loadmore-loading btn">
              <Loading />
            </div>
          )}
        </div>
      </div> */}
    </div>
  );
}
