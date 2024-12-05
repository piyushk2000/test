import { Dispatch, SetStateAction } from "react";
import { RowsData } from "../../organisms/ce-mapping-experts/types";
import { Dayjs } from "dayjs";

// Define types for nested structures first
type Snippet = {
    heading: string;
    description: string;
}

type Education = {
    course: string;
    end_year: string;
    start_year: string;
    institution: string;
}

type Webhandle = {
    link: string;
    portal: string;
}

type Company = {
    name: string;
    designation: string;
}

type BaseLocationValue = {
    id: number;
    name: string;
}

// Define the main Meta type
export type Meta = {
    awards: any[];
    patents: any[];
    snippets: Snippet[];
    education: Education[];
    webhandles: Webhandle[];
    publications: any[];
    current_company: Company | null;
    relevant_company: Company | null;
    current_company_tag: string;
    totalRatingCount?: number;
    tutorial_completion_link?: string;
    client_priority?: boolean;
    fk_project_added?: {
        added_by: number,
        added_on: string,
        added_by_name: string
    }
}

// Define the main Person type
export type Person = {
    id: number;
    meta: Meta;
    name: string;
    status: string;
    base_location: number;
    base_location_value: BaseLocationValue;
    last_status_updated_on: string;
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

export type SetGetCEExpertsResponseData = Dispatch<SetStateAction<GetCEExpertsResponseData | null>>;

export type FiltersPayload = {
    rowsPerPage: number;
    isFilterChange: boolean;
    current_company: string | null;
    relevant_company: string | null;
    base_location: string | null;
    date: string | null;
    isFilterApplied: boolean;
}

export type SetFiltersPayload = Dispatch<SetStateAction<FiltersPayload>>;

export type Dialog = {
    prioritizeExpert: {
        state: boolean;
        rowData: RowsData | null;
    },
    loginToContinue: {
        state: boolean;
    }
}

export type SetDialog = Dispatch<SetStateAction<Dialog>>;

export type ProjectClientDetails = {
    nameMasking: boolean,
    addedOnMasking: boolean,
    lastUpdatedMasking: boolean
}

export type setProjectClientDetails = Dispatch<SetStateAction<ProjectClientDetails>>

export type CEMappingExpertContextType = {
    dialog: Dialog,
    setDialog: SetDialog,
    filters: FiltersPayload,
    setFilters: SetFiltersPayload,
    data: GetCEExpertsResponseData | null,
    code: string,
    project_id: string | null,
    refetch(): Promise<void>,
    projectClientDetails: ProjectClientDetails,
    isCalender: CalenderTypes,
    setCalender: Dispatch<SetStateAction<CalenderTypes>>
}

export type CalenderTypes = {
    open: boolean;
    value: string;
    type: any;
    select: "between" | "on" | "before" | "after" | null;
    date: Dayjs | null,
    tDate: Dayjs | null,
};

export type SetCalender =  Dispatch<SetStateAction<CalenderTypes>>;