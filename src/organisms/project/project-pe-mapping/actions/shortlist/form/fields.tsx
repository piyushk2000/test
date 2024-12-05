import { Grid } from "@mui/material";
import FormCancelSubmitBtns from "../../../../../../atoms/formCancelSubmitBtns";
import { HookRadioButton } from "../../../../../../atoms/form-fields/SLFieldRadioButton";
import { useHookFormContext } from "../../../../../../utils/hooks/useHookFormContext";
import { ShortlistRejectOptions } from "../helper";

type Props = {
  handleClose: () => void;
};

const Fields = ({ handleClose }: Props) => {
  const { registerState } = useHookFormContext();

  return (
    <Grid container spacing={2} mt="1px">
      {/* Choose Response */}
      <Grid item xs={12} sx={{ padding: "5px" }}>
        <HookRadioButton
          {...registerState("shortlist")}
          label="Next Step:"
          radioGroupProps={{
            sx: {
              "& .MuiTypography-root": {
                marginLeft: "-5px !important",
              },
            },
          }}
          fields={ShortlistRejectOptions}
          enableDeselect
        />
      </Grid>
      <FormCancelSubmitBtns handleClose={handleClose} />
    </Grid>
  );
};

export default Fields;
