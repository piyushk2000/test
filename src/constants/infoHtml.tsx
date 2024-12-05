import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import AceBadge from "../assets/images/expert/ace-badge.png";
import proBadge from "../assets/images/expert/crown-badge.png";
import championBadge from "../assets/images/expert/trophy-badge.png";
import diamondIcon from "../assets/images/expert/diamond_expert.png";
import dnd from "../assets/images/expert/no-call-expert.png";

function InfoItem({
  img,
  title,
  description,
}: {
  img: string;
  title: string;
  description: string;
}) {
  return (
    <Box sx={{ display: "flex", gap: 1.5 }}>
      <img
        src={img}
        alt=""
        style={{
          width: "24px",
          height: "24px",
          marginTop: "4px",
          flexShrink: 0,
        }}
      />
      <div>
        <Typography
          component="span"
          sx={{ color: "#EC9324", fontWeight: "bold" }}
        >
          {title}
        </Typography>
        <Typography sx={{ lineHeight: 1.3, color: "#E0DFDA." }}>
          {description}
        </Typography>
      </div>
    </Box>
  );
}

export const infoForAdmin = (
  <>
    <Box sx={{ p: 0.5, display: "flex", flexDirection: "column", gap: 1.5 }}>
      <InfoItem
        img={AceBadge}
        title="Ace"
        description="7+ projects serviced in last 2 years with $10,000+ in revenue"
      />
      <InfoItem
        img={championBadge}
        title="Champion"
        description="7+ projects serviced in last 2 years"
      />
      <InfoItem
        img={proBadge}
        title="Pro"
        description="More than 5 less than 7 projects serviced in last 2 years"
      />
      <InfoItem
        img={diamondIcon}
        title="Premium Expert"
        description="Minimum chargeable is 60 mins"
      />
      <InfoItem img={dnd} title="DND" description="Do not disturb" />
    </Box>
  </>
);

export const infoForClientAndSharedLink = (
  <>
    <Box sx={{ p: 0.5, display: "flex", flexDirection: "column", gap: 1.5 }}>
       <InfoItem
        img={AceBadge}
        title="Ace"
        description="Successfully completed 10+ projects with Infollion Clients"
      />
      <InfoItem
        img={championBadge}
        title="Champion"
        description="Successfully completed 7+ projects with Infollion Clients"
      />
      <InfoItem
        img={proBadge}
        title="Pro"
        description="Successfully completed 5+ projects with Infollion Clients"
      />
      <InfoItem
        img={diamondIcon}
        title="Premium Expert"
        description="Minimum Chargeable is 60 mins"
      />
    </Box>
  </>
);
