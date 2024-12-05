import Grid from "@mui/material/Grid";
import { useHookFormContext } from "../../../utils/hooks/useHookFormContext";
import { inputRow } from "../style";
import { HookRadioButton } from "../../../atoms/form-fields/SLFieldRadioButton";
import { categoryOptions, internalRatingOptions } from "../helper";
import { useEffect } from "react";

const RadioFields = () => {
  const { registerState } = useHookFormContext();

  return (
    <Grid item container xs={12}>
      {/* Internal Rating */}
      <Grid item xs={12} md={6} sx={inputRow}>
        <HookRadioButton
          {...registerState("internal_rating")}
          label="Internal Rating"
          radioGroupProps={{
            sx: {
              "& .MuiTypography-root": {
                marginLeft: "-5px !important",
              },
            },
          }}
          fields={internalRatingOptions}
          enableDeselect
        />
      </Grid>

      {/* Client Rating */}
      <Grid item xs={12} md={6} sx={inputRow}>
        <HookRadioButton
          {...registerState("client_rating")}
          label="Client Rating"
          radioGroupProps={{
            sx: {
              "& .MuiTypography-root": {
                marginLeft: "-5px !important",
              },
            },
          }}
          fields={internalRatingOptions}
          enableDeselect
        />
      </Grid>
    </Grid>
  );
};

export default RadioFields;
