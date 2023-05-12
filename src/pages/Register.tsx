import React, { useState } from "react";
import Helmet from "../components/helmet/Helmet";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import authApi from "../api/authApi";
import { UserRegister } from "../types/user";
import { Button, CircularProgress, FormHelperText } from "@mui/material";
import InputField from "../components/inputField/InputField";

export default function RegisterPage() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const initialValue = {
    email: "",
    fullname: "",
    password: "",
    confirmPassword: "",
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .required("Vui lòng nhập email")
      .email("Đây không phải là email.")
      .matches(
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
      ),
    fullname: Yup.string()
      .required("Vui lòng nhập họ tên"),
    password: Yup.string()
      .required("Vui lòng nhập mật khẩu")
      .min(6, "Tối thiểu 6 kí tự")
      .max(20, "Tối đa 20 kí tự")
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/,
        "Mật khẩu phải bao gồm cả kí tự thường."
      ),
    confirmPassword: Yup.string().oneOf(
      [Yup.ref("password"), ""],
      "Mật khẩu không khớp."
    ),
  });

  const { control, handleSubmit, reset } = useForm({
    defaultValues: initialValue,
    resolver: yupResolver(validationSchema),
  });

  const onsubmit = async (data: UserRegister) => {
    try {
      setLoading(true);
      const res: any = await authApi.register(data);

      if (res.success) {
        navigate("/dang-nhap");
        setError("");
        reset(initialValue);
      } else {
        setError(res.message);
      }
      setLoading(false);
    } catch (error) {
      return;
    }
  };

  return (
    <div className="auth">
      <Helmet title="Đăng ký">
        <div className="auth-container" id="authContainer">
          <div className="form-container sign-up-container">
            <form>
              <h1>Tạo tài khoản</h1>
              <br />
              <InputField label="Email" name="email" control={control} />
              <InputField label="Họ tên" name="fullname" control={control} />
              <InputField
                label="Mật khẩu"
                name="password"
                type="password"
                control={control}
              />
              <InputField
                label="Xác nhận mật khẩu"
                name="confirmPassword"
                type="password"
                control={control}
              />
              {error ? (
                <FormHelperText sx={{ color: "red", fontSize: 15 }}>
                  {error}
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
                    <CircularProgress color="success" size={26} /> Đăng ký
                  </>
                ) : (
                  "Đăng ký"
                )}
              </Button>
            </form>
          </div>
          <div className="overlay-container2">
            <div className="overlay2">
              <div className="overlay-panel2 overlay-left">
                <h1>Chào mừng quay trở lại với DTMP!</h1>
                <p className="title-auth">
                  Để giữ kết nối với DTMP, vui lòng đăng nhập bằng thông tin cá
                  nhân của bạn
                </p>
                <button
                  className="ghost"
                  id="signIn"
                  onClick={() => navigate("/dang-nhap")}
                >
                  Đăng nhập
                </button>
              </div>
            </div>
          </div>
        </div>
      </Helmet>
    </div>
  );
}
