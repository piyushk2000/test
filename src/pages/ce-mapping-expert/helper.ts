import { Dispatch, SetStateAction } from "react";
import { APIRoutes } from "../../constants";
import { RequestServer } from "../../utils/services";
import { FiltersPayload, GetCEExpertsResponseData, SetCalender, SetDialog, SetFiltersPayload, SetGetCEExpertsResponseData } from "./types";
import { EnqueueSnackbar } from "notistack";
import { getDateMethod } from "../../organisms/project/ce-tracker/helper";
import { LocalDayjs } from "../../utils/timezoneService";
import { calendarDialogType } from "../../molecules/nav-bars/ce-mapping-experts/helper";

export async function getExperts(project_id: string | null, filters: FiltersPayload, setData: SetGetCEExpertsResponseData, setLoading: (loading: boolean) => void, code: string | null, setProjectClientDetails: Dispatch<SetStateAction<{
    nameMasking: boolean,
    addedOnMasking: boolean,
    lastUpdatedMasking: boolean
}>>, enqueueSnackbar: EnqueueSnackbar, setCalender: SetCalender) {
    if (!project_id) {
        return;
    }
    setData(() => null);
    setLoading(true);
    try {
        const url = `${APIRoutes.projects}/client?id=${project_id}` + (code ? ("&code=" + code) : "") + ("&equalto___fk_project=" + project_id);

        const response = await RequestServer(url, "GET");

        if (response.success) {
            const data = response.data;
            const expert_data = data.expertData;
            const project_masking = data.projectData;
            setData(() => ({...expert_data,filtered_data: expert_data.data}));
            setProjectClientDetails(() => project_masking);
            setCalender((prev) => ({...prev, type: calendarDialogType(project_masking) }))
        } else {
            enqueueSnackbar(response.message || response.error, {
                variant: "warning"
            })
        }
    } catch (err: any) {
        enqueueSnackbar(err || "Something happened Wrong", {
            variant: "warning"
        })
        console.log(err);
    } finally {
        setLoading(false);
    }
}

export const defaultDialogValues = {
    prioritizeExpert: {
        state: false,
        rowData: null
    },
    loginToContinue: {
        state: false
    }
}

export default function handleCloseDialog(setDialog: SetDialog) {
    setDialog(defaultDialogValues);
}

export const defaultFilterValues = {
    rowsPerPage: 192,
    current_company: null,
    relevant_company: null,
    base_location: null,
    date: null,
    isFilterChange: false,
    isFilterApplied: false
}

export const applyFilters = async (
    filterPayload: FiltersPayload,
    setData: Dispatch<SetStateAction<GetCEExpertsResponseData | null>>,
    setFilters: SetFiltersPayload,
    setLoading: (loading: boolean) => void,
    expertData: GetCEExpertsResponseData | null,
) => {
    setLoading(true);

    // Creating a fake loading state when no api calls
    // Why -> read more about React Batch State Update
    // Reason I am doing it because so that setLoading can become true and then false
    // If I don't do it, react will jump straight and make the setLoading false because the
    // gap between both of them is really really low
    await new Promise((resolve) => {
        setTimeout(() => {
            resolve(true);
        }, 200);
    })

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

        return final_data;
    });

    setFilters((prev) => ({
        ...prev,
        isFilterChange: false,
        masking_change: false
    }))

    setLoading(false);
};

