import { Dispatch, SetStateAction } from "react";

export type ProjectOptions = { label: string; value: number }[];

export type SetProjectOptions = Dispatch<SetStateAction<ProjectOptions>>;

export type ProjectSelected = {
  label: string;
  client_name: string;
  value: number;
};

export type SetProjectSelected = Dispatch<
  SetStateAction<ProjectSelected | null>
>;

export type MapMultipleProjectContextTypes = {
  projectOptions: ProjectOptions;
  setProjectOptions: SetProjectOptions | null;
  selectedCards: ProjectOptions;
  projectSelected: ProjectSelected | null;
  setProjectSelected: SetProjectSelected | null;
  setBackdrop: (bool: boolean) => void;
};
