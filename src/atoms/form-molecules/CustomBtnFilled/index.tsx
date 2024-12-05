import Button, { ButtonPropsVariantOverrides } from "@mui/material/Button";
import { ReactNode, CSSProperties } from "react";

type InputProps = {
  label: string;
  variant: string;
  onClick?: any;
  children?: ReactNode;
  type?: any;
  disabled?: boolean;
  buttonType?: "submit" | "button";
  formId?: string;
  styles?: CSSProperties;
  startIcon?: ReactNode
};

export default function CustomBtnFilled({
  label,
  variant,
  onClick,
  children,
  type,
  disabled,
  buttonType = "button",
  formId,
  styles = {},
  startIcon
}: InputProps) {
  return (
    <Button
      onClick={onClick}
      style={{
        border: variant === "outlined" ? "1px solid grey" : "none",
        color: variant === "outlined" ? "black" : "white",
        fontSize: "12px",
        borderRadius: "15px",
        textTransform: "capitalize",
        padding: "5px 15px",
        background: variant === "outlined" ? "inherit" : "#EC9324",
        boxShadow: "none",
        fontFamily: "inherit",
        opacity: disabled ? "0.4": "initial",
        ...styles,
      }}
      size="small"
      type={buttonType}
      form={formId || undefined}
      variant={variant === "contained" ? "contained" : "outlined"}
      disabled={disabled}
      startIcon={startIcon}
    >
      {children} {label}
    </Button>
  );
}
