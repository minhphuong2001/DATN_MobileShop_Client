import { CategoryProps } from './../../types/category';
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import categoryApi from "../../api/categoryApi";

export const getAllCate = createAsyncThunk(
  "category/getAllCate",
  async (params, thunkApi) => {
    const res: any = await categoryApi.getAllCate();

    if (res.success) {
      thunkApi.dispatch(initCategory(res.data));
		}
    return res;
  }
);

export const getCateById = createAsyncThunk(
  "category/getCateById",
  async (id: string, thunkApi: any) => {
    const res = await categoryApi.getCateById(id);

    return res;
  }
);

export type initialCategoryProps = {
	categories: CategoryProps[];
}

const initialCate: initialCategoryProps = {
	categories: [
		{
			name: '',
			category_slug: '',
			logo: '',
			_id: '',
			createdAt: '',
			updatedAt: ''
		}
	],
};

const categorySlice = createSlice({
  name: "category",
  initialState: initialCate,
  reducers: {
    initCategory: (state, action) => {
      state.categories = action.payload;
    },
  },
});

const { reducer, actions } = categorySlice;

export const { initCategory } = actions;
export default reducer;
