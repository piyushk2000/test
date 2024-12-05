import Grid from "@mui/material/Grid";
import ProjectCard from "../../molecules/project-card/ProjectCard";
import { useContext, useEffect, useState } from "react";
import {
  Select,
  SelectedCards,
  alertBox,
  patchBookMarkedProjects,
} from "./helper";
import WarningDialog from "../../molecules/form-close-warning";
import {
  ProjectContext,
  getAllProjects,
  openAddProjectDialog,
  openFiltersDialog,
} from "../../pages/Projects/helper";
import { useNavigate } from "react-router-dom";
import NoResultFoundFilters from "../../atoms/noResultsFilters";
import ProjectHeader from "../../molecules/app-bars/project-page";
import CardsLoadingScreen from "../../atoms/cardsLoader";
import DialogModal from "../../atoms/dialog";
import PickNewAccManagerForm from "../project/pick-new-acc-mngr-form";
import { isSelected, toggleItemInArray } from "../../common/select";
import BackdropComponent from "../../atoms/backdropComponent";
import { useGetParams } from "../../utils/hooks/useGetParams";
import { useFetch } from "../../utils/hooks/useFetch";
import { APIRoutes, AppRoutes } from "../../constants";
import { isAdmin, isClient } from "../../utils/role";
import { isAdminAllowed } from "../../pages/Calls/helpers";
import { filterPayload } from "../../pages/Projects/types";
import { rowsPerPage } from "../../common";
import ProjectCardsNavbar from "../../molecules/nav-bars/project-cards-page";
import { checkObjectValuesSame } from "../../utils/utils";
import { SelectedAction } from "../../molecules/nav-bar-common/type";
import PaginationComponent from "../../atoms/pagination";
import FixedBox from "../../atoms/fixedBox";

