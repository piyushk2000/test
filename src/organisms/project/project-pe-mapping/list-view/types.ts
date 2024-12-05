import { NumberQuestion } from "../../../compliances/autoAprovalDialog/types";
import { MetaType, PeComplianceData } from "../type";

export interface EnhancedTableToolbarProps {
  numSelected: number;
  setNoActionTaken: (value: boolean) => void;
  isNoActionTaken: boolean;
  title: string | null;
}

export type Order = "asc" | "desc";

export interface Data {
  pe_id: number | null;
  name: string;
  expert_id: number;
  curr_designation: string;
  curr_company_division: string | null;
  curr_company: string;
  curr_company_location: string | null;
  status: string;
  expert_invitation: string | null;
  Action: string[];
  agenda_shared: boolean;
  is_agenda_respond: boolean;
  project_invitation_link: string | null;
  is_account_manager: boolean;
  is_group_admin: boolean;
  is_complaince_shared: boolean;
  csc_marked_completed_by_name: string | null;
  csc_marked_completed_on: string | null;
  meta: MetaType;
  first_invite?:any;
  client_id: number;
  answers: NumberQuestion[] | null;
  compliance_shared: boolean;
  pe_compliance: PeComplianceData | null;
  badge: "Ace" | "Champion" | "Pro" | null;
  calls_completed: number | null;
  calls_scheduled: number | null;
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
