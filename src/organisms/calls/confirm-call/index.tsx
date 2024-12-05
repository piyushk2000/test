import { useMemo } from "react";
import DialogModal from "../../../atoms/dialog";
import { CallDetails, SetCallDetail } from "../../../pages/Calls/types";
import ConfirmCallForm from "./form";
import CallDetailEL from "./callDetails";

type Props = {
    isOpen: boolean;
    handleClose(): void;
    id: number;
    setCallDetails: SetCallDetail;
    callDetails: CallDetails;
    openChoosePaymentRequest:() => void;
}

// This Component is not in use as Submit Request Method for Expert Login is introduced in place of it
// Date - 12 August 2024

export default function ConfirmCallDialog({ isOpen, handleClose, id, setCallDetails, callDetails, openChoosePaymentRequest }: Props) {
    const callDetail = useMemo(() => {
        return callDetails.find(c => c.id === id);
    }, [])

    return (
        <DialogModal
            isOpen={isOpen}
            handleClose={handleClose}
            title={"Confirm Details"}
        >
            {callDetail &&
                <>
                    <CallDetailEL 
                        callDetail={callDetail}
                    />

                    <ConfirmCallForm
                        handleClose={handleClose}
                        id={id}
                        setCallDetails={setCallDetails}
                        openChoosePaymentRequest={openChoosePaymentRequest}
                    />
                </>
            }

        </DialogModal>
    )
}