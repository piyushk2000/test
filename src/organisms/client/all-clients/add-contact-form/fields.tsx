import { Grid } from "@mui/material";
import { useHookFormContext } from "../../../../utils/hooks/useHookFormContext";
import FormCancelSubmitBtns from "../../../../atoms/formCancelSubmitBtns";
import { commonInputStyles, formInputRowStyle } from "../style";
import { HookTextField } from "../../../../atoms/form-fields/SLFieldTextField";
import { useEffect } from "react";
import { name_salutations_values } from "../../../../utils/salutations";
import IsdAutoCompleteField from "../../../../atoms/isd-field";
import { validRegex } from "../../../../utils/isValidType";
import BasicAutocomplete from "../../../../molecules/autocompletes/basic-autocomplete";
import { HookCheckBox } from "../../../../atoms/form-fields/SLFieldCheckBox";

type Props = {
  handleClose: () => void;
  setFormChange: () => void;
};

const Fields = ({ handleClose, setFormChange }: Props) => {
  const { registerState, watch, setValue } = useHookFormContext();

  useEffect(() => {
    const subscription = watch((value, { name, type }) => {
      if (type === "change") {
        setFormChange();

        if (name === "mobile") {
          const price =
            value.mobile.length > 1 ? Math.round(value.mobile) : value.mobile;
          setValue("mobile", price);
        }
      }
    });

    return () => subscription.unsubscribe();
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watch]);

  return (
    <>
      <Grid container mt="5px">
        {/* Name */}
        <Grid sx={formInputRowStyle} item xs={12} spacing={1} container>
          <Grid item xs={4} sm={2} md={3}>
            <BasicAutocomplete
              label="Mr/Mrs*"
              registerName="salutation"
              options={name_salutations_values}
              isRequired
            />
          </Grid>
          <Grid item xs={8} sm={10} md={9}>
            <HookTextField
              {...registerState("name")}
              rules={{
                required: { value: true, message: "This field is required" },
              }}
              textFieldProps={{
                ...commonInputStyles,
                label: "Name",
                required: true,
              }}
            />
          </Grid>
        </Grid>

        {/* Phone Number */}
        <Grid container item xs={12} sx={formInputRowStyle} spacing={1}>
          <Grid item xs={4} sm={2} md={3}>
            <IsdAutoCompleteField registerStateName="isd_code" />
          </Grid>

          <Grid item xs={8} sm={10} md={9}>
            <HookTextField
              {...registerState("mobile")}
              rules={{
                required: { value: true, message: "This field is required" },
                maxLength: {
                  value: 20,
                  message: "Mobile Number Should be less than 20",
                },
              }}
              textFieldProps={{
                ...commonInputStyles,
                label: "Mobile Number *",
                type: "number",
              }}
            />
          </Grid>
        </Grid>

        {/* Email */}
        <Grid item xs={12} md={6} sx={formInputRowStyle}>
          <HookTextField
            {...registerState("email")}
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
              label: "Email ID *",
            }}
          />
        </Grid>

        {/* Designation */}
        <Grid item xs={12} md={6} sx={formInputRowStyle}>
          <HookTextField
            {...registerState("designation")}
            rules={{
              required: { value: true, message: "This field is required" },
              maxLength: {
                value: 100,
                message: "Designation Should be less than 100 characters",
              },
            }}
            textFieldProps={{
              ...commonInputStyles,
              label: "Designation *",
            }}
          />
        </Grid>

        {/* Client COmpliance Officer */}
        
      <Grid
        item
        md={4}
        lg={3}
        sx={{
          ...formInputRowStyle,
          "@media (max-width:1200px)": {
            paddingTop: "0 !important",
          },
        }}
      >
        <HookCheckBox
          {...registerState("is_compliance_officer")}
          label="Is Compliance Officer"
        />
      </Grid>

        <FormCancelSubmitBtns handleClose={handleClose} />
      </Grid>
    </>
  );
};

export default Fields;
