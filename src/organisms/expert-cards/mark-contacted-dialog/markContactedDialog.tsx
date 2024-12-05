import {
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ExpertCardsDialogDetails from "../../../atoms/profile-cardV1/expertCardsDialogDetails";
import MarkContacted from ".";
import { useEffect, useState } from "react";
import { getExpertAllDetails } from "../helper";

const MarkContactedDialog = (props: any) => {
  const {
    isOpen,
    handleClose,
    id,
    handleSubmitClose,
    setExpertCards,
    setBackdrop,
  } = props;
  const [apiData, setApiData] = useState<any>(null);

  useEffect(() => {
    if (isOpen) {
      setApiData(null);
      getExpertAllDetails(id, setApiData);
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
            Mark Contacted
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
              {" "}
              <ExpertCardsDialogDetails isContactedForm={true} data={apiData} />
              <hr />
              <MarkContacted
                id={id}
                handleSubmitClose={handleSubmitClose}
                handleClose={handleClose}
                setExpertCards={setExpertCards}
                setBackdrop={setBackdrop}
                data={apiData}
              />
            </>
          )}
        </>
      </DialogContent>
    </Dialog>
  );
};

export default MarkContactedDialog;
