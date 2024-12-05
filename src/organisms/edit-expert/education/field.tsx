import { Grid, IconButton } from "@mui/material";
import {
  actionRowStyles,
  commonInputStyles,
  dateClearBtnExpStyles,
  inputRowStyles,
} from "../styles";
import { useHookFormContext } from "../../../utils/hooks/useHookFormContext";
import { HookTextField } from "../../../atoms/form-fields/SLFieldTextField";
import CustomBtnFilled from "../../../atoms/form-molecules/CustomBtnFilled";
import { useEffect } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";
import CloseIcon from "@mui/icons-material/Close";
import HookDatePicker from "../../../atoms/form-fields/SLFieldDatePicker";
import { useBoolean } from "../../../utils/hooks/useBoolean";

const EducationInfoFields = (props: any) => {
  const { setFormChange, eduID, removeClickHandler, isNewlyAdded } = props;
  const { registerState, watch, setValue } = useHookFormContext();
  const { value: isFormChange, setTrue: setFormChangeTrue } = useBoolean();
  const handleClearBtn = (state: "start_year" | "end_year") => {
    setValue(state, null);
  };

  const [start_year_value, end_year_value] = watch(["start_year", "end_year"]);

  useEffect(
    () => {
      const subscription = watch((value, { name, type }) => {

        if (type === "change" || name === "start_year" || name === "end_year") {
          setFormChangeTrue();
          setFormChange((prevFormChangeValues: any) => {
            if (prevFormChangeValues.education === false) {
              return {
                ...prevFormChangeValues,
                education: true,
              };
            }

            return prevFormChangeValues;
          });
        }
      });

      return () => subscription.unsubscribe();
    },
    // eslint-disable-next-line
    [watch]
  );

  return (
    <Grid container spacing={3}>
      {/* College/Institute's Name */}
      <Grid item xs={12}>
        <HookTextField
          {...registerState("institution")}
          rules={{
            required: { value: true, message: "This field is required" },
            maxLength: {
              value: 100,
              message:
                "College/Institute's Name should be less than 100 characters",
            },
          }}
          textFieldProps={{
            ...commonInputStyles,
            label: "College/Institute's Name *",
          }}
        />
      </Grid>

      {/* Name of College/Coaching */}
      <Grid item xs={12}>
        <HookTextField
          {...registerState("course")}
          rules={{
            required: { value: true, message: "This field is required" },
            maxLength: {
              value: 150,
              message: "Subject/Course should be less than 150 characters",
            },
          }}
          textFieldProps={{
            ...commonInputStyles,
            label: "Subject/Course *",
          }}
        />
      </Grid>

      {/* First Year */}
      <Grid item xs={6} lg={3} sx={{ ...inputRowStyles, position: "relative" }}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <HookDatePicker
            {...registerState("start_year")}
            datePickerProps={{
              format: "YYYY",
              className: "date-picker",
              label: "Start Year",
              slotProps: { textField: { size: "small", fullWidth: true } },
              sx: { backgroundColor: "white" },
              views: ["year"],
              disableFuture: true,
            }}
          />
          {start_year_value && (
            <IconButton
              sx={dateClearBtnExpStyles}
              onClick={() => handleClearBtn("start_year")}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          )}
        </LocalizationProvider>
      </Grid>

      {/* Last Year */}
      <Grid item xs={6} lg={3} sx={{ ...inputRowStyles, position: "relative" }}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <HookDatePicker
            {...registerState("end_year")}
            datePickerProps={{
              format: "YYYY",
              className: "date-picker",
              label: "End Year",
              slotProps: { textField: { size: "small", fullWidth: true } },
              sx: { backgroundColor: "white" },
              views: ["year"],
              disableFuture: true,
            }}
          />
          {end_year_value && (
            <IconButton
              sx={dateClearBtnExpStyles}
              onClick={() => handleClearBtn("end_year")}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          )}
        </LocalizationProvider>
      </Grid>

      {/* ACTION BUTTONS */}

      <Grid sx={actionRowStyles} item xs={12}>
        <CustomBtnFilled
          label={isNewlyAdded ? "Cancel" : "Remove"}
          variant="outlined"
          onClick={() => removeClickHandler(eduID, isNewlyAdded)}
        />
        {isFormChange &&
          <CustomBtnFilled
            label="submit"
            variant="contained"
            buttonType="submit"
          />
        }
      </Grid>
    </Grid>
  );
};

export default EducationInfoFields;
