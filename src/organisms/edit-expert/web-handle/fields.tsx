import { useHookFormContext } from "../../../utils/hooks/useHookFormContext";
import { Grid } from "@mui/material";
import { actionRowStyles, commonInputStyles, inputRowStyles } from "../styles";
import { HookTextField } from "../../../atoms/form-fields/SLFieldTextField";
import { useEffect } from "react";
import CustomBtnFilled from "../../../atoms/form-molecules/CustomBtnFilled";
import { useBoolean } from "../../../utils/hooks/useBoolean";

const WebHandleFields = (props: any) => {
  const { registerState, watch } = useHookFormContext();
  const { value: isFormChange, setTrue: setFormChangeTrue } = useBoolean();
  const { setFormChange } = props;

  useEffect(() => {
    let subscription = watch((value, { name, type }) => {
      if (type === "change") {

        setFormChangeTrue();

        setFormChange((prevFormChangeValues: any) => {
          if (prevFormChangeValues.webHandles === false) {
            return {
              ...prevFormChangeValues,
              webHandles: true,
            };
          }
          return prevFormChangeValues;
        });
      }
    });

    return () => subscription.unsubscribe();

    // eslint-disable-next-line
  }, [watch]);

  return (
    <Grid container spacing={2}>
      {/* Linkedin */}
      <Grid container sx={inputRowStyles} item xs={12} sm={6}>
        <HookTextField
          {...registerState("Linkedin")}
          rules={{
            maxLength: {
              value: 150,
              message: "Linkedin URL should be less than 150 characters",
            },
          }}
          textFieldProps={{
            ...commonInputStyles,
            label: "Linkedin",
          }}
        />
      </Grid>

      {/* twiiter */}
      <Grid container sx={inputRowStyles} item xs={12} sm={6}>
        <HookTextField
          {...registerState("Twitter")}
          rules={{
            maxLength: {
              value: 150,
              message: "Twitter URL should be less than 150 characters",
            },
          }}
          textFieldProps={{
            ...commonInputStyles,
            label: "Twitter",
          }}
        />
      </Grid>

      {/* Facebook */}
      <Grid container sx={inputRowStyles} item xs={12} sm={6}>
        <HookTextField
          {...registerState("Facebook")}
          rules={{
            maxLength: {
              value: 150,
              message: "Facebook URL should be less than 150 characters",
            },
          }}
          textFieldProps={{
            ...commonInputStyles,
            label: "Facebook",
          }}
        />
      </Grid>

      {/* Instagram */}
      <Grid container sx={inputRowStyles} item xs={12} sm={6}>
        <HookTextField
          {...registerState("Instagram")}
          rules={{
            maxLength: {
              value: 150,
              message: "Instagram URL should be less than 150 characters",
            },
          }}
          textFieldProps={{
            ...commonInputStyles,
            label: "Instagram",
          }}
        />
      </Grid>

      {/* Github */}
      <Grid container sx={inputRowStyles} item xs={12} sm={6}>
        <HookTextField
          {...registerState("GitHub")}
          rules={{
            maxLength: {
              value: 150,
              message: "Github URL should be less than 150 characters",
            },
          }}
          textFieldProps={{
            ...commonInputStyles,
            label: "Github",
          }}
        />
      </Grid>

      {/* Youtube */}
      <Grid container sx={inputRowStyles} item xs={12} sm={6}>
        <HookTextField
          {...registerState("Youtube")}
          rules={{
            maxLength: {
              value: 150,
              message: "Youtube URL should be less than 150 characters",
            },
          }}
          textFieldProps={{
            ...commonInputStyles,
            label: "Youtube",
          }}
        />
      </Grid>

      {/* Personal/Company Website */}
      <Grid container sx={inputRowStyles} item xs={12} sm={6}>
        <HookTextField
          {...registerState("personal")}
          rules={{
            maxLength: {
              value: 150,
              message:
                "Personal/Company Website URL should be less than 150 characters",
            },
          }}
          textFieldProps={{
            ...commonInputStyles,
            label: "Personal/Company Website",
          }}
        />
      </Grid>

      {/* anyOther */}
      <Grid container sx={inputRowStyles} item xs={12} sm={6}>
        <HookTextField
          {...registerState("Any_Other")}
          rules={{
            maxLength: {
              value: 150,
              message: "URL should be less than 150 characters",
            },
          }}
          textFieldProps={{
            ...commonInputStyles,
            label: "Any Other",
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
        </Grid>
      }
    </Grid>
  );
};

export default WebHandleFields;
