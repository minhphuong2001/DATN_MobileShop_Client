import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/Home";
import CategoryPage from "./pages/Category";
import ProductPage from "./pages/Product";
import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Register";
import CartPage from "./pages/Cart";
import CheckoutPage from "./pages/Checkout";
import AuthPage from "./pages/Auth";
import ForgotPasswordPage from "./feature/auth/ForgotPassword";
import ResetPassword from "./feature/auth/ResetPassword";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/dang-nhap" element={<LoginPage />} />
          <Route path="/dang-ky" element={<RegisterPage />} />
          <Route path="/quen-mat-khau" element={<ForgotPasswordPage />} />
          <Route path="/danh-muc-san-pham/:slug" element={<CategoryPage />} />
          <Route path="/danh-muc-san-pham" element={<CategoryPage />} />
          <Route path="/san-pham/:slug" element={<ProductPage />} />
          <Route path="/gio-hang" element={<CartPage />} />
          <Route path="/thanh-toan" element={<CheckoutPage />} />
          <Route path="/reset-mat-khau/:resetToken" element={<ResetPassword />} />
        </Routes>
        <AuthPage />
      </div>
    </BrowserRouter>
  );
}

export default App;
