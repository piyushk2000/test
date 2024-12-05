import { Grid } from "@mui/material";
import { actionRowStyles, commonInputStyles } from "../styles";
import { useHookFormContext } from "../../../utils/hooks/useHookFormContext";
import { HookTextField } from "../../../atoms/form-fields/SLFieldTextField";
import CustomBtnFilled from "../../../atoms/form-molecules/CustomBtnFilled";
import { useEffect } from "react";
import { useBoolean } from "../../../utils/hooks/useBoolean";
import { isAdmin } from "../../../utils/role";
import { HookAutoComplete } from "../../../atoms/form-fields/SLFieldAutoComplete";
import { inputRowCommonStyles } from "../../../common/formStyles";

const InternalInfoFields = (props: any) => {
  const { setFormChange } = props;
  const { registerState, watch, setError, clearErrors } = useHookFormContext();
  const { value: isFormChange, setTrue: setFormChangeTrue } = useBoolean();
  const bio = watch("bio")

  useEffect(() => {
    const subscription = watch((value, { name, type }) => {
      if (type === "change") {
        setFormChangeTrue();
        setFormChange((prevFormChangeValues: any) => {
          if (prevFormChangeValues.internal === false) {
            return {
              ...prevFormChangeValues,
              internal: true,
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
      <Grid item xs={12} sx={inputRowCommonStyles}>
        <HookAutoComplete
          {...registerState("offlimit_topics")}
          textFieldProps={{ label: "Off Limit Topics", size: "small" }}
          autocompleteProps={{
            multiple: true,
            freeSolo: true,
            options: [],
            size: "small",
            style: { backgroundColor: "white" },
          }}
        />
      </Grid>

      <Grid item xs={12} sx={inputRowCommonStyles}>
        <HookAutoComplete
          {...registerState("offlimit_companies")}
          textFieldProps={{ label: "Off Limit Companies", size: "small" }}
          autocompleteProps={{
            multiple: true,
            freeSolo: true,
            options: [],
            size: "small",
            style: { backgroundColor: "white" },
          }}
        />
      </Grid>

      <Grid item xs={12} sx={inputRowCommonStyles}>
        <HookTextField
          {...registerState("internal_notes")}
          textFieldProps={{
            ...commonInputStyles,
            label: "Internal Notes",
            multiline: true,
            rows: 2,
            style: { backgroundColor: "white" },
          }}
        />
      </Grid>

      {/* ACTION BUTTONS */}
      {isFormChange &&
        <Grid sx={actionRowStyles} item xs={12}>
          <CustomBtnFilled
            label="submit"
            variant="contained"
            buttonType="submit"
          />
        </Grid>}
    </Grid>
  );
};

export default InternalInfoFields;
