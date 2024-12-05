import Skeleton from "@mui/material/Skeleton";

export function ChipSkeleton() {
  return (
    <Skeleton
      variant="rectangular"
      width=""
      height="25px"
      sx={{
        borderRadius: "15px",
      }}
    />
  );
}
