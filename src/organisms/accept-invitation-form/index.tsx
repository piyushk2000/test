import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import { useStep } from "usehooks-ts";
import {
  getInvitationData,
  getStepsDesktop,
  getStepsMobile,
  stepsWithAgenda,
  stepsWithoutAgenda,
  steps as stepsLabels
} from "./helper";
import ProjectSection from "./project-detail";
import AgendaSection from "./agenda-section";
import ConfirmationSection from "./confirmation-section";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import { AppRoutes } from "../../constants";
import { useIsMobile } from "../../utils/hooks/useIsMobile";

type Props = {
  id: string;
  showAcceptInvitationForm: boolean
};

export default function AcceptInvitationForm({ id, showAcceptInvitationForm }: Props) {
  const InvitationData = getInvitationData(id);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const isMobile = useIsMobile()

  const steps = isMobile ? getStepsMobile(!!InvitationData.agendaId, showAcceptInvitationForm) : getStepsDesktop(!!InvitationData.agendaId, showAcceptInvitationForm);
  const [activeStep, helpers] = useStep(steps.length);

  const { goToNextStep } = helpers;

  React.useEffect(() => {
    const userIdFromLocalhost = localStorage.getItem("id");
    if (
      InvitationData.userId &&
      userIdFromLocalhost !== InvitationData.userId
    ) {
      if (userIdFromLocalhost) {
        enqueueSnackbar("Login with correct user", {
          variant: "warning",
        });
      } else {
        enqueueSnackbar("Login to continue.", {
          variant: "warning",
        });
      }
      if (window.location.pathname === AppRoutes.ACCEPT_INVITATION) {
        const redirect_url = window.location.pathname + window.location.search;
        localStorage.clear();
        navigate("/login" + `?append_token=1&redirect_url=${redirect_url}`);
      }
    }
  }, [InvitationData.userId]);

  return (
    <Box
      sx={{
        width: "100%",
        background: "white",
        borderRadius: "16px",
        maxWidth: "720px",
        padding: "1.5rem 1rem",
        mx: "auto",
        mt: { xs: "12px", md: "72px" },
        boxShadow: "0px 10px 15px -3px rgba(0,0,0,0.1)",
      }}
    >
      <Stepper activeStep={activeStep - 1}>
        {steps.map((label) => {
          const stepProps: { completed?: boolean } = {};
          const labelProps: {
            optional?: React.ReactNode;
          } = {};
          return (
            <Step key={label} {...stepProps}>
              <StepLabel
                {...labelProps}
                sx={{
                  fill: "#fff",
                  "& .MuiStepIcon-text": {
                    fill: "#FFF",
                  },
                }}
              >
                {label}
              </StepLabel>
            </Step>
          );
        })}
      </Stepper>

      <React.Fragment>
        <Box sx={{ mb: 1, padding: "0 8px" }}>
          {steps[activeStep - 1] === stepsLabels.desktop.invitation || steps[activeStep - 1] === stepsLabels.mobile.invitation ? (
            <ProjectSection
              invitationId={id}
              projectId={InvitationData.projectId}
              goToNextStep={goToNextStep}
            />
          ) : null}
          {(steps[activeStep - 1] === stepsLabels.desktop.agenda || steps[activeStep - 1] === stepsLabels.mobile.agenda) && InvitationData.agendaId ? (
            <AgendaSection
              invitationId={id}
              agendaId={InvitationData.agendaId}
              peId={InvitationData.peId}
              goToNextStep={goToNextStep}
            />
          ) : null}
          {(steps[activeStep - 1] === stepsLabels.desktop.confirmation || steps[activeStep - 1] === stepsLabels.mobile.confirmation) ? (
            <ConfirmationSection
              invitationId={id}
              projectId={InvitationData.projectId}
              expertId={InvitationData.expertId}
            />
          ) : null}
        </Box>
      </React.Fragment>
    </Box>
  );
}
