export const accordianHeading = {
  width: {
    xs: "100%",
    sm: "33%",
  },

  flexShrink: " 0",
  color: "#252b3b",
  fontWeight: "500",
};

export const disabledBox = {
  padding: "1.2rem 1rem",
  paddingBottom: "1.25rem",
};

export const sectionStyles = (isExpanded: boolean) => ({
  boxShadow: "5px 5px 10px #252b3b12",
  borderRadius: "15px ",
  marginBottom: "0.75rem",
  border: 0,
  "&::before": {
    display: "none",
  },
  zIndex: isExpanded ? 100 : 1,
});

export const editExpertContainer = {
  margin: "0 0.5em",
  color: "#252b3b",
  padding: "10px",
  paddingTop: "16px",
};

export const commonInputStyles: any = {
  className: "backgroundWhite-description",
  size: "small",
  variant: "outlined",
  fullWidth: true,
};

export const dateClearBtnStyles = (isMobile?: boolean) => ({
  position: "absolute",
  right: "35px",
  padding: "5px",
  top: isMobile ? "13px" : "22px",
});

export const dateClearBtnExpStyles = {
  position: "absolute",
  right: "35px",
  padding: "5px",
  top: "28px",
};

export const inputRowStyles = {
  padding: {
    xs: "8px 5px",
    sm: "12px 5px",
  },
};

export const ratingStyles = {
  display: "flex",
  alignItems: "center",
  gap: "1rem",
  justifyContent: "flex-start",
};

export const switchStyles = {
  color: "#3C3F48",
  flexDirection: "row-reverse",
  marginLeft: "0rem",
  "& span": {
    fontWeight: "500",
  },

  "& span:firstChild": {
    justifySelf: "flex-end",
  },
};

export const lineStyle = {
  width: "100 %",
  height: "1px",
  backgroundColor: "#70707030",
};

export const actionRowStyles = {
  display: "flex",
  justifyContent: "flex-end",
  padding: "5px 5px 0",
  gap: "16px",
};

export const warningBackgroundStyle = {
  position: "absolute",
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  backgroundColor: "black",
  opacity: 0.2,
  zIndex: 99,
};

export const pricePerHourStyle = {
  display: "flex",
  alignItems: "center",
};

export const multipleFieldContainerStyle = {
  backgroundColor: "#F5F4F4",
  padding: "2rem",
  margin: "0 0.5rem",
  marginBottom: "1rem",
  borderRadius: "8px",
};

export const addBtnStyle = {
  color: "#EC9324",
  fontWeight: "500",
  marginLeft: "0.5rem",
  textTransform: "capitalize",
};
