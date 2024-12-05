import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { formBoxStyles, formHeadingStyles, loginBtnStyles, loginSecondBtnStyles } from "./style"
import { EmailLoginTextField, PasswordLoginTextField } from "../../atoms/login/textfield";
import { useState } from "react";
import { LoginFormState } from "./type";
import CustomBtnFilled from "../../atoms/form-molecules/CustomBtnFilled";
import { useFullPageLoading } from "../../atoms/full-page-loading/loadingContext";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { loginUser } from "./helper";
import { useSnackbar } from "notistack";
import { isValidType } from "../../utils/isValidType";
import TogglePassOtp from "../../atoms/login/togglePassOtp";
import { useBoolean } from "../../utils/hooks/useBoolean";
import google from "../../assets/images/icon-google.svg";
import { HOSTURL_LOCAL } from "../../utils/services";

const LoginForm = () => {
    const [formValue, setFormValues] = useState<LoginFormState>({
        email: "",
        password: ""
    });
    const { value: showPass, toggle: togglePass } = useBoolean();
    const { setLoading: setSubmitted, isLoading: isSubmitted } = useFullPageLoading();
    const location = useLocation();
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();
    
    const isMobileWebview = () => {
        const userAgent = navigator.userAgent.toLowerCase();
        return /(iphone|ipod|ipad).*applewebkit(?!.*safari)/i.test(userAgent) || userAgent?.includes?.('android') && userAgent?.includes?.('wv');
    };




    const searchParams = window.location.href.split(window.location.pathname)[1]

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormValues((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }))
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const email = formValue.email.replaceAll(/\s/g, '');

        // Email VALIDATION --------------------------------------

        if (!isValidType(email, "email")) {
            enqueueSnackbar("Enter valid email ID", {
                variant: "warning"
            })
            return;
        }

        //--------------------------------------------------

        const payload = {
            username: email,
            password: formValue.password
        }

        await loginUser(payload, location, navigate, setSubmitted, enqueueSnackbar);
    }

    const signInWithGoogle = () => {
        setSubmitted(true);
        const url = `${HOSTURL_LOCAL}/users/auth-google`;
        window.location.href = url;
    }

    return (
        <>
            <Typography sx={formHeadingStyles}>
                Login to Dashboard
            </Typography>
            <Box component="form" onSubmit={handleSubmit} sx={formBoxStyles}>
                <EmailLoginTextField
                    value={formValue.email}
                    onChange={handleChange}
                    customCSS={{ marginTop: "12px", marginBottom: "5px"}}
                />
                <PasswordLoginTextField
                    value={formValue.password}
                    onChange={handleChange}
                    handleForgetPassword={() => {
                        navigate("/login/forgot")
                    }}
                    isForgotNeeded
                    showPass={showPass}
                    togglePass={togglePass}
                    customCSS={{marginTop: "15px", marginBottom: "5px",}}
                />
                <CustomBtnFilled
                    label="Sign in"
                    variant=""
                    styles={{ ...loginBtnStyles, textTransform: "initial", boxShadow: "0 0 10px rgba(0,0,0,0.2)", }}
                    buttonType="submit"
                />
                {!isMobileWebview() && <CustomBtnFilled
                    label={"Sign in with Google"}
                    variant='contained'
                    startIcon={<img src={google} alt="logo" width={"28px"} height={"100%"} />}
                    onClick={signInWithGoogle}
                    styles={{ ...loginSecondBtnStyles, textTransform: "initial" }}
                    disabled={isSubmitted}
                />}
            </Box>
            <TogglePassOtp
                label="Login with OTP"
                onClick={() => navigate("/login/otp" + (searchParams ? (searchParams) : ""))}
            />

            <Typography sx={{ ...formHeadingStyles, width: '100%', marginTop:"-25px" }}>
                <Box sx={{ marginTop: "3em", textAlign: 'center', width: '100%' }}>
                    Don't have an account?
                    {" "}
                    <Link style={{ color: 'blue' }} to="/register-user">
                        Register as an expert
                    </Link>
                </Box>
            </Typography>
        </>
    )
}

export default LoginForm
