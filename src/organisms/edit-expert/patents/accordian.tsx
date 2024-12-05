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
import PatentsForms from ".";

const PatentsAccordian = (props: any) => {
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
      expanded={expanded === "patents"}
      sx={sectionStyles(expanded === "patents")}
      onChange={handleChange("patents")}
    >
      {!isFormChange.patents ? (
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="patentsbh-content"
          id="patentsbh-header"
        >
          <Typography sx={accordianHeading}>Patents</Typography>
        </AccordionSummary>
      ) : (
        <Box sx={disabledBox}>
          <Typography sx={accordianHeading}>Patents</Typography>
        </Box>
      )}
      <AccordionDetails>
        {(formDefaultValues.patents && expanded === "patents") ? (
          <PatentsForms
            defaultValues={formDefaultValues.patents}
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

export default PatentsAccordian;