const ProjectCards = () => {
  const [alertBox, setAlertBox] = useState<alertBox>({
    isAlert: false,
    id: NaN,
  });
  const [select, setSelect] = useState<Select>({
    isClicked: false,
    selectedCards: [],
    isAccManagerDialog: { state: false, allAccManagers: null },
  });
  const [isBackdrop, setBackdrop] = useState<boolean>(false);
  const [selectedAction, setSelectedAction] = useState<SelectedAction>(null); // used in project navbar
  const {
    apiData,
    setData,
    filterPayload,
    bookmarkedProjects,
    setBookmarkedProjects,
    setDialog,
    setFilterPayload,
    defaultFilterPayload,
    handleResetFilters
  } = useContext(ProjectContext);
  const { data: groupList, loading: groupLoading } = useFetch<
    any,
    { label: string; value: string }[]
  >(APIRoutes.getGroup, {
    variables: [!isClient()]
  });
  const navigate = useNavigate();
  const page = useGetParams("page");

  // Project Ids ( This only happens when we are coming from expert cards page to project page to show projects of a particular Expert )
  const projectIds = useGetParams("projectIds");

  function addRemoveWorkspaceClickHandler(choice: string, id: number) {
    if (choice === "remove") {
      setAlertBox((prevBox) => ({
        isAlert: true,
        id,
      }));
    } else if (choice === "add") {
      patchBookMarkedProjects(
        "Add",
        id,
        setBackdrop,
        setBookmarkedProjects,
        bookmarkedProjects,
        apiData,
        setData
      );
    }
  }

  function handleClose(choice: string) {
    setAlertBox((prevBox) => ({
      ...prevBox,
      isAlert: false,
    }));

    if (choice === "cancel") {
      return;
    } else if (choice === "yes") {
      patchBookMarkedProjects(
        "Remove",
        alertBox.id,
        setBackdrop,
        setBookmarkedProjects,
        bookmarkedProjects,
        apiData,
        setData
      );
    }
  }

  function paginationHandler(e: any, value: any) {
    if (page && +page !== value) {
      setData(null);
      navigate("/layout/projects/all?page=" + value);
    }
  }

  /*
    HOW NAVIGATION AND FILTERS REFETCH WORKING -
     - user came first time
        -- filterPayload.isFilterChange is FALSE by default
        -- USE EFFECT 1 will run 
          -- if page is in the param, projects will be refetch
          -- if page is not in the param , navigate to projects page again and putting page as 1 in param
        
        -- IF FILTERS WERE APPLIED -
        -- FilterPayload.isFilterChange changed to TRUE
        -- USE Effect 2 will run
          -- make filterPayload.isFilterChange to false
          -- navigate to page 1 again where we will fetch the project details in USE EFFECT 1
  */

  useEffect(
    () => {
      if (!filterPayload.isFilterChange) {
        if (page) {
          getAllProjects(
            parseInt(page),
            setData,
            filterPayload,
            setBookmarkedProjects,
            setFilterPayload,
            defaultFilterPayload,
            projectIds
          );

        } else {
          // If page is undefined, navigate to page 1
          navigate("/layout/projects/all?page=" + 1, { replace: true });
        }
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [page, filterPayload.isFilterChange]
  );

  useEffect(() => {
    if (filterPayload.isFilterChange) {
      setFilterPayload((prev: filterPayload) => ({
        ...prev,
        isFilterChange: false,
      }));
      navigate("/layout/projects/all?page=" + 1, { replace: true });
    }
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterPayload.isFilterChange]);

  function refetch() {
    if (page) {
      getAllProjects(
        parseInt(page),
        setData,
        filterPayload,
        setBookmarkedProjects,
        setFilterPayload,
        defaultFilterPayload
      );
    }
  }

  return (
    <>

      <FixedBox>
        <ProjectHeader
          title="Projects"
          openAddProjectDialog={() => openAddProjectDialog(setDialog)}
          openFiltersDialog={() => openFiltersDialog(setDialog)}
          toggleOptions={["card", "list", "kanban"]}
          isFilter={true}
          isAddIcon={true}
        />
        <ProjectCardsNavbar
          isFilterApplied={!checkObjectValuesSame(filterPayload, defaultFilterPayload)}
          resetFilters={() => {
            handleResetFilters()
            setFilterPayload({ ...defaultFilterPayload, isFilterChange: true })
          }}
          isSelectedClicked={select.isClicked}
          pickAccManagerHandler={() => setSelect((prev) => ({
            ...prev,
            isAccManagerDialog: {
              ...prev.isAccManagerDialog,
              state: true,
            },
          }))}
          totalSelected={select.selectedCards.length}
          selectClickHandler={() => setSelect((prev) => ({ isClicked: !prev.isClicked, selectedCards: [], isAccManagerDialog: { state: false, allAccManagers: null } }))}
          selectedAction={selectedAction}
          onActionSelect={(action) => setSelectedAction(action)}
        />
      </FixedBox>
      {(!groupLoading && apiData) ? (
        <>
          {apiData?.total === 0 ? (
            <NoResultFoundFilters />
          ) : (
            <>
              <Grid container spacing={2}>
                {apiData?.data?.map((project: any) => (
                  <Grid item key={project.id} xs={12} md={6} lg={4}>
                    <ProjectCard
                      admin_allowed={isAdmin() ? isAdminAllowed(project.fk_group, project.account_manager, project.research_analysts, groupList, true) : true}
                      workstream_allowed ={isAdmin() ? isAdminAllowed(project.fk_group, project.account_manager, project.research_analysts, groupList, false) : true}
                      external_topic={project.external_topic}
                      title={project.topic}
                      id={project.id}
                      type={project?.type}
                      groupList={groupList}
                      isBookmarked={project.isBookmarked}
                      addRemoveWorkspace={addRemoveWorkspaceClickHandler}
                      clientName={project.client_name}
                      caseCode={project.case_code}
                      project={project}
                      page={page}
                      isSelectClicked={select.isClicked}
                      selected={isSelected<SelectedCards>(project.id, select.selectedCards)}
                      toggleSelected={() => {
                        setSelect((prev: Select) => ({
                          ...prev,
                          selectedCards: toggleItemInArray<SelectedCards>(prev.selectedCards, {
                            label: project.topic,
                            value: project.id,
                            client_name: project.client_name,
                            acc_manager: project.account_manager_value.name,
                          }),
                        }));
                      }}
                    />
                  </Grid>
                ))}
              </Grid>
              { /* 
                DATED - 9 May 2024
                If Project Ids are there we are hiding pagination and getting all the project by setting the limit = 200 in the API
               ( This only happens when we are coming from expert cards page to project page to show projects of a particular Expert )
                */ }
              {projectIds ?
                <></> :
                <PaginationComponent
                  page={apiData?.page}
                  totalPages={apiData?.totalPages}
                  paginationHandler={paginationHandler}
                  totalResult={apiData?.total}
                  dropdownFilterProps={{
                    link: AppRoutes.PROJECTS + "/all?page=1",
                    setFilterPayload(page) {
                      setFilterPayload((prev: filterPayload) => {
                        prev = {
                          ...prev,
                          rowsPerPage: parseInt(page),
                          isFilterChange: true,
                        };
                        return prev;
                      })
                    },
                    dropDownItems: rowsPerPage,
                    filterValue: filterPayload.rowsPerPage.toString()
                  }}
                />
              }

            </>
          )}

          {/* Pick New Account Manager */}
          {select.isAccManagerDialog.state &&
            <DialogModal
              title="Pick New Account Manager"
              isOpen={select.isAccManagerDialog.state}
              handleClose={() => {
                setSelect((prev) => ({
                  ...prev,
                  isAccManagerDialog: { state: false, allAccManagers: null },
                }));
              }}
            >
              <PickNewAccManagerForm
                select={select}
                handleClose={() => {
                  setSelect((prev) => ({
                    ...prev,
                    isAccManagerDialog: { state: false, allAccManagers: null },
                  }));
                }}
                setBackdrop={setBackdrop}
                refetch={refetch}
              />
            </DialogModal>
          }


          {/* Warning Dialog */}
          <WarningDialog
            text="Are sure you want to remove the project from your workspace?"
            handleClose={() => handleClose("cancel")}
            handleYesClick={() => handleClose("yes")}
            open={alertBox.isAlert}
          />

          {/* Backdrop */}
          <BackdropComponent isBackdrop={isBackdrop} />
        </>
      ) : (
        <CardsLoadingScreen />
      )}
    </>
  );
};

export default ProjectCards;
