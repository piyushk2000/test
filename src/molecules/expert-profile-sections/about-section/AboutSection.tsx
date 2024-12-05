import RichTextDisplayer from "../../../atoms/rich-text-editor/RichTextDisplayer";
import { useIsMobile } from "../../../utils/hooks/useIsMobile";
import "./about-section.scss";

const AboutSection = (props: any) => {
  const isMobile = useIsMobile();

  return (
    <>
      {props.apiData?.bio && (
        <section className="profile-details-section expert-profile-about">
          <h3>About</h3>
          <RichTextDisplayer
            text={props.apiData?.bio}
            style={{ fontSize: isMobile ? "11px" : "14px" }}
          />
        </section>
      )}
    </>
  );
};
export default AboutSection;
