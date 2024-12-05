import Grid from "@mui/material/Grid";
import { useHookFormContext } from "../../../utils/hooks/useHookFormContext";
import { inputRowCommonStyles } from "../../../common/formStyles";
import FormCancelSubmitBtns from "../../../atoms/formCancelSubmitBtns";
import { HookRadioButton } from "../../../atoms/form-fields/SLFieldRadioButton";

type Props = {
    handleClose(): void;
    payment_options: {label:string,value: string}[]
}

const ConfirmcallFields = ({ handleClose, payment_options }: Props) => {
    const { registerState } = useHookFormContext();

    return (
        <Grid container spacing={3} mt={"5px"}>
            <Grid item xs={12} sx={inputRowCommonStyles}>
                <HookRadioButton
                    {...registerState("payment_options")}
                    label="Choose an Option"
                    radioGroupProps={{
                        sx: {
                            "& .MuiTypography-root": {
                                marginLeft: "-5px !important",
                            },
                        },
                    }}
                    fields={payment_options}
                />
            </Grid>


            {/* ACTION BUTTONS */}
            <FormCancelSubmitBtns
                handleClose={handleClose}
            />
        </Grid>
    );
};

export default ConfirmcallFields;
