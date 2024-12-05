import Skeleton from "@mui/material/Skeleton";

export function TextSkeleton() {
  return (
    <Skeleton
      variant="text"
      width="60%"
      height="25px"
      sx={{
        borderRadius: "15px",
      }}
    />
  );
}
