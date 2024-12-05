import DialogModal from "../../../atoms/dialog";
import { CallDetail } from "../../../pages/Calls/types";
import AddRemarkForm from "./form";

type Props = {
    isOpen: boolean;
    handleClose(): void;
    callDetail: CallDetail;
    refetch: (id: number) => Promise<void>;
}

export default function AddRemarkDialog({isOpen, handleClose, callDetail, refetch}: Props) {
    return (
        <DialogModal
            isOpen={isOpen}
            handleClose={handleClose}
            title={callDetail.remark ? "Edit Remark" : "Add Remark"}
        >
            <AddRemarkForm 
                handleClose={handleClose}
                refetch={refetch}
                callDetail={callDetail}
            />
        </DialogModal>
    )
}