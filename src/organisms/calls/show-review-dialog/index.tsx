import { Grid } from "@mui/material";
import DialogModal from "../../../atoms/dialog";
import { CallDetail } from "../../../pages/Calls/types";
import { LocalDayjs } from "../../../utils/timezoneService";
import ShowCallReviewDialog from "./call_review";


type Props = {
  isOpen: boolean;
  handleClose(): void;
  callDetail: CallDetail | null;
  review_type: "FINANCE" | "CALL" | null;
}

export default function ShowReviewDialog({ isOpen, handleClose, callDetail, review_type }: Props) {

  const isFinanceReview = review_type === "FINANCE";

  return (
    <>
    {isFinanceReview ?
        <DialogModal
        isOpen={isOpen}
        handleClose={handleClose}
        title={"Remarks added by " + callDetail?.reviewed_by?.name + " on " + (callDetail?.reviewed_on ? LocalDayjs(callDetail?.reviewed_on).format("DD MMMM YYYY") : "")}
      >
        <Grid container sx={{ "& p": { fontSize: "14px" }, "& .bold": { fontWeight: "500" } }} mt={"10px"} spacing={1}>
          <Grid item xs={12}>
            <p className="bold">
              {callDetail?.review_remarks}
            </p>
          </Grid>
        </Grid>
      </DialogModal> :
      <ShowCallReviewDialog 
        isOpen={isOpen}
        handleClose={handleClose}
        callDetail={callDetail}
      />
    }
    </>
  )
}