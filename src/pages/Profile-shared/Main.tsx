import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Grid";
import "./style.scss";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import CloseIcon from '@mui/icons-material/Close';
import Avatar from "@mui/material/Avatar";
import defaultProfileImage from "../../assets/images/expert/default_profle_image.png";
import diamondIcon from "../../assets/images/expert/diamond_expert.png";
import { getPictureUrl } from "../../organisms/expert-cards/helper";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import CustomBtnFilled from "../../atoms/form-molecules/CustomBtnFilled";
import { Expert, PECompliance } from "./types";
import SharedExpertDetails from "../../organisms/profile-shared/expert-details";
import { useProfileSharedContext } from "./context";
import Chip from "@mui/material/Chip";
import { statusChipStyle } from "../../organisms/project/project-pe-mapping/list-view/style";
// import InvitationChip from "../../atoms/project-details/invitationChip";
// import PEStatusChip from "../../atoms/project-details/agendaStatusChip";
import { AppRoutes } from "../../constants";
import useModals from "../../utils/hooks/useModals";
import DialogModal from "../../atoms/dialog";
import AgendaPrevDescription from "../../organisms/project/project-agenda/project-agenda-description/AgendaDescription";
import { ExpertBadge } from "../../atoms/profile-cardV1/ProfileCardV1";
import RequestMoreInformationForm from "../../organisms/profile-shared/request-more-information";
import RequestCallForm from "../../organisms/profile-shared/request-call-form";
import NoResultFoundFilters from "../../atoms/noResultsFilters";
import { useGetParams } from "../../utils/hooks/useGetParams";
import { useIsMobile } from "../../utils/hooks/useIsMobile";
import { PeComplianceData } from "../../organisms/project/project-pe-mapping/type";
import { Button, Tooltip, Typography } from "@mui/material";
import { getPEDetails, showAcceptReject } from "./helper";
import { ShowAnswersDialog } from "../../organisms/project/project-pe-mapping/actions/show-answers";
import { useBoolean } from "../../utils/hooks/useBoolean";
import { ReviewCompliance } from "../../organisms/project/project-pe-mapping/actions/review-compliance";
import { getTimeAgo } from "../../utils/timezoneService";

const drawerWidth = "65%";

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginRight: `-${drawerWidth}`,
  ...(open && {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: 0,
  }),
  paddingRight: "2rem",
  paddingTop: "2rem",
  /**
   * This is necessary to enable the selection of content. In the DOM, the stacking order is determined
   * by the order of appearance. Following this rule, elements appearing later in the markup will overlay
   * those that appear earlier. Since the Drawer comes after the Main content, this adjustment ensures
   * proper interaction with the underlying content.
   */
  position: "relative",
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // ...theme.mixins.toolbar,
  justifyContent: "flex-start",
}));


