import { createContext, useContext } from "react";
import { ClientPageContextTypes, SetAlertNBackdrop, SetDialogs } from "./types";

export const handleClose = (
  isChange: boolean,
  setAlertNBackdrop: SetAlertNBackdrop,
  setDialogs: SetDialogs
) => {
  return isChange
    ? handleAlertBoxOpen(setAlertNBackdrop)
    : handleSubmitClose(setDialogs);
};

export const setFormChange = (
  setDialogs: SetDialogs,
  form: "addOffice" | "editOffice"
) => {
  setDialogs((prev) => {
    if (!prev[form].isChange) {
      return {
        ...prev,
        [form]: {
          ...prev[form],
          isChange: true,
        },
      };
    }
    return prev;
  });
};

export const handleSubmitClose = (setDialogs: SetDialogs) => {
  setDialogs((prev) => ({
    addOffice: {
      id: null,
      isChange: false,
      state: false,
      refetch: null,
      name: null,
    },
    editOffice: {
      state: false,
      isChange: false,
      client_id: null,
      office_id: null,
      refetch: null,
      name: null,
      defaultValues: null,
    },
  }));
};

export const handleAlertBoxOpen = (setAlertNBackdrop: SetAlertNBackdrop) => {
  setAlertNBackdrop((prev) => ({
    ...prev,
    alert: true,
  }));
};

export const handleAlertBoxClose = (setAlertNBackdrop: SetAlertNBackdrop) => {
  setAlertNBackdrop((prev) => ({
    ...prev,
    alert: false,
  }));
};

export const handleAlertBoxYesClick = (
  setAlertNBackdrop: SetAlertNBackdrop,
  setDialogs: SetDialogs
) => {
  handleAlertBoxClose(setAlertNBackdrop);
  handleSubmitClose(setDialogs);
};

export const ClientPageContext = createContext<ClientPageContextTypes | null>(
  null
);

export const useClientPageContext = () => {
  const context = useContext(ClientPageContext);

  if (!context) {
    throw new Error(
      "useClientPageContext must be used within a ClientPageContextProvider"
    );
  }

  return context;
};
