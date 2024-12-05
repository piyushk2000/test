import { Box, Tooltip, Typography } from "@mui/material";
import { expertPrimaryTabStyle, primaryTabPStyle } from "./style";
import { paraStyles } from "../../molecules/expert-profile-sections/personal-info-section/styles";

interface PrimaryTab {
  label: string;
  className?: string;
  handlClick?: any;
  isEmail: boolean;
}

const ExpertPrimaryTab = (props: PrimaryTab) => {
  return (
    <Box
      onClick={() => {
        props.handlClick && props.handlClick();
      }}
      sx={
        props.isEmail
          ? { ...expertPrimaryTabStyle, cursor: "pointer" }
          : expertPrimaryTabStyle
      }
    >
      <Typography
        sx={paraStyles}
        component="p"
      >
        {props.label}
      </Typography>
      <Tooltip title="Primary" arrow>
        <Typography component="p" sx={primaryTabPStyle}>
          P
        </Typography>
      </Tooltip>
    </Box>

  );
};

export default ExpertPrimaryTab;
