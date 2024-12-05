import { useFetch } from "../../utils/hooks/useFetch";
import { APIRoutes } from "../../constants";
import { useEffect, useState } from "react";
import { useFullPageLoading } from "../../atoms/full-page-loading/loadingContext";
import PageLayout from "../../atoms/page-layout";
import MyCalenderHeader from "../../molecules/app-bars/my-calendar-page";
import { DateType, Filters, labelValueTypeCalendar, MyCalls } from "../../organisms/my-calendar/types";
import { Groups } from "../../organisms/admin/types";

import dayjs from "dayjs";
import { MyCalenderContext } from "./context";
import { isAdmin, isClient, isExpert, isSuperAdmin } from "../../utils/role";
import { useIsTablet } from "../../utils/hooks/useIsMobile";
import { useBoolean } from "../../utils/hooks/useBoolean";

import MyCalenderWithFilters from "../../organisms/my-calendar/superAdminView";
import MyCalenderView from "../../organisms/my-calendar/calenderView";
import { defaultFilters, getApiUrl, getDefaultFilters } from "./helper";
import { useGetParams, useGetQueryParams } from "../../utils/hooks/useGetParams";
import MyExpertClientWithFilters from "../../organisms/my-calendar/clientExpertView";
import { LocalDayjs } from "../../utils/timezoneService";
import { formatScheduleCalls } from "../../organisms/my-calendar/helper";
import { getAMs } from "../../organisms/my-calendar/filters/helper";
import WarningDialog from "../../molecules/form-close-warning";
import { defaultLogCall } from "../project-calendar/helper";
import NewCallLogDialog from "../../molecules/project-navbar/log-new-call/newCallLog";
import { LogCallType } from "../project-calendar/type";

export default function MyCalender() {
  const { setLoading } = useFullPageLoading();
  const isMobile = useIsTablet();
  const {
    value: showFilters,
    setTrue: openFilters,
    setFalse: closeFilters,
  } = useBoolean(true);
  const query_params = useGetQueryParams();
  const date_param = query_params.get("date");
  const first_date = date_param ? LocalDayjs(date_param).add(10, 'h') : LocalDayjs(new Date());
  const [date, setDate] = useState<DateType>(first_date);
  const [filters, setFilters] = useState<Filters>(getDefaultFilters(query_params));
  const { ApiUrl, isGroupNeeded } = getApiUrl(filters, date);
  const [ams, setAms] = useState<labelValueTypeCalendar>([])
  const { data: CallsDetails, formattedData: formattedCallDetails, refetch: refetchCallsDetails, refetchWithNewUrl: refetchCallsDetailsWithNewUrl } = useFetch<MyCalls>(ApiUrl, {
    setLoading,
    formatter: formatScheduleCalls,
    disabled: filters.sidebarFilters.zoom_slot
  });
  const { data: groupData, refetch: getGroups } = useFetch<Groups>(
    APIRoutes.getGroup,
    {
      setLoading,
      variables: [isGroupNeeded, (isSuperAdmin() || isAdmin())],
    }
  );

  const [logCall, setLogCall] = useState<LogCallType>(defaultLogCall);
  const [openAlertBox, setAlertBox] = useState(false);

  useEffect(() => {
    if (filters.isFilterChange && !groupData && (isSuperAdmin() || isAdmin())) {
      getGroups();
    }

    if (filters.isFilterChange && filters.isFilterApplied && !filters.sidebarFilters.zoom_slot) {
      const { ApiUrl } = getApiUrl(filters, date);
      refetchCallsDetailsWithNewUrl(ApiUrl);
    }

    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters.isFilterChange]);


  return (
    <PageLayout>
      <MyCalenderContext.Provider
        value={{
          date,
          setDate,
          CallsDetails,
          isMobile,
          groupData,
          showFilters,
          openFilters,
          closeFilters,
          filters,
          setFilters,
          resetFilters: () => {
            setFilters(() => (defaultFilters));
          },
          refetchCallsDetails,
          formattedCallDetails,
          ams,
          setAms,
          logCall,
          setLogCall
        }}
      >
        <MyCalenderHeader />
        {(isSuperAdmin() || isAdmin()) ? <MyCalenderWithFilters /> : (isClient() || isExpert()) ? <MyExpertClientWithFilters /> : <MyCalenderView />}


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
      </MyCalenderContext.Provider>
    </PageLayout>
  );
}
