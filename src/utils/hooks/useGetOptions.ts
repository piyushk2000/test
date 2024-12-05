import { APIRoutes } from "../../constants";
import { useFetch } from "./useFetch";

type OptionType = "project" | "admins" | "experts" | "clients";

type apiData = {
  id: number;
  name: string;
}[];

const formatter = (data: apiData) => {
  return data.map((item) => {
    return { value: item.id, label: item.name };
  });
};

export const useGetOptions = (optionType: OptionType) => {
  let query = "";

  if (optionType == "admins") {
    query = APIRoutes.adminUsers + "&show_columns=id,name";
  } else if (optionType == "clients") {
    query = APIRoutes.clients + "?show_columns=id,name";
  }

  return useFetch(query, { formatter: formatter });
};
