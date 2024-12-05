import { Dispatch, SetStateAction } from "react";



export interface ExchangeRateContextType {
    filters: Filters;
    setFilters: SetFilters;
    refetch: () => Promise<void>;
    data: ExchangeRateData | null;
    loadingData: boolean;
    dialog: Dialog;
    setDialog: SetDialog;
}

export interface Filters {
    isFilterChange: boolean;
    date: string | null;
    currency: string;
    isFilterApplied: boolean;
}

export type SetFilters = Dispatch<SetStateAction<Filters>>;

export interface Data {
    id: number;
    date: string;
    currency: string;
    buy_rate: number;
    sell_rate: number | null;
}

export type ExchangeRateData = Data[];

export type DefaultFormValue = { date: {label: string, value: string} | null };

export type ExcelFile = File | null;
export type SetExcelFile = Dispatch<SetStateAction<ExcelFile>>;

export type DateOptions = {label: string, value: string}[] | null;
export type SetDateOptions = Dispatch<SetStateAction<DateOptions>>;

export type Dialog = {
    add: {
        state: boolean;
    }
}

export type SetDialog = Dispatch<SetStateAction<Dialog>>;