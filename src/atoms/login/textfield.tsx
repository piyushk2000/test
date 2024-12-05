import { IconButton, InputAdornment, SxProps, TextField, Theme, Tooltip } from '@mui/material'
import React from 'react';
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

type Props = {
    id: string;
    placeholder: string;
    name: string;
    autoComplete: string;
    startAdornment: React.JSX.Element;
    value: string;
    onChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> | undefined;
    sx?: SxProps<Theme>;
    inputStyle?: SxProps<Theme>;
    className?: string | undefined;
    endAdornment?: React.JSX.Element;
    type?: React.HTMLInputTypeAttribute | undefined;
    disabled?: boolean;
    customCSS?:{};
}

const LoginTextField = ({ id, placeholder, name, value, sx, onChange, autoComplete, type, startAdornment, endAdornment, inputStyle, className, disabled, customCSS }: Props) => {
    return (
        <TextField
            margin="normal"
            required
            fullWidth
            id={id}
            type={type}
            placeholder={placeholder}
            name={name}
            autoComplete={autoComplete}
            variant="filled"
            className={className}
            value={value}
            disabled={disabled}
            sx={{
                
                display: "flex",
                alignItems: "center",
                "& .MuiInputAdornment-root": {
                    marginTop: "0 !important"
                },
                ...sx,
                ...customCSS,
            }}
            onChange={onChange}
            InputProps={{
                startAdornment,
                sx: {
                    // Styling for Input Box , Border Bottom
                    borderRadius: "32px",
                    "& .MuiInputBase-input": {
                        padding: "15px",
                        paddingLeft: "5px"
                    },
                    ":before": {
                        borderBottomColor: "#ec9324",
                        left: "20px",
                        right: "20px",
                    },
                    ":after": { left: "20px", right: "20px", borderBottomColor: "#EC9424" },
                    ...inputStyle
                },
                endAdornment
            }}
        />
    )
}

type EmailProps = {
    value: string;
    onChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> | undefined;
    disabled?: boolean
    customCSS?: {};
}

export const EmailLoginTextField = ({ value, onChange, disabled, customCSS }: EmailProps) => {
    return (
        <LoginTextField
            id="email"
            placeholder="Email/Username"
            name='email'
            autoComplete='email'
            startAdornment={
                <InputAdornment
                    position="start"
                >
                    <EmailOutlinedIcon
                        sx={{ fontSize: "17px", fontWeight: 700, color: "black" }}
                    />
                </InputAdornment>
            }
            value={value}
            onChange={onChange}
            disabled={disabled}
            customCSS={customCSS}
        />
    )
}

type PassProps = EmailProps & {
    handleForgetPassword?: () => void,
    isForgotNeeded?: boolean,
    placeholder?: string,
    endAdornment?: React.JSX.Element | undefined,
    leftShowPassIcon?: React.JSX.Element | undefined, // Icon that is left of show pass icon
    showPass?: boolean,
    togglePass?: () => void;
}

export const PasswordLoginTextField = ({ value, onChange, handleForgetPassword, isForgotNeeded = false, placeholder = "Password", endAdornment, showPass, togglePass, leftShowPassIcon, customCSS }: PassProps) => {
    return (
        <>
            <LoginTextField
                id="password"
                placeholder={placeholder}
                name='password'
                type={showPass ? "text" : 'password'}
                autoComplete='current-password'
                startAdornment={
                    <InputAdornment
                        position="start"
                    >
                        <LockOutlinedIcon
                            sx={{
                                fontSize: "17px",
                                fontWeight: 700,
                                color: "black"
                            }}
                        />
                    </InputAdornment>
                }
                value={value}
                onChange={onChange}
                customCSS={customCSS}
                endAdornment={
                    endAdornment ?
                        endAdornment :
                        <InputAdornment
                            sx={{ cursor: "pointer" }}
                            position="end"
                            onClick={togglePass}
                        >
                            {leftShowPassIcon}
                            <Tooltip title={showPass ? "Hide Password" : "Show Password"} arrow>
                                <IconButton>
                                    {showPass ? <VisibilityOffIcon sx={{ fontSize: "18px" }} /> : <VisibilityIcon sx={{ fontSize: "18px" }} />}
                                </IconButton>
                            </Tooltip>
                        </InputAdornment>
                }
            />
            {isForgotNeeded &&
                <div style={{ display: "flex", flexDirection: "row-reverse", marginRight: "1rem" }}>
                    <p
                        style={{
                            fontSize: "14px",
                            cursor: "pointer",
                            width: "max-content",
                        }}
                        onClick={handleForgetPassword}
                    >
                        Forgot password?
                    </p>
                </div>
            }
        </>

    )
}

export const OtpLoginTextField = ({ value, onChange }: EmailProps) => {
    return (
        <LoginTextField
            id="otp"
            placeholder="Please enter the OTP"
            name='otp'
            type='otp'
            autoComplete='otp'
            startAdornment={
                <InputAdornment
                    position="start"
                >
                    <LockOutlinedIcon
                        sx={{
                            fontSize: "17px",
                            fontWeight: 700,
                            color: "black"
                        }}
                    />
                </InputAdornment>
            }
            value={value}
            onChange={onChange}
        />
    )
}

export default LoginTextField