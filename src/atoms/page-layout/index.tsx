import { ThemeProvider } from "@mui/material/styles";
import { fontTheme } from "../../common/themes/basic-theme";
import FullPageLoading from "../full-page-loading";
import Box from "@mui/material/Box";

type Props = {
  children: React.ReactNode;
};

export default function PageLayout({ children }: Props) {
  return (
    <ThemeProvider theme={fontTheme}>
      <FullPageLoading />
      <Box
        sx={{
          mt: 0,
          mb: 4,
          background: "#F5F4F4",
          px: {
            xs: 1.5,
            md: 2,
            lg: 3
          },
        }}
      >
        {children}
      </Box>
    </ThemeProvider>
  );
}
