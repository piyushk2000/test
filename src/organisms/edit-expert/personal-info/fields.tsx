import { useHookFormContext } from "../../../utils/hooks/useHookFormContext";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import {
  actionRowStyles,
  commonInputStyles,
  dateClearBtnStyles,
  inputRowStyles,
  lineStyle,
  ratingStyles,
  switchStyles,
} from "../styles";
import { HookTextField } from "../../../atoms/form-fields/SLFieldTextField";
import { HookAutoComplete } from "../../../atoms/form-fields/SLFieldAutoComplete";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import HookDatePicker from "../../../atoms/form-fields/SLFieldDatePicker";
import CloseIcon from "@mui/icons-material/Close";
import { HookSwitch } from "../../../atoms/form-fields/SLFieldSwitch";
import HookRating from "../../../atoms/form-fields/SLFieldRating";
import { useEffect } from "react";
import CustomBtnFilled from "../../../atoms/form-molecules/CustomBtnFilled";
import { validRegex } from "../../../utils/isValidType";
import { name_salutations_values } from "../../../utils/salutations";
import IsdAutoCompleteField from "../../../atoms/isd-field";
import { isAdmin, isExpert } from "../../../utils/role";
import { useBoolean } from "../../../utils/hooks/useBoolean";
import { useIsMobile } from "../../../utils/hooks/useIsMobile";
import BasicAutocomplete from "../../../molecules/autocompletes/basic-autocomplete";

