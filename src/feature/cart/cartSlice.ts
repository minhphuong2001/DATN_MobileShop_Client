import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import cartApi from "../../api/cartApi";
import orderApi from "../../api/orderApi";
import { CartProps } from '../../types/cart';

export const getAllCarts = createAsyncThunk('cart/getAllCart', async (params, thunkAPI) => {
  const res: any = await cartApi.getAll();

  if (res.success) {
    thunkAPI.dispatch(setCarts(res.data));
  }

  return res;
});

export const addCart = createAsyncThunk('cart/addCart', async (params: any, thunkAPI: any) => {
  const res: any = await cartApi.add(params.body);

  if (res.success) {
    thunkAPI.dispatch(setCountCart(thunkAPI.getState().data.countCart + 1));
  }

  return res;
});

export const deleteCart = createAsyncThunk('cart/deleteCart', async (params: any, thunkAPI) => {
  const res: any = await cartApi.delete(params.id);

  if (res.success) {
    thunkAPI.dispatch(removeCart(res.cart._id));
  }

  return res;
});

export const getCountCart = createAsyncThunk('cart/getCountCart', async (params, thunkAPI) => {
  const res: any = await cartApi.getCount();

  if (res.success) {
    thunkAPI.dispatch(setCountCart(res.count));
  }

  return res;
});

export const addOrder = createAsyncThunk('order/addOrder', async (params: any, thunkAPI: any) => {
  const res: any = await orderApi.addOrder(params.body);

  if (res.success) {
    thunkAPI.dispatch(setCarts([]));
  }

  return res;
});

// export const orderPaymentPaypal = createAsyncThunk("/payment/paypal", async (params, thunkAPI) => {
//   const response = await orderApi.paymentPaypal(params.body);
//   if (response) {
//     thunkAPI.dispatch(setCarts([]));
//     // window.open(response?.links[1].href, "_blank");
//   }

//   return response;
// });

type initialProductType = {
	cartList: CartProps[];
	countCart: number;
}

const initialProduct: initialProductType = {
  cartList: [],
  countCart: 0
}

const cartSlice = createSlice ({
  name: 'cart',
  initialState: initialProduct,
  reducers: {
    setCarts: (state, action) => {
      state.cartList = action.payload;
    },
    clearCarts: (state) => {
      state.cartList = [];
      state.countCart = 0;
    },
    removeCart: (state, action) => {
      state.cartList = state.cartList.filter(item => item._id !== action.payload);
    },
    setCountCart: (state, action) => {
      state.countCart = action.payload;
    },
  }
})

const { reducer, actions } = cartSlice;

export const { setCarts, removeCart, setCountCart, clearCarts } = actions;
export default reducer;
