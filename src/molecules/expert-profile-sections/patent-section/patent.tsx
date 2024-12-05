import { LocalDayjs } from "../../../utils/timezoneService";
import "./patent.scss";
import {
  dividerStyle,
  spaceBoxStyle,
} from "../../../organisms/expert-profile/style";
import { Box, Typography } from "@mui/material";
import { Fragment } from "react";
import RichTextDisplayer from "../../../atoms/rich-text-editor/RichTextDisplayer";
import { useIsMobile } from "../../../utils/hooks/useIsMobile";

const PatentSection = (props: any) => {
  /*
  props?.apiData?.meta?.patents => This is used when the component is used in Expert Profile
  props?.patents => This is used when the component is used in Expert Pending Approval
*/
  const patents = props?.apiData?.meta?.patents || props?.patents;
  const isMobile = useIsMobile();

  return (
    <>
      {(patents && patents?.length) ? (
        <div className="profile-details-section expert-profile-pat">
          <h3>Patents</h3>
          {patents?.map((pat: any, index: any) => (
            <Fragment key={pat.title + index}>
              <div className="pat-detail">
                {pat.date ? (
                  <Typography component="h5" sx={spaceBoxStyle}>
                    {pat.date && LocalDayjs(pat.date).format("MMM-YYYY")}
                  </Typography>
                ) : (
                  <Box sx={spaceBoxStyle}></Box>
                )}

                <div id="pat-1">
                  {pat.patent_url ? (
                    <h4>
                      <a
                        href={pat.patent_url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {pat.title}
                      </a>
                    </h4>
                  ) : (
                    <h4>{pat.title}</h4>
                  )}

                  <h6>Patent Number - {pat.number}</h6>
                  <RichTextDisplayer style={{ fontSize: isMobile ? "11px" : "14px" }} text={pat.description} />
                  {/* Only used in Pending Approval */}
                  {props.showPatUrl &&
                    <p><span style={{ fontWeight: "500" }}>Patent URL:</span> {pat.patent_url}</p>
                  }
                </div>
              </div>
              {index !== patents.length - 1 && (
                <Box sx={dividerStyle(true)} component="hr" />
              )}
            </Fragment>
          ))}
        </div>
      ) : null}
    </>
  );
};

export default PatentSection;
