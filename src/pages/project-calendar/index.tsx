import CalenderHeader from "../../molecules/app-bars/calendar-page";
import ProjectCalendar from "../../organisms/project-calendar";
import { useGetParams } from "../../utils/hooks/useGetParams";
import { useFetch } from "../../utils/hooks/useFetch";
import { APIRoutes } from "../../constants";
import ExpertSelect from "../../organisms/project-calendar/filters/ExpertSelect";
import { useFullPageLoading } from "../../atoms/full-page-loading/loadingContext";
import ColorInfo from "../../atoms/calendar-colors-info";
import PageLayout from "../../atoms/page-layout";
import InfoAlert from "../../atoms/info-alert";
import { useSearchParams } from "react-router-dom";
import { useIsMobile } from "../../utils/hooks/useIsMobile";
import { isAdmin, isClient, isExpert, isSuperAdmin } from "../../utils/role";
import FilterSidebar from "../../organisms/project-calendar/filters";
import { BoxFlex } from "../../atoms/boxSpaceBtw";
import { useBoolean } from "../../utils/hooks/useBoolean";
import { LogCallType, ProjectCalendarFilters, SetLogCallType } from "./type";
import { ProjectCalenderContext } from "./context";

import { useMemo, useState, useRef, useEffect } from "react";
import { Dayjs } from "dayjs";
import { Stack } from "@mui/material";
import { defaultFilters, defaultLogCall } from "./helper";
import { formatScheduleCalls, getCallsUrl } from "../../organisms/project-calendar/helper";
import NewCallLogDialog from "../../molecules/project-navbar/log-new-call/newCallLog";
import WarningDialog from "../../molecules/form-close-warning";
import { RequestServer } from "../../utils/services";


