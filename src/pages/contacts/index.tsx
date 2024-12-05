import Box from "@mui/material/Box";
import { Outlet, useNavigate } from "react-router-dom";

export default function Contacts() {
  return (
    <Box sx={{ mt: 0, mb: 4, background: "#F5F4F4", px: 3 }}>
      <Outlet />
    </Box>
  );
}
