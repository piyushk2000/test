import { Dispatch, SetStateAction } from "react";
import { addOfficedefaultValues } from "../../organisms/client/all-clients/add-billing-office/helper";

export type FilterPayload = {
  bcgTab: number;
  isFilterChange: boolean;
};

export type SetFilterPayload = Dispatch<SetStateAction<FilterPayload>>;

export type ClientPageDialogStates = {
  addOffice: {
    state: boolean;
    isChange: boolean;
    id: string | null;
    refetch: null | (() => Promise<void>);
    name: string | null;
  };
  editOffice: {
    state: boolean;
    isChange: boolean;
    client_id: string | null;
    office_id: string | null;
    refetch: null | (() => Promise<void>);
    name: string | null;
    defaultValues: addOfficedefaultValues | null;
  };
};

export type SetDialogs = Dispatch<SetStateAction<ClientPageDialogStates>>;

export type AlertNBackdrop = {
  alert: boolean;
  backdrop: boolean;
};

export type SetAlertNBackdrop = Dispatch<SetStateAction<AlertNBackdrop>>;

export type ClientPageContextTypes = {
  setClientPageDialogs: SetDialogs;
  filterPayload: FilterPayload;
  setFilterPayload: SetFilterPayload;
};
