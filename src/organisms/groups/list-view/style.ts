export const tableBox = { width: "100%", mt: "30px" };

export const paperStyle = {
  width: "100%",
  mb: 2,
  borderRadius: "1rem",
  boxShadow: "none",
};

export const tableStyle = { minWidth: 100 };

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

export const statusChipStyle = {
  backgroundColor: "#EDEBEE",
  color: "#6B5773",
};

export const actionChipStyle = (chip: string) => {
  let bg = "blue";
  const color = "#FFFFFF";

  switch (chip) {
    case "Log Call": {
      bg = "#EC9324";
      break;
    }
    case "Share Profile": {
      bg = "#9F8C8A";
      break;
    }

    case "Invite": {
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

    case "Schedule Call": {
      bg = "#6371BF";
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
    cursor: "pointer",
    zIndex: "100",
    "&:hover, &:focus": {
      backgroundColor: bg,
    },
  };
};
