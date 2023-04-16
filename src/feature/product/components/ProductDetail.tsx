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
// import { useDispatch, useSelector } from "react-redux";
// import { addCart } from "features/Cart/cartSlice";

type ProductAttributeProps = {
  name: string;
  price: number;
  attribute: string;
  setAttribute: (attribute: string) => void;
};

export function ProductAttributeCard({
  name,
  price,
  attribute,
  setAttribute,
}: ProductAttributeProps) {
  let bgcColor = "";
  function changeColor(color: string) {
    switch (color) {
      case "Trắng": {
        bgcColor = "white";
        break;
      }
      case "Xanh dương": {
        bgcColor = "cadetblue";
        break;
      }
      case "Xanh": {
        bgcColor = "blue";
        break;
      }
      case "Đỏ": {
        bgcColor = "red";
        break;
      }
      case "Hồng": {
        bgcColor = "pink";
        break;
      }
      case "Xám": {
        bgcColor = "grey";
        break;
      }
      case "Tím": {
        bgcColor = "darkorchid";
        break;
      }
      default:
        bgcColor = "black";
        break;
    }
  }

  return (
    <div
      className={`product-attribute ${attribute === name ? `active` : ""}`}
      onClick={() => setAttribute(name)}
    >
      <p className="product-attribute__name">{name}</p>
      <p className="product-attribute__price">{MoneyFormat(price)}</p>
    </div>
  );
}

export default function ProductDetail({ productVersion }: any) {
  const navigate = useNavigate();
  // const dispatch = useDispatch();
  // const user = useSelector((state) => state.auth.user);
  const [imageIndex, setImageIndex] = useState(0);
  const [color, setColor] = useState<any>(undefined);
  const [storage, setStorage] = useState<any>(undefined);
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
    if (color === undefined) {
      alert("Vui lòng chọn màu sắc!");
      return false;
    }

    if (storage === undefined) {
      alert("Vui lòng chọn dung lượng!");
      return false;
    }

    return true;
  };

  // const gotoCart = () => {
  //   if (check()) {
  //     history.push("/cart");
  //   }
  // };

  // const handleClickCart = async () => {
  //   try {
  //     if (user) {
  //       await dispatch(
  //         addCart({ body: { productId: product._id, quantity: countCart } })
  //       );
  //     } else {
  //       history.push("/user");
  //     }
  //   } catch (error) {
  //     console.log(error.message);
  //   }
  // };

  return (
    <>
      <Box
        sx={{
          paddingLeft: '100px',
          paddingBottom: '30px',
          marginTop: '40px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-start',
          cursor: 'pointer'
        }}
      >
        <KeyboardBackspace onClick={() => navigate(-1)} />
        <Typography sx={{ marginLeft: '5px' }}>Quay lại</Typography>
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
          <div className="info-item">
            <span className="info-item__price">
              {/* {MoneyFormat(
                product?.price - (product?.price * product?.discount) / 100
              )}{" "}
              VND */}
              {MoneyFormat(productVersion[0]?.product?.price)}
            </span>
          </div>

          <div className="info-item">
            <div className="info-item__title">Dung lượng</div>
            <div className="info-item__list">
              {productVersion?.filter(
                (item: ProductVersionProps) => item?.storage
              )?.length > 0 ? (
                productVersion?.map(
                  (item: ProductVersionProps, index: number) => {
                    if (item?.storage) {
                      return (
                        <ProductAttributeCard
                          key={index}
                          name={item?.storage?.name}
                          price={item.price}
                          attribute={storage}
                          setAttribute={setStorage}
                        />
                      );
                    } else {
                      return null;
                    }
                  }
                )
              ) : (
                <ProductAttributeCard
                  name="128GB"
                  price={productVersion[0]?.product?.price}
                  attribute={storage}
                  setAttribute={setStorage}
                />
              )}
            </div>
          </div>

          <div className="info-item">
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
          </div>

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
            <div>
              <button className="btn-cart">
                <ShoppingCart className="cart-icon" />
                <span>Thêm vào giỏ hàng</span>
              </button>
            </div>
            <div>
              <button className="buy">Mua ngay</button>
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
            <p>Máy, Sách hướng dẫn, Cáp Type C – Type C, Củ sạc nhanh rời đầu Type C</p>
          </div>
          <div>
            <h4>Bảo hành</h4>
            <p>Bảo hành 12 tháng tại trung tâm bảo hành chính hãng. 1 ĐỔI 1 trong 30 ngày nếu có lỗi phần cứng nhà sản xuất. Gia hạn bảo hành thời gian giãn cách</p>
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
