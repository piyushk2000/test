
import { autoGeneratedOptions, calenderCloseBtnClickHandler, calenderOpenClickHandler, currencyOptions, generatedBy, paymentLocationOptions, statusOptions } from './helper';
import DropDownFilter from '../../../atoms/drop-down-filter';
import SearchBar from '../../app-bar-common/search-bar';
import { useIsMobile } from '../../../utils/hooks/useIsMobile';
import DropDownDrawerWithChip from '../../dropdown-drawer-with-chip';
import { usePaymentsRequestsContext } from '../../../pages/payment-requests/context';
import LabeledComponent from '../expert-cards-page/labeledComponent';
import { Switch, ThemeProvider } from '@mui/material';
import DatePickerField from '../../../atoms/date-picker-field';
import { BoxFlex } from '../../../atoms/boxSpaceBtw';
import { IsCalenderTypes, SetCalenderTypes } from '.';
import CalenderPickerDialog from '../../calender-picker-dialog/calenderPickerDialog';
import RangeSlider from '../../../atoms/range-filter';
import { theme } from '../expert-cards-page/helper';
import { LocalDayjs } from '../../../utils/timezoneService';
import MultipleDropDown from '../../../atoms/drop-down-filter/multipleDropdown';
import { currenciesList } from '../exchange-rate-page/helper';
import { CURRENCIES } from '../../../constants/currencies';
import DropDownDrawerWithChipMultiple from '../../dropdown-drawer-with-chip-multiple';

type Props = {
    isCalender: IsCalenderTypes;
    setCalender: SetCalenderTypes;
    okBtnApiCalls: (
        date: Date | null,
        tDate: Date | null,
        select: string | null,
        calenderType: string | null
    ) => void;
}

