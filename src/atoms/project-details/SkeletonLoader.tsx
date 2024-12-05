import Grid from '@mui/material/Grid';
import Skeleton from '@mui/material/Skeleton';
import { SxProps, Theme } from '@mui/system';


const SkeletonLoader = (props: { marginBottom?: string; width?: string; height?: string; style?: SxProps<Theme> }) => {
  return (
    <Skeleton
      sx={{
        backgroundColor: "rgba(0,0,0,0.2)",
        marginBottom: props.marginBottom,
        borderRadius: "15px",
        ...props.style
      }}
      variant="rounded"
      width={props.width}
      height={props.height}
    />
  );
};

export const NavbarSkeletonLoader = () => {
  return (
    <Grid
      item
      xs={12}
      md={12}
      lg={8}
      xl={8}
      display={"flex"}
      gap={"1rem"}
      justifyContent={"flex-end"}
      paddingRight={"1rem"}
      flexWrap={"wrap"}
    >
      <Skeleton variant="circular" height={"40px"} width={"40px"} />
      <Skeleton variant="circular" height={"40px"} width={"40px"} />
      <Skeleton variant="circular" height={"40px"} width={"40px"} />
      <Skeleton variant="circular" height={"40px"} width={"40px"} />
      <Skeleton variant="circular" height={"40px"} width={"40px"} />
      <Skeleton
        variant="rounded"
        sx={{ borderRadius: "20px" }}
        height={"38px"}
        width={"83px"}
      />
    </Grid>
  );
};

export default SkeletonLoader;
