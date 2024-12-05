import { Box, Grid, Tooltip, Typography } from "@mui/material";
import {
  arrowIcons,
  componentContainerStyle,
  gridItemStyle,
  titleContainerStyles,
  titleTypography,
  arrowIconContainer,
} from "./style";
import MappingItems from "./MappingItems";
import { useStep } from "usehooks-ts";
import { calculateSteps, getEndPoint, getStartPoint } from "./helper";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Item } from "../../organisms/project-detail/mapping/helper";
import { useEffect } from "react";
import { CustomChip } from "../chips/CustomChip";
import InvitationChip from "./invitationChip";
import PEStatusChip from "./agendaStatusChip";
import { BoxFlex } from "../boxSpaceBtw";

type Props = {
  titleColor: string;
  componentColor: string;
  title: string;
  items: Item[];
  titleItemColor?: string;
  isPeMapping?: boolean;
  isScheduled?: boolean;
  expert_invitation_count?: number;
};

const MappingContainer = (props: Props) => {
  const [currentStep, helpers] = useStep(calculateSteps(props.items.length));

  const { canGoToPrevStep, canGoToNextStep, goToNextStep, goToPrevStep } =
    helpers;

  useEffect(() => {
    helpers.reset();
  }, [props.items.length])

  return (
    <>
      <Grid item lg={2.4} sx={gridItemStyle}>
        <Box sx={titleContainerStyles(props.titleColor, props.titleItemColor)}>
          <Box sx={arrowIconContainer}>
            {canGoToPrevStep ? (
              <ArrowBackIcon onClick={goToPrevStep} sx={arrowIcons} />
            ) : null}
          </Box>
          <Typography sx={titleTypography}>
            <BoxFlex sx={{ gap: "0.5rem" }}>
              <span>
                {props.title} {props.items.length > 0 ? `(${props.items.length})` : ""}
              </span>
            </BoxFlex>
          </Typography>
          <Box sx={arrowIconContainer}>
            {canGoToNextStep ? (
              <ArrowForwardIcon onClick={goToNextStep} sx={arrowIcons} />
            ) : null}
          </Box>
        </Box>
        <Box sx={componentContainerStyle(props.componentColor)}>
          {props.items
            .slice(getStartPoint(currentStep), getEndPoint(currentStep))
            .map((item, index) => (
              <MappingItems
                key={index + item.name}
                textColor={props.componentColor}
                name={getStartPoint(currentStep) + index + 1 + ". " + item.name}
                noBorder={index === 5}
                isPeMapping={props.isPeMapping}
                expert_invitation={item.expert_invitation}
                expert_id={item.id}
                agenda_shared={item.agenda_shared}
                is_agenda_respond={item.is_agenda_respond}
                isScheduled={props.isScheduled}
                status={item.status}
                client_priority={item.client_priority}
                relevant_division = {item.relevant_division}
                relevant_designation= {item.relevant_designation}
                relevant_company= {item.relevant_company}
              />
            ))}
        </Box>
      </Grid>
    </>
  );
};

export default MappingContainer;
