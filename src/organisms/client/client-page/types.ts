import { EnqueueSnackbar } from "notistack";
import { Dispatch, SetStateAction } from "react";

export type ClientProfileData = {
  office_addresses: ClientOfficeData[] | null;
};

type HeadCell = {
  disablePadding: boolean;
  id: keyof TableData;
  label: string;
  numeric: boolean;
  isSort: boolean;
};

export const headCells: readonly HeadCell[] = [
  {
    id: "month",
    numeric: false,
    disablePadding: true,
    label: "Month",
    isSort: false,
  },
  {
    id: "total_revenue",
    numeric: true,
    disablePadding: false,
    label: "Revenue",
    isSort: true,
  },
  {
    id: "total_calls",
    numeric: true,
    disablePadding: false,
    label: "Call Count",
    isSort: true,
  },
  {
    id: "projects",
    numeric: false,
    disablePadding: false,
    label: "Projects",
    isSort: false,
  },
  {
    id: "client_contact",
    numeric: false,
    disablePadding: false,
    label: "Calls Attended By",
    isSort: false,
  },
  {
    id: "POCs_added",
    numeric: false,
    disablePadding: false,
    label: "POCs Added",
    isSort: false,
  }
];

export interface TableData {
  id: number;
  month: string;
  total_revenue: number;
  total_calls: number;
  projects: any[];
  client_contact: any[];
  POCs_added: any[];
  call_month_year: any[];
}

export type SetClientProfileData = Dispatch<SetStateAction<ClientProfileData>>;

export type ClientOfficeData = {
  email(email: any, arg1: () => void, arg2: () => void, enqueueSnackbar: EnqueueSnackbar, arg4: boolean): unknown;
  id: number;
  name: string;
  entityName: string;
  address: string;
  city: string;
  country: string;
  GSTIN: string;
  client_id: number;
  created_at: string | null;
  updated_at: string | null;
};

export type GetClientOfficeApiResponse = {
  success: boolean;
  message: string;
  data: ClientOfficeData[];
};

export type BCGDataFile = {
  total_revenue: number;
  total_calls: number;
  projects: Array<number>;
  client_contact: Array<string>;
  POCs_added: Array<{ label: string; value: number }>;
  month: string;
  call_month_year: Array<string>;
};

export type BCGData = {
  data: BCGDataFile[];
  total_POCs: number;
  total_revenue:number;
  total_calls:number;
} | null;

export type SetBCGData = Dispatch<SetStateAction<BCGData>>;

export interface BCGCallData {
  id: number;
  call_start_time: string;
  revenue_in_usd: number;
  fk_project: number;
  client_contact: string;
}

export interface BCGApiResponse {
  success: boolean;
  message: string;
  data: BCGCallData[];
}

export type ContactDataItems = {
  id: number;
  name: string;
  created_at: string;
};

export type ContactApiResponse = {
  success: boolean;
  message: string;
  data: ContactDataItems[];
};
