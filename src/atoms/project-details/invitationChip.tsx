import { Box, Tooltip } from "@mui/material";
import React from "react";

type Props = {
  title: React.ReactNode;
};

const InvitationChip = ({ title }: Props) => {
  return (
    <Tooltip title={title} arrow>
      <Box
        sx={{
          backgroundColor:
            title === "Invited"
              ? "grey"
              : title === "Declined"
                ? "red"
                : "#16A848",
          width: "17px",
          height: "17px",
          borderRadius: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",

          "& p": {
            fontSize: "10px",
            fontWeight: "700",
            color: "white",
          },
        }}
      >
        <p>In</p>
      </Box>
    </Tooltip>
  );
};

export default InvitationChip;
