import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import React from 'react'
import { formBoxStyles, formHeadingStyles, loginBtnStyles, loginSecondBtnStyles } from './style'
import { EmailLoginTextField, OtpLoginTextField } from '../../atoms/login/textfield'
import CustomBtnFilled from '../../atoms/form-molecules/CustomBtnFilled'
import TogglePassOtp from '../../atoms/login/togglePassOtp'
import { useLocation, useNavigate } from 'react-router-dom'
import { useLoginContext } from '../../pages/Login/context'
import { sendOtp } from '../../pages/Login/helper'
import { HideEmail, isValidType } from '../../utils/isValidType'
import { useSnackbar } from 'notistack'
import { loginUser } from './helper'
import { useFullPageLoading } from '../../atoms/full-page-loading/loadingContext'

const OtpForm = () => {
  const { otp, setOtp, formValues, setFormValues } = useLoginContext();
  const navigate = useNavigate();
  const location = useLocation();
  const { setLoading: setSubmitted } = useFullPageLoading();
  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    otp.sent ? loginWithOtp() : otpSendHandler()
  }
  async function loginWithOtp() {
    const payload = {
      username: formValues.email,
      otp: formValues.otp
    }
    await loginUser(payload, location, navigate, setSubmitted, enqueueSnackbar)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormValues((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const otpSendHandler = async () => {
    setFormValues((prev) => ({
      ...prev,
      email: prev.email.replaceAll(/\s/g, "")
    }))
    // VALIDATIONS --------------------------------------------

    if (!isValidType(formValues.email, "email")) {
      enqueueSnackbar("Please enter a valid Email", {
        variant: "warning"
      })
      return;
    }
    // --------------------------------------------------------
    setSubmitted(true);
    const response: boolean = await sendOtp(formValues.email, enqueueSnackbar);

    // If the response is positive , only then start a timer and mark Otp as Sent , else don't
    if (response) {
      setOtp((prev) => ({ ...prev, sent: true, startTimer: true }))
    }
    setSubmitted(false);
  }

  React.useEffect(() => {
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

  return (
    <>
      <Typography sx={formHeadingStyles}>
        Login to Dashboard
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={formBoxStyles}>
        {otp.sent ?
          <Typography sx={{
            textAlign: "center",
            fontSize: "14px",
            "& span": {
              fontWeight: "bold"
            }
          }}>Please enter the OTP sent to your email: <span>{HideEmail(formValues.email)}</span>
          </Typography>
          : <EmailLoginTextField
            value={formValues.email}
            onChange={handleChange}
            disabled={otp.sent}
          />
        }


        {otp.sent &&
          <>
            <OtpLoginTextField
              value={formValues.otp}
              onChange={handleChange}
            />
            <CustomBtnFilled
              label="Log in"
              variant=""
              styles={{ ...loginBtnStyles, textTransform: "initial", boxShadow: "0 0 10px rgba(0,0,0,0.2)", }}
              buttonType="submit"
            />
          </>
        }

        <CustomBtnFilled
          label={otp.sent
            ? otp.startTimer
              ? `Resend OTP in ${otp.counter} seconds..`
              : "Resend OTP"
            : "Send OTP"}
          variant='contained'
          disabled={otp.startTimer}
          onClick={otpSendHandler}
          styles={otp.sent ? { ...loginSecondBtnStyles, textTransform: "initial", color: otp.startTimer ? "grey" : "black" } :
            { ...loginBtnStyles, textTransform: "initial", boxShadow: "0 0 10px rgba(0,0,0,0.2)", backgroundColor: "#EC9324" }
          }
        />

      </Box>
      <TogglePassOtp
        label="Login with Password"
        onClick={() => navigate("/login")}
      />
    </>
  )
}

export default OtpForm