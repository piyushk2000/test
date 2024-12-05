import { Dispatch, SetStateAction } from "react";
import { LocalDayjs } from "../../../utils/timezoneService";
import { Filters, RowsData, Select, SetFilters, SetSelect, GetCEExpertsResponseData } from "./type";
import { RequestServer } from "../../../utils/services";
import { APIRoutes } from "../../../constants";
import { EnqueueSnackbar } from "notistack";
import { SelectedAction } from "../../../molecules/nav-bar-common/type";
import { removeDuplicates } from "../../../utils/utils";


export const headCells = [
  {
    id: "expert_name",
    numeric: false,
    disablePadding: false,
    label: "Expert Name",
    isSort: true,
  },
  {
    id: "excluded",
    numeric: false,
    disablePadding: false,
    label: "Excluded",
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
    isSort: true,
  },
  {
    id: "last_updated",
    numeric: false,
    disablePadding: false,
    label: "Last Updated",
    isSort: true,
  }
]


export const handleTableRowClick = (e: React.MouseEvent<HTMLTableRowElement, MouseEvent>, row: RowsData, isSelectAllowed: boolean, select: Select, setSelect: SetSelect) => {
  // If the User is clicking on a Span Element ( meaning - Status & Action Chips ) & In Chip , return
  const target = e.target as HTMLElement;
  if (target && target.tagName) {
    const tagName = target.tagName;
    if (tagName === "SPAN" || tagName === "P") {
      return;
    }
  }

  const { id } = row;

  if (!id || !isSelectAllowed) {
    return;
  }

  const selected = select.selectedCards;
  const selectedIndex = selected.findIndex((s) => s.id === id);
  let finalSelected: any[] = [];

  const curr_value: any = { ...row };
  if (selectedIndex === -1) {
    finalSelected = [...selected];
    finalSelected.push(curr_value);
  } else if (selectedIndex === 0) {
    finalSelected = selected.slice(1);
  } else if (selectedIndex === select.selectedCards.length - 1) {
    finalSelected = selected.slice(0, -1);
  } else if (selectedIndex > 0) {
    finalSelected = finalSelected.concat(
      selected.slice(0, selectedIndex),
      selected.slice(selectedIndex + 1)
    );
  }

  setSelect((prev) => ({
    ...prev,
    selectedCards: finalSelected
  }))
}

export const handleSelectAllClick = (
  event: React.ChangeEvent<HTMLInputElement>,
  currentRow: RowsData[],
  select: Select,
  setSelect: SetSelect
) => {

  if (!select.isClicked) {
    return;
  }

  if (event.target.checked) {
    // is already some items are selected, we are deselecting everything
    let numSelected = select.selectedCards.length
    if (numSelected > 0) {
      setSelect((prev) => ({
        ...prev,
        selectedCards: []
      }));
      return
    }

    // If none of the items are selected, we are selecting on those which are allowed to be selected
    const newSelected = currentRow.filter((card) => select.callAction === "exclude_expert" ? !card.excluded : card.excluded);
    setSelect((prev) => ({
      ...prev,
      selectedCards: newSelected,
    }));
    return;
  }

  // if event.target.checked is false, that means user clicks the checkbox button to deselect everything
  setSelect((prev) => ({
    ...prev,
    selectedCards: []
  }));
};


export const formatData = (data: GetCEExpertsResponseData): RowsData[] => {
  const { filtered_data: rowsData, excluded_ce_expert_ids } = data;

  let finalRowsData: RowsData[] = [];

  const excluded_ce_expert_ids_arr = excluded_ce_expert_ids?.split(",") || [];

  for (let rowData of rowsData) {

    let finalRowObj: RowsData = {
      id: rowData.id,
      status: rowData.status,
      current_company_name: rowData.meta?.current_company?.name || (rowData.meta?.current_company_tag === "self_employed" ? "Self Employed" : null) || "-",
      current_designation: rowData.meta?.current_company?.designation || (rowData.meta?.current_company_tag === "self_employed" ? "Freelancer" : null) || "-",
      relevant_company_name: rowData.meta?.relevant_company?.name || "-",
      relevant_designation: rowData?.meta?.relevant_company?.designation || "-",
      expert_base_location: rowData.base_location_value?.name || "-",
      expert_name: rowData.name,
      added_on: rowData.meta.fk_project_added?.added_on ? LocalDayjs(rowData.meta.fk_project_added.added_on).format("DD/MM/YYYY") : "-",
      last_updated: rowData.last_status_updated_on ? LocalDayjs(rowData.last_status_updated_on).format("DD/MM/YYYY") : "-",
      excluded: !!excluded_ce_expert_ids_arr.find(id => +id === rowData.id)
    }

    finalRowsData.push(finalRowObj)
  }

  return finalRowsData;
}

