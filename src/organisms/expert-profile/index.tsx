import "../project-detail/project-detail-card/project-detail-cards.scss";
import Box from "@mui/material/Box";
import "./expert-profile.scss";
import ExpertProfileHeader from "../../molecules/app-bars/expert-profile";
import ExpertProfileNavbar from "../../molecules/expert-profile-navbar";
import ExpertProfileSidebar from "../../molecules/expert-profile-sidebar";
import ProfileSection from "../../molecules/expert-profile-sections/profile-section/ProfileSection";
import PersonalInfoSection from "../../molecules/expert-profile-sections/personal-info-section/PersonalInfoSection";
import BasicDetailSection from "../../molecules/expert-profile-sections/basic-details-section/BasicDetailSection";
import AboutSection from "../../molecules/expert-profile-sections/about-section/AboutSection";
import ExperienceSection from "../../molecules/expert-profile-sections/experience-section/ExperienceSection";
import EducationSection from "../../molecules/expert-profile-sections/education-section/EducationSection";
import AwardSection from "../../molecules/expert-profile-sections/award-section/AwardSection";
import WebHandleSection from "../../molecules/expert-profile-sections/web-handle-section/WebHandleSection";
import SnippetSection from "../../molecules/expert-profile-sections/snippet-section/SnippetSection";
import AttachmentSection from "../../molecules/expert-profile-sidebar/attachment-section/AttachmentSection";
import { useEffect, useState } from "react";
import TimelineSection from "../../molecules/expert-profile-sidebar/timeline-section/TimelineSection";
import BankDetailSection from "../../molecules/expert-profile-sidebar/bank-details-section/BankDetailSection";
import {
  alertNBackdropOpen,
  dialogState,
  ElementsDataType,
  eraseTimelineData,
  expertProfileSectionStyle,
  getAllProfileDetails,
  getTimelineFn,
  handleAlertBoxClose,
  handleAlertBoxYesClick,
  handleClose,
  handleSubmitClose,
  openAddPEForm,
  toggleAttachmentSection,
  toggleBankDetailsSection,
  toggleTimelineSection,
} from "./helper";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import PublicationSection from "../../molecules/expert-profile-sections/publication-section/pubSection";
import PatentSection from "../../molecules/expert-profile-sections/patent-section/patent";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import ImageUploadDialog from "../../molecules/image-upload/imageUploadDialog";
import { handleImageUpload } from "../expert-cards/helper";
import { useIsMobile } from "../../utils/hooks/useIsMobile";
import MobileModal from "../../atoms/mobile-modal";
import ExpertProfileLoading from "../../atoms/skeletons/exprtProfileSkeletons";
import WarningDialog from "../../molecules/form-close-warning";
import AddPE from "../project/project-add-pe-form";
import DialogModal from "../../atoms/dialog";
import TimelineFiltersDialog from "./timeline-filters-dialog/dialog";
import { isClient, isExpert, isInfollion } from "../../utils/role";
import { AppRoutes } from "../../constants";
import ProfilePictureDialog from "../../atoms/profile-picture-dialog";
import { useSnackbar } from "notistack";
import FullPageLoading from "../../atoms/full-page-loading";
import FormCancelSubmitBtns from "../../atoms/formCancelSubmitBtns";
import InternalInfoSection from "../../molecules/expert-profile-sections/internal-info-section/BasicDetailSection";
import NoResultFoundFilters from "../../atoms/noResultsFilters";

