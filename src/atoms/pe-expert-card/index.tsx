import style from "./style.module.scss"
import { Data } from '../../organisms/project/project-pe-mapping/list-view/types'
import { Link } from "react-router-dom"
import { AppRoutes } from "../../constants"
import Box from "@mui/material/Box"
import Chip from "@mui/material/Chip"
import { actionChipStyle, rowActionStyles, statusChipStyle } from "../../organisms/project/project-pe-mapping/list-view/style"
import DetailsWithIcon from "../details-with-icon/DetailsWithIcon"
import IdBadge from "../../assets/images/id-badge.png";
import { openActions } from "../../organisms/project/project-pe-mapping/list-view/helper"
import { getCCTitle, usePeMappingContext } from "../../organisms/project/project-pe-mapping/helper"
import { useProjectPageContext } from "../../pages/Projects/helper"
import { setDialogTypes } from "../../pages/Projects/types"
import InvitationChip from "../project-details/invitationChip"
import PEStatusChip from "../project-details/agendaStatusChip"
import { useSnackbar } from "notistack"
import Tooltip from "@mui/material/Tooltip"
import Checkbox from "@mui/material/Checkbox"
import { selectedContainerStyle } from "../profile-cardV1/helper"
import { ExpertBadge } from "../profile-cardV1/ProfileCardV1"
import { BoxFlex } from "../boxSpaceBtw"


type Props = {
    row: Data;
    project_id: string;
    isSelectAllowed: boolean;
    selected: boolean;
    toggleSelected(): void;
}

