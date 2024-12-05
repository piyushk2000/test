import Diamond from "../../../assets/images/expert/diamond_expert.png";
import Star from "../../../assets/images/expert/star_expert.png";
import privateProfile from "../../../assets/images/expert/account_private_expert.png";
// import privateProfileColor from "../../../assets/images/expert/account_private_profile_color.png";
import dnd from "../../../assets/images/expert/no-call-expert.png";
import {
  Avatar,
  Box,
  Chip,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import DetailsWithIcon from "../../../atoms/details-with-icon/DetailsWithIcon";
import Envelope from "../../../assets/images/expert/letter_expert.png";
import PhoneCall from "../../../assets/images/expert/call_expert.png";
import IdBadge from "../../../assets/images/id-badge.png";

import "./profile-section.scss";
import { statusChip } from "../../../organisms/expert-cards/style";
import { IconButtonStyle, typeChipStyles } from "./styles";
import { useSnackbar } from "notistack";
import { handleCopy } from "./helper";
import { getPictureUrl } from "../../../organisms/expert-cards/helper";
import defaultProfileImage from "../../../assets/images/expert/default_profle_image.png";
import { useIsMobile } from "../../../utils/hooks/useIsMobile";
import {
  isAdmin,
  isClient,
  isExpert,
  isInfollion,
  isSuperAdmin,
} from "../../../utils/role";
import { ExpertBadge } from "../../../atoms/profile-cardV1/ProfileCardV1";
import { AppRoutes } from "../../../constants";
import { Link } from "react-router-dom";
import { pendingApprovalStyle } from "../../edit-expert-navbar";
import { NumericData } from "../../../atoms/profile-cardV1/expert-call-detail-tooltip";
import BoxSpaceBtw from "../../../atoms/boxSpaceBtw";
import { LocalDayjs } from "../../../utils/timezoneService";
import userTime from "../../../assets/images/expert/user_expert.png";
import calendar from "../../../assets/images/expert/calendar_expert.png";

const ProfileSection = (props: any) => {
  const {
    name,
    type,
    status,
    primary_email,
    primary_mobile,
    premium_expert,
    referred_by,
    referee_name,
    id,
    base_location_value,
    internal_rating,
    picture,
    dnd_enabled,
    private_profile,
    external_rating,
    meta,
    badge,
    pending_edits,
    calls_data,
    updated_by_value,
    updated_at,
    confirmed_on,
    approved_by_value,
    fk_creator_value,

  } = props.apiData;
  const { enqueueSnackbar } = useSnackbar();
  const isMobile = useIsMobile();
  const is_expert = isExpert();


  return (
    <section className="profile-details-section">
      <BoxSpaceBtw sx={{ flexWrap: 'wrap', gap: '1rem' }}>
        <div className="profile-details-heading">
          <div
            className="profile-picture-container"
            onClick={() => props.handleShowImageDialogOpen()}
          >
            <Avatar
              src={getPictureUrl(picture) || defaultProfileImage}
              alt="Profile name"
              className="profile-picture"
            />
            <div className="profile-overlay"></div>
          </div>
          <div className="profile-detail">
            <div className="profile-name">
              <h3>{name}</h3>
              {premium_expert && !is_expert && (
                <Tooltip title="Premium Expert" arrow>
                  <img
                    src={Diamond}
                    width="24px"
                    height="24px"
                    alt="Premium Expert Icon"
                  />
                </Tooltip>
              )}

              {badge && (
                <ExpertBadge classname="badges" badge={badge} isProfile />
              )}

              {!isClient() && !isInfollion() && (
                <>
                  {!isMobile ? (
                    <>
                      {!is_expert && (
                        <>
                          <Box sx={statusChip(status)}>
                            <Typography component="p">{status}</Typography>
                          </Box>
                          <Box sx={typeChipStyles("#b8e2f2", "#184252")}>
                            <Typography component="p">{type}</Typography>
                          </Box>
                        </>
                      )}

                      <Box sx={typeChipStyles("rgba(0,0,0,0.1)", "#252B3B")}>
                        <Typography component="p">
                          {base_location_value?.name}
                        </Typography>
                      </Box>
                    </>
                  ) : null}
                  {!is_expert && (
                    <>
                      <Tooltip title="Copy Primary Email" arrow>
                        <IconButton
                          onClick={() =>
                            handleCopy(
                              primary_email,
                              enqueueSnackbar,
                              "Primary Email"
                            )
                          }
                          sx={IconButtonStyle}
                        >
                          <img src={Envelope} alt="Envelope Icon" />
                        </IconButton>
                      </Tooltip>

                      <Tooltip title="Copy Primary Mobile Number" arrow>
                        <IconButton
                          onClick={() =>
                            handleCopy(
                              primary_mobile,
                              enqueueSnackbar,
                              "Primary Mobile Number"
                            )
                          }
                          sx={IconButtonStyle}
                        >
                          <img
                            className="phone-call"
                            src={PhoneCall}
                            alt="Phone Call Icon"
                          />
                        </IconButton>
                      </Tooltip>
                    </>
                  )}
                </>
              )}
            </div>
            <div className="project-contact">
              <div className="more-details">
                {!is_expert && (
                  <DetailsWithIcon
                    classNames="id-badge"
                    title="ID"
                    icon={IdBadge}
                    text={id}
                  />
                )}
              </div>

              {(isClient() || isInfollion()) && (
                <>
                  <div className="more-details">
                    <p>
                      {[
                        meta?.relevant_company?.designation,
                        meta?.relevant_company?.name,
                        base_location_value?.name,
                      ]
                        .filter((d) => !!d)
                        .join(", ")}
                    </p>
                  </div>
                </>
              )}

              {!isClient() && !isInfollion() && referee_name && (
                <div className="more-details">
                  <p>Referred By:</p>
                  <Link
                    to={`/layout/expert-profile?id=${referred_by}&page=1`}
                    className="referred-by-name"
                  >
                    {referee_name}
                  </Link>
                </div>
              )}

              {!is_expert && (
                <>
                  {internal_rating || external_rating ? (
                    <>
                      <div className="stars-container">
                        {internal_rating && (
                          <>
                            {isClient() ? (
                              <>
                                <p className="rating-label">Rating: </p>
                                <div className="stars">
                                  <div>
                                    <img
                                      src={Star}
                                      width="13px"
                                      height="13px"
                                      alt="star"
                                    />
                                    <p>{internal_rating}</p>
                                  </div>
                                </div>
                              </>
                            ) : (
                              <>
                                <p className="rating-label">Rating: </p>
                                <Tooltip title="Internal Rating" arrow>
                                  <div className="stars">
                                    <p>I</p>
                                    <div>
                                      <img
                                        src={Star}
                                        width="13px"
                                        height="13px"
                                        alt="star"
                                      />
                                      <p>{internal_rating}</p>
                                    </div>
                                  </div>
                                </Tooltip>
                              </>
                            )}
                          </>
                        )}

                        {!isClient() && !isInfollion() && (
                          <>
                            {external_rating && internal_rating ? (
                              <p className="dash">|</p>
                            ) : null}
                            {external_rating ? (
                              <Tooltip title="External Rating" arrow>
                                <div className="stars">
                                  <p>E</p>
                                  <div>
                                    <img
                                      src={Star}
                                      width="13px"
                                      height="13px"
                                      alt="star"
                                    />
                                    <p>{external_rating}</p>
                                  </div>
                                </div>
                              </Tooltip>
                            ) : null}
                          </>
                        )}
                      </div>
                    </>
                  ) : null}

                  {!isClient() && !isInfollion() && (
                    <>
                      {isSuperAdmin() && pending_edits && !props.hide_pending_edits ? (
                        <Link
                          to={`${AppRoutes.EXPERT_PENDING_APPROVAL}?id=${id}`}
                          target="_blank"
                          rel="noopener,noreferrer"
                        >
                          <Box sx={statusChip("Pending Approval")}>
                            <Typography component="p">{`${pending_edits === 1
                              ? "Pending Edit"
                              : "Pending Edits"
                              } (${pending_edits || "0"})`}</Typography>
                          </Box>
                        </Link>
                      ) : (
                        <></>
                      )}

                      {dnd_enabled && (
                        <Tooltip title="DND on" arrow>
                          <img
                            src={dnd}
                            width="22px"
                            height="22px"
                            alt="Private Profile Icon"
                          />
                        </Tooltip>
                      )}

                      {private_profile && (
                        <Tooltip title="Profile is not public" arrow>
                          <img
                            src={privateProfile}
                            width="22px"
                            height="22px"
                            alt="Private Profile Icon"
                          />
                        </Tooltip>
                      )}
                    </>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
        <div>
          {(isSuperAdmin() || isAdmin()) &&
            <Stack direction={"row"} spacing={2}>
              <Stack direction="column" spacing={1.35}>
                {approved_by_value && (
                  <Tooltip title={`Approved By - ${approved_by_value.name}`} arrow>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <img src={userTime} alt="User Time Icon" style={{ width: 12, height: 12 }} />
                      <Typography component="span" className="date-text"style={{ fontSize: '0.75rem', fontWeight: '500' }}>
                        {approved_by_value.name}
                      </Typography>
                    </Stack>
                  </Tooltip>
                )}

                {status === 'Confirmed' && confirmed_on && (
                  <Tooltip title={`Approved on - ${LocalDayjs(confirmed_on).format("DD MMMM YYYY")}`} arrow>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <img src={calendar} alt="Calendar Icon" style={{ width: 12, height: 12 }} />
                      <Typography component="span" className="date-text" style={{ fontSize: '0.75rem', fontWeight: '500' }}>
                        {LocalDayjs(confirmed_on).format("DD MMMM YYYY")}
                      </Typography>
                    </Stack>
                  </Tooltip>
                )}
              </Stack>
              <div style={{ marginTop: '12px', display: 'flex', flexDirection: 'row' }}>
                <NumericData
                  label="Call"
                  value={calls_data?.callCount || 0}
                  valueClass="green"
                  isLink={calls_data?.callCount && calls_data?.callCount > 0 ? true : false}
                  expert_id={id}
                  expert_name={name}
                  sx={{
                    fontSize: {
                      xs: "14px",
                      md: "16px"
                    }
                  }}
                  valueStyle={{ fontWeight: "500", marginRight: '20px' }}

                />

                <NumericData
                  label="Project"
                  value={calls_data?.projectCount || 0}
                  isLink={calls_data?.projectCount && calls_data?.projectCount > 0 ? true : false}
                  link={AppRoutes.PROJECTS + "/all" + "?page=1" + "&projectIds=" + calls_data?.projects}
                  valueClass="green"
                  sx={{
                    fontSize: {
                      xs: "14px",
                      md: "16px"
                    }
                  }}
                  valueStyle={{ fontWeight: "500" }}
                /></div>

            </Stack>
          }
        </div>
      </BoxSpaceBtw>
    </section>
  );
};

export default ProfileSection;
