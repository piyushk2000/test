import Box from "@mui/material/Box";
import AppBarCommon from "../../app-bar-common";

type Props = {
  
};

export default function SettingHeader(props: Props) {
  return (
    <Box sx={{ pb: "24px" }}>
      <AppBarCommon
        title={"Settings"}
        isUserIcon
        isSearch={false}
        isIconDefine={false}
      />
    </Box>
  );
}
