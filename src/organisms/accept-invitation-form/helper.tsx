import { APIRoutes } from "../../constants";
import { ProjectApiDataResponse } from "../../pages/Projects/types";
import { RequestServer } from "../../utils/services";
import { ProjectData, InvitationDetail } from "./type";

export const steps = {
  mobile: {
    invitation: "Project", 
    agenda: "Agenda",
    confirmation: "Terms",
  }, desktop: {
    invitation: "Project Invitation",
    agenda: "Agenda",
    confirmation: "Confirmation",
  }
} as const

export const stepsWithAgenda = ["Project Invitation", "Agenda", "Confirmation"];
export const stepsWithoutAgenda = ["Project Invitation", "Confirmation"];
export const stepsWithAgendaMobile = ["Project", "Agenda", "Terms"];
export const stepsWithoutAgendaMobile = ["Project", "Terms"];

export function getStepsDesktop(isAgenda: boolean, showAcceptInvitationForm: boolean){
  let desktopSteps: string[] = []

  if (showAcceptInvitationForm){
    desktopSteps.push(steps.desktop.invitation)
  } 

  if (isAgenda){
    desktopSteps.push(steps.desktop.agenda)
  }
  desktopSteps.push(steps.desktop.confirmation)
  return desktopSteps
}

export function getStepsMobile(isAgenda: boolean, showAcceptInvitationForm:boolean){
  let mobileSteps: string[] = []

  if (showAcceptInvitationForm){
    mobileSteps.push(steps.mobile.invitation)
  } 

  if (isAgenda){
    mobileSteps.push(steps.mobile.agenda)
  }
  mobileSteps.push(steps.mobile.confirmation)
  return mobileSteps

}

// Format of ID: data---shared_link_id---project_id---pe_id---expert_id---user_id---client_type
// if Agenda is shared, then ---agendaid is also there

export function getInvitationData(id: string) {
  const decipheredData = atob(id);
  const data = decipheredData.split("---");
  const output: InvitationDetail = {
    date: data[0],
    sharedLinkId: data[1],
    projectId: data[2],
    peId: data[3],
    expertId: data[4],
    userId: data[5],
    clientType: data[6] ,
    agendaId: data[7],
  };

  return output;
}

export async function getProjectData(
  projectId: string
): Promise<ProjectData | null> {
  try {
    const payload = {
      equalto___id: projectId,
      show_columns: "id,external_topic,description",
    };

    const response: ProjectApiDataResponse = await RequestServer(
      APIRoutes.projectsFilter,
      "POST",
      payload
    );

    if (response && response.data) {
      const data = response.data[0];
      return {
        topic: data.external_topic,
        description: data.description,
      };
    } else {
      return null;
    }
  } catch (e) {
    console.error(e);
    return null;
  }
}
export async function rejectInvitation(invitationId: string) {
  const payload = {
    action: "RejectInvitation",
    id: invitationId,
  };

  const response = await RequestServer(APIRoutes.peMapping, "PATCH", payload);
  return response;
}
export async function acceptInvitation(invitationId: string) {
  const payload = {
    action: "AcceptInvitation",
    id: invitationId,
  };

  const response = await RequestServer(APIRoutes.peMapping, "PATCH", payload);
  return response;
}

export async function acceptAgreement(expertId: string) {

  const payload = {
    action: "AcceptAgreement",
    id: expertId,
  };

  const response = await RequestServer(APIRoutes.expertAgreement, "PATCH", payload);
  return response;
}