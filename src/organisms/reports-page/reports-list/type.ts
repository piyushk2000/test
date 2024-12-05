export interface Data {
    id: number;
    name: string;
    report_url: string;
}


export type HeadCell = {
  disablePadding: boolean;
  id: keyof Data;
  label: string;
  numeric: boolean;
  isSort: boolean;
};