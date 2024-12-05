import { Grid } from "@mui/material";
import { HookRadioButton } from "../../../atoms/form-fields/SLFieldRadioButton";
import { useHookFormContext } from "../../../utils/hooks/useHookFormContext";
import CustomBtnFilled from "../../../atoms/form-molecules/CustomBtnFilled";
import { inputRow, submitbtnRow } from "../style";
import { modeArr } from "../helper";

const Fields = (props: any) => {
  const { registerState } = useHookFormContext();

  return (
    <>
      <Grid container mt={1} pl={1}>
        {/* Medium */}
        <Grid item container xs={12} sx={inputRow}>
          <HookRadioButton
            {...registerState("mode")}
            label="Medium:*"
            rules={{
              required: { value: true, message: "This field is required" },
            }}
            radioGroupProps={{
              style: { display: "flex", gap: "1rem" },
            }}
            fields={modeArr}
          />
        </Grid>

        <Grid sx={{ ...inputRow, ...submitbtnRow }} item xs={12}>
          <CustomBtnFilled
            label="cancel"
            variant="outlined"
            onClick={props.handleClose}
          />
          <CustomBtnFilled
            label="submit"
            variant="contained"
            buttonType="submit"
          />
        </Grid>
      </Grid>
    </>
  );
};

export default Fields;
