import { useState } from "react"
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useBoolean } from "../../utils/hooks/useBoolean";
import { DoneIconStyle, formBoxStyles, formHeadingStyles, loginBtnStyles } from "./style";
import { EmailLoginTextField } from "../../atoms/login/textfield";
import CustomBtnFilled from "../../atoms/form-molecules/CustomBtnFilled";
import { Link } from "react-router-dom";
import { sendForgetPassLink } from "./helper";
import { useFullPageLoading } from "../../atoms/full-page-loading/loadingContext";
import { isValidType } from "../../utils/isValidType";
import { useSnackbar } from "notistack";
import DoneIcon from '@mui/icons-material/Done';

const ForgetPassForm = () => {
    const [formValues, setFormValues] = useState({
        email: ""
    });
    const { setTrue: SetForgetPassTrue, value: ForgetPassSubmit } = useBoolean();
    const { setLoading: setSubmitted } = useFullPageLoading();
    const { enqueueSnackbar } = useSnackbar();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const email = formValues.email.replaceAll(/\s/g, '');
        // Email VALIDATION --------------------------------------

        if (!isValidType(email, "email")) {
            enqueueSnackbar("Enter valid email ID", {
                variant: "warning"
            })
            return;
        }

        //--------------------------------------------------


        await sendForgetPassLink(email, SetForgetPassTrue, setSubmitted, enqueueSnackbar)
    }

    return (
        <>
            {ForgetPassSubmit &&
                <>
                    <DoneIcon sx={DoneIconStyle} />
                    <Typography sx={{ color: "var(--primary-color)", fontWeight: "bold" }}>Reset Link Sent</Typography>
                </>
            }


            <Typography fontSize="14px">
                {ForgetPassSubmit ?
                    "Reset link shared with you on your registed email" :
                    "Enter your registered email address. We will email you a link to reset your password"
                }
            </Typography>


            {!ForgetPassSubmit &&
                <>
                    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "flex-start", gap: "1rem", width: "100%" }}>
                        <Link to="/login"><ArrowBackIcon sx={{ pt: "5px", marginLeft: "-5px" }} /></Link>
                        <Typography sx={formHeadingStyles}>
                            Forgot Password
                        </Typography>
                    </Box>
                    <Box component="form" onSubmit={handleSubmit} sx={formBoxStyles}>
                        <EmailLoginTextField
                            value={formValues.email}
                            onChange={(e) => setFormValues((prev) => ({ email: e.target.value }))}
                        />
                        <CustomBtnFilled
                            label="RESET"
                            variant=""
                            styles={{ ...loginBtnStyles, textTransform: "initial", boxShadow: "0 0 10px rgba(0,0,0,0.2)", fontWeight: "600" }}
                            buttonType="submit"
                        />
                    </Box>
                </>

            }

        </>
    )
}

export default ForgetPassForm