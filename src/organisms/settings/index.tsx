import { Typography, Divider, Grid } from "@mui/material";
import TimeZoneInput from "./time-zone-input";

export default function Settings() {
  return (
    <Grid container>
      <Grid item xs={6}>
        <div>
          <Typography sx={{ fontWeight: "medium", fontSize: "16px" }}>
            Account
          </Typography>
          <Typography sx={{ fontSize: "12px" }}>
            Update your account settings. Set your preferred timezone.
          </Typography>
        </div>
        <Divider sx={{ my: 2 }} />

        <TimeZoneInput />
      </Grid>
    </Grid>
  );
}
