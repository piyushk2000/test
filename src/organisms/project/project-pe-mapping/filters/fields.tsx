import { Grid } from "@mui/material";
import { PeMappingFormOptions } from "./types";
import FormCancelSubmitBtns from "../../../../atoms/formCancelSubmitBtns";
import { HookAutoComplete } from "../../../../atoms/form-fields/SLFieldAutoComplete";
import { inputRow } from "./helper";
import { useHookFormContext } from "../../../../utils/hooks/useHookFormContext";

type Props = {
  handleClose(): void;
  formOptions: PeMappingFormOptions;
};

const Fields = ({ handleClose, formOptions }: Props) => {
  const { statusFields } = formOptions;
  const { registerState } = useHookFormContext();

  return (
    <Grid container spacing={2} mt="1rem">
      {/* Expert Status  */}
      <Grid item xs={12} sx={inputRow}>
        <HookAutoComplete
          {...registerState("expert_status")}
          textFieldProps={{
            label: "Invitation Status",
            size: "small",
          }}
          autocompleteProps={{
            isOptionEqualToValue: (option: any, value: any) =>
              option?.value === value?.value,
            size: "small",
            options: statusFields,
            multiple: false,
            sx: { backgroundColor: "white" },
          }}
        />
      </Grid>

      <FormCancelSubmitBtns handleClose={handleClose} />
    </Grid>
  );
};

export default Fields;
