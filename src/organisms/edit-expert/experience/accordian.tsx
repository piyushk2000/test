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
import ExperienceForms from ".";

const ExperienceAccordian = (props: any) => {
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
      expanded={expanded === "experience"}
      sx={sectionStyles(expanded === "experience")}
      onChange={handleChange("experience")}
    >
      {!isFormChange.experience ? (
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="experiencebh-content"
          id="experiencebh-header"
        >
          <Typography sx={accordianHeading}>Experience</Typography>
        </AccordionSummary>
      ) : (
        <Box sx={disabledBox}>
          <Typography sx={accordianHeading}>Experience</Typography>
        </Box>
      )}
      <AccordionDetails>
        {(formDefaultValues.experience && expanded === "experience") ? (
          <ExperienceForms
            defaultValues={formDefaultValues.experience}
            relevant_company={formDefaultValues.relevant_company}
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

export default ExperienceAccordian;
