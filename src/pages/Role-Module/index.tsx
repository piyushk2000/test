import Box from "@mui/material/Box";
import AdvanceSettingsTable from "./Table";
import {useState} from "react";
import AppBarCommon from "../../molecules/app-bar-common";

export default function UserRoleManagement() {

  const [selectSettings, setSelectSettings] = useState(false);

  const editBtnHandler = () => {
    setSelectSettings(true);
  };

  const saveBtnHandler = () => {
    setSelectSettings(false);
  };
  return (
    <Box
      sx={{
        mt: 0,
        mb: 4,
        background: "#F5F4F4",
        px: 3,
      }}
    >
      <AppBarCommon
        title="Advance Settings"
        isSearch={false}
        isUserIcon
        isAddIcon={true}
        addIconLabel="New Role"
        onAddIconClick={() => { }}
        isIconDefine={false}
      />
      
      <AdvanceSettingsTable  selectSettings={selectSettings} />
    </Box>
  );
}
