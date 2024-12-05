import { Dispatch, SetStateAction } from "react";
import { AddClientDefaultValues } from "../../add-client/helper";

export type dialogState = {
  addClient: {
    state: boolean;
    isChange: boolean;
    isEdit: boolean;
    clientData?: AddClientDefaultValues;
    id?: string;
  };
  addContact: { state: boolean; isChange: boolean; id: string | null };
};

export type setDialogState = Dispatch<SetStateAction<dialogState>>;

export type booleanFn = Dispatch<SetStateAction<boolean>>;

export type getClientsData = {
  id: number | string;
  name: string;
  type: string;
  fk_cem_value: fkCemValue;
  contract_valid_till: string;
  created_at: string | null;
  updated_at: string | null;
  projectsCount: number;
  callsDone: number;
  servicedProjectsCount: number;
  client_specific_compliance_requirement: string;
  compliance_start_after: string;
  compliance_end_before: string;
  compliance_email_format?: string | null;
  compliance_description?: string | null;
};

type fkCemValue = {
  id: number;
  name: string;
  email: string;
};

export type getClientsApi = {
  success: boolean;
  message: string;
  data: getClientsData[];
};

export type filter = {
  type: string;
  calender: string | null;
  sort_by: string;
  search: string | null;
  isFilterChange: boolean;
};

export type apiDataState = {
  apiData: getClientsApi | null;
  filter: filter;
};

export type setApiDataState = Dispatch<SetStateAction<apiDataState>>;

export type clientCardsProps = {
  apiData: getClientsApi | null;
};

export type allClientContext = {
  setDialog: setDialogState;
  setData: setApiDataState;
};

export type geoTypes = {
  id: number;
  name: string;
  parent_id: number;
  created_at: null;
  updated_at: null;
};

export type labelValueType = {
  label: string;
  value: number;
};

export type ClientControllerRef = {
  controller: AbortController | null,
  clearTimeout: (() => void) | null
};