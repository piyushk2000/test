import { Grid } from "@mui/material";
import { actionRowStyles, commonInputStyles } from "../styles";
import { useHookFormContext } from "../../../utils/hooks/useHookFormContext";
import { HookTextField } from "../../../atoms/form-fields/SLFieldTextField";
import CustomBtnFilled from "../../../atoms/form-molecules/CustomBtnFilled";
import { useEffect } from "react";
import { useBoolean } from "../../../utils/hooks/useBoolean";
import { isAdmin } from "../../../utils/role";

const AboutFields = (props: any) => {
  const { setFormChange } = props;
  const { registerState, watch, setError, clearErrors } = useHookFormContext();
  const { value: isFormChange, setTrue: setFormChangeTrue } = useBoolean();
  const bio = watch("bio")

  useEffect(() => {
    const subscription = watch((value, { name, type }) => {
      if (type === "change") {
        setFormChangeTrue();
        setFormChange((prevFormChangeValues: any) => {
          if (prevFormChangeValues.about === false) {
            return {
              ...prevFormChangeValues,
              about: true,
            };
          }

          return prevFormChangeValues;
        });

        if (name === "bio") {
          const isBioLonger = value.bio.split("").length > 2000;
          if (isBioLonger) {
            setError("bio", {
              type: "custom",
              message: "Bio should be less than 2000 characters",
            });
          } else {
            clearErrors("bio");
          }
        }
      }
    });

    return () => subscription.unsubscribe();
    //eslint-disable-next-line
  }, [watch]);

  return (
    <Grid container spacing={3}>
      {/* Bio */}
      <Grid item container xs={12}>
        <Grid item xs={12} sx={{ position: "relative" }}>
          <HookTextField
            {...registerState("bio")}
            rules={{
              required: { value: true, message: "This field is required" },
              maxLength: {
                value: 2000,
                message: "Bio should be less than 2000 characters",
              },
              minLength: {
                value: isAdmin() ? 100 : 0,
                message: "Bio should be minimum 100 characters"
              }
            }}
            textFieldProps={{
              ...commonInputStyles,
              label: "Bio *",
              multiline: true,
              minRows: 2,
            }}
          />
          <p style={{
            fontSize: "10px", color: "rgba(0,0,0,0.5)", position: "absolute", bottom: "0",
            right: "4px"
          }}>
            {bio?.length || 0}/2000
          </p>
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
        </Grid>}
    </Grid>
  );
};

export default AboutFields;
