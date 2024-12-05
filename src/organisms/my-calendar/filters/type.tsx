type labelValueType = { label: string, value: number }[]

export type FormData = {
    group: labelValueType;
    am: labelValueType;
    client: labelValueType;
    filtered_am: labelValueType;
    filtered_client: labelValueType;
    client_filter_am: labelValueType;
    expert_filter_poc: labelValueType;
}

export type GroupAMFormData = {
    group: labelValueType;
    am: labelValueType;
}

export type ClientFormData = {
    client: labelValueType;
}

export type ExpertClientAMPOC = {
    am: labelValueType;
    poc: labelValueType;
}

interface AccountManagerValue {
    name: string;
    id: number;
}

export interface AccountManager {
    account_manager: number;
    account_manager_value: AccountManagerValue;
}

export interface AccountManagersResponse {
    success: boolean;
    message: string;
    data: AccountManager[];
}


export interface ClientAMResponseData {
    account_managers: AccountManagerValue[];
    client_participants: number;
}

export interface ClientAMResponse {
    success: boolean;
    message: string;
    data: ClientAMResponseData;
}

interface User {
    id: number;
    user_id: number;
    salutation: string;
    name: string;
    email: string;
    mobile: string;
    designation: string | null;
    fkClient: number;
    created_at: string;
    updated_at: string;
}

export interface ResponseData {
    success: boolean;
    message: string;
    data: User[];
}
