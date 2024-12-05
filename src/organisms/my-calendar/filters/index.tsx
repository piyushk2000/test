import Box from "@mui/material/Box"
import IconButton from "@mui/material/IconButton"
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';

import BoxSpaceBtw, { BoxFlex } from "../../../atoms/boxSpaceBtw"
import { textStyle } from "../style"
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft'
import CalenderPicker from "../../../molecules/calender-picker-dialog/calenderPicker"
import { AccordianExpanded, DateType, Filters, SetDateType, SetFilters } from "../types"
import { LocalDayjs } from "../../../utils/timezoneService"
import Status from "./status";
import GroupAndAMFilter from "./groupAndAM";
import React, { useMemo, useRef, useState } from "react";
import { MyCalenderFilterContext } from "./filterContext";
import ClientFilter from "./client";
import { FormData } from "./type";
import { useMyCalenderContext } from "../../../pages/my-calendar/context";
import { Button } from "@mui/material";
import { defaultFilters } from "../../../pages/my-calendar/helper";
import FilterSelected from "../../../atoms/my-calender/filter";
import { checkObjectValuesSame } from "../../../utils/utils";
import { isAdmin, isClient, isSuperAdmin } from "../../../utils/role";
import { getFormOptions } from "./helper";
import ExpertClientAMPOC from "./expert-client-am-poc";
import { Dayjs } from "dayjs";

type Props = {
    closeFilters: () => void;
    filters: Filters;
    setFilters: SetFilters;
    date: DateType;
    setDate: SetDateType;
    setDateForCalendar?: (d: Dayjs | null) => void; // Client & Expert 
}

