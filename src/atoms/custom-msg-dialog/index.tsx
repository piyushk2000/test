import { Typography } from "@mui/material";
import DialogModal from "../dialog"
import { Variant } from "@mui/material/styles/createTypography";

type Props = {
    isOpen: boolean;
    handleClose: () => void;
    title: string;
    text: string;
    variant?: Variant;
}

const CustomMsgDialog = ({ isOpen, handleClose, title, text, variant = "body1" }: Props) => {
    return (
        <DialogModal
            isOpen={isOpen}
            handleClose={handleClose}
            title={title}
        >
            <Typography mt={"10px"} variant={variant}>{text}</Typography>
        </DialogModal>
    )
}

export default CustomMsgDialog