import { generateClientCardsUrl } from "../../../organisms/client/all-clients/helper";
import { filter } from "../../../organisms/client/all-clients/types";
import { getDownloadUrl } from "../../../utils/utils";

export const SortBy = [
  {
    label: <p>ID ( &uarr; )</p>,
    value: "asc___id",
  },
  {
    label: <p>ID ( &darr; )</p>,
    value: "desc___id",
  },
  {
    label: <p>Name ( A &rarr; Z )</p>,
    value: "asc___name",
  },
  {
    label: <p>Name ( Z &rarr; A )</p>,
    value: "desc___name",
  },
  {
    label: <p>Contract Expire Validity (Most Recent First)</p>,
    value: "asc___contract_valid_till",
  },
  {
    label: <p>Contract Expire Validity (Farthest First)</p>,
    value: "desc___contract_valid_till",
  },
  { label: <p>Added On ( New &rarr; Old )</p>, value: "desc___created_at" },
  { label: <p>Added On ( Old &rarr; New )</p>, value: "asc___created_at" },
  { label: <p>Updated On ( New &rarr; Old )</p>, value: "desc___updated_at" },

  { label: <p>Updated On ( Old &rarr; New )</p>, value: "asc___updated_at" },
];

export const clientType = [
  {
    label: "All",
    value: "all",
  },
  {
    label: "Venture Capital/Private Equity",
    value: "Venture Capital/Private Equity",
  },
  { label: "Hedge funds/Public Markets", value: "Hedge funds/Public Markets" },
  { label: "Research and Consulting", value: "Research and Consulting" },
  { label: "Corporations and Companies", value: "Corporations and Companies" },
];

export const calenderDialogTitles = [
  {
    label: "Updated at",
    value: "updated_at",
  },
  {
    value: "created_at",
    label: "Created at",
  },
];

export const generateClientsDownloadUrl = (filters: filter) => {
  const api_url = generateClientCardsUrl(filters);

  const title = "Client (Upto 1000 results are shown in this report)"

  const columns_keys_arr = [
    "id",
    "fk_cem",
    "fk_cem_value.name",
    "fk_cem_value.email",
    "contract_valid_till",
    "projectsCount",
    "callsDone",
    "servicedProjectsCount",
    "client_specific_compliance_requirement"

  ]
  const column_titles_arr = [
    "Client ID",
    "CEM ID",
    "CEM Name",
    "CEM Email",
    "Contract Valid Till",
    "Project Count",
    "Calls Done",
    "Serviced Projects",
    "Client Specific Compliance Requirement"
  ]

  return getDownloadUrl(title, columns_keys_arr, column_titles_arr, api_url);

}