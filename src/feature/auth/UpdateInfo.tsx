import React, { useState } from "react";
import { Box, Button, CircularProgress, FormHelperText, Grid, Paper } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import authApi from "../../api/authApi";
import { getUser } from "./authSlice";
import InputField from "../../components/inputField/InputField";
import { toast } from "react-toastify";
import { UserProps } from "../../types/user";

export default function UpdateInfo() {
  return (
    <Grid container spacing={4}>
      <Grid item xs={6} lg={6}>
        <UpdateInfoBasic />
      </Grid>
      <Grid item xs={6} lg={6}>
        <ChangePassword />
      </Grid>
    </Grid>
  );
}

export function UpdateInfoBasic() {
  const dispatch = useDispatch();
  const user: UserProps = useSelector((state: any) => state.auth.user);
  const [isSubmiting, setIsSubmiting] = useState(false);

  const initialValue = {
    email: user.email ? user.email : "",
    fullname: user.fullname ? user.fullname : "",
    phone: user.phone ? user.phone : "",
    address: user.address ? user.address : "",
  };

  const validationSchema = Yup.object().shape({
    fullname: Yup.string().required("Nhập họ tên của bạn"),
    email: Yup.string()
      .required("Nhập email của bạn")
      .email("Đây không phải là email")
      .matches(
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
      ),
    phone: Yup.string()
      .required("Nhập số điện thoại của bạn")
      .matches(/^[0]\d{9}$/, "Số điện thoại không đúng"),
    address: Yup.string().required("Nhập địa chỉ của bạn"),
  });

  const { control, handleSubmit } = useForm({
    defaultValues: initialValue,
    resolver: yupResolver(validationSchema),
  });

  const onsubmit = async (data: any) => {
    try {
      setIsSubmiting(true);
      const response: any = await authApi.updateInfor(data);

      if (response.success) {
        toast.success("Cập nhật thông tin thành công");
        await dispatch(getUser());
      } else {
        setIsSubmiting(false);
        toast.error("Lỗi!");
      }
      setIsSubmiting(false);
    } catch (error: any) {
      console.log(error.message);
    }
  };

  return (
    <Paper sx={{ p: 2 }}>
      <h3>Cập nhật thông tin</h3>
      <Box>
        <InputField
          label="Email"
          name="email"
          control={control}
          disabled={true}
        />
        <InputField label="Họ tên" name="fullname" control={control} />
        <InputField label="Địa chỉ" name="address" control={control} />
        <InputField label="Điện thoại" name="phone" control={control} />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
          onClick={handleSubmit(onsubmit)}
          disabled={isSubmiting}
        >
          {isSubmiting ? (
            <>
              <CircularProgress color="success" size={26} /> Cập nhật thông tin
            </>
          ) : (
            "Cập nhật thông tin"
          )}
        </Button>
      </Box>
    </Paper>
  );
}

export function ChangePassword() {
  const [isSubmiting, setIsSubmiting] = useState(false);
  const [error, setError] = useState('');

	const initialValue = {
		password: '',
		newPassword: '',
		confirmPassword: ''
  };

  const validationSchema = Yup.object().shape({
    password: Yup.string().required("Vui lòng nhập mật khẩu"),
    newPassword: Yup.string()
      .required("Vui lòng nhập mật khẩu")
      .min(6, "Tối thiểu 6 kí tự")
      .max(20, "Tối đa 20 kí tự")
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/,
        "Mật khẩu phải bao gồm cả kí tự thường."
      ),
    confirmPassword: Yup.string().oneOf(
      [Yup.ref("newPassword"), ""],
      "Mật khẩu mới không khớp."
    ),
  });

  const { control, handleSubmit, reset } = useForm({
		defaultValues: initialValue,
    resolver: yupResolver(validationSchema),
  });

  const onsubmit = async (data: any) => {
    try {
      setIsSubmiting(true);
      const response: any = await authApi.changePassword(data);

      if (response.success) {
        toast.success("Cập nhật mật khẩu thành công");
				setError("");
				setIsSubmiting(false);
				reset(initialValue);
			} else {
				setError(response.message);
      	setIsSubmiting(false);
      }
    } catch (error: any) {
      console.log(error.message);
			setIsSubmiting(true);
    }
  };

  return (
    <Paper sx={{ p: 2 }}>
      <h3>Thay đổi mật khẩu</h3>
      <Box>
        <InputField
          label="Mật khẩu"
          name="password"
          type="password"
          control={control}
        />
        <InputField
          label="Mật khẩu mới"
          name="newPassword"
          type="password"
          control={control}
        />
        <InputField
          label="Xác nhận mật khẩu"
          name="confirmPassword"
          type="password"
          control={control}
				/>
				{error ? <FormHelperText sx={{ color: 'red', fontSize: 15 }}>{error}</FormHelperText> : ''}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
          onClick={handleSubmit(onsubmit)}
          disabled={isSubmiting}
        >
          {isSubmiting ? (
            <>
              <CircularProgress color="success" size={26} /> Cập nhật mật khẩu
            </>
          ) : (
            "Cập nhật mật khẩu"
          )}
        </Button>
      </Box>
    </Paper>
  );
}
