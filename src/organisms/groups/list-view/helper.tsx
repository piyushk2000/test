import { createTheme } from "@mui/material/styles";
import { Data, HeadCell, Order } from "./types";
import { Dispatch, SetStateAction } from "react";

export const handleRequestSort = (
  event: React.MouseEvent<unknown>,
  property: keyof Data,
  setOrder: Dispatch<SetStateAction<Order>>,
  setOrderBy: Dispatch<SetStateAction<keyof Data>>,
  order: Order,
  orderBy: keyof Data
) => {
  const isAsc = orderBy === property && order === "asc";
  setOrder(isAsc ? "desc" : "asc");
  setOrderBy(property);
};

export const handleClick = (
  event: React.MouseEvent<unknown>,
  name: string,
  selected: readonly string[],
  setSelected: Dispatch<SetStateAction<readonly string[]>>
) => {
  // If the User is clicking on a Span Element ( meaning - Status & Action Chips ) & In Chip , return
  const target = event.target as HTMLElement;
  if (target && target.tagName) {
    const tagName = target.tagName;
    if (tagName === "SPAN" || tagName === "P") {
      return;
    }
  }

  const selectedIndex = selected.indexOf(name);
  let newSelected: readonly string[] = [];

  if (selectedIndex === -1) {
    newSelected = newSelected.concat(selected, name);
  } else if (selectedIndex === 0) {
    newSelected = newSelected.concat(selected.slice(1));
  } else if (selectedIndex === selected.length - 1) {
    newSelected = newSelected.concat(selected.slice(0, -1));
  } else if (selectedIndex > 0) {
    newSelected = newSelected.concat(
      selected.slice(0, selectedIndex),
      selected.slice(selectedIndex + 1)
    );
  }

  setSelected(newSelected);
};

export const handleSelectAllClick = (
  event: React.ChangeEvent<HTMLInputElement>,
  currentRow: Data[],
  setSelected: Dispatch<SetStateAction<readonly string[]>>
) => {
  if (event.target.checked) {
    const newSelected = currentRow.map((n) => n.group_name);
    setSelected(newSelected);
    return;
  }
  setSelected([]);
};

export const handleChangePage = (
  event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null,
  newPage: number,
  setPage: Dispatch<SetStateAction<number>>,
  setCurrentRow: Dispatch<SetStateAction<Data[]>>,
  rowsPerPage: number,
  rows: Data[]
) => {
  setPage(newPage);
  const rowData = rows.slice(
    newPage * rowsPerPage,
    newPage * rowsPerPage + rowsPerPage
  );
  setCurrentRow(rowData);
};

export const handleChangeRowsPerPage = (
  event: React.ChangeEvent<HTMLInputElement>,
  setRowsPerPage: Dispatch<SetStateAction<number>>,
  setCurrentRow: Dispatch<SetStateAction<Data[]>>,
  setPage: Dispatch<SetStateAction<number>>,
  rows: Data[]
) => {
  setRowsPerPage(parseInt(event.target.value));
  const rowData = rows.slice(0, parseInt(event.target.value));
  setCurrentRow(rowData);
  setPage(0);
};

export const theme = createTheme({
  palette: {
    primary: {
      main: "#EC9324",
    },
  },
});

export function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

export function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string }
) => number {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

export function stableSort<T>(
  array: Data[],
  comparator: (a: T, b: T) => number
) {
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

export const headCells: readonly HeadCell[] = [
  {
    id: "group_name",
    numeric: false,
    disablePadding: true,
    label: "Group Name",
    isSort: true,
  },
  {
    id: "admins",
    numeric: false,
    disablePadding: false,
    label: "Admins",
    isSort: false,
  },
  {
    id: "actions",
    numeric: false,
    disablePadding: false,
    label: "Actions",
    isSort: false,
  },
];
