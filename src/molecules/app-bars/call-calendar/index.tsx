import Box from "@mui/material/Box";
import AppBarCommon from "../../app-bar-common";

export default function CallCalenderHeader() {
  return (
    <Box sx={{ pb: "24px" }}>
      <AppBarCommon
        title={"Call Calendar"}
        isUserIcon
        isSearch={false}
        isIconDefine={false}
      />
    </Box>
  );
}
