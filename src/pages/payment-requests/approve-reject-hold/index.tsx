import { useEffect, useState } from "react";
import DialogModal from "../../../atoms/dialog";
import { RowData } from "../types";
import ConfirmCallForm from "./form";
import TransactionDetails from "./transactionDetails";

type Props = {
    isOpen: boolean;
    handleClose(): void;
    rowData: RowData;
}

export default function ApproveHoldRejectDialog({ isOpen, handleClose, rowData }: Props) {
    const [paymentOptions, setPaymentOptions] = useState<{ label: string, value: string }[]>([]);

    useEffect(() => {
        if (isOpen) {
            if (rowData.actions[0] === "Approve / Hold / Reject") {
                setPaymentOptions([{
                    label: "Approve for Payment",
                    value: "ApproveForPayment"
                },
                {
                    label: "Hold Payment",
                    value: "HoldPayment"
                },
                {
                    label: "Reject Payment Request",
                    value: "PaymentRequestRejected"
                }
                ])
            } else if (rowData.actions[0] === "Approve / Reject") {
                setPaymentOptions([
                    {
                        label: "Approve for Payment",
                        value: "ApproveForPayment"
                    },
                    {
                        label: "Reject Payment Request",
                        value: "PaymentRequestRejected"
                    }
                ])
            } else if (rowData.actions[0] === "Undo Reject") {
                setPaymentOptions([{
                    label: "Undo Reject",
                    value: "UndoReject"
                }])
            }
        }
    }, [isOpen])

    return (
        <DialogModal
            isOpen={isOpen}
            handleClose={handleClose}
            title={`Payment Request ID: ${rowData.id}, Expert ID: ${rowData.expert_id}`}
        >
            <TransactionDetails RowsData={[rowData]} hideTotal />
            <ConfirmCallForm
                handleClose={handleClose}
                payment_options={paymentOptions}
                rowsData={[rowData]}
                showPaymentsOptions={true}
                showRemarks={true}
                showInvoiceNum={rowData.auto_generated === "No"}
            />
        </DialogModal>
    )
}