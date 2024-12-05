import "./experience-section.scss";
import React from "react";
import { Accordion, AccordionDetails, AccordionSummary, Box, Chip } from "@mui/material";
import { dividerStyle } from "../../../organisms/expert-profile/style";
import { LocalDayjs } from "../../../utils/timezoneService";
import RichTextDisplayer from "../../../atoms/rich-text-editor/RichTextDisplayer";
import { useIsMobile } from "../../../utils/hooks/useIsMobile";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { BoxFlex } from "../../../atoms/boxSpaceBtw";
import GradeIcon from '@mui/icons-material/Grade';

const ExperienceSection = (props: any) => {
  const { work_experiences } = props.apiData;
  const isMobile = useIsMobile();

  // Relevant Company from PE - ( USED ONLY IN PROFILES SHARED )
  const relevant_company = props?.extraDetails?.relevant_company;

  return (
    <>
      {work_experiences.length ? (
        <section className="profile-details-section expert-profile-experience">
          <h3>Experience</h3>
          {work_experiences.map((exp: any, index: any) => {
            const isRelevant = relevant_company ? exp.company.includes(relevant_company) : null;

            return (<React.Fragment key={exp + index}>
              <Accordion>
                <AccordionSummary
                  sx={{ width: '100%' , userSelect:'text', cursor:'pointer'}}
                  expandIcon={<ExpandMoreIcon />}>
                  <div style={{ fontWeight: 'bold' }}>
                    <BoxFlex sx={{gap: "1rem"}}>
                      <h5>{exp.company}{exp?.location && `, ${exp.location}`}</h5>
                      {relevant_company && isRelevant && <Chip size="small" icon={<GradeIcon sx={{color: "white !important", width: "15px"}} />} sx={{backgroundColor: "var(--primary-color)", color: "white"}} label={"Relevant"} />}
                    </BoxFlex>
                    <h5>{[exp?.designation, exp?.division].filter(f => !!f).join(" - ")}</h5>
                    {exp.start_date && (
                      <h5>
                        {LocalDayjs(exp.start_date).format("MMM YYYY")}
                        {" - "}
                        {exp.currently_works_here
                          ? "Present"
                          : LocalDayjs(exp.end_date).format("MMM YYYY")}
                      </h5>
                    )}
                  </div>
                </AccordionSummary>
                <AccordionDetails>
                  <div className="experience-detail" style={{ marginTop: '-1em' }}>
                    <div id="experiance-1">
                      <h5>{exp?.location}</h5>
                      {/* <h5>{exp?.designation}</h5>
                      {exp.start_date && (
                        <p>
                          {LocalDayjs(exp.start_date).format("MMM YYYY")}
                          {" - "}
                          {exp.currently_works_here
                            ? "Present"
                            : LocalDayjs(exp.end_date).format("MMM YYYY")}
                        </p>
                      )} */}
                      <RichTextDisplayer style={{ fontSize: isMobile ? "11px" : "14px" }} text={exp?.job_description} />
                    </div>
                  </div>
                </AccordionDetails>
              </Accordion>
            </React.Fragment>
            )
          })}
        </section>
      ) : null}
    </>
  );
};
export default ExperienceSection;
