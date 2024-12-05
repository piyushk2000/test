import { FC } from "react";
import Grid from "@mui/material/Grid";
import styles from "../add-expert.module.scss";
import { commonInputStyles } from "../helper";
import { HookTextField } from "../../../atoms/form-fields/SLFieldTextField";
import { useHookFormContext } from "../../../utils/hooks/useHookFormContext";
import { HookAutoComplete } from "../../../atoms/form-fields/SLFieldAutoComplete";
import { validRegex } from "../../../utils/isValidType";
import { name_salutations_values } from "../../../utils/salutations";
import IsdAutoCompleteField from "../../../atoms/isd-field";
import BasicAutocomplete from "../../../molecules/autocompletes/basic-autocomplete";

interface BasicDetailsProps {
  geographiesList: any[];
}

const BasicDetails: FC<BasicDetailsProps> = ({ geographiesList }) => {
  const { registerState } = useHookFormContext();
  return (
    <>
      <Grid
        className={styles.inputRow}
        item
        xs={12}
        spacing={1}
        container
      >
        <Grid item xs={2} sm={2}>
          <BasicAutocomplete
            label="Mr/Mrs*"
            registerName="name_salutations"
            isRequired
            options={name_salutations_values}
          />
        </Grid>
        <Grid item xs={5} sm={5}>
          <HookTextField
            {...registerState("firstname")}
            rules={{
              required: { value: true, message: "This field is required" },
              pattern: {
                value: validRegex("name"),
                message: "Please start with alphabet & remove extra spaces"
              }
            }}
            textFieldProps={{
              ...commonInputStyles,
              label: "FIrstName",
              required: true,
            }}
          />
        </Grid>
        <Grid item xs={5} sm={5}>
          <HookTextField
            {...registerState("lastname")}
            rules={{
              required: { value: true, message: "This field is required" },
              pattern: {
                value: validRegex("name"),
                message: "Please start with alphabet & remove extra spaces"
              }
            }}
            textFieldProps={{
              ...commonInputStyles,
              label: "Last Name",
              required: true,
            }}
          />
        </Grid>
      </Grid>
      <Grid item xs={12} md={6} className={styles.inputRow}>
        <HookAutoComplete
          {...registerState("current_base_location")}
          textFieldProps={{
            label: "Current Base Location",
            size: "small",
            required: true,
          }}
          rules={{
            required: { value: true, message: "This field is required" },
          }}
          autocompleteProps={{
            isOptionEqualToValue: (option: any, value: any) =>
              option.value === value.value,
            size: "small",
            disablePortal: true,
            options: geographiesList,
            style: { backgroundColor: "white" },
          }}
        />
      </Grid>

      <Grid
        item
        xs={12}
        md={6}
        className={styles.inputRow}
        container
        spacing={1}
      >
        <Grid item xs={5} sm={4} md={5}>
          <IsdAutoCompleteField registerStateName="isd_code" label="ISD" />
        </Grid>
        <Grid item xs={7} sm={8} md={7}>
          <HookTextField
            {...registerState("mobile_number")}
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
              label: "Mobile Number",
              type: "number",
            }}
          />
        </Grid>
      </Grid>

      <Grid item xs={12} sm={6} className={styles.inputRow}>
        <HookTextField
          {...registerState("email")}
          rules={{
            pattern: {
              value: validRegex("email"),
              message: "Enter valid email ID",
            },
          }}
          textFieldProps={{
            ...commonInputStyles,
            label: "Email ID",
            type: "email",
          }}
        />
      </Grid>
    </>
  );
};

export default BasicDetails;
