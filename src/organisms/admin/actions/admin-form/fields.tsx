import { useEffect } from "react";
import Grid from "@mui/material/Grid";
import { HookTextField } from "../../../../atoms/form-fields/SLFieldTextField";
import { useHookFormContext } from "../../../../utils/hooks/useHookFormContext";
import { isValidType } from "../../../../utils/isValidType";
import { commonInputStyles, inputRow, submitbtnRow } from "../../style";
import CustomBtnFilled from "../../../../atoms/form-molecules/CustomBtnFilled";
import IsdAutoCompleteField from "../../../../atoms/isd-field";
import { HookAutoComplete } from "../../../../atoms/form-fields/SLFieldAutoComplete";
import { roleOptions } from "../add-admin/helper";

const Fields = ({ handleClose, isChange , isEdit}: any) => {
  const { registerState, watch, clearErrors, setError } = useHookFormContext();

  useEffect(() => {
    const subscription = watch((value: any, { name, type }: any) => {
      if (type === "change" && name === "email") {
        const checkEmail = isValidType(value.email, "email");

        if (!value.email) {
          clearErrors("email");
        } else if (!checkEmail) {
          setError("email", {
            type: "custom",
            message: "Email is incorrect",
          });
        } else {
          clearErrors("email");
        }
      }

      if (type === "change") {
        isChange((prev: any) => {
          if (prev.isChange) {
            return prev;
          }

          return {
            ...prev,
            isChange: true,
          };
        });
      }
    });

    return () => subscription.unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watch]);

  return (
    <Grid container spacing={2} mt={"5px"}>


      {/* Name */}
      <Grid item xs={12}>
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

      <Grid item xs={12} sm={6}>
        <HookAutoComplete
          {...registerState("role")}
          textFieldProps={{ label: "Role *", size: "small" }}
          rules={{
            required: { value: true, message: "This field is required" },
          }}
          autocompleteProps={{
            multiple: false,
            freeSolo: false,
            options: roleOptions,
            size: "small",
            disabled: isEdit,
            style: { backgroundColor: "white" },
          }}
        />
      </Grid>

      {/* Email */}
      <Grid item xs={12} sm={6} sx={inputRow}>
        <HookTextField
          {...registerState("email")}
          rules={{
            required: { value: true, message: "This field is required" },
          }}
          textFieldProps={{
            ...commonInputStyles,
            label: "Email ID *",
            type: "email",
          }}
        />
      </Grid>

      <Grid item xs={12} container spacing={1}>
        {/* ISD CODE */}
        <Grid item xs={12} sm={4} md={5} sx={inputRow} >
          <IsdAutoCompleteField registerStateName="isd_code" label="ISD *" isRequired />
        </Grid>

        {/* Mobile Number */}
        <Grid item xs={12} sm={8} md={7} sx={inputRow}>
          <HookTextField
            {...registerState("mobile_number")}
            rules={{
              required: { value: true, message: "This field is required" },
            }}
            textFieldProps={{
              ...commonInputStyles,
              label: "Mobile Number *",
              type: "number",
            }}
          />
        </Grid>
      </Grid>
      {/* Groups */}
      {/* <Grid item xs={12} sx={inputRow}>
        <HookAutoComplete
          {...registerState("groups")}
          textFieldProps={{
            label: "Groups",
            size: "small",
          }}
          autocompleteProps={{
            multiple: true,
            freeSolo: true,
            options: [],
            size: "small",
            style: { backgroundColor: "white" },
          }}
        />
      </Grid> */}

      <Grid sx={{ ...inputRow, ...submitbtnRow }} item xs={12}>
        <CustomBtnFilled
          label="cancel"
          variant="outlined"
          onClick={handleClose}
        />
        <CustomBtnFilled
          label="submit"
          variant="contained"
          buttonType="submit"
        />
      </Grid>
    </Grid>
  );
};

export default Fields;
