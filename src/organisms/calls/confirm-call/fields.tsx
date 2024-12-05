import Grid from "@mui/material/Grid";
import { useHookFormContext } from "../../../utils/hooks/useHookFormContext";
import { inputRowCommonStyles } from "../../../common/formStyles";
import FormCancelSubmitBtns from "../../../atoms/formCancelSubmitBtns";
import { HookCheckBox } from "../../../atoms/form-fields/SLFieldCheckBox";
import { confirmCallValues } from "./helper";

type Props = {
    handleClose(): void;
}

const ConfirmcallFields = ({ handleClose }: Props) => {
    const { registerState } = useHookFormContext();

    return (
        <Grid container spacing={3} mt={"5px"}>
            {confirmCallValues.map(({registerStateLabel,label}) => (
                <Grid item xs={12} sx={inputRowCommonStyles}>
                    <HookCheckBox
                        {...registerState(registerStateLabel)}
                        label={label}
                    />
                </Grid>
            ))}


            {/* ACTION BUTTONS */}
            <FormCancelSubmitBtns
                handleClose={handleClose}
                submitLabel="Confirm Call"
            />
        </Grid>
    );
};

export default ConfirmcallFields;
