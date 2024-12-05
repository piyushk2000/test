import DialogModal from "../../../atoms/dialog";
import CallDownloadForm from "./download-form";

type Props = {
    isOpen: boolean;
    handleClose(): void;
}

export function DownloadBtnDialog({ isOpen, handleClose }: Props) {

    return (
        <>
            <DialogModal
                title={"Download"}
                handleClose={handleClose}
                isOpen={isOpen}
            >
                <CallDownloadForm
                    handleClose={handleClose}
                />
            </DialogModal>
        </>
    )
}