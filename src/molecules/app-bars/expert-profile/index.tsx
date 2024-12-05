import AppBarCommon from "../../app-bar-common";
import { isExpert, isInfollion } from "../../../utils/role";
import { Box} from "@mui/material";
import React, { useEffect, useState } from "react";


const ExpertProfileHeader = (props: any) => {
  const is_expert = isExpert();


  return (
    <>
      {props?.headerMessage &&
        <Box sx={{
          px: {
            xs: "26px",
          },
          py: {
            xs: "2px",
          },
          backgroundColor: "red",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          textAlign: "center",
          cursor: "pointer"
        }}
          onClick={props.onTermsNConditionsClick}
        >
          {props?.headerMessage && props.headerMessage}
        </Box>
      }
      <Box
        sx={{
          px: {
            xs: "26px",
          },
        }}
      >
        <AppBarCommon
          title={is_expert ? "My Profile" : "Expert Profile"}
          isSearch={false}
          isUserIcon={!isInfollion()}
          isIconDefine={false}
          isSidebar={!isInfollion()} // hiding sidebar hamburger icon if the role = infollion
        />
      </Box>
    </>

  );
};

export default ExpertProfileHeader;
