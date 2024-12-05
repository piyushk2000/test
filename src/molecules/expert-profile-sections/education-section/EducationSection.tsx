import { Box } from "@mui/material";
import { dividerStyle } from "../../../organisms/expert-profile/style";
import { Fragment } from "react";
import { LocalDayjs } from "../../../utils/timezoneService";
import "./education-section.scss";

export const startAndEndYear = (start_year: string | null, end_year: string | null) => {

  const start_Date = start_year && LocalDayjs(start_year).format("YYYY");
  const end_Date = end_year && LocalDayjs(end_year).format("YYYY")

  if (start_year && end_year) {
    return `${start_Date} - ${end_Date}`

  } else if (start_year && !end_year) {
    return `Start Date: ${start_Date}`
  } else if (!start_year && end_year) {
    return `End Date: ${end_Date}`
  }

  return "";
}

const EducationSection = (props: any) => {
  /*
    props?.apiData?.meta?.education => This is used when the component is used in Expert Profile
    props?.education_info => This is used when the component is used in Expert Pending Approval
  */
  const education = props?.apiData?.meta?.education || props?.education_info;

  return (
    <>
      {(education && education.length) ? (
        <section className="profile-details-section expert-profile-education">
          <h3>Education</h3>
          {education.map((edu: any, index: any) => (
            <Fragment key={edu.course + index}>
              <div className="education-detail">
                <div id="experiance-1">
                  <h4>{edu.institution}</h4>
                  <h5>{edu.course}</h5>
                  <p>{startAndEndYear(edu.start_year, edu.end_year)}</p>
                </div>
              </div>
              {index !== education.length - 1 && (
                <Box sx={dividerStyle(false)} component="hr" />
              )}
            </Fragment>
          ))}
        </section>
      ) : null}
    </>
  );
};
export default EducationSection;
