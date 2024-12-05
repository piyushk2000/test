import { Grid } from "@mui/material";
import DialogModal from "../../../atoms/dialog";
import TransactionDetails from "../approve-reject-hold/transactionDetails";
import { RowsData } from "../types";
import ConfirmCallForm from "../approve-reject-hold/form";
import NoResultFoundFilters from "../../../atoms/noResultsFilters";

type Props = {
    title: string;
    isOpen: boolean;
    handleClose(): void;
    handleSubmitClose(): void;
    rowsData: RowsData;
}

export const bulkActionTitles = {
    approve: "Approve Payments",
    hold: "Hold Payments",
    reject: "Reject Payments",
    undo_reject: "Undo Rejected Payments",
    high_priority: "Set Priority To High",
    low_priority: "Set Priority To Low"
}

function showPara(title: string) {
    switch (title) {
        case bulkActionTitles.approve: {
            return "Are you sure you want to approve these payments?"
        }
        case bulkActionTitles.hold: {
            return "Are you sure you want to hold these payments?"
        }
        case bulkActionTitles.reject: {
            return "Are you sure you want to reject these payments?"
        }
        case bulkActionTitles.undo_reject: {
            return "Are you sure you want to undo these rejected payments?"
        }
        case bulkActionTitles.high_priority: {
            return "Are you sure you want to set these payments' priority to high?"
        }
        case bulkActionTitles.low_priority: {
            return "Are you sure you want to set these payments' priority to low?"
        }
        default: {
            return ""
        }
    }
}

function showAction(title: string) {
    switch (title) {
        case bulkActionTitles.approve: {
            return "ApproveForPayment"
        }
        case bulkActionTitles.hold: {
            return "HoldPayment"
        }
        case bulkActionTitles.reject: {
            return "PaymentRequestRejected"
        }
        case bulkActionTitles.undo_reject: {
            return "undoPaymentReject"
        }
        case bulkActionTitles.high_priority: {
            return "high"
        }
        case bulkActionTitles.low_priority: {
            return "low"
        }
    }
}

export default function BulkActionPayments({ isOpen, title, handleClose, rowsData, handleSubmitClose }: Props) {

    return (
        <DialogModal
            title={title}
            isOpen={isOpen}
            handleClose={handleClose}
        >
            <Grid container mt={"10px"}>
                {rowsData.length ?
                    <>
                        <Grid item xs={12} sx={{ backgroundColor: "#f5f4f4", borderRadius: "5px", padding: '0.5rem', border: "1px solid rgba(0,0,0,0.1)" }}>
                            <TransactionDetails  RowsData={rowsData} hideTotal />
                        </Grid>
                        <Grid item xs={12} sx={{ mt: "2rem", fontSize: "18px", fontWeight: "500" }}>{showPara(title)}</Grid>
                        <Grid item xs={12}>
                            <ConfirmCallForm
                                handleClose={handleClose}
                                handleSubmitClose={handleSubmitClose}
                                rowsData={rowsData}
                                showPaymentsOptions={false}
                                showInvoiceNum={false}
                                is_bulk_action={true}
                                action={showAction(title)}
                                payment_options={[]}
                                showRemarks={(title !== bulkActionTitles.undo_reject && title !== bulkActionTitles.high_priority && title !== bulkActionTitles.low_priority)}
                            />
                        </Grid>
                    </> :
                    <Grid item xs={12}>
                        <NoResultFoundFilters sx={{mb: "1rem"}} text="Please select Payments before performing the action" />
                    </Grid>
                }
            </Grid>
        </DialogModal>
    )
}