import React from "react";
import { SkeletonStyle } from "../../organisms/expert-profile/style";
import Skeleton from "@mui/material/Skeleton";

const ExpertProfileLoading = () => {
  return (
    <>
      <Skeleton
        variant="rectangular"
        width="100%"
        height="150px"
        sx={SkeletonStyle}
      />
      <Skeleton
        variant="rectangular"
        width="100%"
        height="150px"
        sx={SkeletonStyle}
      />
      <Skeleton
        variant="rectangular"
        width="100%"
        height="200px"
        sx={SkeletonStyle}
      />
      <Skeleton
        variant="rectangular"
        width="100%"
        height="100px"
        sx={SkeletonStyle}
      />
      <Skeleton
        variant="rectangular"
        width="100%"
        height="200px"
        sx={SkeletonStyle}
      />
      <Skeleton
        variant="rectangular"
        width="100%"
        height="100px"
        sx={SkeletonStyle}
      />
    </>
  );
};

export default ExpertProfileLoading;
