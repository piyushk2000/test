import { SxProps, Theme } from "@mui/material";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

const NoResultFoundFilters = ({ text, sx , mt, sxItem = {}}: { text?: React.ReactNode, sx?: SxProps<Theme> , mt?: number, sxItem?: SxProps<Theme>}) => {
  return (
    <Grid container spacing={2} sx={sx}>
      <Grid
        item
        xs={12}
        display={"flex"}
        alignItems={"center"}
        justifyContent={"center"}
        mt={mt || 4}
        sx={sxItem}
      >
        <Typography variant="h2" sx={{ fontSize: "20px", fontWeight: "500" }}>
          {text || "No results found. Please relax the filters and retry."}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default NoResultFoundFilters;
