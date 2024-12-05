export const webkitScrollbarStyles = `
::-webkit-scrollbar {
  width: 5px;
}

::-webkit-scrollbar-thumb {
  background-color: #ec9324;
  border-radius: 0;
}

::-webkit-scrollbar-thumb:hover {
  background-color: #ec9324;
}

::-webkit-scrollbar-track {
  background-color: #C4C4C4;
  border-radius: 0;
}
`;

export const inputRow = {
  padding: "5px",
};

export const commonInputStyles: any = {
  className: "backgroundWhite-description",
  size: "small",
  variant: "outlined",
  fullWidth: true,
};

export const agendaContainer = {
  borderRadius: "5px",
  maxHeight: 480,
  overflow: "auto",
  scrollbarColor: "#EC9324 #C4C4C4",
  webkitScrollbarStyles,
  padding: "0px 15px 20px 20px",
};
