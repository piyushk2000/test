import { Box } from "@mui/material";
import AppBarCommon from "../../app-bar-common";

export default function UsageHeader() {
    return (
      <Box sx={{ pb: "24px" }}>
        <AppBarCommon
          title={"Usage"}
          isUserIcon
          isSearch={false}
          isIconDefine={false}
        />
      </Box>
    );
  }
  