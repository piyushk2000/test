import Grid from "@mui/material/Grid";
import FormCancelSubmitBtns from "../../../atoms/formCancelSubmitBtns";
import { RequiredTextField } from "../../../molecules/input-components/RequiredTextField";

type Props = {
    handleClose(): void;
}

const AddRemarkFields = ({ handleClose }: Props) => {

    return (
        <Grid container spacing={3} mt={"5px"}>
            <Grid item xs={12}>
                <RequiredTextField id="remark" label="Remark" max={500} />
            </Grid>

            {/* ACTION BUTTONS */}
            <FormCancelSubmitBtns
                handleClose={handleClose}
            />
        </Grid>
    );
};

export default AddRemarkFields;
