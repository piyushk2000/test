import Box from "@mui/material/Box";
import AppBarCommon from "../../app-bar-common";
import { useIsMobile } from "../../../utils/hooks/useIsMobile";

export default function MyCalenderHeader() {
  const isMobile = useIsMobile();
  return (
    <Box sx={{ pb: isMobile ? "0" : "24px" }}>
      <AppBarCommon
        title={"Calendar"}
        isUserIcon
        isSearch={false}
        isIconDefine={false}
      />
    </Box>
  );
}
