import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { HookTextField } from "../../../../atoms/form-fields/SLFieldTextField";
import { useHookFormContext } from "../../../../utils/hooks/useHookFormContext";
import { commonInputStyles, inputRow } from "../style";
import { HookAutoComplete } from "../../../../atoms/form-fields/SLFieldAutoComplete";
import HookRating from "../../../../atoms/form-fields/SLFieldRating";
import { inputRowStyles, ratingStyles } from "../../../edit-expert/styles";
import { CheckboxOptions } from "../../../expert-filter-dialog/helper";

const ClientDetailsField = (props: any) => {
  const {
    client_contact_arr,
    research_analyst_arr,
    geo_arr,
    account_manager_arr,
    isViewForm
  } = props;
  const { registerState } = useHookFormContext();

  return (
    <>
      {/* Client Contact */}
      <Grid sx={inputRow} item xs={12} md={4}>
        <HookAutoComplete
          {...registerState("client_contact")}
          textFieldProps={{
            label: "Client Contact *",
            size: "small",
          }}
          rules={{
            required: { value: true, message: "This field is required" },
          }}
          autocompleteProps={{
            isOptionEqualToValue: (option: any, value: any) =>
              option?.value === value?.value,
            size: "small",
            disablePortal: true,
            options: client_contact_arr,
            style: { backgroundColor: "white" },
            disabled: isViewForm
          }}
        />
      </Grid>

      {/* Account Manager */}
      <Grid item xs={12} md={4} sx={inputRow}>
        <HookAutoComplete
          {...registerState("account_manager")}
          textFieldProps={{
            label: "Account Manager *",
            size: "small",
          }}
          rules={{
            required: { value: true, message: "This field is required" },
          }}
          autocompleteProps={{
            isOptionEqualToValue: (option: any, value: any) =>
              option?.value === value?.value,
            size: "small",
            disablePortal: true,
            options: account_manager_arr,
            style: { backgroundColor: "white" },
            disabled: isViewForm
          }}
        />
      </Grid>

      {/* Research Analyst */}
      <Grid sx={inputRow} item xs={12} md={4}>
        <HookAutoComplete
          {...registerState("research_analyst")}
          textFieldProps={{
            label: "Research Analyst *",
            size: "small",
          }}
          rules={{
            required: { value: true, message: "This field is required" },
          }}
          autocompleteProps={{
            isOptionEqualToValue: (option: any, value: any) =>
              option?.value === value?.value,
            size: "small",
            disablePortal: true,
            options: research_analyst_arr,
            style: { backgroundColor: "white" },
            disabled: isViewForm
          }}
        />
      </Grid>

      {/* Expert Rating */}
      <Grid
        item
        xs={6}
        sx={{
          ...inputRowStyles,
          ...ratingStyles,
        }}
      >
        <Typography sx={{ fontWeight: "500" }} component="legend">
          Expert Rating:
        </Typography>
        <HookRating {...registerState("expert_rating")} />
      </Grid>

      {/* Expert Type */}
      <Grid item xs={6} sx={inputRow}>
        <HookTextField
          {...registerState("expert_type")}
          rules={{
            required: { value: true, message: "This field is required" },
          }}
          textFieldProps={{
            ...commonInputStyles,
            label: "Expert Type",
            required: true,
            disabled: true,
          }}
        />
      </Grid>

      {/* Expert Geographies */}
      <Grid item xs={12} sx={inputRow}>
        <HookAutoComplete
          {...registerState("expert_geo")}
          textFieldProps={{
            label: "Expert Geographies *",
            size: "small",
          }}
          rules={{
            required: { value: true, message: "This field is required" },
          }}
          autocompleteProps={{
            isOptionEqualToValue: (option: any, value: any) =>
              option?.value === value?.value,
            size: "small",
            disablePortal: true,
            options: geo_arr,
            noOptionsText: "no options",
            multiple: true,
            disableCloseOnSelect: true,
            renderOption: CheckboxOptions,
            sx: { backgroundColor: "white" },
            disabled: isViewForm
          }}
        />
      </Grid>
    </>
  );
};

export default ClientDetailsField;
