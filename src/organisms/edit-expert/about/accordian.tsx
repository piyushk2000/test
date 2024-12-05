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
import AboutForm from ".";

const AboutAccordian = (props: any) => {
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
      expanded={expanded === "about"}
      onChange={handleChange("about")}
      sx={sectionStyles(expanded === "about")}
    >
      {!isFormChange.about ? (
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="aboutbh-content"
          id="aboutbh-header"
        >
          <Typography sx={accordianHeading}>About</Typography>
        </AccordionSummary>
      ) : (
        <Box sx={disabledBox}>
          <Typography sx={accordianHeading}>About</Typography>
        </Box>
      )}
      <AccordionDetails>
        {(formDefaultValues.about && expanded === "about") ? (
          <AboutForm
            defaultValues={formDefaultValues.about}
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

export default AboutAccordian;
