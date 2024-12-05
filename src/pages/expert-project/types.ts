export type AgendaResponse = {
  answer: string;
  question: string;
  expert_note: string | null;
};

export type Meta = {
  snippet?: string;
  selling_price?: number;
  snippet_title?: string;
  time_multiplier?: number;
  selling_price_currency?: string;
  project_invitation_link?: string;
};

type Project = {
  id: number;
  external_topic: string;
  status: string;
};

type AgendaValue = {
  id?: number;
  agenda?: {
    questions?: string[];
  };
};

export type ExpertProjectDetails = {
  id: number;
  calls_scheduled: number | null;
  calls_completed: number | null;
  expert_invitation: "Invited" | "Accepted" | "Declined" | null;
  agenda_status: string | null;
  state: string;
  relevant_company: string;
  relevant_designation: string;
  agenda_shared_on: string | null;
  fk_agenda: number | null;
  agenda_responses: AgendaResponse[] | null;
  compliance_shared: boolean;
  compliance_responses: any; // Replace 'any' with the correct type if known
  fk_project_value: Project;
  fk_agenda_value: AgendaValue | null;
  meta: Meta;
};

export type ExpertProjectApiResponse = {
  success: boolean;
  message: string;
  data: ExpertProjectDetails[];
};
