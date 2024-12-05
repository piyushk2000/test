import Grid from "@mui/material/Grid";
import "./projectDetails.scss";
import ProjectDetailCard from "./project-detail-card";
import PEMapping from "./mapping/pe-mapping";
import CEMapping from "./mapping/ce-mapping";
import ProjectNavbar from "./project-navbar";
import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { ProjectContext } from "../../pages/Projects/helper";
import { ProjectDetailsContext } from "../../atoms/project-details/projectContext";
import SkeletonLoader from "../../atoms/project-details/SkeletonLoader";
import FormCloseWarningDialog from "../../molecules/form-close-warning";
import {
  editModalState,
  getAPIData,
  getAPIDataStagedExperts,
  getAPIDataStagedExpertsInitial,
  getprojectDetails,
  handleAddAgendaOpen,
  handleAlertBoxClose,
  handleAlertBoxYesClick,
  handleDialogClose,
  handleDialogOpen,
  handleFormChangeProject,
  handleSubmitClose,
  refetchPeMappingValues,
} from "./helper";
import {
  ProjectApiDataResponse,
  dialogTypes,
  projectDetailsDefaultValues,
  setDialogTypes,
} from "../../pages/Projects/types";
import EditProjectDialog from "../edit-project/dialog";
import ProjectHeader from "../../molecules/app-bars/project-page";
import AgendaDialog from "../../molecules/project-navbar/agenda/agenda";
import { getAgenda, handleAgendaSubmit } from "./project-navbar/helper";
import { APIRoutes } from "../../constants";
import { useFetch } from "../../utils/hooks/useFetch";
import ReScheduleOrCancelCallDialog from "./mapping/reschedule-or-cancel";
import { isAdmin, isClient } from "../../utils/role";
import SuggestAnExpertDialog from "../project/suggest-an-expert";
import { isAdminAllowed } from "../../pages/Calls/helpers";

