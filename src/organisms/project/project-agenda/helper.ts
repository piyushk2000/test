import { Dispatch, SetStateAction } from "react";
import { RequestServer } from "../../../utils/services";
import { APIRoutes } from "../../../constants";
import {
  AgendaGetApiResponse,
  SetAgendaDataState,
} from "../../../pages/Projects/types";
import {
  ModalStates,
  agenda_response,
} from "../../project-detail/project-detail-card/helper";
import { EnqueueSnackbar } from "notistack";

export const submitAgendaResponse = async (
  response: saveAgendaResponse,
  pe_id: number,
  handleSubmitClose: () => void,
  setResponse: Dispatch<SetStateAction<saveAgendaResponse>>,
  setBackdrop: (b: boolean) => void,
  enqueueSnackbar: EnqueueSnackbar
) => {
  try {
    setBackdrop(true);
    const payload = {
      action: "RespondToAgenda",
      id: pe_id, // pe_id,
      agenda_response: response,
    };
    const res = await RequestServer(APIRoutes.peMapping, "PATCH", payload);
    if (res.success) {
      enqueueSnackbar(res.message, {
        variant: "success",
      });
      handleSubmitClose();
      setResponse(response);
    } else {
      console.log(res);
      enqueueSnackbar(res.message || res.error || "something went wrong", {
        variant: "warning",
      });
    }
  } catch (err) {
    console.log(err);
  } finally {
    setBackdrop(false);
  }
};

export const getAgendaId = async (projectId: string) => {
  try {
    const projectResponse = await RequestServer(
      APIRoutes.projects +
        "?id=" +
        projectId +
        "&show_columns=applicable_agenda_id",
      "GET"
    );

    console.log(projectResponse);
    return projectResponse.data[0].applicable_agenda_id;
  } catch (err) {
    console.log(err);
  }
};

export const getAgendaData = async (
  setData: SetAgendaDataState,
  projectId: string
) => {
  try {
    const response: AgendaGetApiResponse = await RequestServer(
      APIRoutes.peMapping +
        "?fk_project=" +
        projectId +
        "&show_columns=agenda_responses,fk_agenda,agenda_shared_on,id,expert_name&notnull___agenda_shared_on=1",
      "GET"
    );
    if (response.success) {
      const data = response.data;

      const applicable_agenda_id = await getAgendaId(projectId);

      setData((prev) => ({
        ...prev,
        agenda: data,
        applicable_agenda_id,
      }));
    }
  } catch (err) {
    console.log(err);
  }
};

export const setApplicableAgendaId = async (
  projectId: string,
  setData: SetAgendaDataState
) => {
  try {
    const applicable_agenda_id = await getAgendaId(projectId);
    console.log("applicable_agenda_id", applicable_agenda_id);
    setData((prev) => ({
      ...prev,
      applicable_agenda_id,
    }));
  } catch (err) {
    console.log(err);
  }
};

export type saveAgendaResponse = agenda_response[];

type AgendaQuesResponse = {
  success: boolean;
  message: string;
  data: {
    agenda: {
      questions: string[];
    };
  }[];
};

export const getAgendaQues = async (
  id: number,
  setResponse: Dispatch<SetStateAction<saveAgendaResponse>>
): Promise<void> => {
  try {
    const response: AgendaQuesResponse = await RequestServer(
      APIRoutes.agenda + "?id=" + id + "&show_columns=agenda",
      "get"
    );

    if (response.success) {
      const ques: ModalStates["isAgendaDescription"]["agenda_responses"] =
        response.data[0].agenda.questions.map((ques) => ({
          question: ques,
          answer: "",
          expert_note: "",
        }));

      setResponse(() => ques);
    }
  } catch (err) {
    console.log(err);
  }
};

export const shareAgendaResponseAns = [
  { label: "No Idea", value: "No Idea" },
  { label: "Not Comfortable", value: "Not Comfortable" },
  { label: "Neutral", value: "Neutral" },
  { label: "Comfortable", value: "Comfortable" },
  { label: "Very Comfortable", value: "Very Comfortable" },
];

export interface Project_Item {
  applicable_agenda_id: null | string;
  id: number;
}
