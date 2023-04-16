import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from "../feature/category/categorySlice";
import authReducer from "../feature/auth/authSlice";

const rootReducer = {
  category: categoryReducer,
  auth: authReducer
};

const store = configureStore({
  reducer: rootReducer,
});

export type AppDispatch = typeof store.dispatch;

export default store;
