import Grid from "@mui/material/Grid";
import { commonInputStyles, inputRow } from "../style";
import { HookTextField } from "../../../atoms/form-fields/SLFieldTextField";
import { HookAutoComplete } from "../../../atoms/form-fields/SLFieldAutoComplete";
import { useHookFormContext } from "../../../utils/hooks/useHookFormContext";
import { CheckboxOptions } from "../helper";

const DomainFields = ({ domains }: any) => {
  const { registerState } = useHookFormContext();
  return (
    <>
      {/* Domains */}
      <Grid item xs={12} md={4} sx={inputRow}>
        <HookAutoComplete
          {...registerState("domains")}
          textFieldProps={{
            label: "Domains",
            size: "small",
          }}
          autocompleteProps={{
            isOptionEqualToValue: (option: any, value: any) =>
              option?.value === value?.value,
            multiple: true,
            disablePortal: true,
            options: domains || [],
            noOptionsText: "Loading...",
            size: "small",
            style: { background: "white" },
            disableCloseOnSelect: true,
            renderOption: CheckboxOptions,
            filterOptions: (options, { inputValue }) => {
              const inputValueLowercased: string = inputValue.toLowerCase();
              return options.filter((option: any) =>
                option?.label.toLowerCase().includes(inputValueLowercased)
              );
            },
          }}
        />
      </Grid>

      {/* Other Domains */}
      <Grid item xs={12} md={4} sx={inputRow}>
        <HookTextField
          {...registerState("other_domains")}
          textFieldProps={{
            ...commonInputStyles,
            label: "Other Domains",
          }}
        />
      </Grid>
    </>
  );
};

export default DomainFields;
