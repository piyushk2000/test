import Checkbox from "@mui/material/Checkbox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { Dayjs } from "dayjs";
import { callsDefaultFilter } from "../../pages/Calls/helpers";

const Icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const CheckedIcon = <CheckBoxIcon fontSize="small" />;

type labelValueType = {
  label: string;
  value: number;
};

type labelType = { label: string; value: string };

export const CheckboxOptions = (props: any, option: any, { selected }: any) => (
  <li {...props} key={option.value}>
    <Checkbox
      icon={Icon}
      checkedIcon={CheckedIcon}
      style={{ marginRight: "8px" }}
      checked={selected}
    />
    {option?.label}
  </li>
);

export const statusOptions: labelType[] = [
  { label: "Scheduled", value: "Scheduled" },
  { label: "Completed", value: "Completed" },
  { label: "Confirmed", value: "Confirmed" },
  { label: "Payment Requested", value: "Payment Requested" },
  { label: "Payment Declined", value: "Payment Declined" },
  { label: "Payment Approved", value: "Payment Approved" },
  { label: "Payment on Hold", value: "Payment on Hold" },
  { label: "Paid", value: "Paid" },
  { label: "Partially Paid", value: "Partially Paid" }
]

export const callMediumOptions: labelType[] = [
  { label: "Internal - Automated", value: "Internal - Automated" },
  { label: "Internal - Manual", value: "Internal - Manual" },
  { label: "Client - Automated", value: "Client - Automated" },
  { label: "Client - Manual", value: "Client - Manual" },
  { label: "Others", value: "Others" }
];

export type FilterType = {
  min_cp: null | number;
  max_cp: null | number;
  min_sp: null | number;
  max_sp: null | number;
  call_start_time: null | Dayjs;
  call_end_time: null | Dayjs;
  case_code: string;
  research_analyst: null | labelValueType[];
  account_manager: null | labelValueType;
  expert: null | labelValueType;
  client: null | labelValueType;
  project: null | labelValueType;
  status: labelType[];
  call_medium: labelType[];
  call_type: labelType | null;
};

export const formDefaultValues = (client_id: string | null, client_name: string | null, expert_id: string | null, expert_name: string | null): any => {

  const filter = {
    min_cp: null,
    max_cp: null,
    min_sp: null,
    max_sp: null,
    call_start_time: null,
    call_end_time: null,
    case_code: "",
    research_analyst: [],
    account_manager: null,
    client: null,
    project: null,
    status: [],
    call_medium: [],
    call_type: null,
    ...callsDefaultFilter(client_id, client_name, expert_id, expert_name)
  }

  return filter;
};

export const getQueryFromFilters = (formData: Partial<FilterType>) => {
  const payload: Record<string, string> = {};
  const {
    min_cp,
    max_cp,
    min_sp,
    max_sp,
    call_start_time,
    call_end_time,
    case_code,
    research_analyst,
    account_manager,
    expert,
    client,
    project,
    status,
    call_medium,
    call_type
  } = formData;

  if (min_cp) {
    payload.greaterthanequalto___cost_price = min_cp.toString();
  }

  if (max_cp) {
    payload.lessthanequalto___cost_price = max_cp.toString();
  }

  if (min_sp) {
    payload.greaterthanequalto___selling_price = min_sp.toString();
  }

  if (max_sp) {
    payload.lessthanequalto___selling_price = max_sp.toString();
  }

  if (call_start_time) {
    payload.greaterthanequalto___call_start_time = `${call_start_time.format(
      "YYYY-MM-DD"
    )}T00:00:00.000Z`;
  }

  if (call_end_time) {
    payload.lessthanequalto___call_start_time = `${call_end_time.format(
      "YYYY-MM-DD"
    )}T23:59:59.000Z`;
  }

  if (case_code) {
    payload.casecode = case_code;
  }

  if (research_analyst && research_analyst.length) {
    payload.in___research_analyst = research_analyst.map(i => i.value).join(",");
  }

  if (account_manager) {
    payload.in___account_manager = account_manager.value.toString();
  }
  if (expert) {
    payload.fk_expert = expert.value.toString();
  }
  if (project) {
    payload.fk_project = project.value.toString();
  }
  if (client) {
    payload.fk_client = client.value.toString();
  }
  if (status && status.length) {
    payload.in___status = status.map(i => i.value).join(",");
  }
  if (call_medium && call_medium.length) {
    payload.in___call_medium = call_medium.map(i => i.value).join(",");
  }

  if (call_type) {
    payload.call_type = call_type.value;
  }

  const queryString = Object.entries(payload).map(item => `${item[0]}=${item[1]}`).join("&")

  return queryString;
};
