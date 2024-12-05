import { useEffect, useState } from "react";
import DialogModal from "../../../../atoms/dialog";
import AgendaPrevDescription from "./AgendaDescription";
import SaveAgendaResponse from "./save-agenda-response";
import { ModalStates } from "../../../project-detail/project-detail-card/helper";

type Props = {
  handleClose: () => void;
  isOpen: boolean;
  fk_agenda: ModalStates["isAgendaDescription"]["fk_agenda"];
  agenda_responses: ModalStates["isAgendaDescription"]["agenda_responses"];
  setBackdrop: any;
  pe_id: number | null;
  handleSubmitClose: any;
  isAdminAllowed: boolean;
  isProjectOpen: boolean;
};

const AgendaDescription = ({
  handleClose,
  isOpen,
  agenda_responses,
  fk_agenda,
  setBackdrop,
  pe_id,
  handleSubmitClose,
  isAdminAllowed,
  isProjectOpen
}: Props) => {
  const [isPreviewOn, setPreviewOn] = useState<boolean>(
    Boolean(agenda_responses) || !isProjectOpen
  );

  useEffect(() => {
    if (agenda_responses) {
      setPreviewOn(true);
    } else {
      setPreviewOn(false);
    }
  }, [agenda_responses]);

  return (
    <DialogModal isOpen={isOpen} handleClose={handleClose} title={"Agenda"}>
      {isPreviewOn ? (
        <AgendaPrevDescription
          fk_agenda={fk_agenda}
          agenda_responses={agenda_responses}
          handleClose={handleClose}
          editBtnClickHandler={() => {
            setPreviewOn(false);
          }}
          isAdminAllowed={isAdminAllowed}
          isProjectOpen={isProjectOpen}
        />
      ) : (
        <SaveAgendaResponse
          fk_agenda={fk_agenda}
          handleClose={handleClose}
          agenda_responses={agenda_responses}
          setBackdrop={setBackdrop}
          pe_id={pe_id}
          handleSubmitClose={handleSubmitClose}
        />
      )}
    </DialogModal>
  );
};

export default AgendaDescription;
