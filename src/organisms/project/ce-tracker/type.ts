import { Dispatch, SetStateAction } from "react";
import { Person } from "../../../pages/ce-mapping-expert/types";

export type RowsData = {
    id: number;
    expert_name?: string;
    status: string;
    current_company_name: string;
    current_designation: string;
    relevant_company_name: string;
    relevant_designation: string;
    expert_base_location: string;
    added_on: string;
    last_updated: string;
    excluded: boolean;
}

export type Select = {
    isClicked: boolean;
    selectedCards: RowsData[];
    callAction: string | null;
}

export type SetSelect = Dispatch<SetStateAction<Select>>

export type Filters = {
    date: string | null;
    current_company: string | null;
    relevant_company: string | null;
    base_location: string | null;
    name_masking: boolean;
    masking_change: boolean;
    added_on_masking: boolean;
    last_updated_on_masking: boolean;
    isFilterApplied: boolean;
    isFilterChange: boolean;
}

export type SetFilters = Dispatch<SetStateAction<Filters>>

export type CETrackerContextType = {
    filters: Filters,
    setFilters: SetFilters
}

// Define the main response structure
export type GetCEExpertsResponseData = {
    data: Person[];
    filtered_data: Person[];
    total: number;
    page: number;
    totalPages: number;
    excluded_ce_expert_ids?: string;
    masking?: string;
}