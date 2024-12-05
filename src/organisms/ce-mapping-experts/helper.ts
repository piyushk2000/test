import { HeadCell } from "../../molecules/table-view-common/types";
import { GetCEExpertsResponseData, ProjectClientDetails } from "../../pages/ce-mapping-expert/types";
import { LocalDayjs } from "../../utils/timezoneService";
import { RowsData } from "./types";

const allHeadCells = [
  {
    id: "Priority",
    numeric: false,
    disablePadding: false,
    label: "",
    isSort: false,
  },
  {
    id: "expert_name",
    numeric: false,
    disablePadding: false,
    label: "Expert Name",
    isSort: true,
  },
  {
    id: "status",
    numeric: false,
    disablePadding: false,
    label: "Status",
    isSort: true,
  },
  {
    id: "current_company_name",
    numeric: false,
    disablePadding: false,
    label: "Current Company",
    isSort: true,
  },
  {
    id: "current_designation",
    numeric: false,
    disablePadding: false,
    label: "Current Designation",
    isSort: true,
  },
  {
    id: "relevant_company_name",
    numeric: false,
    disablePadding: false,
    label: "Relevant Company",
    isSort: true,
  },
  {
    id: "relevant_designation",
    numeric: false,
    disablePadding: false,
    label: "Relevant Designation",
    isSort: true,
  },
  {
    id: "expert_base_location",
    numeric: false,
    disablePadding: false,
    label: "Base Location",
    isSort: true,
  },
  {
    id: "added_on",
    numeric: false,
    disablePadding: false,
    label: "Added On",
    isSort: false,
  },
  {
    id: "last_status_updated_on",
    numeric: false,
    disablePadding: false,
    label: "Last Updated",
    isSort: false,
  },
  {
    id: "action",
    numeric: false,
    disablePadding: false,
    label: "Action",
    isSort: false,
  }]

export const headCells = (projectClientDetails: ProjectClientDetails) => {
  let allHeadCellsDetails = allHeadCells;

  if(projectClientDetails.addedOnMasking) {
    allHeadCellsDetails = allHeadCellsDetails.filter((headCell: HeadCell) => headCell.id !== "added_on");
  }

  if(projectClientDetails.lastUpdatedMasking) {
    allHeadCellsDetails = allHeadCellsDetails.filter((headCell: HeadCell) => headCell.id !== "last_status_updated_on");
  }

  if(projectClientDetails.nameMasking) {
    allHeadCellsDetails = allHeadCellsDetails.filter((headCell: HeadCell) => headCell.id !== "expert_name");
  }

  return allHeadCellsDetails;
}




export const formatData = (data: GetCEExpertsResponseData): RowsData[] => {
  const { filtered_data: rowsData } = data;

  let finalRowsData: RowsData[] = [];

  for (let rowData of rowsData) {
    const added_on = rowData?.meta?.fk_project_added?.added_on || null;
    const last_updated_on = rowData?.last_status_updated_on || null;

    let finalRowObj: RowsData = {
      id: rowData.id,
      status: rowData.status,
      expert_name: rowData.name,
      current_company_name: rowData.meta?.current_company?.name || (rowData.meta?.current_company_tag === "self_employed" ? "Self Employed" : null) || "-",
      current_designation: rowData.meta?.current_company?.designation || (rowData.meta?.current_company_tag === "self_employed" ? "Freelancer" : null)  || "-",
      relevant_company_name: rowData.meta?.relevant_company?.name || "-",
      relevant_designation: rowData?.meta?.relevant_company?.designation || "-",
      expert_base_location: rowData.base_location_value?.name || "-",
      action: !!rowData.meta?.client_priority,
      added_on:  added_on ? LocalDayjs(added_on).format("DD/MM/YYYY") : "-",
      last_updated_on:  last_updated_on ? LocalDayjs(last_updated_on).format("DD/MM/YYYY"): "-"
    }

    finalRowsData.push(finalRowObj)
  }

  return finalRowsData;
}