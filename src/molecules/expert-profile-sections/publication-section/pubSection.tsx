import "./pubSection.scss";
import {
  dividerStyle,
  spaceBoxStyle,
} from "../../../organisms/expert-profile/style";
import { Box, Typography } from "@mui/material";
import { Fragment } from "react";
import { LocalDayjs } from "../../../utils/timezoneService";
import RichTextDisplayer from "../../../atoms/rich-text-editor/RichTextDisplayer";
import { useIsMobile } from "../../../utils/hooks/useIsMobile";

const PublicationSection = (props: any) => {
  /*
    props?.apiData?.meta?.publications => This is used when the component is used in Expert Profile
    props?.publications => This is used when the component is used in Expert Pending Approval
*/
  const publications = props?.apiData?.meta?.publications || props?.publications;
  const isMobile = useIsMobile();

  return (
    <>
      {(publications && publications.length) ? (
        <div className="profile-details-section expert-profile-pub">
          <h3>Publications</h3>
          {publications?.map((pub: any, index: any) => (
            <Fragment key={pub.title + index}>
              <div className="pub-detail">
                {pub.date ? (
                  <Typography component="h5" sx={spaceBoxStyle}>
                    {pub.date && LocalDayjs(pub.date).format("MMM-YYYY")}
                  </Typography>
                ) : (
                  <Box sx={spaceBoxStyle}></Box>
                )}

                <div id="pub-1">
                  {pub.description_url ? (
                    <h4>
                      <a
                        href={pub.description_url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {pub.title}
                      </a>
                    </h4>
                  ) : (
                    <h4>{pub.title}</h4>
                  )}

                  <h6>{pub.publication}</h6>
                  <RichTextDisplayer style={{ fontSize: isMobile ? "11px" : "14px" }} text={pub.description} />
                  {/* Only used in Pending Approval */}
                  {props.showPubUrl &&
                    <p><span style={{ fontWeight: "500" }}>Publication URL:</span> {pub.description_url}</p>
                  }
                </div>
              </div>
              {index !== publications.length - 1 && (
                <Box sx={dividerStyle(true)} component="hr" />
              )}
            </Fragment>
          ))}
        </div>
      ) : null}
    </>
  );
};

export default PublicationSection;
