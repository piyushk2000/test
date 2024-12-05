import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";

import CustomBtnFilled from "../../../atoms/form-molecules/CustomBtnFilled";
import TabFilters from "../../../atoms/tabs-selector";
import { getStateFilterOptions, sortByFilterOptions } from "./helper";
import { useProfileSharedContext } from "../../../pages/Profile-shared/context";
import ProjectDetailsCard from "../../../pages/Profile-shared/projectDetailsCard";
import { Dialog, FormControlLabel, Switch } from "@mui/material";
import AgendaDialog from "../../project-navbar/agenda/agenda";
import { getAgenda } from "../../../organisms/project-detail/project-navbar/helper";
import DialogModal from "../../../atoms/dialog";
import AddExpertForm from "../../../organisms/add-expert";
import AddPE from "../../../organisms/project/project-add-pe-form";
import useModals from "../../../utils/hooks/useModals";
import { AppRoutes } from "../../../constants";
import { useIsMobile } from "../../../utils/hooks/useIsMobile";
import DropDownDrawerWithChip from "../../dropdown-drawer-with-chip";
import DropDownFilter from "../../../atoms/drop-down-filter";
import { BoxFlex } from "../../../atoms/boxSpaceBtw";
import { useGetParams } from "../../../utils/hooks/useGetParams";
import DatePickerField from "../../../atoms/date-picker-field";
import { useState } from "react";
import { CalenderTypes } from "../../nav-bars/project-cards-page";
import CalenderPickerDialog from "../../calender-picker-dialog/calenderPickerDialog";
import { dataRangeFilter } from "../../nav-bars/calls-page/helper";
import { LocalDayjs } from "../../../utils/timezoneService";

