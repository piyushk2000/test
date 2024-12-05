import Box from "@mui/material/Box";
import { Outlet } from "react-router-dom";
import Sidebar from "../../molecules/sidebar";
import { Context } from "./context";
import { useBoolean } from "../../utils/hooks/useBoolean";

export default function Layout() {
  const {value: sidebarOpen, setValue: setSidebarOpen, setFalse: onClose} = useBoolean();
  return (
    <Context.Provider value={{ sidebarOpen, setSidebarOpen }}>
      <Box sx={{ display: "flex" }}>
        <Sidebar open={sidebarOpen} onClose={onClose}/>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
            // marginTop: "3.5em",
          }}
        >
          <Outlet />
        </Box>
      </Box>
      </Context.Provider>
  );
}
