import Box from "@mui/material/Box";
import "./snippet-section.scss";
import { Fragment } from "react";
import RichTextDisplayer from "../../../atoms/rich-text-editor/RichTextDisplayer";
import { useIsMobile } from "../../../utils/hooks/useIsMobile";

const SnippetSection = (props: any) => {
  const snippets = props?.apiData?.meta?.snippets;
  const isMobile = useIsMobile();

  return (
    <>
      {(snippets && snippets.length) ? (
        <section className="profile-details-section expert-profile-snippet">
          <h3>Relevancy</h3>
          {/* To confirm */}
          {snippets.map((snippet: any, index: any) => (
            <Fragment key={snippet + index}>
              <div className="snippets">
                <h4>{snippet.heading}</h4>
                <RichTextDisplayer style={{ fontSize: isMobile ? "11px" : "14px" }} text={snippet?.description} />
              </div>
              {index !== snippets.length - 1 && <Box></Box>}
            </Fragment>
          ))}
        </section>
      ) : null}
    </>
  );
};
export default SnippetSection;
