import { Box, Typography } from "@mui/material";
import "./moderate-nav.scss";

const ModerateNavBar = () => {
  return (
    <>
      <Box className="moderate-nav-container">
        <Typography className="moderate-nav-text" >All</Typography>
        <Typography className="moderate-nav-text" >New Self Registeration</Typography>
        <Typography className="moderate-nav-text" >Pending Edit</Typography>
        <Typography className="moderate-nav-text" >Pending Compliance</Typography>
        <Typography className="moderate-nav-text active-text" >DeDup</Typography>
      </Box>
    </>
  );
};
export default ModerateNavBar;
