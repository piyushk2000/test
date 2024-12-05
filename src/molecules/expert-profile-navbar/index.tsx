import Grid from "@mui/material/Grid";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Box, Button } from "@mui/material";
import styles from "./expert-profile-navbar.module.scss";
import { useNavigate } from "react-router-dom";
import TooltipIcons from "../../atoms/project-card-footer-icons";
import EditIcon from "../../assets/images/expert/edit.png";
import copyCode from "../../assets/images/expert/copy_code.png";
import PendingUpdates from "../../assets/images/expert/pending-tasks.png";
import Add from "../../assets/images/expert/addon.png";
import DeleteProfile from "../../assets/images/expert/delete-user.png";
import Logs from "../../assets/images/expert/logs.png";
import { handleCopy } from "../expert-profile-sections/profile-section/helper";
import { enqueueSnackbar, useSnackbar } from "notistack";
import { getReferralCode } from "../../organisms/expert-profile/helper";
import { useIsMobile } from "../../utils/hooks/useIsMobile";
import Menu from "../expert-profile-sidebar/mobile-sidebar-menu";
import { AppRoutes } from "../../constants";
import { isClient, isExpert, isFinance, isSuperAdmin } from "../../utils/role";
import { Link } from "react-router-dom";
import { useBoolean } from "../../utils/hooks/useBoolean";
import CustomMsgDialog from "../../atoms/custom-msg-dialog";
import { useGetParams } from "../../utils/hooks/useGetParams";
import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined';
import { openProfileLink } from "../../organisms/expert-cards/helper";
import { useFullPageLoading } from "../../atoms/full-page-loading/loadingContext";
import PasswordIcon from '@mui/icons-material/Password';
import { sendForgetPassLink } from "../../organisms/login/helper";

const ArrowBackIconLight = () => (
  <ArrowBackIcon sx={{ fontWeight: "100", opacity: "0.8" }} />
);

