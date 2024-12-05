import { APIRoutes } from "../../../constants";
import { LocalDayjs } from "../../../utils/timezoneService";
import { getDownloadUrl } from "../../../utils/utils";
import { Data } from "./type";

const getMonths = () => {
  const current_month = LocalDayjs(new Date()).format("MMMM");
  const previous_month = LocalDayjs(new Date())
    .subtract(1, "month")
    .format("MMMM");

  return {
    current_month,
    previous_month,
  };
};

const client_report_url = () => {
  const title = "Client wise revenue in last 2 months";

  const { current_month, previous_month } = getMonths();

  const columns_keys_arr = [
    "client_id",
    "client_name",
    "total_revenue_prev_month",
    "total_revenue_current_month",
  ];
  const column_titles_arr = [
    "Client ID",
    "Client Name",
    `Total Revenue in ${previous_month} ( in USD )`,
    `Total Revenue in ${current_month} ( in USD )`,
  ];
  const api_url = APIRoutes.CLIENT_REPORT;

  return getDownloadUrl(title, columns_keys_arr, column_titles_arr, api_url);
};

const account_manager_url = () => {
  const title = "Account Manager wise revenue in last 2 months";

  const { current_month, previous_month } = getMonths();

  const columns_keys_arr = [
    "account_manager",
    "account_manager_name",
    "total_revenue_prev_month",
    "total_revenue_current_month",
  ];
  const column_titles_arr = [
    "Account Manager ID",
    "Account Manager Name",
    `Total Revenue in ${previous_month} ( in USD )`,
    `Total Revenue in ${current_month} ( in USD )`,
  ];
  const api_url = APIRoutes.AM_REPORT;

  return getDownloadUrl(title, columns_keys_arr, column_titles_arr, api_url);
};

export const rowsData: Data[] = [
  {
    id: 1,
    name: "Client wise revenue in last 2 months",
    report_url: client_report_url(),
  },
  {
    id: 2,
    name: "Account Manager wise revenue in last 2 months",
    report_url: account_manager_url(),
  },
];