const PEExpertCard = ({ row, project_id, isSelectAllowed, selected, toggleSelected }: Props) => {
    const { expert_id, expert_invitation, is_agenda_respond, name, curr_company, curr_designation, curr_company_division, status, Action, agenda_shared, is_complaince_shared, csc_marked_completed_on, csc_marked_completed_by_name, badge } = row;
    const { setPeDialog, refetch } = usePeMappingContext();
    const { setDialog }: { setDialog: setDialogTypes } = useProjectPageContext();
    const { enqueueSnackbar } = useSnackbar();

    return (
        <div className={`${style.card} ${isSelectAllowed && selected ? style.checked : ""}`}>
            <div className={style.flex}>
                <div className={style.flex} style={{ gap: "0.5rem", marginRight: "0.5rem", flex: "1", justifyContent: "flex-start" }}>
                    <h3 className={style.heading} style={{ maxWidth: "80%" }}>
                        <Link to={AppRoutes.EXPERT_PROFILE + "?id=" + expert_id + "&page=1"} rel="noopener noreferrer" target="_blank">
                            {name}
                        </Link>
                    </h3>

                    {badge && (
                        <ExpertBadge img_style={{ width: "18px", borderRadius: "100%", cursor: "pointer" }} badge={badge} />
                    )}

                    {expert_invitation && (
                        <InvitationChip title={expert_invitation} />
                    )}
                    {agenda_shared && (
                        <PEStatusChip
                            toolTipTitle={
                                is_agenda_respond
                                    ? "Agenda Completed"
                                    : "Agenda Shared"
                            }
                            text="A"
                            completed={is_agenda_respond}
                        />
                    )}
                    {row.compliance_shared &&
                        <PEStatusChip
                            toolTipTitle={
                                row.pe_compliance?.status === "Auto-Approved" ?
                                    "Compliance Auto Approved" :
                                    row.answers?.length ?
                                        "Compliance Answered" :
                                        "Compliance not answered by Expert"
                            }
                            text="CE"
                            completed={row.pe_compliance?.status === "Auto-Approved"}
                            pending={!!row.answers?.length}
                            handleClick={async () => {
                                if (row.answers?.length) {
                                    // Open the Answers Dialog
                                    await openActions(
                                        'Show Answers only',
                                        setPeDialog,
                                        setDialog,
                                        project_id,
                                        row,
                                        refetch,
                                        enqueueSnackbar,
                                        false,
                                        row.answers
                                    );
                                } else {
                                    if (row.pe_compliance) {
                                        await openActions(
                                            'Show Expert Compliance Questions',
                                            setPeDialog,
                                            setDialog,
                                            project_id,
                                            row,
                                            refetch,
                                            enqueueSnackbar,
                                            false
                                        );
                                    }
                                }
                            }}
                        />
                    }

                    {row.pe_compliance?.shared_with_client_by &&
                        <PEStatusChip
                            toolTipTitle={
                                getCCTitle(row.pe_compliance)
                            }
                            text="CC"
                            completed={row.pe_compliance.status === "Approved"}
                            pending={(row.pe_compliance.status === "Rejected" || row.pe_compliance.status === "Auto-Rejected")}
                            handleClick={async () => {
                                if (row.pe_compliance?.answers?.length && row.pe_compliance.final_reviewed_by) {
                                    // Open the Answers Dialog
                                    await openActions(
                                        'Show Answers',
                                        setPeDialog,
                                        setDialog,
                                        project_id,
                                        row,
                                        refetch,
                                        enqueueSnackbar,
                                        false,
                                        row.pe_compliance.answers
                                    );
                                } else {
                                    await openActions(
                                        'Review Compliance',
                                        setPeDialog,
                                        setDialog,
                                        project_id,
                                        row,
                                        refetch,
                                        enqueueSnackbar,
                                        false
                                    );
                                }
                            }}
                        />
                    }
                </div>

                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem" }}>
                    <Chip sx={statusChipStyle(status)} label={status} />
                    {isSelectAllowed && (
                        <Checkbox
                            sx={selectedContainerStyle}
                            disableRipple
                            checked={selected}
                            onChange={toggleSelected}
                        />
                    )}
                </div>

            </div>
            <BoxFlex sx={{ gap: "1rem", width: (row.status === "Completed" || row.status === "Scheduled") ? "100%" : "fit-content", justifyContent: "space-between" }}>
                <BoxFlex>
                    <DetailsWithIcon
                        title={"Expert ID"}
                        icon={IdBadge}
                        text={expert_id.toString()}
                    />
                </BoxFlex>
                {(row.status === "Completed" || row.status === "Scheduled") &&
                    <BoxFlex sx={{ gap: "1rem" }}>
                        <DetailsWithIcon
                            tooltipTitle={"Call Scheduled"}
                            icon={null}
                            title={"Scheduled:"}
                            text={(row.calls_scheduled || 0).toString()}
                        />
                        <DetailsWithIcon
                            tooltipTitle={"Call Completed"}
                            icon={null}
                            title={"Completed:"}
                            text={(row.calls_completed || 0).toString()}
                        />
                    </BoxFlex>
                }
            </BoxFlex>
            <div className={style.para}>
                <p>{[curr_designation, curr_company_division].filter(f => !!f).join(" - ")}</p>
                <p>{curr_company}</p>
            </div>


            <Box sx={{ ...rowActionStyles, mt: "7px", flexWrap: "wrap" }}>
                {Action.map((action, index) => (
                    action === "C" ? <Tooltip title="Pending Client Compliance" arrow>
                        <Chip
                            key={action + index}
                            sx={() => actionChipStyle(action)}
                            label={action}
                            onClick={async () => {
                                await openActions(
                                    action,
                                    setPeDialog,
                                    setDialog,
                                    project_id,
                                    row,
                                    refetch,
                                    enqueueSnackbar
                                );
                            }}
                        />
                    </Tooltip> :
                        <Chip
                            key={action + index}
                            sx={() => actionChipStyle(action)}
                            label={action === "Shortlist" ? "Shortlist / Reject" : action}
                            onClick={async () => {
                                await openActions(
                                    action,
                                    setPeDialog,
                                    setDialog,
                                    project_id,
                                    row,
                                    refetch,
                                    enqueueSnackbar
                                );
                            }}
                        />
                ))}
            </Box>
        </div>
    )
}

export default PEExpertCard