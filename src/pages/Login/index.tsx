import * as React from "react";
import logo from "../../assets/images/infollion_logo_200x100.png";
// import classes from "./login.module.scss";
// import linkedIn from "../../assets/images/signInLinkedIn.png";
import sidePanel from "../../assets/images/sidePanel_new.svg";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import {
  leftSidePanelStyles,
  mainGridStyles,
  rightSidePanelStyles,
} from "./styles";
import FullPageLoading from "../../atoms/full-page-loading";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { OtpFormState, OtpState } from "../../organisms/login/type";
import { LoginContext } from "./context";
import { RedirectAfterLogin } from "../../organisms/login/helper";
import { useGetParams } from "../../utils/hooks/useGetParams";
import { useSnackbar } from "notistack";

export default function Login() {
  const [otp, setOtp] = React.useState<OtpState>({
    sent: false,
    startTimer: false,
    counter: 60
  });
  // Form Values for OTP Form 
  /* Reason to Put Here =>
  When the user requests an OTP, we store their email to remind them of the email address when 
  switching between OTP login and password login. This helps maintain a seamless experience and 
  reminds the user of the email to which the OTP was sent.
  */
  const [formValues, setFormValues] = React.useState<OtpFormState>({
    email: "",
    otp: ""
  });
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem("authToken");
  const append_token = location.search.includes("append_token=1");
  const error_code = useGetParams("error"); // This is used in case of OAuth - Google 
  const { enqueueSnackbar } = useSnackbar();

  React.useEffect(() => {
    if (token && location.pathname.includes("/login")) {
      console.log("navigated to projects page");
      RedirectAfterLogin(location, token, navigate)
    } else if (error_code === "401") {
      enqueueSnackbar("Error occurred.", {
        variant: "error",
      });
    } else if (error_code === "404") {
      enqueueSnackbar("Account not found", {
        variant: "error",
      })
    }
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (token && !append_token) {
    return <></>
  }


  return (
    <>
      {
        <Grid container component="main" sx={{ height: "100vh" }}>
          <FullPageLoading />
          <Grid
            item
            xs={false}
            sm={4}
            md={6}
            className="svg-container"
            sx={mainGridStyles}
          >
            <div style={leftSidePanelStyles}>
              <img src={sidePanel} width={"100%"} height={"100%"} alt="panel" />
            </div>
          </Grid>
          <Grid item xs={12} sm={12} md={6} component={Paper} elevation={6} square>
            <Box sx={rightSidePanelStyles}>
              <img
                src={logo}
                alt="logo"
                width={"100px"}
              />

              {/* <button onClick={() => {throw new Error("This is a test error!")}}>Throw Error</button> */}

              {/* LOGIN FORM */}
              <LoginContext.Provider value={{ otp, setOtp, setFormValues, formValues }}>
                <Outlet />
              </LoginContext.Provider>

              {/* <div className={classes.imageContainer}>
                <img
                  src={linkedIn}
                  className={classes.imgLoginLinkedIn}
                  alt="logo"
                />
              </div> */}

            </Box>
          </Grid>
        </Grid>
      }
    </>

  );
}
