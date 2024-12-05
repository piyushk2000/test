import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";

import { HookTextField } from "../../../atoms/form-fields/SLFieldTextField";
import { useHookFormContext } from "../../../utils/hooks/useHookFormContext";
import { commonInputStyles, inputRow } from "../style";
import HookDatePicker from "../../../atoms/form-fields/SLFieldDatePicker";
import { callMediumOptions } from "../helper";
import BasicAutocomplete from "../../../molecules/autocompletes/basic-autocomplete";
import { callType } from "../../project/project-call-log-form/helper";
import { dateClearBtnStyles } from "../../edit-expert/styles";


const OtherFields = () => {
  const { registerState, watch, setValue } = useHookFormContext();

  const [start_time_value, end_time_value] = watch(["call_start_time", "call_end_time"])

  const handleClearBtn = (value: "start" | "end") => {
    if (value === "start") {
      setValue("call_start_time", null);
    } else if (value === "end") {
      setValue("call_end_time", null);
    }
  }


  return (
    <>
      <Grid item xs={6} sx={inputRow}>
        <HookTextField
          {...registerState("min_cp")}
          textFieldProps={{
            ...commonInputStyles,
            label: "Min Cost Price US$",
            type: "number",
          }}
        />
      </Grid>
      <Grid item xs={6} sx={inputRow}>
        <HookTextField
          {...registerState("max_cp")}
          textFieldProps={{
            ...commonInputStyles,
            label: "Max Cost Price US$",
            type: "number",
          }}
        />
      </Grid>
      <Grid item xs={6} sx={inputRow}>
        <HookTextField
          {...registerState("min_sp")}
          textFieldProps={{
            ...commonInputStyles,
            label: "Min Selling Price US$",
            type: "number",
          }}
        />
      </Grid>
      <Grid item xs={6} sx={inputRow}>
        <HookTextField
          {...registerState("max_sp")}
          textFieldProps={{
            ...commonInputStyles,
            label: "Max Selling Price US$",
            type: "number",
          }}
        />
      </Grid>
      <Grid sx={{ ...inputRow, position: "relative" }} item xs={6}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <HookDatePicker
            {...registerState("call_start_time")}
            datePickerProps={{
              label: "Call Date (On or After)",
              slotProps: { textField: { size: "small", fullWidth: true } },
            }}
          />
          {start_time_value &&
            <IconButton sx={{ ...dateClearBtnStyles, paddingTop: "3px" }} onClick={() => handleClearBtn("start")}>
              <CloseIcon fontSize="small" />
            </IconButton>
          }

        </LocalizationProvider>
      </Grid>
      <Grid sx={{ ...inputRow, position: "relative" }} item xs={6}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <HookDatePicker
            {...registerState("call_end_time")}
            datePickerProps={{
              label: "Call Date (On or Before)",
              slotProps: { textField: { size: "small", fullWidth: true } },
            }}
          />
          {end_time_value &&
            <IconButton sx={{ ...dateClearBtnStyles, paddingTop: "3px" }} onClick={() => handleClearBtn("end")}>
              <CloseIcon fontSize="small" />
            </IconButton>
          }
        </LocalizationProvider>
      </Grid>
      <Grid item xs={12} md={6} sx={inputRow}>
        <BasicAutocomplete registerName="call_medium" label="Call Medium" multiple options={callMediumOptions} />
      </Grid>
      <Grid item xs={6} sx={inputRow}>
        <HookTextField
          {...registerState("case_code")}
          textFieldProps={{
            ...commonInputStyles,
            label: "Case Code",
          }}
        />
      </Grid>
      <Grid item xs={6} sx={inputRow}>
        <BasicAutocomplete
          registerName="call_type"
          label="Call Type"
          options={callType}
        />
      </Grid>
    </>
  );
};

export default OtherFields;
