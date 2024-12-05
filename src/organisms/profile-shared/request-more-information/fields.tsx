import Grid from "@mui/material/Grid";
import { HookAutoComplete } from "../../../atoms/form-fields/SLFieldAutoComplete";
import { useHookFormContext } from "../../../utils/hooks/useHookFormContext";
import { HookTextField } from "../../../atoms/form-fields/SLFieldTextField";
import { commonInputStyles } from "../../admin/style";
import { HookCheckBox } from "../../../atoms/form-fields/SLFieldCheckBox";
import { Box } from "@mui/material";

export const RequestmoreInfoFields = ({
  isRequestAgendaValid,
}: {
  isRequestAgendaValid: boolean;
}) => {
  const { registerState } = useHookFormContext();
  return (
    <>
      <Grid container py={2} spacing={2}>
        <Grid item xs={12} sx={{ bg: "#FFF" }}>
          <Box sx={{ background: "#FFF" }}>
            <HookTextField
              {...registerState("notes")}
              rules={{
                required: { value: true, message: "This field is required" },
                maxLength: {
                  value: 500,
                  message: "Bio should be less than 500 characters",
                },
              }}
              textFieldProps={{
                ...commonInputStyles,
                label: "Notes *",
                multiline: true,
                minRows: 2,
              }}
            />
          </Box>
        </Grid>
        {isRequestAgendaValid ? (
          <Grid item xs={12} md={12}>
            <HookCheckBox
              {...registerState("is_agenda_response")}
              label="Agenda Responses?"
            />
          </Grid>
        ) : null}
      </Grid>
    </>
  );
};
