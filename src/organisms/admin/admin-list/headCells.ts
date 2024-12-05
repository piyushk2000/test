import { HeadCell } from "./types";

export const headCells: readonly HeadCell[] = [
  {
    id: "name",
    numeric: false,
    disablePadding: true,
    label: "Full Name",
    isSort: true,
  },
  {
    id: "id",
    numeric: true,
    disablePadding: false,
    label: "ID",
    isSort: true,
  },
  {
    id: "mobile",
    numeric: false,
    disablePadding: false,
    label: "Mobile Number",
    isSort: false,
  },
  {
    id: "email",
    numeric: false,
    disablePadding: false,
    label: "Email ID",
    isSort: false,
  },
  {
    id: "role",
    numeric: false,
    disablePadding: false,
    label: "Role",
    isSort: true,
  },
  {
    id: "actions",
    numeric: false,
    disablePadding: false,
    label: "Actions",
    isSort: false,
  },
  {
    id: "groups",
    numeric: false,
    disablePadding: false,
    label: "Admin for Groups",
    isSort: false,
  },
];
