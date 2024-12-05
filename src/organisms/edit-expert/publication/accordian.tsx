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
import PublicationForms from ".";

const PublicationAccordian = (props: any) => {
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
      expanded={expanded === "publication"}
      sx={sectionStyles(expanded === "publication")}
      onChange={handleChange("publication")}
    >
      {!isFormChange.publication ? (
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="publicationbh-content"
          id="publicationbh-header"
        >
          <Typography sx={accordianHeading}>Publications</Typography>
        </AccordionSummary>
      ) : (
        <Box sx={disabledBox}>
          <Typography sx={accordianHeading}>Publications</Typography>
        </Box>
      )}
      <AccordionDetails>
        {(formDefaultValues.publication && expanded === "publication") ? (
          <PublicationForms
            defaultValues={formDefaultValues.publication}
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

export default PublicationAccordian;
