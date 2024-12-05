import { SxProps, Theme } from "@mui/material";

export const dropdownBoxStyle = (isSelected: boolean): SxProps<Theme> => ({
  border: "1px solid ",
  borderColor: isSelected ? "var(--green-color)" : "rgba(0,0,0, 0.21)",
  backgroundColor: isSelected ? "var(--green-color)" : "transparent",
  padding: "3px 5px",
  borderRadius: "20px",
  color: isSelected ? "white" : "initial",
  display: "flex",
  overflow: "hidden",
  maxWidth: "300px",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
  alignItems: "center",
  gap: "0.25rem",
  cursor: "pointer",
  "& p": {
    fontSize: "12px",
    paddingLeft: "2px",
    whiteSpace: "nowrap",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});
