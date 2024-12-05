import Grid from "@mui/material/Grid";
import { inputRow } from "../style";
import { HookAutoComplete } from "../../../atoms/form-fields/SLFieldAutoComplete";
import { useHookFormContext } from "../../../utils/hooks/useHookFormContext";
import { CheckboxOptions } from "../helper";

const AdminUsersField = ({ users }: any) => {
  const { registerState } = useHookFormContext();
  return (
    <>
      {/* Research Analyst */}
      <Grid item xs={12} md={6} sx={inputRow}>
        <HookAutoComplete
          {...registerState("research_analyst")}
          textFieldProps={{
            label: "Research Analyst",
            size: "small",
          }}
          autocompleteProps={{
            isOptionEqualToValue: (option: any, value: any) =>
              option?.value === value?.value,
            size: "small",
            options: users || [],
            loadingText: "Loading...",
            loading: users,
            multiple: false,
            sx: { backgroundColor: "white" },
            renderOption: (props: any, option: any) => (
              <li {...props} key={option.value}>
                {option?.label}
              </li>
            ),
          }}
        />
      </Grid>

      {/*  Account Manager */}
      <Grid item xs={12} md={6} sx={inputRow}>
        <HookAutoComplete
          {...registerState("account_manager")}
          textFieldProps={{
            label: "Account Manager",
            size: "small",
          }}
          autocompleteProps={{
            isOptionEqualToValue: (option: any, value: any) =>
              option?.value === value?.value,
            size: "small",
            options: users || [],
            noOptionsText: "Loading...",
            multiple: true,
            disableCloseOnSelect: true,
            sx: { backgroundColor: "white" },
            renderOption: CheckboxOptions,
          }}
        />
      </Grid>
    </>
  );
};

export default AdminUsersField;
