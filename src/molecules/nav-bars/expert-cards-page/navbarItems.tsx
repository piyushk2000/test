import Stack from "@mui/material/Stack";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import { ThemeProvider } from "@mui/material";
import "./nav-bar.scss"
import SortByFilters from "../../../atoms/drop-down-filter";
import MultiTabFilters from "../../../atoms/tabs-selector/multi";
import DatePickerField from "../../../atoms/date-picker-field";
import MultipleDropDown from "../../../atoms/drop-down-filter/multipleDropdown";

import { AppRoutes } from "../../../constants";
import { filterPayload, SetFilterPayload } from "../../../pages/Experts/types";
import { isAdmin, isClient, isSuperAdmin } from "../../../utils/role";
import { BadgeFilterOptions, calenderCloseBtnClickHandler, calenderDialogTitles, calenderOpenClickHandler, clientSortByExpertOptions, sortbyExpertOptions, statusOptions, theme } from "./helper";
import { IsCalenderTypes, SetCalenderTypes } from ".";
import ExpertTypes, { exportTypes } from "../../app-bar/expert-type";
import { useIsTablet } from "../../../utils/hooks/useIsMobile";
import DropDownDrawerWithChip from "../../dropdown-drawer-with-chip";
import CalenderPickerDialog from "../../calender-picker-dialog/calenderPickerDialog";
import { checkObjectValuesSame } from "../../../utils/utils";
import { defaultFilterPayload } from "../../../pages/Experts/helper";
import { useBoolean } from "../../../utils/hooks/useBoolean";
import LabeledComponent from "./labeledComponent";
import { useGetParams } from "../../../utils/hooks/useGetParams";
import DownloadBtn from "../../../atoms/download-btn";
import { downloadExcel } from "../../../utils/download-excel";
import { useFullPageLoading } from "../../../atoms/full-page-loading/loadingContext";
import { HOSTURL_LOCAL } from "../../../utils/services";
import { LocalDayjs } from "../../../utils/timezoneService";
import DropDownDrawerWithChipMultiple from "../../dropdown-drawer-with-chip-multiple";


type Props = {
    filterPayload: filterPayload;
    setFilterPayload: SetFilterPayload;
    isCalender: IsCalenderTypes;
    setCalender: SetCalenderTypes;
    okBtnApiCalls: (
        date: Date | null,
        tDate: Date | null,
        select: string | null,
        calenderType: string | null
    ) => void;
    setTypeFilter: (type: string) => void;
    getUrlPayload: () => Promise<{
        url: string;
        payload: any;
    } | undefined>
}

