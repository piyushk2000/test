import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { useFullPageLoading } from "../../../atoms/full-page-loading/loadingContext";
import SaveAgendaResponseForm from "../../project/project-agenda/project-agenda-description/save-agenda-response/form";
import {
  getAgendaQues,
  saveAgendaResponse,
} from "../../project/project-agenda/helper";
import { BoxFlex } from "../../../atoms/boxSpaceBtw";

type Props = {
  invitationId: string;
  agendaId: string;
  peId: string;
  goToNextStep: () => void;
};

export default function AgendaSection({
  agendaId,
  invitationId,
  peId,
  goToNextStep,
}: Props) {
  const [response, setResponse] = useState<saveAgendaResponse>([]);
  const { setLoading } = useFullPageLoading();

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      await getAgendaQues(+agendaId, setResponse);
      setLoading(false);
    };
    getData();
  }, [agendaId]);

  return (
    <Box>
      {response ? (
        <BoxFlex sx={{ flexDirection: "column" }}>
          <p style={{ margin: "1em 0", fontWeight: "500", alignSelf: "flex-start" }}>Please share your comfort level on these agenda items</p>
          <SaveAgendaResponseForm
            setResponses={setResponse}
            responses={response}
            handleClose={() => { }}
            pe_id={+peId}
            setBackdrop={setLoading}
            handleSubmitClose={goToNextStep}
            isAcceptInvitation
            invitationId={invitationId}
          />
        </BoxFlex>
      ) : null}
    </Box>
  );
}
