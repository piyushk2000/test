export interface CreatorValue {
    id: number;
    name: string;
    role: string;
}

export interface UpdatedByValue {
    id: number;
    name: string;
    role: string;
}

export interface ApprovedByValue {
    id: number;
    name: string;
    role: string;
}

export interface ExpertsApiData {
    data: Expert[];
}
export interface Meta {
    webhandles: Webhandle[];
    contact_medium?: string;
    current_company?: Company;
    relevant_company?: Company;
    current_company_tag?: string;
    awards?: Award[];
    patents?: Patent[];
    snippets?: Snippet[];
    education?: Education[];
    publications?: Publication[];
    tutorial_completion_link?: string;
    approved_by_name?: string;
    totalRatingCount?: number;
    client_priority?: {
        prioritize_expert: string,
        remark: string
    }
    fk_project_added: {
        added_by: number,
        added_on: string,
        added_by_name: string
    }
}

interface Webhandle {
    link: string;
    portal: string;
}

interface Company {
    name: string;
    designation: string;
}

interface Award {
    date?: string | null;
    title?: string | null;
    description: string;
}

interface Patent {
    // Define properties if any
}

interface Snippet {
    heading: string;
    description: string;
}

interface Education {
    course: string;
    start_year: string;
    end_year: string;
    institution: string;
}

interface Publication {
    // Define properties if any
}

interface IDName {
    id: number;
    name: string;
}

export interface Expert {
    webhandles: any;
    id: number;
    name: string;
    type: string;
    status: string;
    primary_mobile: string | null;
    primary_email: string;
    approved_by: number | null;
    price_per_hour: number | null;
    picture: string | null;
    price_per_hour_currency: string | null;
    premium_expert: boolean;
    meta: Meta;
    bio: string | null;
    domain_l0: number | null;
    domain_l1: number | null;
    domain_l2: number | null;
    functions: string | null;
    updated_at: string;
    created_at: string;
    badge: "Ace" | "Champion" | "Pro" | null;
    confirmed_on: string | null;
    pending_edits: number;
    headline: string | null;
    fk_creator_value: CreatorValue;
    updated_by_value: UpdatedByValue;
    approved_by_value: ApprovedByValue | null;
    base_location: number;
    fk_project: number;
    domain_other: string;
    base_location_value: IDName;
    domain_l0_value: IDName;
    domain_l1_value: IDName;
    domain_l2_value: IDName;
    domain_l3_value: IDName;
    expert_geographies: string[];
    expert_geographies_value: {
        id: number;
        name: string;
        type: string;
        created_at: any;
        updated_at: any;
    }[];
    fk_project_value: {
        id: number;
        topic: string;
    };
    dnd_enabled: boolean;
    work_experiences: Work_ex[];
    calls_data: {
        badCallCount: number;
        callCount: number;
        projectCount: number;
        projects: string;
      }
}

export type Work_ex = {
    id: number;
    company: string;
    status: string;
    designation: string;
    location: string;
    expert_id: number;
    start_date: string;
    end_date: string;
    currently_works_here: boolean;
    division: string | null;
  }
  