export default function Calender() {
  const [searchParams, setSearchParams] = useSearchParams();
  const id = useGetParams("id");
  const expertId = useGetParams("expertId");
  const newUser = searchParams.get("new_user");
  const isMobile = useIsMobile();
  const [selectedExpert, setSelectedExpert] = useState<{
    label: string;
    value: string;
  } | null>(null);
  const { setLoading } = useFullPageLoading();
  const { data: projectDetails } = useFetch(
    APIRoutes.projects +
    "?id=" +
    id +
    "&show_columns=topic,client_id,client_name,id,external_topic,client_contacts,account_manager,fk_group",
    { setLoading, variables: [!isExpert()] }
  );

  const { data: experts_data } = useFetch(
    APIRoutes.peMapping +
    "?show_columns=fk_expert,id,expert_name&fk_project=" +
    id
  );

  const experts = useMemo(() => {
    return experts_data?.map((expert: any) => ({
      value: expert.fk_expert,
      label: expert.expert_name,
    }));
  }, [JSON.stringify(experts_data)]);

  const expertsTest = useMemo(() => {
    return experts_data?.map((expert: any) => ({
      value: expert.id,
      label: expert.expert_name,
    }));
  }, [JSON.stringify(experts_data)]);

  function closeNewUserStrip() {
    if (newUser) {
      searchParams.delete("new_user");
      setSearchParams(searchParams);
    }
  }

  const projectCalendarRef = useRef<{
    setCalendarDate: (date: Date) => void;
    getCalendarDate: () => Date;
    changeView: (viewName: string) => void;
  }>(null);

  const setDate = (date: Dayjs | null) => {
    if (projectCalendarRef?.current?.setCalendarDate && date) {
      projectCalendarRef.current.setCalendarDate(date.toDate());
    }
  };

  const changeTimeView = () => {
    if (projectCalendarRef?.current?.changeView) {
      projectCalendarRef.current.changeView("timeGridDay");
    }
  }

  const [filters, setFilters] =
    useState<ProjectCalendarFilters>(defaultFilters);

  // console.log("filters", filters);
  function setFiltersWithKey<K extends keyof ProjectCalendarFilters>(
    key: K,
    value: ProjectCalendarFilters[K]
  ) {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  }
  const {
    value: showFilters,
    setTrue: openFilters,
    setFalse: closeFilters,
  } = useBoolean(true);

  const not_show_calls = useGetParams("not_show_calls");
  const selected_expert = selectedExpert ? selectedExpert.value : expertId;
  const { formattedData: CallsData, data: rawCallData, refetch: refetchCallDetails } = useFetch(
    getCallsUrl(id, selected_expert, filters),
    { setLoading, formatter: formatScheduleCalls, disabled: !!not_show_calls }
  );

  const {data: groupsData} = useFetch(APIRoutes.getGroup);
  const [logCall, setLogCall] = useState<LogCallType>(defaultLogCall);
  const [openAlertBox, setAlertBox] = useState(false);

   const openLogCall = async (setLogCall: SetLogCallType, expert_id: string, call_id: number) => {
    if(id) {
      const pe_id = experts_data.find((expert: any) => +expert.fk_expert === +expert_id)?.id || null;
      const loggedInUserId = localStorage.getItem("id") || "";
      const is_account_manager = +loggedInUserId === projectDetails[0].account_manager;
      const fk_group = projectDetails[0].fk_group;
      const groupData = groupsData.find((g: any) => g.id === fk_group);
      const is_group_admin = !!groupData.sublabel.split(",").find((g: string) => g === loggedInUserId);
      setLogCall(() => ({
        state: true,
        expert_id,
        project_id: +id,
        isChange: false,
        refetch: refetchCallDetails,
        pe_id,
        is_account_manager,
        is_group_admin,
        selected_call: call_id
      }))
    }
  }

  return (
    <PageLayout>
      <ProjectCalenderContext.Provider
        value={{
          filters: filters,
          setFiltersWithKey: setFiltersWithKey,
          clientContactOptions: projectDetails
            ? projectDetails[0].client_contacts_value
            : [],
          rawCallData,
          refetchCallDetails,
          openLogCallDialog: (expert_id: number,call_id: number) => {
            openLogCall(setLogCall,expert_id.toString(),call_id);
          }
        }}
      >
        <CalenderHeader
          projectDetails={projectDetails}
          component={
            <Stack direction="row" gap={3} sx={{ flexShrink: 0 }}>
              {isMobile ? null : <ColorInfo />}
              {isSuperAdmin() || isAdmin() || isClient() ? (
                <ExpertSelect
                  experts={experts}
                  projectId={id}
                  value={selectedExpert}
                  setValue={setSelectedExpert}
                  defaultId={expertId}
                />
              ) : null}
            </Stack>
          }
        />
        <InfoAlert
          open={!!newUser}
          handleClose={closeNewUserStrip}
          text={"Please add available time slots for the call"}
        />

        <BoxFlex sx={{ alignItems: "stretch", gap: "1rem" }}>
          {showFilters && (
            <FilterSidebar experts={expertsTest} id={id} closeFilters={closeFilters} setDate={setDate} changeTimeView={changeTimeView} />
          )}

          <ProjectCalendar
            experts={expertsTest}
            id={id}
            projectDetails={projectDetails}
            selectedExpert={selectedExpert ? selectedExpert.value : expertId}
            openFilters={openFilters}
            showFilters={showFilters}
            ref={projectCalendarRef}
            CallsData={CallsData}
            rawCallData={rawCallData}
          />
        </BoxFlex>

        {/* Log Call Form */}
        {logCall.state &&
          <NewCallLogDialog
            isOpen={logCall.state}
            handleClose={() =>
              logCall.isChange
                ? setAlertBox(true)
                : setLogCall(defaultLogCall)
            }
            id={logCall.project_id?.toString() || null}
            refetch={logCall.refetch}
            pe_id={logCall.pe_id}
            expert_id={logCall.expert_id}
            handleFormChange={() =>
              setLogCall((prev) => {
                if (!prev.isChange) {
                  prev.isChange = true;
                }
                return prev;
              })
            }
            handleSubmitClose={() => setLogCall(defaultLogCall)}
            is_account_manager={logCall.is_account_manager}
            is_group_admin={logCall.is_group_admin}
            selected_call={logCall.selected_call || undefined}
          />
        }


        {/* Form Close Warning */}
        <WarningDialog
          handleClose={() => setAlertBox(false)}
          handleYesClick={() => {
            setAlertBox(false);
            setLogCall(defaultLogCall);
          }}
          open={openAlertBox}
        />
      </ProjectCalenderContext.Provider>
    </PageLayout>
  );
}
