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

const Fields = (props: any) => {
  const { setFormChange, awardID, removeClickHandler, isNewlyAdded } = props;
  const { registerState, watch, setValue } = useHookFormContext();
  const { value: isFormChange, setTrue: setFormChangeTrue } = useBoolean();
  const date_value = watch("date");

  useEffect(() => {
    const subscription = watch((value, { name, type }) => {

      if (type === "change" || name === "date") {
        setFormChangeTrue();
        setFormChange((prevFormChangeValues: any) => {
          if (prevFormChangeValues.awards === false) {
            return {
              ...prevFormChangeValues,
              awards: true,
            };
          }

          return prevFormChangeValues;
        });
      }
    });

    return () => subscription.unsubscribe();
    //eslint-disable-next-line
  }, [watch]);

  return (
    <Grid container spacing={3}>
      {/* Awards & Recognition */}
      <Grid item xs={12} md={6}>
        <HookTextField
          {...registerState("title")}
          rules={{
            required: { value: true, message: "This field is required" },
            maxLength: {
              value: 100,
              message:
                "Awards & Recognition should be less than 100 characters",
            },
          }}
          textFieldProps={{
            ...commonInputStyles,
            label: "Awards & Recognition *",
          }}
        />
      </Grid>

      {/* Date */}
      <Grid item xs={12} sm={6} lg={3} sx={{ ...inputRowStyles, position: "relative" }}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <HookDatePicker
            {...registerState("date")}
            datePickerProps={{
              format: "MM/YYYY",
              className: "date-picker",
              label: "Date",
              slotProps: { textField: { size: "small", fullWidth: true } },
              sx: { backgroundColor: "white" },
              views: ["month", "year"],
              disableFuture: true,
            }}
          />
          {date_value && (
            <IconButton
              sx={dateClearBtnExpStyles}
              onClick={() => setValue("date", null)}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          )}
        </LocalizationProvider>
      </Grid>

      {/* Description */}
      <Grid item xs={12}>
        <HookTextField
          {...registerState("description")}
          rules={{
            required: { value: true, message: "This field is required" },
            maxLength: {
              value: 100,
              message: "Description should be less than 500 characters",
            },
          }}
          textFieldProps={{
            ...commonInputStyles,
            label: "Description *",
            multiline: true,
            minRows: 2,
            style: { backgroundColor: "white" },
          }}
        />
      </Grid>

      {/* ACTION BUTTONS */}

      <Grid sx={actionRowStyles} item xs={12}>
        <CustomBtnFilled
          label="Remove"
          variant="outlined"
          onClick={() => removeClickHandler(awardID, isNewlyAdded)}
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

export default Fields;
