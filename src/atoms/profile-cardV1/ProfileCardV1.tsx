
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import "./style.scss";
import AccountBalanceTwoToneIcon from '@mui/icons-material/AccountBalanceTwoTone';
import Linkedin from "../../../src/assets/images/expert/linkedin.png";
import CustomButton from "../Button";
import IdBadge from "../../assets/images/id-badge.png";
import callIcon from "../../assets/images/expert/call_expert.png";
import letterIcon from "../../assets/images/expert/letter_expert.png";
import money from "../../assets/images/expert/money.png";
import calenderIcon from "../../assets/images/expert/calendar_expert.png";
import userTime from "../../assets/images/expert/user_expert.png";
import EditIcon from "../../assets/images/expert/edit.png";
import EditIconWhite from "../../assets/images/expert/edit_icon_white.png";
import defaultProfileImage from "../../assets/images/expert/default_profle_image.png";
import DetailsWithIcon from "../details-with-icon/DetailsWithIcon";
import diamondIcon from "../../assets/images/expert/diamond_expert.png";
import { statusChip } from "../../organisms/expert-cards/style";
import CustomBtnFilled from "../form-molecules/CustomBtnFilled";
import { confirmedOrUpdateTooltip, generateComplainceBtnStyle, getWebHandle, selectedContainerStyle, showGenerateCompliance, updatedByTooltip } from "./helper";
import { getPictureUrl } from "../../organisms/expert-cards/helper";
import { isAdmin, isSuperAdmin } from "../../utils/role";
import ExpertCallDetailTooltip, { NumericData } from "./expert-call-detail-tooltip";
import { handleCopy } from "../../molecules/expert-profile-sections/profile-section/helper";
import { useSnackbar } from "notistack";
import AceBadge from "../../assets/images/expert/ace-badge.png";
import dnd from "../../assets/images/expert/no-call-expert.png";
import proBadge from "../../assets/images/expert/crown-badge.png"
import championBadge from "../../assets/images/expert/trophy-badge.png";
import timelineGrey from "../../assets/images/expert/timeline_grey.png";
import { Button, Chip, Grid, Stack } from "@mui/material";
import { Link } from "react-router-dom";
import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined';
import { AppRoutes } from "../../constants";
import { pendingApprovalStyle } from "../../molecules/edit-expert-navbar";
import { useIsMobile } from "../../utils/hooks/useIsMobile";
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { getCallsData } from "./expert-call-detail-tooltip/helper";
import ExpertCardsDialogDetails from "./expertCardsDialogDetails";
import { useState, useEffect } from "react";
import TooltipIcons from "../project-card-footer-icons";
import { AddToProject } from "../../organisms/expert-cards/add-to-project";
import AddToStaging from "../../organisms/experts/add-to-staging";
import { selectedCardsTypes } from "../../pages/Experts/types";
import { dialogTypes } from "../../pages/Projects/types";
import { Popover } from '@mui/material';
import { IconButtonStyle } from "../../molecules/expert-profile-sections/profile-section/styles";
import ContactMailIcon from '@mui/icons-material/ContactMail';
import ContactMail from "./ContactMail";
import TopSideMark from "./TopSideMark";
import Experience from "../../assets/images/experience.png";
import ExpertsCountsandActions from "./ExpertsCountsandActions";
import Qccheck from "../../assets/images/expert/qccheck.png";
interface ProfileCard {
  qc_notes?: string;
}
const calculateTotalExperience = (workExperiences: { start_date: string | number | Date; end_date?: string | number | Date }[]) => {
  if (!workExperiences || workExperiences.length === 0) return 0;
  const dateRanges = workExperiences.map(exp => {
    const startDate = new Date(exp.start_date);
    const endDate = exp.end_date ? new Date(exp.end_date) : new Date();
    return { startDate, endDate };
  });
  dateRanges.sort((a, b) => a.startDate.getTime() - b.startDate.getTime());
  const mergedRanges: { startDate: Date; endDate: Date }[] = [];
  let currentRange = dateRanges[0];

  for (let i = 1; i < dateRanges.length; i++) {
    if (dateRanges[i].startDate <= currentRange.endDate) {
      currentRange.endDate = new Date(Math.max(currentRange.endDate.getTime(), dateRanges[i].endDate.getTime()));
    } else {
      mergedRanges.push(currentRange);
      currentRange = dateRanges[i];
    }
  }
  mergedRanges.push(currentRange);
  return mergedRanges.reduce((total, range) => {
    const years = range.endDate.getFullYear() - range.startDate.getFullYear();
    const months = range.endDate.getMonth() - range.startDate.getMonth();
    return total + years + months / 12;
  }, 0);
};
const grayCircleStyle = {
  backgroundColor: '#e7e9e8',
  borderRadius: '50%',
  color: '#14171F',
  fontSize: '14px',
  width: '35px',
  height: '35px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
};

