import { enqueueSnackbar } from "notistack";
import { APIRoutes } from "../../constants";
import { RequestServer } from "../../utils/services";
import { Expert, FilterPayload, FkExpert, PECompliance, ProjectDetails, SetExpert, SetPECompliance, SetProjectDetails } from "./types";
import { PeComplianceData } from "../../organisms/project/project-pe-mapping/type";
import { Dispatch, SetStateAction } from "react";
import { LocalDayjs } from "../../utils/timezoneService";

export const getDetails = async (
  projectId: string,
  setProjectDetails: SetProjectDetails,
  code: string | null,
  fetchData: () => Promise<void>,
  setProjectClientDetails: Dispatch<SetStateAction<{ isAllowed: boolean }>>
) => {
  try {

    const project_response = await isClientDetailsAllowed(code, projectId);

    setProjectClientDetails(project_response);

    if (project_response.isAllowed) {
      const response = await RequestServer(
        APIRoutes.projects +
        "?id=" +
        projectId +
        "&show_columns=id,external_topic,call_count,total_revenue,applicable_agenda_id" + (code ? ("&code=" + code) : ""),
        "GET"
      );

      setProjectDetails(response.data[0]);
      fetchData();
    }
  } catch (err) {
    console.log(err);
  }
};

export const isClientDetailsAllowed = async (code: string | null, id: string) => { 
  try {
    const response = await RequestServer(APIRoutes.projects + "/client" + "?id=" + id + (code ? ("&code=" + code) : "") + "&is_pe=1", "GET");

    if (response.success) {
      return {
        isAllowed: response.data.status === "Open"
      }
    } else {
      return {
        isAllowed: false
      }
    }
  } catch (err) {
    return {
      isAllowed: false
    }
  }
}

export const getPeComplianceData = async (
  projectId: string,
  SetPECompliance: SetPECompliance,
  secretCode: string | null
) => {
  try {
    const response = await RequestServer(
      APIRoutes.PE_COMPLIANCE +
      "?fk_project=" +
      projectId +
      (secretCode ? "&code=" + secretCode : "") + "&stakeholders=YES",
      "GET"
    );

    if (response.success) {
      SetPECompliance(response.data)
    }
  } catch (err) {
    console.log(err);
  }
}

export const filterExpertComplianceData = (
  peCompliances: PECompliance,
  FullExpertData: Expert[] | null,
) => {
  if (!FullExpertData) {
    return [];
  }

  let experts: Expert[] = [];

  for (let expert of FullExpertData) {
    const expert_compliance = peCompliances.find((p) => p.fk_expert === expert.fk_expert);
    if (expert_compliance && expert_compliance.status === "SharedWithClient") {
      experts.push(expert);
    }
  }

  return experts;
}

export const applyStateFilter = (
  filterPayload: FilterPayload,
  expertData: Expert[] | null,
  setExpertData: SetExpert,
  peCompliances: PECompliance,
) => {
  const state = filterPayload.state;

  setExpertData(() => {

    let expert_final_data: Expert[] = [];
    if (!expertData) {
      return expert_final_data;
    }

    if (state === "All") {
      const final_data = filterPayload.complianceChecked ? filterExpertComplianceData(peCompliances, expertData) : expertData
      expert_final_data = [...final_data];
    } else {
      const data = expertData?.filter((p) => p.state === state);
      const final_data = filterPayload.complianceChecked ? filterExpertComplianceData(peCompliances, data) : data;
      expert_final_data = [...final_data];
    }

    // Sort By Filter

    expert_final_data.sort((a, b) => {

      if (filterPayload.sort_by === "shared") {

        // First, sort by shared_on date
        const aSharedOn = a.meta?.shared_on;
        const bSharedOn = b.meta?.shared_on;

        if (aSharedOn && bSharedOn) {
          return LocalDayjs(bSharedOn).diff(LocalDayjs(aSharedOn)); // Latest first
        } else if (aSharedOn) {
          return -1; // a comes first
        } else if (bSharedOn) {
          return 1; // b comes first
        }

        // If neither has shared_on, maintain original order (effectively random)
        if (!aSharedOn && !bSharedOn) {
          return 0;
        }

      } else if (filterPayload.sort_by === "top_experts") {

        // Second, sort by badge
        const badgeOrder: Record<string, number> = { 'Ace': 1, 'Champion': 2, 'Pro': 3 };
        const aBadgeValue = badgeOrder[a.badge || ""] || 4;
        const bBadgeValue = badgeOrder[b.badge || ""] || 4;

        if (aBadgeValue !== bBadgeValue) {
          return aBadgeValue - bBadgeValue;
        }

        // If badges are the same or both null, sort by premium_expert
        if (a.premium_expert && !b.premium_expert) {
          return -1;
        } else if (!a.premium_expert && b.premium_expert) {
          return 1;
        }

      } else if (filterPayload.sort_by === "asc___name") {
        // Third, sort by name in ascending order
        return a.expert_name.localeCompare(b.expert_name);
      }


      return 0;
    })

    // Shared On
    if (filterPayload.date_url) {
      const dates = filterPayload.date_url.split("&");
      const date1 = dates[1];
      const date2 = dates[2];

      const { method: method1, date: date_1 } = getDateMethod(date1);

      expert_final_data = expert_final_data.filter((d) => {
        const shared_on = d.meta.shared_on;

        if (shared_on) {
          const shared_date = LocalDayjs(shared_on);

          if (method1 === "lessthanequalto") {
            return shared_date.isBefore(date_1)
          } else if (method1 === "greaterthanequalto") {
            return shared_date.isAfter(date_1)
          }
        } else {
          return false;
        }
      })

      if(date2) {
      const { method: method2, date: date_2 } = getDateMethod(date1);

        expert_final_data = expert_final_data.filter((d) => {
          const shared_on = d.meta.shared_on;
  
          if (shared_on) {
            const shared_date = LocalDayjs(shared_on);
  
            if (method2 === "lessthanequalto") {
              return shared_date.isBefore(date_2)
            } else if (method2 === "greaterthanequalto") {
              return shared_date.isAfter(date_2)
            }
          } else {
            return false;
          }
        })
      }

    }


    return expert_final_data;
  });
};

