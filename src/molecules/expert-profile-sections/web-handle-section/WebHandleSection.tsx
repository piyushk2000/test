import { getImg } from "./helper";
import "./web-handle-section.scss";
import Grid from "@mui/material/Grid";

const WebHandleSection = (props: any) => {
  const webhandles = props?.apiData?.meta?.webhandles;

  return (
    <>
      {(webhandles && webhandles?.length) ? (
        <section className="profile-details-section expert-profile-webhandle">
          <h3>Web Handles</h3>
          <Grid container rowSpacing={"1rem"}>
            {webhandles.map((web: any, index: any) => (
              <Grid item xs={6} sm={3} md={2} xl={1} key={web.portal + index}>
                {web?.portal && (
                  <div className="social-media-container">
                    <img
                      src={getImg(web.portal)}
                      className="social-media-icon"
                      alt="twitter"
                    />
                    <a
                      href={web.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link"
                    >
                      {web.portal === "personal"
                        ? "Website"
                        : web.portal === "Any_Other"
                          ? "Other"
                          : web.portal}
                    </a>
                  </div>
                )}
              </Grid>
            ))}
          </Grid>
        </section>
      ) : null}
    </>
  );
};
export default WebHandleSection;