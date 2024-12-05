import { Dispatch, SetStateAction } from "react";
import { Dayjs } from "dayjs";
import { projectApiDataItem } from "../../../pages/Projects/types";
import { Groups } from "../../admin/types";
type labelValueType = { label: string; value: number }[];
type labelValueString = { label: string; value: string }[];

export type FormData = {
  group: labelValueType;
  am: labelValueType;
};

export type ClientFormData = {
  client: labelValueType;
};

export type AMFormData = {
  am: labelValueType;
};

export interface MyCalls {
  [id: string]: MyCall[];
}

export type AccordianExpanded = {
  status: boolean;
  client: boolean;
  am: boolean;
};

export type FormOptions = {
  am: labelValueType;
  client: labelValueType;
};

export type SetFormOptions = Dispatch<SetStateAction<FormOptions>>;

export type SetAccordianExpanded = Dispatch<SetStateAction<AccordianExpanded>>;

export type MyCalenderFilterType = {
  expanded: AccordianExpanded;
  setExpanded: SetAccordianExpanded;
  formOptions: FormOptions;
};

export type MyCalenderType = {
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
};

export type Filters = {
  tab: string;
  arrange_tag: string;
  calendarDate: Dayjs | null;
  isFilterChange: boolean;
  isFilterApplied: boolean;
};

export type SetFilters = Dispatch<SetStateAction<Filters>>;

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
  fk_project: number;
  fk_expert_value: FkExpertValue;
  client_participants_value: ClientParticipantsValue[];
  fk_project_value?: projectApiDataItem;
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

export type SetDateType = (date: Dayjs) => void;

export type FiltersProjectCalendar = {};