const ProfileSharedNavbar = ({ openLoginWarning }: {
  openLoginWarning: () => void
}) => {
  const {
    filterPayload,
    setFilterPayload,
    FullExpertData,
    projectId,
    expertData,
    projectDetails,
    projectClientDetails
  } = useProfileSharedContext();

  let stateFilterFilterOptions = getStateFilterOptions(FullExpertData);
  const [modalStates, modalAction] = useModals([
    "project",
    "agenda",
    "add_expert",
  ]);

  const isLoggedIn = localStorage.getItem("authToken");
  const code = useGetParams("code") || "";
  const isMobile = useIsMobile();
  const [isCalender, setCalender] = useState<CalenderTypes>({
    open: false,
    value: "",
    type: "Shared On:",
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
    type: "Shared On:",
    date: null,
    tDate: null,
    select: null
  }));
  setFilterPayload((prev) => ({
    ...prev,
    date_url: null
  }));
}


  return (
    <>
      <Stack
        gap="1rem"
        display="flex"
        alignItems="center"
        flexDirection="row"
        mt={1}
      >
        <CustomBtnFilled
          label={"Project Details"}
          variant="contained"
          styles={{
            background: "#F7DFC3",
            color: "#252B3B",
          }}
          onClick={isLoggedIn ? modalAction.project.openModal : openLoginWarning}
        />
        {projectDetails?.applicable_agenda_id ? (
          <CustomBtnFilled
            label={"Agenda"}
            variant="contained"
            styles={{
              background: "#F7DFC3",
              color: "#252B3B",
            }}
            onClick={isLoggedIn ? modalAction.agenda.openModal : openLoginWarning}
          />
        ) : null}

        <CustomBtnFilled
          label={"Add Expert"}
          variant="contained"
          styles={{
            background: "#F7DFC3",
            color: "#252B3B",
          }}
          onClick={isLoggedIn ? modalAction.add_expert.openModal : openLoginWarning}
        />
        <CustomBtnFilled
          label={"Calender"}
          variant="contained"
          styles={{
            background: "#F7DFC3",
            color: "#252B3B",
          }}
          onClick={() => {
            if (!isLoggedIn) {
              openLoginWarning()
              return
            }
            const url =
              AppRoutes.CALENDER +
              "?id=" +
              projectDetails?.id
            window.open(url, "_blank");
          }}
        />
      </Stack>
      <Stack
        gap="1rem"
        display="flex"
        alignItems="center"
        flexDirection="row"
        mt={1}
      >
        <FormControlLabel
          value={filterPayload.complianceChecked}
          control={<Switch color="primary" onChange={(e, c) => setFilterPayload(prev => ({ ...prev, state: "All", complianceChecked: c }))} />}
          label="Pending Compliance"
          sx={{ "& span": { fontWeight: "600 !important" }, marginLeft: "5px !important" }}
          labelPlacement="start"
        />
      </Stack>
      {isMobile ?
        <DropDownDrawerWithChip
          chipLabel="Sort By"
          isClearDisabled
          value={filterPayload.sort_by}
          listArr={sortByFilterOptions}
          onItemSelect={(sort: string | null) => {
            setFilterPayload((prev) => {
              prev = {
                ...prev,
                sort_by: sort || "shared",
                isFilterChange: true,
              };
              return prev;
            })
          }}
        /> : <BoxFlex>
          {/* Sort By Filter */}
          <p style={{ fontWeight: "500" }}>Sort By:</p>
          <DropDownFilter
            link={AppRoutes.PROJECT_PE_MAPPING + "?code=" + code}
            setFilterPayload={(sort: string) =>
              setFilterPayload((prev) => {
                prev = {
                  ...prev,
                  sort_by: sort,
                  isFilterChange: true,
                };
                return prev;
              })
            }
            dropDownItems={sortByFilterOptions}
            filterValue={filterPayload.sort_by}
          />
        </BoxFlex>
      }

      <BoxFlex sx={{maxWidth: "400px"}}>
        <DatePickerField
          label={isCalender.type}
          isCalenderValue={isCalender.value}
          calenderOpenClickHandler={calenderOpenClickHandler}
          calenderCloseBtnClickHandler={calenderCloseBtnClickHandler}
          isMobile={isMobile}
          labelStyle={{fontWeight: "500", fontSize: "14px"}}
        />
      </BoxFlex>

      {!filterPayload.complianceChecked &&
        <Box
          sx={{
            marginTop: "1rem",
            display: "flex",
            marginBottom: "0",
            borderBottom: "1px solid rgba(112, 112, 112, 0.21);",
            paddingBottom: "4px",
            alignItems: "center",
            gap: "1rem",
          }}
        >
          {isMobile ?
            <DropDownDrawerWithChip
              chipLabel="State"
              isClearDisabled
              value={filterPayload.state}
              listArr={stateFilterFilterOptions || []}
              onItemSelect={(s: string | null) => {
                if (!s) {
                  return;
                }
                const state = s.split(" (")[0];
                setFilterPayload((prev) => ({
                  ...prev,
                  state,
                }));
              }}
            /> :
            <Stack direction={"row"} alignItems={"center"}>
              <TabFilters
                onChange={(s: string) => {
                  const state = s.split(" (")[0];
                  setFilterPayload((prev) => ({
                    ...prev,
                    state,
                  }));
                }}
                value={filterPayload.state}
                options={stateFilterFilterOptions || []}
              />
            </Stack>
          }
        </Box>
      }


      {/* Project Dialog */}
      <Dialog
        open={modalStates.project}
        onClose={modalAction.project.closeModal}
        maxWidth="xs"
      >
        <ProjectDetailsCard isOpen={modalStates.project} />
      </Dialog>

      {modalStates.agenda && (
        <AgendaDialog
          isOpen={modalStates.agenda}
          handleClose={modalAction.agenda.closeModal}
          handleSubmitClose={modalAction.agenda.closeModal}
          handleSubmit={null}
          id={projectId}
          agenda_id={projectDetails?.applicable_agenda_id}
          getprojectDetails={null}
          isFormChange={() => { }}
          getAgenda={getAgenda}
          isProjectOpen={projectClientDetails?.isAllowed}
        />
      )}

      {modalStates.add_expert && (
        <DialogModal
          isOpen={modalStates.add_expert}
          handleClose={modalAction.add_expert.closeModal}
          title={"Add Expert"}
        >
          <AddPE
            handleClose={modalAction.add_expert.closeModal}
            project_id={projectId}
            handleSubmitClose={modalAction.add_expert.closeModal}
          />
        </DialogModal>
      )}

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
            const date_url = dataRangeFilter(date, tDate, select, calenderType, undefined,true) || null;
            setCalender((prev) => ({...prev, date: date ? LocalDayjs(date) : null,tDate: tDate ? LocalDayjs(tDate) : null, select}))
            setFilterPayload((prev) => ({
              ...prev,
              date_url,
              isFilterChange: true
            }))
          }}
          calenderType={'shared_on'}
          titleRadioBtns={[]}
          singleTitle={"Calender Filter: Shared On Date"}
          resetCalenderBtnClickHandler={calenderCloseBtnClickHandler}
        />
      }
    </>
  );
};

export default ProfileSharedNavbar;
