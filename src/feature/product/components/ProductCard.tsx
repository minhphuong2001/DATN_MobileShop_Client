import React from "react";
import { MoneyFormat } from "../../../utils/moneyFormat";
import ProductOverlay from "./ProductOverlay";
import { ProductProps } from "../../../types/product";
import { useNavigate } from "react-router-dom";

export default function ProductCard(product: ProductProps) {
  const navigate = useNavigate();
  const productDate = Date.parse(product.createdAt);
  const today: any = new Date();

  return (
    <div className="Product-Card">
      <div className="product">
        <div className="product-img">
          <div className="product-tag">
            {product.discount > 0 && (
              <div className="product-tag sale">{product.discount}%</div>
            )}
            {product.sold >= 40 && <div className="product-tag hot">Hot</div>}
            {(today - productDate) / (1000 * 3600 * 24) < 10 && (
              <div className="product-tag new">Mới</div>
            )}
          </div>
          <div className="product-img-bg">
            <img src={product.images[0]} alt="" />
            <img className="img-default hide" src={product.images[1]} alt="" />
          </div>
          <ProductOverlay product={product} />
        </div>
        <div
          onClick={() =>
            navigate(`/san-pham/${product.slug}`, { state: product })
          }
        >
          <div className="product-title">{product.product_name}</div>
          <div className="product-price">{MoneyFormat(product.price)}</div>
        </div>
      </div>
    </div>
  );
}
