import { createTheme } from "@mui/material";
import { Order, SetOrder } from "./types";
import { Dispatch, SetStateAction } from "react";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#EC9324",
    },
  },
});

export const handleRequestSort = <T>(
  event: React.MouseEvent<unknown>,
  property: keyof T,
  setOrder: SetOrder,
  setOrderBy: Dispatch<SetStateAction<keyof T>>,
  order: Order,
  orderBy: keyof T
) => {
  const isAsc = orderBy === property && order === "asc";
  setOrder(isAsc ? "desc" : "asc");
  setOrderBy(property);
};

export function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

export function getComparator<T>(
  order: Order,
  orderBy: keyof T
): (a: T, b: T) => number {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

export function stableSort<T>(array: T[], comparator: (a: T, b: T) => number) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

export const handleChangePage = <T>(
  event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null,
  newPage: number,
  setPage: Dispatch<SetStateAction<number>>,
  setCurrentRow: Dispatch<SetStateAction<T[]>>,
  rowsPerPage: number,
  rows: T[]
) => {
  setPage(newPage);
  const rowData = rows.slice(
    newPage * rowsPerPage,
    newPage * rowsPerPage + rowsPerPage
  );
  setCurrentRow(rowData);
};

export const handleChangeRowsPerPage = <T>(
  event: React.ChangeEvent<HTMLInputElement>,
  setRowsPerPage: Dispatch<SetStateAction<number>>,
  setCurrentRow: Dispatch<SetStateAction<T[]>>,
  setPage: Dispatch<SetStateAction<number>>,
  rows: T[]
) => {
  setRowsPerPage(parseInt(event.target.value));
  const rowData = rows.slice(0, parseInt(event.target.value));
  setCurrentRow(rowData);
  setPage(0);
};
