import { Dispatch, SetStateAction } from "react";
import { AppRoutes } from "../../../constants";
import { ceMappingData, peMappingItems } from "../../../pages/Projects/types";
import { encode } from "../../../utils/utils";
import { Meta } from "../../expert-cards/types";

export type Item = {
  id: number;
  name: string;
  expert_invitation?: peMappingItems["expert_invitation"];
  agenda_shared?: boolean;
  is_agenda_respond?: boolean;
  status?: string;
  client_priority?: Meta["client_priority"];
  expert_invitation_count?: number; // This means how much expert was invited in that state
  relevant_division?: string | null;
  relevant_designation?: string | null;
  relevant_company?: string | null;
};

export const getAllMappingItems = (items: ceMappingData[]) => {
  // All CE Mapping Items
  const IdentifiedItems: Item[] = [];
  const ContactedItems: Item[] = [];
  const RefusedItems: Item[] = [];
  const OnboardingItems: Item[] = [];
  const ConfirmedItems: Item[] = [];

  if (items) {
    items.forEach((item) => {
      switch (item.status) {
        case "Identified": {
          item.name && IdentifiedItems.push({ name: item.name, id: item.id, client_priority: item.meta?.client_priority });
          break;
        }
        case "Contacted": {
          item.name && ContactedItems.push({ name: item.name, id: item.id, client_priority: item.meta?.client_priority });
          break;
        }
        case "Refused": {
          item.name && RefusedItems.push({ name: item.name, id: item.id, client_priority: item.meta?.client_priority });
          break;
        }

        case "Onboarding": {
          item.name && OnboardingItems.push({ name: item.name, id: item.id, client_priority: item.meta?.client_priority });
          break;
        }

        case "Compliance Done": {
          item.name && OnboardingItems.push({ name: item.name, id: item.id , status: item.status, client_priority: item.meta?.client_priority});
          break;
        }

        case "Compliance Initiated": {
          item.name && OnboardingItems.push({ name: item.name, id: item.id , status: item.status, client_priority: item.meta?.client_priority});
          break;
        }
 
        case "Confirmed": {
          item.name && ConfirmedItems.push({ name: item.name, id: item.id, client_priority: item.meta?.client_priority});
          break;
        }
      }
    });
  }

  return {
    IdentifiedItems,
    ConfirmedItems,
    ContactedItems,
    RefusedItems,
    OnboardingItems,
  };
};

type AllItems = {
  Added: Item[];
  Shared: Item[];
  Shortlisted: Item[];
  Scheduled: Item[];
  Completed: Item[];
};

export type PeMappingBody = AllItems;

export type SetPeMappingBody = Dispatch<SetStateAction<AllItems>>

export const getPEMapping = (items: peMappingItems[]): {allItems: AllItems, expert_invitation_counts: Record<string,number>} => {
  let expert_invitation_counts: any = {
    Added: 0,
    Shared: 0,
    Shortlisted: 0,
    Scheduled: 0,
    Completed: 0,
  }

  const allItems =  items.reduce(
    (allItems: AllItems, item: peMappingItems) => {
      const {
        expert_name,
        expert_invitation,
        fk_expert: id,
        agenda_shared_on,
        state,
        agenda_responses,
        calls_scheduled,
        meta,
        relevant_division,
        relevant_designation,
        relevant_company,
      } = item;

      if (meta?.first_invite_sent_to_expert) {
        expert_invitation_counts[meta?.first_invite_sent_to_expert?.state]++;
      }

      switch (state) {
        case "Added": {
          allItems.Added.push({
            name: expert_name,
            expert_invitation,
            id,
            relevant_division,
            relevant_designation,
            relevant_company,
            agenda_shared: Boolean(agenda_shared_on),
            is_agenda_respond: Boolean(agenda_responses),
          });
          break;
        }
        case "Shared": {
          allItems.Shared.push({
            name: expert_name,
            expert_invitation,
            id,
            relevant_division,
            relevant_designation,
            relevant_company,
            agenda_shared: Boolean(agenda_shared_on),
            is_agenda_respond: Boolean(agenda_responses),
          });
          break;
        }

        case "Shortlisted": {
          allItems.Shortlisted.push({
            name: expert_name,
            expert_invitation,
            id,
            relevant_division,
            relevant_designation,
            relevant_company,
            agenda_shared: Boolean(agenda_shared_on),
            is_agenda_respond: Boolean(agenda_responses),
          });
          break;
        }

        case "Scheduled": {
          allItems.Scheduled.push({
            name: expert_name,
            expert_invitation,
            id,
            relevant_division,
            relevant_designation,
            relevant_company,
            agenda_shared: Boolean(agenda_shared_on),
            is_agenda_respond: Boolean(agenda_responses),
          });
          break;
        }

        case "Completed": {
          allItems.Completed.push({
            name: expert_name,
            expert_invitation,
            id,
            relevant_division,
            relevant_designation,
            relevant_company,
            agenda_shared: Boolean(agenda_shared_on),
            is_agenda_respond: Boolean(agenda_responses),
          });
          break;
        }
      }

      // If the call Scheduled for the expert are more than 0 , we will show them in schedule call column also
      if (calls_scheduled && calls_scheduled > 0) {
        const expert_index = allItems.Scheduled.findIndex((s) => s.id === id);
        if (expert_index === -1) {
          allItems.Scheduled.push({
            name: expert_name,
            expert_invitation,
            id,
            agenda_shared: Boolean(agenda_shared_on),
            is_agenda_respond: Boolean(agenda_responses),
          });
        }
      }

      return allItems;
    },
    {
      Added: [],
      Shared: [],
      Shortlisted: [],
      Scheduled: [],
      Completed: [],
    }
  );

  return {allItems,expert_invitation_counts};
};


export function getPeMappingSharedUrlWithoutToken(project_id: null | string, client_id: string, expert_id?: null | string) {
  const currentUrl = window.location.href;
  const parsedUrl = new URL(currentUrl);
  const baseUrl = parsedUrl.origin;

  const url = baseUrl + AppRoutes.PROJECT_PE_MAPPING + "?project_id=" + project_id + "&code=" + encode(`${project_id}_${client_id}`);
  return url
}


export const searchItem = (text: string, pe_mapping_values: peMappingItems[], setBody: SetPeMappingBody, setSearchText: Dispatch<SetStateAction<string>>) => {

  const { Added, Shared, Shortlisted, Scheduled, Completed } = getPEMapping(
    pe_mapping_values || []
  ).allItems

  let bodyNew = {
    Added: Added.filter((val) => val.name.toLowerCase().includes(text.toLowerCase())),
    Shared: Shared.filter((val) => val.name.toLowerCase().includes(text.toLowerCase())),
    Shortlisted: Shortlisted.filter((val) => val.name.toLowerCase().includes(text.toLowerCase())),
    Scheduled: Scheduled.filter((val) => val.name.toLowerCase().includes(text.toLowerCase())),
    Completed: Completed.filter((val) => val.name.toLowerCase().includes(text.toLowerCase()))
  }
  setBody({ ...bodyNew })
  setSearchText(text);
}

export const peSearchhandleClose = (setBody: SetPeMappingBody, setSearchText: Dispatch<SetStateAction<string>>, pe_mapping_values: peMappingItems[]) => {
  setSearchText('');
  setBody(getPEMapping(
    pe_mapping_values || []
  ).allItems);
}