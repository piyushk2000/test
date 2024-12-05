import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Grid from "@mui/material/Grid";
import CloseIcon from "@mui/icons-material/Close";
import CallNewLog from "../../../organisms/project/project-call-log-form/callNewLog";

type Props = {
  isOpen: boolean;
  handleClose: () => void;
  id: string | null;
  refetch: (() => Promise<void>) | null;
  pe_id: string | null;
  expert_id: string | null;
  handleFormChange: () => void;
  handleSubmitClose: () => void;
  is_account_manager: boolean;
  is_group_admin: boolean;
  selected_call?: number;
};

const NewCallLogDialog = (props: Props) => {
  const {
    isOpen,
    handleClose,
    id,
    refetch,
    pe_id,
    expert_id,
    handleFormChange,
    handleSubmitClose,
    is_account_manager,
    is_group_admin,
    selected_call
  } = props;
  return (
    <Dialog className="add-project-modal" open={isOpen} onClose={handleClose}>
      <DialogTitle className="dialog-header">
        <Grid container>
          <Grid className="dialog-title-span" item xs={6}>
            Log Call
          </Grid>
          <Grid className="dialog-title-close-btn" item xs={6}>
            <CloseIcon onClick={handleClose} />
          </Grid>
        </Grid>
      </DialogTitle>
      <DialogContent className="agenda-dialog-content">
        <CallNewLog
          handleClose={handleClose}
          id={id}
          refetch={refetch}
          pe_id={pe_id}
          expert_id={expert_id}
          handleFormChange={handleFormChange}
          handleSubmitClose={handleSubmitClose}
          is_account_manager={is_account_manager}
          isOpen={isOpen}
          is_group_admin={is_group_admin}
          selected_call={selected_call}
        />
      </DialogContent>
    </Dialog>
  );
};

export default NewCallLogDialog;
