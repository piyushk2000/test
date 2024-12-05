import DialogModal from "../../../../../../atoms/dialog";
import WarningDialog from "../../../../../../molecules/form-close-warning";

type Props = {
    isOpen: boolean;
    handleClose(): void;
    text: string;
}

export default function CallError({isOpen, handleClose, text}: Props) {
    return (
        <WarningDialog 
            text={text}
            open={isOpen}
            handleClose={handleClose}
            yesLabel="ok"
            handleYesClick={handleClose}
            hideCancelBtn
            textSx={{color: "red"}}
        />
    )
}