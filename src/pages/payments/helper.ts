import { APIRoutes } from "../../constants";
import { LocalDayjs } from "../../utils/timezoneService";
import { Filters, RowsData, TransactionData } from "./types";

export function getRowsData(data: TransactionData[] | null) {
  if (!data?.length) return [];

  const rowsData: RowsData = data.map((d) => ({
    id: d.id,
    expert_id: d.fk_expert,
    type: d.type,
    narration: d.narration,
    amount: `${d?.currency || ""} ${d.amount?.toFixed(2)}`,
    amount_in_usd: d.amount_in_usd?.toFixed(2),
    amount_in_inr: d.amount_in_inr?.toFixed(2),
    date: LocalDayjs(d.transaction_date)?.format("DD MMM YYYY"),
    doc_link: d.transaction_document_url,
  }));

  return rowsData;
}

export const defaultFilterValues: Filters = {
  search_narration: "",
  expertID: null,
  sortBy: "desc___transaction_date",
  type: "",
  isFilterChange: false, // This is use to refetch the data
  isFilterApplied: false, // This is to know that if some filter is applied or not, false => Only when no filter is applied and vice-versa
};

export const getRefetchUrl = (filters: Filters) => {
  let url = APIRoutes.getPayments;
  const { sortBy, type, expertID, search_narration } = filters;

  // Sort by Filter
  url += "?sort_by=" + sortBy;

  // Type Filter
  if (type) {
    url += "&type=" + type;
  }

  // expert ID Filter
  if (expertID) {
    url += "&fk_expert=" + expertID;
  }

  // Search by narration
  if (search_narration) {
    url += "&like___narration=" + search_narration;
  }

  return url;
};