const ProjectDetails = () => {
  const [modalOpen, setModalOpen] = useState<editModalState>({
    edit: { state: false, isChange: false },
    addAgenda: { state: false, isChange: false },
    suggestExpert: { state: false, isChange: false },
    reScheduleOrCancel: { state: false, expert_id: null },
  });
  const [defaultValues, setDefaultValues] =
    useState<projectDetailsDefaultValues>({
      projectDetails: null,
      ce_mapping: null,
      pe_mapping: null,
    });
    const [stagedExperts, setStagedExperts] =
    useState([]);
  const [isLoading, setLoading] = useState<boolean>(true);
  const [openAlertBox, setAlertBox] = useState<boolean>(false);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get("id");
  const page = queryParams.get("page");
  const {
    apiData,
    isDialog,
    setDialog,
  }: {
    apiData: ProjectApiDataResponse | null;
    isDialog: dialogTypes;
    setDialog: setDialogTypes;
  } = useContext(ProjectContext);


  const { data: groupList, loading: groupLoading } = useFetch<
    any,
    { label: string; value: string }[]
  >(APIRoutes.getGroup, { variables: [!isClient()] });

  const adminAllowed =
    defaultValues.projectDetails ?
      isAdminAllowed(parseInt(defaultValues.projectDetails.fk_group), defaultValues?.projectDetails?.account_manager, defaultValues?.projectDetails?.research_analysts, groupList, true) :
      false;

  const refetchExpertsStaged=()=>{
    getAPIDataStagedExperts(id,setLoading, setStagedExperts);
  }    

  useEffect(() => {
    getAPIData(apiData, id, setDefaultValues, setLoading);
    getAPIDataStagedExpertsInitial(id, setStagedExperts);
    // eslint-disable-next-line
  }, [id]);

  return (
    <ProjectDetailsContext.Provider
      value={{
        defaultValues,
        setDefaultValues,
        isLoading,
        setLoading,
        setModalOpen,
        isAdminAllowed: adminAllowed,
        stagedExperts,
        setStagedExperts
      }}
    >
      <ProjectHeader title="Project Details" />
      <Grid container>
        <Grid item xs={12}>
          <ProjectNavbar
            isLoading={isLoading}
            openEditProjectDialog={() => handleDialogOpen(setModalOpen)}
            id={id}
            page={page}
            topic={defaultValues?.projectDetails?.topic}
            openAddAgendaDialog={() => handleAddAgendaOpen(setModalOpen)}
            setDefaultValues={setDefaultValues}
            refetchExpertsStaged={refetchExpertsStaged}
            defaultValues={defaultValues}
          />
        </Grid>
        <Grid item xs={12}>
          {(isLoading || groupLoading) ? (
            <SkeletonLoader
              width={"100%"}
              height={"400px"}
              marginBottom={"1.5em"}
            />
          ) : (
            <ProjectDetailCard
              id={id}
              openAddAgenda={() => handleAddAgendaOpen(setModalOpen)}
              isAgenda={
                defaultValues.projectDetails?.applicable_agenda_id || null
              }
              groupList={groupList}
            />
          )}
        </Grid>
        <Grid item xs={12}>
          {isLoading ? (
            <SkeletonLoader
              width={"100%"}
              height={"400px"}
              marginBottom={"1.5em"}
            />
          ) : (
            <PEMapping project_id={id} />
          )}
        </Grid>
        {!isClient() &&
          <Grid item xs={12}>
            {isLoading ? (
              <SkeletonLoader
                width={"100%"}
                height={"400px"}
                marginBottom={"1.5em"}
              />
            ) : (
              <CEMapping  project_id={id} />
            )}
          </Grid>
        }

      </Grid>

      {!isLoading && (
        <>
          {/* Add or Edit Agenda Dialog */}
          <AgendaDialog
            isOpen={modalOpen.addAgenda.state}
            handleClose={() =>
              modalOpen.addAgenda.isChange
                ? handleDialogClose(setAlertBox)
                : handleSubmitClose(setModalOpen)
            }
            handleSubmitClose={() => handleSubmitClose(setModalOpen)}
            getprojectDetails={async () =>
              await getprojectDetails(setLoading, setDefaultValues, id, false)
            }
            handleSubmit={(
              quesArr: any,
              id: any,
              handleClose: any,
              agenda_id: any,
              getprojectDetails: any,
              setBackdrop: any
            ) =>
              handleAgendaSubmit(
                quesArr,
                id,
                handleClose,
                agenda_id,
                getprojectDetails,
                setBackdrop,
                setDialog
              )
            }
            getAgenda={getAgenda}
            id={id}
            agenda_id={defaultValues?.projectDetails?.applicable_agenda_id}
            isFormChange={() =>
              setModalOpen((prev) => {
                if (prev.addAgenda.isChange) {
                  return prev;
                }
                return {
                  ...prev,
                  addAgenda: { ...prev.addAgenda, isChange: true },
                };
              })
            }
            isProjectOpen={defaultValues?.projectDetails?.status === "Open"}
          />

          {/* Reschedule and Cancel Call Dialog */}
          {modalOpen.reScheduleOrCancel.expert_id ? (
            <ReScheduleOrCancelCallDialog
              isOpen={modalOpen.reScheduleOrCancel.state}
              handleClose={() => handleSubmitClose(setModalOpen)}
              expert_id={modalOpen.reScheduleOrCancel.expert_id}
              project_id={id}
              refetch={() => {
                setDialog((prev) => ({
                  ...prev,
                  addPE: { ...prev.addPE, isProjectDetails: true },
                }));
              }}
            />
          ) : null}
        </>
      )}

      {/* Edit Project Dialog */}
      {defaultValues?.projectDetails && (
        <EditProjectDialog
          isOpen={modalOpen.edit.state}
          handleClose={() =>
            modalOpen.edit.isChange
              ? handleDialogClose(setAlertBox)
              : handleSubmitClose(setModalOpen)
          }
          projectDetails={defaultValues.projectDetails}
          handleSubmitClose={() => handleSubmitClose(setModalOpen)}
          id={id}
          handleFormChange={() => {
            handleFormChangeProject(setModalOpen);
          }}
        />
      )}

      {/* Form Close Warning */}
      <FormCloseWarningDialog
        handleClose={() => handleAlertBoxClose(setAlertBox)}
        handleYesClick={() => handleAlertBoxYesClick(setAlertBox, setModalOpen)}
        open={openAlertBox}
      />

      {/* Suggest an Expert */}
      {isClient() &&
        <SuggestAnExpertDialog
          isOpen={modalOpen.suggestExpert.state}
          handleClose={() => modalOpen.suggestExpert.isChange ? handleDialogClose(setAlertBox) : handleSubmitClose(setModalOpen)}
          handleSubmitClose={() => handleSubmitClose(setModalOpen)}
          handleChange={() => setModalOpen((prev) => {
            if (!prev.suggestExpert.isChange) {
              prev.suggestExpert.isChange = true;
              return { ...prev };
            }
            return prev;
          })}
        />
      }

    </ProjectDetailsContext.Provider>
  );
};

export default ProjectDetails;
