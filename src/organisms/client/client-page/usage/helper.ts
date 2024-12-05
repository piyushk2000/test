import { HeadCell } from "../../../../molecules/table-view-common/types";
import { LocalDayjs } from "../../../../utils/timezoneService";
import { getMonth } from "../helper";
import { SetDialog } from "./types";
import { IsCalenderTypes } from "./usage";

export const headCells: readonly HeadCell[] = [
  {
    id: "call_id",
    numeric: true,
    disablePadding: false,
    label: "Call ID",
    isSort: true,
  },
  {
    id: "expert_id",
    numeric: true,
    disablePadding: false,
    label: "Expert ID",
    isSort: true,
  },
  {
    id: "expert_name",
    numeric: false,
    disablePadding: false,
    label: "Expert Name",
    isSort: true,
  },
  {
    id: "expert_type",
    numeric: false,
    disablePadding: false,
    label: "Expert Type",
    isSort: true,
  },
  {
    id: "premium_expert",
    numeric: false,
    disablePadding: false,
    label: "Premium Expert",
    isSort: true,
  },
  {
    id: "current_company_name",
    numeric: false,
    disablePadding: false,
    label: "Current Company Name",
    isSort: false,
  },
  {
    id: "current_company_designation",
    numeric: false,
    disablePadding: false,
    label: "Current Company Designation",
    isSort: false,
  },
  {
    id: "base_location",
    numeric: false,
    disablePadding: false,
    label: "Base Location",
    isSort: true,
  },
  {
    id: "current_us_govt_employee",
    numeric: false,
    disablePadding: false,
    label: "Current US Govt Employee",
    isSort: true,
  },
  {
    id: "client_contact_name",
    numeric: false,
    disablePadding: false,
    label: "Client Contact Name",
    isSort: true,
  },
  {
    id: "client_contact_email",
    numeric: false,
    disablePadding: false,
    label: "Client Contact Email",
    isSort: true,
  },
  {
    id: "billing_city",
    numeric: false,
    disablePadding: false,
    label: "Billing City",
    isSort: true,
  },
  {
    id: "billing_country",
    numeric: false,
    disablePadding: false,
    label: "Billing Country",
    isSort: true,
  },
  {
    id: "local_to_local",
    numeric: false,
    disablePadding: false,
    label: "Local to Local",
    isSort: true,
  },
  {
    id: "payable_mins",
    numeric: true,
    disablePadding: false,
    label: "Payable Mins",
    isSort: true,
  },
  {
    id: "chargeable_mins",
    numeric: true,
    disablePadding: false,
    label: "Chargeable Mins",
    isSort: true,
  },
  {
    id: "billable_currency",
    numeric: false,
    disablePadding: false,
    label: "Billable Currency",
    isSort: true,
  },
  {
    id: "selling_price",
    numeric: true,
    disablePadding: false,
    label: "Selling Price",
    isSort: true,
  },
  {
    id: "billing_amount",
    numeric: true,
    disablePadding: false,
    label: "Billing Amount",
    isSort: true,
  },
  {
    id: "multiplier",
    numeric: true,
    disablePadding: false,
    label: "Multiplier",
    isSort: true,
  },
  {
    id: "casecode",
    numeric: false,
    disablePadding: false,
    label: "Case Code",
    isSort: true,
  },
  {
    id: "call_medium",
    numeric: false,
    disablePadding: false,
    label: "Call Medium",
    isSort: true,
  },
  {
    id: "call_medium_reason",
    numeric: false,
    disablePadding: false,
    label: "Call Medium Reason",
    isSort: true,
  },
  {
    id: "call_type",
    numeric: false,
    disablePadding: false,
    label: "Call Type",
    isSort: true,
  },
  {
    id: "call_status",
    numeric: false,
    disablePadding: false,
    label: "Call Status",
    isSort: true,
  },
  {
    id: "call_date",
    numeric: false,
    disablePadding: false,
    label: "Call Date",
    isSort: true,
  },
  {
    id: "call_log_time",
    numeric: false,
    disablePadding: false,
    label: "Call Log Time",
    isSort: true,
  },
  {
    id: "project_id",
    numeric: true,
    disablePadding: false,
    label: "Project ID",
    isSort: true,
  },
  {
    id: "project_external_topic",
    numeric: false,
    disablePadding: false,
    label: "Project External Topic",
    isSort: true,
  },
  {
    id: "parent_project_name",
    numeric: false,
    disablePadding: false,
    label: "Project Name - Client",
    isSort: false,
  },
  {
    id: "account_manager",
    numeric: false,
    disablePadding: false,
    label: "Account Manager",
    isSort: true,
  },
  {
    id: "client_compliance_date",
    numeric: false,
    disablePadding: false,
    label: "Client Compliance Date",
    isSort: true,
  },
  {
    id: "client_compliance_responses",
    numeric: false,
    disablePadding: false,
    label: "Client Compliance Responses",
    isSort: false,
  },
];


