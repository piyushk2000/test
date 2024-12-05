import { useCallback, useEffect, useState } from "react";
import PageLayout from "../../../atoms/page-layout";
import TableViewCommon from "../../../molecules/table-view-common";
import { applyFilters, defaultFilters, expertActions, formatData, handleSelectAllClick, handleTableRowClick, headCells, includeExcludeExperts } from "./helper";
import { Filters, GetCEExpertsResponseData, RowsData, Select } from "./type";
import { useGetParams } from "../../../utils/hooks/useGetParams";
import { RequestServer } from "../../../utils/services";
import { APIRoutes } from "../../../constants";
import TableCellsRow from "./tableCells";
import CETrackerHeader from "../../../molecules/app-bars/ce-tracker";
import { useSnackbar } from "notistack";
import CETrackerNavbar from "../../../molecules/nav-bars/ce-tracker-page";
import { SelectedAction } from "../../../molecules/nav-bar-common/type";
import { CETrackerContext } from "./context";
import { useFullPageLoading } from "../../../atoms/full-page-loading/loadingContext";

export default function CETracker() {
    const project_id = useGetParams("project_id");
    const [data, setData] = useState<GetCEExpertsResponseData | null>(null);
    const { isLoading, setLoading } = useFullPageLoading();
    const defaultFilterPayload = defaultFilters;
    const [filters, setFilters] = useState<Filters>(defaultFilterPayload);
    const [selectedAction, setSelectedAction] = useState<SelectedAction>(null);
    const { enqueueSnackbar } = useSnackbar();
    const [select, setSelect] = useState<Select>({
        isClicked: false,
        selectedCards: [],
        callAction: null
    });

    useEffect(() => {
        (async () => {
            if (project_id) {
                const projectResponse = await RequestServer(APIRoutes.projects + "?id=" + project_id + "&show_columns=id,masking,meta", "GET");
                const projectData = projectResponse.data[0];
                const payload = {
                    show_columns: "id,meta,name,status,base_location,last_status_updated_on",
                    page: 1,
                    limit: 500,
                    show_base_location: "1",
                    equalto___fk_project: project_id
                }

                const response: GetCEExpertsResponseData = await RequestServer(APIRoutes.expertFilters, "POST", payload);

                setData({ ...response, filtered_data: response.data, excluded_ce_expert_ids: projectData?.meta?.excluded_ce_expert_ids || "", masking: projectData?.masking || "" });

                const masking_arr: string[] = projectData?.masking?.split(",") || [];

                setFilters((prev) => ({
                    ...prev,
                    name_masking: !!masking_arr.find(mask => mask === "name"),
                    added_on_masking: !!masking_arr.find(mask => mask === "added_on"),
                    last_updated_on_masking: !!masking_arr.find(mask => mask === "last_status_updated_on")
                }));
            }
        })()
    }, []);

    useEffect(() => {
        if (filters.isFilterChange) {
            applyFilters(filters, setData, setFilters, setLoading, data, enqueueSnackbar, project_id);
        }
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filters.isFilterChange]);

    useEffect(() => {
        if (selectedAction?.label === "Include Experts") {
            expertActions("include_expert", setLoading, setData);
        } else if (selectedAction?.label === "Exclude Experts") {
            expertActions("exclude_expert", setLoading, setData);
        }
    }, [selectedAction?.label, selectedAction?.title])

    useEffect(() => {
        if (select.callAction === "include_experts") {
            includeExcludeExperts(setLoading, enqueueSnackbar, setData, selectedAction, select, data, project_id,setSelect);
        } else if (select.callAction === "exclude_experts") {
            includeExcludeExperts(setLoading, enqueueSnackbar, setData, selectedAction, select, data, project_id,setSelect);
        }
    }, [select.callAction])

    if (!project_id) {
        enqueueSnackbar("Project ID not found", {
            variant: "warning"
        })
    }

    return (
        <PageLayout>
            <CETrackerContext.Provider value={{ filters, setFilters }}>
                <CETrackerHeader />
                <CETrackerNavbar
                    isFilterApplied={filters.isFilterApplied}
                    resetFilters={() => setFilters(defaultFilterPayload)}
                    includeExperts={
                        () => {
                            setSelect((prev) => ({
                                ...prev,
                                callAction: "include_experts"
                            }))
                        }
                    }
                    excludeExperts={() => {
                        setSelect((prev) => ({
                            ...prev,
                            callAction: "include_experts"
                        }))
                    }}
                    totalSelected={select.selectedCards.length}
                    selectClickHandler={async () => {
                        setSelect((prev) => ({
                            selectedCards: [],
                            isClicked: !prev.isClicked,
                            callAction: null
                        }))
                        setLoading(true);
                        await new Promise((resolve) => {
                            setTimeout(() => {
                                resolve(true);
                            }, 100);
                        })
                        setData((prev) => {
                            if (!prev) return prev;
                            return {
                                ...prev,
                                filtered_data: prev.data
                            }
                        })
                        setLoading(false);
                    }}
                    onActionSelect={(action: SelectedAction) => setSelectedAction(action)}
                    isSelectedClicked={select.isClicked}
                    selectedAction={selectedAction}
                />
                {data && !isLoading &&
                    <TableViewCommon<RowsData>
                        rows={formatData(data)}
                        totalSelected={select.selectedCards.length}
                        title=" "
                        key={"id"}
                        headCells={headCells}
                        isSelected={select.isClicked}
                        selectAllowed={(row) => {
                            return select.isClicked &&
                                (selectedAction?.label === "Include Experts" ? row.excluded : !row.excluded)
                        }
                        }
                        handleTableRowClick={(e, row, isSelectAllowed) => {
                            handleTableRowClick(e, row, isSelectAllowed, select, setSelect);
                        }}
                        tableCells={(row, labelId, isSelected) => <TableCellsRow
                            row={row}
                            labelId={labelId}
                            isSelected={isSelected}
                        />}
                        isItemSelected={(id) => select.selectedCards.map((prev) => prev.id).indexOf(id) !== -1}
                        handleSelectAllClick={(e, currentRow) => {
                            handleSelectAllClick(e, currentRow, select, setSelect);
                        }}
                        containerSx={{ maxHeight: "70vh" }}
                    />}
            </CETrackerContext.Provider>
        </PageLayout>
    )
}