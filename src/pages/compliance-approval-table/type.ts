import { Dispatch, SetStateAction } from "react";

export type Data = {
  id: number;
  project_name: string;
  expert_name: { name: string, id: number };
  current_company_designation: string;
  past_company_designation: string;
  actions: any;
}

export type HeadCell = {
  disablePadding: boolean;
  id: keyof Data;
  label: string;
  numeric: boolean;
  isSort: boolean;
};

export type ComplianceApprovalType = {
  filters: Filters;
  setFilters: SetFilters;
  resetFilters(): void;
  dialog: Dialog;
  setDialog: SetDialog;
  select: Select;
  setSelect: SetSelect;
  selectedAction: SelectedAction;
  setSelectedAction: SetSelectedAction;
}

export type Filters = {
  isFilterApplied: boolean;
  isFilterChange: boolean;
  status: string[];
  rowsPerPage: number;
  project_external_topic: string;
  client_contact_name: string;
  expert_name: string;
  expert_id: string;
}

export type SetFilters = Dispatch<SetStateAction<Filters>>

export type Dialog = {
  expert: {
    state: boolean;
    expert_id: number | null;
  };
  reviewCompliance: {
    state: boolean;
    pe_compliance: any; 
    show_answers_only: boolean;
  },
  reviewBulk: {
    state: boolean;
    pe_compliances: string | null;
    action: "Approve" | "Reject" | null;
  }
}


export type Select = {
  isClicked: boolean;
  selectedCards: any[];
  callAction: "Reject" | "Approve" | null;
};

export type SetSelect = Dispatch<SetStateAction<Select>>;

export type SetDialog = Dispatch<SetStateAction<Dialog>>;

export type SelectedAction = {
  title: string;
  label: React.ReactNode;
  onClick(): void;
} | null;

export type SetSelectedAction = Dispatch<SetStateAction<SelectedAction>>;