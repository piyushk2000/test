import { EnqueueSnackbar } from "notistack";

export const handleCopy = async (
  text: string,
  enqueueSnackbar: EnqueueSnackbar,
  successMessage: string
) => {
  try {
    await navigator.clipboard.writeText(text);
    console.log(successMessage + " copied to clipboard");
    enqueueSnackbar(successMessage + " copied to clipboard", {
      variant: "success",
      autoHideDuration: 2000,
    });
  } catch (err) {
    console.error("Failed to copy email to clipboard", err);
  }
};
