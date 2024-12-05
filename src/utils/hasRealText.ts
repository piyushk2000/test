export const hasRealText = (htmlContent: string) => {
  const tempElement = document.createElement("div");
  tempElement.innerHTML = htmlContent;

  const allText = tempElement.innerText.trim();

  return allText.length > 0;
};
