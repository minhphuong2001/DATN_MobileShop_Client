import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from "../feature/category/categorySlice";
import authReducer from "../feature/auth/authSlice";
import cartReducer from "../feature/cart/cartSlice";

const rootReducer = {
  category: categoryReducer,
  auth: authReducer,
  cart: cartReducer
};

const store = configureStore({
  reducer: rootReducer,
});

export type AppDispatch = typeof store.dispatch;

export default store;