export const getMinWidth = (key: string): string => {
  switch (key) {
    case "call_id":
    case "expert_id":
    case "project_id":
      return "80px";
    
    case "expert_name":
    case "client_contact_name":
    case "account_manager":
      return "150px";
    
    case "current_company_name":
    case "current_company_designation":
      return "200px";
    
    case "expert_type":
    case "premium_expert":
    case "current_us_govt_employee":
    case "local_to_local":
    case "call_medium":
    case "call_type":
    case "call_status":
      return "120px";
    
    case "base_location":
    case "billing_city":
    case "billing_country":
      return "130px";
    
    case "client_contact_email":
      return "180px";
    
    case "payable_mins":
    case "chargeable_mins":
    case "billable_currency":
    case "selling_price":
    case "billing_amount":
    case "multiplier":
      return "100px";
    
    case "casecode":
      return "110px";
    
    case "call_date":
    case "client_compliance_date":
      return "120px";
    
    case "project_external_topic":
    case "parent_project_name":
    case "call_medium_reason":
      return "170px";
    
    case "client_compliance_responses":
      return "250px";
    case "call_log_time":
      return "150px";
    
    default:
      return "initial";
  }
};

export const UsageTableView = [
  {
    label: "Client View",
    value: "client"
  },
  {
    label: "Internal View",
    value: "internal"
  }
]

export const allCheckBox = [
  { label: "Call ID", value: "call_id" },
  { label: "Expert ID", value: "expert_id" },
  { label: "Expert Name", value: "expert_name" },
  { label: "Expert Type", value: "expert_type" },
  { label: "Premium Expert", value: "premium_expert" },
  {label: "Current Company Name", value: "current_company_name"},
  {label: "Current Company Designation", value: "current_company_designation"},
  { label: "Base Location", value: "base_location" },
  { label: "Current US Govt Employee", value: "current_us_govt_employee" },
  { label: "Client Contact Name", value: "client_contact_name" },
  { label: "Client Contact Email", value: "client_contact_email" },
  { label: "Billing City", value: "billing_city" },
  { label: "Billing Country", value: "billing_country" },
  { label: "Local to Local", value: "local_to_local" },
  { label: "Payable Mins", value: "payable_mins" },
  { label: "Chargeable Mins", value: "chargeable_mins" },
  { label: "Billable Currency", value: "billable_currency" },
  { label: "Selling Price", value: "selling_price" },
  { label: "Billing Amount", value: "billing_amount" },
  { label: "Multiplier", value: "multiplier" },
  { label: "Case Code", value: "casecode" },
  { label: "Call Medium", value: "call_medium" },
  { label: "Call Medium Reason", value: "call_medium_reason"},
  { label: "Call Type", value: "call_type" },
  { label: "Call Status", value: "call_status" },
  { label: "Call Date", value: "call_date" },
  { label: "Call Log Time", value: "call_log_time" },
  { label: "Project ID", value: "project_id" },
  { label: "Project External Topic", value: "project_external_topic" },
  { label: "Project Name - Client", value: "parent_project_name" },
  { label: "Account Manager", value: "account_manager" },
  { label: "Client Compliance Date", value: "client_compliance_date" },
  { label: "Client Compliance Responses", value: "client_compliance_responses" },
]

export const defaultDialog = {
  show_answers: {
      state: false,
      compliances: null
  }
}

export const handleClose = (setDialog: SetDialog) => {
  setDialog(defaultDialog);
}

interface KeyMapping {
  [key: string]: string;
}

export const generateDownloadKeyTitleObject = (keysString: string): KeyMapping => {
  const keyMapping: KeyMapping = {
      call_id: "Call ID",
      expert_id: "Expert ID",
      expert_name: "Expert Name",
      expert_type: "Expert Type",
      premium_expert: "Premium Expert",
      current_company_name: "Current Company Name",
      current_company_designation: "Current Company Designation",
      base_location: "Base Location",
      current_us_govt_employee: "Current US Govt Employee",
      client_contact_name: "Client Contact Name",
      client_contact_email: "Client Contact Email",
      billing_city: "Billing City",
      billing_country: "Billing Country",
      local_to_local: "Local to Local",
      payable_mins: "Payable Mins",
      chargeable_mins: "Chargeable Mins",
      billable_currency: "Billable Currency",
      selling_price: "Selling Price",
      billing_amount: "Billing Amount",
      multiplier: "Multiplier",
      casecode: "Case Code",
      call_medium: "Call Medium",
      call_medium_reason: "Call Medium Reason",
      call_type: "Call Type",
      call_status: "Call Status",
      call_date: "Call Date",
      call_log_time: "Call Log Time ",
      project_id: "Project ID",
      project_external_topic: "Project External Topic",
      parent_project_name: "Project Name - Client",
      account_manager: "Account Manager",
      client_compliance_date: "Client Compliance Date",
      client_compliance_responses: "Client Compliance Responses",
  };

  const keys: string[] = keysString.split(',');
  const result: KeyMapping = {};

  keys.forEach((key: string) => {
      const trimmedKey: string = key.trim();
      if (trimmedKey in keyMapping) {
          result[trimmedKey] = keyMapping[trimmedKey];
      } else if (trimmedKey === "client_compliance_responses.answers") {
          result["client_compliance_responses"] = keyMapping["client_compliance_responses"];
      }
  });

  return result;
};

export const defaultCalendarFilter: IsCalenderTypes = {
  open: false,
  value: "after " + LocalDayjs(getMonth(6)).format("DD/MM/YYYY"),
  type: "call_start_time",
  date: LocalDayjs(getMonth(6)),
  tDate: null,
  select: "after"
}