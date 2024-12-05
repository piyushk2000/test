import { Dialog, DialogActions, DialogTitle, SxProps, Theme } from "@mui/material";
import { dialogActionStyle } from "./helper";
import CustomBtnFilled from "../../atoms/form-molecules/CustomBtnFilled";

type Props = {
  handleClose: () => void;
  handleYesClick: () => (void | Promise<void>);
  open: boolean;
  yesLabel?: string;
  text?: string;
  textSx?: SxProps<Theme>;
  hideCancelBtn?: boolean;
}

const WarningDialog = (props: Props) => {
  const {
    text = "Are you sure you want to close the form without saving the changes?",
    handleClose,
    handleYesClick,
    open,
    yesLabel,
    textSx,
    hideCancelBtn = false
  } = props;

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
    >
      <DialogTitle
        id="alert-dialog-title"
        sx={{ paddingBottom: "0", fontSize: "1rem", ...textSx }}
      >
        {text}
      </DialogTitle>
      <DialogActions sx={dialogActionStyle}>
        {!hideCancelBtn &&
          <CustomBtnFilled
            label="Cancel"
            variant="outlined"
            onClick={handleClose}
          />
        }
        <CustomBtnFilled
          label={yesLabel || "Yes"}
          variant="contained"
          onClick={handleYesClick}
        />
      </DialogActions>
    </Dialog>
  );
};

export default WarningDialog;
