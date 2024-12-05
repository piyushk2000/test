import Box from "@mui/material/Box";
import AdvanceSettingsHeader from "../../molecules/app-bars/advance-settings-header";
import AdvanceSettingsTable from "../../organisms/advance-settings/advance-settings-table";
import {useState} from "react";

export default function AdvanceSettings() {

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
      <AdvanceSettingsHeader editBtnHandler={editBtnHandler}  saveBtnHandler={saveBtnHandler} selectSettings={selectSettings} />
      <AdvanceSettingsTable  selectSettings={selectSettings} />
    </Box>
  );
}
