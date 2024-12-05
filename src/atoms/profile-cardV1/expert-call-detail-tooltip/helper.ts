import { APIRoutes } from "../../../constants";
import { CallDetail } from "../../../pages/Calls/types";
import { RequestServer } from "../../../utils/services";
import { removeDuplicates } from "../../../utils/utils";

export type CallStats = {
  projectCount: number;
  callCount: number;
  badCallCount: number;
  projects: string;
} | null;

export async function getCallsData(expertId: number) {
  const url =
    APIRoutes.scheduleCall +
    "?fk_expert=" +
    expertId +
    "&show_columns=id,fk_project" + "&notequalto___status=Scheduled";

  const response = await RequestServer(url, "GET");

  if (response.success) {
    return formatCallData(response.data);
  }

  return null;
}

export function formatCallData(data: Partial<CallDetail>[]  ) {
  const projects = removeDuplicates<string>(data.map((d) => d?.fk_project?.toString() || ""));
  const projectCount = projects.length;
  const callCount = data.length;
  const badCallCount = data.filter(
    (item) => item.call_status === "Bad Call"
  ).length;

  return {
    projectCount,
    callCount,
    badCallCount,
    projects: projects.join(",")
  };
}