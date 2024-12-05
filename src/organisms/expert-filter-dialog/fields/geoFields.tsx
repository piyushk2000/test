import Grid from "@mui/material/Grid";
import { inputRow } from "../style";

import { HookAutoComplete } from "../../../atoms/form-fields/SLFieldAutoComplete";
import { useHookFormContext } from "../../../utils/hooks/useHookFormContext";
import { CheckboxOptions } from "../helper";
import { isClient } from "../../../utils/role";

type Props = {
  expert_geo: object[] | null;
  client_geo: object[] | null;
}

const GeoFields = ({ expert_geo, client_geo }: Props) => {
  const { registerState } = useHookFormContext();
  return (
    <>
      {/* Expertise in this Geographies  */}
      <Grid item xs={12} md={4} sx={inputRow}>
        <HookAutoComplete
          {...registerState("expertise_geo")}
          textFieldProps={{
            label: "Expertise in this Geography",
            size: "small",
          }}
          autocompleteProps={{
            isOptionEqualToValue: (option: any, value: any) =>
              option?.value === value?.value,
            size: "small",
            disablePortal: true,
            options: expert_geo || [],
            loadingText: "Loading...",
            multiple: false,
            sx: { backgroundColor: "white" },
          }}
        />
      </Grid>

      {/*  Base Location  */}
      <Grid item xs={12} md={4} sx={inputRow}>
        <HookAutoComplete
          {...registerState("base_location")}
          textFieldProps={{
            label: "Base Location",
            size: "small",
          }}
          autocompleteProps={{
            isOptionEqualToValue: (option: any, value: any) =>
              option?.value === value?.value,
            size: "small",
            disablePortal: true,
            options: client_geo || [],
            loadingText: "Loading...",
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

export default GeoFields;
