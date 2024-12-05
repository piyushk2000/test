import { APIRoutes } from "../../constants";
import { Dialog, Filters } from "./types";


export const defaultFilters: Filters = {
    isFilterChange: false,
    date: null,
    currency: 'all',
    isFilterApplied: false
}

export const getUrl = (filters: Filters) => {
    return (
        `${APIRoutes.EXCHANGE_RATE}/data?` +
        (filters.date ? filters.date : "") +
        (filters.currency !== "all" ? `currency=${filters.currency}` : "")
    )
}

export const defaultDialog: Dialog = {
    add: {
        state: false
    }
}

export const acceptedExcelFileTypes = [
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", // .xlsx
    "application/vnd.ms-excel", // .xls
    "application/vnd.oasis.opendocument.spreadsheet", // .ods
    "text/csv", // .csv
    "application/vnd.ms-excel.sheet.macroEnabled.12", // .xlsm
    "application/vnd.ms-excel.sheet.binary.macroEnabled.12", // .xlsb
  ];