export default function ProfilesSharedExperts(
  { openLoginWarning, peComplianceData, refetch }: { openLoginWarning: () => void, peComplianceData: PECompliance, refetch: () => Promise<void> }
) {

  const expertId = useGetParams("expert_id");
  const isMobile = useIsMobile();
  const [selectedExpert, setSelectedExpert] = React.useState<Expert | null>(
    null
  );
  const { expertData, loading, projectDetails, filterPayload } = useProfileSharedContext();
  const [modalStates, modalAction] = useModals([
    "agendaModal",
    "requestMoreInfoModal",
    "requestCallModal"
  ]);

  const isLoggedIn = localStorage.getItem("authToken");

  React.useEffect(() => {
    if (expertData && expertData.length) {
      if (expertId) {
        const selectedExpert = expertData.find(e => e.fk_expert === parseInt(expertId));
        if (selectedExpert) {
          setSelectedExpert(selectedExpert);
        }
      } else {
        setSelectedExpert(expertData[0]);
      }
    }
    //eslint-disable-next-line
  }, [loading, expertData, expertId]);

  const open = !!selectedExpert;

  const handleCardClick = (expert: Expert) => {
    setSelectedExpert(expert);
  };

  const handleDrawerClose = () => {
    setSelectedExpert(null);
  };

  return (
    <>
      {/* <ProfileSharedNavbar /> */}
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <Main open={open}>
          <DrawerHeader />
          <Grid container spacing={1}>
            {expertData && !loading ?
              <>{expertData.length ?
                <>
                  {
                    expertData?.map((expert, index) => (
                      <Grid item key={expert.id} xs={12} sm={6} md={12}>
                        <ProfileCard
                          {...expert}
                          onClick={() => handleCardClick(expert)}
                          selected={expert.fk_expert === selectedExpert?.fk_expert}
                          expertName={expert.expert_name}
                          designation={expert.relevant_designation}
                          companyName={expert.relevant_company}
                          location={expert.relevant_company_location}
                          onRequestCall={() => {
                            if (!isLoggedIn) {
                              openLoginWarning();
                              return
                            }
                            handleCardClick(expert)
                            modalAction.requestCallModal.openModal()
                          }}
                          peCompliance={peComplianceData.find(d => d.fk_pe === expert.id)}
                          onDeclineCall={() => {
                            if (!isLoggedIn) {
                              openLoginWarning();
                              return
                            }
                          }}
                          openLoginWarning={openLoginWarning}
                          isLoggedIn={isLoggedIn}
                          modalStates={modalStates}
                          modalAction={modalAction}
                          refetch={refetch}
                        />

                      </Grid>
                    ))
                  }
                </> :
                <NoResultFoundFilters text={
                  filterPayload.complianceChecked ?
                    "No Pending Compliance Expert Profiles to show"
                    : "No Expert Profiles to show for this Project"
                } />}
              </>
              : (
                <Grid container item xs={12}>
                  <Grid item xs={12}>
                    <Skeleton height={200} />
                  </Grid>
                  <Grid item xs={12}>
                    <Skeleton height={200} />
                  </Grid>
                  <Grid item xs={12}>
                    <Skeleton height={200} />
                  </Grid>
                </Grid>
              )}
          </Grid>
        </Main>
        {expertData && expertData.length > 0 &&
          <Drawer
            sx={{
              width: drawerWidth,
              flexShrink: 0,
              "& .MuiDrawer-paper": {
                width: {
                  xs: "100%",
                  sm: drawerWidth
                },
                boxShadow:
                  "-10px 0 15px -3px rgba(0, 0, 0, 0.1), -4px 0 6px -2px rgba(0, 0, 0, 0.05)",
              },
            }}
            variant="persistent"
            anchor="right"
            open={open}
          >
            <DrawerHeader>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  width: "100%",
                  padding: "0.25rem 0"
                }}
              >
                {!isMobile &&
                  <IconButton onClick={handleDrawerClose}>
                    <KeyboardDoubleArrowRightIcon />
                  </IconButton>
                }

                {selectedExpert ? (
                  <Stack
                    gap="1rem"
                    display="flex"
                    alignItems="center"
                    flexDirection="row"
                  >
                    {selectedExpert.agenda_responses ? (
                      <CustomBtnFilled
                        label={"Agenda Response"}
                        variant="contained"
                        styles={{
                          background: "#F7DFC3",
                          color: "#252B3B",
                        }}
                        onClick={isLoggedIn ? modalAction.agendaModal.openModal : openLoginWarning}
                      />
                    ) : null}
                    <CustomBtnFilled
                      label={"View Availability"}
                      variant="contained"
                      styles={{
                        background: "#F7DFC3",
                        color: "#252B3B",
                      }}
                      onClick={() => {
                        if (!isLoggedIn) {
                          openLoginWarning();
                          return
                        }
                        const url =
                          AppRoutes.CALENDER +
                          "?id=" +
                          selectedExpert.fk_project +
                          "&expertId=" +
                          selectedExpert.fk_expert
                          + "&not_show_calls=1";
                        window.open(url, "_blank");
                      }}
                    />

                    <RequestMoreInformationForm
                      open={modalStates.requestMoreInfoModal}
                      handleClose={modalAction.requestMoreInfoModal.closeModal}
                      expertName={selectedExpert.expert_name}
                      isRequestAgendaValid={!!projectDetails?.applicable_agenda_id && !selectedExpert.agenda_responses}
                      peId={selectedExpert.id}
                    />
                    <RequestCallForm
                      open={modalStates.requestCallModal}
                      handleClose={modalAction.requestCallModal.closeModal}
                      expertName={selectedExpert.expert_name}
                      peId={selectedExpert.id}
                      expertId={selectedExpert.fk_expert}
                      projectId={selectedExpert.fk_project}
                    />

                    <CustomBtnFilled
                      label={"Request More Info"}
                      variant="contained"
                      styles={{
                        background: "#F7DFC3",
                        color: "#252B3B",
                      }}
                      onClick={isLoggedIn ? modalAction.requestMoreInfoModal.openModal : openLoginWarning}
                    />

                    {selectedExpert.agenda_responses ? (
                      <DialogModal
                        isOpen={modalStates.agendaModal}
                        handleClose={modalAction.agendaModal.closeModal}
                        title={"Agenda Response of " + selectedExpert.expert_name}
                      >
                        <AgendaPrevDescription
                          fk_agenda={selectedExpert.fk_agenda || null}
                          agenda_responses={
                            selectedExpert.agenda_responses || null
                          }
                          handleClose={modalAction.agendaModal.closeModal}
                          editBtnClickHandler={function (): void { }}
                          isAdminAllowed={false} // because the profile shared is for Clients
                          isProjectOpen={false}
                        />
                      </DialogModal>
                    ) : null}
                  </Stack>
                ) : null}
                {isMobile &&
                  <IconButton onClick={handleDrawerClose}>
                    <CloseIcon />
                  </IconButton>
                }
              </Box>
            </DrawerHeader>
            <Divider />
            {selectedExpert ? (
              <SharedExpertDetails
                expertId={selectedExpert.fk_expert}
                extraDetails={selectedExpert}
                isLoggedIn={!!isLoggedIn}
                openLoginWarning={openLoginWarning}
              />
            ) : null}
          </Drawer>
        }

      </Box>
    </>
  );
}

