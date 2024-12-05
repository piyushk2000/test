import Grid from "@mui/material/Grid";
import CustomBtnFilled from "../../atoms/form-molecules/CustomBtnFilled";
import { inputRow, submitbtnRow } from "./style";
import UserNExpertsFields from "./fields/usersNExpertsFields";
import OtherFields from "./fields/otherFields";

const Fields = ({ handleClose }: any) => {
  return (
    <Grid container spacing={2} mt={"5px"}>
      <UserNExpertsFields />
      <OtherFields />

      <Grid sx={{ ...inputRow, ...submitbtnRow }} item xs={12}>
        <CustomBtnFilled
          label="cancel"
          variant="outlined"
          onClick={handleClose}
        />
        <CustomBtnFilled
          label="submit"
          variant="contained"
          buttonType="submit"
        />
      </Grid>
    </Grid>
  );
};

export default Fields;
