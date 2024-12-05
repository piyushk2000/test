import { Grid } from "@mui/material";
import DialogModal from "../../../atoms/dialog";
import { CallDetail } from "../../../pages/Calls/types";
import { LocalDayjs } from "../../../utils/timezoneService";


type Props = {
  isOpen: boolean;
  handleClose(): void;
  callDetail: CallDetail | null;
}

export default function ShowCallReviewDialog({ isOpen, handleClose, callDetail }: Props) {

  return (
    <DialogModal
      isOpen={isOpen}
      handleClose={handleClose}
      title="Call Remark"
    >
      <Grid container sx={{ "& p": { fontSize: "14px" }, "& .bold": { fontWeight: "500" } }} mt={"10px"} spacing={1}>
        <Grid item xs={12}>
          <p className="bold">
            {callDetail?.remark}
          </p>
        </Grid>
      </Grid>
    </DialogModal>
  )
}