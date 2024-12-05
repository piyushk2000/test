import { ProjectCalendarFilters } from "./type";

export const defaultFilters: ProjectCalendarFilters = {
  myZoomCall: false,
  showAvailablity: true,
  status: ["Scheduled", "Completed", "Confirmed", "Payment Requested", "Paid"],
  expert: null,
  client: null,
  date: null,
  am: null
};

export const defaultLogCall = {
  state: false,
  isChange: false,
  project_id: null,
  refetch: null,
  pe_id: null,
  expert_id: null,
  is_account_manager: false,
  is_group_admin: false,
  selected_call: null
}