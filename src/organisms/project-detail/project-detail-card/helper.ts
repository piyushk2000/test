import { Dispatch, SetStateAction } from "react";
import { LocalDayjs } from "../../../utils/timezoneService";
import { projectApiDataItem } from "../../../pages/Projects/types";

export const formatData = <T>(data: T[]): string => {
  return data.map((d: any) => d.name).join(", ");
};

export type agenda_response = {
  answer: string;
  question: string;
  expert_note: null | string;
};

export type ModalStates = {
  agenda: boolean;
  isAgendaDescription: {
    state: boolean;
    isChange: boolean;
    fk_agenda: number | null;
    agenda_responses: agenda_response[] | null;
  };
};

export type SetModalStates = Dispatch<SetStateAction<ModalStates>>;

export const handleOpenModal = (
  open: "agenda" | "description",
  setIsModalOpen: SetModalStates
): void => {
  if (open === "agenda") {
    setIsModalOpen((prev) => ({ ...prev, agenda: true }));
  } else if (open === "description") {
    setIsModalOpen((prev) => ({
      ...prev,
      isAgendaDescription: { ...prev.isAgendaDescription, state: true },
    }));
  }
};

export function formatDate(date: string | undefined) {
  if (!date) return "N/A";
  const formattedDate = LocalDayjs(date).format("DD/MM/YYYY");
  return formattedDate;
}

export function getDomainString(
  projectDetails: projectApiDataItem | null
): string {
  if (!projectDetails) return "";

  let domainArr: string[] = [];

  domainArr.push(projectDetails?.l0_domain_value?.name || "");

  domainArr.push(projectDetails?.l1_domain_value?.name || "");

  domainArr.push(projectDetails?.l2_domain_value?.name || "");

  if (projectDetails?.l3_domain_value) {
    domainArr.push(projectDetails?.l3_domain_value?.name || "");
  }

  return domainArr.join(", ");
}