const ExpertCardsNavbarItems = ({
    filterPayload,
    setFilterPayload,
    isCalender,
    setCalender,
    okBtnApiCalls,
    setTypeFilter,
    getUrlPayload
}: Props) => {
    const { value: isSearchByOpen, setTrue: openSearchBy, setFalse: closeSearchBy } = useBoolean();
    const ce_mapping = useGetParams("ce_mapping");
    const expert_link = AppRoutes.EXPERT_SEARCH + "?page=1" + (ce_mapping ? "&ce_mapping=" + ce_mapping : "");

    // Making tablet screen like mobile
    const isMobile = useIsTablet();
    const SearchByFilled = isMobile && !checkObjectValuesSame(filterPayload.otherSearchFilter, defaultFilterPayload.otherSearchFilter)
    const { setLoading } = useFullPageLoading();

    return (
        <ThemeProvider theme={theme}>
            {isMobile ?
                <DropDownDrawerWithChip
                    chipLabel="Sort By"
                    isClearDisabled
                    value={filterPayload.sortFilter}
                    listArr={isClient() ? clientSortByExpertOptions : sortbyExpertOptions}
                    onItemSelect={(type: string | null) => {
                        setFilterPayload((prev: filterPayload) => {
                            prev = { ...prev, sortFilter: type, isFilterChange: true };
                            return prev;
                        })
                    }}
                /> :
                <LabeledComponent label="" component={<SortByFilters
                    link={expert_link}
                    filterValue={filterPayload.sortFilter}
                    setFilterPayload={(type: string) =>
                        setFilterPayload((prev: filterPayload) => {
                            prev = { ...prev, sortFilter: type, isFilterChange: true };
                            return prev;
                        })
                    }
                    dropDownItems={isClient() ? clientSortByExpertOptions : sortbyExpertOptions}
                />} />
            }

            {isMobile ? <>
                <DropDownDrawerWithChip
                    chipLabel="Badge"
                    value={filterPayload.badgeFilter[0] || null}
                    listArr={BadgeFilterOptions}
                    onItemSelect={(type: string | null) => {
                        setFilterPayload((prev) => ({
                            ...prev,
                            badgeFilter: type?.length ? [type] : [],
                            isFilterChange: true
                        }))
                    }}
                />
            </> :
                <>
                    <hr className="divider" />
                    <Stack direction={"row"} gap={"0.5rem"}>
                        <MultiTabFilters
                            formats={filterPayload.badgeFilter}
                            setFormats={(s: string[]) => setFilterPayload((prev) => ({
                                ...prev,
                                badgeFilter: s,
                                isFilterChange: true
                            }))}
                            options={BadgeFilterOptions}
                        />
                    </Stack>
                </>
            }

            {!isClient() && <>
                {!isMobile && <hr className="divider" />}
                <DatePickerField
                    label={
                        isCalender.type === "updated_at" || !isCalender.type
                            ? "Updated: "
                            : isCalender.type === "Tutorial completion"
                                ? "Tutorial completion"
                                : "Created: "
                    }
                    isCalenderValue={isCalender.value}
                    calenderOpenClickHandler={() => calenderOpenClickHandler(setCalender)}
                    calenderCloseBtnClickHandler={() => calenderCloseBtnClickHandler(setCalender, okBtnApiCalls)}
                    isMobile={isMobile}
                />
                {!isMobile && <hr className="divider" />}
                {isMobile ?
                    <DropDownDrawerWithChip
                        chipLabel="Type"
                        value={filterPayload.typeFilter}
                        listArr={exportTypes}
                        onItemSelect={(type: string | null) => {
                            const filterPayloadFinal: filterPayload = {
                                ...filterPayload,
                                typeFilter: type,
                                isFilterChange: true,
                            };
                            setFilterPayload((prev: filterPayload) => filterPayloadFinal);
                        }}
                    /> :
                    <LabeledComponent label="Type:" component={<ExpertTypes setTypeFilter={setTypeFilter} />} />
                }

                {!isMobile && <hr className="divider" />}
                {isMobile ?
                    <DropDownDrawerWithChipMultiple
                        chipLabel="Status"
                        selectedValues={filterPayload.statusFilter}
                        listArr={statusOptions}
                        onItemSelect={(filter: string[]) => {
                            setFilterPayload((prev) => ({
                                ...prev,
                                isFilterChange: true,
                                statusFilter: filter
                            }))
                        }}
                    /> :
                    <LabeledComponent label="Status:" component={
                        <MultipleDropDown
                            link={expert_link}
                            filterValue={filterPayload.statusFilter}
                            dropDownItems={statusOptions}
                            setFilterPayload={(filter: string[]) =>
                                setFilterPayload((prev) => ({
                                    ...prev,
                                    isFilterChange: true,
                                    statusFilter: filter,
                                }))
                            }
                        />}
                    />
                }

                {!isMobile && <hr className="divider" />}
                {isSuperAdmin() &&
                    <FormControlLabel
                        value="start"
                        control={<Switch
                            checked={filterPayload.pending_approvals}
                            sx={{
                                color: "#EC9324",
                            }}
                            color="primary"
                            onChange={(e, checked) => {
                                setFilterPayload((prev) => ({
                                    ...prev,
                                    isFilterChange: true,
                                    pending_approvals: checked,
                                }))
                            }} />}
                        sx={{
                            "& span": {
                                fontSize: "0.75rem",
                                // color: "#252B3B",
                            }
                        }}
                        label="Edits"
                        labelPlacement="start"
                    />
                }


                {!isMobile && <hr className="divider" />}
                {/* Download Button */}
                {(isSuperAdmin() || isAdmin()) && ce_mapping &&
                    <DownloadBtn
                        mobile_view
                        onClick={async () => {
                            const urlPayload = await getUrlPayload();

                            if (urlPayload) {
                                const { url, payload } = urlPayload;

                                let current_payload = { ...payload, limit: "500", page: "1" }

                                downloadExcel({
                                    title: "Expert table",
                                    data: [{
                                        sheet_title: "Experts",
                                        apiUrl: HOSTURL_LOCAL + url,
                                        data_key: "data",
                                        method: "POST",
                                        body: current_payload,
                                        keyTitles: {
                                            name: "Expert Name",
                                            status: "Status",
                                            "meta.current_company.name": "Current Company",
                                            "meta.current_company.designation": "Current Designation",
                                            "meta.relevant_company.name": "Relevant Company",
                                            "meta.relevant_company.designation": "Relevant Designation",
                                            "base_location_value.name": "Base Location",
                                        }
                                    }]
                                }, setLoading)
                            }

                        }}
                    />
                }


                {/* Calender Picker Dialog */}
                <CalenderPickerDialog
                    isOpen={isCalender.open}
                    handleClose={() =>
                        setCalender((prev: any) => ({ ...prev, open: false }))
                    }
                    setCalender={setCalender}
                    startDate={isCalender.date}
                    endDate={isCalender.tDate}
                    select={isCalender.select}
                    okBtnApiCalls={(
                        date: Date | null,
                        tDate: Date | null,
                        select: "between" | "on" | "before" | "after" | null,
                        calenderType: string | null
                    ) => {
                        okBtnApiCalls(date, tDate, select, calenderType);
                        setCalender((prev) => ({ ...prev, date: date ? LocalDayjs(date) : null, tDate: tDate ? LocalDayjs(tDate) : null, select }))
                    }}
                    calenderType={isCalender.type}
                    titleRadioBtns={calenderDialogTitles}
                    resetCalenderBtnClickHandler={() => calenderCloseBtnClickHandler(setCalender, okBtnApiCalls)}
                />
            </>}
        </ThemeProvider>
    )
}

export default ExpertCardsNavbarItems
