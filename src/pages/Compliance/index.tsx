import * as React from "react";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import logo from "../../assets/images/tutorial-done.png";
import LinearProgress from "@mui/material/LinearProgress";
import { correctWrongBtn, flexBasis25, flexBasis30, imgStyleComp, matCard, matCardActions, matCardActions2, matCardContent, submitBtn } from "./styles";
import { Card, CardContent, CardActions, Checkbox, CircularProgress, Backdrop, styled, FormGroup, FormControlLabel } from "@mui/material";
import { completeCompliance, correctAnswersCompliance, loginUserCompliance, questionsCompliance, questionsExplanationsCompliance, RedirectAfterLogin } from "./helper";
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import BoxCenter from "../../atoms/boxCenter";

const MyBackdrop = styled(Backdrop)({
  color: '#ff9800',
  zIndex: 100000
})

export default function Compliance() {
  const [loadingApi, setLoadingApi] = React.useState(false)
  const [loading, setLoading] = React.useState(true)
  const [loginVerified, setLoginVerified] = React.useState(true)
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [step, setStep] = React.useState<number>(0)
  const [submit, setSubmit] = React.useState({
    terms: false,
    consulting_services: false
  });
  const [tutorialStarted, setTutorialStarted] = React.useState(false);
  const [showTerms, setShowTerms] = React.useState(false);
  const [questionsValue, setQuestionsValue] = React.useState<any>({
    0: null,
    1: null, 2: null, 3: null, 4: null, 5: null, 6: null, 7: null, 8: null, 9: null, 10: null
  });
  const [complianceCode, setComplianceCode] = React.useState('');
  const [token, setToken] = React.useState('');



  const submitCompliance = async () => {
    setLoadingApi(true)
    const response: boolean = await completeCompliance(complianceCode, token, enqueueSnackbar);
    setLoadingApi(false)
    if (response == true) {
      setStep(12)
      setTimeout(() => {
        RedirectAfterLogin(navigate);
      }, 2000);
      //  const details=await loginUserCompliance(token,enqueueSnackbar,navigate)
      //  console.log(details);
    }
  }

  React.useEffect(() => {
    const queryParameters = new URLSearchParams(window.location.search)
    const tokenPara = queryParameters.get("complianceToken")
    const id = queryParameters.get("id")
    setToken(tokenPara || '')
    setComplianceCode(id || '')
    console.log('Getiing params ', id, tokenPara)
    if (id && tokenPara) {
      checkLogin(tokenPara);
    } else {
      enqueueSnackbar('Token or Id not found', {
        variant: "warning",
      });
    }
  }, []);

  const checkLogin = async (tokenPara: string | null) => {
    const details = await loginUserCompliance(tokenPara || '', enqueueSnackbar, navigate)
    setLoginVerified(details)
    setLoading(false);
  }

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

  const setQuestValue = (step: number, value: boolean) => {
    let quests = { ...questionsValue }
    quests[step] = value
    setQuestionsValue({ ...quests });
  }

  const forward: any = () => {
    let checkStep = step;
    setStep(checkStep + 1)
    if ((checkStep + 1) === 11) {
      setShowTerms(true);
    }
  }

  const back: any = () => {
    if (step === 0) {
      setTutorialStarted(false);
    } else {
      setStep(step - 1)
    }
  }

  const navigateLogin = () => {
    window.open("./agreement", '_blank');
  }

  const closeWindow = () => {
    navigate('/login')
  }

  const handleSubmit = (submit: "terms" | "consulting_services") => {
    setSubmit((prev) => ({
      ...prev,
      [submit]: !prev[submit]
    }))
  }


  return (
    <>


      {!loading ?
        <Grid container component="main" sx={{ minHeight: "100vh" }}>
          <ThemeProvider theme={defaultTheme}>
            <Grid item xs={12} sm={12} md={12} component={Paper} elevation={6} square>
              <BoxCenter sx={{ padding: '20px', flexDirection: "column", alignItems: "stretch"}}>
                <div>
                  {tutorialStarted && step < 11 ? <LinearProgress sx={{ 'height': '20px', width: "100%" }} variant="determinate" value={(step + 1) * 9.0909} /> : ""}
                </div>

                {!tutorialStarted && !loginVerified ? <Card sx={{ ...matCard, textAlign: 'center' }}>
                  <CardContent sx={matCardContent}>
                    This link is no longer valid.
                  </CardContent>
                  <CardActions sx={matCardActions2}>
                    <Button variant="contained" sx={flexBasis30} onClick={closeWindow}>Click here to login</Button>
                  </CardActions>
                </Card> : ''}

                {!tutorialStarted && loginVerified ? <Card sx={{ ...matCard, textAlign: 'center' }}>
                  <CardContent sx={matCardContent}>
                    The Infollion Expert Panel is a forum where knowledge gained over the years is shared with knowledge seekers.
                    While
                    we strongly suggest you to read the terms and conditions thoroughly, this tutorial is meant for your convenience
                    and
                    give you a simplified understanding of the key concepts. This tutorial contains some examples of the dos and donts
                    you need to adhere to as a member of the Infollion Expert Panel
                  </CardContent>
                  <CardActions sx={matCardActions2}>
                    <Button variant="contained" sx={flexBasis30} onClick={() => { setTutorialStarted(true) }}>Start Tutorial</Button>
                  </CardActions>
                </Card> : ''}

                {tutorialStarted == true && showTerms == false ? <Card sx={{ ...matCard, textAlign: 'center' }}>
                  <CardContent sx={matCardContent}>
                    {step + 1}. {questionsCompliance[step]}
                  </CardContent>
                  {questionsValue[step] == null ?
                    <CardActions sx={matCardActions}>
                      <Button sx={flexBasis25} variant="contained" onClick={() => { setQuestValue(step, false) }}> No</Button>
                      <Button sx={flexBasis25} variant="contained" onClick={() => { setQuestValue(step, true) }}> Yes</Button>
                    </CardActions> : ''}

                  {questionsValue[step] !== null ? <span>
                    {questionsValue[step] === correctAnswersCompliance[step] ? <Button variant="text" color="success" sx={correctWrongBtn} startIcon={<CheckIcon sx={{ fontSize: "1em!important" }} />}>Correct</Button> : ''}
                    {questionsValue[step] !== correctAnswersCompliance[step] ? <Button variant="text" color="error" sx={correctWrongBtn} startIcon={<CloseIcon sx={{ fontSize: "1em!important" }} />}>Wrong</Button> : ''}

                    <p style={{ fontWeight: '500', fontSize: "0.75rem" }}>
                      {questionsExplanationsCompliance[step]}
                    </p>
                    <CardActions sx={matCardActions}>
                      <Button sx={flexBasis25} variant="contained" onClick={() => { back() }}> Back</Button>
                      <Button sx={flexBasis25} variant="contained" onClick={() => { forward() }}> Next</Button>
                    </CardActions>
                  </span> : ''}


                </Card> : ''}

                {step == 11 ? <Card sx={{ ...matCard, textAlign: 'center' }}>
                  <CardContent sx={matCardContent}>
                    Please select the checkbox and click the submit button to complete the process.
                  </CardContent>
                  <BoxCenter>
                    <FormGroup
                      sx={{ marginLeft: "1rem" }}
                    >
                      <FormControlLabel
                        required
                        control={<Checkbox value={submit.terms} onChange={() => handleSubmit("terms")} />}
                        label={
                          <p>I agree to the <a style={{ color: 'blue' }}
                            onClick={navigateLogin}
                          >Terms and Conditions</a>
                          </p>
                        } />
                      <FormControlLabel
                        sx={{
                          display: "flex",
                          alignItems: "flex-start",
                          justifyContent: "flex-start"
                        }}
                        control={<Checkbox value={submit.consulting_services} onChange={() => handleSubmit("consulting_services")} />}
                        label={
                          <p style={{ marginTop: "10px", textAlign: "start" }}>I declare that I am not subject to any regulatory prohibitions or restrictions preventing me from providing consulting services, nor am I in violation of securities laws, insider trading, or involved in money laundering, bribery, or corruption activites. *</p>
                        } />
                      <CardActions sx={matCardActions}>
                        <Button sx={submitBtn} variant="contained" disabled={!submit.terms || !submit.consulting_services || loadingApi}  onClick={submitCompliance}>Submit</Button>
                      </CardActions>
                    </FormGroup>
                  </BoxCenter>

                </Card> : ''}

                {step == 12 ? <Card sx={{ ...matCard, textAlign: 'center' }}>
                  <CardContent sx={matCardContent}>
                    Thanks for completing the tutorial and signing the agreement.
                  </CardContent>
                  <img
                    style={imgStyleComp}
                    src={logo}
                    alt="logo"
                  />
                </Card> : ''}
              </BoxCenter>
            </Grid>

          </ThemeProvider>
        </Grid> :
        <MyBackdrop open={true}>
          <CircularProgress color="inherit" />
        </MyBackdrop>
      }
    </>

  );
}
