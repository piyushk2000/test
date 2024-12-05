import { FormProvider, useForm } from "react-hook-form";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { defaultFormTheme } from "../../../atoms/defaultFormTheme";
import { useSnackbar } from "notistack";
import ApproveRejectHoldFields from "./fields";
import { RowData } from "../types";
import { RequestServer } from "../../../utils/services";
import { APIRoutes } from "../../../constants";
import { usePaymentsRequestsContext } from "../context";
import { useState } from "react";
import { changePriority } from "../helper";

type Props = {
    handleClose(): void;
    payment_options: { label: string, value: string }[];
    rowsData: RowData[];
    showRemarks: boolean;
    showInvoiceNum: boolean;
    showPaymentsOptions?: boolean;
    action?: string;
    handleSubmitClose?: () => void;
    is_bulk_action?: boolean;
}

const ConfirmCallForm = ({ handleClose, payment_options, rowsData, showInvoiceNum, showPaymentsOptions, action, showRemarks, handleSubmitClose, is_bulk_action }: Props) => {
    const { enqueueSnackbar } = useSnackbar();
    const { refetchData } = usePaymentsRequestsContext();
    const [imageUrl, setImageUrl] = useState("");
    const [controller, setController] = useState({
        control: null,
        for: "",
        setSelectedFile: null,
    }); // abort controller

    const onSubmit = async (formData: { 
        reason?: {label: string, value: string},
        rejected_checkbox?: boolean,
        payment_options: string | null,
        remarks: string | null,
        invoice_num: string | null
    }) => {
        
        const combinedHandleClose = () => {
            handleClose();
            handleSubmitClose && handleSubmitClose();
        }
        if(action === "high") {
            await changePriority(rowsData, refetchData, enqueueSnackbar, combinedHandleClose,action);
            return;
        }

        if(action === "low") {
            await changePriority(rowsData, refetchData, enqueueSnackbar, combinedHandleClose,action);
            return;
        }

        if (!action) {
            if (formData.payment_options === "PaymentRequestRejected") {

                if((!formData.remarks && !formData.reason)) {
                    enqueueSnackbar("Add remarks or reason before rejecting payment", {
                        variant: "warning"
                    });
                    return;
                }

                if(!formData.rejected_checkbox) {
                    enqueueSnackbar("Please confirm by checking the box that you understand this rejection is irreversible.", {
                        variant: "warning"
                    });
                    return;
                }
            }
        }

        if (action ? (action === "PaymentRequestRejected") : false) {
            if((!formData.remarks && !formData.reason)) {
                enqueueSnackbar("Add remarks or reason before rejecting payment", {
                    variant: "warning"
                });
                return;
            }

            if(!formData.rejected_checkbox) {
                enqueueSnackbar("Please confirm by checking the box that you understand this rejection is irreversible.", {
                    variant: "warning"
                });
                return;
            }
        }

        const payload: any = {
            ids: rowsData.map(row => row.id).join(","),
            action: formData.payment_options,
        }

        if(formData.remarks) {
            payload.remarks =(formData.reason?.label ? `${formData.reason.label}. ` : "") + formData.remarks 
        }

        if (action) {
            payload.action = action;
        }

        if (imageUrl) {
            payload.invoice_url = imageUrl;
        }

        if(formData.invoice_num) {
            payload.invoice_num = formData.invoice_num;
        }

        if(is_bulk_action) {
            payload.is_bulk_action = true;
        }

        try {
            const response = await RequestServer(APIRoutes.getPayments + "/review", "PATCH", payload);

            if (response.success) {
                enqueueSnackbar(response.message, {
                    variant: "success"
                });
                handleClose();
                handleSubmitClose && handleSubmitClose();
                refetchData();
            } else {
                enqueueSnackbar(response.message || response.error || "Something wrong happened", {
                    variant: "warning"
                })
            }
        } catch (error) {
            console.log(error);
        }
    };

    const defaultValues: any = {
        payment_options: null,
        remarks: null,
        invoice_num: null,
        reason: null,
        rejected_checkbox: null
    }

    if(showInvoiceNum) {
        defaultValues.invoice_num = rowsData[0].invoice_no
    }

    const methods = useForm({ defaultValues });

    const defaultTheme = createTheme(defaultFormTheme);

    return (
        <FormProvider {...methods}>
            <ThemeProvider theme={defaultTheme}>
                <form onSubmit={methods.handleSubmit(onSubmit)} noValidate>
                    <ApproveRejectHoldFields
                        handleClose={handleClose}
                        payment_options={payment_options}
                        setImageUrl={setImageUrl}
                        setController={setController}
                        showPaymentsOptions={showPaymentsOptions}
                        showInvoiceUpload={rowsData[0].status === "On Hold"}
                        showRemarks={showRemarks}
                        showInvoiceNum={showInvoiceNum}
                        is_bulk_action={is_bulk_action}
                        action={action}
                    />
                </form>
            </ThemeProvider>
        </FormProvider>
    );
};

export default ConfirmCallForm;
