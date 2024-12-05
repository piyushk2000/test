export const contactCardContainer = {
  backgroundColor: "white",
  borderRadius: "15px",

  "& .small": {
    fontSize: "12px",
    fontWeight: "500",
  },
};

export const contactCardHeader = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "20px 20px 10px",

  "& div": {
    display: "flex",
    alignItems: "center",
    gap: "1rem",
  },

  "& .img": {
    width: "74px",
    height: "74px",
    border: "3px solid #EC9324",
  },
};

export const contactCardContent = {
  padding: "0 20px",
  paddingBottom: "20px",
  display: "flex",
  flexDirection: "column",
  justifyContent: {sm: "space-between"},
  gap: "0.25rem",
  marginBottom: "10px",

  "& .name": {
    fontSize: "1rem",
    fontWeight: "600",
  },

  "& .iconContainer": {
    display: "flex",
    alignItems: "center",
    gap: "1rem",

    "& .icon": {
      width: "15px",
    },

    "& .rotate": {
      transform: "rotate(-45deg)",
    },
  },
};
