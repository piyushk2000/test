import { IconButton, Tooltip } from "@mui/material";
import { BoxFlex } from "../../../../atoms/boxSpaceBtw";
import { FiltersPayload, SetFiltersPayload } from "./types"
import SettingsIcon from '@mui/icons-material/Settings';
import LabeledComponent from "../../../../molecules/nav-bars/expert-cards-page/labeledComponent";
import DropDownFilter from "../../../../atoms/drop-down-filter";
import { defaultCalendarFilter, generateDownloadKeyTitleObject, UsageTableView } from "./helper";
import { useBoolean } from "../../../../utils/hooks/useBoolean";
import { EditColumnsDialog } from "./edit-columns";
import DatePickerField from "../../../../atoms/date-picker-field";
import { useEffect, useState } from "react";
import CalenderPickerDialog from "../../../../molecules/calender-picker-dialog/calenderPickerDialog";
import { dataRangeFilter } from "../../all-clients/helper";
import { useIsMobile } from "../../../../utils/hooks/useIsMobile";
import { IsCalenderTypes, SetCalenderTypes } from "./usage";
import { isClient, isSuperAdmin } from "../../../../utils/role";
import DownloadBtn from "../../../../atoms/download-btn";
import { downloadExcel } from "../../../../utils/download-excel";
import { HOSTURL_LOCAL } from "../../../../utils/services";
import { useFullPageLoading } from "../../../../atoms/full-page-loading/loadingContext";
import { LocalDayjs } from "../../../../utils/timezoneService";

type Props = {
    filters: FiltersPayload;
    setFilters: SetFiltersPayload;
    fk_client: string | null;
    columns: string;
    isCalender: IsCalenderTypes;
    setCalender: SetCalenderTypes;
    url: string;
    is_cem?: boolean;
}

export default function ToolbarRightElement({ filters, setFilters, fk_client, columns, isCalender, setCalender, url, is_cem = false }: Props) {
    const { value: isEditColumnsOpen, setTrue: openEditColumns, setFalse: closeEditColumns } = useBoolean();
    const isMobile = useIsMobile();
    const { setLoading } = useFullPageLoading();

    const calenderCloseBtnClickHandler = () => {
        setCalender(() => (defaultCalendarFilter));
        setFilters((prev) => ({
            ...prev,
            calendar: null,
            isFilterChange: true,
        }
        ));
    };

    const calenderOpenClickHandler = () => {
        setCalender((prev: any) => ({ ...prev, open: true }));
    };

    return (
        <>
            <BoxFlex sx={{ backgroundColor: "#f4f4f4", padding: "2px", borderRadius: "4px", gap: "1rem" }}>
                {!isClient() &&
                    <Tooltip title="Edit Columns">
                        <IconButton onClick={openEditColumns}>
                            <SettingsIcon />
                        </IconButton>
                    </Tooltip>
                }

                {(isSuperAdmin() || is_cem) &&
                    <DownloadBtn
                        onClick={async () => {
                            downloadExcel({
                                title: "Usage - Client Name - Date Filter",
                                data: [{
                                    sheet_title: "Usage",
                                    apiUrl: HOSTURL_LOCAL + url,
                                    data_key: "data.column_data",
                                    keyTitles: generateDownloadKeyTitleObject(columns)
                                }]
                            }, setLoading)
                        }}
                    />
                }

                <DatePickerField
                    label={
                        isCalender.type === "call_start_time" || !isCalender.type
                            ? "Call Date: "
                            : "Created: "
                    }
                    isCalenderValue={isCalender.value}
                    calenderOpenClickHandler={calenderOpenClickHandler}
                    calenderCloseBtnClickHandler={calenderCloseBtnClickHandler}
                    isMobile={isMobile}
                />

                {!isClient() &&
                    <LabeledComponent
                        label="" component={
                            <DropDownFilter
                                link={null}
                                filterValue={filters.view}
                                setFilterPayload={(view: string) =>
                                    view && setFilters((prev) => ({ ...prev, view, isFilterChange: true }))
                                }
                                dropDownItems={UsageTableView}
                            />}
                    />
                }

            </BoxFlex>

            {/* Edit Columns */}
            <EditColumnsDialog
                filters={filters}
                setFilters={setFilters}
                fk_client={fk_client}
                handleClose={closeEditColumns}
                isOpen={isEditColumnsOpen}
                columns={columns}
            />


            {/* Calender Picker Dialog */}
            <CalenderPickerDialog
                isOpen={isCalender.open}
                handleClose={() =>
                    setCalender((prev) => ({ ...prev, open: false }))
                }
                select={isCalender.select}
                startDate={isCalender.date}
                endDate={isCalender.tDate}
                setCalender={setCalender}
                okBtnApiCalls={(
                    date: Date | null,
                    tDate: Date | null,
                    select: any,
                    calenderType: string
                ) => {
                    dataRangeFilter(date, tDate, select, calenderType, undefined, (date) => {
                        setFilters((prev) => ({
                            ...prev,
                            calendar: date,
                            isFilterChange: true
                        }))
                    });
                    setCalender((prev) => ({...prev, date: date ? LocalDayjs(date) : null,tDate: tDate ? LocalDayjs(tDate) : null, select}))
                }}
                calenderType={isCalender.type}
                titleRadioBtns={[
                    {
                        label: "Call Date",
                        value: "call_start_time",
                    }]}
                resetCalenderBtnClickHandler={calenderCloseBtnClickHandler}
            />
        </>

    )
}