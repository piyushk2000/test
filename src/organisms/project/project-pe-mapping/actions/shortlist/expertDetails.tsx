import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { shortlistExpertTypes } from "../../type";

type Props = {
  expertDetails: shortlistExpertTypes;
};

const ExpertDetails = ({ expertDetails }: Props) => {
  return (
    <Grid container spacing={1} mt={"0.5rem"}>
      <Grid item xs={2.5}>
        <Typography sx={{ fontSize: "14px", fontWeight: "500" }}>
          Expert Name:
        </Typography>
      </Grid>
      <Grid item xs={9}>
        <Typography sx={{ fontSize: "14px" }}>{expertDetails?.name}</Typography>
      </Grid>
      <Grid item xs={2.5}>
        <Typography sx={{ fontSize: "14px", fontWeight: "500" }}>
          Relevant Company:
        </Typography>
      </Grid>
      <Grid item xs={9}>
        <Typography sx={{ fontSize: "14px" }}>
          {expertDetails?.company}
        </Typography>
      </Grid>
      <Grid item xs={2.5}>
        <Typography sx={{ fontSize: "14px", fontWeight: "500" }}>
          Relevant Designation:
        </Typography>
      </Grid>
      <Grid item xs={9}>
        <Typography sx={{ fontSize: "14px" }}>
          {expertDetails?.designation}
        </Typography>
      </Grid>
      <Grid item xs={12} mt={"9px"}>
        <Divider />
      </Grid>
    </Grid>
  );
};

export default ExpertDetails;
