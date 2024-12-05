import { Grid, IconButton, Typography } from "@mui/material";
import { HookRadioButton } from "../../../atoms/form-fields/SLFieldRadioButton";
import { useHookFormContext } from "../../../utils/hooks/useHookFormContext";
import { closeBtnStyles, inputRow } from "../style";
import { HookTextField } from "../../../atoms/form-fields/SLFieldTextField";
import { refusalReasonArr } from "../helper";
import { commonInputStyles } from "../../edit-expert/styles";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import HookDatePicker from "../../../atoms/form-fields/SLFieldDatePicker";
import CloseIcon from "@mui/icons-material/Close";
import { HookAutoComplete } from "../../../atoms/form-fields/SLFieldAutoComplete";

const RefusalFields = (props: any) => {
  const { registerState, watch, setValue } = useHookFormContext();
  const [response_value, refusal_reason_value, future_date_value] = watch([
    "response",
    "refusal_reason",
    "future_date",
  ]);

  function handleClearBtn() {
    setValue("future_date", null);
  }
  
  const reasons = [
    { label: "Worried about sharing confidential info", value: "Worried about sharing confidential info" },
    { label: "Concern about conflicts with current job", value: "Concern about conflicts with current job" },
    { label: "Too busy to take on extra work", value: "Too busy to take on extra work" },
    { label: "Pay not worth their time", value: "Pay not worth their time" },
    { label: "No control over how their advice is used", value: "No control over how their advice is used" },
    { label: "Prefer working directly with clients", value: "Prefer working directly with clients" },
    { label: "Others", value: "Others" }
  ];

  return (
    <>
      {/* Refusal Reason */}
      {response_value === "Refused" && (
        <Grid item xs={12} sx={inputRow}>
          <HookAutoComplete
            {...registerState("refusal_reason")}
            textFieldProps={{
              label: "Refusal Reason:*",
            }}
            autocompleteProps={{
              isOptionEqualToValue: (option: any, value: any) =>
                option?.value === value?.value,
              size: "small",
              disablePortal: true,
              options: reasons,
              sx: { backgroundColor: "white" },
            }}
          />
        </Grid>
      )}


      {/* Other Reason */}
      {refusal_reason_value?.value === "Others" && response_value === "Refused" && (
        <Grid item xs={12} sx={inputRow}>
          <HookTextField
            {...registerState("other_reason")}
            rules={{
              required: { value: true, message: "This field is required" },
            }}
            textFieldProps={{
              ...commonInputStyles,
              label: "Please describe the reason *",
            }}
          />
        </Grid>
      )}


      {/* Future Date */}
      {response_value === "Refused" && (
        <Grid item container xs={12} sx={inputRow} alignItems={"center"}>
          <Grid item xs={8} sx={{ padding: "5px 0" }}>
            <Typography>
              Future Date after which we could reach out to Expert
            </Typography>
          </Grid>

          <Grid item xs={4} sx={{ padding: "5px 0", position: "relative" }}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <HookDatePicker
                {...registerState("future_date")}
                datePickerProps={{
                  format: "DD/MM/YYYY",
                  className: "date-picker",
                  label: "Pick Date",
                  disablePast: true,
                  slotProps: {
                    textField: { size: "small", fullWidth: true },
                  },
                  sx: {
                    backgroundColor: "white",
                  },
                }}
              />
              {future_date_value && (
                <IconButton sx={closeBtnStyles} onClick={handleClearBtn}>
                  <CloseIcon fontSize="small" />
                </IconButton>
              )}
            </LocalizationProvider>
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default RefusalFields;
