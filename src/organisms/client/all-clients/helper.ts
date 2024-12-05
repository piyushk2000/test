import React, { createContext } from "react";
import { APIRoutes } from "../../../constants";
import { RequestServer } from "../../../utils/services";
import {
  allClientContext,
  apiDataState,
  booleanFn,
  ClientControllerRef,
  dialogState,
  filter,
  getClientsApi,
  setApiDataState,
  setDialogState,
} from "./types";

export const handleSubmitClose = (setDialog: setDialogState) => {
  setDialog((prev: dialogState) => ({
    addOffice: { state: false, isChange: false, id: null, name: null },
    addClient: { state: false, isChange: false, isEdit: false },
    addContact: { state: false, isChange: false, id: null },
  }));
};

export const openAddClientDialog = (setDialog: setDialogState) => {
  setDialog((prev: dialogState) => ({
    ...prev,
    addClient: { ...prev.addClient, state: true, isChange: false },
  }));
};

export const handleAlertBoxClose = (setAlertBox: booleanFn) => {
  setAlertBox(false);
};

export const handleAlertBoxYesClick = (
  setAlertBox: booleanFn,
  setDialog: setDialogState
) => {
  setAlertBox(false);
  handleSubmitClose(setDialog);
};

export const handleClose = (
  setAlertBox: booleanFn,
  setDialog: setDialogState,
  isChange: boolean
) => {
  return isChange ? setAlertBox(true) : handleSubmitClose(setDialog);
};

export const setFormChange = (
  setDialog: setDialogState,
  form: "addClient" | "addContact"
) => {
  if (form === "addClient") {
    setDialog((prev: dialogState) => {
      if (!prev.addClient.isChange) {
        return {
          ...prev,
          addClient: { ...prev.addClient, isChange: true },
        };
      }
      return prev;
    });
  }

  if (form === "addContact") {
    setDialog((prev: dialogState) => {
      if (!prev.addContact.isChange) {
        return {
          ...prev,
          addContact: { ...prev.addContact, isChange: true },
        };
      }
      return prev;
    });
  }
};

export const generateClientCardsUrl = (filters: filter) => {
  const { calender, sort_by, type, search } = filters;

  let url = APIRoutes.clients;

  // sort_by Filter ( Always implemented )
  if (sort_by) {
    url += "?embed=YES&sort_by=" + sort_by;
  }

  // calender filter
  if (calender) {
    url += calender;
  }

  // Type Filter
  if (type && type !== "all") {
    url += `&type=${type}`;
  }

  // search filter
  if (search) {
    url += `&search=${search}`;
  }

  return url;
};

export const getAllClients = async (
  setData: setApiDataState,
  filters: filter,
  controllerRef: React.MutableRefObject<ClientControllerRef>
) => {

  if (controllerRef.current.controller && controllerRef.current.clearTimeout) {
    controllerRef.current.controller.abort();
    controllerRef.current.clearTimeout();
  }
  setData((prev: apiDataState) => ({ ...prev, apiData: null }));
  const url = generateClientCardsUrl(filters);
  try {
    const response: getClientsApi = await RequestServer(url, "GET", undefined, undefined, undefined, (abort,clearTimeout) => {
      controllerRef.current.controller = abort;
      controllerRef.current.clearTimeout = clearTimeout;
    });
    if (response.success) {
      const apiData: getClientsApi = response;

      setData((prev: apiDataState) => ({
        apiData,
        filter: {...prev.filter, isFilterChange: false}
      }))
    }
  } catch (err) {
    console.log(err);
  }
};

export const getClientSearchOptions = async (text: string) => {
  try {
    const response: getClientsApi = await RequestServer(
      APIRoutes.clients + "?search=" + text,
      "GET"
    );
    if (response.success) {
      const apiData: getClientsApi = response;
      const data = apiData.data.map((data) => ({
        label: data.name,
        value: data.id,
      }));
      return data;
    } else {
      return [];
    }
  } catch (err) {
    console.log(err);
  }
};

export const dataRangeFilter = (
  date: Date | null,
  tDate: Date | null,
  select: string | null,
  calenderType: string | null,
  setData?: setApiDataState,
  getDate?: (dateUrl: string) => void,
) => {
  let dateUrl: string = "";
  const greaterThan = `greaterthanequalto___${calenderType}`;
  const lessThan = `lessthanequalto___${calenderType}`;

  if (select === "between") {
    const fromDate = date + "T00:00:00";
    const toDate = tDate + "T23:59:59";

    dateUrl += `&${greaterThan}=${fromDate}&${lessThan}=${toDate}`;
  } else if (select === "before") {
    const beforeDate = date + "T23:59:59";

    dateUrl += `&${lessThan}=${beforeDate}`;
  } else if (select === "on") {
    const fromDate = date + "T00:00:00";
    const toDate = date + "T23:59:59";

    dateUrl += `&${greaterThan}=${fromDate}&${lessThan}=${toDate}`;
  } else if (select === "after") {
    const afterDate = date + "T00:00:00";

    dateUrl += `&${greaterThan}=${afterDate}`;
  }

  if (dateUrl) {
    setData && setData((prev: apiDataState) => ({
      ...prev,
      filter: { ...prev.filter, calender: dateUrl, isFilterChange: true },
    }));

    // Used in Clients Page -> Usage Tab
    if(getDate) {
      getDate(dateUrl)
    }
  }
};

export const AllClientContext = createContext<allClientContext | null>(null);
