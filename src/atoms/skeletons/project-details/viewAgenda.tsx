import { Box, Grid, Skeleton } from "@mui/material";

const ViewAgendaSkeleton = () => {
  return (
    <Grid
      container
      alignItems={"center"}
      padding={"0 20px"}
      overflow={"scroll"}
      gap={"1rem"}
      maxHeight={"300px"}
    >
      <Grid item xs={12}>
        <Skeleton
          variant="rectangular"
          width="100%"
          height="50px"
          sx={{ borderRadius: "10px" }}
        />
      </Grid>
      <Grid item xs={12}>
        <Skeleton
          variant="rectangular"
          width="100%"
          height="50px"
          sx={{ borderRadius: "10px" }}
        />
      </Grid>
      <Grid item xs={12}>
        <Skeleton
          variant="rectangular"
          width="100%"
          height="50px"
          sx={{ borderRadius: "10px" }}
        />
      </Grid>
      <Grid item xs={12}>
        <Skeleton
          variant="rectangular"
          width="100%"
          height="50px"
          sx={{ borderRadius: "10px" }}
        />
      </Grid>
      <Grid item xs={12}>
        <Skeleton
          variant="rectangular"
          width="100%"
          height="50px"
          sx={{ borderRadius: "10px" }}
        />
      </Grid>
      <Grid item xs={12}>
        <Skeleton
          variant="rectangular"
          width="100%"
          height="50px"
          sx={{ borderRadius: "10px" }}
        />
      </Grid>
      <Grid item xs={12}>
        <Skeleton
          variant="rectangular"
          width="100%"
          height="50px"
          sx={{ borderRadius: "10px" }}
        />
      </Grid>
    </Grid>
  );
};

export default ViewAgendaSkeleton;
