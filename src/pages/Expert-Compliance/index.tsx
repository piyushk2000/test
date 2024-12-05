import * as React from "react";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import logo from "../../assets/images/tutorial-done.png";
import { imgStyleComp, matCard, matCardContent } from "./styles";
import { Card, CardContent, CircularProgress, Backdrop, styled, Button } from "@mui/material";
import { getQuestionsApi, submitComplianceAnswers } from "./helper";
import { useSnackbar } from "notistack";
import ExpertComplianceForm from "../../organisms/compliances/autoAprovalDialog/expertComplianceDialog";
import { Answers, NumberQuestion } from "../../organisms/compliances/autoAprovalDialog/types";
import { useIsMobile } from "../../utils/hooks/useIsMobile";
import { isAdmin, isSuperAdmin } from "../../utils/role";
import info_logo from "../../assets/images/logo.png";
import ExpertDocumentForProof from "./upload-document";
import { BoxFlex } from "../../atoms/boxSpaceBtw";
import { useFetch } from "../../utils/hooks/useFetch";
import { APIRoutes } from "../../constants";
import RichTextDisplayer from "../../atoms/rich-text-editor/RichTextDisplayer";
import { useGetParams } from "../../utils/hooks/useGetParams";

const MyBackdrop = styled(Backdrop)({
  color: '#ff9800',
  zIndex: 100000
})

export default function ExpertCompliance() {
  const isMobile = useIsMobile();
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = React.useState(true);
  const [url, setUrl] = React.useState<string | null>(null); // This is only used when the User is Admin or Superadmin and he needs to upload the document
  const [submit, setSubmit] = React.useState(false);
  const [complianceStarted, setComplianceStarted] = React.useState({
    state: false,
    compliance_description: ""
  });
  const [error, setError] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState('');
  const expertCode = useGetParams("unique_code");
  const isEdit = useGetParams("is_edit"); // only when Admin / SuperAdmin trying to resubmit answers;
  const [questions, setQuestions] = React.useState<NumberQuestion[]>([]);
  const submitCompliance = async (answer: Answers) => {
    const response: boolean = await submitComplianceAnswers(expertCode, answer, enqueueSnackbar, url,isEdit);
    if (response == true) {
      setSubmit(true);
    }
  }


  React.useEffect(() => {
    if (expertCode) {
      getQuestions(expertCode, isEdit);
    } else {
      enqueueSnackbar('Unique code not found', {
        variant: "warning",
      });
    }
  }, []);

  const getQuestions = async (code: string, isEdit: string | null) => {
    const details = await getQuestionsApi(code, enqueueSnackbar, isEdit);
    setLoading(false);
    if (details.success) {
      setQuestions([...details.questions]);
      setComplianceStarted((prev) => ({ ...prev, compliance_description: details.compliance_description }))
    } else {
      setError(true);
      setErrorMsg(details.message);
    }
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

  return (
    <div style={{ backgroundColor: "#f4f4f4" }}>

      {!loading ?
        <>
          <BoxFlex sx={{ backgroundColor: "white", padding: "20px", boxShadow: "0 4px 6px -6px #222" }}>
            <img
              src={info_logo}
              width={"100px"}
            />
          </BoxFlex>
          <Grid container component="main" sx={{ height: "130vh" }}>
            <ThemeProvider theme={defaultTheme}>
              {questions &&
                questions.length > 0 &&
                <Grid item xs={12} sm={12} md={12} sx={{ padding: isMobile ? "0" : '20px' }}>
                  {submit == false &&
                    <>
                      <Box sx={{ ...(isMobile ? {} : matCard), padding: '20px' }} component={Paper} elevation={6}>
                        <BoxFlex sx={{ flex: 1, justifyContent: "center", "& h1": { fontSize: isMobile ? "1.5rem" : "2rem", fontWeight: "500" } }}>
                          <h1>Infollion Client Compliance</h1>
                        </BoxFlex>
                        {complianceStarted.state === false ?
                          <BoxFlex sx={{ justifyContent: "center", flexDirection: "column", marginTop: "30px", gap: "30px" }}>
                            <Button variant="contained" sx={{ color: "white" }} onClick={() => setComplianceStarted((prev) => ({ ...prev, state: true }))}>Start</Button>
                            <RichTextDisplayer
                              text={complianceStarted.compliance_description}
                            />
                          </BoxFlex> :
                          <>
                            {(isAdmin() || isSuperAdmin()) &&
                              <ExpertDocumentForProof
                                setUrl={setUrl}
                              />
                            }
                            <ExpertComplianceForm questions={questions} handleSubmit={submitCompliance} />
                          </>
                        }
                      </Box>
                    </>
                  }

                  {submit == true &&
                    <Box sx={{ ...(isMobile ? {} : matCard), padding: '20px' }} component={Paper} elevation={6} square>
                      <Card sx={{ ...(isMobile ? {} : matCard), textAlign: 'center' }}>
                        <CardContent sx={matCardContent}>
                          Thanks for submitting the compliance questions.
                        </CardContent>
                        <img
                          style={imgStyleComp}
                          src={logo}
                          alt="logo"
                        />
                      </Card>
                    </Box>}
                </Grid>}
              {error &&
                <Grid item xs={12} sm={12} md={12} sx={{ padding: '20px' }}>
                  <Box sx={{ ...(isMobile ? {} : matCard), padding: '20px' }} component={Paper} elevation={6} square> <Card sx={{ ...(isMobile ? {} : matCard), textAlign: 'center' }}>
                    <CardContent sx={matCardContent}>
                      {errorMsg}
                    </CardContent>
                  </Card>
                  </Box>
                </Grid>}
            </ThemeProvider>
          </Grid>
        </>
        :
        <MyBackdrop open={true}>
          <CircularProgress color="inherit" />
        </MyBackdrop>
      }
    </div>
  );
}