const ExpertProfile = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const is_add_bank_open = !!(searchParams.get("add_bank"))
  const [showElements, setShowElements] = useState<any>({
    showAttachment: false,
    showTimeline: false,
    showBankDetails: is_add_bank_open,
  });
  const [elementsData, setElementsData] = useState<ElementsDataType>({
    attachment: null,
    timeline: {
      data: null,
      messages: null,
      filters: {
        actor: null,
        action: null,
        date: null,
        isFilterChange: false,
        filterAdded: false,
      },
    },
  });
  const [openDialog, setOpenDialog] = useState<dialogState>({
    uploadImage: false,
    deleteImage: false,
    showImage: false,
    addPE: { state: false, isChange: false },
    timelineFilters: { state: false },
  });
  const [alertNBackdrop, setAlertNBackdrop] = useState<alertNBackdropOpen>({
    alert: false,
    backdrop: false,
  });
  const [apiData, setApiData] = useState<any>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { enqueueSnackbar } = useSnackbar();
  const queryParams = new URLSearchParams(location.search);
  const isMobile = useIsMobile();
  let id = queryParams.get("id");
  let e = queryParams.get("e");
  let page = queryParams.get("page");
  const expert_id = localStorage.getItem("expert_id");

  function refetch() {
    if (id) {
      setApiData(null);
      getAllProfileDetails(id, setApiData);
    }
  }

  function removeAddbankFromUrl() {
    const param = searchParams.get('add_bank');

    if (param) {
      searchParams.delete('add_bank');
      setSearchParams(searchParams);
    }
  }

  useEffect(() => {
    if (id || e) {
      setApiData(null);
      getAllProfileDetails(id, setApiData, undefined, e);

      // If the id is null and user is an expert and expert_id is present, get id from expert_id
    } else if (isExpert() && expert_id) {
      navigate(`${AppRoutes.EXPERT_PROFILE}?id=${expert_id}`)
    }

    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, e]);

  useEffect(() => {
    if (id && showElements.showTimeline) {
      getTimelineFn(id, setElementsData, elementsData.timeline.filters);
    } else if (!showElements.showTimeline) {
      eraseTimelineData(setElementsData);

    }
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showElements.showTimeline]);

  useEffect(() => {
    if (id && elementsData.timeline.filters.isFilterChange) {
      getTimelineFn(id, setElementsData, elementsData.timeline.filters);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [elementsData.timeline.filters.isFilterChange]);

  //compliance Logic

  const [hasComplied, setHasComplied] = useState<boolean>(true) //true (by default): if the expert has Complied 
  const [showComplianceDialogue, setShowComplianceDialogue] = useState<boolean>(false) // 


  useEffect(() => {
    if (apiData?.status === "Compliance Initiated" && isExpert() && !apiData?.tutorial_taken_timestamp) {
      setHasComplied(() => false)
      setShowComplianceDialogue(() => true)
    }
  }, apiData)


  if (!id && !e) {
    return <></>
  }

  return (
    <>
      <FullPageLoading />
      <Box className="header">
        <ExpertProfileHeader
          onTermsNConditionsClick={() => { apiData.meta.tutorial_completion_link && window.open(apiData.meta.tutorial_completion_link, '_blank', 'noopener,noreferrer'); }}
          headerMessage={!hasComplied && "To start Taking up Engagements with Infollion. Please Sign Terms & Conditions"}
        />
        <Box className="expert-profile">
          <Box
            className="expert-profile-section"
            sx={() => expertProfileSectionStyle(showElements)}
          >
            {!isInfollion() &&
              <ExpertProfileNavbar
                id={id}
                page={page}
                apiData={apiData}
                isBtnDisabled={apiData ? false : true}
                toggleAttachment={() => toggleAttachmentSection(setShowElements)}
                toggleTimeline={() => toggleTimelineSection(setShowElements)}
                toggleBankDetailsSection={() =>
                  toggleBankDetailsSection(setShowElements)
                }
                openAddExpert={() => openAddPEForm(setOpenDialog)}
              />
            }

            {apiData ? (
              <>
                <ProfileSection
                  showSection={showElements.showAttachment}
                  showTimeline={showElements.showTimeline}
                  apiData={apiData}
                  handleShowImageDialogOpen={() =>
                    setOpenDialog((prev) => ({ ...prev, showImage: true }))
                  }
                />
                {!isClient() && !isInfollion() && <PersonalInfoSection apiData={apiData} />}
                <BasicDetailSection apiData={apiData} />
                <AboutSection apiData={apiData} />
                <ExperienceSection apiData={apiData} />
                <EducationSection apiData={apiData} />
                <AwardSection apiData={apiData} />
                <PublicationSection apiData={apiData} />
                <PatentSection apiData={apiData} />
                {!isClient() && !isInfollion() && !showElements.showBankDetails && (
                  <WebHandleSection apiData={apiData} />
                )}
                {!isExpert() && !isClient() && !isInfollion() && !showElements.showBankDetails && (
                  <SnippetSection apiData={apiData} />
                )}
                {
                  !isExpert() && !isClient() && !isInfollion() && (
                    <InternalInfoSection apiData={apiData} />
                  )
                }

                {/* ADD PE */}
                <DialogModal
                  isOpen={openDialog.addPE.state}
                  handleClose={() =>
                    handleClose(
                      openDialog.addPE.isChange,
                      setAlertNBackdrop,
                      setOpenDialog
                    )
                  }
                  title={isClient() ? "Request Call" : "Add to a Project"}
                >
                  {apiData.dnd_enabled ?
                  <NoResultFoundFilters sx={{marginBottom: "30px"}} text="Expert's DND on. Cannot add to projects." />
                  : <AddPE
                      handleClose={() =>
                        handleClose(
                          openDialog.addPE.isChange,
                          setAlertNBackdrop,
                          setOpenDialog
                        )
                      }
                      handleSubmitClose={() => handleSubmitClose(setOpenDialog)}
                      selectedExpert={
                        id &&
                        apiData && {
                          label: `ID: ${id}, ${apiData.name}`,
                          value: parseInt(id),
                        }
                      }
                      isProjectField={true}
                      handleChangeForm={() => {
                        setOpenDialog((prev: dialogState) => {
                          if (!prev.addPE.isChange) {
                            return {
                              ...prev,
                              addPE: { ...prev.addPE, isChange: true },
                            };
                          }
                          return prev;
                        });
                      }}
                    />
                  }

                </DialogModal>
              </>
            ) : (
              <ExpertProfileLoading />
            )}
          </Box>
          <>
            {!isClient() && !isInfollion() &&
              <Box className="expert-profile-sidebar">
                {!isMobile ? (
                  <ExpertProfileSidebar
                    toggleAttachment={() =>
                      toggleAttachmentSection(setShowElements)
                    }
                    showAttachment={showElements.showAttachment}
                    showTimeline={showElements.showTimeline}
                    toggleTimeline={() => toggleTimelineSection(setShowElements)}
                    toggleBankDetailsSection={() =>
                      toggleBankDetailsSection(setShowElements)
                    }
                  />
                ) : null}
                {showElements.showAttachment && (
                  <MobileModal
                    onClose={() => toggleAttachmentSection(setShowElements)}
                  >
                    <AttachmentSection
                      closeAttachment={() =>
                        toggleAttachmentSection(setShowElements)
                      }
                      getAllProfileDetails={async () =>
                        await getAllProfileDetails(id, setApiData)
                      }
                      pe_certificate_url={apiData?.no_pe_certificate}
                    />
                  </MobileModal>
                )}
                {showElements.showTimeline && (
                  <MobileModal
                    onClose={() => toggleTimelineSection(setShowElements)}
                  >
                    <TimelineSection
                      closeTimeline={() => toggleTimelineSection(setShowElements)}
                      timelineData={elementsData?.timeline}
                      openTimelineFilters={() =>
                        setOpenDialog((prev) => ({
                          ...prev,
                          timelineFilters: { state: true },
                        }))
                      }
                      isFilterAdded={elementsData.timeline.filters.filterAdded}
                    />
                  </MobileModal>
                )}
                {showElements.showBankDetails && (
                  <MobileModal
                    onClose={() => toggleBankDetailsSection(setShowElements)}
                  >
                    <BankDetailSection
                      closeBankDetailSection={() => toggleBankDetailsSection(setShowElements)}
                      primaryBankId={apiData?.primary_bank}
                      refresh={refetch}
                      isAddBankOpen={is_add_bank_open}
                      removeAddbankFromUrl={removeAddbankFromUrl}
                    />
                  </MobileModal>
                )}
              </Box>
            }
          </>

        </Box>
      </Box>
      {showComplianceDialogue &&
        <DialogModal
          isOpen={!hasComplied}
          title="Complete your Compliance"
          handleClose={() => { setShowComplianceDialogue(() => false) }}
        >
          <Box sx={{
            marginTop: "8px",
            "& > p": {
              fontSize: "14px"
            },
            "& strong": {
              fontWeight: "500"
            }
          }}>
            <FormCancelSubmitBtns submitLabel="Complete Compliance" cancelLabel="Skip" handleSubmitBtnClick={() => { apiData.meta.tutorial_completion_link && window.open(apiData.meta.tutorial_completion_link, '_blank', 'noopener,noreferrer'); }} handleClose={() => { setShowComplianceDialogue(() => false) }} />
          </Box>
        </DialogModal>
      }

      {openDialog.showImage && apiData &&
        <ProfilePictureDialog
          isOpen={openDialog.showImage}
          handleClose={() => handleSubmitClose(setOpenDialog)}
          image={apiData.picture}
          openEditDialog={() => setOpenDialog((prev) => ({ ...prev, uploadImage: true }))}
          openDeleteDialog={() => setOpenDialog((prev) => ({ ...prev, deleteImage: true }))}
        />
      }


      {!isClient() && !isInfollion() &&
        <>
          {/* Image Upload Dialog */}
          <ImageUploadDialog
            isOpen={openDialog.uploadImage}
            handleClose={() => handleSubmitClose(setOpenDialog)}
            handleImageUpload={(image: any, setBackdrop: any, handleClose: any) =>
              handleImageUpload(
                image,
                id,
                setBackdrop,
                handleClose,
                setApiData,
                true,
                enqueueSnackbar,
              )
            }
            setBackdrop={(bool: boolean) => {
              setAlertNBackdrop((prev: alertNBackdropOpen) => ({
                ...prev,
                backdrop: bool,
              }));
            }}
          />

          {/* Delete Image Warning Dialog */}
          {openDialog.deleteImage &&
            <WarningDialog
              open={openDialog.deleteImage}
              handleClose={() => { setOpenDialog((prev) => ({ ...prev, deleteImage: false })) }}
              handleYesClick={() => handleImageUpload(
                null,
                id,
                (bool: boolean) => {
                  setAlertNBackdrop((prev: alertNBackdropOpen) => ({
                    ...prev,
                    backdrop: bool,
                  }));
                },
                handleSubmitClose,
                setApiData,
                false,
                enqueueSnackbar,
                true)}
              text="Are you sure you want to delete the profile picture?"
            />
          }

          {/* Timeline Filters */}
          <TimelineFiltersDialog
            timelineState={showElements.showTimeline}
            isOpen={openDialog.timelineFilters.state}
            handleClose={() => handleSubmitClose(setOpenDialog)}
            setElementsData={(action,
              actor,
              date,
              filterAdded) => {
              setElementsData((prev) => ({
                ...prev,
                timeline: {
                  ...prev.timeline,
                  filters: {
                    ...prev.timeline.filters,
                    action,
                    actor,
                    date,
                    filterAdded,
                    isFilterChange: true,
                  },
                },
              }));
            }}
          />

        </>}

      {/* Form Close Warning */}
      <WarningDialog
        handleClose={() => handleAlertBoxClose(setAlertNBackdrop)}
        handleYesClick={() =>
          handleAlertBoxYesClick(setAlertNBackdrop, setOpenDialog)
        }
        open={alertNBackdrop.alert}
      />

      {/* Backdrop */}
      <Backdrop
        sx={{ color: "#fff", zIndex: 2000 }}
        open={alertNBackdrop.backdrop}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
};
export default ExpertProfile;
