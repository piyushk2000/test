import Box from "@mui/material/Box";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { useEffect, useRef, useState } from "react";
import ExpertCards from "../../organisms/expert-cards";
import ListView from "../../molecules/expert-list-view";
import {
  dataRangeFilter,
  defaultFilterPayload,
  expertPageBoxStyle,
  getExpertDefaultMode,
  getTimelineData,
  handleAlertBoxClose,
  handleAlertBoxYesClick,
  handleSubmitClose,
  handleTimelineClose,
  setTypeFilter,
} from "./helper";
import ExpertSearchAppBar from "../../molecules/app-bars/expert-page";
import { AppbarToggleOptions } from "../../molecules/app-bar-common/types";
import { useNavigate } from "react-router-dom";
import { getProfileDetails } from "../../organisms/expert-cards/helper";
import {
  AlertNBackdrop,
  Dialogs,
  ExpertControllerRef,
  filterPayload,
  selectedCardsTypes
} from "./types";
import WarningDialog from "../../molecules/form-close-warning";
import AddToProjectExperts from "../../organisms/experts/map-multiple-experts-to-project/dialog";
import { useGetParams } from "../../utils/hooks/useGetParams";
import TimelineFiltersDialog from "../../organisms/expert-profile/timeline-filters-dialog/dialog";
import TimelineSection from "../../molecules/expert-profile-sidebar/timeline-section/TimelineSection";
import { Modal } from "@mui/material";
import { formDefaultValues } from "../../organisms/expert-filter-dialog/helper";
import { isClient } from "../../utils/role";
import ClientLoginCards from "../../organisms/expert-cards/clientLoginCards";
import ExpertCardsNavbar from "../../molecules/nav-bars/expert-cards-page";
import { checkObjectValuesSame } from "../../utils/utils";
import { SelectedAction } from "../../molecules/nav-bar-common/type";
import FullPageLoading from "../../atoms/full-page-loading";
import FixedBox from "../../atoms/fixedBox";
import ExpertNavSearch from "../../molecules/nav-bars/expert-cards-page/expertNavbarSearch";
import AddToStaging from "../../organisms/experts/add-to-staging";
import AfterStagingDialog from "../../organisms/experts/add-to-staging/afterStagingDialog";
import { BoxFlex } from "../../atoms/boxSpaceBtw";
import { settingsConfigTypeOptions } from "../../utils/settings";
import { useExpertFilterEvents } from "../../utils/ga-tracker/helpers";


