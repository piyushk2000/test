import Tooltip from "@mui/material/Tooltip";
import Attachment from "../../../assets/images/expert/attachment.png";
import { ThemeProvider, createTheme } from "@mui/material";

export const HowToUploadPE = () => {
  const Title = () => (
    <ul>
      <li>
        <p>
          1. Please click on the attachment icon{" "}
          <img
            src={Attachment}
            width={"12px"}
            alt="Attachment Icon"
            style={{ marginBottom: "0.25rem" }}
          />{" "}
          on the right side
        </p>
      </li>
      <li>
        <p>2. Choose "No PE Certificate" from dropdown</p>
      </li>
      <li>
        <p>3. Upload the document.</p>
      </li>
    </ul>
  );

  const theme = createTheme({
    components: {
      MuiTooltip: {
        styleOverrides: {
          tooltip: {
            backgroundColor: "#F9F6EE",
            color: "grey",
            fontSize: "0.75rem",
            fontFamily: "inherit",
          },
          arrow: {
            color: "#F9F6EE",
          },
        },
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Tooltip title={<Title />} arrow enterTouchDelay={100}>
        <p
          style={{
            color: "rgb(155, 100, 100)",
            fontWeight: "500",
            cursor: "pointer",
          }}
        >
          How To Upload ?
        </p>
      </Tooltip>
    </ThemeProvider>
  );
};

export const secondaryFields = (one: string | null, two: string | null) => {
  let str = [];

  if (one) {
    str.push(one);
  }

  if (two) {
    str.push(two);
  }

  if (str.length > 0) {
    return str;
  }
}