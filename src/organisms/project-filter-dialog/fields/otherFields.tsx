import Grid from "@mui/material/Grid";
import { HookTextField } from "../../../atoms/form-fields/SLFieldTextField";
import { useHookFormContext } from "../../../utils/hooks/useHookFormContext";
import { commonInputStyles, inputRow } from "../style";
import { HookAutoComplete } from "../../../atoms/form-fields/SLFieldAutoComplete";
import { status, type } from "../helper";
import { isClient } from "../../../utils/role";

type Props = {
  groups: { label: string, value: number }[];
}

const OtherFields = ({ groups }: Props) => {
  const { registerState } = useHookFormContext();

  return (
    <>
      {!isClient() &&
        <>
          {/* Functions */}
          <Grid
            item
            xs={12}
            md={6}
            sx={inputRow}
          >
            <HookAutoComplete
              {...registerState("functions")}
              textFieldProps={{ label: "Functions", size: "small" }}
              autocompleteProps={{
                multiple: true,
                freeSolo: true,
                options: [],
                size: "small",
                style: { backgroundColor: "white" },
              }}
            />
          </Grid>

          {/* target_companies */}
          <Grid
            item
            xs={12}
            md={6}
            sx={inputRow}
          >
            <HookAutoComplete
              {...registerState("target_companies")}
              textFieldProps={{ label: "Target Companies", size: "small" }}
              autocompleteProps={{
                multiple: true,
                freeSolo: true,
                options: [],
                size: "small",
                style: { backgroundColor: "white" },
              }}
            />
          </Grid>


          {/* case_code */}
          {/* <Grid item xs={12} md={6} sx={inputRow}>
            <HookTextField
              {...registerState("case_code")}
              textFieldProps={{
                ...commonInputStyles,
                label: "Case Code",
              }}
            />
          </Grid> */}

          {/* No of calls */}
          <Grid item xs={12} md={6} sx={inputRow}>
            <HookTextField
              {...registerState("no_of_calls")}
              textFieldProps={{
                ...commonInputStyles,
                label: "Minimum Calls Done",
              }}
            />
          </Grid>
        </>
      }

      {/* Status  */}
      <Grid item xs={12} md={6} sx={inputRow}>
        <HookAutoComplete
          {...registerState("status")}
          textFieldProps={{
            label: "Status",
            size: "small",
          }}
          autocompleteProps={{
            isOptionEqualToValue: (option: any, value: any) =>
              option?.value === value?.value,
            size: "small",
            options: status,
            multiple: false,
            sx: { backgroundColor: "white" },
          }}
        />
      </Grid>
      {/* type  */}
      <Grid item xs={12} md={6} sx={inputRow}>
        <HookAutoComplete
          {...registerState("type")}
          textFieldProps={{
            label: "Type",
            size: "small",
          }}
          autocompleteProps={{
            isOptionEqualToValue: (option: any, value: any) =>
              option?.value === value?.value,
            size: "small",
            options: type,
            multiple: false,
            sx: { backgroundColor: "white" },
          }}
        />
      </Grid>

      {/* Group Filter */}
      <Grid item xs={12} md={6} sx={inputRow}>
        <HookAutoComplete
          {...registerState("group")}
          textFieldProps={{
            label: "Group",
            size: "small",
          }}
          autocompleteProps={{
            isOptionEqualToValue: (option: any, value: any) =>
              option?.value === value?.value,
            size: "small",
            options: groups || [],
            loadingText: "Loading...",
            loading: Boolean(groups?.length > 0),
            multiple: false,
            sx: { backgroundColor: "white" },
          }}
        />
      </Grid>
    </>
  );
};

export default OtherFields;
