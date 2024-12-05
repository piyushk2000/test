

import { IsCalenderTypes, SetCalender, filterPayload, setFilterPayload } from "../../../pages/Calls/types";
import DropDownFilter from "../../../atoms/drop-down-filter";
import { CallStatusType, SortBy, calenderCloseBtn, callMediumArr, clientSortBy, dataRangeFilter, expertSortBy, expertType } from "./helper";
import DatePickerField from "../../../atoms/date-picker-field";
import CalenderPickerDialog from "../../calender-picker-dialog/calenderPickerDialog";
import { isAdmin, isClient, isExpert, isSuperAdmin } from "../../../utils/role";
import { useIsTablet } from "../../../utils/hooks/useIsMobile";
import DropDownDrawerWithChip from "../../dropdown-drawer-with-chip";
import CustomBtnFilled from "../../../atoms/form-molecules/CustomBtnFilled";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import { LocalDayjs } from "../../../utils/timezoneService";

type Props = {
    setFilterPaylod: setFilterPayload;
    filterPayload: filterPayload;
    isCalender: IsCalenderTypes;
    setCalender: SetCalender;
    queryString: string | null;
    submitPaymentRequest(): Promise<void>;
};

const CallsNavbarItems = ({ setFilterPaylod, filterPayload, isCalender, setCalender, queryString, submitPaymentRequest }: Props) => {

    const calenderCloseBtnClickHandler = () => calenderCloseBtn(setCalender, setFilterPaylod);

    const calenderOpenClickHandler = () => {
        setCalender((prev) => ({ ...prev, open: true }));
    };

    // using tablet screen as mobile
    const isMobile = useIsTablet();

    return (
        <>
            {/* Sort By Filter */}
            {isMobile ?
                <DropDownDrawerWithChip
                    chipLabel="Sort By"
                    isClearDisabled
                    value={filterPayload.sort}
                    listArr={isExpert() ? expertSortBy : isClient() ? clientSortBy : SortBy}
                    onItemSelect={(type: string | null) => {
                        setFilterPaylod((prev) => ({ ...prev, sort: type || "" }))
                    }}
                />
                : <>
                    <p className="sort">Sort By:</p>
                    <DropDownFilter
                        setFilterPayload={async (sort: string) => {
                            setFilterPaylod((prev) => ({ ...prev, sort }))
                        }
                        }
                        dropDownItems={isExpert() ? expertSortBy : isClient() ? clientSortBy : SortBy}
                        filterValue={filterPayload.sort}
                    />
                    <hr />
                </>
            }


            {/* Calender Filter */}
            <DatePickerField
                label={"Call Date:"}
                isCalenderValue={isCalender.value}
                calenderOpenClickHandler={calenderOpenClickHandler}
                calenderCloseBtnClickHandler={calenderCloseBtnClickHandler}
                isMobile={isMobile}
            />

            {!isMobile && <hr />}

            {isExpert() &&
                <>
                    {isMobile ?
                    <DropDownDrawerWithChip
                        chipLabel="Call Status"
                        isClearDisabled
                        value={filterPayload.status}
                        listArr={CallStatusType}
                        onItemSelect={(status: string | null) => {
                            setFilterPaylod((prev) => ({ ...prev, status: status || "" }))
                        }}
                    />
                    :
                    <>
                        {/* Tab Filter */}
                        <p className="sort">Call Status:</p>
                        <DropDownFilter
                            setFilterPayload={(status: string) => {
                                setFilterPaylod((prev) => ({ ...prev, status }))
                            }
                            }
                            dropDownItems={CallStatusType}
                            filterValue={filterPayload.status}
                            noMinWidth
                        />
                    </>}
                    <CustomBtnFilled
                        variant="contained"
                        label="Submit Payment Request"
                        onClick={submitPaymentRequest}
                    />
                </>
            }

            {isClient() &&
                (isMobile ?
                    <DropDownDrawerWithChip
                        chipLabel="Call Medium"
                        isClearDisabled
                        value={filterPayload.call_medium}
                        listArr={callMediumArr}
                        onItemSelect={(call_medium: string | null) => {
                            setFilterPaylod((prev) => ({ ...prev, call_medium: call_medium || "" }))
                        }}
                    /> :
                    <>
                        {/* Call Medium */}
                        <p className="sort">Call Medium:</p>
                        <DropDownFilter
                            setFilterPayload={(call_medium: string) => {
                                setFilterPaylod((prev) => ({ ...prev, call_medium }))
                            }
                            }
                            dropDownItems={callMediumArr}
                            filterValue={filterPayload.call_medium}
                        />
                    </>)}

            {/* Tab Filter */}
            {!isExpert() && !isClient() &&
                (isMobile ?
                    <DropDownDrawerWithChip
                        chipLabel="Expert Type"
                        isClearDisabled
                        value={filterPayload.expert_type}
                        listArr={expertType}
                        onItemSelect={(expert_type: string | null) => {
                            setFilterPaylod((prev) => ({ ...prev, expert_type: expert_type || "" }))
                        }}
                    />
                    :
                    <>
                        <p className="sort">Expert Type:</p>
                        <DropDownFilter
                            setFilterPayload={(expert_type: string) => {
                                setFilterPaylod((prev) => ({ ...prev, expert_type }))
                            }
                            }
                            dropDownItems={expertType}
                            filterValue={filterPayload.expert_type}
                            noMinWidth
                        />
                    </>)
            }
            {(isSuperAdmin() || isAdmin()) &&

                <FormControlLabel
                    value="start"
                    control={<Switch
                        checked={filterPayload.isBadCall}
                        sx={{
                            color: "#EC9324",
                            ml: -1,
                            mr: 1,
                        }}
                        color="primary"
                        onChange={(e, checked) => {
                            setFilterPaylod((prev) => ({
                                ...prev,
                                isFilterApplied: true,
                                isBadCall: checked,
                            }))
                        }} />}
                    sx={{
                        "& span": {
                            fontSize: "0.75rem",
                            // color: "#252B3B",
                        }
                    }}
                    label="Bad Call"
                    labelPlacement="start"
                />
            }
            {(isSuperAdmin()) &&

                <FormControlLabel
                    value="start"
                    control={<Switch
                        checked={filterPayload.NoER}
                        sx={{
                            color: "#EC9324",
                            ml: -1,
                            mr: 1,
                        }}
                        color="primary"
                        onChange={(e, checked) => {
                            setFilterPaylod((prev) => ({
                                ...prev,
                                isFilterApplied: true,
                                NoER: checked,
                            }))
                        }} />}
                    sx={{
                        "& span": {
                            fontSize: "0.75rem",
                            // color: "#252B3B",
                        }
                    }}
                    label="No ER."
                    labelPlacement="start"
                />
            }


            {/* Calender Picker Dialog */}
            {isCalender.open &&
                <CalenderPickerDialog
                    isOpen={isCalender.open}
                    handleClose={() =>
                        setCalender((prev: any) => ({ ...prev, open: false }))
                    }
                    startDate={isCalender.date}
                    endDate={isCalender.tDate}
                    setCalender={setCalender}
                    select={isCalender.select}
                    okBtnApiCalls={(
                        date: Date | null,
                        tDate: Date | null,
                        select: "between" | "on" | "before" | "after" | null,
                        calenderType: string | null
                    ) => {
                        dataRangeFilter(date, tDate, select, calenderType, setFilterPaylod);
                        setCalender((prev) => ({...prev, date: date ? LocalDayjs(date) : null,tDate: tDate ? LocalDayjs(tDate) : null, select}))
                    }}
                    calenderType={"call_start_time"}
                    titleRadioBtns={[]}
                    singleTitle={"Calender Filter: Call Date"}
                    resetCalenderBtnClickHandler={calenderCloseBtnClickHandler}
                />
            }

        </>
    );
};
export default CallsNavbarItems;
