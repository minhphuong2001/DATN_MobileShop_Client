import React, { useState } from "react";
import {
  Add,
  CardGiftcard,
  ChevronLeft,
  ChevronRight,
  KeyboardBackspace,
  Remove,
  ShoppingCart,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { ProductVersionProps } from "../../../types/product";
import { MoneyFormat } from "../../../utils/moneyFormat";
import { Box, Typography } from "@mui/material";
import { AppDispatch } from "../../../app/store";
import { useDispatch, useSelector } from "react-redux";
import { addCart, getCountCart } from "../../cart/cartSlice";
import { toast } from "react-toastify";

type ProductAttributeProps = {
  id: string;
  color: string;
  storage: string;
  price: number;
  item: ProductVersionProps;
  setItem: (item: ProductVersionProps) => void;
};

export const initialProductVersion = {
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
};

export function ProductAttributeCard({ id, color, storage, price, item, setItem }: ProductAttributeProps) {
  
  return (
    <div
      className={`product-attribute ${item._id === id ? `active` : ""}`}
      onClick={() => setItem(item)}
    >
      <p className="product-attribute__name">
        {color} - {storage}
      </p>
      <p className="product-attribute__price">{MoneyFormat(price)}</p>
    </div>
  );
}

export default function ProductDetail({ productVersion }: any) {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const user = useSelector((state: any) => state.auth.user);
  const [imageIndex, setImageIndex] = useState(0);
  const [productItem, setProductItem] = useState<ProductVersionProps>(
    initialProductVersion
  );
  const [countCart, setCountCart] = useState(1);
  const [desExpand, setDesExpand] = useState(false);

  const handleChangeImage = (index: number) => {
    if (index >= productVersion[0]?.product?.images.length) {
      return setImageIndex(0);
    }
    if (index < 0) {
      return setImageIndex(productVersion[0]?.product?.images.length - 1);
    }
    return setImageIndex(index);
  };

  const handleShow = () => {
    setDesExpand(!desExpand);
  };

  const check = () => {
    if (productItem._id === "") {
      alert("Vui lòng chọn dung lượng và màu sắc!");
      return false;
    }

    return true;
  };

  const gotoCart = () => {
    if (check()) {
      navigate("/gio-hang");
    }
  };

  const handleClickCart = async () => {
    try {
      if (user) {
        if (check()) {
          await dispatch(addCart({ body: { product_version: productItem._id, quantity: countCart } }));
          await dispatch(getCountCart());
          toast.success("Thêm vào giỏ hàng thành công");
        }
      } else {
        navigate("/dang-nhap");
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <>
      <Box
        sx={{
          paddingLeft: "100px",
          paddingBottom: "30px",
          marginTop: "40px",
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          cursor: "pointer",
        }}
      >
        <KeyboardBackspace onClick={() => navigate(-1)} />
        <Typography sx={{ marginLeft: "5px" }}>Quay lại</Typography>
      </Box>
      <div className="product__detail">
        <div className="product__detail-image">
          <div className="list__img-small">
            {productVersion[0]?.product?.images.map(
              (item: string, index: number) => {
                return (
                  <div
                    key={index}
                    className={
                      imageIndex === index
                        ? "img-small img-small__active"
                        : "img-small"
                    }
                    onClick={() => setImageIndex(index)}
                  >
                    <img src={item} alt="" />
                  </div>
                );
              }
            )}
          </div>
          <div className="list__img-slider">
            {productVersion[0]?.product?.images.map(
              (item: string, index: number) => {
                return (
                  <div
                    key={index}
                    className="img-big"
                    style={{ left: `calc(${index - imageIndex}*100%)` }}
                  >
                    <div className="img-big__item">
                      <img src={item} alt="" />
                    </div>
                  </div>
                );
              }
            )}
            <div
              className="change-image left"
              onClick={() => handleChangeImage(imageIndex - 1)}
            >
              <ChevronLeft />
            </div>
            <div
              className="change-image right"
              onClick={() => handleChangeImage(imageIndex + 1)}
            >
              <ChevronRight />
            </div>
          </div>
        </div>

        <div className="product__detail-info">
          <div className="info-title">
            {productVersion[0]?.product?.product_name}
          </div>
          <div className="info-item" style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start'}}>
            <p className="info-item__price">
              {MoneyFormat(productVersion[0]?.product?.price)}
            </p>
            <p style={{ color: "#ccc", fontSize: 20, textDecoration: "line-through", marginLeft: 10 }}>
              {MoneyFormat(productVersion[0]?.product?.price + 500000)}
            </p>
          </div>

          <div className="info-item">
            <div className="info-item__title">Màu sắc và dung lượng</div>
            <div className="info-item__list">
              {productVersion?.filter(
                (item: ProductVersionProps) => item?.storage
              )?.length > 0 &&
                productVersion?.map(
                  (item: ProductVersionProps, index: number) => {
                    if (item?.storage) {
                      return (
                        <ProductAttributeCard
                          key={index}
                          id={item?._id}
                          color={item?.color?.name}
                          storage={item?.storage?.name}
                          price={item.price}
                          item={productItem}
                          setItem={() => setProductItem(item)}
                        />
                      );
                    } else {
                      return null;
                    }
                  }
                )}
            </div>
          </div>

          {/* <div className="info-item">
            <div className="info-item__title">Màu sắc</div>
            <div className="info-item__list">
              {productVersion?.filter(
                (item: ProductVersionProps) => item?.color
              )?.length > 0 ? (
                productVersion?.map(
                  (item: ProductVersionProps, index: number) => {
                    if (item?.color) {
                      return (
                        <ProductAttributeCard
                          key={index}
                          name={item?.color?.name}
                          price={item.price}
                          attribute={color}
                          setAttribute={setColor}
                        />
                      );
                    } else {
                      return null;
                    }
                  }
                )
              ) : (
                <ProductAttributeCard
                  name="Trắng"
                  price={productVersion[0]?.product?.price}
                  attribute={color}
                  setAttribute={setColor}
                />
              )}
            </div>
          </div> */}

          <div className="info-item promotion-product">
            <button className="promotion-icon">
              <CardGiftcard sx={{ fontSize: 18 }} />
              <h5>khuyến mãi</h5>
            </button>
            <div>
              <ul>
                <h4>Khuyến mãi hãng:</h4>
                <li>
                  Ưu đãi thanh toán/ trả góp qua thẻ ngân hàng lên đến 1 triệu
                </li>
                <li>Thu cũ lên đời – Trợ giá 1 triệu</li>
              </ul>
              <ul>
                <h4>Chương trình khuyến mại:</h4>
                <li>Mua kèm dịch vụ bảo hành Apple Care giá tốt</li>
              </ul>
            </div>
          </div>

          <div className="info-item">
            <div className="info-item__title">Số lượng</div>
            <div className="info-item__quantity">
              <div
                className="info-item__quantity__count"
                onClick={() => {
                  if (countCart > 1) setCountCart(countCart - 1);
                }}
              >
                <Remove />
              </div>
              <div>
                <input
                  type="text"
                  value={countCart}
                  onChange={(e: any) => setCountCart(e.target.value)}
                />
              </div>
              <div
                className="info-item__quantity__count"
                onClick={() => setCountCart(countCart + 1)}
              >
                <Add />
              </div>
            </div>
          </div>

          <div className="info-item__btn">
            <div onClick={handleClickCart}>
              <button className="btn-cart">
                <ShoppingCart className="cart-icon" />
                <span>Thêm vào giỏ hàng</span>
              </button>
            </div>
            <div>
              <button className="buy" onClick={gotoCart}>Mua ngay</button>
            </div>
          </div>
        </div>

        <div className="product__detail-status">
          <div>
            <h4>Tình trạng</h4>
            <p>Mới, đầy đủ phụ kiện từ nhà sản xuất</p>
          </div>
          <div>
            <h4>Hộp bao gồm</h4>
            <p>
              Máy, Sách hướng dẫn, Cáp Type C – Type C, Củ sạc nhanh rời đầu
              Type C
            </p>
          </div>
          <div>
            <h4>Bảo hành</h4>
            <p>
              Bảo hành 12 tháng tại trung tâm bảo hành chính hãng. 1 ĐỔI 1 trong
              30 ngày nếu có lỗi phần cứng nhà sản xuất. Gia hạn bảo hành thời
              gian giãn cách
            </p>
          </div>
        </div>
      </div>

      <div className={`product__des ${desExpand ? "expand" : ""}`}>
        <div className="product__des-title">Chi tiết sản phẩm</div>
        <div
          className="product__des-content"
          dangerouslySetInnerHTML={{
            __html: productVersion[0]?.product?.description,
          }}
        ></div>
        <div className="product__des-toggle" onClick={handleShow}>
          <button>{desExpand ? "Thu gọn" : "Xem thêm"}</button>
        </div>
      </div>
    </>
  );
}
