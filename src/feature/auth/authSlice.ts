import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import setAuthToken from "../../utils/authToken";
import { LOCAL_STORAGE } from "../../constants/global";
import authApi from "../../api/authApi";
import { UserProps } from "../../types/user";

export const getUser: any = createAsyncThunk(
  "auth/getUser",
  async (params, thunkAPI) => {
    const accessToken = localStorage[LOCAL_STORAGE.accessToken];

    if (accessToken) {
      setAuthToken(accessToken);

      const res: any = await authApi.confirm();
      
      if (res.success) {
        thunkAPI.dispatch(confirm({ user: res.user, isAuthenticated: true }));
      } else {
        thunkAPI.dispatch(confirm({ user: null, isAuthenticated: false }));
        setAuthToken(null);
        localStorage.removeItem(LOCAL_STORAGE.accessToken);
      }

      return res;
    } else {
      thunkAPI.dispatch(confirm({ user: null, isAuthenticated: false }));

      return { success: false, message: "Not found access token" };
    }
  }
);


type InitialStateProps = {
	isAuthLoading: boolean;
	isAuthenticated: boolean;
	user: UserProps | null;
}

const initialize: InitialStateProps = {
	isAuthenticated: false,
	isAuthLoading: true,
	user: null
}

const authSlice = createSlice({
  name: "auth",
  initialState: initialize,
  reducers: {
    confirm: (state, action) => {
      const { user, isAuthenticated } = action.payload;

      state.user = user;
      state.isAuthenticated = isAuthenticated;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
  extraReducers: {
    [getUser.pending]: (state: InitialStateProps) => {
      state.isAuthLoading = true;
    },
    [getUser.rejected]: (state: InitialStateProps) => {
      state.isAuthLoading = false;
      state.isAuthenticated = false;
    },
    [getUser.fulfilled]: (state: InitialStateProps) => {
      state.isAuthLoading = false;
    },
  },
});

const { reducer, actions } = authSlice;

export const { confirm, logout } = actions;
export default reducer;
