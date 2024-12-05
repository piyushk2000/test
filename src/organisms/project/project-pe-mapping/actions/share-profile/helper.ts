import { Dispatch, SetStateAction } from "react";
import { APIRoutes } from "../../../../../constants";
import { RequestServer } from "../../../../../utils/services";
import { Snippet } from "./fields/snippets";
import { formattedExpertsData } from "./type";

export const sharedAgendaFields = [
  {
    label: "Yes",
    value: "yes",
  },
  {
    label: "No",
    value: "no",
  },
];

export const multiplierOptions = [
  { label: "0.5", value: 0.5 },
  { label: "0.6", value: 0.6 },
  { label: "0.7", value: 0.7 },
  { label: "0.8", value: 0.8 },
  { label: "0.9", value: 0.9 },
  { label: "1.0", value: 1.0 },
  { label: "1.1", value: 1.1 },
  { label: "1.2", value: 1.2 },
  { label: "1.25", value: 1.25 },
  { label: "1.3", value: 1.3 },
  { label: "1.4", value: 1.4 },
  { label: "1.5", value: 1.5 },
  { label: "1.6", value: 1.6 },
  { label: "1.7", value: 1.7 },
  { label: "1.75", value: 1.75 },
  { label: "1.8", value: 1.8 },
  { label: "1.9", value: 1.9 },
  { label: "2.0", value: 2.0 },
  { label: "2.1", value: 2.1 },
  { label: "2.2", value: 2.2 },
  { label: "2.25", value: 2.25 },
  { label: "2.3", value: 2.3 },
  { label: "2.4", value: 2.4 },
  { label: "2.5", value: 2.5 },
  { label: "2.6", value: 2.6 },
  { label: "2.7", value: 2.7 },
  { label: "2.75", value: 2.75 },
  { label: "2.8", value: 2.8 },
  { label: "2.9", value: 2.9 },
  { label: "3.0", value: 3.0 },
];

export function formatExpertsData(data: any) {
  const expertsData: formattedExpertsData = {
    snippets: [],
    name: null,
    relevant_company: { name: null, designation: null },
    picture: null,
    price_per_hour: null,
    price_per_hour_currency: null,
  };

  if (!data && !data[0]) {
    return expertsData;
  }

  expertsData.snippets = data[0]?.meta?.snippets || [];
  expertsData.name = data[0]?.name;
  expertsData.relevant_company = data[0]?.meta?.relevant_company;
  expertsData.picture = data[0]?.picture;
  expertsData.price_per_hour = data[0]?.price_per_hour;
  expertsData.price_per_hour_currency = data[0]?.price_per_hour_currency;

  return expertsData;
}


export const updateFields = async (
  payload: any,
  enqueueSnackbar: any
) => {

  try {
    const response = await RequestServer(
      APIRoutes.editExpert,
      "PATCH",
      payload
    );

    if (response.success) {
      enqueueSnackbar("Relevancy Successfully Updated", { variant: "success" });
      const snippets = response.data.meta.snippets || [];
      return snippets?.length !== 0
        ? snippets.map((snip: any, index: any) => ({
          ...snip,
          id: `snip-${index}`,
        }))
        : []
    } else {
      enqueueSnackbar("Request failed.", { variant: "error" });
      return false;
    }

  } catch (err) {
    console.error({ err });
    enqueueSnackbar("Request failed.", { variant: "error" });
    return false;
  }
};

export const editButtonHandler = (snip: Snippet, setActiveSnip: Dispatch<SetStateAction<Snippet | null>>) => {
  setActiveSnip(snip);
};

export const addButtonClickHandler = (setActiveSnip: React.Dispatch<React.SetStateAction<Snippet | null>>, realSnippetslength: number) => {
  const addNewField = {
    heading: "",
    description: "",
    id: `snip-${realSnippetslength}`,
  };

  setActiveSnip(addNewField)
};
