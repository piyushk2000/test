import { APIRoutes } from "../../constants";
import { RequestServer } from "../../utils/services";

export const commonInputStyles: any = {
  className: "backgroundWhite-description",
  size: "small",
  variant: "outlined",
  fullWidth: true,
};

export const CurrentCompany = [
  { label: "Working with a company", value: "working" },
  { label: "Not working currently", value: "not_working" },
  { label: "Self Employed / Freelancer", value: "self_employed" },
];

export const RelevantCompany = [
  { label: "Same as above", value: "same" },
  { label: "Different from above", value: "different" },
];

export const expertFields = [
  { label: "Expert", value: "Expert" },
  { label: "Referral Admin", value: "Referral Admin" },
  { label: "Expert | Referral Admin", value: "Expert | Referral Admin" },
];

export const isReferredFields = [
  { label: "Yes", value: "yes" },
  { label: "No", value: "no" },
];

export async function searchProjectOrExpert(
  searchTerm: string,
  type: "project" | "expert",
  expert_status?: string,
  dnd_enabled_for_expert?: boolean
) {
  try {
    if (!searchTerm) {
      return [];
    }

    if (type === "project") {
      const response = await RequestServer(
        APIRoutes.searchProjects + searchTerm + "&status=Open",
        "get"
      );

      const projectsData: any = response.data;

      const finalProjectsData: any = [];

      projectsData.forEach((project: any) => {
        finalProjectsData.push({
          value: project.id,
          label: `ID: ${project.id}, Topic: ${project.topic}`,
          client_name: project.client_name,
        });
      });

      return finalProjectsData;
    } else {
      let api_url = APIRoutes.searchExpert + searchTerm

      if (expert_status) {
        api_url += "&status=" + expert_status
      }

      if(dnd_enabled_for_expert) {
        api_url += "&dnd_enabled=0"
      }

      const response = await RequestServer(
        api_url,
        "get"
      );

      const expertsData: any = response.data;

      const finalExpertData: any = [];

      expertsData.forEach((expert: any) => {
        const label = expert.name ? expert.name : "null";
        finalExpertData.push({
          label: label,
          value: expert.id,
        });
      });

      return finalExpertData;
    }
  } catch (err) {
    console.log(err);
  }
}