const PaymentsNavbarItems = ({ isCalender, setCalender, okBtnApiCalls }: Props) => {
    const { filters, setFilters, FinanceUsers } = usePaymentsRequestsContext();
    const isMobile = useIsMobile();

    return (
        <ThemeProvider theme={theme}>
            <BoxFlex sx={{ flexDirection: "column", alignItems: "flex-start", gap: "0.5rem" }}>

                <BoxFlex sx={{ flexWrap: "wrap", gap: !isMobile ? "0" : "0.5rem" }}>
                    {/* Expert ID */}
                    <SearchBar
                        onSearch={(text) => setFilters((prev) => ({
                            ...prev,
                            isFilterChange: true,
                            expert_id: text
                        }))}
                        placeholder="Expert ID"
                        searchValue={filters.expert_id || ""}
                        maxWidth="120px"
                        minWidth={"100px"}
                        p="5px"
                        m={
                            {
                                sm: "0 0.75rem 0 0",
                                xs: "0 0.75rem 0 0"
                            }
                        }
                        showSearchIcon={false}
                    />

                    {/* Expert Name */}
                    <SearchBar
                        onSearch={(text) => setFilters((prev) => ({
                            ...prev,
                            isFilterChange: true,
                            expert_name: text
                        }))}
                        placeholder="Expert Name"
                        searchValue={filters.expert_name || ""}
                        maxWidth="130px"
                        minWidth={"130px"}
                        p="5px"
                        m={
                            {
                                sm: "0 0.75rem 0 0",
                                xs: "0 0.75rem 0 0"
                            }
                        }
                        showSearchIcon={false}
                    />

                    {/* Total Calls */}
                    <SearchBar
                        onSearch={(text) => setFilters((prev) => ({
                            ...prev,
                            isFilterChange: true,
                            total_calls: text
                        }))}
                        type='number'
                        placeholder="Total Calls"
                        searchValue={filters.total_calls || ""}
                        maxWidth="130px"
                        minWidth={"130px"}
                        p="5px"
                        m={
                            {
                                sm: "0 0.75rem 0 0",
                                xs: "0 0.75rem 0 0"
                            }
                        }
                        showSearchIcon={false}
                    />

                    {/* Call ID */}
                    <SearchBar
                        onSearch={(text) => setFilters((prev) => ({
                            ...prev,
                            isFilterChange: true,
                            call_id: text
                        }))}
                        type='number'
                        placeholder="Call ID"
                        searchValue={filters.call_id || ""}
                        maxWidth="130px"
                        minWidth={"130px"}
                        p="5px"
                        m={
                            {
                                sm: "0 0.75rem 0 0",
                                xs: "0 0.75rem 0 0"
                            }
                        }
                        showSearchIcon={false}
                    />

                    {/* Invoice Number */}
                    <SearchBar
                        onSearch={(text) => setFilters((prev) => ({
                            ...prev,
                            isFilterChange: true,
                            invoice_num: text
                        }))}
                        placeholder="Invoice No"
                        searchValue={filters.invoice_num || ""}
                        maxWidth="130px"
                        minWidth={"130px"}
                        p="5px"
                        m={
                            {
                                sm: "0 0.75rem 0 0",
                                xs: "0 0.75rem 0 0"
                            }
                        }
                        showSearchIcon={false}
                    />

                    {!isMobile && <hr className="divider" />}


                    <LabeledComponent
                        typographySx={{
                            fontSize: "12px",
                            fontWeight: "400",
                            color: "#252B3B"
                        }}
                        label="High Priority"
                        component={<Switch
                            checked={filters.high_priority}
                            sx={{
                                color: "#EC9324",
                            }}
                            color="primary"
                            onChange={(e, checked) => {
                                setFilters((prev) => ({
                                    ...prev,
                                    isFilterChange: true,
                                    high_priority: checked,
                                }))
                            }} />}
                    />

                    {!isMobile && <hr className="divider" />}


                    {/* <LabeledComponent
                        typographySx={{
                            fontSize: "12px",
                            fontWeight: "400",
                            color: "#252B3B"
                        }}
                        label="Auto Generated"
                        component={<Switch
                            checked={filters.auto_generated}
                            sx={{
                                color: "#EC9324",
                                marginLeft: "0 !important"
                            }}
                            color="primary"
                            onChange={(e, checked) => {
                                setFilters((prev) => ({
                                    ...prev,
                                    isFilterChange: true,
                                    auto_generated: checked,
                                }))
                            }} />}
                    /> */}
                    {/* Reviewed By */}
                    {isMobile ?
                        <DropDownDrawerWithChip
                            chipLabel="Auto Generated"
                            isClearDisabled
                            value={filters.auto_generated}
                            listArr={autoGeneratedOptions || []}
                            onItemSelect={(value: string | null) => {
                                setFilters((prev) => {
                                    prev = { ...prev, auto_generated: value, isFilterChange: true };
                                    return prev;
                                })
                            }}
                        /> :
                        <LabeledComponent
                            typographySx={{
                                fontSize: "12px",
                                fontWeight: "400",
                                color: "#252B3B"
                            }}
                            label="Auto Generated:"
                            component={<DropDownFilter
                                link={null}
                                selectSx={{
                                    color: "#252B3B"
                                }}
                                filterValue={filters.auto_generated || ""}
                                setFilterPayload={(value: string) =>
                                    setFilters((prev) => {
                                        prev = { ...prev, auto_generated: value, isFilterChange: true };
                                        return prev;
                                    })
                                }
                                dropDownItems={autoGeneratedOptions || []}
                            />} />
                    }

                    {/* Payment  */}
                    {isMobile ?
                        <DropDownDrawerWithChip
                            chipLabel="Payment Location"
                            isClearDisabled
                            value={filters.payment_location}
                            listArr={paymentLocationOptions || []}
                            onItemSelect={(value: string | null) => {
                                setFilters((prev) => {
                                    prev = { ...prev, payment_location: value || "", isFilterChange: true };
                                    return prev;
                                })
                            }}
                        /> :
                        <LabeledComponent
                            typographySx={{
                                fontSize: "12px",
                                fontWeight: "400",
                                color: "#252B3B"
                            }}
                            label="Payment Location:"
                            component={<DropDownFilter
                                link={null}
                                selectSx={{
                                    color: "#252B3B"
                                }}
                                filterValue={filters.payment_location || ""}
                                setFilterPayload={(value: string) =>
                                    setFilters((prev) => {
                                        prev = { ...prev, payment_location: value, isFilterChange: true };
                                        return prev;
                                    })
                                }
                                dropDownItems={paymentLocationOptions || []}
                            />} />
                    }
                </BoxFlex>

                <BoxFlex sx={{ flexWrap: "wrap", gap: !isMobile ? "0" : "0.5rem" }}>
                    {/* Currency */}
                    {isMobile ?


                        <DropDownDrawerWithChipMultiple
                            chipLabel="Currency"
                            selectedValues={filters.currency}
                            listArr={Object.keys(CURRENCIES)}
                            onItemSelect={(selectedTypes: string[]) => {
                                setFilters((prev) => ({
                                    ...prev,
                                    currency: selectedTypes.length > 0 ? selectedTypes : [],
                                    isFilterChange: true
                                }));
                            }}
                        /> :
                        <LabeledComponent label="Currency:" component={
                            <MultipleDropDown
                                link={null}
                                filterValue={filters.currency}
                                dropDownItems={Object.keys(CURRENCIES)}
                                setFilterPayload={(filter: string[]) =>
                                    setFilters((prev) => {
                                        prev = { ...prev, currency: filter, isFilterChange: true };
                                        return prev;
                                    })
                                }
                            />}
                        />
                    }

                    {!isMobile && <hr className="divider" />}

                    <RangeSlider
                        label='Amount'
                        input={filters.amount_range}
                        setInput={(value) => {
                            setFilters((prev) => ({
                                ...prev,
                                isFilterChange: true,
                                amount_range: value
                            }))
                        }}
                    />

                    {!isMobile && <hr className="divider" />}


                    {/* GENERATED BY */}
                    {isMobile ?
                        <DropDownDrawerWithChip
                            chipLabel="Generated By"
                            isClearDisabled
                            value={filters.generated_by}
                            listArr={generatedBy}
                            onItemSelect={(type: string | null) => {
                                setFilters((prev) => {
                                    prev = { ...prev, generated_by: type || "all", isFilterChange: true };
                                    return prev;
                                })
                            }}
                        /> :
                        <LabeledComponent
                            typographySx={{ color: "#252B3B", fontWeight: "400", fontSize: "0.75rem" }}
                            label="Generated By:"
                            component={<DropDownFilter
                                link={null}
                                selectSx={{
                                    color: "#252B3B"
                                }}
                                filterValue={filters.generated_by}
                                setFilterPayload={(type: string) =>
                                    setFilters((prev) => {
                                        prev = { ...prev, generated_by: type, isFilterChange: true };
                                        return prev;
                                    })
                                }
                                dropDownItems={generatedBy}
                            />} />
                    }

                    {!isMobile && <hr className="divider" />}

                    {/* Status */}
                    {isMobile ?
                        <DropDownDrawerWithChip
                            chipLabel="Status"
                            isClearDisabled
                            value={filters.status}
                            listArr={statusOptions}
                            onItemSelect={(type: string | null) => {
                                setFilters((prev) => {
                                    prev = { ...prev, status: type || "all", isFilterChange: true };
                                    return prev;
                                })
                            }}
                        /> :
                        <LabeledComponent
                            typographySx={{
                                fontSize: "12px",
                                fontWeight: "400",
                                color: "#252B3B"
                            }}
                            label="Status:"
                            component={<DropDownFilter
                                link={null}
                                selectSx={{
                                    color: "#252B3B"
                                }}
                                filterValue={filters.status}
                                setFilterPayload={(type: string) =>
                                    setFilters((prev) => {
                                        prev = { ...prev, status: type, isFilterChange: true };
                                        return prev;
                                    })
                                }
                                dropDownItems={statusOptions}
                            />} />
                    }

                    {!isMobile && <hr className="divider" />}
                    {/* Reviewed By */}
                    {isMobile ?
                        <DropDownDrawerWithChip
                            chipLabel="Reviewed By"
                            isClearDisabled
                            value={filters.reviewed_by}
                            listArr={FinanceUsers || []}
                            onItemSelect={(type: string | null) => {
                                setFilters((prev) => {
                                    prev = { ...prev, reviewed_by: type || "all", isFilterChange: true };
                                    return prev;
                                })
                            }}
                        /> :
                        <LabeledComponent
                            typographySx={{
                                fontSize: "12px",
                                fontWeight: "400",
                                color: "#252B3B"
                            }}
                            label="Reviewed By:"
                            component={<DropDownFilter
                                link={null}
                                selectSx={{
                                    color: "#252B3B"
                                }}
                                filterValue={filters.reviewed_by}
                                setFilterPayload={(type: string) =>
                                    setFilters((prev) => {
                                        prev = { ...prev, reviewed_by: type, isFilterChange: true };
                                        return prev;
                                    })
                                }
                                dropDownItems={FinanceUsers || []}
                            />} />
                    }

                    {!isMobile && <hr className="divider" />}

                    <DatePickerField
                        label={isCalender.type === "recorded_at" ? "Requested On" : "Reviewed On"}
                        isCalenderValue={isCalender.value}
                        calenderOpenClickHandler={() => calenderOpenClickHandler(setCalender)}
                        calenderCloseBtnClickHandler={() => {
                            calenderCloseBtnClickHandler(setCalender, okBtnApiCalls, filters)
                            setFilters((prev) => ({ ...prev, isFilterChange: true, requested_on: null }));
                        }}
                        isMobile={isMobile}
                        inputStyle={{ minWidth: "140px" }}
                    />
                </BoxFlex>
            </BoxFlex>

            {/* Calender Picker Dialog */}
            <CalenderPickerDialog
                isOpen={isCalender.open}
                handleClose={() =>
                    setCalender((prev: any) => ({ ...prev, open: false }))
                }
                setCalender={setCalender}
                select={isCalender.select}
                startDate={isCalender.date}
                endDate={isCalender.tDate}
                okBtnApiCalls={(date: Date | null,
                    tDate: Date | null,
                    select: "between" | "on" | "before" | "after" | null,
                    calenderType: string | null
                ) => {
                    okBtnApiCalls(date, tDate, select, calenderType);
                    setCalender((prev) => ({ ...prev, date: date ? LocalDayjs(date) : null, tDate: tDate ? LocalDayjs(tDate) : null, select }))
                }}
                calenderType={isCalender.type}
                titleRadioBtns={[{ label: "Requested On", value: "recorded_at" }, { label: "Reviewed On", value: "reviewed_on" }]}
                resetCalenderBtnClickHandler={() => {
                    calenderCloseBtnClickHandler(setCalender, okBtnApiCalls, filters)
                    setFilters((prev) => ({ ...prev, isFilterChange: true, requested_on: null }));
                }}
            />
        </ThemeProvider>
    )
}

export default PaymentsNavbarItems