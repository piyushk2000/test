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
import GenerateCompliance from ".";

type Props = {
  isOpen: boolean;
  handleClose: () => void;
  id: string | null;
  handleSubmitClose: () => void;
  setBackdrop: React.Dispatch<React.SetStateAction<boolean>>;
  pageNo: number;
  setExpertCards?: () => Promise<void> | void;
  isResendCompliance?: boolean;
  setExpertApiData?: any;
}

const GenerateComplainceDialog = (props: Props) => {
  const {
    isOpen,
    handleClose,
    id,
    handleSubmitClose,
    setBackdrop,
    pageNo,
    setExpertCards,
    isResendCompliance,
    setExpertApiData
  } = props;
  const [apiData, setApiData] = useState<any>(null);

  useEffect(() => {
    if (isOpen) {
      setApiData(null);
      getExpertAllDetails(id, setApiData, pageNo);
    }
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  return (
    <Dialog
      maxWidth={"xs"}
      style={{
        maxWidth: "none",
        width: "820px",
        margin: "auto",
      }}
      className="add-project-modal"
      open={isOpen}
      onClose={handleClose}
    >
      <DialogTitle className="dialog-header px-8 py-5">
        <Grid container>
          <Grid className="dialog-title-span" item xs={6}>
            {isResendCompliance ? "Resend Compliance" : "Generate Compliance"}
          </Grid>
          <Grid className="dialog-title-close-btn" item xs={6}>
            <CloseIcon onClick={handleClose} />
          </Grid>
        </Grid>
      </DialogTitle>
      <DialogContent className="add-project-modal-content">
        <>
          {!apiData ? (
            <CircularProgress sx={{ mt: "1rem" }} />
          ) : (
            <>
              <ExpertCardsDialogDetails
                isContactedForm={false}
                data={apiData}
              />
              <hr />
              <GenerateCompliance
                id={id}
                handleSubmitClose={handleSubmitClose}
                handleClose={handleClose}
                setBackdrop={setBackdrop}
                setExpertCards={setExpertCards}
                isResendCompliance={isResendCompliance}
                setExpertApiData={setExpertApiData}
              />
            </>
          )}
        </>
      </DialogContent>
    </Dialog>
  );
};

export default GenerateComplainceDialog;
