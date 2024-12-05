import { LoadingButton } from "@mui/lab";
import React from "react";

type Props = {
    label: string;
    onClick?: () => void;
    type?: any;
    disabled?: boolean;
    loading: boolean
};

export default function CustomLoadingButton({onClick,disabled, loading, label}: Props) {
  return (
    <LoadingButton
      size="small"
      onClick={onClick}
      loading={loading}
      variant="contained"
      disabled={disabled}
      sx={{
        borderRadius: "20px",
        background: "#F7DFC3",
        color: "#252B3B",
        fontSize: "12px",
        padding: "5px 15px",
        boxShadow: "none",
        fontFamily: "inherit",
        textTransform: "capitalize",
        "&:hover": {
          background: "#F7DFC3",
        },
      }}
      disableElevation
      disableRipple
    >
      <span>{label}</span>
    </LoadingButton>
  );
}
