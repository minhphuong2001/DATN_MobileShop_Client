import React, { useEffect } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/Home";
import CategoryPage from "./pages/Category";
import ProductPage from "./pages/Product";
import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Register";
import { useDispatch } from "react-redux";
import { AppDispatch } from "./app/store";
import { getUser } from "./feature/auth/authSlice";
import CartPage from "./pages/Cart";

function App() {
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(getUser());
  }, [])

  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/dang-nhap" element={<LoginPage />} />
          <Route path="/dang-ky" element={<RegisterPage />} />
          <Route path="/danh-muc-san-pham/:slug" element={<CategoryPage />} />
          <Route path="/danh-muc-san-pham" element={<CategoryPage />} />
          <Route path="/san-pham/:slug" element={<ProductPage />} />
          <Route path="/gio-hang" element={<CartPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
