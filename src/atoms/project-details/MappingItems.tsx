import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { peMappingItems } from "../../pages/Projects/types";
import { Link, useLocation } from "react-router-dom";
import { AppRoutes } from "../../constants";
import InvitationChip from "./invitationChip";
import AgendaStatusChip from "./agendaStatusChip";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { useProjectDetailsContext } from "./projectContext";
import EditIcon from '@mui/icons-material/Edit';
import { handleRescheduleOpen } from "../../organisms/project-detail/helper";
import Tooltip from "@mui/material/Tooltip";
import { isClient } from "../../utils/role";
import PEStatusChip from "./agendaStatusChip";
import { Meta } from "../../organisms/expert-cards/types";
import { PrioritizeExpert } from "../prioritize-expert";
import CustomPopover from "./customPopover";

type Props = {
  name: string;
  textColor: string;
  noBorder: boolean;
  expert_id: number;
  isPeMapping?: boolean;
  expert_invitation?: peMappingItems["expert_invitation"];
  agenda_shared?: boolean;
  is_agenda_respond?: boolean;
  isScheduled?: boolean;
  status?: string;
  client_priority?: Meta["client_priority"];
  relevant_division?: string | null;
  relevant_designation?: string | null;
  relevant_company?: string | null;
};

const MappingItems = (props: Props) => {

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const project_id = queryParams.get("id");
  const { setModalOpen, defaultValues } = useProjectDetailsContext();

  const project_status = defaultValues?.projectDetails?.status || "";

  const {
    name: NAME,
    textColor: COLOR,
    isPeMapping: IsPEMapping = false,
    expert_invitation,
    expert_id,
    agenda_shared,
    is_agenda_respond,
    isScheduled,
    status,
    client_priority,
    relevant_division,
    relevant_designation,
    relevant_company,
  } = props;

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: 'space-between',
        gap: "0.5rem",
        width: "100%",
        borderBottom: !props.noBorder ? "1px dashed " + COLOR : undefined,
        padding: "10px 0",
      }}
    >
      <Typography
        sx={{
          color: COLOR,
          fontWeight: "600",
          fontSize: "14px",
          "&:hover, &:focus": {
            textDecoration: "underline",
          },
          cursor: "pointer",
          maxWidth: "calc(100% - 85px)",
        }}
      >
        <Link
          to={AppRoutes.EXPERT_PROFILE + "?id=" + expert_id + "&page=1"}
          target="_blank"
        >
          {NAME}
        </Link>
      </Typography>
      <Box>
        <Stack direction={"row"} alignItems={"center"} gap="0.2rem">
          {(IsPEMapping && !isClient()) && (
            <>
              {expert_invitation && (
                <InvitationChip title={expert_invitation} />
              )}
              {agenda_shared && (
                <AgendaStatusChip
                  toolTipTitle={
                    is_agenda_respond ? "Agenda Completed" : "Agenda Shared"
                  }
                  text="A"
                  completed={Boolean(is_agenda_respond)}
                />
              )}
              <Box>
                <Link
                  to={
                    AppRoutes.PROJECT_PE_MAPPING +
                    "?project_id=" +
                    project_id +
                    "&expert_id=" +
                    expert_id +
                    "&status=" +
                    project_status
                  }
                  target="_blank"
                  style={{ padding: "0" }}
                >
                  <OpenInNewIcon
                    sx={{
                      color: COLOR,
                      width: "17px",
                      justifyContent: "flex-end",
                      cursor: "pointer",
                      mt: "7px",
                    }}
                  />
                </Link>
              </Box>
              {isScheduled &&
                <Tooltip title="Reschedule or Cancel Call" arrow>
                  <EditIcon
                    sx={{
                      width: "17px",
                      color: COLOR,
                      cursor: "pointer",
                      justifyContent: "flex-end"
                    }}
                    onClick={() => {
                      setModalOpen && handleRescheduleOpen(setModalOpen, expert_id)
                    }}
                  />
                </Tooltip>
              }

            </>
          )}

          {/* CE Mapping */}
          {status &&
            <PEStatusChip
              toolTipTitle={
                status
              }
              text={status === "Compliance Done" ? "CD" : "CI"}
              completed={true}
            />
          }

          {client_priority &&
            <PrioritizeExpert
              isPriority={!!client_priority.prioritize_expert}
            />
          }
          <CustomPopover
            expert_id={expert_id}
            relevant_division={relevant_division}
            relevant_designation={relevant_designation}
            relevant_company={relevant_company}
          />
        </Stack>
      </Box>
    </Box>
  );
};

export default MappingItems;