import { Dispatch, SetStateAction } from "react";

export type defaultValues = {
  linkProject: { label: string; value: string } | null;
};

export type formOptions = {
  linkProject: { label: string; value: number }[];
  loading: boolean;
};

export type SetFormOptions = Dispatch<SetStateAction<formOptions>>;
