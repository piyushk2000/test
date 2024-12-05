import React from "react";
import PersonalInfoForm from ".";
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

const PersonalInfoAccordian = (props: any) => {
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
      expanded={expanded === "personalInfo"}
      onChange={handleChange("personalInfo")}
      sx={sectionStyles(expanded === "personalInfo")}
    >
      {!isFormChange.personalInfo ? (
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="personalInfobh-content"
          id="personalInfobh-header"
        >
          <Typography sx={accordianHeading}>Personal Info</Typography>
        </AccordionSummary>
      ) : (
        <Box sx={disabledBox}>
          <Typography sx={accordianHeading}>Personal Info</Typography>
        </Box>
      )}

      <AccordionDetails>
        {formDefaultValues.personalInfo ? (
          <PersonalInfoForm
            defaultValues={formDefaultValues.personalInfo}
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

export default PersonalInfoAccordian;
