import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import ChevronLeft from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';

import MyCalendarBoxes from "../../organisms/my-calendar-boxes";
import { ArrangeOptions, formatDate, getTotalCalls, isEmpty } from "./helper";
import { LocalDayjs } from "../../utils/timezoneService";
import { textStyle } from "./style";
import BoxSpaceBtw, { BoxFlex } from "../../atoms/boxSpaceBtw";
import { SearchFields } from "../../atoms/my-calender";
import LabeledComponent from "../../molecules/nav-bars/expert-cards-page/labeledComponent";
import DropDownFilter from "../../atoms/drop-down-filter";
import FilterSidebar from "./filters";
import { useMyCalenderContext } from "../../pages/my-calendar/context";
import { groupedByProject } from "../../molecules/nav-bars/my-calender-page/helper";
import { ButtonGroup } from "@mui/material";
import ZoomSlots from "./zoomSlots";
import React from "react";


export default function MyCalenderWithFilters() {
    const {
        showFilters,
        openFilters,
        closeFilters,
        date,
        setDate,
        CallsDetails,
        isMobile,
        groupData,
        filters,
        setFilters,
    } = useMyCalenderContext();
    const [initialClose, setInitialClose] = React.useState(false);
    React.useEffect(() => {
        if (isMobile && showFilters && !initialClose) {
            closeFilters();
            setInitialClose(true);
        }
    }, [isMobile, showFilters, closeFilters, initialClose]);
    const isCurrentDate = date?.isSame(LocalDayjs(new Date()), "date")

    const call_days = Object.keys(CallsDetails || []);

    return (
        <BoxFlex sx={{ alignItems: "stretch", gap: "1rem" }}>
            {showFilters &&
                <FilterSidebar
                    closeFilters={closeFilters}
                    filters={filters}
                    setFilters={setFilters}
                    date={date}
                    setDate={setDate}
                />
            }
            <Box
                sx={{
                    backgroundColor: "#FFFFFF",
                    px:'1rem',
                    pt:'1rem',
                    pb: filters.sidebarFilters.zoom_slot  ? '0' : '1rem',
                    borderRadius: "5px",
                    marginBottom: filters.sidebarFilters.zoom_slot ? "0rem" :"2rem",
                    width: showFilters?"calc(100% - 340px)":"100%"
                }}
            >

                {/* Filters ------------------------------------------------ */}

                <BoxSpaceBtw
                    sx={{
                        mb: "1rem",
                        overflowX: 'auto',
                    }}>
                    <Stack direction={"row"} alignItems={"center"} gap={"1rem"} mr={"1rem"}>
                        {!showFilters &&
                            <IconButton onClick={openFilters}>
                                <KeyboardDoubleArrowRightIcon />
                            </IconButton>
                        }
                        <Stack direction={"row"} alignItems={"center"}>
                            <Button
                                variant={"outlined"}
                                onClick={() => setDate(LocalDayjs(new Date()))}
                                sx={isCurrentDate ? {
                                    backgroundColor: "#ec932490 !important",
                                    border: "1px solid rgba(236, 147, 36, 0.5) !important",
                                    color: "white",
                                } : {}}
                            >
                                <p
                                    style={{ fontSize: "10px" }}
                                >
                                    {filters.arrange_tag === "Day" ? "Today" : filters.arrange_tag === "Week" ? "This Week" : "This Month"}
                                </p>
                            </Button>
                            {!filters.sidebarFilters.zoom_slot &&
                                <>
                                    <IconButton
                                        onClick={() => setDate(date ? date.subtract(1, filters.arrange_tag.toLocaleLowerCase() as any) : date)}
                                        disableRipple
                                    >
                                        <ChevronLeft />
                                    </IconButton>
                                    <IconButton
                                        onClick={() => setDate(date ? date.add(1, filters.arrange_tag.toLocaleLowerCase() as any) : date)}
                                        disableRipple
                                    >
                                        <ChevronRightIcon />
                                    </IconButton>
                                </>
                            }
                            <p style={{ ...textStyle, whiteSpace: "nowrap", marginLeft: filters.sidebarFilters.zoom_slot? '15px':'0' }}>{date &&
                                formatDate(filters.arrange_tag, date, call_days)
                            }</p>
                        </Stack>

                        {!filters.sidebarFilters.zoom_slot &&
                        <p style={{ ...textStyle, whiteSpace: "nowrap" }}>
                            Calls: {CallsDetails ? getTotalCalls(CallsDetails) : 0}
                        </p>}
                    </Stack>
                    {!filters.sidebarFilters.zoom_slot &&
                     <BoxFlex>
                        <SearchFields />
                        {filters.arrange_tag === "Day" &&
                            <LabeledComponent
                                label="" component={
                                    <DropDownFilter
                                        link={null}
                                        filterValue={filters.tab}
                                        setFilterPayload={(type: string) =>
                                            type && setFilters((prev) => ({ ...prev, tab: type }))
                                        }
                                        dropDownItems={groupedByProject}
                                    />}
                            />
                        }
                        <ButtonGroup>
                            {ArrangeOptions.map((option) => (
                                <Button
                                    variant="outlined"
                                    sx={option.value === filters.arrange_tag ? {
                                        backgroundColor: "#ec932490 !important",
                                        border: "1px solid rgba(236, 147, 36, 0.5) !important",
                                        color: "white",
                                    } : {}}
                                    key={option.value}
                                    onClick={() => {
                                        setFilters((prev) => ({ ...prev, arrange_tag: option.value as "Week" | "Month" | "Day" }))
                                    }}
                                >
                                    {option.label}
                                </Button>
                            ))}
                        </ButtonGroup>
                    </BoxFlex> }
                </BoxSpaceBtw>

                {/* -------------------------------------------------------- */}
                {filters.sidebarFilters.zoom_slot ? <ZoomSlots/> : 
                <>
                {CallsDetails &&
                    isEmpty(CallsDetails) ? (
                    <MyCalendarBoxes arrangeBy={filters.arrange_tag} CallsDetails={CallsDetails} groupData={groupData} isGroupedByAm={filters.tab === "groupedbyAM"} />
                ) : (
                    <Typography
                        sx={{ textAlign: "center", fontSize: "16px", color: "#252B3B" }}
                    >
                        There is no data to display for the given {filters.arrange_tag}.
                    </Typography>
                )}
                </>}
            </Box>
        </BoxFlex >
    );
}
