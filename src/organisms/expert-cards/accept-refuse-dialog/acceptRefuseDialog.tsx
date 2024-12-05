import {
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ExpertCardsDialogDetails from "../../../atoms/profile-cardV1/expertCardsDialogDetails";
import { useEffect, useState } from "react";
import { getExpertAllDetails } from "../helper";
import AcceptRefuse from ".";
import DialogModal from "../../../atoms/dialog";

const AcceptRefuseDialog = (props: any) => {
  const {
    isOpen,
    handleClose,
    id,
    handleSubmitClose,
    setBackdrop,
    pageNo,
    setExpertCards,
    status,
    handleFormChange
  } = props;
  const [apiData, setApiData] = useState<any>(null);

  const isComplianceDone = status === "compliance"
  useEffect(() => {
    if (isOpen) {
      setApiData(null);
      getExpertAllDetails(id, setApiData, pageNo);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  return (
    <DialogModal
      isOpen={isOpen}
      handleClose={handleClose}
      title={isComplianceDone ? "Approve/Reject" : "Accept/Refuse"}
    >
      {!apiData ? (
        <CircularProgress sx={{ mt: "1rem" }} />
      ) : (
        <>
          <ExpertCardsDialogDetails
            isContactedForm={false}
            data={apiData}
          />
          <hr />
          <AcceptRefuse
            id={id}
            handleSubmitClose={handleSubmitClose}
            handleClose={handleClose}
            setBackdrop={setBackdrop}
            setExpertCards={setExpertCards}
            status={status}
            isComplianceDone={isComplianceDone}
            handleFormChange={handleFormChange}
          />
        </>
      )}
    </DialogModal>
  );
};

export default AcceptRefuseDialog;
