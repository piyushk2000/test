import { Box, Grid, Typography, Button } from "@mui/material";
import "./moderate-select-profile.scss";

const ModerateSelectProfile = (props: any) => {
  const { handleShowProfile, handleHideProfile, showProfile } = props;
  return (
    <>
      <Box className="moderate-select-profile-container">
        <Grid container>
          <Grid item xs={4.5}>
            <Typography className="select-profile-text">
              Select Profile 1
            </Typography>
          </Grid>
          <Grid item xs={4.5}>
            <Typography className="select-profile-text">
              Select Profile 2
            </Typography>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={4.5}>
            <Typography className="select-dropdown">Dropdown 1</Typography>
          </Grid>
          <Grid item xs={4.5}>
            <Typography className="select-dropdown">Dropdown 2</Typography>
          </Grid>
          <Grid item xs={2}>
            <Button className="select-dedup-btn" onClick={handleShowProfile}>
              DeDup
            </Button>
          </Grid>
          {showProfile && (
            <Grid item xs={1}>
              <Button className="select-clear-btn" onClick={handleHideProfile}>
                Clear
              </Button>
            </Grid>
          )}
        </Grid>
      </Box>
    </>
  );
};
export default ModerateSelectProfile;
