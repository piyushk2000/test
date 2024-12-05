import { EnqueueSnackbar, enqueueSnackbar } from "notistack";
import { APIRoutes } from "../../../constants";
import { RequestServer } from "../../../utils/services";
import {
  setDialogTypes,
  setProjectDetailsDefaultValues,
} from "../../../pages/Projects/types";
import { Dispatch, SetStateAction } from "react";

export interface iconTypes {
  logNewCall: boolean;
}

export type ProjectWarning = {
  isOpen: boolean;
  action: "Reopen" | "Close" | null;
};

export type SetProjectWarning = Dispatch<SetStateAction<ProjectWarning>>;

export const getAgenda = async (setQuesArr: any, id: any) => {
  if (!id) {
    setQuesArr([]);
    return;
  }
  try {
    const response = await RequestServer(APIRoutes.agenda + "?id=" + id, "get");

    if (response?.success) {
      const quesArr = response?.data[0]?.agenda?.questions;
      setQuesArr(quesArr);
    }
  } catch (err) {
    console.log(err);
  }
};

export const handleAgendaSubmit = async (
  quesArr: any,
  id: any,
  handleClose: any,
  agenda_id: any,
  getprojectDetails: any,
  setBackdrop: any,
  setDialog: setDialogTypes
) => {
  setBackdrop(true);
  let payload = {};
  if (agenda_id) {
    payload = {
      action: "Update",
      agenda: {
        questions: [...quesArr],
      },
      id: parseInt(agenda_id),
    };
  } else {
    payload = {
      action: "Add",
      agenda: {
        questions: [...quesArr],
      },
      fk_project: parseInt(id),
    };
  }

  try {
    const apiMethod = agenda_id ? "PATCH" : "POST";
    const url = agenda_id ? APIRoutes.updateAgenda : APIRoutes.agenda;
    const response = await RequestServer(url, apiMethod, payload);

    if (response.success) {
      const success_msg = agenda_id
        ? "Updated Agenda Successfully"
        : "Added Agenda Successfully";
      enqueueSnackbar(success_msg, {
        variant: "success",
      });
      handleClose();

      // closing agenda dialog as well
      console.log(setDialog);
      setDialog((prev) => ({
        ...prev,
        agenda: { ...prev.agenda, isAgendaIdChanged: true },
      }));

      await getprojectDetails();
    } else {
      console.log({ response });
      enqueueSnackbar(response.message.toString(), { variant: "warning" });
    }
  } catch (err) {
    console.error({ err });
    enqueueSnackbar("Request failed.", { variant: "error" });
  } finally {
    setBackdrop(false);
  }
};

export const reopenCloseProject = async (
  id: string,
  action: "Reopen" | "Close",
  enqueueSnackbar: EnqueueSnackbar,
  setLoading: (b: boolean) => void,
  setDefaultValues: setProjectDetailsDefaultValues,
  setProjectWarning: SetProjectWarning
) => {
  const payload = {
    id: parseInt(id),
    action,
  };

  setLoading(true);
  try {
    const response = await RequestServer(APIRoutes.projects, "PATCH", payload);

    if (response.success) {
      const msg =
        action === "Close"
          ? "Project is Successfully Close"
          : "Project is Successfully Reopened";

      enqueueSnackbar(msg, {
        variant: "success",
      });

      const status = action === "Close" ? "Closed" : "Open";
      // changing project status
      setDefaultValues((prev: any) => ({
        ...prev,
        projectDetails: {
          ...prev.projectDetails,
          status,
        },
      }));
      handleClose(setProjectWarning);
    } else {
      console.log({ response });
      enqueueSnackbar(response.message, {
        variant: "warning",
      });
    }
  } catch (err) {
    console.error(err);
  } finally {
    setLoading(false);
  }
};

export const handleClose = (setProjectWarning: SetProjectWarning) => {
  setProjectWarning((prev) => ({ action: null, isOpen: false }));
};
