import { Grid } from "@mui/material";
import DialogModal from "../../../atoms/dialog"
import CustomBtnFilled from "../../../atoms/form-molecules/CustomBtnFilled";

type Props = {
    isOpen: boolean;
    handleClose(): void;
    openChangePassword(): void;
}

const ProfileDialog = ({ isOpen, handleClose, openChangePassword }: Props) => {
    const user = JSON.parse(localStorage.getItem("user") || "");

    const user_details = [
        {
            title: "Name",
            value: user.name
        },
        {
            title: "Email",
            value: user.email
        },
        {
            title: "Mobile",
            value: user.mobile
        }
    ]

    return (
        <DialogModal
            isOpen={isOpen}
            handleClose={handleClose}
            title={"My Profile"}
        >
            <Grid container mt="10px"
                sx={{
                    "& p": {
                        fontSize: "14px",
                    },
                    "& .bold": {
                        fontWeight: "500"
                    }
                }}
            >
                {user_details.map((detail) => (
                    <>
                        <Grid item xs={6} sm={2}>
                            <p className="bold">{detail.title}</p>
                        </Grid>
                        <Grid item xs={6} sm={10}>
                            <p>{detail.value}</p>
                        </Grid>
                    </>
                ))}
                <Grid item xs={12} mt="10px">
                    <CustomBtnFilled
                        label="Change Password"
                        variant="outlined"
                        onClick={openChangePassword}
                    />
                </Grid>
            </Grid>
        </DialogModal>
    )
}

export default ProfileDialog