import Grid from "@mui/material/Grid";
import { inputRow } from "../style";

import { HookAutoComplete } from "../../../atoms/form-fields/SLFieldAutoComplete";
import { useHookFormContext } from "../../../utils/hooks/useHookFormContext";

const GeoFields = ({ expert_geo, client_geo }: any) => {
  const { registerState } = useHookFormContext();
  return (
    <>
      {/* Expert Geography  */}
      <Grid item xs={12} md={6} sx={inputRow}>
        <HookAutoComplete
          {...registerState("expert_geo")}
          textFieldProps={{
            label: "Expert Geography",
            size: "small",
          }}
          autocompleteProps={{
            isOptionEqualToValue: (option: any, value: any) =>
              option?.value === value?.value,
            size: "small",
            options: expert_geo || [],
            loadingText: "Loading...",
            multiple: false,
            sx: { backgroundColor: "white" },
          }}
        />
      </Grid>

      {/*  Client Geography  */}
      <Grid item xs={12} md={6} sx={inputRow}>
        <HookAutoComplete
          {...registerState("client_geo")}
          textFieldProps={{
            label: "Client Geography",
            size: "small",
          }}
          autocompleteProps={{
            isOptionEqualToValue: (option: any, value: any) =>
              option?.value === value?.value,
            size: "small",
            options: client_geo || [],
            loadingText: "Loading...",
            multiple: false,
            sx: { backgroundColor: "white" },
          }}
        />
      </Grid>
    </>
  );
};

export default GeoFields;
