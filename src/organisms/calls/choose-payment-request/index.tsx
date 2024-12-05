import { Dispatch, SetStateAction, useEffect, useState } from "react";
import DialogModal from "../../../atoms/dialog";
import { CallDetail, GenerateInvoiceTypes, SetSelect } from "../../../pages/Calls/types";
import ConfirmCallForm from "./form";
import { isGenerateInvoiceAllowed } from "../../../pages/Calls/helpers";
import { useSnackbar } from "notistack";
import { payment_Options, payment_Options_Only_Upload } from "./helper";
import { PrimaryBankValue } from "../../../pages/Profile-shared/types";
import { CircularProgress } from "@mui/material";

type Props = {
    isOpen: boolean;
    handleClose(): void;
    callDetail: CallDetail | null;
    setGenerateInvoiceOpen: Dispatch<SetStateAction<GenerateInvoiceTypes>>;
    openUploadInvoice(): Promise<void>;
    setSelect: SetSelect;
}

export default function ChoosePaymentRequest({ isOpen, handleClose, callDetail, setGenerateInvoiceOpen, openUploadInvoice, setSelect }: Props) {
    const [paymentOptions, setPaymentOptions] = useState<Array<any> | null>(null);
    const [bankDetails, setBankDetails] = useState<PrimaryBankValue | null>(null);
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        (async () => {
            if (isOpen && callDetail) {
                const bank_id = callDetail?.fk_expert_value.primary_bank_value?.id?.toString() || null;
                const { isAllowed, bankDetails } = await isGenerateInvoiceAllowed(callDetail?.fk_expert?.toString() || null, bank_id, enqueueSnackbar);
                if (isAllowed) {
                    setPaymentOptions(payment_Options);
                    setBankDetails(bankDetails)
                } else {
                    setPaymentOptions(payment_Options_Only_Upload);
                }
            }
        })()
    }, [isOpen]);

    return (
        <DialogModal
            isOpen={isOpen}
            handleClose={handleClose}
            title={"Request Payment"}
        >
            {paymentOptions ?
                <>
                    {callDetail &&
                        <ConfirmCallForm
                            handleClose={handleClose}
                            payment_options={paymentOptions}
                            bankDetails={bankDetails}
                            setGenerateInvoiceOpen={setGenerateInvoiceOpen}
                            openUploadInvoice={openUploadInvoice}
                            callDetail={callDetail}
                            setSelect={setSelect}
                        />
                    }
                </> :
                <CircularProgress sx={{ mt: "10px" }} />
            }

        </DialogModal>
    )
}