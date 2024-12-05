export const chipStyle = (index: number) => {
  let bg = "rgba(14, 76, 127, 0.1)";
  let color = "#0e4c7f";
  index %= 6;
  switch (index) {
    case 0: {
      bg = "#4FB29C50";
      color = "#16886E";
      break;
    }

    case 1: {
      bg = "#0E4C7F30";
      color = "#0E4C7F";
      break;
    }

    case 2: {
      bg = "#C9864C30";
      color = "#C9864C";
      break;
    }

    case 3: {
      bg = "#57728530";
      color = "#577285";
      break;
    }

    case 4: {
      bg = "#6B577330";
      color = "#6B5773";
      break;
    }

    case 5: {
      bg = "#228B2230";
      color = "#228B22";
      break;
    }
    default: {
      console.log("default values are updated");
    }
  }

  return {
    background: bg,
    padding: "3px 10px",
    borderRadius: "38px",
    letterSpacing: "0",
    color,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "24px",

    "& p": {
      fontSize: "0.75rem",
      textAlign: "center",
      fontWeight: "500",
    },
  };
};

export const commonInputStyles: any = {
  className: "backgroundWhite-description",
  size: "small",
  variant: "outlined",
  fullWidth: true,
};

export const inputRow = {
  padding: "5px",
};

export const submitbtnRow = {
  display: "flex",
  justifyContent: "flex-end",
  gap: "1rem",
};
