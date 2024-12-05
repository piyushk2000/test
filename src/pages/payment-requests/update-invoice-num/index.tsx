import DialogModal from "../../../atoms/dialog";
import {  RowsData, SetSelect } from "../types";
import UpdateInvoiceNumForm from "./form";

type Props = {
    isOpen: boolean;
    handleClose(): void;
    rowsData: RowsData;
    setSelect: SetSelect;
}

export default function UpdateInvoiceNumberDialog({ isOpen, handleClose, rowsData, setSelect }: Props) {

    return (
        <DialogModal
            isOpen={isOpen}
            handleClose={handleClose}
            title={`Update Invoice Number`}
        >
            <UpdateInvoiceNumForm
                handleClose={handleClose}
                rowsData={rowsData}
                setSelect={setSelect}
            />
        </DialogModal>
    )
}