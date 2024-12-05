import { EnqueueSnackbar } from "notistack"
import { ExpertTable } from "./expert-table"
import { ExpertTableActions } from "./helper"
import { generateComplainceBtnStyle, showGenerateCompliance } from "../../../atoms/profile-cardV1/helper";
import CustomBtnFilled from "../../../atoms/form-molecules/CustomBtnFilled";
import { Box, IconButton, Tooltip } from "@mui/material";
import { handleCopy } from "../../../molecules/expert-profile-sections/profile-section/helper";
import { BoxFlex } from "../../../atoms/boxSpaceBtw";
import TooltipIcons from "../../../atoms/project-card-footer-icons";
import Add from "../../../assets/images/expert/addon.png";
import EditIcon from "../../../assets/images/expert/edit.png";
import { isSuperAdmin } from "../../../utils/role";


type Props = {
  row: ExpertTable;
  actions: ExpertTableActions;
  enqueueSnackbar: EnqueueSnackbar;
  editExpertClickHandler: any;
}

export const ExpertActions = ({ row, actions, enqueueSnackbar, editExpertClickHandler }: Props) => {

  const { name, bio, primary_email, primary_mobile, domain_l0, domain_l1, domain_l2, meta, functions, headline, price_per_hour, price_per_hour_currency } = row;
  const validStatuses = ["Identified", "Contacted", "Onboarding"];
  const [showComplainceString, showComplainceBool] = showGenerateCompliance(
    name, bio, primary_mobile, primary_email, domain_l0, domain_l1, domain_l2, meta?.relevant_company, functions, headline, price_per_hour, price_per_hour_currency
  );

  const { status, id } = row;
  const { handleResendComplianceOpen, markContactedClickHandler, handleAcceptRefuseDialogOpen, refusedReopenDialogOpen, handleGenerateComplianceOpen, handleOpenAddExpert } = actions;

  return (
    <BoxFlex sx={{ gap: "0.5rem" }}>
      {(isSuperAdmin() || validStatuses.includes(status)) && (
        <Tooltip title="Edit Expert" arrow>
          <IconButton
            onClick={() => editExpertClickHandler(id)}
            className="info-icon"
          >
            <img alt="Edit icon" src={EditIcon} style={{ height: "15px" }} />
          </IconButton>
        </Tooltip>
      )}
      {status === "Identified" && (
        <CustomBtnFilled
          label="Mark Contacted"
          variant="contained"
          onClick={() => markContactedClickHandler(id)}
        />
      )}
      {status === "Contacted" && (
        <CustomBtnFilled
          label="Accept / Refuse"
          variant="outlined"
          onClick={() => handleAcceptRefuseDialogOpen(id, "contacted")}
        />
      )}

      {status === "Onboarding" &&
        <>
          {showComplainceBool ? (
            <CustomBtnFilled
              label="Generate Compliance"
              variant="contained"
              onClick={() => handleGenerateComplianceOpen(id)}
            />
          ) :
            <Tooltip title={showComplainceString} arrow>
              <Box sx={generateComplainceBtnStyle}>Generate Compliance</Box>
            </Tooltip>
          }
        </>
      }
      {status === "Refused" && (
        <CustomBtnFilled
          label="Reopen"
          variant="outlined"
          onClick={() => refusedReopenDialogOpen(id)}
        />
      )}
      {status === "Compliance Done" && (
        <CustomBtnFilled
          label="Approve / Reject"
          variant="outlined"
          onClick={() => handleAcceptRefuseDialogOpen(id, "compliance")}
        />
      )}
      {status === "Compliance Initiated" && (
        <>
          <CustomBtnFilled
            label="Resend Compliance"
            variant="contained"
            onClick={() => handleResendComplianceOpen(id)}
          />
          <CustomBtnFilled
            label="Copy tutorial link"
            variant="outlined"
            onClick={async () => meta.tutorial_completion_link && await handleCopy(meta.tutorial_completion_link, enqueueSnackbar, "Tutorial Link")}
          />
        </>
      )}

      {status === "Confirmed" &&
        <TooltipIcons
          icon={Add}
          isIcon={true}
          title="Add to Projects"
          handleClick={() => handleOpenAddExpert(id, row.name)}
        />
      }


    </BoxFlex>
  )
}