export const tableBox = { width: "100%", mt: "30px" };

export const paperStyle = {
  width: "100%",
  mb: 2,
  borderRadius: "1rem",
  boxShadow: "none",
};

export const tableStyle = { minWidth: 750 };

export const tableHeadRow = {
  "& th, & td": {
    fontSize: "0.75rem",
    color: "#626672",
    fontWeight: "500",
    fontFamily: "inherit",
    whiteSpace: "nowrap",
  },
};

export const tableRowStyles = {
  "&:last-child td, &:last-child th": { border: 0 },
  "& th, & td": {
    fontSize: "0.75rem",
    fontFamily: "inherit",
  },
  cursor: "pointer",
};
