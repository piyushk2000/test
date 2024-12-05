export const handleClickSeperator = (text: any, textRef: any, setText: any) => {
  const txtarea: any = textRef.current;
  if (txtarea) {
    const start = txtarea.selectionStart;
    const end = txtarea.selectionEnd;
    const finText =
      txtarea.value.substring(0, start) + text + txtarea.value.substring(end);
    txtarea.focus();
    txtarea.selectionEnd = end + 5;
    setText(finText);
  }
};

export const editBtnClickHandler = (
  setPreviewOn: any,
  quesArr: any,
  setText: any
) => {
  setPreviewOn(false);
  const text = quesArr
    ? quesArr.map((ques: any) => "\n--> " + ques).join("")
    : "\n--> ";
  setText(text);
};
