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
import SnippetsForms from ".";

const SnippetsAccordian = (props: any) => {
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
      expanded={expanded === "snippets"}
      sx={sectionStyles(expanded === "snippets")}
      onChange={handleChange("snippets")}
    >
      {!isFormChange.snippets ? (
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="snippetsbh-content"
          id="snippetsbh-header"
        >
          <Typography sx={accordianHeading}>Relevancies</Typography>
        </AccordionSummary>
      ) : (
        <Box sx={disabledBox}>
          <Typography sx={accordianHeading}>Relevancies</Typography>
        </Box>
      )}
      <AccordionDetails>
        {(formDefaultValues.snippets && expanded === "snippets") ? (
          <SnippetsForms
            defaultValues={formDefaultValues.snippets}
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

export default SnippetsAccordian;
