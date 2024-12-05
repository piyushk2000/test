import { Dispatch, SetStateAction } from "react";
import { NumberQuestion } from "../autoAprovalDialog/types";

export type dialogState = {
  addContact: { state: boolean; isChange: boolean };
};

export type setDialogState = Dispatch<SetStateAction<dialogState>>;

export type booleanFn = Dispatch<SetStateAction<boolean>>;

export interface TableData {
  id: number;
  title: string;
  questions: NumberQuestion[];
  created_at: string;
  state: string;
  action: boolean;
  review:boolean;
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
    id: "title",
    numeric: false,
    disablePadding: true,
    label: "Title",
    isSort: true,
  },
  {
    id: "questions",
    numeric: false,
    disablePadding: false,
    label: "No. of Questions",
    isSort: false,
  },
  {
    id: "state",
    numeric: false,
    disablePadding: false,
    label: "State",
    isSort: true,
  },
  {
    id: "action",
    numeric: false,
    disablePadding: false,
    label: "Actions",
    isSort: false,
  },
  {
    id: "review",
    numeric: false,
    disablePadding: false,
    label: "Review",
    isSort: false,
  }
];

export type complianceData = {
  id: number;
  fk_client: number;
  title: string;
  description: string;
  fk_creator: number;
  updated_by: number;
  created_at: string | null;
  updated_at: string | null;
  state: string;
  questions:NumberQuestion[]
};



export type getAllComplianceAPI = {
  success: string;
  message: string;
  data: complianceData[];
};

export type apiDataState = {
  api: getAllComplianceAPI | null;
  isFilter: boolean;
  filter: {
    date: Date;
    tDate: Date;
    bcgTab: number;
    calender: string | null;
    isFilterChange: boolean;
  };
};


export type AppbarToggleOptions = "card" | "list" | "kanban";

export type setApiDataComplianceState = Dispatch<SetStateAction<apiDataState>>;
export type setToggleCardState = Dispatch<SetStateAction<AppbarToggleOptions>>;
