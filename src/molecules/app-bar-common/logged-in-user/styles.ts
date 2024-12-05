export const userProfileStyle = {
  display: "flex",
  alignItems: "center",
  textAlign: "center",
  fontSize: "12px",
  backgroundColor: "white",
  gap: "0.25rem",
  padding: "1px",
  borderRadius: "18px",
  paddingRight: {
    xs: "1px",
    md: "10px",
  },
  marginLeft: "0.0rem",
  cursor: "pointer",
  width: "fit-content",
  flexShrink: "0",
  "& p": {
    textTransform: "capitalize",
    margin: "0 0.2rem",
  },

  "& .user-icon": {
    backgroundColor: "#F5F4F4",
    padding: "8px",
    borderRadius: "50%",
    width: {
      xs: "30px",
      sm: "34px",
    },
    height: {
      xs: "30px",
      sm: "34px",
    },
  },

  "& .arrow-down": {
    width: "8px",
  },
};
