export interface Data {
  name: string;
  id: number;
  mobile: string;
  email: string;
  actions: any;
  groups: any;
  is_active:boolean;
  role: string;
  meta: any;
}

export type HeadCell = {
  disablePadding: boolean;
  id: keyof Data;
  label: string;
  numeric: boolean;
  isSort: boolean;
};

export type Order = "asc" | "desc";

export interface TableHeaderProps {
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
