import "../../project-detail/project-detail-card/project-detail-cards.scss";
import Box from "@mui/material/Box";
import "../../expert-profile/expert-profile.scss";
import PersonalInfoSection from "../../../molecules/expert-profile-sections/personal-info-section/PersonalInfoSection";
import BasicDetailSection from "../../../molecules/expert-profile-sections/basic-details-section/BasicDetailSection";
import AboutSection from "../../../molecules/expert-profile-sections/about-section/AboutSection";
import ExperienceSection from "../../../molecules/expert-profile-sections/experience-section/ExperienceSection";
import EducationSection from "../../../molecules/expert-profile-sections/education-section/EducationSection";
import AwardSection from "../../../molecules/expert-profile-sections/award-section/AwardSection";
import WebHandleSection from "../../../molecules/expert-profile-sections/web-handle-section/WebHandleSection";
import SnippetSection from "../../../molecules/expert-profile-sections/snippet-section/SnippetSection";
import { useEffect, useState } from "react";
import PublicationSection from "../../../molecules/expert-profile-sections/publication-section/pubSection";
import PatentSection from "../../../molecules/expert-profile-sections/patent-section/patent";
import ExpertProfileLoading from "../../../atoms/skeletons/exprtProfileSkeletons";
import { getAllProfileDetails } from "../../expert-profile/helper";
import { Avatar, Stack, Typography } from "@mui/material";
import defaultProfileImage from "../../../assets/images/expert/default_profle_image.png";
import { Expert } from "../../../pages/Profile-shared/types";
import RichTextDisplayer from "../../../atoms/rich-text-editor/RichTextDisplayer";
import { getPictureUrl } from "../../expert-cards/helper";
import diamondIcon from "../../../assets/images/expert/diamond_expert.png";
import { ExpertBadge } from "../../../atoms/profile-cardV1/ProfileCardV1";
import { CustomChip } from "../../../atoms/chips/CustomChip";
import { useNavigate } from "react-router-dom";
import { AppRoutes } from "../../../constants";
import { useGetParams } from "../../../utils/hooks/useGetParams";

type Props = {
  expertId: number;
  extraDetails: Expert;
  isLoggedIn: boolean;
  openLoginWarning(): void;
};

const SharedExpertDetails = ({ expertId, extraDetails, isLoggedIn, openLoginWarning }: Props) => {
  const [apiData, setApiData] = useState<any>(null);
  const navigate = useNavigate();
  const secretCode = useGetParams("code");
  useEffect(() => {
    setApiData(null);
    getAllProfileDetails(expertId, setApiData, { disableShowRefree: true, secretCode: secretCode });
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [expertId]);

  return (
    <Box className="expert-profile-section" px={2}>
      {apiData ? (
        <>
          <Box p={"1rem"} pl={"2.5rem"}>
            <Box
              sx={{
                display: "flex",
                gap: "1rem",
              }}
            >
              <Box>
                <div className="profile-picture-container">
                  <Avatar
                    src={getPictureUrl(apiData?.picture) || defaultProfileImage}
                    alt="Profile name"
                    sx={{
                      width: "60px",
                      height: "60px",
                    }}
                  />

                  {apiData?.premium_expert && (
                    <img
                      className="diamond-icon"
                      src={diamondIcon}
                      alt="Premium Expert Icon"
                    />
                  )}
                  {apiData?.badge && (
                    <ExpertBadge classname="badges" badge={apiData.badge} />
                  )}
                </div>
              </Box>
              <Box>
                <Typography
                  variant="h6"
                  component="div"
                  sx={{
                    fontSize: "20px",
                    fontWeight: "700",
                  }}
                >
                  {apiData.name}
                </Typography>
                <Typography
                  variant="h6"
                  component="div"
                  sx={{
                    fontSize: "14px",
                    fontWeight: "500",
                  }}
                >
                  {[
                    extraDetails?.relevant_designation,
                    extraDetails?.relevant_company,
                    extraDetails?.relevant_company_location,
                  ]
                    .filter((i) => !!i)
                    .join(", ")}
                </Typography>
                {extraDetails?.meta?.selling_price &&
                  <Typography
                    variant="h6"
                    component="div"
                    sx={{
                      fontSize: "14px",
                      fontWeight: "500",
                    }}
                  >
                    Selling Price: {extraDetails?.meta?.selling_price || ""}{" "}
                    {extraDetails?.meta?.selling_price_currency || ""}
                  </Typography>
                }


                <Stack
                  direction="row"
                  spacing={0.5}
                  sx={{ gap: "12px", mt: "4px" }}
                >
                  {extraDetails?.calls_completed ? (
                    <CustomChip
                      label={"Calls Done: " + extraDetails.calls_completed}
                      color="rgba(107, 87, 115, 1)"
                      bg="rgba(107, 87, 115, 0.1)"
                      onClick={() =>
                        isLoggedIn ?
                          navigate(
                            AppRoutes.CALLS +
                            "?page=1" +
                            "&project_id=" +
                            extraDetails?.fk_project +
                            "&expert_id=" +
                            extraDetails.fk_expert +
                            "&expert_name=" +
                            extraDetails.expert_name
                          ) : openLoginWarning()
                      }
                    />
                  ) : null}

                  {extraDetails?.calls_scheduled ? (
                    <CustomChip
                      label={
                        "Calls Scheduled: " + extraDetails?.calls_scheduled
                      }
                      color="rgba(77, 98, 124, 1)"
                      bg="rgba(77, 98, 124, 0.1)"
                    />
                  ) : null}
                </Stack>
              </Box>
            </Box>
          </Box>

          {extraDetails?.meta?.snippet ? (
            <Box pl="2.5rem" py="13px">
              <Typography
                variant="h3"
                sx={{
                  fontSize: "18px",
                  fontWeight: "600",
                  marginBottom: "10px",
                }}
              >
                Profile Summary
              </Typography>
              <RichTextDisplayer text={extraDetails.meta.snippet} />
            </Box>
          ) : null}

          <BasicDetailSection apiData={apiData} />
          <AboutSection apiData={apiData} />
          <ExperienceSection apiData={apiData} extraDetails={extraDetails} />
          <EducationSection apiData={apiData} />
          <AwardSection apiData={apiData} />
          <PublicationSection apiData={apiData} />
          <PatentSection apiData={apiData} />
          {/* <WebHandleSection apiData={apiData} /> */}
          {/* <SnippetSection apiData={apiData} /> */}
        </>
      ) : (
        <ExpertProfileLoading />
      )}
    </Box>
  );
};
export default SharedExpertDetails;
