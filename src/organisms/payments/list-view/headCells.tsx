import { Tooltip } from "@mui/material";
import DocLink from "../../../assets/images/document_link.png"
import { HeadCell } from "../../../molecules/table-view-common/types";


const DocLinkLabel = () => {
  return (
    <Tooltip title="Transaction Document Urls" arrow>
      <img
        alt="Transaction Document Urls"
        src={DocLink}
        width={"20px"}
        style={{ marginLeft: "0.5rem" }}
      />
    </Tooltip>
  )
}

export const headCells: HeadCell[] = [
  {
    id: "id",
    numeric: true,
    disablePadding: false,
    label: "Txn ID",
    isSort: true,
  },
  {
    id: "expert_id",
    numeric: true,
    disablePadding: false,
    label: "Expert ID",
    isSort: true,
  },
  {
    id: "amount",
    numeric: false,
    disablePadding: true,
    label: "Amount",
    isSort: false,
  },
  {
    id: "amount_in_usd",
    numeric: true,
    disablePadding: false,
    label: "Amount ($)",
    isSort: true,
  },
  {
    id: "amount_in_inr",
    numeric: true,
    disablePadding: false,
    label: "Amount (₹)",
    isSort: true,
  },
  {
    id: "date",
    numeric: false,
    disablePadding: true,
    label: "Date",
    isSort: false,
  },
  {
    id: "doc_link",
    numeric: false,
    disablePadding: true,
    label: <DocLinkLabel />,
    isSort: false,
  },
  {
    id: "type",
    numeric: false,
    disablePadding: true,
    label: "Type",
    isSort: true,
  },
  {
    id: "narration",
    numeric: false,
    disablePadding: true,
    label: "Narration",
    isSort: true,
  },
];

