import React, { useEffect, useRef } from "react";
import "./projects.scss";
import { Outlet, useNavigate } from "react-router-dom";
import AddProjectForm from "../../organisms/add-project";
import FormCloseWarningDialog from "../../molecules/form-close-warning";

import {
  ProjectContext,
  defaultDialogValues,
  defaultFilterPayloadValues,
  getAllProjects,
  handleAlertBoxClose,
  handleAlertBoxYesClick,
  handleClose,
  handleFormChangeAddProject,
  handleFormChangeLinkProject,
  handleFormChangeLogExtension,
  handleFormChangeLogWorkStream,
  handleFormChangeProject,
  handleSubmitClose,
  setAddCEFormChange,
} from "./helper";
import DialogModal from "../../atoms/dialog";
import ProjectFilterDialog from "../../organisms/project-filter-dialog/dialog";
import {
  AgendaResponse,
  ProjectApiDataResponse,
  dialogTypes,
  filterPayload,
  projectApiDataItem,
} from "./types";
import AddPE from "../../organisms/project/project-add-pe-form";
import AddExpertForm from "../../organisms/add-expert";
import EditProjectDialog from "../../organisms/edit-project/dialog";
import Agenda from "../../organisms/project/project-agenda/Agenda";
import AgendaDescription from "../../organisms/project/project-agenda/project-agenda-description";
import BackdropComponent from "../../atoms/backdropComponent";
import NewCallLogDialog from "../../molecules/project-navbar/log-new-call/newCallLog";
import LogExtension from "../../organisms/project/log-extension/LogExtension";
import LinkProject from "../../organisms/project/link-project";
import DeLinkProject from "../../organisms/project/de-link-project";
import { useGetParams } from "../../utils/hooks/useGetParams";
import AccountManagerContactDetails from "../../molecules/project/account-manager-details";
import {  isExpert } from "../../utils/role";
import PageLayout from "../../atoms/page-layout";
import FullPageLoading from "../../atoms/full-page-loading";
import { AppRoutes } from "../../constants";
import AddSPE from "../../organisms/project/project-add-spe-form";
import { TATDialog } from "../../organisms/project-detail/tt-dialog";

