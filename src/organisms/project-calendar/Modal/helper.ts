import { isExpert } from "../../../utils/role";

export const defaultValues = {
  type: "",
  expert: null,
  start_time: null,
  duration: "",
};

export const typeArr = [
  {
    label: "Expert",
    value: "Expert",
  },
  {
    label: "Client",
    value: "Client",
  },
];

export function getDefaultValues(expert?: { label: string; value: string }) {
  const defaultValues: {
    type: string;
    expert: null | { label: String; value: string };
    start_time: null;
    duration: "";
  } = {
    type: "",
    expert: null,
    start_time: null,
    duration: "",
  };

  if (isExpert()) {
    defaultValues.type = "Expert";
  }

  if (expert) {
    defaultValues.expert = expert;
  }
  return defaultValues
}
