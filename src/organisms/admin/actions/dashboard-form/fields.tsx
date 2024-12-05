import { useEffect } from "react";
import { Props } from "."
import { useHookFormContext } from "../../../../utils/hooks/useHookFormContext";
import { Grid } from "@mui/material";
import { HookTextField } from "../../../../atoms/form-fields/SLFieldTextField";
import { commonInputStyles } from "../../../../common/input-styles";
import FormCancelSubmitBtns from "../../../../atoms/formCancelSubmitBtns";

const Fields = ({ handleClose }: any) => {
    const { registerState } = useHookFormContext();

  

    return (
        <Grid container spacing={2} mt={1}>
            <Grid item xs={12}>
                <HookTextField
                    {...registerState("dashboards")}
                    textFieldProps={{
                        ...commonInputStyles,
                        label: "Dashboard",
                        required: true,
                        type: "text",
                    }}
                />
            </Grid>
            <FormCancelSubmitBtns
                handleClose={handleClose}
            />
        </Grid>
    )
}

export default Fields