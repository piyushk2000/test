import { Dispatch, SetStateAction } from "react";

export type dialogState = {
  addContact: { state: boolean; isChange: boolean };
};

export type setDialogState = Dispatch<SetStateAction<dialogState>>;

export type booleanFn = Dispatch<SetStateAction<boolean>>;

export interface TableData {
  id: number;
  avatar: string;
  name: string;
  designation: string;
  is_compliance_officer: boolean;
  company: string;
  mobile: string;
  email: string;
  action: boolean;
  total_projects: string,
  serviced_projects: string,
  calls_taken: string,
  revenue_done: string
}

type HeadCell = {
  disablePadding: boolean;
  id: keyof TableData;
  label: string;
  numeric: boolean;
  isSort: boolean;
};

export const headCells: readonly HeadCell[] = [
  {
    id: "avatar",
    numeric: false,
    disablePadding: true,
    label: "Avatar",
    isSort: false,
  },
  {
    id: "name",
    numeric: false,
    disablePadding: false,
    label: "Name",
    isSort: true,
  },
  {
    id: "designation",
    numeric: false,
    disablePadding: false,
    label: "Designation",
    isSort: true,
  },
  {
    id: "company",
    numeric: false,
    disablePadding: false,
    label: "Company",
    isSort: false,
  },
  {
    id: "email",
    numeric: false,
    disablePadding: false,
    label: "Email",
    isSort: true,
  },
  {
    id: "mobile",
    numeric: false,
    disablePadding: false,
    label: "Mobile",
    isSort: true,
  },
  {
    id: "total_projects",
    numeric: false,
    disablePadding: false,
    label: "Total Projects",
    isSort: true,
  },
  {
    id: "serviced_projects",
    numeric: false,
    disablePadding: false,
    label: "Serviced Projects",
    isSort: true,
  },
  {
    id: "calls_taken",
    numeric: false,
    disablePadding: false,
    label: "Calls Taken",
    isSort: true,
  },
  {
    id: "revenue_done",
    numeric: false,
    disablePadding: false,
    label: "Revenue Done",
    isSort: true,
  },
  {
    id: "action",
    numeric: false,
    disablePadding: false,
    label: "Actions",
    isSort: false,
  }
];

export type contactData = {
  id: number;
  user_id: number | null;
  salutation: string;
  name: string;
  email: string;
  mobile: string;
  is_compliance_officer: boolean;
  designation: string;
  fkClient: number;
  created_at: string | null;
  updated_at: string | null;
  total_projects: string;
  serviced_projects: string;
  calls_taken: string;
  revenue_done: string;
};

export type getAllContactsAPI = {
  success: string;
  message: string;
  data: contactData[];
};

export type apiDataState = {
  api: getAllContactsAPI | null;
  isFilter: boolean;
  filter: {
    calender: string | null;
    sort_by: string;
    search: string | null;
    id:string|null;
    name:string|null;
    email:string|null;
    isFilterChange: boolean;
  };
};

export type AppbarToggleOptions = "card" | "list" | "kanban";

export type setApiDataContactState = Dispatch<SetStateAction<apiDataState>>;
export type setToggleCardState = Dispatch<SetStateAction<AppbarToggleOptions>>;
