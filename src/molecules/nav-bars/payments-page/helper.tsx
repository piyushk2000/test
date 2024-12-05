import { getDownloadUrl } from "../../../utils/utils";

export const sortByOptions = [
  {
    label: <p>Transaction Date (Most Recent First)</p>,
    value: "desc___transaction_date",
  },
  {
    label: <p>Transaction Date (Oldest First)</p>,
    value: "asc___transaction_date",
  },
  {
    label: <p>Amount in INR ( &uarr; )</p>,
    value: "asc___amount_in_inr",
  },
  {
    label: <p>Amount in INR ( &darr; )</p>,
    value: "desc___amount_in_inr",
  },
  {
    label: <p>Amount in USD ( &uarr; )</p>,
    value: "asc___amount_in_usd",
  },
  {
    label: <p>Amount in USD ( &darr; )</p>,
    value: "desc___amount_in_usd",
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