const Projects = () => {
  const client_id = useGetParams("client_id");
  const serviced = useGetParams("serviced");
  const client_projects = useGetParams("client_projects")
  const [isDialog, setDialog] = React.useState<dialogTypes>(defaultDialogValues);
  // retrieving data about all the project from the api
  const [apiData, setData] = React.useState<ProjectApiDataResponse | null>(
    null
  );
  const [bookmarkedProjects, setBookmarkedProjects] = React.useState<
    projectApiDataItem[]
  >([]);

  const defaultFilterPayload = defaultFilterPayloadValues(client_id, serviced, client_projects);

  const filterFormRef = useRef<any>();
  const navigate = useNavigate();

  const handleResetFilters = () => {
    if (filterFormRef.current && filterFormRef.current.resetForm) {
      filterFormRef.current.resetForm();
    }
  };

  const [filterPayload, setFilterPayload] = React.useState<filterPayload>(defaultFilterPayload);

  const [openAlertBox, setAlertBox] = React.useState(false);
  const [isBackdrop, setBackdrop] = React.useState(false);

  // Redirect the Expert to => layout/expert-projects
  useEffect(() => {
    if (isExpert()) {
      navigate(AppRoutes.Expert_Project_Page)
    }
  }, [])

  if (isExpert()) {
    return <></>;
  }

  return (
    <>
      <FullPageLoading />
      <ProjectContext.Provider
        value={{
          apiData,
          setData,
          filterPayload,
          defaultFilterPayload,
          setFilterPayload,
          bookmarkedProjects,
          setBookmarkedProjects,
          setDialog,
          isDialog,
          filterFormRef,
          handleResetFilters
        }}
      >
        <>
          <PageLayout>
            <Outlet />
          </PageLayout>

          {/* Filter Dialog */}
          <ProjectFilterDialog
            isOpen={isDialog.filter.state}
            handleClose={() =>
              isDialog.filter.isChange
                ? handleClose(setAlertBox)
                : handleSubmitClose(setDialog)
            }
            handleSubmitClose={() => handleSubmitClose(setDialog)}
            handleFormChange={() => {
              setDialog((prev) => {
                if (prev.filter.isChange) {
                  return prev;
                }

                return {
                  ...prev,
                  filter: { ...prev.filter, isChange: true },
                };
              });
            }}
          />

          {/* Edit Project */}
          <EditProjectDialog
            isOpen={isDialog.editProject.state}
            handleClose={() =>
              isDialog.editProject.isChange
                ? handleClose(setAlertBox)
                : handleSubmitClose(setDialog)
            }
            handleSubmitClose={() => {
              handleSubmitClose(setDialog);
            }}
            id={isDialog.editProject.id}
            projectDetails={isDialog.editProject.apiData}
            handleFormChange={() => {
              handleFormChangeProject(setDialog);
            }}
          />

          {/* Log Extension Form */}
          <LogExtension
            isOpen={isDialog.logExtension.state}
            handleClose={() =>
              isDialog.logExtension.isChange
                ? handleClose(setAlertBox)
                : handleSubmitClose(setDialog)
            }
            handleSubmitClose={() => {
              handleSubmitClose(setDialog);
            }}
            isWorkStream={false}
            id={isDialog.logExtension.project_id}
            projectDetails={isDialog.logExtension.apiData}
            handleFormChange={() => {
              handleFormChangeLogExtension(setDialog);
            }}
            refetch={() => setFilterPayload((prev) => ({ ...prev, isFilterChange: true }))}
          />
          <LogExtension //The same dialogue is also used to create workstreams
            isOpen={isDialog.logWorkStream.state}
            isWorkStream={true}
            handleClose={() =>
              isDialog.logWorkStream.isChange
                ? handleClose(setAlertBox)
                : handleSubmitClose(setDialog)
            }
            handleSubmitClose={() => {
              handleSubmitClose(setDialog);
            }}
            id={isDialog.logWorkStream.project_id}
            projectDetails={isDialog.logWorkStream.apiData}
            handleFormChange={() => {
              handleFormChangeLogWorkStream(setDialog);
            }}
            refetch={() => setFilterPayload((prev) => ({ ...prev, isFilterChange: true }))}
          />

          {/* Project Link Form */}
          <LinkProject
            isOpen={isDialog.linkProject.state}
            handleClose={() => isDialog.linkProject.isChange ? handleClose(setAlertBox) : handleSubmitClose(setDialog)}
            project_id={isDialog.linkProject.project_id}
            projectDetails={isDialog.linkProject.apiData}
            handleSubmitClose={() => handleSubmitClose(setDialog)}
            handleFormChange={() => {
              handleFormChangeLinkProject(setDialog);
            }}
            refetch={(new_link_id: string) => {
              setFilterPayload((prev) => ({
                ...prev,
                projectLinkFilter: Boolean(prev.projectLinkFilter) ? prev.projectLinkFilter + "," + new_link_id : null,
                isFilterChange: true
              }))
            }}
          />

          {/* Delink Project */}
          <DeLinkProject
            handleClose={() => handleSubmitClose(setDialog)}
            siblingProjects={isDialog.delinkProject.siblingProjects}
            project_id={isDialog.delinkProject.project_id}
            isOpen={isDialog.delinkProject.state}
            refetch={() => {
              setFilterPayload((prev) => ({
                ...prev,
                projectLinkFilter: null,
                isFilterChange: true
              }))
            }}
            setBackdrop={setBackdrop}
          />


          {/* Agenda Dialog */}
          <Agenda
            open={isDialog.agenda.state}
            onClose={() => handleSubmitClose(setDialog)}
            openAddAgenda={isDialog.agenda.openAddAgenda}
            openAgendaDescription={(
              fk_agenda: number | null,
              agenda_responses: AgendaResponse[] | null,
              pe_id: number | null,
              isAdminAllowed: boolean,
              isProjectOpen: boolean
            ) => {
              setDialog((prev) => ({
                ...prev,
                isAgendaDescription: {
                  ...prev.isAgendaDescription,
                  state: true,
                  fk_agenda: fk_agenda,
                  agenda_responses: agenda_responses,
                  pe_id: pe_id,
                  isAdminAllowed,
                  isProjectOpen
                },
              }));
            }}
            projectId={isDialog.agenda.project_id?.toString() || null}
            isAgendaIdChanged={isDialog.agenda.isAgendaIdChanged}
            isAdminAllowed={isDialog.agenda.isAdminAllowed}
            isProjectOpen={isDialog.agenda.isProjectOpen}
          />

          {/* Agenda Description Dialog */}
          <AgendaDescription
            isOpen={isDialog.isAgendaDescription.state}
            handleClose={() =>
              setDialog((prev) => ({
                ...prev,
                isAgendaDescription: {
                  state: false,
                  isChange: false,
                  fk_agenda: null,
                  agenda_responses: null,
                  pe_id: null,
                  isAdminAllowed: false,
                  isProjectOpen: false
                },
              }))
            }
            handleSubmitClose={() => handleSubmitClose(setDialog)}
            fk_agenda={isDialog.isAgendaDescription.fk_agenda}
            agenda_responses={isDialog.isAgendaDescription.agenda_responses}
            setBackdrop={setBackdrop}
            pe_id={isDialog.isAgendaDescription.pe_id}
            isAdminAllowed={isDialog.isAgendaDescription.isAdminAllowed}
            isProjectOpen={isDialog.isAgendaDescription.isProjectOpen}
          />

          {/* Account Manager Details Dialog */}
          {isDialog.accManager.state &&
            <AccountManagerContactDetails
              isOpen={isDialog.accManager.state}
              handleClose={() => handleSubmitClose(setDialog)}
              acc_manager_id={isDialog.accManager.acc_id}
            />
          }
        </>
      </ProjectContext.Provider>

      {/* New Call Log Dialog */}
      <NewCallLogDialog
        isOpen={isDialog.logCall.state}
        handleClose={() =>
          isDialog.logCall.isChange
            ? handleClose(setAlertBox)
            : handleSubmitClose(setDialog)
        }
        id={isDialog.logCall.project_id?.toString() || null}
        refetch={isDialog.logCall.refetch}
        pe_id={isDialog.logCall.pe_id}
        expert_id={isDialog.logCall.expert_id}
        handleFormChange={() =>
          setDialog((prev) => {
            if (!prev.logCall.isChange) {
              prev.logCall.isChange = true;
            }
            return prev;
          })
        }
        handleSubmitClose={() => handleSubmitClose(setDialog)}
        is_account_manager={isDialog.logCall.is_account_manager}
        is_group_admin={isDialog.logCall.is_group_admin}
      />

      {/* Add New Project */}
      {isDialog.addProject.state &&
        <DialogModal
          isOpen={isDialog.addProject.state}
          handleClose={() => isDialog.addProject.isChange ? handleClose(setAlertBox) : handleSubmitClose(setDialog)}
          title={"Add New Project"}
        >
          <AddProjectForm
            handleClose={() => isDialog.addProject.isChange ? handleClose(setAlertBox) : handleSubmitClose(setDialog)}
            handleSubmitClose={() => {
              handleSubmitClose(setDialog);
              getAllProjects(
                1,
                setData,
                filterPayload,
                setBookmarkedProjects,
                setFilterPayload,
                defaultFilterPayload
              );
            }}
            handleFormChange={() => {
              handleFormChangeAddProject(setDialog);
            }}
          />
        </DialogModal>
      }


      {/* ADD PE Dialog */}
      {isDialog.addPE.state &&
        <DialogModal
          isOpen={isDialog.addPE.state}
          handleClose={() =>
            isDialog.addPE.isChange
              ? handleClose(setAlertBox)
              : handleSubmitClose(setDialog)
          }
          title={"Add An Expert"}
        >
          <AddPE
            handleClose={() =>
              isDialog.addPE.isChange
                ? handleClose(setAlertBox)
                : handleSubmitClose(setDialog)
            }
            project_id={isDialog.addPE.id || ""}
            refetch={isDialog.addPE.refetch}
            handleSubmitClose={() => {
              handleSubmitClose(setDialog);
            }}
            selectedExpert={isDialog.addPE.selectedExpert}
            isProjectDetails={() => {
              setDialog((prev) => ({
                ...prev,
                addPE: { ...prev.addPE, isProjectDetails: true },
              }));
            }}
          />
        </DialogModal>
      }

      {/* ADD SPE Dialog */}
      {isDialog.addSPE.state &&
        <DialogModal
          isOpen={isDialog.addSPE.state}
          handleClose={() =>
            isDialog.addSPE.isChange
              ? handleClose(setAlertBox)
              : handleSubmitClose(setDialog)
          }
          title={"Add Experts to staging"}
        >
          <AddSPE
            handleClose={() =>
              isDialog.addSPE.isChange
                ? handleClose(setAlertBox)
                : handleSubmitClose(setDialog)
            }
            project_id={isDialog.addSPE.id || ""}
            refetch={isDialog.addSPE.refetch}
            handleSubmitClose={() => {
              handleSubmitClose(setDialog);
            }}
            isProjectDetails={() => {
              setDialog((prev) => ({
                ...prev,
                addSPE: { ...prev.addSPE, isProjectDetails: true },
              }));
            }}
          />
        </DialogModal>
      }

      {/* TAT Dialog */}
      <TATDialog 
        isOpen={isDialog.TAT.state}
        handleClose={() => {
          setDialog((prev: dialogTypes) => ({
            ...prev,
            TAT: {
              state: false,
              apiData: null,
            }
          }));
        }}
        projectDetails={isDialog.TAT.apiData}
        expert_invitation_counts={isDialog.TAT.expert_invitation_counts}
      />


      {/* Add CE Dialog */}
      <DialogModal
        isOpen={isDialog.addCE.state}
        handleClose={() =>
          isDialog.addCE.isChange
            ? handleClose(setAlertBox)
            : handleSubmitClose(setDialog)
        }
        title={"Add Expert"}
      >
        <AddExpertForm
          handleSubmitClose={() => handleSubmitClose(setDialog)}
          handleClose={() =>
            isDialog.addCE.isChange
              ? handleClose(setAlertBox)
              : handleSubmitClose(setDialog)
          }
          setChange={() => setAddCEFormChange(setDialog)}
          mapped_project={isDialog.addCE.mapped_project}
          refetch={isDialog.addCE.refetch}
        />
      </DialogModal>

      {/* Form Close Warning */}

      <FormCloseWarningDialog
        handleClose={() => handleAlertBoxClose(setAlertBox)}
        handleYesClick={() => handleAlertBoxYesClick(setAlertBox, setDialog)}
        open={openAlertBox}
        {...(isDialog.filter.state && {
          text: "Are you sure you want to close the Advance Search?",
        })}
      />

      {/* BackDrop Component */}
      <BackdropComponent isBackdrop={isBackdrop} />
    </>
  );
};
export default Projects;
