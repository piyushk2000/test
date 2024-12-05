import { Dispatch, SetStateAction } from "react";
import { Data } from "./list-view/types";

export type GroupListState = {
  row: Data[] | null;
};

export type SetGroupListState = Dispatch<SetStateAction<GroupListState>>;

export type GroupDataItem = {
  id: number;
  type: string;
  label: string;
  sublabel: string;
};

export type GroupApiResponse = {
  success: boolean;
  message: string;
  data: GroupDataItem[];
};

export type AdminDataItem = {
  name: string;
  id: number;
};

export type AdminApiResponse = {
  success: boolean;
  message: string;
  data: AdminDataItem[];
};

export type Filters = {
  search: string;
  isFilterChange: boolean;
}

export type SetFilters = Dispatch<SetStateAction<Filters>>;