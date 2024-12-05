import { BoxFlex } from '../../../atoms/boxSpaceBtw';
import { useIsTablet } from '../../../utils/hooks/useIsMobile';
import CalenderPickerDialog from '../../calender-picker-dialog/calenderPickerDialog';
import DatePickerField from '../../../atoms/date-picker-field';
import { useState } from 'react';
import { CalenderTypes } from '../project-cards-page';
import { currenciesList } from './helper';
import { LocalDayjs } from '../../../utils/timezoneService';
import DropDownDrawerWithChip from '../../dropdown-drawer-with-chip';
import DropDownFilter from '../../../atoms/drop-down-filter';
import { useExchangeRateContext } from '../../../pages/exchange-rate/context';

const ExchangeRateNavbarItems = () => {

    // Making tablet screen like mobile
    const isMobile = useIsTablet();
    const { filters, setFilters } = useExchangeRateContext();
    const [isCalender, setCalender] = useState<CalenderTypes>({
        open: false,
        value: "",
        type: "",
        date: null,
        tDate: null,
        select: null
    });

    const calenderOpenClickHandler = () => {
        setCalender((prev: any) => ({ ...prev, open: true }));
    };
    const calenderCloseBtnClickHandler = () => {
        setCalender((prev: any) => ({
            ...prev,
            open: false,
            value: "",
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
            {isMobile ?
                <DropDownDrawerWithChip
                    chipLabel="Currency"
                    isClearDisabled
                    value={filters.currency}
                    listArr={currenciesList}
                    onItemSelect={(currency: string | null) => {
                        setFilters((prev) => ({ ...prev, currency: currency || "all", isFilterApplied: true, isFilterChange: true }))
                    }}
                />
                :
                <>
                    <p className="sort">Currency:</p>
                    <DropDownFilter
                        setFilterPayload={(currency: string) => {
                            setFilters((prev) => ({ ...prev, currency, isFilterApplied: true, isFilterChange: true }))
                        }}
                        dropDownItems={currenciesList}
                        filterValue={filters.currency}
                        noMinWidth
                    />
                </>}
            <BoxFlex sx={{ maxWidth: "400px" }}>
                <DatePickerField
                    label={"Date:"}
                    isCalenderValue={isCalender.value}
                    calenderOpenClickHandler={calenderOpenClickHandler}
                    calenderCloseBtnClickHandler={calenderCloseBtnClickHandler}
                    isMobile={isMobile}
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
                    select={isCalender.select}
                    startDate={isCalender.date}
                    endDate={isCalender.tDate}
                    okBtnApiCalls={(
                        date: Date | null,
                        tDate: Date | null,
                        select: "between" | "on" | "before" | "after" | null,
                        calenderType: string | null
                    ) => {
                        const date_url = date ? `date=${LocalDayjs(date).format("YYYY-MM-DD")}&` : "";
                        setCalender((prev) => ({...prev, date: date ? LocalDayjs(date) : null,tDate: tDate ? LocalDayjs(tDate) : null, select}))

                        setFilters((prev) => ({
                            ...prev,
                            date: date_url,
                            isFilterApplied: true,
                            isFilterChange: true
                        }))
                    }}
                    calenderType={isCalender.type}
                    singleTitle='Date'
                    titleRadioBtns={[]}
                    resetCalenderBtnClickHandler={calenderCloseBtnClickHandler}
                    allowedTabs={['on']}
                />
            }
        </BoxFlex>
    )
}

export default ExchangeRateNavbarItems