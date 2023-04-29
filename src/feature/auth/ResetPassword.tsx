import React, { useState } from "react";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import authApi from "../../api/authApi";
import { useNavigate, useParams } from "react-router-dom";
import {
  Box,
  Button,
  CircularProgress,
  FormHelperText,
  Paper,
  Typography,
} from "@mui/material";
import InputField from "../../components/inputField/InputField";

function ResetPassword() {
  const { resetToken }: any = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const initialValue = {
    newPassword: "",
    confirmPassword: "",
  };

  const validationSchema = Yup.object().shape({
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
      "Mật khẩu không khớp."
    ),
  });

  const { control, handleSubmit } = useForm({
    defaultValues: initialValue,
    resolver: yupResolver(validationSchema),
  });

  const onResetPassword = async (data: any) => {
    try {
      setLoading(true);
      const res: any = await authApi.resetPassword(resetToken, data);

      if (res.success) {
        navigate("/dang-nhap");
        setError("/");
      } else {
        setError(res.message);
      }
      setLoading(false);
    } catch (error: any) {
      console.log(error.message);
    }
  };

  return (
    <div className="reset-passwrod">
      <Box
        sx={{
          width: "400px",
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: "0 auto",
        }}
      >
        <Paper sx={{ p: 3 }}>
          <Typography sx={{ fontSize: 24, fontWeight: 'bold', textAlign: 'center' }}>
            Reset mật khẩu
          </Typography>
          <InputField
            type="password"
            label="Mật khẩu mới"
            name="newPassword"
            control={control}
          />
          <InputField
            type="password"
            label="Xác nhận mật khẩu"
            name="confirmPassword"
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
            sx={{ mt: 2 }}
            onClick={handleSubmit(onResetPassword)}
            disabled={loading}
          >
            {loading ? (
              <>
                <CircularProgress color="success" size={26} /> Reset mật khẩu
              </>
            ) : (
              "Reset mật khẩu"
            )}
          </Button>
        </Paper>
      </Box>
    </div>
  );
}

export default ResetPassword;
