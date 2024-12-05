export const lineBreakStyle = {
  backgroundColor: "#70707040",
  height: {
    xs: "1px",
    sm: "100%",
  },
  width: {
    xs: "600px",
    sm: "1px",
  },
};

export const snippetsStyle = {
  marginTop: "1rem",
  overflow: "auto",
  maxHeight: {
    xs: "500px",
    sm: "90vh"
  },

  "& .snippet": {
    width: "100%",
    "& .snippet-heading": {
      fontSize: "14px",
      fontWeight: "600",
    },

    "& .snippet-para": {
      fontSize: "12px",
    },
    "& .hr": {
      margin: "1rem 0",
      height: "1px",
      backgroundColor: "#70707040",
    },
  },
};

export const ProfileSectionStyle = {
  display: "flex",
  width: "100%",
  marginTop: "1rem",
  gap: "0.5rem",
};

export const avatarStyle = {
  width: "50px",
  height: "50px",
};

export const profileDetailsStyle = {
  display: "flex",
  flexDirection: "column",
  height: "100%",

  "& h2": {
    fontSize: "16px",
    fontWeight: "600",
  },

  "& p": {
    fontSize: "13px",
    fontWeight: "500",
  },

  "& small": {
    fontSize: "12px",
    fontWeight: "500",
  },
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
