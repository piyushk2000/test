import { Dispatch, SetStateAction } from "react";

export type NavbarActionsTypes = {
  title: string;
  label: React.ReactNode;
  onClick: () => void;
}[];

export type SelectedAction = {
  title: string;
  label: React.ReactNode;
  onClick(): void;
} | null;

export type SetSelectedAction = Dispatch<SetStateAction<SelectedAction>>;