export default function ExpertSearch() {
  const [selectExpert, setSelectExpert] = useState(false);
  const [selectedCards, setSelectedCards] = useState<selectedCardsTypes>([]);
  const [selectedAction, setSelectedAction] = useState<SelectedAction>(null); // used in project navbar
  const [mode, setMode] = useState<AppbarToggleOptions>("card");
  const [expertApiData, setExpertApiData] = useState<any>(null);
  const [filterPayload, setFilterPayload] = useState<filterPayload>(defaultFilterPayload);
  
  const appliedFilters = useExpertFilterEvents(filterPayload)
  const [formResetFunction, setFormResetFunction] = useState<null | Function>(null)
  const [isExpertLoading, setExpertLoading] = useState<boolean>(true);
  const [dialogs, setDialogs] = useState<Dialogs>({
    addToStaging: false,
    addToProject: false,
    timelineFilters: false,
    timeline: {
      state: false,
      data: null,
      messages: null,
      id: null
    }
  });
  const [stagingResponse, setStagingResponse] = useState({
    addedExperts: [],
    already_added_to_pe_table: [],
    already_staged_expert_ids: [],
    not_confirmed_expert_ids: []
  });
  const [openStageShowDialog, setOpenStageShowDialog] = useState(false);
  const [alertNBackdrop, setAlertNBackdrop] = useState<AlertNBackdrop>({
    alert: false,
    backdrop: false,
  });
  const navigate = useNavigate();
  const ce_mapping = useGetParams("ce_mapping");
  
  const controllerRef = useRef<ExpertControllerRef>({
    controller:null,
    clearTimeout: null
  });

  const project_id = ce_mapping ? ce_mapping.split("___")[1] : null;
  const client_name = ce_mapping ? ce_mapping.split("___")[0] : null;


  const handleStageSubmit = (response: any) => {
    setStagingResponse({ ...response });
    setOpenStageShowDialog(true);
  }

  const handleListClick = () => {
    setMode("list");
  };
  const handleMenuClick = () => {
    setMode("card");
  };

  useEffect(() => {
    const mode = getExpertDefaultMode();

    // When user is coming after clicking CE Mapping in Project Details Page
    // It should always land to List View
    if (ce_mapping) {
      setMode("list");
    } else {
      setMode(mode);
    }
  }, [])

  useEffect(() => {
    const id = dialogs.timeline.id;
    if (id && dialogs.timeline.state) {
      getTimelineData(id, filterPayload.timelineFilters, setDialogs, setFilterPayload);
    }
    //eslint-disable-next-line
  }, [dialogs.timeline.state]);

  useEffect(() => {
    const id = dialogs.timeline.id;
    if (id && filterPayload.timelineFilters.isFilterChange) {
      getTimelineData(id, filterPayload.timelineFilters, setDialogs, setFilterPayload);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterPayload.timelineFilters.isFilterChange]);

  const page = useGetParams("page");


  return (
    <>
      <FullPageLoading />
      <Box sx={expertPageBoxStyle}>
        <FixedBox>
          <ExpertSearchAppBar
            handleListClick={handleListClick}
            handleMenuClick={handleMenuClick}
            mode={mode}
            setExpertApiData={setExpertApiData}
            setExpertLoading={setExpertLoading}
            setFilterPayload={setFilterPayload}
            setToggle={setMode}
            isAdvanceFilter={Boolean(filterPayload.advanceFilter)}
            getProfileDetails={() =>
              getProfileDetails(
                "1",
                setExpertApiData,
                setExpertLoading,
                filterPayload,
                setFilterPayload,
                project_id,
                controllerRef
              )
            }
            setFormResetFunction={setFormResetFunction}
          />
          <ExpertNavSearch
            filterPayload={filterPayload}
            setFilterPayload={setFilterPayload}
          />
          <ExpertCardsNavbar
            okBtnApiCalls={(
              date,
              tDate,
              select,
              calenderType
            ) =>
              dataRangeFilter(
                date,
                tDate,
                select,
                calenderType,
                setFilterPayload,
                filterPayload,
                navigate,
                ce_mapping
              )}
            setFilterPayload={setFilterPayload}
            filterPayload={filterPayload}
            isFilterApplied={!checkObjectValuesSame(filterPayload, defaultFilterPayload)}
            resetFilters={() => {
              setFilterPayload(defaultFilterPayload)
              if (formResetFunction) {
                formResetFunction(formDefaultValues)
              }
              getProfileDetails(
                "1",
                setExpertApiData,
                setExpertLoading,
                defaultFilterPayload,
                setFilterPayload,
                project_id,
                controllerRef
              )
            }}
            isSelectedClicked={selectExpert}
            addToProjectClickHandler={() =>
              setDialogs((prev) => ({
                ...prev,
                addToProject: true,
              }))
            }
            totalSelected={selectedCards.length}
            selectClickHandler={() => {
              setSelectExpert((prev: boolean) => !prev)
              if (!selectExpert) {
                setSelectedCards([]);
              }
            }}
            selectedAction={selectedAction}
            onActionSelect={(action) => setSelectedAction(action)}
            setTypeFilter={(type: string) =>
              setTypeFilter(type, setFilterPayload, filterPayload, navigate, ce_mapping)
            }
            addToStagingClickHandler={() => {
              setDialogs((prev) => ({
                ...prev,
                addToStaging: true,
              }))
            }}
            getUrlPayload={async () => {
              return await getProfileDetails(page || "1", setExpertApiData, setExpertLoading, filterPayload, setFilterPayload, project_id, null, true)
            }}
          />
        </FixedBox>
        {ce_mapping &&
          <BoxFlex sx={{
            backgroundColor: "var(--green-color)", padding: "10px", color: "white", borderRadius: "4px", "& p": {
              fontSize: "15px", fontWeight: "500"
            }
          }}>
            <p>You're viewing CE for {client_name}'s project with ID: {project_id}</p>
          </BoxFlex>
        }
        {isClient() ?
          <ClientLoginCards
            apiData={expertApiData}
            setApiData={setExpertApiData}
            filterPayload={filterPayload}
            selectedCards={selectedCards}
            setSelectedCards={setSelectedCards}
            selectExpert={selectExpert}
            isExpertLoading={isExpertLoading}
            setExpertLoading={setExpertLoading}
            controllerRef={controllerRef}
            setFilterPayload={setFilterPayload}
          /> :
          <ExpertCards
            apiData={expertApiData}
            setApiData={setExpertApiData}
            filterPayload={filterPayload}
            selectedCards={selectedCards}
            setSelectedCards={setSelectedCards}
            selectExpert={selectExpert}
            isExpertLoading={isExpertLoading}
            setExpertLoading={setExpertLoading}
            controllerRef={controllerRef}
            setFilterPayload={setFilterPayload}
            setDialogs={setDialogs}
            mode={mode}
          />
        }
      </Box>

      {/* Add To Project */}
      <AddToProjectExperts
        isOpen={dialogs.addToProject}
        handleClose={() => {
          handleSubmitClose(setDialogs);
        }}
        selectedCards={selectedCards}
        setBackdrop={(bool: boolean) => {
          setAlertNBackdrop((prev) => ({ ...prev, backdrop: bool }));
        }}
      />

      {/* Add To Staging */}
      <AddToStaging
        isOpen={dialogs.addToStaging}
        handleClose={() => {
          handleSubmitClose(setDialogs);
        }}
        selectedCards={selectedCards}
        handleStageSubmit={(response: any) => { handleStageSubmit(response) }}
      />

      {/* Show Staged Experts */}
      <AfterStagingDialog
        stageResponse={stagingResponse}
        isOpen={openStageShowDialog}
        handleClose={() => {
          setOpenStageShowDialog(false)
        }}
        selectedCards={selectedCards}
      />

      {/* Timeline Dialog */}
      {dialogs.timeline.state && (
        <Modal
          open={dialogs.timeline.state}
          onClose={() => handleTimelineClose(setFilterPayload, setDialogs)}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            "& > div": {
              width: {
                sm: "100%"
              },
            }
          }}
        >
          <TimelineSection
            closeTimeline={() => handleTimelineClose(setFilterPayload, setDialogs)}
            timelineData={dialogs.timeline}
            openTimelineFilters={() =>
              setDialogs((prev) => ({
                ...prev,
                timelineFilters: true
              }))
            }
            isFilterAdded={filterPayload.timelineFilters.filterAdded}
          />
        </Modal>
      )}

      {/* Timeline Filters Dialog */}
      <TimelineFiltersDialog
        isOpen={dialogs.timelineFilters}
        timelineState={dialogs.timeline.state}
        handleClose={() => {
          setDialogs((prev) => ({
            ...prev,
            timelineFilters: false
          }))
        }}
        setElementsData={(action,
          actor,
          date,
          filterAdded) => {
          setFilterPayload((prev) => ({
            ...prev,
            timelineFilters: {
              ...prev.timelineFilters,
              actor,
              action,
              date,
              filterAdded,
              isFilterChange: true,
            }
          }))
        }}
      />


      {/* Form Close Warning */}

      <WarningDialog
        handleClose={() => handleAlertBoxClose(setAlertNBackdrop)}
        handleYesClick={() =>
          handleAlertBoxYesClick(setAlertNBackdrop, setDialogs)
        }
        open={alertNBackdrop.alert}
      />

      {/* Backdrop */}
      <Backdrop
        sx={{ color: "#fff", zIndex: 2000 }}
        open={alertNBackdrop.backdrop}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
}
