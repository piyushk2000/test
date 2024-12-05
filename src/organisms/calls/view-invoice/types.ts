// Define types for the inner structures

import { Dispatch, SetStateAction } from "react";
import { PrimaryBankValue } from "../../project/project-pe-mapping/actions/share-profile/email-format-dialog/types";

interface BilledTo {
  name: string;
  address: string;
  email: string;
}

interface LineItem {
  call_id: number;
  call_title: string;
  call_start_time: string;
  cost_price_per_hour: number;
  cost_price_currency: string;
  payable_mins: number;
  total: string;
}

export interface Invoice {
  invoice_no: string;
  invoice_date: string;
  expert_name: string;
  expert_address: string;
  expert_email: string;
  expert_phone: string;
  billed_to: BilledTo;
  line_items: LineItem[];
  subtotal: string;
  tax: number;
  total_amount: string;
  currency: string;
  bank_account_details: PrimaryBankValue;
}

export type ViewInvoiceType = Invoice | null;
export type SetViewInvoice = Dispatch<SetStateAction<ViewInvoiceType>>;
