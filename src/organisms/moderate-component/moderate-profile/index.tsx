import { Box, Grid, Typography, Button } from "@mui/material";
import "./moderate-profile.scss";
import ModerateProfileEducation from "../moderate-profile-education";
import ModerateWorkHistory from "../moderate-work-history";
import ModerateEducationBio from "../moderate-education-bio";
import ModerateWebHandle from "../moderate-web-handle";
import ModerateAward from "../moderate-award";
import ModerateProject from "../moderate-project";
import ModerateProjectCalls from "../moderate-project-call";

const ModerateProfile = () => {
  return (
    <>
      <Box className="moderate-profile-container">
        <Grid container>
          <Grid xs={6} className="select-profile-header-name">
            <Typography className="select-profile-name">Mir Azhar</Typography>
            <Typography className="select-profile-id">(MA6337)</Typography>
          </Grid>
          <Grid item xs={6} className="select-profile-header-name">
            <Typography className="select-profile-name">Mir Azhar</Typography>
            <Typography className="select-profile-id">(SR6457)</Typography>
          </Grid>
        </Grid>
        <ModerateProfileEducation />
        <ModerateWorkHistory />
        <ModerateEducationBio />
        <ModerateWebHandle />
        <ModerateAward />
        <ModerateProject />
        <ModerateProjectCalls />
        <Grid className="select-profile-btn">
          <Button className="profile-cancel-btn">Cancel</Button>
          <Button className="profile-update-btn">Update</Button>
        </Grid>
      </Box>
    </>
  );
};
export default ModerateProfile;
