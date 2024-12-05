export const agendaDialogStyle = {
  width: "300px",
};

export const agendaQuestionsListStyle = {
  height: "400px",
  overflowY: "scroll",
  backgroundColor: "white",
  padding: "1rem",
  borderRadius: "10px",
  width: "100%",
  marginBottom: "1rem",
  marginTop: "10px",
};

export const questionContainerStyle = {
  display: "flex",
  alignItems: "items-start",
  gap: "1rem",
  fontWeight: "500",

  "& .ques": {
    color: "#252B3B",
    fontSize: "14px",
  },

  "& .ques-content": {
    color: "#484C57",
    fontSize: "14px",
  },
};

export const dividerStyle = (isSkeleton: boolean) => ({
  width: "100%",
  height: "1px",
  backgroundColor: "#D9D9D9",
  margin: !isSkeleton ? "1.5rem 0" : "0 0",
});