export const defaultFilters: Filters = {
  isFilterApplied: false,
  isFilterChange: false,
  masking_change: false,
  date: null,
  current_company: null,
  relevant_company: null,
  base_location: null,
  name_masking: false,
  added_on_masking: false,
  last_updated_on_masking: false
}


export function getDateMethod(date_str: string) {
  const dateMethod = date_str.split("___")[0];
  const dateName = date_str.split("___")[1].split("=")[0];
  const dateStr = date_str.split("=")[1];
  return {
    method: dateMethod,
    date: LocalDayjs(dateStr),
    dateName
  }
}

export const applyFilters = async (
  filterPayload: Filters,
  setData: Dispatch<SetStateAction<GetCEExpertsResponseData | null>>,
  setFilters: SetFilters,
  setLoading: (loading: boolean) => void,
  expertData: GetCEExpertsResponseData | null,
  enqueueSnackbar: EnqueueSnackbar,
  project_id: string | null
) => {
  setLoading(true);

  let excluded_ce_expert_ids_data: string, masking_data: string;


  try {
    if (filterPayload.masking_change && project_id) {

      console.log("this is run, which is filter");
      const excluded_ce_expert_ids = expertData?.excluded_ce_expert_ids;
      const masking = [];

      if (filterPayload.name_masking) {
        masking.push("name");
      }

      if (filterPayload.added_on_masking) {
        masking.push("added_on");
      }

      if (filterPayload.last_updated_on_masking) {
        masking.push("last_status_updated_on");
      }

      const response = await RequestServer(APIRoutes.projectCETracker, "PATCH", {
        excluded_ce_expert_ids: expertData?.excluded_ce_expert_ids || "",
        masking: masking.join(","),
        project_id: +project_id
      })

      if (response.success) {
        if (filterPayload.masking_change) {
          enqueueSnackbar("CE tracker masking updated", {
            variant: "success"
          })
        }
      }

      if (masking) {
        masking_data = masking.join(",");
      }

      if (excluded_ce_expert_ids) {
        excluded_ce_expert_ids_data = excluded_ce_expert_ids;
      }
    }
  } catch (error: any) {
    console.log(error);
  }



  // Creating a fake loading state when no api calls
  // Why -> read more about React Batch State Update
  // Reason I am doing it because so that setLoading can become true and then false
  // If I don't do it, react will jump straight and make the setLoading false because the
  // gap between both of them is really really low
  if (!filterPayload.masking_change) {
    await new Promise((resolve) => {
      setTimeout(() => {
        resolve(true);
      }, 200);
    })
  }

  setData(() => {
    if (!expertData) {
      return expertData;
    }


    let ce_expert_final: GetCEExpertsResponseData["data"] = expertData.data;

    // Current Company
    if (filterPayload.current_company) {
      ce_expert_final = ce_expert_final.filter((ce_expert) => {
        const current_company = ce_expert.meta?.current_company?.name || (ce_expert.meta?.current_company_tag === "self_employed" ? "Self Employed" : null) || null
        if (current_company && current_company.toLocaleLowerCase().includes(filterPayload.current_company?.toLocaleLowerCase() || "")) {
          return true;
        } else {
          return false;
        }
      })
    }

    // Relevant Company
    if (filterPayload.relevant_company) {
      ce_expert_final = ce_expert_final.filter((ce_expert) => {
        const relevant_company = ce_expert.meta?.relevant_company?.name || null
        if (relevant_company && relevant_company.toLocaleLowerCase().includes(filterPayload.relevant_company?.toLocaleLowerCase() || "")) {
          return true;
        } else {
          return false;
        }
      })
    }

    // Base Location
    if (filterPayload.base_location) {
      ce_expert_final = ce_expert_final.filter((ce_expert) => {
        const base_location = ce_expert.base_location_value?.name || null
        if (base_location && base_location.toLocaleLowerCase().includes(filterPayload.base_location?.toLocaleLowerCase() || "")) {
          return true;
        } else {
          return false;
        }
      })
    }

    // Date
    if (filterPayload.date) {
      const dates = filterPayload.date.split("&");
      const date1 = dates[1];
      const date2 = dates[2];

      const { method: method1, date: date_1, dateName } = getDateMethod(date1);

      ce_expert_final = ce_expert_final.filter((d) => {
        const date_name = dateName === "added_on" ? d.meta.fk_project_added?.added_on : d.last_status_updated_on;
        if (date_name) {
          const shared_date = LocalDayjs(date_name);

          if (method1 === "lessthanequalto") {
            return shared_date.isBefore(date_1)
          } else if (method1 === "greaterthanequalto") {
            return shared_date.isAfter(date_1)
          }
        } else {
          return false;
        }
      })


      if (date2) {
        const { method: method2, date: date_2, dateName } = getDateMethod(date1);

        ce_expert_final = ce_expert_final.filter((d) => {
          const date_name = dateName === "added_on" ? d.meta.fk_project_added?.added_on : d.last_status_updated_on;

          if (date_name) {
            const shared_date = LocalDayjs(date_name);

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

    const final_data: GetCEExpertsResponseData = {
      ...expertData,
      filtered_data: ce_expert_final
    }

    if (masking_data) {
      final_data.masking = masking_data;
    }

    if (excluded_ce_expert_ids_data) {
      final_data.excluded_ce_expert_ids = excluded_ce_expert_ids_data;
    }

    return final_data;
  });

  setFilters((prev) => ({
    ...prev,
    isFilterChange: false,
    masking_change: false
  }))

  setLoading(false);
};


export const expertActions = async (action: "include_expert" | "exclude_expert", setLoading: (l: boolean) => void, setData: Dispatch<SetStateAction<GetCEExpertsResponseData | null>>,
) => {
  setLoading(true);
  await new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, 100);
  })
  setData((prev) => {
    if (!prev) {
      return null;
    }
    const excluded_ce_expert_ids = prev.excluded_ce_expert_ids?.split(",");

    if (action === "include_expert") {
      return { ...prev, filtered_data: prev.data.filter((d) => !!excluded_ce_expert_ids?.find(id => +id === d.id)) }
    } else {
      return { ...prev, filtered_data: prev.data.filter((d) => !excluded_ce_expert_ids?.find(id => +id === d.id)) }
    }
  })
  setLoading(false);
}

export const includeExcludeExperts = async (setLoading: (l: boolean) => void, enqueueSnackbar: EnqueueSnackbar, setData: Dispatch<SetStateAction<GetCEExpertsResponseData | null>>, selectedAction: SelectedAction, select: Select, data: GetCEExpertsResponseData | null, project_id: string | null, setSelect: SetSelect) => {
  try {
    setLoading(true);

    if (!data || !project_id) {
      return;
    }

    if (select.selectedCards.length === 0) {
      enqueueSnackbar("Select experts before action");
    }

    let excluded_ce_expert_ids = (data.excluded_ce_expert_ids || "").split(",");
    const selected_calls_ids = select.selectedCards.map(s => s.id);

    for (let id of selected_calls_ids) {
      if (selectedAction?.label === "Include Experts") {
        excluded_ce_expert_ids = excluded_ce_expert_ids.filter(d => +d !== id);
      } else {
        excluded_ce_expert_ids.push(id.toString());
      }
    }

    excluded_ce_expert_ids = removeDuplicates(excluded_ce_expert_ids);

    const payload = {
      excluded_ce_expert_ids: excluded_ce_expert_ids.join(","),
      masking: data.masking || "",
      project_id
    }

    const response = await RequestServer(APIRoutes.projectCETracker, "PATCH", payload);

    if (response.success) {
      const msg = selectedAction?.label === "Include Experts" ? "Experts' Included Successfully" : "Experts' Excluded Successfully";
      setData((prev) => {
        if (!prev) return prev;

        return {
          ...prev,
          excluded_ce_expert_ids: excluded_ce_expert_ids.join(","),
          filtered_data: prev.data
        }
      })

      setSelect((prev) => ({
        isClicked: false,
        selectedCards: [],
        callAction: null
      }))
      enqueueSnackbar(msg, {
        variant: "success"
      })
    } else {
      enqueueSnackbar(response.message || response.error, {
        variant: "warning"
      })
    }

  } catch (err) {
    console.log(err);
  } finally {
    setLoading(false);
  }
}