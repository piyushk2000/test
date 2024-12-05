import Grid from "@mui/material/Grid";
import { useHookFormContext } from "../../../utils/hooks/useHookFormContext";
import { inputRowCommonStyles } from "../../../common/formStyles";
import FormCancelSubmitBtns from "../../../atoms/formCancelSubmitBtns";
import { RequiredTextField } from "../../../molecules/input-components/RequiredTextField";

type Props = {
    handleClose(): void;
}

const EditTdsFields = ({ handleClose }: Props) => {
    const { registerState, watch } = useHookFormContext();


    return (
        <Grid container spacing={3} mt={"5px"}>
            <Grid item xs={6} sx={inputRowCommonStyles}>
                <RequiredTextField
                    id="tds_amount"
                    label="Tds Amount *"
                    type="number"
                    required={true}
                />
            </Grid>
            <Grid item xs={12} sx={inputRowCommonStyles}>
                <RequiredTextField
                    id="remarks"
                    label="Remarks *"
                    max={500}
                    required={false}
                />
            </Grid>


            {/* ACTION BUTTONS */}
            <FormCancelSubmitBtns
                handleClose={handleClose}
            />

        </Grid>
    );
};

export default EditTdsFields;
