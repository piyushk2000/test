import { isInternalUser, isOnlyAdmins, isSuperAdmin } from "../../../utils/role";
import DownloadIcon from '@mui/icons-material/Download';
import { BoxFlex } from "../../boxSpaceBtw";

const actionLabel = {
  edit: "View Call",
  view: "View Call",
  request_payment: "Upload Invoice",
  confirm: "Confirmed by Expert",
  delete: "Delete Call",
  paid: "Mark Call Paid",
  unpaid: "Mark Call UnPaid",
  zoom_reports: "Zoom Reports",
  view_invoice: "View Invoice",
  view_call_review: "Call Remark",
  view_review: "Finance Remark",
  view_SoA: "Transactions Statement",
  view_payment_receipt: <BoxFlex sx={{gap: "0.25rem"}}><p>Payment Receipt(s)</p> <DownloadIcon /></BoxFlex>,
  add_remark: "Add Remark",
  edit_remark: "Edit Remark"
}

function getAction(action: "edit" | "delete" | "confirm" | "request_payment" | "paid" | "view" | "unpaid" | "zoom_reports" | "view_invoice" | "view_review" | "view_SoA" | "view_payment_receipt" | "add_remark" | 
  "view_call_review" | "edit_remark",
  handleClick: () => void) {
  return {
    label: actionLabel[action],
    handleClick
  }
}

export const ThreeDotItems = (
  status: string,
  isExpert: boolean,
  onConfirmByExpert: () => void,
  onEditCallClick: () => void,
  requestPayment: () => void,
  onDeleteCallClick: () => void,
  onPaidCallClick: () => void,
  onUnPaidCallClick: () => void,
  zoom_meeting_link: string | null,
  onZoomReportsClick: () => void,
  invoice_url: string | null,
  viewInvoiceClickHandler: () => void,
  review: {
    reviewed_by: { name: string, id: number } | null,
    reviewed_on: string | null;
    review_remarks: string | null;
    call_review: string | null;
  },
  viewReviewClickHandler: (review_type: "FINANCE" | "CALL" | null) => void,
  viewSoAClickHandler: () => void,
  viewPaymentReceiptClickHandler: () => void,
  adminAllowed: boolean,
  addRemarkClickHandler: () => void,
) => {

  let ActionArr: Array<{ label: React.ReactNode; handleClick: any }> = [];
  const internalUser = isInternalUser()
  const is_only_admins = isOnlyAdmins();

  if(status === "Confirmed") {
    isSuperAdmin() && ActionArr.push(getAction("delete", onDeleteCallClick));
    return ActionArr;
  }

  switch (status) {
    case "Completed": {
      // !isExpert && ActionArr.push(getAction("confirm", onConfirmByExpert));
      isSuperAdmin() && ActionArr.push(getAction("delete", onDeleteCallClick));
      break;
    }
    case "Payment Requested": {
      // isSuperAdmin() && ActionArr.push(getAction("delete", onDeleteCallClick));
      break;
    }
    
    case "Payment Approved": {
      isSuperAdmin() && ActionArr.push(getAction("paid", onPaidCallClick));
      break;
    }

    case "Paid": {
      // isSuperAdmin() && ActionArr.push(getAction("unpaid", onUnPaidCallClick));
      ActionArr.push(getAction("view_SoA",viewSoAClickHandler));
      ActionArr.push(getAction("view_payment_receipt",viewPaymentReceiptClickHandler))
    }
  }

  if(status !== "Paid" && status !== "Partially Paid" && is_only_admins ) {
    (isSuperAdmin() || adminAllowed) && ActionArr.push(getAction(review.call_review ? "edit_remark" : "add_remark",addRemarkClickHandler))
  }


  if (zoom_meeting_link && internalUser) {
    ActionArr.push(getAction("zoom_reports", onZoomReportsClick));
  }

  if (internalUser) {
    ActionArr.push(getAction(isSuperAdmin() ? "edit" : "view", onEditCallClick));

    if(review.review_remarks) {
      ActionArr.push(getAction("view_review",() => viewReviewClickHandler("FINANCE")));
    }

    if(review.call_review) {
      ActionArr.push(getAction("view_call_review",() => viewReviewClickHandler("CALL")));
    }
  }

  if (invoice_url) {
    ActionArr.push(getAction("view_invoice", viewInvoiceClickHandler))
  }

  return ActionArr
}

export const statusChip = (status: string) => {
  let bg = "rgba(14, 76, 127, 0.1)";
  let color = "#0e4c7f";
  switch (status) {
    case "Completed": {
      bg = "#4FB29C50";
      color = "#16886E";
      break;
    }

    case "Scheduled": {
      bg = "#0E4C7F30";
      color = "#0E4C7F";
      break;
    }

    case "Refused": {
      bg = "#AF405230";
      color = "#AF4052";
      break;
    }

    case "Payment Requested": {
      bg = "#C9864C30";
      color = "#C9864C";
      break;
    }

    case "Partially Paid": {
      bg = "#57728530";
      color = "#577285";
      break;
    }

    case "Paid": {
      bg = "#57728530";
      color = "#577285";
      break;
    }

    case "Confirmed": {
      bg = "#6B577330";
      color = "#6B5773";
      break;
    }

    case "Compliance Done": {
      bg = "#228B2230";
      color = "#228B22";
      break;
    }

    case "Waived Off": {
      bg = "#C9864C30";
      color = "#C9864C";
      break;
    }

    case "Billable": {
      bg = "#0E4C7F30";
      color = "#0E4C7F";
      break;
    }

    default: {
    }
  }

  return {
    background: bg,
    padding: {
      xs: "2px 8px",
      sm: "3px 16px",
    },
    borderRadius: "38px",
    letterSpacing: "0",
    color,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: {
      xs: "0",
      sm: "0.5em"
    },

    "& p": {
      fontSize: "0.65rem",
      textAlign: "center",
      fontWeight: "500",
    },
  };
};


