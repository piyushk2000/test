import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { Link, useNavigate } from "react-router-dom";

import { ExpertProjectDetails } from "../../../pages/expert-project/types";
import style from "./expert-project-card.module.scss";
import { LocalDayjs } from "../../../utils/timezoneService";
import CustomBtnFilled from "../../../atoms/form-molecules/CustomBtnFilled";
import { useBoolean } from "../../../utils/hooks/useBoolean";
import AgendaDescription from "../../../organisms/project/project-agenda/project-agenda-description";
import { useFullPageLoading } from "../../../atoms/full-page-loading/loadingContext";
import { AppRoutes } from "../../../constants";
import { useSnackbar } from "notistack";
import { isAdmin } from "../../../utils/role";
import calender from "../../../assets/images/expert/calendar_expert.png";
import TooltipIcons from "../../../atoms/project-card-footer-icons";

type Props = {
    project: ExpertProjectDetails,
    refetch: () => Promise<void>
}

export default function ExpertProjectCard({ project, refetch }: Props) {
    const token = localStorage.getItem("token");
    const navigate = useNavigate();
    const { value: isAgendaOpen, setFalse: closeAgenda, setTrue: openAgenda } = useBoolean();
    const { setLoading: fullPageLoading } = useFullPageLoading();
    const { enqueueSnackbar } = useSnackbar();

    return (
        <>
            <div className={style.card}>
                <div className={style.flexBtwn}>
                    <Tooltip title={project.fk_project_value.external_topic} arrow>
                        <p className={style.heading}>{project.fk_project_value.external_topic}</p>
                    </Tooltip>
                </div>
                <div className={style.divider}></div>
                <TitleValueTable
                    title={"Calls Scheduled:"}
                    text={project.calls_scheduled?.toString() || "0"}
                />
                <TitleValueTable
                    title={"Calls Completed:"}
                    text={project.calls_completed?.toString() || "0"}
                    text_link={AppRoutes.CALLS + "?project_id=" + project.fk_project_value?.id}
                />
                {project.agenda_shared_on &&
                    <TitleValueTable
                        title={"Agenda Shared On:"}
                        text={LocalDayjs(project.agenda_shared_on).format("DD MMM YYYY, hh:mm A")}
                    />
                }
                <div className={style.flex} style={{ marginTop: "10px" }}>
                    {project.expert_invitation !== "Invited" &&
                        <CustomBtnFilled
                            label={project.expert_invitation === "Accepted" ? "Invitation Accepted" : "Invitation Declined"}
                            variant="outlined"
                            styles={{
                                borderColor: project.expert_invitation === "Accepted" ? "rgb(236, 147, 36)" : "red",
                            }}
                        />
                    }
                    {
                        project.expert_invitation === "Invited" &&  project.fk_project_value?.status!=='Closed' &&
                        <CustomBtnFilled
                            label="View Invitation"
                            variant="contained"
                            onClick={() => {
                                let redirect_url = "";
                                if (project.meta && project.meta.project_invitation_link) {
                                    const projectInvitationLink = String(project.meta.project_invitation_link);
                                    redirect_url = projectInvitationLink.includes("?")
                                        ? `${projectInvitationLink}&token=${token}`
                                        : `${projectInvitationLink}?token=${token}`;
                                    window.open(redirect_url, "_target", "noopener,noreferrer")
                                } else {
                                    console.error("Missing project_invitation_link in project meta.");
                                    enqueueSnackbar("Missing project invitation link", {
                                        variant: "warning"
                                    })
                                }
                            }
                            }
                        />
                    }

                    {
                        project.expert_invitation === "Accepted" && (
                            project?.agenda_responses ?
                                <CustomBtnFilled
                                    label="View Agenda"
                                    variant="contained"
                                    onClick={() => {
                                        openAgenda()
                                    }}
                                /> : project?.fk_agenda_value?.agenda?.questions && project?.meta?.project_invitation_link &&
                                <CustomBtnFilled
                                    label="Respond to Agenda"
                                    variant="contained"
                                    onClick={() => {
                                        openAgenda()
                                    }}
                                />
                        )
                    }
                    <TooltipIcons
                        icon={calender}
                        isIcon={true}
                        title="Calender"
                        isDisabled={project.fk_project_value?.status=='Closed'}
                        handleClick={() => navigate(AppRoutes.CALENDER + "?id=" + project.fk_project_value?.id)}
                    />
                </div>
            </div>

            {/* Agenda Dialog */}
            {isAgendaOpen &&
                <AgendaDescription
                    handleClose={closeAgenda}
                    isOpen={isAgendaOpen}
                    fk_agenda={project.fk_agenda}
                    agenda_responses={project.agenda_responses}
                    setBackdrop={fullPageLoading}
                    pe_id={project.id}
                    handleSubmitClose={async () => {
                        closeAgenda();
                        await refetch();
                    }
                    }
                    isAdminAllowed={isAdmin() ? false : true}
                    isProjectOpen={project?.fk_project_value?.status === "Open"}
                />}
        </>
    )
}

function TitleValueTable({ text, title, text_link }: { text: string, title: string, text_link?: string }) {
    return (
        <div className={style.flex}>
            <p className={style.title}>{title}</p>
            {(text_link && text !== "0") ? <Typography sx={{
                textDecoration: "underline",
                color: "rgb(236, 147, 36)",
                fontWeight: "500"
            }}>
                <Link
                    to={text_link}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    {text}
                </Link>
            </Typography>
                : <p>{text}</p>}
        </div>
    )
}