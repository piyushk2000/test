import { Box, IconButton, MenuItem, Tooltip } from "@mui/material";
import { ExpertTable } from "./expert-table";
import { generateComplainceBtnStyle, showGenerateCompliance } from "../../../atoms/profile-cardV1/helper";
import { handleCopy } from "../../../molecules/expert-profile-sections/profile-section/helper";
import { EnqueueSnackbar } from "notistack";
import { acceptRefuseStatus } from "..";
import { BoxFlex } from '../../../atoms/boxSpaceBtw';
import { ExpertBadge } from '../../../atoms/profile-cardV1/ProfileCardV1';
import dnd from "../../../assets/images/expert/no-call-expert.png";
import timelineGrey from "../../../assets/images/expert/timeline_grey.png";
import diamondIcon from "../../../assets/images/expert/diamond_expert.png";
import { MRT_Row } from "material-react-table";
import { Link } from "react-router-dom";
import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined';
import { settingsConfigTypeOptions } from "../../../utils/settings";
import { useGetParams } from "../../../utils/hooks/useGetParams";


export type ExpertTableActions = {
  markContactedClickHandler: (expert_id: any) => void;
  handleAcceptRefuseDialogOpen: (expert_id: any, status: acceptRefuseStatus) => void;
  refusedReopenDialogOpen: (expert_id: any) => void;
  handleResendComplianceOpen: (expert_id: any) => void;
  handleGenerateComplianceOpen: (expert_id: any) => void;
  handleOpenAddExpert: (expert_id: any, name: any) => void;
}

export function ExpertNameCell({ row, apiData, openTimeline, handleOpenProfileLink }: { row: MRT_Row<ExpertTable>, apiData: any, openTimeline(id: number): void, handleOpenProfileLink(id: number): Promise<void> }) {

  const page = useGetParams("page");
  
  return (
    <BoxFlex sx={{ gap: "0.5rem" }}>
      <p>
        <Link
          to={`/layout/expert-profile?id=${row.original.id}&page=${page || "1"}`}
          className="name-heading"
          target="_blank"
          rel="noopener noreferrer"
        >
          {row.original.name}
        </Link>
      </p>
      {row.original.badge &&
        <ExpertBadge
          badge={row.original.badge}
          img_style={{
            width: "16px",
            height: "16px",
            backgroundColor: "inherit",
            borderRadius: "50%"
          }}
        />
      }
      {row.original.dnd_enabled && (
        <Tooltip title="DND on" arrow>
          <img
            src={dnd}
            width="16px"
            height="16px"
            alt="Private Profile Icon"
          />
        </Tooltip>
      )}
      {row.original.premium_expert && (
        <Tooltip title="Premium Expert" arrow>
          <img
            style={{
              borderRadius: "50%",
              width: "16px",
              height: "16px",
            }}
            src={diamondIcon}
            alt="Premium Expert Icon"
          />
        </Tooltip>
      )}
      <Tooltip title="Timeline" arrow>
        <IconButton
          onClick={() => openTimeline(row.original.id)}
          sx={{
            width: "29px",
            height: "29px",
            padding: "7px",
          }}
        >
          <img
            alt="Timeline"
            src={timelineGrey} />
        </IconButton>
      </Tooltip>
      {row.original.status === "Confirmed" &&
        <Tooltip title="Copy Profile Link" arrow>
          <IconButton
            onClick={async () => await handleOpenProfileLink(row.original.id)}
            sx={{
              width: "29px",
              height: "29px",
              padding: "7px",
            }}
          >
            <ContentCopyOutlinedIcon sx={{ color: "#60606090", width: "15px", height: "15px" }} />
          </IconButton>
        </Tooltip>
      }
    </BoxFlex>
  )
} 

const columnsInitialState = {
  "id": true,
  "name": true,
  "status": true,
  "primary_email": true,
  "primary_mobile": true,
  "headline": true,
  "type": true,
  "current_company_name": true,
  "current_company_designation": true,
  "current_company_date": true,
  "relevant-company": true,
  "call_count": true,
  "project_count_data": true,
  "base_location": true,
  "expert_geographies_value": true,
  "honorarium": true,
  "domains": true,
  "functions": true,
  "project_id_name": true,
  "updated_or_approved_by": true,
  "updated_or_approved_on": true,
  "added_on": true,
  "actions": true
}

const columnsOrderInitialState = [
  "id",
  "name",
  "status",
  "primary_email",
  "primary_mobile",
  "headline",
  "type",
  "current_company_name",
  "current_company_designation",
  "current_company_date",
  "relevant-company",
  "call_count",
  "project_count_data",
  "base_location",
  "expert_geographies_value",
  "honorarium",
  "domains",
  "functions",
  "project_id_name",
  "updated_or_approved_by",
  "updated_or_approved_on",
  "added_on",
  "actions"
]

const columnPinningInitialState = { left: ['mrt-row-expand', 'mrt-row-select'], right: [] }

const CEMappingInitialState = {
  "id": true,
  "name": true,
  "status": true,
  "primary_email": false,
  "primary_mobile": false,
  "headline": false,
  "type": false,
  "current_company_name": true,
  "current_company_designation": true,
  "current_company_date": true,
  "relevant-company": true,
  "call_count": false,
  "project_count_data": false,
  "base_location": true,
  "expert_geographies_value": false,
  "honorarium": false,
  "domains": false,
  "functions": false,
  "project_id_name": false,
  "updated_or_approved_by": true,
  "updated_or_approved_on": true,
  "added_on": true,
  "actions": true
}

const CEMappingColumnOrder = [
  "id",
  "name",
  "status",
  "current_company_name",
  "current_company_designation",
  "current_company_date",
  "relevant-company",
  "base_location",
  "updated_or_approved_by",
  "updated_or_approved_on",
  "added_on",
  "actions"
]



export const getExpertTableInitialColumns = (is_ce_mapping: boolean) => {

  if(is_ce_mapping) {
      return {
      columnVisibility: CEMappingInitialState,
      columnOrder: CEMappingColumnOrder,
      columnPinning: columnPinningInitialState
    };
  }

  let local_columns = localStorage.getItem('expert_table_columns');

  if(local_columns && local_columns !== 'undefined') {
    return JSON.parse(local_columns)
  } else {

    let user_settings = localStorage.getItem("user_settings");

    if(user_settings) {
      let settings: Array<any> = JSON.parse(user_settings);
  
      let expert_table_columns = settings.find(s => s.config_type === settingsConfigTypeOptions.ExpertsTabDefaultColumns);
      if(expert_table_columns) {
        return expert_table_columns.config_value;
      }
    }

    return {
      columnVisibility: columnsInitialState,
      columnOrder: columnsOrderInitialState,
      columnPinning: columnPinningInitialState
    };
  }
}