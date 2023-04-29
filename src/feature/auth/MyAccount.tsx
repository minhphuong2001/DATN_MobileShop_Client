import React, { useState, useEffect } from "react";
import { Grid } from "@mui/material";
import {
  BorderAll,
  Contacts,
  ExitToApp,
  ShoppingBasket,
} from "@mui/icons-material";
import { Link, useLocation, Outlet, useNavigate } from "react-router-dom";
import authApi from "../../api/authApi";
import { LOCAL_STORAGE } from "../../constants/global";
import setAuthToken from "../../utils/authToken";
import { useDispatch } from "react-redux";
import { logout } from "./authSlice";

export default function MyAccount() {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [select, setSelect] = useState("dashboard");

  useEffect(() => {
    const newSelect = pathname.includes("don-mua")
      ? "orders"
      : pathname.includes("cap-nhat-tai-khoan")
      ? "update-info"
      : "dashboard";
    setSelect(newSelect);
  }, [pathname]);

  const handleLogout = async () => {
    try {
      const res: any = await authApi.logout();

      if (res.success) {
        localStorage.removeItem(LOCAL_STORAGE.accessToken);
        localStorage.removeItem(LOCAL_STORAGE.refreshToken);
        setAuthToken(null);
        dispatch(logout());
        navigate("/dang-nhap");
      }
    } catch (error: any) {
      console.log(error.message);
    }
  };

  return (
    <div className="my-account">
      <Grid container className="container">
        <Grid item xs={12} md={3}>
          <div className="my-account__menu">
            <div
              className={`my-account__menu__item ${
                select === "dashboard" ? "active" : ""
              }`}
            >
              <BorderAll />
              <Link to={`/tai-khoan`}>Dashboard</Link>
            </div>
            <div
              className={`my-account__menu__item ${
                select === "orders" ? "active" : ""
              }`}
            >
              <ShoppingBasket />
              <Link to={`/tai-khoan/don-mua`}>Đơn hàng</Link>
            </div>
            <div
              className={`my-account__menu__item ${
                select === "update-info" ? "active" : ""
              }`}
            >
              <Contacts />
              <Link to={`/tai-khoan/cap-nhat-tai-khoan`}>
                Cập nhật thông tin
              </Link>
            </div>
            <div className="my-account__menu__item" onClick={handleLogout}>
              <ExitToApp />
              <span>Đăng xuất</span>
            </div>
          </div>
        </Grid>

        <Grid item xs={12} md={9}>
          <div className="my-account__main">
            <Outlet />
          </div>
        </Grid>
      </Grid>
    </div>
  );
}
