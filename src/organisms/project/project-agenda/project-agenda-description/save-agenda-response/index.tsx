import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import SaveAgendaResponseForm from "./form";
import {
  getAgendaQues,
  saveAgendaResponse,
  submitAgendaResponse,
} from "../../helper";
import { Box, CircularProgress } from "@mui/material";
import { ModalStates } from "../../../../project-detail/project-detail-card/helper";

type Props = {
  fk_agenda: ModalStates["isAgendaDescription"]["fk_agenda"];
  handleClose: () => void;
  agenda_responses: ModalStates["isAgendaDescription"]["agenda_responses"];
  setBackdrop: Dispatch<SetStateAction<boolean>>;
  pe_id: number | null;
  handleSubmitClose: () => void;
};

const SaveAgendaResponse = ({
  fk_agenda,
  handleClose,
  agenda_responses,
  pe_id,
  setBackdrop,
  handleSubmitClose,
}: Props) => {
  const [response, setResponse] = useState<saveAgendaResponse>(
    agenda_responses || []
  );

  useEffect(() => {
    if (!agenda_responses) {
      fk_agenda && getAgendaQues(fk_agenda, setResponse);
    }
  }, [fk_agenda]);

  return (
    <Box>
      {response.length > 0 ? (
        <>
          <SaveAgendaResponseForm
            setResponses={setResponse}
            responses={response}
            handleClose={handleClose}
            pe_id={pe_id}
            setBackdrop={setBackdrop}
            handleSubmitClose={handleSubmitClose}
          />
        </>
      ) : (
        <CircularProgress sx={{ color: "var(--primary-color)", mt: "10px" }} />
      )}
    </Box>
  );
};

export default SaveAgendaResponse;
