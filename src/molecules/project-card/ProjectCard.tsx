import { useContext } from "react";
import "./style.scss";
import Stack from "@mui/material/Stack";
import PriorityChip from "../../atoms/PriorityChip";
import Tooltip from "@mui/material/Tooltip";
import linkIcon from "../../assets/images/Projects/link_new.png";
import starEmptyIcon from "../../assets/images/Projects/star.png";
import starFilledIcon from "../../assets/images/Projects/star_filled.png";
import multiUser from "../../assets/images/client/multi_user.png";
import HoverMenu from "../../atoms/HoverMenu";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import calender from "../../assets/images/expert/calendar_expert.png";
import TooltipIcons from "../../atoms/project-card-footer-icons";
import { Link, useNavigate } from "react-router-dom";
import { ClientCalls, ClientProfiles, ProjectStats, TitleValueTable, caseCodeText, isRAorAM } from "./helper";
import { ProjectContext, useProjectPageContext } from "../../pages/Projects/helper";
import EditIcon from "../../assets/images/expert/edit.png";
import { dialogTypes, filterPayload, projectApiDataItem, setDialogTypes, setFilterPayload } from "../../pages/Projects/types";
import { selectedContainerStyle } from "../../atoms/profile-cardV1/helper";
import { AppRoutes } from "../../constants";
import { LocalDayjs } from "../../utils/timezoneService";
import { getUserId, isAdmin, isClient, isExpert, isSuperAdmin } from "../../utils/role";
import { encode } from "../../utils/utils";
import { Typography } from "@mui/material";
// type Props = {};

interface Props {
  title: string;
  id: number;
  type: string;
  isBookmarked: boolean | undefined;
  addRemoveWorkspace: Function;
  clientName: string;
  caseCode: string[];
  page: string | null;
  project?: projectApiDataItem | null;
  selected: boolean;
  toggleSelected: () => void;
  isSelectClicked: boolean;
  groupList: any;
  external_topic: string;
  admin_allowed: boolean;
  workstream_allowed: boolean;
}

