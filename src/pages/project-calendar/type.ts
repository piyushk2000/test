import { Dayjs } from "dayjs";
import { ClientContact } from "../Calls/types";
import { ScheduledCalls } from "../../organisms/project-calendar/types";
import { Dispatch, SetStateAction } from "react";

export type ProjectCalendarFilters = {
  myZoomCall: boolean;
  showAvailablity: boolean;
  status: string[];
  expert: {
    label: string;
    value: string;
  } | null;
  client: {
    label: string;
    value: number;
  }[] | null;
  date: Dayjs | null;
  am: {
    label: string;
    value: number;
  }[] | null;
};

export type ProjectCalenderType = {
  filters: ProjectCalendarFilters;
  setFiltersWithKey: <K extends keyof ProjectCalendarFilters>(
    key: K,
    value: ProjectCalendarFilters[K]
  ) => void;
  clientContactOptions: ClientContact[];
  rawCallData: ScheduledCalls | null;
  refetchCallDetails: () => Promise<void>;
  openLogCallDialog: (expert_id: number, call_id: number) => void;
};


export type LogCallType = {
  state: boolean;
  isChange: boolean;
  project_id: number | null;
  refetch: (() => Promise<void>) | null;
  pe_id: string | null;
  expert_id: string | null;
  is_account_manager: boolean;
  is_group_admin: boolean;
  selected_call: number | null;
}

export type SetLogCallType = Dispatch<SetStateAction<LogCallType>>