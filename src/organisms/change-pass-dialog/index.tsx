import DialogModal from "../../atoms/dialog"
import ChangePassForm from "./form";

type Props = {
    isOpen: boolean;
    handleClose(): void;
    isChange(): void;
    handleSubmitClose(): void;
}

const ChangePasswordDialog = ({ isOpen, handleClose, isChange, handleSubmitClose }: Props) => {

    return (
        <DialogModal
            isOpen={isOpen}
            handleClose={handleClose}
            title={"Change Password"}
        >
            <ChangePassForm
                handleClose={handleClose}
                isChange={isChange}
                handleSubmitClose={handleSubmitClose}
            />
        </DialogModal>
    )
}

export default ChangePasswordDialog