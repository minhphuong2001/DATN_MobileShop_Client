import React, { ReactNode } from "react";
import { Box, InputAdornment, TextField, Typography } from "@mui/material";
import { useController } from "react-hook-form";

interface CheckoutFormProps {
  name: string;
	label: string;
	control: any;
	icon: ReactNode;
  row?: number;
}

export default function CheckoutForm({ name, label, icon, row, control }: CheckoutFormProps) {
  const {
    field: { value, onChange, ref },
    fieldState: { invalid, error },
  } = useController({ name, control });

  return (
    <Box
      sx={{
        margin: "20px 0",
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
      }}
    >
      <Typography sx={{ width: "20%" }}>
        {label}
      </Typography>
      <TextField
        sx={{ width: "80%" }}
				margin="normal"
				size="small"
				multiline
				rows={row}
        label={label}
        value={value}
        onChange={onChange}
        inputRef={ref}
        error={invalid}
        helperText={error?.message}
        maxRows={5}
				// value={value}
        // onChange={onChange}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">{icon}</InputAdornment>
          ),
        }}
			/>
    </Box>
  );
}
