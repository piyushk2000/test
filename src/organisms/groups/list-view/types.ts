import React from "react";
import { AdminDataItem } from "../types";

export interface EnhancedTableToolbarProps {
  numSelected: number;
}

export type Order = "asc" | "desc";

export interface Data {
  group_id: number;
  group_name: string;
  admins: AdminDataItem[];
  actions: string;
}

export interface EnhancedTableProps {
  numSelected: number;
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof Data
  ) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}

export interface HeadCell {
  disablePadding: boolean;
  id: keyof Data;
  label: string;
  numeric: boolean;
  isSort: boolean;
}
