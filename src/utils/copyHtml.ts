import { EnqueueSnackbar } from "notistack";
import * as clipboard from "clipboard-polyfill";

export async function copyHtml(
  componentRef: React.RefObject<HTMLDivElement>,
  enqueueSnackbar: EnqueueSnackbar,
  donotCopyHtml?: boolean
) {
  if (!componentRef.current) {
    return;
  }

  const contentDiv = componentRef.current;

  try {
    // Use the Clipboard API to copy the HTML content to the clipboard
    const styles = `
    body {
      background-color: #f0f0f0;
    }
    p, h1, h2, h3, h4, h5, h6, ul, li, ol{
      margin: 0;
    }
    p{
      font-size: 14px;
    }
    /* Add more styles as needed */
  `;

    const htmlContent = `<style>${styles}</style>` + contentDiv.innerHTML;

    if(donotCopyHtml) {
      return htmlContent;
    }

    await navigator.clipboard.write([
      new ClipboardItem({
        "text/html": new Blob([htmlContent], { type: "text/html" }),
      }),
    ]);

    enqueueSnackbar("Copied to clipboard", {
      variant: "success",
    });
  } catch (error) {
    console.error("Unable to copy content to clipboard", error);

    try {
      // Fallback using clipboard-polyfill with ClipboardItem for firefox Browser
      const item = new clipboard.ClipboardItem({
        "text/html": new Blob([contentDiv.innerHTML], {
          type: "text/html",
        }),
      });

      await clipboard.write([item]);
      enqueueSnackbar("Copied to clipboard", {
        variant: "success",
      });
    } catch (fallbackError) {
      console.error(
        "Unable to copy content to clipboard even with fallback",
        fallbackError
      );
    }
  }
}
