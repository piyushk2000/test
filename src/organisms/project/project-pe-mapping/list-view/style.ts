export const tableBox = { width: "100%", mt: "30px" };

export const paperStyle = {
  width: "100%",
  mb: 2,
  borderRadius: "1rem",
  boxShadow: "none",
};

export const tableStyle = { minWidth: 750 };

export const tableRowStyles = {
  "&:last-child td, &:last-child th": { border: 0 },
  "& th, & td": {
    fontSize: "0.75rem",
    fontFamily: "inherit",
  },
  cursor: "pointer",
};

export const rowActionStyles = {
  display: "flex",
  alignItems: "center",
  gap: "0.75rem",
  justifyContent: "flex-start",
};

export const tableHeadRow = {
  "& th, & td": {
    fontSize: "0.75rem",
    color: "#626672",
    fontWeight: "500",
    fontFamily: "inherit",
    whiteSpace: "nowrap",
  },
};

const statusChipColorMap: Record<string, string> = {
  Added: "#C9864C",
  Shared: "#0E4C7F",
  Shortlisted: "#6B5773",
  Scheduled: "#577285",
  Completed: "#4FB29C",
};

export const statusChipStyle = (chip: string) => {
  if (statusChipColorMap[chip]) {
    return {
      backgroundColor: statusChipColorMap[chip] + "1F",
      color: statusChipColorMap[chip],
    };
  }
  return {
    backgroundColor: "#EDEBEE",
    color: "#6B5773",
  };
};

export const actionChipStyle = (chip: string) => {
  let bg = "blue";
  let color = "#FFFFFF";
  let fontWeight = "500";
  let fontSize = "11px";
  let border = "none";
  let borderRadius = "15px";
  let spanPadding = "";

  switch (chip) {
    case "Log Call": {
      bg = "#EC9324";
      break;
    }
    case "Share Profile": {
      bg = "skyblue";
      break;
    }
    case "Reshare Profile": {
      bg = "skyblue";
      break;
    }

    case "Invite": {
      bg = "#9F8C8A";
      break;
    }

    case "Share Agenda": {
      bg = "#9F8C8A";
      break;
    }

    case "Shortlist": {
      bg = "#797B3A";
      break;
    }

    case "ReInvite" || "Invite": {
      bg = "#9F8C8A";
      break;
    }

    case "Copy Invitation link": {
      bg = "rgb(236, 147, 36)";
      break;
    }

    case "Share CC": {
      bg = "rgb(236, 147, 36)";
      break;
    }

    case "ReShare CC Responses" : {
      bg = "rgb(236, 147, 36)";
      break;
    }

    case "ReShare CC" : {
      bg = "rgb(236, 147, 36)";
      break; 
    }

    
    case "Share CC Responses": {
      bg = "rgb(236, 147, 36)";
      break;
    }

    case "Schedule Call": {
      bg = "#6371BF";
      break;
    }

    case "Revert Reject": {
      bg = "#797B3A";
      break;
    }

    case "C": {
      bg = "red";
      fontWeight = "700";
      borderRadius = "100%";
      break;
    }

    default: {
      console.log("No Action Match");
      console.log(chip);
    }
  }

  return {
    backgroundColor: bg,
    color,
    border,
    cursor: "pointer",
    zIndex: "100",
    fontSize,
    fontFamily: "inherit",
    fontWeight,
    borderRadius,
    "&:hover, &:focus": {
      backgroundColor: bg,
    },
    "& span": {
      padding: spanPadding || "0 12px",
    },
  };
};
