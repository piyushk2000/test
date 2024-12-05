import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";

import BoxSpaceBtw, { BoxFlex } from "../../../atoms/boxSpaceBtw";
import { textStyle } from "./style";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import CalenderPicker from "../../../molecules/calender-picker-dialog/calenderPicker";
import { AccordianExpanded, DateType, FormOptions, SetDateType } from "./type";
import { LocalDayjs } from "../../../utils/timezoneService";
import Status from "./status";
import React from "react";
import { ProjectCalenderFilterContext } from "./filterContext";
import ClientFilter from "./client";
import { useProjectCalenderContext } from "../../../pages/project-calendar/context";
import Button from '@mui/material/Button';
import DialogModal from "../../../atoms/dialog";
import ScheduleCallExpert from "./schedule-call-expert";
import ScheduleCall from "../../project/project-pe-mapping/actions/schedule-call";
import FilterSelected from "../../../atoms/my-calender/filter";
import { isAdmin, isClient, isSuperAdmin, isExpert } from "../../../utils/role";
import AMFilter from "./am";
import { getAmOptions } from "./helper";
import { defaultFilters } from "../../../pages/project-calendar/helper";
import { checkObjectValuesSame } from "../../../utils/utils";

type Props = {
  experts: any[];
  id: string | null;
  closeFilters: () => void;
  setDate: SetDateType;
  changeTimeView: () => void;
};

const FilterSidebar = ({ experts, id, closeFilters, setDate, changeTimeView }: Props) => {
  const [dialogOpen, setdialogOpen] = React.useState(false);
  const [expert, setExpert] = React.useState<{ value: number, label: string } | null>(null)
  const [scheduleDialogOpen, setscheduleDialogOpen] = React.useState(false);
  const [expanded, setExpanded] = React.useState<AccordianExpanded>({
    status: false,
    client: false,
    am: false
  });
  const [formOptions, setFormOptions] = React.useState<FormOptions>({
    am: [],
    client: []
  })
  const { filters, setFiltersWithKey, rawCallData } = useProjectCalenderContext();

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded((prev) => ({
        ...prev,
        [panel]: !!isExpanded,
      }));
    };

  const handleZoomSettings = () => {
    setdialogOpen(false);
    setscheduleDialogOpen(false);
  }

  const handleZoomSubmitSettings = (valueSent: { value: number, label: string } | any) => {
    setdialogOpen(false);
    setExpert({ ...valueSent })
    setscheduleDialogOpen(true);
  }

  React.useEffect(() => {
    if (isClient()) {
      // getting all the AM, only in the case when there is not filter applied
      // plus , making date filter null b/c date filter change never call an API
      const current_filters = { ...filters };
      current_filters.date = null;
      const isFiltersDefault = checkObjectValuesSame(current_filters, defaultFilters);
      if (rawCallData && isFiltersDefault) {
        getAmOptions(rawCallData, setFormOptions)
      }
    }
  }, [rawCallData])

  const is_admin = (isSuperAdmin() || isAdmin())

  return (
    <Box
      sx={{
        backgroundColor: "#FFFFFF",
        padding: "1rem",
        borderRadius: "5px",
        width: "350px",
      }}
    >
      <ProjectCalenderFilterContext.Provider value={{ expanded, setExpanded, formOptions }}>

        {/* Filter Heading */}
        {is_admin &&
          <BoxSpaceBtw>
            <Button variant="contained" onClick={() => { setdialogOpen(true) }} sx={{ width: "100%", color: 'white' }}>Schedule Call</Button>
          </BoxSpaceBtw>
        }
        <BoxSpaceBtw sx={{ marginTop: is_admin ? '1.5em' : "0", marginBottom: '-1.8em' }}>
          <p style={textStyle}>Filters</p>
          <IconButton onClick={closeFilters}>
            <KeyboardDoubleArrowLeftIcon />
          </IconButton>
        </BoxSpaceBtw>

        {/* Calendar Filter */}
        <CalenderPicker
          selectDate={filters.date || LocalDayjs()}
          getDate={(date) => {
            setDate(date)
            changeTimeView();
          }}
          dateLabel="Date"
        />

        {
          <>
            {/* Zoom Call Filter */}
            {is_admin ? <BoxFlex sx={{ justifyContent: "flex-end" }}>
              <FormControlLabel
                control={
                  <Switch
                    checked={filters.myZoomCall}
                    onChange={(e) =>
                      setFiltersWithKey("myZoomCall", e.target.checked)
                    }
                    color="primary"
                  />
                }
                label="My Zoom Calls"
                labelPlacement="start"
              />
            </BoxFlex> : ''}

            {<BoxFlex sx={{ justifyContent: "flex-end" }}>
              <FormControlLabel
                control={
                  <Switch
                    checked={filters.showAvailablity}
                    onChange={(e) =>
                      setFiltersWithKey("showAvailablity", e.target.checked)
                    }
                    color="primary"
                  />
                }
                label="Show Availability"
                labelPlacement="start"
              />
            </BoxFlex>}
          </>
        }

        {/* Status Filter */}
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
              isSelected={!!filters.status.length}
            />
          </AccordionSummary>
          <AccordionDetails>
            <Status />
          </AccordionDetails>
        </Accordion>

        {is_admin &&
          <>
            {/* Client Filter */}
            <Accordion expanded={expanded.client} onChange={handleChange("client")}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1-content"
                id="panel1-header"
              >
                <FilterSelected
                  label="Select Client Contacts"
                  isSelected={!!filters.client?.length}
                />
              </AccordionSummary>
              <AccordionDetails>
                <ClientFilter />
              </AccordionDetails>
            </Accordion>
          </>
        }
            {/* AM Filter */}
        {/* {isClient() &&
          <>
            <Accordion expanded={expanded.am} onChange={handleChange("am")}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1-content"
                id="panel1-header"
              >
                <FilterSelected
                  label="Select Account Manager"
                  isSelected={!!filters.am?.length}
                />
              </AccordionSummary>
              <AccordionDetails>
                <AMFilter />
              </AccordionDetails>
            </Accordion>
          </>
        } */}



      </ProjectCalenderFilterContext.Provider>



      <DialogModal
        title={
          "Schedule call with expert"
        }
        isOpen={dialogOpen}
        handleClose={() =>
          setdialogOpen(false)
        }
      >
        <ScheduleCallExpert
          experts={experts}
          id={id}
          handleClose={() =>
            handleZoomSettings()
          }
          handleSubmitClose={(val: any) =>
            handleZoomSubmitSettings(val)
          }
        />
      </DialogModal>

      {/* Schedule Call */}


      <DialogModal
        title={
          "Schedule Call with " + expert?.label
        }
        isOpen={scheduleDialogOpen}
        handleClose={() =>
          handleZoomSettings()
        }
      >
        <ScheduleCall
          allowUseContext={false}
          handleClose={() =>
            handleZoomSettings()
          }
          handleSubmitClose={() => handleZoomSettings()}
          pe_id={expert?.value || 0}
          project_id={id}
        />
      </DialogModal>
    </Box>
  );
};

export default FilterSidebar;
