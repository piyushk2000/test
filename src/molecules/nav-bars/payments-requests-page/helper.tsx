import { SetCalenderTypes } from ".";
import { Filters } from "../../../pages/payment-requests/types";
import { LocalDayjs } from "../../../utils/timezoneService";
import { getDownloadUrl } from "../../../utils/utils";
import { NavbarActionsTypes } from "../../nav-bar-common/type";

export const currencyOptions = [
  {
    label: <p>All</p>,
    value: "all"
  },
  {
    label: <p>$ USD</p>,
    value: "USD",
  },
  {
    label: <p>₹ INR</p>,
    value: "INR"
  },
]

export const generatedBy = [
  {
    label: <p>All</p>,
    value: "all"
  },
  {
    label: <p>Expert</p>,
    value: "Expert",
  },
  {
    label: <p>Infollion</p>,
    value: "Infollion"
  }
]

export const statusOptions = [
  {
    label: <p>All</p>,
    value: "all"
  },
  {
    label: <p>Requested</p>,
    value: "Requested"
  },
  {
    label: <p>OnHold</p>,
    value: "On Hold",
  },
  {
    label: <p>Approved</p>,
    value: "Approved"
  },
  {
    label: <p>Paid</p>,
    value: "Paid"
  },
  {
    label: <p>Partially Paid</p>,
    value: "Partially Paid"
  },
  {
    label: <p>Rejected</p>,
    value: "Rejected"
  }
]

export const typeFilterOptions = [
  { label: "All", value: "" },
  { label: 'Bonus/Adhoc Payment to expert', value: 'Bonus/Adhoc Payment to expert' },
  { label: 'Exchange Rate / Bank Charges Reimbursement', value: 'Exchange Rate / Bank Charges Reimbursement' },
  { label: 'Payment Requested For Calls', value: 'Payment Requested For Calls' },
  { label: 'Payment done via bank transfer', value: 'Payment done via bank transfer' },
  { label: 'TDS', value: 'TDS' },
  { label: "Call's Payable amount is increased", value: "Call's Payable amount is increased" },
  { label: "Call's Payable amount is decreased", value: "Call's Payable amount is decreased" },
  { label: 'Call Deleted', value: 'Call Deleted' },
  { label: 'Payment received from expert', value: 'Payment received from expert' }
];

export const autoGeneratedOptions = [
  {label: "All", value: "all"},
  {label: "Yes", value: "yes"},
  {label: "No", value: "no"}
]

export const paymentLocationOptions = [
  {label: "All", value: "all"},
  {label: "Domestic", value: "Domestic"},
  {label: "International", value: "International"}
]


export const seperatorStyle = {
  border: "1px solid #bdb7b7",
  width: "16px",
  rotate: "90deg",
}

export const generatePaymentsDownloadUrl = (api_url: string) => {
  const title = "Payments (Upto 1000 results are shown in this report)";
  const columns_keys_arr = [
    "id",
    "fk_expert",
    "amount",
    "amount_in_usd",
    "amount_in_inr",
    "transaction_date",
    "transaction_document_url",
    "type",
    "narration"
  ];
  const column_titles_arr = [
    "Txn ID",
    "Expert ID",
    "Amount",
    "Amount ($)",
    "Amount (₹)",
    "Date",
    "Transaction Document Urls",
    "Type",
    "Narration"
  ];

  return getDownloadUrl(title, columns_keys_arr, column_titles_arr, api_url);
}


export const calenderOpenClickHandler = (setCalender: SetCalenderTypes) => {
  setCalender((prev) => ({ ...prev, open: true }));
};

export const calenderCloseBtnClickHandler = (setCalender: SetCalenderTypes, okBtnApiCalls: (
  date: Date | null,
  tDate: Date | null,
  select: string | null,
  calenderType: string | null,
) => void, filters: Filters) => {
  setCalender((prev) => ({
      open: false,
      value: "",
      type: filters.status === "Requested" ? "recorded_at" : "reviewed_on",
      date: null,
      tDate: null,
      select: null
  }));
  // removing the date Range Filter
  okBtnApiCalls(null, null, null, null);
};

export const navbarActionsTitle = {
  approve: "Approve Payments",
  hold: "Hold Payments",
  reject: "Reject Payments",
  undo_reject: "Undo Rejected Payments",
  high_priority: "Set Priority to High",
  low_priority: "Set Priority to Low",
  invoice_num: "Update Invoice Number",
  declaration_date: "Change Declaration Date"
}


export const NavbarActions = (
  approveClickHandler: () => void,
  onHoldClickHandler: () => void,
  rejectClickHandler: () => void,
  setHighPriorityClickHandler: () => void,
  setLowPriorityClickHandler: () => void,
  updateInvoiceNumClickHandler: () => void,
  updateDeclarationDateClickHandler: () => void
): NavbarActionsTypes => {
  
  return [
    {
      title: navbarActionsTitle.approve,
      label: navbarActionsTitle.approve,
      onClick: approveClickHandler,
    },
    {
      title: navbarActionsTitle.hold,
      label: navbarActionsTitle.hold,
      onClick: onHoldClickHandler,
    },
    {
      title: navbarActionsTitle.reject,
      label: navbarActionsTitle.reject,
      onClick: rejectClickHandler,
    },
    {
      title: navbarActionsTitle.high_priority,
      label: navbarActionsTitle.high_priority,
      onClick: setHighPriorityClickHandler,
    },
    {
      title: navbarActionsTitle.low_priority,
      label: navbarActionsTitle.low_priority,
      onClick: setLowPriorityClickHandler,
    },
    {
      title: navbarActionsTitle.invoice_num,
      label: navbarActionsTitle.invoice_num,
      onClick: updateInvoiceNumClickHandler
    },
    {
      title: navbarActionsTitle.declaration_date,
      label: navbarActionsTitle.declaration_date,
      onClick: updateDeclarationDateClickHandler
    }
  ];
};

export const NavbarActionsLength = NavbarActions(
  () => {},
  () => {},
  () => {},
  () => {},
  () => {},
  () => {},
  () => {}
).length;