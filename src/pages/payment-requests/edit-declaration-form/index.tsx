import DialogModal from "../../../atoms/dialog";
import { RowData } from "../types";
import TransactionDetails from "../approve-reject-hold/transactionDetails";
import EditDeclarationForm from "./form";

type Props = {
    isOpen: boolean;
    handleClose(): void;
    rowDatas: Array<RowData>;
    isBulk:boolean;
}

export default function EditDeclarationDialog({ isOpen, handleClose, rowDatas, isBulk }: Props) {
    return (
        <DialogModal
            isOpen={isOpen}
            handleClose={handleClose}
            title={`Declaration Date`}
        >
            <TransactionDetails RowsData={rowDatas} hideTotal />
            <EditDeclarationForm
                handleClose={handleClose}
                rowDatas={rowDatas}
                isBulk={isBulk}
            />
        </DialogModal>
    )
}