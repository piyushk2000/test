import Box from "@mui/material/Box";
import DialogModal from "../../dialog"

type Props = {
    isOpen: boolean;
    handleClose: () => void;
    phoneNumber: string;
    email: string;
    name: string;
}

const ContactUsDialog = ({ isOpen, handleClose, phoneNumber, email, name }: Props) => {
    return (
        <DialogModal
            isOpen={isOpen}
            title="Your point of contact for this call"
            handleClose={handleClose}
        >
            <Box sx={{
                marginTop: "8px",
                "& > p": {
                    fontSize: "14px"
                },
                "& strong": {
                    fontWeight: "500"
                }
            }}>
                <p><strong>Name:</strong> {name}</p>
                <p><strong>Phone Number:</strong> {phoneNumber}</p>
                <p><strong>Email:</strong> {email}</p>
            </Box>
        </DialogModal>
    )
}

export default ContactUsDialog