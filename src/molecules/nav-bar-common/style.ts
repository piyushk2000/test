

export const wrapperStyle = (isSelectClicked: boolean, isMobile: boolean) => ({
  marginTop: isMobile ? "0.5rem" : "1.5rem", 
  marginBottom: "1.5rem",
  borderBottom: "1px solid rgba(112, 112, 112, 0.21)",
  pb: isSelectClicked ? "7px" : "0",
});

export const filterSelectOuterBoxStyle = {
  display: "flex",
  alignItems: "center",
  overflow: "hidden",
};

export const mobileNavItemsBoxStyle = {
  display: "flex",
  alignItems: "center",
  flexWrap: "wrap",
  gap: "0.3rem",
  mb: "0.2rem",
  borderLeft: "1px solid rgba(112, 112, 112, 0.21)",
  paddingLeft: "5px",
  marginLeft: "2px",
  scrollbarColor: "transparent transparent !important",
};

export const insideWrapperStyle = {
  display: "flex",
  alignItems: "center",
  gap: "0.3rem",
  flexWrap: "wrap",
};

export const selectWrapperStyle = {
  display: "flex",
  alignItems: "flex-end",
  flexWrap: "wrap",
  justifyContent: "center",
  flexDirection: "row",
  marginLeft: "0",
};

export const clearAllFilterStyle = {
  textTransform: "capitalize",
  whiteSpace: "nowrap",
  color: "var(--green-color)",
  marginRight: "0.3rem",
  fontSize: "0.75rem",
};

export const selectedStyle = (isMobile: boolean) => ({
  fontSize: "0.75rem",
  color: "#252B3B",
  fontWeight: "400",
  marginRight: isMobile ? "10px" : "16px",
  whiteSpace: "nowrap",
  marginLeft: "10px",
  alignSelf: "center",
});

export const selectBtnStyles = {
  textTransform: "capitalize",
  color: "#252B3B",
  fontWeight: "400",
  fontSize: "0.75rem",
  zIndex: "1001",
};

export const selectedButtonStyle = (isTutorial: boolean) => ({
  border: "none",
  fontSize: "0.75rem",
  borderRadius: "15px",
  textTransform: "capitalize",
  padding: "5px 15px",
  boxShadow: "none",
  fontFamily: "inherit",
  background: "#F7DFC3",
  color: "#252B3B",
  zIndex: "1001",
  transform: isTutorial ? "scale(0.5)" : "scale(1)"
});

export const selectedBtnWrapper = {
  zIndex: "1001",
  position: "relative",
  backgroundColor: "white",
  transform: "scale(2)",
  borderRadius: "2px",

  "&::after": {
    content: "'Perform this action for the selected cards'",
    position: "absolute",
    marginLeft: "1em",
    padding: "0.5rem",
    width: "150px",
    backgroundColor: "var(--green-color)",
    color: "white",
    fontSize: "0.5rem",
    borderRadius: "2px",
    fontWeight: "500",
    left: "20%",
    top: "120%"
  },

  // Create the triangle
  "&::before": {
    content: "''",
    position: "absolute",
    left: "50%",
    transform: "translateX(-50%) scale(0.5)",
    borderLeft: "10px solid transparent",
    borderRight: "10px solid transparent",
    borderBottom: "10px solid var(--green-color)",
    top: "100%",
  }
}

export const selectedOverlayStyle = {
  position: "fixed",
  zIndex: "1000",
  top: "0",
  bottom: "0",
  right: "0",
  left: "0",
  content: "' '",
  backgroundColor: "black",
  opacity: "0.1",
}
