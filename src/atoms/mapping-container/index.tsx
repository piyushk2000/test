import { Box, Grid, Typography } from "@mui/material";
import {
  arrowIcons,
  componentContainerStyle,
  gridItemStyle,
  titleContainerStyles,
  titleTypography,
  arrowIconContainer,
} from "./style";

import { useStep } from "usehooks-ts";
import { calculateSteps, getEndPoint, getStartPoint } from "./helper";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

type Props<T = any> = {
  titleColor: string;
  componentColor: string;
  title: string;
  items: T[];
  titleItemColor?: string;
  isPeMapping?: boolean;
  renderItem: (item: T, index: number) => JSX.Element;
  maxItem?: number;
  sx?: any;
};

function MappingContainer<T>(props: Props<T>) {
  const MAX_ITEM = props.maxItem || 6;
  const [currentStep, helpers] = useStep(calculateSteps(props.items.length, MAX_ITEM));

  const { canGoToPrevStep, canGoToNextStep, goToNextStep, goToPrevStep } =
    helpers;

  const sx = props.sx || {}

  return (
    <>
      <Grid item xs={12} sm={6} md={4} lg={2.4} xl={2.4} sx={{ ...gridItemStyle, ...sx }}>
        <Box sx={titleContainerStyles(props.titleColor, props.titleItemColor)}>
          <Box sx={arrowIconContainer}>
            {canGoToPrevStep ? (
              <ArrowBackIcon onClick={goToPrevStep} sx={arrowIcons} />
            ) : null}
          </Box>
          <Typography sx={titleTypography}>{props.title}</Typography>
          <Box sx={arrowIconContainer}>
            {canGoToNextStep ? (
              <ArrowForwardIcon onClick={goToNextStep} sx={arrowIcons} />
            ) : null}
          </Box>
        </Box>
        <Box sx={componentContainerStyle(props.componentColor)}>
          {props.items
            .slice(getStartPoint(currentStep, MAX_ITEM), getEndPoint(currentStep, MAX_ITEM))
            .map(props.renderItem)}
        </Box>
      </Grid>
    </>
  );
};

export default MappingContainer;