function ProfileCard(props: any) {
  const {
    selected,
    onClick,
    expertName,
    designation,
    companyName,
    state,
    meta,
    location,
    premium_expert,
    badge,
    picture,
    onRequestCall,
    onDeclineCall,
    peCompliance,
    client_compliance_requirement,
    csc_marked_completed_by,
    compliance_shared,
    refetch,
    openLoginWarning,
    isLoggedIn
    // agenda_shared_on,
    // agenda_responses,
    // expert_invitation
  } = props;

  const pe_compliance: PeComplianceData | null = peCompliance || null;
  const { value: isPeCompliance, setTrue: openPeCompliance, setFalse: closePeCompliance } = useBoolean();
  const { value: isClientReview, setTrue: openClientReview, setFalse: closeClientReview } = useBoolean();
  const show_accept_reject = showAcceptReject(state, client_compliance_requirement, !!compliance_shared, !!csc_marked_completed_by);



  const shared_on_time = meta?.shared_on && getTimeAgo(meta?.shared_on)
  return (
    <>
      <div
        style={{ background: "white" }}
        className={`card ${selected ? "checked" : ""}`}
        onClick={onClick}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', width:'85%' }}>
            <div className="wrapper card-padding">
              <div className="profile-details-container">
                <div className="flex gap-4">
                  <div
                    className="profile-picture-container"
                    style={{ alignSelf: "flex-start" }}
                  >
                    <Avatar
                      src={getPictureUrl(picture) || defaultProfileImage}
                      alt="Profile name"
                      className="profile-picture"
                    />
                    {premium_expert && (
                      <img
                        className="diamond-icon"
                        src={diamondIcon}
                        alt="Premium Expert Icon"
                      />
                    )}
                    {badge && <ExpertBadge classname="badges" badge={badge} />}
                  </div>

                  <div>
                    <div
                      className="profile-header"
                      style={{ justifyContent: "space-between" }}
                    >
                      <p className="name-heading">{expertName}</p>

                    </div>

                    <div className="person-detail-subheading">
                      {designation && companyName ? (
                        <p>
                          {[designation, companyName, location]
                            .filter((i) => !!i)
                            .join(", ")}
                        </p>
                      ) : null}
                      {meta?.selling_price && (
                        <p>
                          Selling Price: {meta?.selling_price}{" "}
                          {meta?.selling_price_currency}
                        </p>
                      )}
                      {meta?.time_multiplier &&
                        <p>
                          Multiplier: {meta.time_multiplier}
                        </p>
                      }
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Box>
          <Box sx={{ display: 'flex', }}>
            {shared_on_time &&
              <Tooltip title={"Shared on"} arrow>
                <Typography sx={{ cursor: "pointer" , fontSize:10, mr:2 }} variant="subtitle1" > {shared_on_time}</Typography>
              </Tooltip>}
          </Box>
        </Box>


        <div className="card-padding">
          <Stack
            direction="row"
            alignItems={"center"}
            justifyContent={"space-between"}
            spacing={3}
            mt={2}
            mb={2}
          >
            <Chip sx={statusChipStyle(state)} label={state} />
            {show_accept_reject ? (
              <Stack
                direction="row"
                alignItems={"center"}
                justifyContent={"flex-end"}
                spacing={3}
                sx={{ flexWrap: "wrap" }}
                mt={2}
              >
                <CustomBtnFilled
                  label="Request Call"
                  variant="contained"
                  styles={{
                    background: "#797B3A",
                    justifySelf: "flex-end",

                  }}
                  onClick={onRequestCall}
                />
                <CustomBtnFilled
                  label="Reject"
                  variant="contained"
                  styles={{
                    background: "#EC6224",
                    justifySelf: "flex-end",

                  }}
                  onClick={onDeclineCall}
                />
              </Stack>) :
              (<ComplianceBtn
                isLoggedIn={isLoggedIn}
                pe_compliance={pe_compliance}
                openClientReview={openClientReview}
                openLoginWarning={openLoginWarning}
                openPeCompliance={openPeCompliance}
              />
              )}

          </Stack>
          {show_accept_reject &&
            <ComplianceBtn
              isLoggedIn={isLoggedIn}
              pe_compliance={pe_compliance}
              openClientReview={openClientReview}
              openLoginWarning={openLoginWarning}
              openPeCompliance={openPeCompliance}
            />
          }
        </div>
      </div>


      {/* Show Answers*/}
      {pe_compliance && isPeCompliance &&
        <ShowAnswersDialog
          isOpen={isPeCompliance}
          show_reviewed_by={{ status: pe_compliance?.status || "", name: pe_compliance?.final_reviewed_by_value?.name || "", date: pe_compliance?.final_reviewed_on || "" }}
          proof_url={pe_compliance?.meta?.client_compliance_proof_url}
          answers={pe_compliance?.answers || []}
          handleClose={closePeCompliance}
          isInfo={false}
        />}

      {/* Review Compliance */}
      {isClientReview &&
        <ReviewCompliance
          isOpen={isClientReview}
          pe_compliance={pe_compliance}
          handleClose={closeClientReview}
          refetch={refetch}
          openLoginWarning={isLoggedIn ? undefined : openLoginWarning}
        />
      }

    </>
  );
}

type BtnProps = {
  isLoggedIn: boolean;
  openLoginWarning(): void;
  pe_compliance: any;
  openClientReview(): void;
  openPeCompliance(): void;
}


function ComplianceBtn({ isLoggedIn, openLoginWarning, pe_compliance, openClientReview, openPeCompliance }: BtnProps) {
  const { state: pe_state, hover: pe_hover, name: pe_name, bg: pe_bg } = getPEDetails(pe_compliance);

  return (
    <>
      {pe_state &&
        <Tooltip title={pe_hover} arrow>
          <Button
            onClick={!isLoggedIn ? openLoginWarning : (pe_compliance?.status === "SharedWithClient" ? openClientReview : openPeCompliance)}
            sx={{
              border: "1px solid grey",

              color: pe_bg === "var(--primary-color)" ? "black" : "white",
              fontSize: "12px",
              borderRadius: "15px",
              textTransform: "capitalize",
              padding: "5px 15px",
              background: pe_bg,
              boxShadow: "none",
              fontFamily: "inherit"
            }}
            size="small"
            variant={"contained"}
          >
            {pe_name}
          </Button>
        </Tooltip>}
    </>
  )
}