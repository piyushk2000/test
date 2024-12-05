import { Grid } from "@mui/material";
import { useHookFormContext } from "../../utils/hooks/useHookFormContext";
import { HookTextField } from "../../atoms/form-fields/SLFieldTextField";
import { commonInputStyles } from "../../common/input-styles";
import FormCancelSubmitBtns from "../../atoms/formCancelSubmitBtns";
import styles from "./add-expert.module.scss";



const Fields = ({ handleClose, isChange }: any) => {
    const { registerState } = useHookFormContext();
    return (
        <Grid container spacing={2} mt={1}>
            <Grid item xs={12} sm={6} className={styles.inputRow}>
                <HookTextField
                    {...registerState("source_link")}
                    rules={{
                        required: { value: true, message: "This field is required" },
                    }}
                    textFieldProps={{
                        ...commonInputStyles,
                        label: "Enter Source Link",
                        required: true,
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