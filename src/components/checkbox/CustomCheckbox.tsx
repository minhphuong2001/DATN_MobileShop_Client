import React, { useRef } from "react";
import { Check } from "@mui/icons-material";

type CustomCheckBoxProps = {
  label: string;
	checked: boolean | any;
	onChange: (s: any) => void;
};

const CustomCheckBox = (props: CustomCheckBoxProps) => {
  const inputRef = useRef(null);

  const handleChange = () => {
    if (props.onChange) {
      props.onChange(inputRef.current);
    }
  };

  return (
    <label className="custom-checkbox">
      <input
        type="checkbox"
        ref={inputRef}
        onChange={handleChange}
        checked={props.checked}
      />
      <span className="custom-checkbox__checkmark">
        <Check className="icon" />
      </span>
      {props.label}
    </label>
  );
};

export default CustomCheckBox;
