import { BoxFlex } from '../../../atoms/boxSpaceBtw';
import SearchBar from '../../app-bar-common/search-bar';
import { useCETrackerContext } from '../../../organisms/project/ce-tracker/context';
import { FormControlLabel, Switch } from '@mui/material';
import { useIsTablet } from '../../../utils/hooks/useIsMobile';
import CalenderPickerDialog from '../../calender-picker-dialog/calenderPickerDialog';
import DatePickerField from '../../../atoms/date-picker-field';
import { useState } from 'react';
import { CalenderTypes } from '../project-cards-page';
import { dataRangeFilter } from '../calls-page/helper';
import { LocalDayjs } from '../../../utils/timezoneService';

const CETrackerNavbarItems = () => {

    // Making tablet screen like mobile
    const isMobile = useIsTablet();
    const { filters, setFilters } = useCETrackerContext();
    const [isCalender, setCalender] = useState<CalenderTypes>({
        open: false,
        value: "",
        type: "added_on",
        date: null,
        tDate: null,
        select: null
    });
    const calenderOpenClickHandler = () => {
        setCalender((prev: any) => ({ ...prev, open: true }));
    };
    const calenderCloseBtnClickHandler = () => {
        setCalender(() => ({
            open: false,
            value: "",
            type: "added_on",
            date: null,
            tDate: null,
            select: null
        }));
        setFilters((prev) => ({
            ...prev,
            date: null,
            isFilterChange: true
        }));
    }

    return (
        <BoxFlex sx={{
            flexDirection: "column", alignItems: "flex-start", "& p": {
                fontSize: "0.75rem"
            }
        }}>
            <BoxFlex>
                <SearchBar
                    onSearch={(text) => setFilters((prev) => ({
                        ...prev,
                        current_company: text,
                        isFilterChange: true,
                    }))}
                    placeholder="Current Company"
                    searchValue={filters.current_company || ""}
                    maxWidth="170px"
                    minWidth={"170px"}
                    p="5px"
                    m={
                        {
                            sm: "0 0.75rem 0 0",
                            xs: "0 0.75rem 0 0"
                        }
                    }
                />
                <SearchBar
                    onSearch={(text) => setFilters((prev) => ({
                        ...prev,
                        relevant_company: text,
                        isFilterChange: true,
                    }))}
                    placeholder="Relevant Company"
                    searchValue={filters.relevant_company || ""}
                    maxWidth="170px"
                    minWidth={"170px"}
                    p="5px"
                    m={
                        {
                            sm: "0 0.75rem 0 0",
                            xs: "0 0.75rem 0 0"
                        }
                    }
                />
                <SearchBar
                    onSearch={(text) => setFilters((prev) => ({
                        ...prev,
                        base_location: text,
                        isFilterChange: true,
                    }))}
                    placeholder="Base Location"
                    searchValue={filters.base_location || ""}
                    maxWidth="170px"
                    minWidth={"170px"}
                    p="5px"
                    m={
                        {
                            sm: "0 0.75rem 0 0",
                            xs: "0 0.75rem 0 0"
                        }
                    }
                />
            </BoxFlex>
            <BoxFlex>
                <p>Masking: </p>
                <FormControlLabel
                    value="start"
                    control={<Switch
                        checked={filters.name_masking}
                        sx={{
                            color: "#EC9324",
                        }}
                        color="primary"
                        onChange={(e, checked) => {
                            setFilters((prev) => ({
                                ...prev,
                                isFilterChange: true,
                                name_masking: checked,
                                masking_change: true
                            }))
                        }} />}
                    sx={{
                        "& span": {
                            fontSize: "0.75rem",
                        }
                    }}
                    label="Name"
                    labelPlacement="start"
                />
                <FormControlLabel
                    value="start"
                    control={<Switch
                        checked={filters.added_on_masking}
                        sx={{
                            color: "#EC9324",
                        }}
                        color="primary"
                        onChange={(e, checked) => {
                            setFilters((prev) => ({
                                ...prev,
                                isFilterChange: true,
                                added_on_masking: checked,
                                masking_change: true
                            }))
                        }} />}
                    sx={{
                        "& span": {
                            fontSize: "0.75rem",
                        }
                    }}
                    label="Added On"
                    labelPlacement="start"
                />
                <FormControlLabel
                    value="start"
                    control={<Switch
                        checked={filters.last_updated_on_masking}
                        sx={{
                            color: "#EC9324",
                        }}
                        color="primary"
                        onChange={(e, checked) => {
                            setFilters((prev) => ({
                                ...prev,
                                isFilterChange: true,
                                last_updated_on_masking: checked,
                                masking_change: true
                            }))
                        }} />}
                    sx={{
                        "& span": {
                            fontSize: "0.75rem",
                        }
                    }}
                    label="Last Updated"
                    labelPlacement="start"
                />
                {!isMobile && <hr className="divider" />}
                <BoxFlex sx={{ maxWidth: "400px" }}>
                    <DatePickerField
                        label={isCalender.type === "added_on" ? "Added On: " : "Last Updated: "}
                        isCalenderValue={isCalender.value}
                        calenderOpenClickHandler={calenderOpenClickHandler}
                        calenderCloseBtnClickHandler={calenderCloseBtnClickHandler}
                        isMobile={isMobile}
                        // labelStyle={{ fontWeight: "500", fontSize: "14px" }}
                    />
                </BoxFlex>

                {/* Calender Picker Dialog */}
                {isCalender.open &&
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
                            const date_url = dataRangeFilter(date, tDate, select, calenderType, undefined, true) || null;
                            setCalender((prev) => ({...prev, date: date ? LocalDayjs(date) : null,tDate: tDate ? LocalDayjs(tDate) : null, select}))

                            setFilters((prev) => ({
                                ...prev,
                                date: date_url,
                                isFilterChange: true
                            }))
                        }}
                        calenderType={isCalender.type}
                        titleRadioBtns={[
                            {
                              label: "Added On",
                              value: "added_on",
                            },
                            {
                              value: "last_updated",
                              label: "Last Updated",
                            },
                          ]}
                        resetCalenderBtnClickHandler={calenderCloseBtnClickHandler}
                    />
                }
            </BoxFlex>
        </BoxFlex>
    )
}

export default CETrackerNavbarItems