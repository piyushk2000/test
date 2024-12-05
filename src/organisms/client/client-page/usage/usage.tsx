import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { APIRoutes } from "../../../../constants";
import TableViewCommon from "../../../../molecules/table-view-common";
import { useFetch } from "../../../../utils/hooks/useFetch";
import { useGetParams } from "../../../../utils/hooks/useGetParams";
import { Dialog, FiltersPayload, GetUsageResponseData } from "./types";
import { defaultCalendarFilter, defaultDialog, handleClose, headCells } from "./helper";
import TableCellsRow from "./tableCells";
import ToolbarRightElement from "./toolbarRightEl";
import { isClient } from "../../../../utils/role";
import SkeletonLoader from "../../../../atoms/project-details/SkeletonLoader";
import { ShowAnswersDialog } from "../../../project/project-pe-mapping/actions/show-answers";
import { getMonth } from "../helper";
import { LocalDayjs } from "../../../../utils/timezoneService";
import { Dayjs } from "dayjs";

export type IsCalenderTypes = {
    open: boolean;
    value: string;
    type: string | null;
    select: "between" | "on" | "before" | "after" | null;
    date: Dayjs | null;
    tDate: Dayjs | null;
}

export type SetCalenderTypes = Dispatch<SetStateAction<IsCalenderTypes>>

export function UsageTab({is_cem}: {is_cem?: boolean}) {
    const client_id = useGetParams("id");
    const [filters, setFilters] = useState<FiltersPayload>({
        isFilterChange: false,
        calendar: "&greaterthanequalto___call_start_time=" + getMonth(6),
        view: isClient() ? "client" : "internal"
    });
    const [isCalender, setCalender] = useState<IsCalenderTypes>(defaultCalendarFilter);
    const url = APIRoutes.clientsUsage + "?fk_client=" + client_id + "&view=" + filters.view + (filters.calendar || "")
    const { data: rowsData, refetchWithNewUrl, loading } = useFetch<GetUsageResponseData["data"]>(url);
    const [dialog, setDialog] = useState<Dialog>(defaultDialog);

    useEffect(() => {
        if (filters.isFilterChange) {
            console.log({url})
            refetchWithNewUrl(url);
            setFilters((filters) => ({
                ...filters,
                isFilterChange: false
            }))
        }
    }, [filters.isFilterChange]);

    if (loading) {
        return <SkeletonLoader
            width="100%"
            height="375px"
            
        />
    }

    return (
        <>
            {rowsData &&
                <TableViewCommon<any>
                    rows={rowsData.column_data}
                    totalSelected={0}
                    title="Usage Table"
                    headCells={headCells.filter(h => rowsData.columns.split(",").includes(h.id))}
                    isSelected={false}
                    selectAllowed={(row) => false}
                    handleTableRowClick={(e, row) => { }}
                    tableCells={(row, labelId, isSelected) => <TableCellsRow
                        row={row}
                        labelId={labelId}
                        isSelected={isSelected}
                        setDialog={setDialog}
                    />}
                    containerSx={{maxHeight: "60vh"}}
                    paperSx={{marginBottom: "0"}}
                    outerBoxSx={{mt: "0"}}
                    isItemSelected={(id) => false}
                    handleSelectAllClick={(e) => { }}
                    ToolbarRightElement={<ToolbarRightElement isCalender={isCalender} setCalender={setCalender} filters={filters} setFilters={setFilters} fk_client={client_id} columns={rowsData.columns} url={url} is_cem={is_cem} />}
                />
            }

            {/* Answers Task */}
            {dialog.show_answers.compliances?.answers &&
                <ShowAnswersDialog
                    isOpen={dialog.show_answers.state}
                    handleClose={() => handleClose(setDialog)}
                    answers={dialog.show_answers.compliances.answers}
                    show_reviewed_by={dialog.show_answers.compliances.show_reviewed_by?.name ? dialog.show_answers.compliances.show_reviewed_by : null}
                />
            }

        </>
    )
}