const FilterSidebar = ({ closeFilters, filters, setFilters, date, setDate, setDateForCalendar }: Props) => {
    // Why this clearFilter useState Used ?
    // so whenever Clear All button is clicked
    // it's state will change and it will help us to reset the forms
    const clearFilter = useRef(0);
    const [expanded, setExpanded] = React.useState<AccordianExpanded>({
        status: false,
        teamAM: false,
        client: false,
        expertClientFilter: false
    });

    const handleChange =
        (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
            setExpanded((prev) => ({
                ...prev,
                [panel]: !!isExpanded
            }));
        };

    const [formOptions, setFormOptions] = React.useState<FormData>({
        client: [],
        group: [],
        am: [],
        filtered_am: [],
        filtered_client: [],
        client_filter_am: [],
        expert_filter_poc: []
    });
    const { groupData, filters: c_filters } = useMyCalenderContext();

    const isFiltersDefault = useMemo(() => {
        const currentFilters = { ...c_filters };
        currentFilters.isFilterApplied = false;
        currentFilters.isFilterChange = false;
        currentFilters.arrange_tag = "Day";
        return checkObjectValuesSame(currentFilters, defaultFilters);
    }, [c_filters]);


    React.useEffect(() => {
        if (groupData) {
            getFormOptions(groupData, setFormOptions);
        } else if (!isSuperAdmin()) {
            getFormOptions(groupData, setFormOptions);
        }
    }, [groupData])

    const is_admin = (isAdmin() || isSuperAdmin());

    return (
        <Box
            sx={{
                backgroundColor: "#FFFFFF",
                padding: "1rem",
                borderRadius: "5px",
                width: "340px"
            }}
        >
            <MyCalenderFilterContext.Provider
                value={{ expanded, setExpanded, formOptions, setFormOptions, clearFilter }}
            >
                {/* Filter Heading */}
                <BoxSpaceBtw>
                    <p style={textStyle}>Filters</p>

                    <BoxSpaceBtw>
                        {!isFiltersDefault &&
                            <Button variant="outlined" onClick={() => {
                                clearFilter.current = 1 + clearFilter.current;
                                setFilters((prev) => ({ ...defaultFilters, arrange_tag: prev.arrange_tag }))
                            }}>
                                Clear All
                            </Button>
                        }
                        <IconButton onClick={() => {
                            closeFilters();
                        }}>
                            <KeyboardDoubleArrowLeftIcon />
                        </IconButton>
                    </BoxSpaceBtw>

                </BoxSpaceBtw>

                {/* Calendar Filter */}
                <CalenderPicker
                    selectDate={date || LocalDayjs()}
                    getDate={(date) => {
                        setDate(date);
                        setDateForCalendar && setDateForCalendar(date);
                    }}
                    dateLabel="Date"
                />

                {/* Zoom Call Filter */}
                {(is_admin && !filters.sidebarFilters.zoom_slot) &&
                    <BoxFlex sx={{ justifyContent: "flex-end" }}>
                        <FormControlLabel
                            value="start"
                            control={<Switch color="primary" checked={filters.sidebarFilters.zoom_call} onChange={(e, checked) => {
                                setFilters((prev) => ({ ...prev, sidebarFilters: { ...prev.sidebarFilters, zoom_call: checked } }))
                            }} />}
                            label="My Zoom Calls"
                            labelPlacement="start"
                        />
                    </BoxFlex>
                }
                {/* Zoom Slots*/}
                {is_admin &&
                    <BoxFlex sx={{ justifyContent: "flex-end" }}>
                        <FormControlLabel
                            value="start"
                            control={<Switch color="primary" checked={filters.sidebarFilters.zoom_slot} onChange={(e, checked) => {
                                setFilters((prev) => ({ ...prev, sidebarFilters: { ...prev.sidebarFilters, zoom_slot: checked } }))
                            }} />}
                            label="Zoom Slots"
                            labelPlacement="start"
                        />
                    </BoxFlex>
                }



                {/* Status Filter */}
                { !filters.sidebarFilters.zoom_slot &&
                <Accordion
                    sx={{ mt: "1rem" }}
                    expanded={expanded.status}
                    onChange={handleChange("status")}
                >
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1-content"
                        id="panel1-header"
                    >
                        <FilterSelected
                            label="Status"
                            isSelected={!!filters.sidebarFilters.status}
                        />
                    </AccordionSummary>
                    <AccordionDetails>
                        <Status />
                    </AccordionDetails>
                </Accordion>
                }

                {is_admin ?
                    <>
                        {/*  GROUP & AM Filter */}
                        { !filters.sidebarFilters.zoom_slot &&
                        <Accordion
                            expanded={expanded.teamAM}
                            onChange={handleChange("teamAM")}
                        >
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1-content"
                                id="panel1-header"
                            >
                                <FilterSelected
                                    label="Select Team & AM"
                                    isSelected={!!filters.sidebarFilters.am || !!filters.sidebarFilters.group}
                                />

                            </AccordionSummary>
                            <AccordionDetails>
                                <GroupAndAMFilter />
                            </AccordionDetails>
                        </Accordion>}

                        {/* Client Filter */}
                        { !filters.sidebarFilters.zoom_slot &&
                        <Accordion
                            expanded={expanded.client}
                            onChange={handleChange("client")}
                        >
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1-content"
                                id="panel1-header"
                            >
                                <FilterSelected
                                    label="Select Client Contacts"
                                    isSelected={!!filters.sidebarFilters.client}
                                />
                            </AccordionSummary>
                            <AccordionDetails>
                                <ClientFilter />
                            </AccordionDetails>
                        </Accordion>
                        }
                    </> :
                    isClient() &&
                    <>
                        {/* Client Filter */}
                        <Accordion
                            expanded={expanded.expertClientFilter}
                            onChange={handleChange("expertClientFilter")}
                        >
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1-content"
                                id="panel1-header"
                            >
                                <FilterSelected
                                    label={isClient() ? "Select Account Manager" : "Select POCs"}
                                    isSelected={isClient() ? !!filters.sidebarFilters.client_am : !!filters.sidebarFilters.expert_poc}
                                />
                            </AccordionSummary>
                            <AccordionDetails>
                                <ExpertClientAMPOC />
                            </AccordionDetails>
                        </Accordion>
                    </>
                }

            </MyCalenderFilterContext.Provider>
        </Box>
    )
}

export default FilterSidebar