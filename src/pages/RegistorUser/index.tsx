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
import RegisterForm from "../../organisms/register/registerForm";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { FormProvider, useForm, SubmitHandler } from "react-hook-form";
import { getOtp, RegisterFormDefault, RegisterFormTypes, sendOtp } from "./helper";
import { useSnackbar } from "notistack";
import { removeWhiteSpacesFromForm } from "../../utils/utils";

export default function RegisterUser() {
  const { enqueueSnackbar } = useSnackbar();
  const [gotOtp, setGotOtp] = React.useState(false)
  const [loadingApi, setLoadingApi] = React.useState(false)
  const [resendOtp, setResendOtp] = React.useState(false)
  const [submitOtp, setSubmitOtp] = React.useState(false)
  const [complianceLink, setComplianceLink] = React.useState("")
  const [formData1, setFormData] = React.useState(RegisterFormDefault)
  const [recurringUser, setRecurringUser] = React.useState(false)

  React.useEffect(() => {
  }, []);

  const methods = useForm({ defaultValues: RegisterFormDefault });

  const defaultTheme = createTheme({
    typography: {
      fontFamily: ["Montserrat"].join(","),
      fontSize: 12,
    },
    palette: {
      primary: {
        main: "#EC9324",
      },
    },
  });


  const onSubmit: SubmitHandler<RegisterFormTypes> = async (formData) => {
    const newFormData = removeWhiteSpacesFromForm(formData, [])
    const payload: any = { ...newFormData };
    console.log('register settings ', payload);
    if (gotOtp) {
      setLoadingApi(true)
      const response: any = await sendOtp(formData.otp, formData.email, enqueueSnackbar);
      console.log('register settings 2', response);
      setComplianceLink(response.link)
      setSubmitOtp(response.success);
      setLoadingApi(false)
    } else {
      setRecurringUser(() => false)
      setFormData({ ...formData })
      setLoadingApi(true)
      const response: boolean = await getOtp(formData.name_salutations, formData.firstname, formData.lastname, formData.isd_code, formData.mobile_number, formData.email, enqueueSnackbar, setRecurringUser);
      setGotOtp(response);
      setLoadingApi(false)
    }
  };

  const handleClose = () => {
    console.log('register settings close');
  }

  const handleResend =async () => {
    const response: boolean = await getOtp(formData1.name_salutations, formData1.firstname , formData1.lastname, formData1.isd_code, formData1.mobile_number, formData1.email, enqueueSnackbar);
    setResendOtp(response);
    console.log('register settings close');
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
                style={{
                  marginBottom: "18px",
                }}
                src={logo}
                alt="logo"
                width={"100px"}
              />


              <FormProvider {...methods}>
                <ThemeProvider theme={defaultTheme}>
                  <form onSubmit={methods.handleSubmit(onSubmit)} noValidate>
                    <RegisterForm loadingApi={loadingApi} otpSent={gotOtp} complianceLink={complianceLink} submitOtp={submitOtp} resendOtp={resendOtp} resendHandle={handleResend} handleClose={handleClose} recurringUser={recurringUser} userEmail={formData1.email} />
                  </form>
                </ThemeProvider>
              </FormProvider>


            </Box>
          </Grid>
        </Grid>
      }
    </>

  );
}
