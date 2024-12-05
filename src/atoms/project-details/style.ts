export const gridItemStyle = {
  maxWidth: "300px",
  width: "100%",
  display: "flex",
  flexDirection: "column",
  gap: "0.5rem",
};

export const titleContainerStyles = (titlecolor: string, color?: string) => ({
  backgroundColor: titlecolor,
  width: "100%",
  borderRadius: "29px",
  textAlign: "center",
  color: color || "#ffffff",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "0 12px",
});

export const titleTypography = {
  fontWeight: "600",
  padding: "7px 20px",
  fontSize: "12px",
  margin: "0 auto",
};

export const componentContainerStyle = (COMPONENTCOLOR: string) => ({
  minHeight: "250px",
  height: "100%",
  width: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  backgroundColor: `${COMPONENTCOLOR}20`,
  borderRadius: "15px",
  padding: "8px 10px",
});

export const arrowIcons = {
  fontSize: "1rem",
  cursor: "pointer",
};
export const arrowIconContainer = {
  width: "1rem",
  height: "1rem",
};
