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
import BasicDetailsForm from ".";

const BasicDetailsAccordian = (props: any) => {
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
      expanded={expanded === "basicDetails"}
      onChange={handleChange("basicDetails")}
      sx={sectionStyles(expanded === "basicDetails")}
    >
      {!isFormChange.basicDetails ? (
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="basicDetailsbh-content"
          id="basicDetailsbh-header"
        >
          <Typography sx={accordianHeading}>Basic Details</Typography>
        </AccordionSummary>
      ) : (
        <Box sx={disabledBox}>
          <Typography sx={accordianHeading}>Basic Details</Typography>
        </Box>
      )}

      <AccordionDetails>
        {(formDefaultValues.basicDetails && expanded === "basicDetails") ? (
          <BasicDetailsForm
            defaultValues={formDefaultValues.basicDetails}
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

export default BasicDetailsAccordian;
