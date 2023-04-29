import React, { useState } from "react";
import Helmet from "../components/helmet/Helmet";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { LOCAL_STORAGE } from "../constants/global";
import authApi from "../api/authApi";
import { getUser } from "../feature/auth/authSlice";
import { AppDispatch } from "../app/store";
import { useDispatch } from "react-redux";
import InputField from "../components/inputField/InputField";
import { Button, CircularProgress, FormHelperText } from "@mui/material";

export default function LoginPage() {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState("");
  const [loading, setLoading] = useState(false);

  const initialValue = {
    email: "",
    password: ""
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .required("Nhập email của bạn")
      .email("Đây không phải là email.")
      .matches(
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
      ),
    password: Yup.string()
      .required("Nhập mật khẩu")
      .min(6, "Tối thiểu 6 kí tự")
      .max(20, "Tối đa 20 kí tự"),
  });

  const { control, handleSubmit, reset } = useForm({
    defaultValues: initialValue,
    resolver: yupResolver(validationSchema),
  });

  const onsubmit: any = async (data: any) => {
    try {
      setLoading(true);
      const res: any = await authApi.login(data);

      if (res.success) {
        localStorage.setItem(LOCAL_STORAGE.accessToken, res.accessToken);
        localStorage.setItem(LOCAL_STORAGE.refreshToken, res.refreshToken);
        dispatch(getUser());
        navigate("/");
        setLoginError("");
        setLoading(false);
        reset(initialValue);
      } else {
        setLoginError(res.message);
        setLoading(false);
      }
    } catch (error: any) {
      console.log(error.message);
      setLoading(true);
    }
  };

  return (
    <div className="auth">
      <Helmet title="Đăng nhập">
        <div className="auth-container" id="authContainer">
          <div className="form-container sign-in-container">
            <form>
              <h1 style={{ marginBottom: 20 }}>Đăng nhập</h1>
              <InputField label="Email" name="email" control={control} />
              <InputField
                label="Mật khẩu"
                name="password"
                type="password"
                control={control}
              />
              {loginError ? (
                <FormHelperText sx={{ color: "red", fontSize: 15 }}>
                  {loginError}
                </FormHelperText>
              ) : (
                ""
              )}
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                sx={{ mt: 2 }}
                onClick={handleSubmit(onsubmit)}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <CircularProgress color="success" size={26} /> Đăng nhập
                  </>
                ) : (
                  "Đăng nhập"
                )}
              </Button>
              <Link to={"/quen-mat-khau"} style={{ textDecoration: "underline"}}>Quên mật khẩu?</Link>
            </form>
          </div>
          <div className="overlay-container">
            <div className="overlay">
              <div className="overlay-panel overlay-right">
                <h1>Chào mừng bạn đến với Mimin Shop!</h1>
                <p className="title-auth">
                  Nhập thông tin của bạn và bắt đầu hành trình với mua sắm tuyệt
                  vời với Mimin nhé ^_^
                </p>
                <button
                  className="ghost"
                  id="signUp"
                  onClick={() => navigate("/dang-ky")}
                >
                  Đăng ký
                </button>
              </div>
            </div>
          </div>
        </div>
      </Helmet>
    </div>
  );
}
