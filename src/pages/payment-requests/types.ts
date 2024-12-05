import { Dispatch, SetStateAction } from "react";
import { ViewInvoiceType } from "../../organisms/calls/view-invoice/types";

export type CallsData = {  
  call_start_time: string;
  cost_price: number;
  cost_price_currency: string;
  id: number;
  payable_mins: number;
  title: string;
  remark: string | null;
}

export type RowData = {
    id: number;
    expert_id: number;
    expert_name: string;
    total_calls: number;
    callIds: string;
    amount: string;
    tds_amount: number;
    review_remarks: string | null;
    currency: string;
    request_generated_by: {title:string , name:any};
    requested_on: string;
    reviewed_on: string | null;
    invoice: string;
    status: string;
    high_priority: string | null;
    infollion_remarks_details: string;
    invoice_no: string | null;
    auto_generated: string;
    actions: string[];
    calls: CallsData[];
    bankAccountValue: BankAccountValue;
    declaration_date: string | null;
    no_pe_certificate: string | null;
  };
  
  export type RowsData = RowData[];
  
  export enum TransactionType {
    BonusAdhocPaymentToExpert = 'Bonus/Adhoc Payment to expert',
    ExchangeRateBankChargesReimbursement = 'Exchange Rate / Bank Charges Reimbursement',
    PaymentRequestedForCalls = 'Payment Requested For Calls',
    PaymentDoneViaBankTransfer = 'Payment done via bank transfer',
    TDS = 'TDS',
    CallsPayableAmountIncreased = "Call's Payable amount is increased",
    CallsPayableAmountDecreased = "Call's Payable amount is decreased",
    CallDeleted = 'Call Deleted',
    PaymentReceivedFromExpert = 'Payment received from expert',
}


// Common fields shared between all bank account types
interface BaseBankAccountValue {
  id: number;
  fk_expert: number;
  country: string;
  bank_country_code: string;
  gstin: string | null;
  pan: string | null;
  account_holder_name: string;
  created_by: number;
  updated_by: number;
  created_at: string;
  updated_at: string;
  s3_updated: boolean;
}

// Type for Indian bank account details
interface IndianBankDetails {
  gst_name: string | null;
  bank_name: string;
  ifsc_code: string;
  is_itr_ack: number;
  gst_address: string | null;
  bank_address: string;
  account_number: string;
  registered_under_msme_act: number;
}

// Type for international bank account details
interface InternationalBankDetails {
  bank_name: string;
  swift_code: string;
  bank_address: string;
  account_number: string;
  account_holder_address: string;
  account_holder_residing_country: string;
  routing_code?: string; // Optional, typically for US accounts
  reason_for_different_country?: string; // Optional field
}

// Complete type for Indian bank accounts
export interface IndianBankAccountValue extends BaseBankAccountValue {
  bank_country_code: 'IND';
  bank_details: IndianBankDetails;
}

// Complete type for international bank accounts
export interface InternationalBankAccountValue extends BaseBankAccountValue {
  bank_country_code: 'USA' | 'BGD' | string; // Add other country codes as needed
  bank_details: InternationalBankDetails;
}

// Union type for all possible bank account values
type BankAccountValue = IndianBankAccountValue | InternationalBankAccountValue;

  export interface TransactionData {
    id: number;
    fk_expert: number;
    fk_expert_value?: {
        id: number;
        name: string;
        user_id: number;
        no_pe_certificate: string | null;
    };
    fk_creator_value?: {
        id: number;
        name: string;
    };
    reviewed_by_value?: {
      id: number;
      name: string;
    };
    calls: CallsData[];
    narration: string;
    fk_calls?: string | null;
    type: TransactionType;
    amount: number;
    tds_amount: number;
    fk_creator: number;
    transaction_date: string;
    recorded_at: string;
    bank_account_id_value: BankAccountValue;
    invoice_num: string | null;
    transaction_document_url?: string | null;
    declaration_date?: string | null;
    currency?: string | null;
    amount_in_usd?: number;
    amount_in_inr?: number;
    status?: "Requested" | "Approved" | "On Hold" | "Rejected";
    reviewed_by?: number | null;
    reviewed_on?: string | null;
    high_priority?: boolean;
    review_remarks?: string | null;
    infollion_generated_invoice?: boolean;
}

export type Dialog = {
  approveRejectHold: {
    state: boolean;
    rowData: RowData | null;
  };
  callDetails: {
    state: boolean;
    rowData: RowData | null;
  };
  bulkPayments: {
    title: string | null;
    state: boolean;
  };
  invoice: {
    invoice_url: string | null;
    state: boolean;
  },
  invoice_num: {
    state: boolean;
  },
  download: {
    state: boolean;
  },
  editTdsAmount: {
    state: boolean;
    row_data: RowData | null;
  },
  editDeclarationDate: {
    state: boolean;
    rows_data: RowsData;
    isBulk: boolean;
  }
}

export type SetDialog = Dispatch<SetStateAction<Dialog>>

export type PaymentRequestContextType = {
  setDialog: SetDialog;
  dialog: Dialog;
  refetchData(): Promise<void>;
  filters: Filters;
  setFilters: SetFilters;
  FinanceUsers: {label: any,value: any}[] | null;
}

export type Filters = {
  expert_id: string | null;
  expert_name: string | null;
  total_calls: string | null;
  call_id: string | null;
  invoice_num: string | null;
  amount_range: number[];
  currency: string[];
  generated_by: string;
  requested_on: string | null;
  status: string;
  high_priority: boolean;
  auto_generated: string | null;
  payment_location: string;
  isFilterChange: boolean;
  isFilterApplied: boolean;
  rowsPerPage: number;
  search_review: string | null;
  reviewed_by: string;
}

export type SetFilters = Dispatch<SetStateAction<Filters>>;

export type Select = {
  isClicked: boolean;
  selectedCards: RowData[];
  callAction: "approve" | "onHold" | "reject" | "undo_reject" | null;
};

export type SetSelect = Dispatch<SetStateAction<Select>>;