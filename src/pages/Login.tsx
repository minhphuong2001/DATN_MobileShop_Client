import React, { useState } from "react";
import Helmet from "../components/helmet/Helmet";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { LOCAL_STORAGE } from "../constants/global";
import authApi from "../api/authApi";

export default function LoginPage() {
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState("");

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .required("Nhập email của bạn")
      .email("Đây không phải là email.")
      .matches(
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
      ),
    password: Yup.string()
      .required("Nhập mật khẩu")
      .min(8, "Tối thiểu 8 kí tự")
      .max(20, "Tối đa 20 kí tự")
  });

  const {
    register,
    handleSubmit,
  } = useForm({ resolver: yupResolver(validationSchema) });

  const onsubmit: any = async (data: any) => {
    const res: any = await authApi.login(data);

    if (res.success === false) {
      setLoginError(res.message);
    } else {
      localStorage.setItem(LOCAL_STORAGE.accessToken, res.accessToken);
      localStorage.setItem(LOCAL_STORAGE.refreshToken, res.refreshToken);
      navigate("/");
      setLoginError("");
    }
  };

  return (
    <div className="auth">
      <Helmet title="Đăng nhập">
        <div className="auth-container" id="authContainer">
          <div className="form-container sign-in-container">
            <form>
              <h1 style={{ marginBottom: 20 }}>Đăng nhập</h1>
              <input
                type="email"
                {...register('email')}
              />
              <input
                type="password"
                {...register('password')}
              />
              {/* <InputField name="email" label="Email" control={control} />
              <InputField name="password" label="Mật khẩu" control={control} /> */}
               {loginError && <p style={{ textAlign: 'left', color: 'red' }}>{loginError}</p>}
              <button type="submit" onClick={handleSubmit(onsubmit)}>
                Đăng nhập
              </button>
            </form>
          </div>
          <div className="overlay-container">
            <div className="overlay">
              <div className="overlay-panel overlay-right">
                <h1>Chào mừng bạn đến với Mimin Shop!</h1>
                <p>
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
