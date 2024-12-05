import { Box, Button } from "@mui/material";
import AppBarCommon from "../../app-bar-common";

const AdvanceSettingsHeader = (props: any) => {
  const { editBtnHandler, saveBtnHandler, selectSettings } = props;

  return (
    <Box sx={{ pb: "24px" }}>
      <AppBarCommon
        title={"Advance Settings"}
        isUserIcon
        isSearch={false}
        isIconDefine={false}
        component={
          <Box ml={2}>
            {selectSettings ? (
              <Button
                sx={{
                  textTransform: "capitalize",
                  color: "white",
                  fontSize: "14px",
                  backgroundColor: "#ec9324",
                  borderRadius: "30px",
                  padding: "4px 25px",
                  "&:hover": {
                    backgroundColor: "#ec9324",
                  },
                }}
                onClick={saveBtnHandler}
              >
                Save
              </Button>
            ) : (
              <Button
                sx={{
                  textTransform: "capitalize",
                  color: "black",
                  fontSize: "14px",
                  border: "1px solid #868686",
                  borderRadius: "30px",
                  padding: "3px 25px",
                  "&:hover": {
                    backgroundColor: "#fff",
                  },
                }}
                onClick={editBtnHandler}
              >
                Edit
              </Button>
            )}
          </Box>
        }
        isExtraComponent
      />
    </Box>
  );
};

export default AdvanceSettingsHeader;