const PersonalInfoFields = (props: any) => {
  const { registerState, watch, setValue, } =
    useHookFormContext();
  const { value: isFormChange, setTrue: setFormChangeTrue } = useBoolean();
  const dob_value = watch("dob");
  const is_expert = isExpert();
  const isMobile = useIsMobile();
  const { setFormChange } = props;

  const handleClearBtn = () => {
    setValue("dob", null);
  };

  useEffect(() => {
    let subscription = watch((value, { name, type }) => {
      if (type === "change" || name === "dob") {
        setFormChangeTrue();
        setFormChange((prevFormChangeValues: any) => {
          if (prevFormChangeValues.personalInfo === false) {
            return {
              ...prevFormChangeValues,
              personalInfo: true,
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
    <Grid width={"100%"} container spacing={{ xs: 1, sm: 2 }}>
      {/* Full Name */}
      <Grid container sx={inputRowStyles} spacing={1} item xs={12} md={6.5}>
        <Grid item xs={3}>
          <BasicAutocomplete
            label="Mr/Mrs *"
            registerName="salutation"
            isRequired
            options={name_salutations_values}
          />
        </Grid>

        <Grid item xs={4.5} >
          <HookTextField
            {...registerState("firstname")}
            rules={{
              required: { value: true, message: "This field is required" },
              maxLength: {
                value: 100,
                message: "Name should be less than 100 characters",
              },
              pattern: {
                value: validRegex("name"),
                message: "Please start with alphabet & remove extra spaces"
              }
            }}
            textFieldProps={{
              ...commonInputStyles,
              label: "First Name *",
            }}
          />
        </Grid>
        <Grid item xs={4.5}>
          <HookTextField
            {...registerState("lastname")}
            rules={{
              required: { value: true, message: "This field is required" },
              maxLength: {
                value: 100,
                message: "Name should be less than 100 characters",
              },
              pattern: {
                value: validRegex("name"),
                message: "Please start with alphabet & remove extra spaces"
              }
            }}
            textFieldProps={{
              ...commonInputStyles,
              label: "Last Name *",
            }}
          />
        </Grid>
      </Grid>

      {/* Nick Name */}
      {!is_expert &&
        <Grid item xs={6} md={2.5} sx={inputRowStyles}>
          <HookAutoComplete
            {...registerState("nicknames")}
            textFieldProps={{ label: "Known As / Nick Name", size: "small" }}
            autocompleteProps={{
              multiple: true,
              freeSolo: true,
              options: [],
              size: "small",
            }}
          />
        </Grid>
      }


      {/* DOB */}
      <Grid item xs={6} md={3} sx={{ ...inputRowStyles, position: "relative" }}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <HookDatePicker
            {...registerState("dob")}
            datePickerProps={{
              format: "DD/MM/YYYY",
              className: "date-picker",
              label: "DOB",
              slotProps: { textField: { size: "small", fullWidth: true } },
              disableFuture: true,
              sx: {
                backgroundColor: "white",
              },
            }}
          />
          {dob_value && (
            <IconButton sx={dateClearBtnStyles(isMobile)} onClick={handleClearBtn}>
              <CloseIcon fontSize="small" />
            </IconButton>
          )}
        </LocalizationProvider>
      </Grid>
      {
        !is_expert &&
        <>
          {/* Premium Expert */}
          <Grid item xs={12} lg={3} sx={{ ...inputRowStyles, paddingRight: "64px" }}>
            <HookSwitch
              {...registerState("premium_expert")}
              label="Premium Expert:"
              labelProps={{
                sx: switchStyles,
              }}
            />
          </Grid>

          {/* DND Enabled */}
          <Grid item xs={12} lg={2} sx={{ ...inputRowStyles, paddingRight: "64px" }}>
            <HookSwitch
              {...registerState("dnd_enabled")}
              label="DND:"
              labelProps={{
                sx: switchStyles,
              }}
            />
          </Grid>

          {/* Private Profile */}
          <Grid item xs={12} lg={3} sx={{ ...inputRowStyles, paddingRight: "64px" }}>
            <HookSwitch
              {...registerState("private_profile")}
              label="Private Profile:"
              labelProps={{
                sx: switchStyles,
              }}
            />
          </Grid>

          {/* Rating */}
          <Grid
            item
            xs={12}
            md={3}
            sx={{
              ...inputRowStyles,
              ...ratingStyles,
            }}
          >
            <Typography sx={{ fontWeight: "500" }} component="legend">
              Internal Rating:
            </Typography>
            <HookRating {...registerState("rating")} />
          </Grid>

          {/* Seperator */}
          <Grid item xs={12} sx={inputRowStyles}>
            <Box sx={lineStyle}></Box>
          </Grid>
        </>
      }


      {/* Primary Email */}
      <Grid item xs={12} md={6} sx={inputRowStyles}>
        <HookTextField
          {...registerState("primary_email")}
          rules={{
            required: { value: true, message: "This field is required" },
            maxLength: {
              value: 100,
              message: "Emails should be less than 100 characters",
            },
            pattern: {
              value: validRegex("email"),
              message: "Please Enter Correct Email",
            },
          }}
          textFieldProps={{
            ...commonInputStyles,
            label: (is_expert || isAdmin()) ? "Primary Email ID (read only)" : "Primary Email ID *",
            disabled: (is_expert || isAdmin())
          }}
        />
      </Grid>

      {/* Primary Phone Number */}
      <Grid container item xs={12} md={6} sx={inputRowStyles} spacing={1}>
        <Grid item xs={4} sm={2} md={3}>
          <IsdAutoCompleteField
            registerStateName="isd_code"
            isRequired
            label={(is_expert || isAdmin()) ? "ISD (read only)" : "ISD *"}
            isDisabled={is_expert || isAdmin()}
          />
        </Grid>

        <Grid item xs={8} sm={10} md={9}>
          <HookTextField
            {...registerState("primary_mobile")}
            rules={{
              required: { value: true, message: "This field is required" },
              maxLength: {
                value: 11,
                message: "Mobile Number Should be upto 11 Characters",
              },
              pattern: {
                value: validRegex("mobile_number"),
                message: "Mobile number cannot start with 0 or special characters like +"
              }
            }}
            textFieldProps={{
              ...commonInputStyles,
              label: (is_expert || isAdmin()) ? "Primary Mobile Number (read only)" : "Primary Mobile Number *",
              disabled: (is_expert || isAdmin()),
              type: "number",
            }}
          />
        </Grid>
      </Grid>


      {/* Secondary emails */}
      <Grid container item xs={12} md={6} sx={inputRowStyles} rowSpacing={2}>
        <Grid item xs={12}>
          <HookTextField
            {...registerState("additional_email_one")}
            rules={{
              maxLength: {
                value: 100,
                message: "Emails should be less than 100 characters",
              },
              pattern: {
                value: validRegex("email"),
                message: "Please Enter Correct Email",
              },
            }}
            textFieldProps={{
              ...commonInputStyles,
              label: "Additional Email One",
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <HookTextField
            {...registerState("additional_email_two")}
            rules={{
              maxLength: {
                value: 100,
                message: "Emails should be less than 100 characters",
              },
              pattern: {
                value: validRegex("email"),
                message: "Please Enter Correct Email",
              },
            }}
            textFieldProps={{
              ...commonInputStyles,
              label: "Additional Email Two",
            }}
          />
        </Grid>
      </Grid>

      {/* Additional Mobile One */}
      <Grid container item xs={12} md={6} sx={inputRowStyles} rowSpacing={2}>
        <Grid item container xs={12} columnSpacing={1}>
          <Grid item xs={4} sm={2} md={3}>
            <IsdAutoCompleteField registerStateName="isd_code_add_one" />
          </Grid>

          <Grid item xs={8} sm={10} md={9}>
            <HookTextField
              {...registerState("additional_mobile_one")}
              rules={{
                maxLength: {
                  value: 11,
                  message: "Mobile Number Should be upto 11 Characters",
                },
                pattern: {
                  value: validRegex("mobile_number"),
                  message: "Mobile number cannot start with 0 or special characters like +"
                }
              }}
              textFieldProps={{
                ...commonInputStyles,
                label: "Additional Mobile One",
                type: "number",
              }}
            />
          </Grid>
        </Grid>

        <Grid item container xs={12} columnSpacing={1}>
          <Grid item xs={4} sm={2} md={3}>
            <IsdAutoCompleteField registerStateName="isd_code_add_two" />
          </Grid>

          <Grid item xs={8} sm={10} md={9}>
            <HookTextField
              {...registerState("additional_mobile_two")}
              rules={{
                maxLength: {
                  value: 11,
                  message: "Mobile Number Should be upto 11 Characters",
                },
                pattern: {
                  value: validRegex("mobile_number"),
                  message: "Mobile number cannot start with 0 or special characters like +"
                }
              }}
              textFieldProps={{
                ...commonInputStyles,
                label: "Additional Mobile Two",
                type: "number",
              }}
            />
          </Grid>
        </Grid>
      </Grid>

      {/* ACTION BUTTONS */}
      {isFormChange &&
        <Grid sx={actionRowStyles} item xs={12}>
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

export default PersonalInfoFields;
