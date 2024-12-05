export const mainGridStyles = {
  backgroundRepeat: "no-repeat",
  backgroundColor: "#252B3B",
  backgroundPosition: "bottom",
  height: "100vh",
  overflow: "hidden",
  "@media (max-width: 900px)": {
    display: "none",
  },
};

export const leftSidePanelStyles = {
  display: "flex",
  justifyContent: "center",
  // paddingTop: "7em",
  marginTop: "-2rem",
};

export const rightSidePanelStyles = {
  my: 2,
  mx: 16,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  "@media (max-width: 600px)": {
    width: "80vw",
    mx: "auto",
  },
};

export const submitPassStyle = {
  color: "white",
  py: 1.3,
  fontSize: "17px",
  fontWeight: "400",
  mt: 3,
  mb: 2,
  borderRadius: "32px",
  textTransform: "inherit",
};
