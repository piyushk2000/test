import Grid from "@mui/material/Grid";
import FormCancelSubmitBtns from "../../../../../atoms/formCancelSubmitBtns";
import { useHookFormContext } from "../../../../../utils/hooks/useHookFormContext";
import { HookRadioButton } from "../../../../../atoms/form-fields/SLFieldRadioButton";
import { inputRowCommonStyles } from "../../../../../common/formStyles";
import { sendInviteFields } from "./helper";

type Props = {
    handleClose: () => void;
}

const Fields = ({ handleClose }: Props) => {
    const { registerState } = useHookFormContext();

    return (
        <Grid container spacing={2} mt={"10px"}>
            <Grid item xs={12} sx={inputRowCommonStyles}>
                <HookRadioButton
                    {...registerState("proof_forward")}
                    label="Have you forwarded the proof to the internal compliance team? *"
                    rules={{
                        required: { value: true, message: "This field is required" },
                    }}
                    radioGroupProps={{
                        style: { display: "flex", gap: "1rem" },
                    }}
                    fields={sendInviteFields}
                />
            </Grid>
            <FormCancelSubmitBtns
                handleClose={handleClose}
            />
        </Grid>
    )
}

export default Fields