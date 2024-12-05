import { Dialog, DialogActions, DialogTitle, Grid } from "@mui/material";
import CustomBtnFilled from "../../../atoms/form-molecules/CustomBtnFilled";
import { refuseReopenActionStyles, refuseReopenTitleStyles } from "../style";
import { handleYesBtnClickHandler } from "./helper";

const RefuseReopenDialog = ({
  isOpen,
  handleSubmitClose,
  id,
  setBackdrop,
  setExpertCards,
}: any) => {
  return (
    <Dialog
      maxWidth={"xs"}
      style={{ maxWidth: "none" }}
      open={isOpen}
      onClose={handleSubmitClose}
    >
      <DialogTitle
        className="add-project-modal-content"
        sx={refuseReopenTitleStyles}
      >
        Are you sure you want to reopen this expert's application?
      </DialogTitle>
      <DialogActions>
        <Grid sx={refuseReopenActionStyles} item xs={12}>
          <CustomBtnFilled
            label="No"
            variant="outlined"
            onClick={handleSubmitClose}
          />
          <CustomBtnFilled
            label="Yes"
            variant="contained"
            onClick={() =>
              handleYesBtnClickHandler(
                id,
                setBackdrop,
                setExpertCards,
                handleSubmitClose
              )
            }
          />
        </Grid>
      </DialogActions>
    </Dialog>
  );
};

export default RefuseReopenDialog;
