import { HeadCell } from "./type";


export const headCells: readonly HeadCell[] = [
  {
    id: "project_name",
    numeric: false,
    disablePadding: true,
    label: "Project Name",
    isSort: true,
  },
  {
    id: "expert_name",
    numeric: false,
    disablePadding: true,
    label: "Expert Name",
    isSort: true,
  },
  {
    id: "current_company_designation",
    numeric: false,
    disablePadding: true,
    label: "Current Company & Designation",
    isSort: true
  },
  {
    id: "past_company_designation",
    numeric: false,
    disablePadding: true,
    label: "Past Company & Designation",
    isSort: true
  },
  {
    id: "actions",
    numeric: false,
    disablePadding: false,
    label: "View",
    isSort: false,
  },
];
