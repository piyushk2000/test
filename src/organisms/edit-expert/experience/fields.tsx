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
import { useEffect, useState } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers";
import HookDatePicker from "../../../atoms/form-fields/SLFieldDatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import CloseIcon from "@mui/icons-material/Close";
import { HookCheckBox } from "../../../atoms/form-fields/SLFieldCheckBox";
import TextfieldAsyncSearchHook from "../../../molecules/textfield-async-search/textfieldAsyncSearchHook";
import { getCompanies } from "../../../pages/Experts/helper";
import { HookAutoComplete } from "../../../atoms/form-fields/SLFieldAutoComplete";
import { useGeoFetch } from "../../../utils/hooks/useGeoFetch";
import { useBoolean } from "../../../utils/hooks/useBoolean";

const ExperienceFormFields = (props: any) => {
  const { setFormChange, removeClickHandler, expID, isNewlyAdded } = props;
  const { registerState, watch, setValue } = useHookFormContext();
  const { value: isFormChange, setTrue: setFormChangeTrue } = useBoolean();
  const [companiesOptions, setCompaniesOptions] = useState<any>([]);
  const { onlyCountryList: geographiesList, loading: geoLoading } = useGeoFetch();

  const handleClearBtn = (state: "start_date" | "end_date") => {
    setValue(state, null);
  };

  const [currently_works_here_value, end_date_value, start_date_value] = watch([
    "currently_works_here",
    "end_date",
    "start_date",
  ]);

  useEffect(() => {
    const subscription = watch((value, { name, type }) => {
      if (type === "change" || name === "start_date" || name === "end-date") {
        setFormChangeTrue();
        setFormChange((prevFormChangeValues: any) => {
          if (prevFormChangeValues.experience === false) {
            return {
              ...prevFormChangeValues,
              experience: true,
            };
          }

          return prevFormChangeValues;
        });
      }

      if (type === "change") {
        if (name === "currently_works_here") {
          if (value.currently_works_here) {
            setValue("end_date", null);
          }
        }
      }
    });

    return () => subscription.unsubscribe();
    //eslint-disable-next-line
  }, [watch]);

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={7}>
        <TextfieldAsyncSearchHook
          registerStatename="company"
          options={companiesOptions}
          searchFunction={(inputValue: string) => getCompanies(inputValue)}
          setOptions={(state: any) => setCompaniesOptions(state)}
          label="Company"
          enableFreeText
          onFreeTextClick={() => { }}
          lengthMax={{
            value: 100,
            message: "Company Name should be less than 100 characters",
          }}
        />
      </Grid>
      <Grid item xs={12} md={5}>
        <HookTextField
          {...registerState("designation")}
          rules={{
            required: { value: true, message: "This field is required" },
            maxLength: {
              value: 100,
              message: "Company Designation should be upto 100 characters",
            },
          }}
          textFieldProps={{
            ...commonInputStyles,
            label: "Designation *",
          }}
        />
      </Grid>

      <Grid item xs={6}>
        <HookTextField
          {...registerState("division")}
          rules={{
            maxLength: {
              value: 100,
              message: "Divison should be upto 100 characters",
            },
          }}
          textFieldProps={{
            ...commonInputStyles,
            label: "Division",
          }}
        />
      </Grid>

      <Grid item xs={6}>
        <HookAutoComplete
          {...registerState("location")}
          textFieldProps={{
            label: "Location",
            size: "small",
          }}
          autocompleteProps={{
            isOptionEqualToValue: (option: any, value: any) =>
              option.value === value.value,
            size: "small",
            options: geographiesList || [],
            style: { backgroundColor: "white" },
            loading: geoLoading,
          }}
        />
      </Grid>

      <Grid item xs={12}>
        <HookTextField
          {...registerState("job_description")}
          rules={{
            maxLength: {
              value: 4000,
              message: "Job Description should be less than 4000 characters",
            },
          }}
          textFieldProps={{
            ...commonInputStyles,
            label: "Job Description",
            multiline: true,
            style: { backgroundColor: "white" },
            minRows: 2,
          }}
        />
      </Grid>

      <Grid item xs={6} lg={3} sx={{ ...inputRowStyles, position: "relative" }}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <HookDatePicker
            {...registerState("start_date")}
            datePickerProps={{
              className: "date-picker",
              label: "Start Date *",
              format: "MM/YYYY",
              slotProps: {
                textField: { size: "small", fullWidth: true },
              },
              sx: { backgroundColor: "white" },
              views: ["month", "year"],
              disableFuture: true,
            }}
          />
          {start_date_value && (
            <IconButton
              sx={dateClearBtnExpStyles}
              onClick={() => handleClearBtn("start_date")}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          )}
        </LocalizationProvider>
      </Grid>

      <Grid item xs={6} lg={3} sx={{ ...inputRowStyles, position: "relative" }}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <HookDatePicker
            {...registerState("end_date")}
            datePickerProps={{
              format: "MM/YYYY",
              className: "date-picker",
              label: "End Date *",
              slotProps: { textField: { size: "small", fullWidth: true } },
              disabled: currently_works_here_value,
              sx: { backgroundColor: "white" },
              views: ["month", "year"],
              disableFuture: true,
            }}
          />
          {!currently_works_here_value && end_date_value && (
            <IconButton
              sx={dateClearBtnExpStyles}
              onClick={() => handleClearBtn("end_date")}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          )}
        </LocalizationProvider>
      </Grid>

      <Grid
        item
        md={4}
        lg={3}
        sx={{
          ...inputRowStyles,
          "@media (max-width:1200px)": {
            paddingTop: "0 !important",
          },
        }}
      >
        <HookCheckBox
          {...registerState("currently_works_here")}
          label="Currently Works Here"
        />
      </Grid>

      <Grid
        item
        md={4}
        lg={3}
        sx={{
          ...inputRowStyles,
          "@media (max-width:1200px)": {
            paddingTop: "0 !important",
          },
        }}
      >
        {/* Use in profile headline Checkbox is now hidden as requested by Varun Singh , Infollion.
          DATED - March 22 , 2024
        */}
        {/* <HookCheckBox
          {...registerState("relevant")}
          label="Use in profile headline"
        /> */}
      </Grid>

      {/* ACTION BUTTONS */}
      {isFormChange &&
        <Grid sx={actionRowStyles} item xs={12}>
          <CustomBtnFilled
            label={isNewlyAdded ? "Cancel" : "Remove"}
            variant="outlined"
            onClick={() => removeClickHandler(expID, isNewlyAdded)}
          />
          <CustomBtnFilled
            label="submit"
            variant="contained"
            buttonType="submit"
          />
        </Grid>
      }

    </Grid>
  );
};

export default ExperienceFormFields;
