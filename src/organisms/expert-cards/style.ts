export const paginationStyles = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "10px 0",
};

export const statusChip = (status: string) => {
  let bg = "rgba(14, 76, 127, 0.1)";
  let color = "#0e4c7f";
  switch (status) {
    case "Identified": {
      bg = "#4FB29C50";
      color = "#16886E";
      break;
    }

    case "Contacted": {
      bg = "#0E4C7F30";
      color = "#0E4C7F";
      break;
    }

    case "Refused": {
      bg = "#AF405230";
      color = "#AF4052";
      break;
    }

    case "Pending Compliance": {
      bg = "#C9864C30";
      color = "#C9864C";
      break;
    }

    case "Onboarding": {
      bg = "#57728530";
      color = "#577285";
      break;
    }

    case "Confirmed": {
      bg = "#6B577330";
      color = "#6B5773";
      break;
    }

    case "Compliance Done": {
      bg = "#228B2230";
      color = "#228B22";
      break;
    }

    case "Pending Approval": {
      color = "#ec9324";
      bg = "#ec932430";
      break;
    }

    default: {
      console.log("No status Match , Going with default values of bg & color");
    }
  }

  return {
    background: bg,
    padding: "3px 16px",
    borderRadius: "38px",
    letterSpacing: "0",
    color,
   
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: "0.5em",
    height: "24px",

    "& p": {
      fontSize: "0.75rem",
      textAlign: "center",
      fontWeight: "500",
    },
  };
};

export const inputRow = {
  padding: "5px",
};

export const submitbtnRow = {
  display: "flex",
  justifyContent: "flex-end",
  gap: "1rem",
};

export const closeBtnStyles = {
  position: "absolute",
  top: "7px",
  right: "25px",
};

export const refuseReopenActionStyles = {
  paddingRight: "10px",
  display: "flex",
  gap: "0.75rem",
  paddingBottom: "0.5rem",
};

export const refuseReopenTitleStyles = { paddingBottom: "0", fontSize: "1rem" };
