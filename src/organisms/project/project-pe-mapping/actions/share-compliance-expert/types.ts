import { Dispatch, SetStateAction } from "react";

interface ShowIf {
  qid: string;
  chosen_option_position: number;
}

interface BaseQuestion {
  qid: number | string;
  type: "enum" | "text" | "number";
  question: string;
  mandatory?: number;
  show_if?: ShowIf;
}

interface EnumQuestion extends BaseQuestion {
  type: "enum";
  options: string[];
  correct_answer?: number;
  respondant_answer?: string;
  auto_reject_on_incorrect_answer?: number;
}

interface TextQuestion extends BaseQuestion {
  type: "text";
  max_length?: number;
  min_length?: number;
}

interface NumberQuestion extends BaseQuestion {
  type: "number";
  max_value?: number;
  min_value?: number;
  max_length?: number;
  min_length?: number;
}

export type ComplianceQuestion = EnumQuestion | TextQuestion | NumberQuestion;

export type CompliancesData = {
  title: string;
  description: string;
  fk_client: number;
  fk_creator: number;
  updated_by: number;
  id: number;
  questions: ComplianceQuestion[];
  state: "Active" | "InActive";
  updated_at: string;
  created_at: string;
}

export type FormDefaultValues = {
  compliance: null | number;
}

export type FormattedCompliances =  { label: string, value: string }[]
