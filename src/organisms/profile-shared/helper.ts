import { APIRoutes } from "../../constants";
import { RequestServer } from "../../utils/services";


export async function requestMoreInfo({
  notes,
  peId,
  agenda_response_requested,
}: {
  notes: string;
  peId: number;
  agenda_response_requested: boolean;
}) {
  const payload = {
    action: "RequestMoreInfo",
    notes: notes,
    agenda_response_requested: agenda_response_requested ? 1 : null,
    id: peId,
  };
  const response = await RequestServer(APIRoutes.peMapping, "PATCH", payload);
  return response;
}
export async function requestCall({
  notes,
  peId,
}: {
  notes: string;
  peId: number;
}) {

  
  const payload = {
    action: "Shortlist",
    notes: notes,
    id: peId,
  };

  const response = await RequestServer(APIRoutes.peMapping, "PATCH", payload);
  return response;
}

export const requestMoreInfoFormDefaultValues = {
  notes: "",
  is_agenda_response: false,
};
export const requestCallFormDefaultValues = {
  notes: "",
};
