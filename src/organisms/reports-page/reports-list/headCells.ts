import { HeadCell } from "./type";

export const headCells: readonly HeadCell[] = [
    {
        id: "name",
        numeric: false,
        disablePadding: true,
        label: "Report Name",
        isSort: true,
    },
    {
        id: "report_url",
        numeric: false,
        disablePadding: true,
        label: "Report Link",
        isSort: false,
    }
];
