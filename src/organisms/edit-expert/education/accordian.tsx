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
import EducationForms from ".";

const EducationAccordian = (props: any) => {
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
      expanded={expanded === "education"}
      sx={sectionStyles(expanded === "education")}
      onChange={handleChange("education")}
    >
      {!isFormChange.education ? (
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="educationbh-content"
          id="educationbh-header"
        >
          <Typography sx={accordianHeading}>Education</Typography>
        </AccordionSummary>
      ) : (
        <Box sx={disabledBox}>
          <Typography sx={accordianHeading}>Education</Typography>
        </Box>
      )}
      <AccordionDetails>
        {(formDefaultValues.education && expanded === "education") ? (
          <EducationForms
            defaultValues={formDefaultValues.education}
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

export default EducationAccordian;
