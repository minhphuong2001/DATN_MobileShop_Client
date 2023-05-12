import React from "react";
import {
  KeyboardArrowDownOutlined,
  KeyboardArrowRightOutlined,
  LocalMallOutlined,
  PersonOutline,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { CategoryProps } from "../../types/category";
import { Button, Box, Typography } from "@mui/material";
import { UserProps } from "../../types/user";
// import { LOCAL_STORAGE } from "../../constants/global";

function Header() {
  const navigate = useNavigate();
  const categories: CategoryProps[] = useSelector(
    (state: any) => state.category.categories
  );
  const user: UserProps = useSelector((state: any) => state.auth.user);
  const numOfProduct = useSelector((state: any) => state.cart.countCart);
    
  return (
    <div className="header-container">
      <div className="header">
        <div className="header-left">
          <div className="header-left__logo" onClick={() => navigate("/")}>
            DTMP shop
          </div>
          <ul className="header-left__menu">
            <li onClick={() => navigate("/")}>Trang chủ</li>
            <li>
              <p onClick={() => navigate("/danh-muc-san-pham")}>Danh mục</p>
              <KeyboardArrowDownOutlined style={{ marginLeft: "5px" }} />
              <ul className="sub-menu">
                <li className="sub-menu_item menu-2">
                  Điện thoại <KeyboardArrowRightOutlined />
                  <ul className="sub-menu2">
                    {categories.map((item, index) => (
                      <li
                        key={index}
                        className="sub-menu2_item"
                        onClick={() =>
                          navigate(`/danh-muc-san-pham/${item.category_slug}`)
                        }
                      >
                        {item.name}
                      </li>
                    ))}
                  </ul>
                </li>
                <li className="sub-menu_item">Phụ kiện</li>
                <li className="sub-menu_item">Tin công nghệ</li>
              </ul>
            </li>
            <li>
              Pages <KeyboardArrowDownOutlined style={{ marginLeft: "5px" }} />
            </li>
            <li>Khuyến mại</li>
          </ul>
        </div>
        <div className="header-right">
          {user ? (
            <>
              <div
                className="header-right__btn"
                onClick={() => navigate("/gio-hang")}
              >
                <LocalMallOutlined />
                {numOfProduct > 0 ? (
                  <div className="count-cart">{numOfProduct}</div>
                ) : (
                  ""
                )}
              </div>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                }}
                onClick={() => navigate("/tai-khoan")}
              >
                <div className="header-right__btn">
                  <PersonOutline />
                </div>
                <Typography>{user?.fullname}</Typography>
              </Box>
            </>
          ) : (
            <Button
              size="small"
              variant="outlined"
              sx={{ marginTop: "3px" }}
              onClick={() => navigate("/dang-nhap")}
            >
              Đăng nhập
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

export default (Header)
