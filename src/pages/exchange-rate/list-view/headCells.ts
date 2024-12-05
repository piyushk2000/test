import { HeadCell } from "../../../molecules/table-view-common/types";

export const headCells: readonly HeadCell[] = [
    {
        id: "date",
        numeric: false,
        disablePadding: true,
        label: "Date",
        isSort: true,
    },
    {
        id: "currency",
        numeric: false,
        disablePadding: false,
        label: "Currency",
        isSort: true,
    },
    {
        id: "buy_rate",
        numeric: true,
        disablePadding: false,
        label: "Buy Rate",
        isSort: true,
    },
]