function getDateMethod(date_str: string) {
  const dateMethod = date_str.split("___")[0];
  const dateStr = date_str.split("=")[1];
  return {
    method: dateMethod,
    date: LocalDayjs(dateStr)
  }
}

export const getExpertData = async (
  projectId: string | null,
  SetFullExpertData: SetExpert,
  setLoading: (b: boolean) => void,
  secretCode: string | null
) => {
  setLoading(true);
  try {
    let url =
      APIRoutes.peMapping +
      "?fk_project=" +
      projectId +
      "&in___state=Shared,Shortlisted,Scheduled,Completed,Rejected&notequalto___expert_invitation=Declined" +
      (secretCode ? `&code=${secretCode}` : "");
    const response = await RequestServer(url, "GET");

    if (response.success) {
      const data = response.data;

      const fkExpertIds = data.map((d: Expert) => d.fk_expert).join(",");

      const fkExpertResponse = await RequestServer(
        APIRoutes.getExpert +
        "?in___id=" +
        fkExpertIds +
        "&show_columns=id,premium_expert,badge,picture" +
        (secretCode ? `&code=${secretCode}` : ""),
        "GET"
      );

      if (fkExpertResponse.success) {
        let fullData: Expert[] = [];

        fkExpertResponse.data.forEach((d: FkExpert) => {
          const id = d.id;

          const expertData = data.find((d: Expert) => d.fk_expert === id);

          let fkData = {
            premium_expert: d.premium_expert,
            badge: d.badge,
            picture: d.picture,
          };

          if (expertData) {
            fullData.push({ ...expertData, ...fkData });
          }
        });

        SetFullExpertData(fullData);
      } else {
        throw new Error(
          fkExpertResponse.message ||
          fkExpertResponse.error ||
          "Error occurred"
        );
      }
    } else {
      throw new Error(
        response.message || response.error || "Error occurred"
      );
    }
  } catch (error: any) {
    console.log({ error });
    enqueueSnackbar(error, {
      variant: "error",
    });
  } finally {
    setLoading(false);
  }
};


export const getPEDetails = (pe_compliance: PeComplianceData | null
): { state: boolean, hover: string, name: string, bg: string } => {
  if (!pe_compliance) {
    return {
      state: false,
      hover: "",
      name: "",
      bg: "",
    }
  }

  if (pe_compliance.status === "SharedWithClient") {
    return {
      state: true,
      hover: "On - Hold",
      name: "Pending Compliance",
      bg: "gray",
    }
  }

  if (pe_compliance.status === "Rejected") {
    return {
      state: true,
      hover: "Rejected by " + pe_compliance.final_reviewed_by_value?.name || "",
      name: "Compliance Rejected",
      bg: "red",
    }
  }

  if (pe_compliance.status === "Auto-Rejected") {
    return {
      state: true,
      hover: "Rejected by Infollion",
      name: "Compliance Rejected",
      bg: "red",
    }
  }

  if (pe_compliance.status === "Approved") {
    return {
      state: true,
      hover: "Approved by " + pe_compliance.final_reviewed_by_value?.name || "",
      name: "Compliance Approved",
      bg: "var(--primary-color)",
    }
  }

  if (pe_compliance.status === "Auto-Approved") {
    return {
      state: true,
      hover: "Approved by Infollion",
      name: "Compliance Approved",
      bg: "var(--primary-color)",
    }
  }

  return {
    state: false,
    hover: "",
    name: "",
    bg: "",
  }
}

export const showAcceptReject = (state: string, client_compliance_requirement: string, compliance_shared: boolean, csc_marked_completed_by: boolean) => {

  const [compliance_start_after, compliance_end_before] = client_compliance_requirement.split(" | ");

  return state === "Shared" &&
    ((compliance_end_before === "Shortlisted" && compliance_shared && csc_marked_completed_by) || !compliance_shared);
}