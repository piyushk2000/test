import { createTheme } from "@mui/material/styles";

export const fontTheme = createTheme({
  typography: {
    fontFamily: ["Montserrat"].join(","),
    fontSize: 12,
  },
  palette: {
    primary: {
      main: "#EC9324",
    },
  },
});
