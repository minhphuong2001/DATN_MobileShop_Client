import React, { useState } from "react";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import authApi from "../../api/authApi";
import { Alert, AlertTitle, Box, Button, CircularProgress, FormHelperText, Paper, Typography } from "@mui/material";
import InputField from "../../components/inputField/InputField";

function ForgetPasswordForm() {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');
	const [isShow, setIsShow] = useState(false);

  const initialValue = {
    email: "",
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .required("Vui lòng nhập email")
      .email("Đây không phải là email.")
      .matches(
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
      ),
  });

  const { control, handleSubmit } = useForm({
    defaultValues: initialValue,
    resolver: yupResolver(validationSchema),
  });

  const onsubmit = async (data: any) => {
		try {
			setLoading(true);
      const res: any = await authApi.forgetPassword(data);

			if (res.success) {
				setError("");
				setIsShow(true);
			} else {
				setIsShow(false);
				setError(res.message);
			}
			setLoading(false)
    } catch (error: any) {
      console.log(error.message);
    }
  };

	return (
		<>
			{isShow ? <Alert severity="success">
				<AlertTitle>Gửi email thành công</AlertTitle>
				Email đặt lại mật khẩu đã được gửi. <strong>Vui lòng kiểm tra email của bạn!</strong>
			</Alert> :
				<Box sx={{
					width: '400px',
					height: '100vh',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					margin: '0 auto'
				}}>
					<Paper sx={{ p: 3 }}>
						<Typography sx={{ fontSize: 15, color: '#2e86de'}}>
							Quên mật khẩu? Vui lòng nhập địa chỉ email của bạn.
							Bạn sẽ nhận được một liên kết để tạo mật khẩu mới qua email.
						</Typography>
						<InputField label="Email" name="email" control={control} />
						{error ? <FormHelperText sx={{ color: "red", fontSize: 15 }}>{error}</FormHelperText> : ""}
						<Button
							type="submit"
							variant="contained"
							color="primary"
							sx={{ mt: 2 }}
							onClick={handleSubmit(onsubmit)}
							disabled={loading}
						>
							{loading ? (
								<>
									<CircularProgress color="success" size={26} /> Lấy lại mật khẩu
								</>
							) : (
								"Lấy lại mật khẩu"
							)}
						</Button>
					</Paper>
				</Box>
			}
		</>
  );
}

export default ForgetPasswordForm;
