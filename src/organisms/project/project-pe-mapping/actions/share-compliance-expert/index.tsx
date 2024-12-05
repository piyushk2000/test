import { useSnackbar } from "notistack";
import DialogModal from "../../../../../atoms/dialog"
import ShareComplianceWithExpertForm from "./form";
import { setDialogState } from "../../type";

type Props = {
    isOpen: boolean;
    handleClose(): void;
    pe_id: number | null;
    client_id: number | null;
    isEdit?: boolean;
}

export default function ShareComplianceWithExpert({isOpen, handleClose, pe_id, client_id, isEdit}: Props) {
    const { enqueueSnackbar } = useSnackbar();
    
    if(!client_id || !pe_id) {
        enqueueSnackbar("Client ID or PE ID missing");
        return <></>
    }


    return (
        <DialogModal
            isOpen={isOpen}
            handleClose={handleClose}
            title={ (isEdit ? "ReShare" : "Share") +" Compliance with Expert"}
        >
            <ShareComplianceWithExpertForm 
                handleClose={handleClose}
                pe_id={pe_id}
                client_id={client_id}
                isEdit={isEdit}
            />
        </DialogModal>
    )
}