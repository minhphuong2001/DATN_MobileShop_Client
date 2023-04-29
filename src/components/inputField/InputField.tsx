import React from "react";
import { useController } from "react-hook-form";
import { TextField } from "@mui/material";

type InputFieldProps = {
	name: string;
  label: string;
  type?: string;
  disabled?: boolean;
	control: any;
	inputProps?: any;
}

export default function InputField({
  name,
  control,
  label,
  type,
  disabled,
  ...inputProps
}: InputFieldProps) {
  const {
    field: { value, onChange, onBlur, ref },
    fieldState: { invalid, error },
  } = useController({ name, control });

  return (
    <TextField
      variant="outlined"
      fullWidth
      margin="normal"
      size="small"
      label={label}
      value={value}
      type={type}
      disabled={disabled}
      onChange={onChange}
      onBlur={onBlur}
      inputRef={ref}
      error={invalid}
      helperText={error?.message}
      InputProps={inputProps}
    />
  );
}
