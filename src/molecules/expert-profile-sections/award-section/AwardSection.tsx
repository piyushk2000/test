import "./award-section.scss";
import { Fragment } from "react";
import Award from "../../../assets/images/expert/award.png";
import {
  dividerStyle,
  spaceBoxStyle,
} from "../../../organisms/expert-profile/style";
import { Box } from "@mui/material";
import { LocalDayjs } from "../../../utils/timezoneService";
import RichTextDisplayer from "../../../atoms/rich-text-editor/RichTextDisplayer";
import { useIsMobile } from "../../../utils/hooks/useIsMobile";

const AwardSection = (props: any) => {
  /*
    props.apiData?.meta?.awards => This is used when the component is used in Expert Profile
    props?.awards => This is used when the component is used in Expert Pending Approval
*/
  const awards = props.apiData?.meta?.awards || props?.awards;
  const isMobile = useIsMobile();

  return (
    <>
      {(awards && awards.length) ? (
        <section className="profile-details-section expert-profile-award">
          <h3>Award & Recognition</h3>
          {awards.map((award: any, index: any) => (
            <Fragment key={award.title + index}>
              <div className="award-detail">
                {award?.date ? (
                  <Box sx={spaceBoxStyle}>
                    <h5>
                      {award.date && LocalDayjs(award.date).format("MMM-YYYY")}
                    </h5>
                  </Box>
                ) : (
                  <Box sx={spaceBoxStyle}></Box>
                )}

                <div id="award-1">
                  <div>
                    <img
                      src={Award}
                      alt="logo"
                      width={"13px"}
                      height={"13px"}
                    />
                    <h4>{award.title}</h4>
                  </div>
                  <RichTextDisplayer style={{ fontSize: isMobile ? "11px" : "14px" }} text={award.description} />
                </div>
              </div>
              {index !== awards.length - 1 && (
                <Box sx={dividerStyle(true)} component="hr" />
              )}
            </Fragment>
          ))}
        </section>
      ) : null}
    </>
  );
};
export default AwardSection;