// type Props = {};
export default function ProfileCard(props: any) {
  const validStatuses = ["Identified", "Contacted", "Onboarding"];

  const isMobile = useIsMobile();


  const {
    id,
    name,
    type,
    status,
    primary_mobile,
    primary_email,
    price_per_hour,
    price_per_hour_currency,
    premium_expert,
    pageNo,
    picture,
    meta,
    editExpertClickHandler,
    updated_at,
    markContactedClickHandler,
    handleAcceptRefuseDialogOpen,
    updated_by_value,
    handleShowImageDialogOpen,
    handleOpenProfileLink,
    handleGenerateComplianceOpen,
    refusedReopenDialogOpen,
    handleResendComplianceOpen,
    bio,
    calls_data,
    qc_notes,

    domain_l0,
    domain_l1,
    domain_l2,
    functions,
    selected,
    toggleSelected,
    selectExpert,
    badge,
    openTimeline,
    confirmed_on,
    fk_creator_value,
    pending_edits,
    approved_by_value,
    headline,
    dnd_enabled,
    work_experiences,
    webhandles,
    internal_notes,


  } = props;
  const totalExperience = calculateTotalExperience(work_experiences);
  const [showComplainceString, showComplainceBool] = showGenerateCompliance(
    name, bio, primary_mobile, primary_email, domain_l0, domain_l1, domain_l2, meta?.relevant_company, functions, headline, price_per_hour, price_per_hour_currency
  );
  const current_company = work_experiences?.find((exp: any) => exp.currently_works_here) || meta?.current_company || null;
  const current_company_name = current_company?.company || current_company?.name || null
  const current_company_designation = current_company?.designation;

  const { enqueueSnackbar } = useSnackbar();

  const { apiData } = props;
  const { openAddExpert } = props;
  const webHand = getWebHandle("Linkedin", meta)
  const fullBankAddURL = window.location.href + "&add_bank=1";
  const showAddToProject = apiData?.status === "Confirmed";
  const [addToProjectOpen, setAddToProjectOpen] = useState(false);


  const [addToSEOpen, setAddToSEOpen] = useState(false);
  const [selectedExpert, setSelectedExpert] = useState({ label: props.name, value: props.id });

  const handleOpenSE = () => {
    setAddToSEOpen(true);
  };

  const handleCloseSE = () => {
    setAddToSEOpen(false);
  };

  const handleStageSubmit = (res: any) => {
    // Define your logic to handle the submission of the staging data
    console.log("Submit:", res);
  };

  const handleOpenAddExpert = () => {
    setAddToProjectOpen(true);
  };


  const handleCloseAddToProject = () => {
    setAddToProjectOpen(false);
  };

  const selectedCards: selectedCardsTypes = [selectedExpert];
  return (

    <><div
      style={{ background: "white", overflowX: "hidden" }}
      className={`card ${selected && selectExpert ? "checked" : ""}`}
    >
      {/* <div className="wrapper card-padding" style={{ display: 'flex', flexDirection: 'column' }}> */}
      <div
        className={`wrapper card-padding ${internal_notes ? 'with-note' : ''}`}
        style={{ display: 'flex', flexDirection: 'column', position: 'relative' }}
      >
        <div style={{ position: 'relative' }}>
          {internal_notes && internal_notes.length > 0 && (
            <TopSideMark internal_notes={internal_notes} />
          )}
        </div>


        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '5px',
            height: '100%',
          }}
        ></div>
        <div className="profile-details-container">
          <div className="flex gap-4">
            <div
              className="profile-picture-container"
              onClick={() => handleShowImageDialogOpen()}
            >
              <Avatar
                src={getPictureUrl(picture) || defaultProfileImage}
                alt="Profile name"
                className="profile-picture" />
              <div className="profile-overlay">
              </div>
              {premium_expert && (
                <img
                  className="diamond-icon"
                  src={diamondIcon}
                  alt="Premium Expert Icon" />
              )}
              {badge && (
                <ExpertBadge classname="badges" badge={badge} />
              )}
            </div>

            <div>
              <div
                className="profile-header"
                style={{ justifyContent: "flex-start", gap: "0.25rem", flexWrap: "wrap" }}
              >
                <Link
                  to={`/layout/expert-profile?id=${id}&page=${pageNo}`}
                  className="name-heading"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {name}
                </Link>

                <Stack flexDirection={"row"}>


                  {status === "Confirmed" &&
                    <>
                      <Tooltip title={headline} arrow>
                        <IconButton
                          className="info-icon"
                        >
                          <Typography
                            component="span"
                          >
                            H
                          </Typography>
                        </IconButton>

                      </Tooltip>

                    </>}
                  {webHand ? (
                    <Tooltip title="LinkedIn" arrow>
                      <IconButton
                      href={webHand?.startsWith('http://') || webHand?.startsWith('https://') ? webHand : `https://${webHand}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{
                          backgroundColor: "#0077B5",
                          width: "17px",
                          height: "17px",
                          borderRadius: "100%",
                          marginTop: '7px',
                          "& p": {
                            fontSize: "10px",
                            fontWeight: "700",
                            color: "white",
                          },
                          "&:hover": {
                            backgroundColor: "#0077B5"
                            ,
                            "& p": {
                              color: "white",
                            },
                          },

                        }}
                      >
                        <p>in</p>
                      </IconButton>
                    </Tooltip>
                  ) : (
                    <Tooltip title="LinkedIn unavailable" arrow>
                      <IconButton
                        sx={{
                          backgroundColor: "#949494",
                          width: "17px",
                          height: "17px",
                          borderRadius: "100%",
                          marginTop: '7px',
                          "& p": {
                            fontSize: "10px",
                            fontWeight: "700",
                            color: "white",
                          },
                          "&:hover": {
                            backgroundColor: "#808080"
                            ,
                            "& p": {
                              color: "white",
                            },
                          },
                        }}
                      >
                        <p>in</p>
                      </IconButton>
                    </Tooltip>
                  )}
                  {(isSuperAdmin() || isAdmin()) && qc_notes && qc_notes.length > 0 && (
                    <Tooltip
                      title={
                        <span
                          style={{
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            maxWidth:'900px',
                          }}
                        >
                          {qc_notes}
                        </span>
                      }
                      arrow
                      sx={{
                        overflow: 'hidden',
                        maxWidth:'900px',
                      }}
                    >
                      <IconButton
                        sx={{
                          height: '17px',
                          width: '17px',
                          padding: 0,
                          marginTop: '7px',
                          marginLeft: '7px',
                        }}
                      >
                        <img
                          src={Qccheck}
                          alt="QC Notes"
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'contain',
                          }}
                        />
                      </IconButton>
                    </Tooltip>
                  )}
                  <IconButton
                    className="info-icon"
                  >
                    <Typography
                      component="span"
                    >
                      <ContactMail
                        primary_mobile={primary_mobile}
                        primary_email={primary_email}
                      />
                    </Typography>
                  </IconButton>
                </Stack>
              </div>
              <div className="person-detail-subheading">
                {current_company_name && current_company_designation && (
                  <p>
                    {[current_company_name, current_company_designation].filter(d => !!d).join(", ")}
                  </p>
                )}
              </div>
            </div>
            {selectExpert && status === "Confirmed" && (
              <div className="selected-container">
                <Checkbox
                  sx={selectedContainerStyle}
                  disableRipple
                  checked={selected}
                  onChange={toggleSelected} />
              </div>
            )}
          </div>
          <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <div className="expert-tags-container"     >
              <div className="expert-tags-premium" >
                {status === "Confirmed" ? (
                  <div>
                    {/* <ExpertCallDetailTooltip expertId={id} expertName={name}> */}
                    <div>
                      <p className="expert-tags" style={{ cursor: "pointer" }}>  {type} #{id}</p>
                    </div>
                    {/* </ExpertCallDetailTooltip> */}
                  </div>
                ) : (
                  <p className="expert-tags">{type} #{id}</p>
                )}
                {dnd_enabled && <span><img src={dnd} alt="" style={{ width: '20px', height: '20px' }} /></span>}
              </div>
            </div>
            {(isSuperAdmin() && pending_edits) ?
              <Link to={`${AppRoutes.EXPERT_PENDING_APPROVAL}?id=${id}`}
                target="_blank"
                rel="noopener,noreferrer"
              >
                <Box sx={{ ...statusChip("Pending Approval"), height: "fit-content", borderRadius: { xs: "10px", sm: "38px" } }}>
                  <Typography component="p">{`${pending_edits === 1 ? "Pending Edit" : "Pending Edits"} (${pending_edits || '0'})`}</Typography>
                </Box>
              </Link> :
              <></>}
            <Box sx={statusChip(status)}>
              <Typography component="p" >{status}</Typography>
            </Box>
          </div>
        </div>
        <div className="more-detail" style={{ display: 'flex', flexDirection: isMobile ? "column" : "row", gap: isMobile ? "5px" : "1rem", justifyContent: 'space-between', marginTop: '7px' }}>
          <div className="left" style={{ display: 'flex', flexDirection: 'column', gap: '7px' }}>
            <DetailsWithIcon
              title={updatedByTooltip(status, updated_by_value, fk_creator_value, approved_by_value)[0]}
              icon={userTime}
              text={updatedByTooltip(status, updated_by_value, fk_creator_value, approved_by_value)[1]} />

            <DetailsWithIcon
              title="Total Years of Experience"
              icon={Experience}
              text={`${Math.round(totalExperience)} years`} />
          </div>

          <div className="right" style={{ display: 'flex', flexDirection: 'column', gap: '7px' }}>
            <DetailsWithIcon
              title="Cost Price"
              classNames="rupee"
              icon={money}
              text={`${price_per_hour || ""} ${price_per_hour_currency || ""}`} />
            <DetailsWithIcon
              title={confirmedOrUpdateTooltip(status, confirmed_on, updated_at)[0]}
              icon={calenderIcon}
              text={confirmedOrUpdateTooltip(status, confirmed_on, updated_at)[1]} />
          </div>
        </div>

      </div>
      <ExpertsCountsandActions
        status={status}
        id={id}
        name={name}
        calls_data={calls_data}
        fullBankAddURL={fullBankAddURL}
        handleCopy={handleCopy}
        handleOpenAddExpert={handleOpenAddExpert}
        handleOpenSE={handleOpenSE}
        openTimeline={openTimeline}
        handleOpenProfileLink={handleOpenProfileLink}
        addToSEOpen={addToSEOpen}
        handleCloseSE={handleCloseSE}
        handleStageSubmit={handleStageSubmit}
        selectedCards={selectedCards}
        addToProjectOpen={addToProjectOpen}
        handleCloseAddToProject={handleCloseAddToProject}
        selectedExpert={selectedExpert}
        editExpertClickHandler={editExpertClickHandler}
        validStatuses={validStatuses}
        timelineGrey={timelineGrey}
        EditIcon={EditIcon}
      />


      <div>
        {status !== "Confirmed" && <div className="separator-notfor-confirmed" />}

        <div className="profile-card-footer card-padding">
          {status != "Compliance Initiated" && (
          <div className="icon-container">
                {status == "Compliance Initiated" && (
                <Box className="icon-section" sx={{
                  display: 'flex',
                  gap: '15px', marginLeft: '25px',
                  alignItems: 'center',
                  justifyContent: 'flex-start',
                }}
                >
                  {(isSuperAdmin() || validStatuses.includes(status)) && (
                    <Tooltip title="Edit Expert" arrow>
                      <IconButton onClick={() => editExpertClickHandler(id)} className="info-icon">
                        <Avatar
                          sx={{
                            backgroundColor: '#e7e9e8',
                            borderRadius: '50%',
                            width: '35px',
                            height: '35px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          <img
                            alt="Edit icon"
                            src={EditIcon}
                            style={{
                              width: '16px',
                              height: '16px',
                              color: '#14171F',
                            }}
                          />
                        </Avatar>
                      </IconButton>
                    </Tooltip>
                  )}

                  <Tooltip title="Timeline" arrow>
                    <IconButton onClick={() => openTimeline(id)} className="info-icon">
                      <Avatar
                        sx={{
                          backgroundColor: '#e7e9e8',
                          borderRadius: '50%',
                          width: '35px',
                          height: '35px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <img
                          alt="Timeline"
                          src={timelineGrey}
                          style={{
                            width: '20px',
                            height: '20px',
                          }}
                        />
                      </Avatar>
                    </IconButton>
                  </Tooltip>
                </Box>
              )}
            {(isSuperAdmin() || validStatuses.includes(status)) &&
              status !== "Confirmed" &&
              status !== "Compliance Initiated" && (
                <Tooltip title="Edit Expert" arrow sx={{ marginLeft: '23px' }}>
                  <IconButton onClick={() => editExpertClickHandler(id)} className="info-icon">
                    <Avatar
                      sx={{
                        backgroundColor: '#e7e9e8',
                        borderRadius: '50%',
                        width: '35px',
                        height: '35px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <img
                        alt="Edit icon"
                        src={EditIcon}
                        style={{
                          width: '16px',
                          height: '16px',
                          color: '#14171F',
                        }}
                      />
                    </Avatar>
                  </IconButton>
                </Tooltip>
              )}

            {status !== "Confirmed" && status !== "Compliance Initiated" && (
              <>
                <Tooltip title="Timeline" arrow sx={{ marginLeft: '33px' }}>
                  <IconButton onClick={() => openTimeline(id)} className="info-icon">
                    <Avatar
                      sx={{
                        backgroundColor: '#e7e9e8',
                        borderRadius: '50%',
                        width: '35px',
                        height: '35px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <img
                        alt="Timeline"
                        src={timelineGrey}
                        style={{
                          width: '20px',
                          height: '20px',
                        }}
                      />
                    </Avatar>
                  </IconButton>
                </Tooltip>
              </>
            )}
          </div>
          )}

          {status === "Identified" && (
            <CustomBtnFilled
              label="Mark Contacted"
              variant="contained"
              onClick={() => markContactedClickHandler(id)}
            />
          )}

          {status === "Contacted" && (
            <CustomButton onClick={() => handleAcceptRefuseDialogOpen(id, "contacted")}>
              Accept / Refuse
            </CustomButton>
          )}

          {status === "Onboarding" && (
            <>
              {showComplainceBool ? (
                <CustomBtnFilled
                  label="Generate Compliance"
                  variant="contained"
                  onClick={() => handleGenerateComplianceOpen(id)}
                />
              ) : (
                <Tooltip title={showComplainceString} arrow>
                  <Box sx={generateComplainceBtnStyle}>Generate Compliance</Box>
                </Tooltip>
              )}
            </>
          )}

          {status === "Refused" && (
            <CustomButton onClick={() => refusedReopenDialogOpen(id)}>
              Reopen
            </CustomButton>
          )}

          {status === "Compliance Done" && (
            <CustomButton onClick={() => handleAcceptRefuseDialogOpen(id, "compliance")}>
              Approve / Reject
            </CustomButton>
          )}
          {(status !== "Confirmed" &&
            status === "Compliance Initiated") && (
            <Box className="icon-section" sx={{
                display: 'flex',
               gap: '15px',
                  alignItems: 'center',
                  justifyContent: 'flex-start',
                  paddingLeft: '25px'
                }}
              >                 
                  {(isSuperAdmin() || validStatuses.includes(status)) && (
                  <Tooltip title="Edit Expert" arrow>
                    <IconButton onClick={() => editExpertClickHandler(id)} className="info-icon">
                      <Avatar
                        sx={{
                          backgroundColor: '#e7e9e8',
                          borderRadius: '50%',
                          width: '35px',
                          height: '35px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <img
                          alt="Edit icon"
                          src={EditIcon}
                          style={{
                            width: '16px',
                            height: '16px',
                            color: '#14171F',
                          }}
                        />
                      </Avatar>
                    </IconButton>
                  </Tooltip>
                  )}

                  <Tooltip title="Timeline" arrow>
                    <IconButton onClick={() => openTimeline(id)} className="info-icon">
                      <Avatar
                        sx={{
                          backgroundColor: '#e7e9e8',
                          borderRadius: '50%',
                          width: '35px',
                          height: '35px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <img
                          alt="Timeline"
                          src={timelineGrey}
                          style={{
                            width: '20px',
                            height: '20px',
                          }}
                        />
                      </Avatar>
                    </IconButton>
                  </Tooltip>
                </Box>
            )}
          {(status !== "Confirmed" &&
            status === "Compliance Initiated") && (
              <Box className="button-section"
                sx={{
                  display: 'flex',
                  gap: '10px',
                  alignItems: 'center',
                  justifyContent: 'flex-end',
                }}
              >
                  <CustomBtnFilled
                    label="Resend Compliance"
                    variant="contained"
                    onClick={() => handleResendComplianceOpen(id)}
                  styles={{
                    maxHeight: '35px',
                    minWidth: '120px',
                    padding: '8px 16px',
                    borderRadius: '25px',
                    lineHeight:'1',
                  }}
                  />
                  <CustomBtnFilled
                    label="Copy tutorial link"
                    variant="outlined"
                    onClick={async () =>
                      meta.tutorial_completion_link &&
                      await handleCopy(meta.tutorial_completion_link, enqueueSnackbar, "Tutorial Link")
                    }
                  styles={{
                    maxHeight: '35px',
                    minWidth: '120px',
                    padding: '8px 16px',
                    borderRadius: '25px',
                    lineHeight:'1',
                   }}
                  />
            </Box>
            )}
        </div>
      </div>

      {/* <Stack
        direction="row"
        alignItems={"center"}
        spacing={3}
        ml={"10px"}
        mt={"12px"}
        className="profile-card-footer-icons"
      >
        <img src={AddProject} width="20px" alt="Add Project" />
        <img
          src={Link}
          width="20px"
          height="20px"
          alt="Link"
          className="link"
        />
        <ComplianceCard />
      </Stack> */}
    </div></>
  );
}


export function ExpertBadge({ badge, classname, isProfile, img_style = {} }: { badge: "Ace" | "Champion" | "Pro", classname?: string, isProfile?: boolean, img_style?: React.CSSProperties }) {
  let src;
  let style = img_style;
  if (badge === "Ace") {
    src = AceBadge
  } else if (badge === "Pro") {
    src = proBadge
    style = !isProfile ? { backgroundColor: "black", ...img_style } : {}
  } else if (badge === "Champion") {
    src = championBadge
    style = !isProfile ? { backgroundColor: "black", ...img_style } : {}
  }

  if (!src) { return <></>; }

  return (
    <Tooltip title={badge} arrow>
      <img
        src={src}
        alt="Badge for Expert"
        className={classname}
        style={style}
      />
    </Tooltip>
  )
}