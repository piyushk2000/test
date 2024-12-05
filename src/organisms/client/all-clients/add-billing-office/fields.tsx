import { Grid } from "@mui/material";
import { useHookFormContext } from "../../../../utils/hooks/useHookFormContext";
import FormCancelSubmitBtns from "../../../../atoms/formCancelSubmitBtns";
import { commonInputStyles, formInputRowStyle } from "../style";
import { HookTextField } from "../../../../atoms/form-fields/SLFieldTextField";
import { HookAutoComplete } from "../../../../atoms/form-fields/SLFieldAutoComplete";
import { useEffect, useMemo } from "react";
import { countries } from "../../../../utils/countries";

type Props = {
  handleClose: () => void;
  setFormChange: () => void;
};

const Fields = ({ handleClose, setFormChange }: Props) => {
  const { registerState, watch } = useHookFormContext();

  useEffect(() => {
    const subscription = watch((value, { name, type }) => {
      if (type === "change") {
        setFormChange();
      }
    });

    return () => subscription.unsubscribe();
    //eslint-disable-next-line
  }, [watch]);

  const geographiesList =
    useMemo(() => countries.map((country) => ({ label: country.name, value: country.iso3 })), []);

  return (
    <>
      <Grid container mt="5px">
        {/* Name */}
        <Grid item xs={12} md={6} sx={formInputRowStyle}>
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

        {/* Entity Name */}
        <Grid item xs={12} md={6} sx={formInputRowStyle}>
          <HookTextField
            {...registerState("entityName")}
            rules={{
              required: { value: true, message: "This field is required" },
            }}
            textFieldProps={{
              ...commonInputStyles,
              label: "Entity Name",
              required: true,
            }}
          />
        </Grid>

        {/* Address */}
        <Grid item xs={12} md={6} sx={formInputRowStyle}>
          <HookTextField
            {...registerState("address")}
            rules={{
              required: { value: true, message: "This field is required" },
            }}
            textFieldProps={{
              ...commonInputStyles,
              label: "Address",
              required: true,
            }}
          />
        </Grid>

        {/* City */}
        <Grid item xs={12} md={6} sx={formInputRowStyle}>
          <HookTextField
            {...registerState("city")}
            rules={{
              required: { value: true, message: "This field is required" },
            }}
            textFieldProps={{
              ...commonInputStyles,
              label: "City",
              required: true,
            }}
          />
        </Grid>

        {/* Country */}
        <Grid item xs={12} md={6} sx={formInputRowStyle}>
          <HookAutoComplete
            {...registerState("country")}
            textFieldProps={{
              label: "Country",
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
              options: geographiesList,
              loadingText: "Loading...",
              style: { backgroundColor: "white" },
            }}
          />
        </Grid>

        {/* GSTIN */}
        <Grid item xs={12} md={6} sx={formInputRowStyle}>
          <HookTextField
            {...registerState("GSTIN")}
            rules={{
              pattern: {
                value:
                  /^([0-9]){2}([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}([0-9]){1}([a-zA-Z1-9]){1}([a-zA-Z0-9]){1}$/,
                message: "Please Enter a valid GSTIN",
              },
            }}
            textFieldProps={{
              ...commonInputStyles,
              label: "GSTIN",
            }}
          />
        </Grid>

        <FormCancelSubmitBtns handleClose={handleClose} />
      </Grid>
    </>
  );
};

export default Fields;
