
import { Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { HookTextField } from '../../atoms/form-fields/SLFieldTextField';
import CustomBtnFilled from '../../atoms/form-molecules/CustomBtnFilled';
import IsdAutoCompleteField from '../../atoms/isd-field';
import BasicAutocomplete from '../../molecules/autocompletes/basic-autocomplete';
import { useHookFormContext } from '../../utils/hooks/useHookFormContext';
import { validRegex } from '../../utils/isValidType';
import { name_salutations_values } from '../../utils/salutations';
import { commonInputStyles } from './helper';
import { formHeadingStyles, inputPadding, loginBtnStyles } from './style';

type Props = {
    handleClose: () => void;
    resendHandle: () => void;
    otpSent: boolean;
    submitOtp: boolean;
    resendOtp: boolean;
    loadingApi: boolean;
    complianceLink: string;
    recurringUser: boolean;
    userEmail?: string;
};

const RegisterForm = ({ loadingApi, handleClose, resendHandle, otpSent, submitOtp, resendOtp, complianceLink, recurringUser, userEmail }: Props) => {

    useEffect(() => {
        const img = new Image();
        img.src = 'https://media.giphy.com/media/JPUdQxNx6UmvvKP7JZ/giphy.gif';
    }, [])

    const navigate = useNavigate();
    const handleLinkClick = () => {
        window.open(complianceLink, "_top");
    }

    const handleResend = () => {
        setOtp((prev) => ({ ...prev, sent: true, startTimer: true }))
        resendHandle();
    }

    const [otp, setOtp] = useState({
        sent: false,
        startTimer: false,
        counter: 60
    })

    useEffect(() => {
        let timer: number;

        if (otp.startTimer) {
            if (otp.counter <= 0) {
                setOtp(((prev) => ({ ...prev, counter: 60, startTimer: false })));
            } else {
                timer = setInterval(() => {
                    setOtp((prev) => ({ ...prev, counter: prev.counter - 1 }))
                }, 1000)
            }
        }

        return () => {
            clearInterval(timer);
        }

        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [otp.startTimer, otp.counter]);


    useEffect(() => {
        if (otpSent == true) {
            setOtp((prev) => ({ ...prev, sent: true, startTimer: true }))
        }
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [otpSent]);


    const { registerState } = useHookFormContext();
    return (<>
        <Typography sx={formHeadingStyles}>
            {submitOtp ? "Your profile has been created. To activate and complete your profile, please review the terms and conditions." : "Register as an expert"}
        </Typography>
        {!submitOtp ? <Grid container mt="1px">
            <Grid item xs={3} sx={inputPadding}>
                <BasicAutocomplete
                    label="Mr/Mrs*"
                    registerName="name_salutations"
                    isRequired
                    options={name_salutations_values}
                    isDisabled={otpSent}
                />
            </Grid>
            <Grid item xs={4.5} sx={inputPadding}>
                <HookTextField
                    {...registerState("firstname")}
                    rules={{
                        required: { value: true, message: "This field is required" },
                        pattern: {
                            value: validRegex("name"),
                            message: "Please start with alphabet & remove extra spaces"
                        }
                    }}
                    textFieldProps={{
                        ...commonInputStyles,
                        label: "First Name",
                        required: true,
                        disabled: otpSent
                    }}
                />
            </Grid>
            <Grid item xs={4.5} sx={inputPadding}>
                <HookTextField
                    {...registerState("lastname")}
                    rules={{
                        required: { value: true, message: "This field is required" },
                        pattern: {
                            value: validRegex("name"),
                            message: "Please start with alphabet & remove extra spaces"
                        }
                    }}
                    textFieldProps={{
                        ...commonInputStyles,
                        label: "Last Name",
                        required: true,
                        disabled: otpSent
                    }}
                />
            </Grid>

            <Grid item xs={3.5} sx={inputPadding}>
                <IsdAutoCompleteField label={'ISD*'} registerStateName="isd_code" isDisabled={otpSent} isRequired />
            </Grid>
            <Grid item xs={8.5} sx={inputPadding}>
                <HookTextField
                    {...registerState("mobile_number")}
                    rules={{
                        required: { value: true, message: "This field is required" },
                        maxLength: {
                            value: 11,
                            message: "Mobile Number Should be upto 11 Characters",
                        },
                        pattern: {
                            value: validRegex("mobile_number"),
                            message: "Mobile number cannot start with 0 or special characters like +"
                        }
                    }}
                    textFieldProps={{
                        ...commonInputStyles,
                        label: "Mobile Number",
                        type: "number",
                        required: true,
                        disabled: otpSent
                    }}
                />
            </Grid>
            <Grid item xs={12} sm={12} sx={inputPadding}>
                <HookTextField
                    {...registerState("email")}
                    rules={{
                        required: { value: true, message: "This field is required" },
                        pattern: {
                            value: validRegex("email"),
                            message: "Enter valid email ID",
                        },
                    }}
                    textFieldProps={{
                        ...commonInputStyles,
                        label: "Email ID",
                        type: "email",
                        required: true,
                        disabled: otpSent
                    }}
                />
            </Grid>
            {otpSent ? <Grid item xs={12} sm={12} sx={inputPadding}>
                <HookTextField
                    {...registerState("otp")}
                    rules={{
                        required: { value: true, message: "This field is required" },
                        maxLength: {
                            value: 6,
                            message: "OTP Should be upto 6 Characters",
                        },
                        pattern: {
                            value: validRegex('mobile_number'),
                            message: "Please Enter Correct OTP"
                        }
                    }}
                    textFieldProps={{
                        ...commonInputStyles,
                        label: "OTP",
                        required: true,
                        focused: otpSent
                    }}
                />
            </Grid> : ''}
            {otpSent && !otp.startTimer ? <div style={{ display: "flex", flexDirection: "row-reverse", marginRight: "1rem", width: "100%" }}>
                <p
                    style={{
                        fontSize: "14px",
                        cursor: "pointer",
                        textAlign: "end"
                    }}
                    onClick={handleResend}
                >
                    Resend OTP
                </p>
            </div> : ''}

            {otpSent && otp.startTimer ? <div style={{ display: "flex", flexDirection: "row-reverse", marginRight: "1rem", width: "100%" }}>
                <p
                    style={{
                        fontSize: "14px",
                        textAlign: "end"
                    }}
                >
                    {`Resend OTP in ${otp.counter} seconds..`}
                </p>
            </div> : ''}

            <CustomBtnFilled
                label={loadingApi ? 'Loading Response' : otpSent ? "Submit OTP" : "Get OTP on email"}
                variant=""
                disabled={loadingApi}
                styles={{ ...loginBtnStyles, textTransform: "initial", boxShadow: "0 0 10px rgba(0,0,0,0.2)", }}
                buttonType="submit"
            />

            < Typography sx={{ ...formHeadingStyles, width: '100%' }}>
                {submitOtp ? '' : <Grid item xs={12} sm={12} sx={{ marginTop: "2em", textAlign: 'center', width: '100%', border: recurringUser ? "solid 1px black" : "none", boxShadow: recurringUser ? "0px 4px 8px rgba(0, 0, 0, 0.3)" : "none", borderRadius: recurringUser ? "12px" : "none", borderColor: "#EC9324", padding: "0.5em", fontSize: "0.9em" }}>{recurringUser ? <>An account already exists with this email ID : <span style={{ opacity: "0.7" }} >{userEmail}</span> <p style={{ marginTop: "0.7em" }}><Link style={{ color: 'blue' }} to="/login">Click here to Sign-In</Link> if this account belongs to you. </p> </> : <>Already have an account?<Link style={{ color: 'blue' }} to="/login"> Sign In</Link></>}</Grid>}
            </Typography>
        </Grid> : ''}
        {submitOtp ? <Grid container mt="1px">
            <CustomBtnFilled
                label="Activate Profile &rarr;"
                variant=""
                styles={{ ...loginBtnStyles, textTransform: "initial", boxShadow: "0 0 10px rgba(0,0,0,0.2)", }}
                onClick={handleLinkClick}
            />

        </Grid> : ''}

    </>
    );
};

export default RegisterForm;
