import { accordianHeading, disabledBox, sectionStyles } from "../styles";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  CircularProgress,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import WebHandlesForm from ".";

const WebHandleAccordian = (props: any) => {
  const {
    expanded,
    id,
    handleChange,
    isFormChange,
    formDefaultValues,
    setExpanded,
    setFormChange,
    setFormDefaultValues,
    setBackdropOpen,
  } = props;

  return (
    <Accordion
      expanded={expanded === "webHandle"}
      sx={sectionStyles(expanded === "webHandle")}
      onChange={handleChange("webHandle")}
    >
      {!isFormChange.webHandles ? (
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="webHandlesbh-content"
          id="webHandlesbh-header"
        >
          <Typography sx={accordianHeading}>Web Handles</Typography>
        </AccordionSummary>
      ) : (
        <Box sx={disabledBox}>
          <Typography sx={accordianHeading}>Web Handles</Typography>
        </Box>
      )}
      <AccordionDetails>
        {(formDefaultValues.webHandles && expanded === "webHandle") ? (
          <WebHandlesForm
            defaultValues={formDefaultValues.webHandles}
            id={id}
            handleClose={() => setExpanded(false)}
            setFormChange={setFormChange}
            setFormDefaultValues={setFormDefaultValues}
            setBackdropOpen={setBackdropOpen}
          />
        ) : (
          <CircularProgress />
        )}
      </AccordionDetails>
    </Accordion>
  );
};

export default WebHandleAccordian;
