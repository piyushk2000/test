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
import InternalInfoForm from ".";

const InternalInfoAccordian = (props: any) => {
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
      expanded={expanded === "internal"}
      onChange={handleChange("internal")}
      sx={sectionStyles(expanded === "internal")}
    >
      {!isFormChange.internal ? (
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="internalbh-content"
          id="internalbh-header"
        >
          <Typography sx={accordianHeading}>Internal Info</Typography>
        </AccordionSummary>
      ) : (
        <Box sx={disabledBox}>
          <Typography sx={accordianHeading}>Internal Info</Typography>
        </Box>
      )}
      <AccordionDetails>
        {(formDefaultValues.internal && expanded === "internal") ? (
          <InternalInfoForm
            defaultValues={formDefaultValues.internal}
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

export default InternalInfoAccordian;
