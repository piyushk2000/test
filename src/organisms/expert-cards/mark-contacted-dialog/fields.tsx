import { Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { HookRadioButton } from "../../../atoms/form-fields/SLFieldRadioButton";
import { useHookFormContext } from "../../../utils/hooks/useHookFormContext";
import CustomBtnFilled from "../../../atoms/form-molecules/CustomBtnFilled";
import { contactMediumValues } from "../helper";
import { inputRow, submitbtnRow } from "../style";
import { HookTextField } from "../../../atoms/form-fields/SLFieldTextField";
import { commonInputStyles } from "../../edit-expert/styles";
import { isdValues } from "../../../utils/isdCodes";
import IsdAutoCompleteField from "../../../atoms/isd-field";

const Fields = (props: any) => {
  const {
    primary_email,
    primary_mobile,
  } = props.data;
  const { registerState, watch, resetField, setValue } = useHookFormContext();
  const [label, setLabel] = useState<string>("Linkedin Link:");

  const medium_value = watch("medium");

  useEffect(() => {
    const subscription = watch((value, { name, type }) => {
      if (type === "change" && name === "medium") {
        console.log(value.medium);
        switch (value.medium) {
          case "LinkedIn": {
            setLabel("Linkedin Link:");
            resetField("value");
            break;
          }
          case "Email": {
            setLabel("Email Address:");
            setValue("value", primary_email);
            break;
          }
          case "Mobile": {
            let phone = primary_mobile?.split(" ")[1];

            // Why we are checking if the phone exists or not
            // reason => B/c user might not add isd value or phone number when first submitting the form during Expert Creation
            // as ISD and Phone number are not complusory fields.
            if (phone) {
              const isd = primary_mobile.split(" ")[0];
              const isd_value = isdValues.find((isdValue: any) => (isdValue.dial_code === isd));

              if (isd_value) {
                const new_isd_value = {
                  value: isd_value.dial_code,
                  label: isd_value.dial_code,
                  name: `${isd_value.name.toLocaleLowerCase()} (${isd_value.dial_code
                    })`
                }
                setValue("isd_code", new_isd_value);
              }

            } else {
              phone = primary_mobile
            }
            setLabel("Phone Number:");
            setValue("value", phone);
            break;
          }
          case "Any_Other": {
            setLabel("Provide Link:");
            resetField("value");
            break;
          }
        }
      }
    });
    return () => subscription.unsubscribe();
    //eslint-disable-next-line
  }, [watch]);

  return (
    <>
      <Grid container>
        {/* Medium */}
        <Grid item container xs={12} sx={inputRow}>
          <HookRadioButton
            {...registerState("medium")}
            label="Medium:*"
            rules={{
              required: { value: true, message: "This field is required" },
            }}
            radioGroupProps={{
              style: { display: "flex", gap: "1rem" },
            }}
            fields={contactMediumValues}
          />
        </Grid>

        {/* Value */}
        <Grid item container xs={12} sx={inputRow} alignItems={"center"}>
          <Grid item xs={2.5}>
            <Typography>{label}</Typography>
          </Grid>
          {medium_value === "Mobile" ? (
            <Grid item xs={9.5} container spacing={1}>
              <Grid item xs={4}>
                <IsdAutoCompleteField isRequired registerStateName="isd_code" label="ISD *" />
              </Grid>
              <Grid item xs={8}>
                <HookTextField
                  {...registerState("value")}
                  rules={{
                    required: {
                      value: true,
                      message: "This field is required",
                    },
                  }}
                  textFieldProps={{
                    ...commonInputStyles,
                    label: "Phone Number *",
                    type: "number",
                  }}
                />
              </Grid>
            </Grid>
          ) : (
            <Grid item xs={9.5}>
              <HookTextField
                {...registerState("value")}
                rules={{
                  required: { value: true, message: "This field is required" },
                }}
                textFieldProps={{
                  ...commonInputStyles,
                  required: true,
                }}
              />
            </Grid>
          )}
        </Grid>
        <Grid sx={{ ...inputRow, ...submitbtnRow }} item xs={12}>
          <CustomBtnFilled
            label="cancel"
            variant="outlined"
            onClick={props.handleClose}
          />
          <CustomBtnFilled
            label="submit"
            variant="contained"
            buttonType="submit"
          />
        </Grid>
      </Grid>
    </>
  );
};

export default Fields;
