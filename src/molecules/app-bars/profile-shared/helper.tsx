import { Expert } from "../../../pages/Profile-shared/types";

export const stateTabFilterOptions = [
  { label: "All", value: "All" },
  { label: "Pending Review", value: "Shared" },
  { label: "Shortlisted", value: "Shortlisted" },
  { label: "Completed", value: "Completed" },
  { label: "Rejected", value: "Rejected" },
];

export const sortByFilterOptions = [
  {label: <p>Shared On</p>, value: "shared"},
  {label: <p>Top Experts</p>, value: "top_experts"},
  {label: <p>Name ( A &rarr; Z )</p>, value: "asc___name"}
]

export const getStateFilterOptions = (expertData: Expert[] | null) => {
  if (!expertData) {
    return stateTabFilterOptions;
  }

  const state_arr = expertData.map((expert) => expert.state);

  // Making an object which return an object with all the state
  const state_obj: {
    Shared: number;
    Shortlisted: number;
    Scheduled: number;
    Completed: number;
    Rejected: number;
  } = state_arr.reduce((arr: any, expert: string) => {
    if (arr[expert]) {
      arr[expert]++;
    } else {
      arr[expert] = 1;
    }

    return arr;
  }, {});

  return [
    { label: `All (${state_arr.length || 0})`, value: "All" },
    {
      label: `Pending Review (${state_obj["Shared"] || 0})`,
      value: "Shared",
    },
    {
      label: `Shortlisted (${state_obj["Shortlisted"] || 0})`,
      value: "Shortlisted",
    },
    {
      label: `Scheduled (${state_obj["Scheduled"] || 0})`,
      value: "Scheduled",
    },
    { label: `Completed (${state_obj["Completed"] || 0})`, value: "Completed" },
    { label: `Rejected (${state_obj["Rejected"] || 0})`, value: "Rejected" },
  ];
};
