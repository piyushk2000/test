import Box from "@mui/material/Box";
import SettingHeader from "../../molecules/app-bars/setting-page";
import Settings from "../../organisms/settings";
import { createTheme, ThemeProvider } from "@mui/material/styles";


const theme = createTheme({
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

export default function SettingsPage() {
  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          mt: 0,
          mb: 4,
          background: "#F5F4F4",
          px: 3,
        }}
      >
        <SettingHeader />

        <Box sx={{ fontSize: "14px" }}>
          <Settings />
        </Box>
      </Box>
    </ThemeProvider>
  );
}
