import { Dispatch, SetStateAction } from "react";

export interface TransactionData {
  id: number;
  fk_expert: number;
  narration: string;
  fk_calls: string | null;
  type: string;
  amount: number;
  currency: string;
  amount_in_usd: number;
  amount_in_inr: number;
  fk_creator: number;
  transaction_date: string;
  recorded_at: string;
  transaction_document_url: string | null;
}

export interface PaymentsApiResponse {
  success: boolean;
  message: string;
  data: TransactionData[];
}

export type Mode = "card" | "list";

export type SetMode = Dispatch<SetStateAction<Mode>>;

export type PaymentsContextType = {
  mode: Mode;
  setMode: SetMode;
  data: TransactionData[] | null;
  rowsData: RowsData | null;
  filters: Filters;
  setFilters: SetFilters;
};

export type RowData = {
  id: number;
  expert_id: number;
  type: string;
  narration: string;
  amount: string;
  amount_in_usd: string;
  amount_in_inr: string;
  date: string;
  doc_link: string | null;
};

export type RowsData = RowData[];

export type SetRowData = Dispatch<SetStateAction<RowsData>>;

export type Filters = {
  expertID: string | null;
  search_narration: string;
  sortBy: string;
  type: string;
  isFilterChange: boolean;
  isFilterApplied: boolean;
};

export type SetFilters = Dispatch<SetStateAction<Filters>>;
