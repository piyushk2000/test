import Typography from "@mui/material/Typography"
import { DoneIconStyle, formBoxStyles, formHeadingStyles, formTextStyles, loginBtnStyles } from "./style"
import Box from "@mui/material/Box"
import Tooltip from "@mui/material/Tooltip"
import { PasswordLoginTextField } from "../../atoms/login/textfield"
import { useState } from "react"
import CustomBtnFilled from "../../atoms/form-molecules/CustomBtnFilled"
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import { useSnackbar } from "notistack"
import { useGetParams } from "../../utils/hooks/useGetParams"
import { RequestServer } from "../../utils/services"
import { APIRoutes, AppRoutes } from "../../constants"
import { ResetResponseType } from "./type"
import { useFullPageLoading } from "../../atoms/full-page-loading/loadingContext"
import DoneIcon from '@mui/icons-material/Done';
import { useNavigate } from "react-router-dom"
import { useBoolean } from "../../utils/hooks/useBoolean"
import { isPasswordCorrect } from "../../utils/isValidType"
const ResetPassword = () => {
    const [password, setPassword] = useState({
        new: "",
        confirm: ""
    })
    const [submit, setSubmit] = useState({
        state: false,
        isCorrect: false,
        message: ""
    });
    const { value: showPass, toggle: togglePass } = useBoolean();
    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate();
    const { setLoading } = useFullPageLoading();
    const request_id = useGetParams("request_id");
    const decodedString = request_id && atob(request_id);
    const isNewConfirmSame = password.new === password.confirm

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // VALIDATIONS ---------------------------------------- //

        if (password.new !== password.confirm) {
            enqueueSnackbar("New and confirm passwords must match", {
                variant: "warning"
            })
            return;
        }

        if (!decodedString) {
            return;
        }

        // Checking if the password is right or not
        const pass_incorrect = isPasswordCorrect(password.new);
        if (pass_incorrect) {
            enqueueSnackbar(pass_incorrect, {
                variant: "warning"
            })
            return;
        }

        // --------------------------------------------------- //

        const [user_email, otp] = decodedString.split("---");

        const payload = {
            user_email,
            new_password: password.new,
            otp
        }

        setLoading(true);
        try {
            const response: ResetResponseType = await RequestServer(APIRoutes.resetPassword, "PATCH", payload);

            if (response.message === 'Your password has been reset successfully. You can now log in with your new password.') {
                setSubmit((prev) => ({
                    state: true,
                    isCorrect: true,
                    message: response.message
                }))
            } else {
                enqueueSnackbar(response.message, {
                    variant: "warning"
                })
            }
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    }

    return (
        <>



            {submit.state ?
                <>
                    {submit.isCorrect ?
                        <DoneIcon sx={DoneIconStyle} /> :
                        <ClearIcon sx={{ ...DoneIconStyle, backgroundColor: "red", borderColor: "#fbceb1" }} />
                    }
                    <Typography sx={{ color: submit.isCorrect ? "var(--primary-color)" : "red", fontWeight: "bold" }}>
                        {
                            submit.isCorrect ?
                                "Password Reset Successful" :
                                "Oops! Error occurred"
                        }
                    </Typography>
                    <Typography fontSize="14px" textAlign={"center"}>{submit.message}</Typography>
                    {submit.isCorrect &&
                        <CustomBtnFilled
                            label="Login again"
                            variant="contained"
                            styles={{ ...loginBtnStyles, textTransform: "initial", boxShadow: "0 0 10px rgba(0,0,0,0.2)", fontWeight: "600" }}
                            onClick={() => navigate(AppRoutes.LOGIN)}
                        />}

                </> :
                <>
                    <Typography sx={formHeadingStyles}>
                        Reset Password
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} sx={formBoxStyles}>

                        <PasswordLoginTextField
                            value={password.new}
                            onChange={(e) => setPassword((prev) => ({ ...prev, new: e.target.value }))}
                            placeholder="New Password"
                            showPass={showPass}
                            togglePass={togglePass}
                        />
                        <PasswordLoginTextField
                            value={password.confirm}
                            onChange={(e) => setPassword((prev) => ({ ...prev, confirm: e.target.value }))}
                            placeholder="Confirm Password"
                            showPass={showPass}
                            togglePass={togglePass}
                            leftShowPassIcon={
                                password.confirm ?
                                    isNewConfirmSame ?
                                        <Tooltip title="Password Match" arrow>
                                            <CheckIcon sx={{ mr: "0.5rem", color: "var(--primary-color)", border: "1px solid var(--primary-color)", borderRadius: "100%", padding: "2px" }} />
                                        </Tooltip>
                                        :

                                        <Tooltip title="Password does not match" arrow>
                                            <ClearIcon sx={{ mr: "0.5rem", color: "red", border: "1px solid red", borderRadius: "100%", padding: "2px" }} />
                                        </Tooltip>
                                    : <></>
                            }
                        />
                        <Typography sx={formTextStyles}>
                            Make sure it's at least at least 8 characters including a number, a special character, an uppercase letter and a lowercase letter.
                        </Typography>

                        <CustomBtnFilled
                            label="Continue"
                            variant="contained"
                            styles={{ ...loginBtnStyles, textTransform: "initial", boxShadow: "0 0 10px rgba(0,0,0,0.2)", fontWeight: "600" }}
                            buttonType="submit"
                        />
                    </Box>
                </>

            }

        </>
    )
}

export default ResetPassword