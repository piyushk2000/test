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
import { isValidType } from "../../../utils/isValidType";
import { useBoolean } from "../../../utils/hooks/useBoolean";

const Fields = (props: any) => {
  const { setFormChange, patID, removeClickHandler, isNewlyAdded } = props;
  const { registerState, watch, setValue, clearErrors, setError } =
    useHookFormContext();
  const { value: isFormChange, setTrue: setFormChangeTrue } = useBoolean();
  const date_value = watch("date");

  useEffect(() => {
    const subscription = watch((value, { name, type }) => {
      if (type === "change" || name === "date") {
        setFormChangeTrue();
        setFormChange((prevFormChangeValues: any) => {
          if (prevFormChangeValues.patents === false) {
            return {
              ...prevFormChangeValues,
              patents: true,
            };
          }

          return prevFormChangeValues;
        });
      }

      if (type === "change") {
        if (name === "patent_url") {
          const descriptionUrl = isValidType(value?.patent_url || "", "url");

          if (!value.patent_url) {
            clearErrors("patent_url");
          } else if (!descriptionUrl) {
            setError("patent_url", {
              type: "custom",
              message: "URL is incorrect",
            });
          } else {
            clearErrors("patent_url");
          }
        }
      }
    });

    return () => subscription.unsubscribe();
    //eslint-disable-next-line
  }, [watch]);

  return (
    <Grid container spacing={3}>
      {/* Title */}
      <Grid item xs={12}>
        <HookTextField
          {...registerState("title")}
          rules={{
            required: { value: true, message: "This field is required" },
            maxLength: {
              value: 100,
              message: "Title must be less than 100 Characters",
            },
          }}
          textFieldProps={{
            ...commonInputStyles,
            label: "Title *",
          }}
        />
      </Grid>

      {/* number */}
      <Grid item xs={12} lg={9}>
        <HookTextField
          {...registerState("number")}
          rules={{
            required: { value: true, message: "This field is required" },
            maxLength: {
              value: 150,
              message:
                "Patent / Application Number must be less than 150 Characters",
            },
          }}
          textFieldProps={{
            ...commonInputStyles,
            label: "Patent / Application Number *",
          }}
        />
      </Grid>

      {/* Patent Date */}
      <Grid item xs={12} sm={6} lg={3} sx={{ ...inputRowStyles, position: "relative" }}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <HookDatePicker
            {...registerState("date")}
            datePickerProps={{
              format: "MM/YYYY",
              className: "date-picker",
              label: "Patent Date ",
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
            maxLength: {
              value: 500,
              message: "Description must be less than 500 Characters",
            },
          }}
          textFieldProps={{
            ...commonInputStyles,
            label: "Description",
            multiline: true,
            minRows: 2,
            style: { backgroundColor: "white" },
          }}
        />
      </Grid>

      {/* Patent URL */}
      <Grid item xs={12}>
        <HookTextField
          {...registerState("patent_url")}
          rules={{
            maxLength: {
              value: 100,
              message: "Patent URL must be less than 100 Characters",
            },
          }}
          textFieldProps={{
            ...commonInputStyles,
            label: "Patent URL",
          }}
        />
      </Grid>

      {/* ACTION BUTTONS */}

      <Grid sx={actionRowStyles} item xs={12}>
        <CustomBtnFilled
          label="Remove"
          variant="outlined"
          onClick={() => removeClickHandler(patID, isNewlyAdded)}
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