export default function ProjectCard({
  title,
  id,
  type,
  isBookmarked,
  addRemoveWorkspace,
  clientName,
  caseCode,
  project = null,
  page,
  selected,
  toggleSelected,
  isSelectClicked,

  groupList,
  external_topic,
  admin_allowed,
  workstream_allowed
}: Props) {
  const navigate = useNavigate();
  const { setDialog, setFilterPayload, filterPayload }: { setDialog: setDialogTypes, setFilterPayload: setFilterPayload, filterPayload: filterPayload } = useProjectPageContext();

  // title that should be sent to PE Mapping Expert Navigation will not have # , but %23 in place of it
  const encoded_title = title?.replace(/#/g, '%23')
  const USER_ID = localStorage.getItem("id");
  const login_client_id = localStorage.getItem("client_id");

  const isUserAdminOfGroup =
    project?.fk_group && groupList
      ? groupList
        .find((item: any) => item.id === project?.fk_group)
        ?.sublabel?.split(",")
        .includes(USER_ID)
      : false;

  // If in Future , we have to check if the user is RA also , use isRAorAM() from helper
  const isAccountManager = isAdmin() ? (
    (project?.account_manager_value?.id?.toString() || "") === USER_ID ? true : false
  ) : false;

  const PEMappingUrl = AppRoutes.PROJECT_PE_MAPPING + "?project_id=" + id + "&project_title=" + encoded_title + "&status=" + project?.status

  const isProjectOpen = project?.status === "Open"

  return (
    <>
      <div
        style={{ background: "white", cursor: isClient() ? "pointer" : "initial" }}
        className={`card ${isSelectClicked && selected ? "checked" : ""}`}
        onClick={(event) => {
          const target = event.target as HTMLElement;
          if (target && target.tagName) {
            const tagName = target.tagName;
            if (tagName === "SPAN" || tagName === "A") {
              return;
            }
          }
          isClient() && navigate(
            `/layout/projects/projectdetails?id=${id}&page=${page || 1}`
          )
        }}
      >
        <div className="wrapper project-card-padding">
          <div className="profile-details-container !ml-0">
            <div className="profile-header">
              {(isExpert() || isClient()) ?
                <h3 className="project-name-heading"
                  style={{ marginBottom: isClient() ? "0.5rem" : "initial" }}>{external_topic}</h3> :
                <Link
                  className="project-name-heading"
                  to={`/layout/projects/projectdetails?id=${id}&page=${page || 1}`}
                >
                  {title}
                </Link>}
              {isSelectClicked && (
                <div className="selected-container">
                  <Checkbox
                    sx={selectedContainerStyle}
                    disableRipple
                    checked={selected}
                    onChange={toggleSelected}
                  />
                </div>
              )}

              {!isClient() &&
                <Tooltip title={type} arrow>
                  <IconButton
                    className="info-icon"
                    sx={{
                      width: '32px', 
                      height: '32px',
                      backgroundColor: 'rgb(239, 162, 74);',
                      borderRadius: '50%',
                      padding: 0,
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      '&:hover': {
                        backgroundColor: 'rgb(192, 131, 62);'
                      },
                    }}
                  >
                    <Typography
                      component="span"
                      sx={{
                        color: '#ffffff',
                        fontSize: '12px',
                        fontWeight: '500',
                        lineHeight: 1,
                        padding: '4px',
                      }}
                    >
                      {(type === 'Workstream - Automated') ? 'WA' : type[0]}
                    </Typography>
                  </IconButton>
                </Tooltip>
              }
            </div>

            <div className="mt-1 id-priorityChip-container">
              <div className="single-detail-contianer">
                {!isClient() &&
                  <>
                    <p className="detail-text">ID: {id}</p>
                    {
                      project?.status !== "Closed" &&
                        admin_allowed ?
                        <Tooltip
                          title={
                            isBookmarked ? "Remove from workspace" : "Add to workspace"
                          }
                          arrow
                        >
                          <IconButton
                            onClick={(e) =>
                              isBookmarked
                                ? addRemoveWorkspace("remove", id)
                                : addRemoveWorkspace("add", id)
                            }
                          >
                            <img
                              alt={
                                isBookmarked ? "Star Filled Icon" : "Star Empty Icon"
                              }
                              src={isBookmarked ? starFilledIcon : starEmptyIcon}
                              width="15px"
                              height="15px"
                            />
                          </IconButton>
                        </Tooltip> : <div style={{ width: "31px", height: "31px" }}></div>
                    }
                  </>
                }
              </div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "1rem" }}>
                {project?.status === "Closed" ? (
                  <PriorityChip priority={"Closed"} styles={{ border: "2px solid #E26262", color: "#E26262", fontWeight: "500" }} />
                )
                  : <>
                    {project?.priority && (
                      <PriorityChip priority={project?.priority} />
                    )}
                  </>
                }
              </div>
            </div>

            <div className="more-details">
              {isClient() ? <>
                <TitleValueTable
                  title="Case Codes:"
                  text={caseCodeText(caseCode)[0]}
                  caseCodeRem={caseCodeText(caseCode)[1]}
                />
                <TitleValueTable
                  title="Status:"
                  text={project?.status || "-"}
                />
                <TitleValueTable
                  title="Billing Office:"
                  text={project?.billing_office_value?.name || "-"}
                />
                {project?.account_manager_value?.name && (
                  <TitleValueTable
                    title="Account Manager:"
                    text={project?.account_manager_value?.name}
                    isCapital={true}
                    textStyle={{
                      color: "#ec9324",
                      textDecoration: "underline"
                    }}
                    textOnClick={(e) => {
                      e.stopPropagation();
                      setDialog((prev) => ({
                        ...prev,
                        accManager: {
                          state: true,
                          acc_id: project?.account_manager_value?.id
                        }
                      }))
                    }}
                  />
                )}
              </>
                : <>
                  <TitleValueTable title="Client Name:" text={clientName} />
                  {project?.account_manager_value?.name && (
                    <TitleValueTable
                      title="Account Manager:"
                      text={project?.account_manager_value?.name}
                      isCapital={true}
                    />
                  )}
                  {caseCode &&
                    <TitleValueTable
                      title="Casecode:"
                      text={caseCodeText(caseCode)[0]}
                      caseCodeRem={caseCodeText(caseCode)[1]}
                    />
                  }
                  {((project as any)?.receiving_date) ? (
                    <TitleValueTable
                      title="Receiving Date:"
                      text={LocalDayjs((project as any)?.receiving_date).format(
                        "DD MMM YYYY"
                      )}
                    />
                  ) : null}
                </>
              }
            </div>
          </div>
        </div>
        <div className="project-card-padding">
          <Stack
            justifyContent={"space-between"}
            spacing={1}
            direction="row"
            marginTop={2}
          >
            {isClient() ? <>
              <ProjectStats title={"Billed"} text={"$" + project?.total_revenue || 0} />
              <ProjectStats title="ID" text={project?.id || "-"} />
              <ProjectStats title="Calls Done" text={project?.call_count || 0} onClick={(e) => {
                e.stopPropagation();
                navigate(AppRoutes.CALLS + "?page=1&project_id=" + id)
              }} />
              <ProjectStats
                title={`${(project?.profile_shared || 0) === 1 ? "Profile" : "Profiles"} Shared`}
                text={project?.profile_shared || 0}
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(AppRoutes.PROJECT_PE_MAPPING + `?code=${encode(`${project?.id}_${login_client_id}`)}`)
                }}
              />
            </> : <>
              {
                (isSuperAdmin() || isAccountManager || isUserAdminOfGroup)
                  ? <ProjectStats title={"Revenue"} text={"$" + project?.total_revenue || 0} />
                  : project?.status && <ProjectStats title="Status" text={project?.status || "-"} />
              }
              {
                (isSuperAdmin() || isAccountManager || isUserAdminOfGroup)
                  ? <ProjectStats title="Calls Done" text={project?.call_count || 0} onClick={() => navigate(AppRoutes.CALLS + "?page=1&project_id=" + id)} />
                  : <ProjectStats title="Target Date" text={project?.target_date ? LocalDayjs(project?.target_date).format("DD-MM-YYYY") : "-"} />
              }
              <ProjectStats
                title={`${(project?.profile_shared || 0) === 1 ? "Profile" : "Profiles"} Shared`}
                text={project?.profile_shared || 0}
                onClick={() => navigate(PEMappingUrl + "&exclude_added=true")}
              />
              <ProjectStats title="CE Done" text={project?.ce_done || 0} onClick={() => navigate(AppRoutes.EXPERT_SEARCH + "?page=1&project_id=" + id)} />
            </>}
          </Stack>
        </div>
        {!isClient() &&
          <div className="project-card-footer-icons project-card-padding">
            <TooltipIcons
              isIcon={true}
              icon={EditIcon}
              title="Edit Project"
              isDisabled={!isProjectOpen}
              handleClick={() =>
                setDialog((prev) => ({
                  ...prev,
                  editProject: {
                    state: true,
                    id: id.toString(),
                    isChange: false,
                    apiData: project,
                  },
                }))
              }
            />
            {admin_allowed &&
              <>
                <TooltipIcons
                  text="PE+"
                  isIcon={false}
                  title="Add PE"
                  isDisabled={!isProjectOpen}
                  handleClick={() =>
                    setDialog((prev) => ({
                      ...prev,
                      addPE: {
                        state: true,
                        id: id.toString(),
                        isChange: false,
                        isProjectDetails: false,
                        refetch: null
                      },
                    }))
                  }
                />
                <TooltipIcons
                  text="CE+"
                  isIcon={false}
                  title="Add CE"
                  isDisabled={!isProjectOpen}
                  handleClick={() =>
                    setDialog((prev) => ({
                      ...prev,
                      addCE: {
                        state: true,
                        id: id.toString(),
                        isChange: false,
                        mapped_project: {
                          label: title,
                          value: id,
                        },
                        refetch: null
                      },
                    }))
                  }
                />
              </>
            }

            <TooltipIcons
              icon={multiUser}
              isIcon={true}
              title="View Mapped Experts"
              handleClick={() =>
                navigate(PEMappingUrl)
              }
            />
            <TooltipIcons
              icon={calender}
              isIcon={true}
              title="Calender"
              isDisabled={!isProjectOpen}
              handleClick={() => navigate(AppRoutes.CALENDER + "?id=" + id)}
            />

            {(isAdmin() ? (project?.sibling_projects?.length || isAccountManager || admin_allowed ) : true) ?
              <HoverMenu
                type={type}
                isAccountManager={isAccountManager}
                workstream_allowed={workstream_allowed}
                onLogExtensionClick={() =>
                  setDialog((prev: dialogTypes) => ({
                    ...prev,
                    logExtension: {
                      state: true,
                      project_id: id,
                      isChange: false,
                      apiData: project,
                    },
                  }))}
                onLogWorkStreamClick={() =>
                  setDialog((prev: dialogTypes) => ({
                    ...prev,
                    logWorkStream: {
                      state: true,
                      project_id: id,
                      isChange: false,
                      apiData: project,
                    },
                  }))}
                icon={linkIcon} title=""
                handleViewProject={(isLinkedProjects: boolean) => {
                  setFilterPayload((prev: filterPayload) => ({
                    ...prev,
                    projectLinkFilter: !isLinkedProjects ? (
                      project ?
                        project.sibling_projects.join(",") + "," + project.id
                        : null
                    ) : null,
                    isFilterChange: true
                  }))
                }}
                isLinkedProjects={Boolean(filterPayload?.projectLinkFilter)}
                noOfProjectsLinked={project?.sibling_projects?.length}
                handleLinkProject={() => {
                  setDialog((prev) => ({
                    ...prev,
                    linkProject: {
                      ...prev.linkProject,
                      state: true,
                      project_id: id,
                      apiData: project,
                    }
                  }))
                }}
                handleDeLinkProject={() => {
                  setDialog((prev: dialogTypes) => ({
                    ...prev,
                    delinkProject: {
                      state: true,
                      project_id: id,
                      siblingProjects: project?.sibling_projects
                    }
                  }))
                }}
              />
              : <></>
            }
          </div>
        }

      </div>
    </>
  );
}
