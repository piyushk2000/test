import { Dispatch, SetStateAction } from "react";

export interface ZoomMeetingParticipantsResponse {
    success: boolean;
    message: string;
    data: Array<Participant>;
}

export interface Participant {
    id: string;
    user_id: string;
    name: string;
    user_email: string; // Assuming email is a string
    join_time: string; // Assuming it's ISO 8601 format
    leave_time: string; // Assuming it's ISO 8601 format
    duration: number;
    attentiveness_score: string;
    failover: boolean;
    status: string;
    customer_key: string;
}

interface ResponseData {
    page_count: number;
    page_size: number;
    total_records: number;
    next_page_token: string;
    participants: Participant[];
}

export interface ZoomReportsApiResponse {
    success: boolean;
    message: string;
    data: ResponseData;
}

export type ZoomDialogOpen = { zoomID: string | null, state: boolean }

export type SetZoomDialogOpen = Dispatch<SetStateAction<ZoomDialogOpen>>;