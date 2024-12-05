import { Dispatch, SetStateAction } from "react";

// Main response structure
export interface GetUsageResponseData {
  success: boolean;
  message: string;
  data: {
    column_data: ClientUsageData[];
    columns: string;
  }
}

// Structure for each item in the data array
export interface ClientUsageData {
  call_id: number;
  expert_id: number;
  expert_name: string;
  expert_type: string | null;
  premium_expert: boolean | null;
  current_company_name: string | null;
  current_company_designation: string | null;
  base_location: string;
  current_us_govt_employee: boolean;
  client_contact_name: string;
  client_contact_email: string;
  billing_city: string;
  billing_country: string;
  local_to_local: boolean | null;
  payable_mins: number | null;
  chargeable_mins: number | null;
  billable_currency: string;
  selling_price: number;
  billing_amount: number | null;
  multiplier: number | null;
  casecode: string;
  call_medium: string | null;
  call_medium_reason?: string | null;
  call_type: string;
  call_status: string | null;
  call_date: string;
  call_log_time: any;
  project_id: number;
  project_external_topic: string;
  parent_project_name?: string | null;
  account_manager: AccountManager;
  client_compliance_date: string;
  client_compliance_responses: any | null; 
}

interface ExpertWorkExperience {
  company: string;
  designation: string;
  currently_works_here: boolean;
}

interface AccountManager {
  id: number;
  name: string;
}


  export type FiltersPayload = {
    isFilterChange: boolean;
    view: string;
    calendar: string | null;
  }

  export type SetFiltersPayload = Dispatch<SetStateAction<FiltersPayload>>

  export type Dialog = {
    show_answers: {
      state: boolean,
      compliances: any
    }
  }

  export type SetDialog = Dispatch<SetStateAction<Dialog>>