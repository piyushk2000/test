import { Button, Chip, Grid } from "@mui/material";
import { useHookFormContext } from "../../../utils/hooks/useHookFormContext";
import { inputRow, projectsChip, projectsOptions } from "../style";
import { HookAutoComplete } from "../../../atoms/form-fields/SLFieldAutoComplete";
import TextfieldAsyncSearchHook from "../../../molecules/textfield-async-search/textfieldAsyncSearchHook";
import { searchProjectOrExpert } from "../../expert-form/helper";
import { useState } from "react";
import { CheckboxOptions } from "../helper";

const UserNExpertsFields = ({ users }: any) => {
  const [expertOptions, setExpertOptions] = useState<any>([]);
  const { registerState } = useHookFormContext();

  return (
    <>
      {/* Referred by */}
      <Grid item xs={12} md={4} sx={inputRow}>
        <TextfieldAsyncSearchHook
          registerStatename="referred_by"
          options={expertOptions}
          setOptions={(state: any) => setExpertOptions(state)}
          searchFunction={(inputValue: string) =>
            searchProjectOrExpert(inputValue, "expert")
          }
          label="Referred by"
          renderOption={(props: any, option: any) => {
            return (
              <li {...props} key={option.value}>
                <Button variant="text" sx={projectsOptions}>
                  <Chip sx={projectsChip} label={`ID:${option?.value}`} />
                  <Chip sx={projectsChip} label={option?.label} />
                </Button>
              </li>
            );
          }}
          isRequired={false}
        />
      </Grid>

      {/* Approved by */}
      <Grid item xs={12} md={4} sx={inputRow}>
        <HookAutoComplete
          {...registerState("approved_by")}
          textFieldProps={{
            label: "Approved by",
            size: "small",
          }}
          autocompleteProps={{
            isOptionEqualToValue: (option: any, value: any) =>
              option?.value === value?.value,
            size: "small",
            disablePortal: true,
            options: users || [],
            loadingText: "Loading...",
            noOptionsText: "Loading...",
            multiple: true,
            disableCloseOnSelect: true,
            renderOption: CheckboxOptions,
            sx: { backgroundColor: "white" },
          }}
        />
      </Grid>

      {/*  Updated by */}
      <Grid item xs={12} md={4} sx={inputRow}>
        <HookAutoComplete
          {...registerState("updated_by")}
          textFieldProps={{
            label: "Updated by",
            size: "small",
          }}
          autocompleteProps={{
            isOptionEqualToValue: (option: any, value: any) =>
              option?.value === value?.value,
            size: "small",
            disablePortal: true,
            options: users || [],
            loadingText: "Loading...",
            noOptionsText: "Loading...",
            multiple: true,
            disableCloseOnSelect: true,
            renderOption: CheckboxOptions,
            sx: { backgroundColor: "white" },
          }}
        />
      </Grid>

      {/* Added By  */}
      <Grid item xs={12} md={4} sx={inputRow}>
        <HookAutoComplete
          {...registerState("added_by")}
          textFieldProps={{
            label: "Added by",
            size: "small",
          }}
          autocompleteProps={{
            isOptionEqualToValue: (option: any, value: any) =>
              option?.value === value?.value,
            size: "small",
            disablePortal: true,
            options: users || [],
            loadingText: "Loading...",
            noOptionsText: "Loading...",
            multiple: true,
            disableCloseOnSelect: true,
            renderOption: CheckboxOptions,
            sx: { backgroundColor: "white" },
          }}
        />
      </Grid>
    </>
  );
};

export default UserNExpertsFields;
