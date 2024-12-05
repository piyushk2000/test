import Grid from "@mui/material/Grid";
import Skeleton from "@mui/material/Skeleton";

type Props = {
  height?: string;
}

const CardsLoadingScreen = ({ height }: Props) => {
  return (
    <Grid container mt={"1rem"} spacing={2}>
      {[...Array(6)].map((a: any, index: any) => (
        <Grid item xs={12} md={6} key={index} lg={4}>
          <Skeleton
            sx={{
              backgroundColor: "rgba(0,0,0,0.2)",
              borderRadius: "15px",
            }}
            variant="rounded"
            width={"100%"}
            height={height || "300px"}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default CardsLoadingScreen;
