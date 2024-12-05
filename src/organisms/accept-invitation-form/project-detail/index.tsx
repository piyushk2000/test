import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { acceptInvitation, getProjectData } from "../helper";
import { ProjectData } from "../type";
import { useFullPageLoading } from "../../../atoms/full-page-loading/loadingContext";
import { useSnackbar } from "notistack";
import { Typography } from "@mui/material";
import ActionButtons from "../action-buttons";
import { genericPostPatch } from "../../../utils/services";
import RichTextDisplayer from "../../../atoms/rich-text-editor/RichTextDisplayer";
import { hasRealText } from "../../../utils/hasRealText";

type Props = {
  projectId: string;
  invitationId: string;
  goToNextStep: () => void;
};

export default function ProjectSection({
  projectId,
  invitationId,
  goToNextStep,
}: Props) {
  const [projectData, setProjectData] = useState<ProjectData | null>(null);
  const { setLoading } = useFullPageLoading();
  const { enqueueSnackbar } = useSnackbar();
  useEffect(() => {
    async function getData() {
      setLoading(true);
      const data = await getProjectData(projectId);
      setProjectData(data);
      setLoading(false);
    }

    getData();
  }, []);
  console.log(projectData);

  return (
    <Box sx={{ mt: 3 }}>
      {projectData ? (
        <Box>
          <Typography
            sx={{
              fontSize: { xs: "16px", sm: "18px", md: "20px" },
              fontWeight: "600",
              color: "#252B3B",
            }}
          >
            {projectData.topic}
          </Typography>
          {!projectData.description || !hasRealText(projectData.description) ? (
            <></>
          ) : (
            <RichTextDisplayer text={projectData.description} />
          )}
          <Typography sx={{ fontSize: { xs: "12px", sm: "14px", md: "16px" }, mt: 1 }}>
            Please confirm your interest in participating by accepting this invite. We'll be happy to share further details upon receiving confirmation from your end. Please note that this is a preliminary step and not a confirmation of the engagement. Upon accepting, you can review the project details & timelines, and then choose to participate/opt-out.
            <br></br>
            <br></br>
            Please refrain from discussing any confidential information during the call. To gain a clear understanding of the guidelines and rules for this engagement, we encourage you to revisit the expert tutorial and the agreement. Infollion, along with its client, retains the right to record the call for reference in the context of this project. By accepting this assignment, you are implicitly granting consent for the call to be recorded.
          </Typography>


          {/* <Typography sx={{fontSize: {xs: "12px", sm: "14px", md: "16px"}, mt: 1}}>{projectData.description}</Typography> */}
          <ActionButtons
            invitationId={invitationId}
            submitLabel="Accept"
            onSubmit={() =>
              genericPostPatch(
                () => acceptInvitation(invitationId),
                enqueueSnackbar,
                setLoading,
                () => {
                  goToNextStep();
                }
              )
            }
          />
        </Box>
      ) : null}
    </Box>
  );
}
