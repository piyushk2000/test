import { Dispatch, MutableRefObject, SetStateAction } from "react";
import { projectApiDataItem } from "../../pages/Projects/types";
import { Dayjs } from "dayjs";
import { Groups } from "../admin/types";
import { FormData } from "./filters/type";
import { LogCallType, SetLogCallType } from "../../pages/project-calendar/type";

export interface MyCalls {
  [id: string]: MyCall[];
}

export type AccordianExpanded = {
  status: boolean;
  teamAM: boolean;
  client: boolean;
  expertClientFilter: boolean;
};

export type SetAccordianExpanded = Dispatch<SetStateAction<AccordianExpanded>>;

export type MyCalenderFilterType = {
  expanded: AccordianExpanded;
  setExpanded: SetAccordianExpanded;
  formOptions: FormData;
  setFormOptions: Dispatch<SetStateAction<FormData>>;
  clearFilter: MutableRefObject<number>;
};

export type labelValueTypeCalendar = { label: string, value: number }[]

export type MyCalenderType = {
  ams:labelValueTypeCalendar;
  setAms:SetAms;
  showFilters: boolean;
  openFilters(): void;
  closeFilters(): void;
  date: DateType;
  setDate: SetDateType;
  CallsDetails: MyCalls | null;
  isMobile: boolean;
  groupData: Groups | null;
  filters: Filters;
  setFilters: SetFilters;
  resetFilters(): void;
  refetchCallsDetails(): Promise<void>;
  formattedCallDetails: CalendarEvent[];
  logCall: LogCallType;
  setLogCall: SetLogCallType;
};

export type Filters = {
  tab: string;
  arrange_tag: "Week" | "Month" | "Day";
  search_by_expert: string;
  calendarDate: Dayjs | null;
  isFilterChange: boolean;
  isFilterApplied: boolean;
  sidebarFilters: {
    status: string;
    group: string | null;
    am: string | null;
    client: string | null;
    zoom_call: boolean;
    zoom_slot: boolean;
    client_am: string | null;
    expert_poc: string | null
  };
};

export type SetFilters = Dispatch<SetStateAction<Filters>>;
export type SetAms = Dispatch<SetStateAction<labelValueTypeCalendar>>;

export interface MyCall {
  id: number;
  title: string;
  status: "Completed" | "Scheduled";
  scheduled_start_time: string;
  scheduled_end_time: string;
  chargeable_mins?: number;
  call_start_time?: string;
  client_participants: string;
  fk_expert: number;
  fk_pe: number;
  fk_project: number;
  fk_expert_value: FkExpertValue;
  client_participants_value: ClientParticipantsValue[];
  fk_project_value?: projectApiDataItem;
  call_link?: string | null;
}

export interface FkExpertValue {
  name: string;
  id: number;
}

export interface ClientParticipantsValue {
  name: string;
  id: number;
}

export type DateType = Dayjs | null;

export type SetDateType = Dispatch<SetStateAction<DateType>>;

export type CalendarEvent =
  | {
      title: string;
      start: string;
      end: string;
      type: string;
      id: string;
      backgroundColor: string;
    }
  | {
      type: "suggested_slot";
      title: string;
      start: string;
      end: string;
      id: string;
      backgroundColor: string;
      clientEvent: CalendarEvent;
      expertEvent: CalendarEvent;
    };