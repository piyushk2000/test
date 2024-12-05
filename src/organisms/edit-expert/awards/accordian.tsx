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
import AwardsForms from ".";

const AwardsAccordian = (props: any) => {
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
      expanded={expanded === "awards"}
      sx={sectionStyles(expanded === "awards")}
      onChange={handleChange("awards")}
    >
      {!isFormChange.awards ? (
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="awardsbh-content"
          id="awardsbh-header"
        >
          <Typography sx={accordianHeading}>Awards & Recognition</Typography>
        </AccordionSummary>
      ) : (
        <Box sx={disabledBox}>
          <Typography sx={accordianHeading}>Awards & Recognition</Typography>
        </Box>
      )}
      <AccordionDetails>
        {(formDefaultValues.awards && expanded === "awards") ? (
          <AwardsForms
            defaultValues={formDefaultValues.awards}
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

export default AwardsAccordian;
