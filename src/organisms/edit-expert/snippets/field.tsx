import { Grid } from "@mui/material";
import { actionRowStyles, commonInputStyles } from "../styles";
import { useHookFormContext } from "../../../utils/hooks/useHookFormContext";
import { HookTextField } from "../../../atoms/form-fields/SLFieldTextField";
import CustomBtnFilled from "../../../atoms/form-molecules/CustomBtnFilled";
import { useEffect } from "react";
import { HookRichTextField } from "../../../atoms/rich-text-editor/HookRichTextEditor";
import { useBoolean } from "../../../utils/hooks/useBoolean";

const Fields = (props: any) => {
  const { registerState, watch } = useHookFormContext();
  const { value: isFormChange, setTrue: setFormChangeTrue } = useBoolean();

  useEffect(() => {
    const subscription = watch((value, { name, type }) => {
      if (type === "change") {

        setFormChangeTrue();
      }
    });

    return () => subscription.unsubscribe();
    //eslint-disable-next-line
  }, [watch]);

  return (
    <Grid container spacing={3}>
      {/* heading */}
      <Grid item xs={12}>
        <HookTextField
          {...registerState("heading")}
          rules={{
            required: { value: true, message: "This field is required" },
            maxLength: {
              value: 100,
              message: "Heading must be less than 100 Characters",
            },
          }}
          textFieldProps={{
            ...commonInputStyles,
            label: "Heading *",
          }}
        />
      </Grid>

      {/* Description */}
      <Grid item xs={12}>
        <HookRichTextField
          {...registerState("description")}
          rules={{
            required: { value: true, message: "This field is required" },
          }}
          quillProps={{
            placeholder: "Description",
          }}
        />
      </Grid>

      {/* ACTION BUTTONS */}
      {isFormChange &&
        <Grid sx={actionRowStyles} item xs={12}>
          <CustomBtnFilled
            label="Cancel"
            variant="outlined"
            onClick={() => props.handleClose()}
          />
          {props.handleSubmitBtnClick?<CustomBtnFilled
            label="submit"
            variant="contained"
            onClick={() => props.handleSubmitBtnClick()}
          />:<CustomBtnFilled
            label="submit"
            variant="contained"
            buttonType="submit"
          />}
          
        </Grid>}
    </Grid>
  );
};

export default Fields;
