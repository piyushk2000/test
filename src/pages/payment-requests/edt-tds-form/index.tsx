import DialogModal from "../../../atoms/dialog";
import { RowData } from "../types";
import TransactionDetails from "../approve-reject-hold/transactionDetails";
import EditTdsForm from "./form";

type Props = {
    isOpen: boolean;
    handleClose(): void;
    rowData: RowData;
}

export default function EditTdsDialog({ isOpen, handleClose, rowData }: Props) {
    return (
        <DialogModal
            isOpen={isOpen}
            handleClose={handleClose}
            title={`Edit Tds Amount`}
        >
            <TransactionDetails RowsData={[rowData]} hideTotal />
            <EditTdsForm
                handleClose={handleClose}
                rowData={rowData}
            />
        </DialogModal>
    )
}