import { Dispatch, SetStateAction } from "react";

export interface EnhancedTableToolbarProps {
  numSelected: number;
  ToolbarRightElement: JSX.Element;
  title: string | null;
}

export type Order = "asc" | "desc";

export type SetOrder = Dispatch<SetStateAction<Order>>;

export type EnhancedTableHeadProps<T> = {
  isSelected: boolean;
  numSelected: number;
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof T) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
  headCells: readonly HeadCell[];
};

export interface HeadCell {
  id: string;
  numeric: boolean;
  disablePadding: boolean;
  label: React.ReactNode;
  isSort: boolean;
}