const ExpertProfileNavbar = (props: any) => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const { setLoading } = useFullPageLoading();
  const { enqueueSnackbar } = useSnackbar();
  const { id, page, openAddExpert, apiData } = props;
  const { value: isDeleteProfileClicked, setTrue: openDeleteProfile, setFalse: closeDeleteProfile } = useBoolean();
  /* 
   -- prev_page -> Prev Page is the url of the previous page, sometimes we come to expert profile from unsual routes like from calls tab
  and we want to go back to calls page, we send prev_page as a param
   -- prev_page_name -> It is the name of the preview Page
  */
  const prev_page = useGetParams("prev_page");
  const prev_page_name = useGetParams("prev_page_name");
  const pending_edits = apiData?.pending_edits;
  const showAddToProject = apiData?.status === "Confirmed";
  const primary_email = apiData?.primary_email;

  const handleBackClickHandler = () => {
    const url = prev_page || AppRoutes.EXPERT_SEARCH + "?page=" + page
    navigate(url);
  }

  return (
    <>
      <Grid className={styles["expert-navbar-container"]} sx={{ paddingTop: { xs: "0.5rem" } }} container>
        {!isMobile ? (
          <Grid
            sx={{
              alignSelf: "center"
            }}
            item
            xs={0}
            md={3}
            lg={4}
            xl={6}
          >
            {!isExpert() ?
              <Button
                sx={{
                  color: "#000000",
                  textTransform: "capitalize",
                  fontSize: "14px",
                  alignSelf: "center",
                  fontFamily: "inherit",
                }}
                onClick={handleBackClickHandler}
                disableRipple
                disableElevation
                startIcon={<ArrowBackIcon />}
              >
                <span className={styles["back-btn-title"]}>{`Back to ${prev_page_name || "Experts"}`}</span>
              </Button> : <></>
            }

          </Grid>
        ) : null}
        {isFinance() ? <></> :
          <>
            <Grid
              className={styles["navbar-btns-container"]}
              item
              xs={10}
              md={9}
              lg={8}
              xl={6}
            >
              <>
                <div className={styles["navbar-btns"]}>
                  {(isMobile && !isExpert()) ? (
                    <TooltipIcons
                      isIcon={false}
                      isMaterialIcon={true}
                      MaterialIcon={ArrowBackIconLight}
                      title="Back to Experts"
                      handleClick={handleBackClickHandler}
                    />
                  ) : null}
                  {!isClient() ? <>
                    <TooltipIcons
                      icon={EditIcon}
                      isIcon={true}
                      title="Edit"
                      isDisabled={props.isBtnDisabled}
                      handleClick={() => {
                        const url = isExpert() ? `/layout/expert-profile/edit?id=${id}` : `/layout/expert-profile/edit?id=${id}&page=${page}`
                        navigate(url)
                      }}
                    />
                    <Box sx={{
                      position: "relative"
                    }}>
                      <Link
                        to={`${AppRoutes.EXPERT_PENDING_APPROVAL}?id=${id}`}
                        target="_blank" rel="noreferrer,noopener"
                      >
                        <>
                          <TooltipIcons
                            icon={PendingUpdates}
                            title="Pending Edits"
                            isIcon={true}
                          />
                          {pending_edits ?
                            <p
                              style={{
                                position: "absolute",
                                top: "-5px",
                                right: "-5px",
                                color: "white",
                                backgroundColor: "#ec9324",
                                fontSize: "11px",
                                fontWeight: "500",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                width: "22px",
                                height: "22px",
                                borderRadius: "100%",
                              }}
                            >{pending_edits || 0}</p> : null
                          }
                        </>
                      </Link>
                    </Box>
                    {!isExpert() &&
                      <>
                        {apiData?.status === "Confirmed" &&
                          <TooltipIcons
                            icon={copyCode}
                            isIcon={true}
                            title="Copy Profile Link"
                            isDisabled={props.isBtnDisabled}
                            handleClick={async () => await openProfileLink(id, setLoading, enqueueSnackbar)}
                          />
                        }

                        {isSuperAdmin() &&
                          <TooltipIcons
                            MaterialIcon={PasswordIcon}
                            isIcon={false}
                            isMaterialIcon={true}
                            title="Reset Password"
                            handleClick={async () => await sendForgetPassLink(primary_email, () => { }, setLoading, enqueueSnackbar, true)}
                          />
                        }
                        <TooltipIcons
                          isIcon={false}
                          text="RC"
                          title="Copy Referral Code"
                          isDisabled={props.isBtnDisabled}
                          handleClick={() =>
                            handleCopy(getReferralCode(id), enqueueSnackbar, "Referral Code")
                          }
                        />
                        {showAddToProject &&
                          <TooltipIcons
                            icon={Add}
                            isIcon={true}
                            title="Add to Projects"
                            handleClick={openAddExpert}
                          />
                        }
                        <TooltipIcons
                          icon={DeleteProfile}
                          isIcon={true}
                          title="Delete Profile"
                          handleClick={openDeleteProfile}
                        />

                        {/* <TooltipIcons icon={Logs} isIcon={true} title="Logs" /> */}
                      </>
                    }
                  </> :
                    <>
                      <TooltipIcons
                        icon={Add}
                        isIcon={true}
                        title="Request Call"
                        handleClick={openAddExpert}
                      />
                    </>}
                </div>
              </>
            </Grid>
            <Grid
              item
              xs={2}
            >
              {(isMobile && !isClient()) ? <Menu {...props} /> : null}
            </Grid>
          </>
        }
      </Grid>

      {/* Delete Profile Dialog */}
      <CustomMsgDialog
        isOpen={isDeleteProfileClicked}
        handleClose={closeDeleteProfile}
        title="Delete Profile"
        text="This functionality is not yet available."
      />
    </>

  );
};
export default ExpertProfileNavbar;
