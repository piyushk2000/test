import { BoxFlex } from '../../../atoms/boxSpaceBtw';
import SearchBar from '../../app-bar-common/search-bar';
import { useIsTablet } from '../../../utils/hooks/useIsMobile';
import CalenderPickerDialog from '../../calender-picker-dialog/calenderPickerDialog';
import DatePickerField from '../../../atoms/date-picker-field';
import { dataRangeFilter } from '../calls-page/helper';
import { useCEMappingExpertContext } from '../../../pages/ce-mapping-expert/context';
import { calendarDialogType, calenderDialogTitles } from './helper';
import { LocalDayjs } from '../../../utils/timezoneService';

const CEMappingExpertsNavbarItems = () => {

    // Making tablet screen like mobile
    const isMobile = useIsTablet();
    const { filters, setFilters, projectClientDetails , isCalender, setCalender} = useCEMappingExpertContext();
    const calenderOpenClickHandler = () => {
        setCalender((prev: any) => ({ ...prev, open: true }));
    };
    const calenderCloseBtnClickHandler = () => {
        setCalender((prev: any) => ({
            ...prev,
            open: false,
            value: "",
            type: calendarDialogType(projectClientDetails),
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
            "& p": {
                fontSize: "0.75rem"
            },
            marginBottom: "0.25rem"
        }}>
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
            {(projectClientDetails.addedOnMasking && projectClientDetails.lastUpdatedMasking) ?
                <></> :
                <BoxFlex sx={{ maxWidth: "400px" }}>
                    <DatePickerField
                        label={isCalender.type === "added_on" ? "Added On: " : "Last Updated: "}
                        isCalenderValue={isCalender.value}
                        calenderOpenClickHandler={calenderOpenClickHandler}
                        calenderCloseBtnClickHandler={calenderCloseBtnClickHandler}
                        isMobile={isMobile}
                    />
                </BoxFlex>
            }

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
                    titleRadioBtns={calenderDialogTitles(projectClientDetails)}
                    resetCalenderBtnClickHandler={calenderCloseBtnClickHandler}
                />
            }
        </BoxFlex>
    )
}

export default CEMappingExpertsNavbarItems