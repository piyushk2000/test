import Grid from "@mui/material/Grid";
import { useHookFormContext } from "../../../utils/hooks/useHookFormContext";
import { inputRowCommonStyles } from "../../../common/formStyles";
import FormCancelSubmitBtns from "../../../atoms/formCancelSubmitBtns";
import { RequiredTextField } from "../../../molecules/input-components/RequiredTextField";
import { RowsData } from "../types";
import TransactionDetails from "../approve-reject-hold/transactionDetails";

type Props = {
    handleClose(): void;
    rowsData: RowsData;
}

const UpdateInvoiceNumFields = ({ handleClose, rowsData }: Props) => {

    return (
        <Grid container mt={"10px"}>
            {rowsData.map(d => (
                <Grid container item xs={12} sx={{ ...inputRowCommonStyles, backgroundColor: "#f4f5f4", borderRadius: "10px", mb: "1rem", padding: "1rem" }}>
                    <Grid item xs={12}>
                        <RequiredTextField
                            id={"invoice_num_" + d.id}
                            label="Invoice Number"
                            required={true}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TransactionDetails RowsData={[d]} hideTotal />
                    </Grid>
                </Grid>
            ))}

            {/* ACTION BUTTONS */}
            <FormCancelSubmitBtns
                handleClose={handleClose}
            />
        </Grid>
    );
};

export default UpdateInvoiceNumFields;
