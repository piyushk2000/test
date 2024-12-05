import { useCallback, useEffect, useState } from "react";
import {
  AlertNBackdropOpen,
  SelectExpert,
  SharedProfiles,
  isDialogState,
  projectPEMappingDataState,
} from "./type";
import {
  ActionsDefaultValue,
  PeMappingContext,
  bulkRevertHandler,
  getPeMappingData,
  handleAlertBoxClose,
  handleAlertBoxYesClick,
  handleClose,
  handleFormChange,
  handleSubmitClose,
  resetFilters,
  shareAgendaHandler,
} from "./helper";
import PEExpertMappingListView from "./list-view";
import WarningDialog from "../../../molecules/form-close-warning";
import DialogModal from "../../../atoms/dialog";
import ShortlistExpert from "./actions/shortlist";
import BackdropComponent from "../../../atoms/backdropComponent";
import PeMappingHeader from "../../../molecules/app-bars/pe-mapping-page";
import NoResultFoundFilters from "../../../atoms/noResultsFilters";
import PeFilterDialog from "./filters/dialog";
import IconDefinitionDialog from "../../../atoms/icon-definition-dialog";
import ScheduleCall from "./actions/schedule-call";
import PEExpertMappingCardView from "./card-view";
import InviteExpertPE from "./actions/invite-expert";
import { useGetParams } from "../../../utils/hooks/useGetParams";
import { useSnackbar } from "notistack";
import ShareProfileDialog from "./actions/share-profile/dialog";
import PendingComplianceDialog from "./actions/pending-compliance";
import { useNavigate } from "react-router-dom";
import { AppRoutes } from "../../../constants";
import PEMappingNavbar from "../../../molecules/nav-bars/pe-mapping-page";
import { SelectedAction } from "../../../molecules/nav-bar-common/type";
import EmailFormatDialog from "./actions/share-profile/email-format-dialog";
import ShareProfileDialogBulk from "./actions/share-profile/shareProfileBulk";
import EmailFormatDialogBulk from "./actions/share-profile/email-format-dialog/indexBulk";
import ShareComplianceWithExpert from "./actions/share-compliance-expert";
import ExpertComplianceDialog from "./actions/show-expert-compliance-questions";
import ComplianceEmailFormatDialog from "./actions/share-compliance-expert/compliance-email-format";
import ShareCCResponses from "./actions/share-cc-responses";
import { ReviewCompliance } from "./actions/review-compliance";
import { ShowAnswersDialog } from "./actions/show-answers";
import RevertReject from "./actions/revert-reject";
import { ReArrangeExpertsDialog } from "./actions/share-profile/rearrangeDialog";
import BulkRevert from "./actions/bulk-revert";


type Props = {
  project_id: string;
  expert_id: string | null;
};

const ProjectPeMapping = ({ project_id, expert_id }: Props) => {
  const [selectExpert, setSelectExpert] = useState<SelectExpert>({
    isSelected: false,
    selectedCards: []
  })
  const [selectedAction, setSelectedAction] = useState<SelectedAction>(null);
  const [isDialog, setPeDialog] = useState<isDialogState>({
    actions: ActionsDefaultValue,
    filter: {
      state: false,
      isChange: false,
      filterText: null,
      isFiltersApplied: true,
      searchText: null,
      status: ["Shared", "Shortlisted", "Scheduled", "Completed", "Added", "Rejected"]
    },
    iconDefine: {
      isOpen: false,
    },
  });
  const [AlertNBackdrop, setAlertNBackdrop] = useState<AlertNBackdropOpen>({
    openAlertBox: false,
    isBackdrop: false,
  });
  const [data, setData] = useState<projectPEMappingDataState>({
    peMappingData: null,
    peListData: null,
    projectData: null,
  });
  const [noActionTaken, setNoActionTaken] = useState(false);
  const [mode, setMode] = useState<"card" | "list">("card");
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const project_title = useGetParams("project_title");
  const project_title_str = project_title ? ": " + project_title : "";


  const refetch = async () => {
    await getPeMappingData(
      project_id,
      setData,
      isDialog.filter,
      setPeDialog,
      setLoading
    );
  }


  const ExpertDetailsClickHandler = useCallback((experts?: SharedProfiles[]) => {
    // Use a function to get the latest state
    setSelectExpert(currentSelectExpert => {
      // You can perform other actions here
      if (currentSelectExpert.selectedCards.length > 0) {
        setPeDialog((prev) => ({
          ...prev,
          actions: {
            ...prev.actions,
            shareProfileExperts: {
              ...prev.actions.shareProfileExperts,
              state: false,
              pe_id: null,
              project_id: project_id,
              isChange: false,
              email_format: false,
              experts: experts || currentSelectExpert.selectedCards as any,
              reaarange_expert: true,
            }
          }
        }))
      }

      return currentSelectExpert; // Return the same state if you don't want to update it
    });
  }, [])

  useEffect(() => {
    getPeMappingData(
      project_id,
      setData,
      isDialog.filter,
      setPeDialog,
      setLoading,
      expert_id,
      noActionTaken
    );
    // eslint-disable-next-line
  }, [project_id, expert_id, noActionTaken]);

  useEffect(() => {
    if (isDialog.filter.isChange) {
      getPeMappingData(
        project_id,
        setData,
        isDialog.filter,
        setPeDialog,
        setLoading,
        expert_id,
        noActionTaken
      );
    }

    // eslint-disable-next-line
  }, [isDialog.filter.isChange])

  return (
    <>
      <PeMappingContext.Provider
        value={{
          refetch: async () => {
            await getPeMappingData(
              project_id,
              setData,
              isDialog.filter,
              setPeDialog,
              setLoading
            );
          },
          setPeDialog,
          isDialog,
          selectExpert,
          setSelectExpert,
          selectedAction,
          setSelectedAction
        }}
      >
        <>
          <PeMappingHeader
            onFilterClick={() => {
              setPeDialog((prev) => ({
                ...prev,
                filter: { ...prev.filter, state: true },
              }));
            }}
            isAdvanceFilter={Boolean(isDialog.filter.filterText)}
            onIconDefineClick={() => {
              setPeDialog((prev) => ({
                ...prev,
                iconDefine: {
                  ...prev.iconDefine,
                  isOpen: true,
                },
              }));
            }}
            onSearchFilter={(search: string) => {
              setPeDialog((prev) => ({
                ...prev,
                filter: {
                  ...prev.filter,
                  isChange: true,
                  searchText: search
                }
              }))
            }}
            mode={mode}
            setToggle={setMode}
          />
          <PEMappingNavbar
            isSelectedClicked={selectExpert.isSelected}
            projectData={data?.projectData?.data[0]}
            totalSelected={selectExpert.selectedCards.length}
            inviteClickHandler={(isReInvite: boolean) => {
              setPeDialog((prev) => ({
                ...prev,
                actions: {
                  ...prev.actions,
                  inviteExpert: {
                    state: true,
                    pe_id: null,
                    project_id: project_id,
                    isReInvite: isReInvite,
                    isMultiple: true
                  }
                }
              }))
            }}
            ShortlistClickHandler={() => {
              setPeDialog((prev) => ({
                ...prev,
                actions: {
                  ...prev.actions,
                  shortlist: {
                    state: true,
                    isChange: false,
                    pe_id: null,
                    expert: null,
                    is_multiple: true
                  }
                }
              }))
            }}
            bulkShareClickHandler={() => {
              setPeDialog((prev) => ({
                ...prev,
                actions: {
                  ...prev.actions,
                  shareProfileExperts: {
                    ...prev.actions.shareProfileExperts,
                    state: true,
                    pe_id: null,
                    project_id: project_id,
                    isChange: false,
                    email_format: false,
                    experts: [],
                    reaarange_expert: false
                  }
                }
              }))
            }}
            bulkRevertClickHandler={() => {
              setPeDialog((prev) => ({
                ...prev,
                actions: {
                  ...prev.actions,
                  bulkRevert: {
                    state: true
                  }
                }
              }))
            }}
            isFilterApplied={isDialog.filter.isFiltersApplied}
            resetFilters={() => resetFilters(setPeDialog)}
            selectClickHandler={() => {
              setSelectExpert((prev) => ({ selectedCards: [], isSelected: !prev.isSelected }))
            }}
            selectedAction={selectedAction}
            onActionSelect={(action) => setSelectedAction(action)}
            expertDetailsClickHandler={() => ExpertDetailsClickHandler()}
          />
          {data?.peListData?.length === 0 ? (
            <NoResultFoundFilters
              text={
                /* NOTE: This needs to be changed whenever we add new filter */
                (isDialog.filter.filterText || isDialog.filter.searchText) ? undefined
                  : isDialog.filter.status.length === 6 ? "No Experts Mapped to this Project #" + project_id
                    : isDialog.filter.status.length ? "No Experts Mapped to this Project #" + project_id + " with state: " + isDialog.filter.status.join(", ")
                      : "Please select a State (eg: Shared, Shortlisted etc)"
              }
            />
          ) : (
            <>
              {mode === "card" ?
                <PEExpertMappingCardView rows={data.peListData || []} project_id={project_id} loading={loading} /> :
                <PEExpertMappingListView
                  rows={data.peListData || []}
                  project_id={project_id}
                  setNoActionTaken={setNoActionTaken}
                  isNoActionTaken={noActionTaken}
                />}
            </>
          )}

          {/* ______________ ACTIONS ____________________ */}

          {/* Shortlist */}

          <DialogModal
            title="Shortlist / Reject Expert"
            isOpen={isDialog.actions.shortlist.state}
            handleClose={() =>
              handleClose(
                setAlertNBackdrop,
                setPeDialog,
                isDialog.actions.shortlist.isChange
              )
            }
          >
            <ShortlistExpert
              expertDetails={isDialog.actions.shortlist.expert}
              handleClose={() =>
                handleClose(
                  setAlertNBackdrop,
                  setPeDialog,
                  isDialog.actions.shortlist.isChange
                )
              }
              handleSubmitClose={() => handleSubmitClose(setPeDialog)}
              pe_id={isDialog.actions.shortlist.pe_id}
              setBackdrop={(b: boolean) =>
                setAlertNBackdrop((prev) => ({ ...prev, isBackdrop: b }))
              }
              selectedCards={selectExpert.selectedCards}
              isMultiple={isDialog.actions.shortlist.is_multiple}
            />
          </DialogModal>

          {/* Schedule Call */}

          <DialogModal
            title={
              "Schedule Call with " + isDialog.actions.scheduleCall.expert_name
            }
            isOpen={isDialog.actions.scheduleCall.state}
            handleClose={() =>
              handleClose(
                setAlertNBackdrop,
                setPeDialog,
                isDialog.actions.scheduleCall.isChange
              )
            }
          >
            <ScheduleCall
              allowUseContext={true}
              handleClose={() =>
                handleClose(
                  setAlertNBackdrop,
                  setPeDialog,
                  isDialog.actions.scheduleCall.isChange
                )
              }
              handleSubmitClose={() => handleSubmitClose(setPeDialog)}
              pe_id={isDialog.actions.scheduleCall.pe_id}
              project_id={isDialog.actions.scheduleCall.project_id}
            />
          </DialogModal>


          {/* Show Answers*/}
          <ShowAnswersDialog
            isOpen={isDialog.actions.showAnswers.state}
            show_reviewed_by={isDialog.actions.showAnswers.show_reviewed_by || null}
            proof_url={isDialog.actions.showAnswers.proof_url}
            answers={isDialog.actions.showAnswers.answers}
            handleClose={() => handleClose(
              setAlertNBackdrop,
              setPeDialog,
              false
            )}
            showReAnswerBtn={isDialog.actions.showAnswers.showReAnswerBtn}
          />
        </>


        {/* Share / Reshare Compliance with Expert */}
        {isDialog.actions.ShareComplianceWithExpert.state &&
          <ShareComplianceWithExpert
            isOpen={isDialog.actions.ShareComplianceWithExpert.state}
            client_id={isDialog.actions.ShareComplianceWithExpert.client_id}
            pe_id={isDialog.actions.ShareComplianceWithExpert.pe_id}
            handleClose={() => handleSubmitClose(setPeDialog)}
            isEdit={isDialog.actions.ShareComplianceWithExpert.is_edit}
          />}

        {/* Share Expert Compliance Responses to Client */}
        {isDialog.actions.ShareComplianceWithClient.state &&
          <ShareCCResponses
            pe_compliance={isDialog.actions.ShareComplianceWithClient.pe_compliance}
            isOpen={isDialog.actions.ShareComplianceWithClient.state}
            handleClose={() => handleSubmitClose(setPeDialog)}
            client_id={isDialog.actions.ShareComplianceWithClient.client_id}
            setPeDialog={setPeDialog}
            snippet={isDialog.actions.ShareComplianceWithClient.snippet}
            expert_id={isDialog.actions.ShareComplianceWithClient.expert_id}
            company={isDialog.actions.ShareComplianceWithClient.company}
            designation={isDialog.actions.ShareComplianceWithClient.designation}
            meta={isDialog.actions.ShareComplianceWithClient.meta}
          />
        }

        {/* Client Compliance Email Format */}
        {isDialog.actions.ShareComplianceWithClient.email_format &&
          <ComplianceEmailFormatDialog
            project_id={project_id}
            expert_id={expert_id}
            snippet={isDialog.actions.ShareComplianceWithClient.snippet}
            isOpen={isDialog.actions.ShareComplianceWithClient.email_format}
            client_id={isDialog.actions.ShareComplianceWithClient.client_id?.toString() || null}
            handleClose={() => handleSubmitClose(setPeDialog)}
          />}


        {/* Show Compliance's Questions */}
        {isDialog.actions.showComplianceQuestions.state &&
          isDialog.actions.showComplianceQuestions.pe_compliance &&
          <ExpertComplianceDialog
            isOpen={isDialog.actions.showComplianceQuestions.state}
            handleClose={() => handleSubmitClose(setPeDialog)}
            pe_compliance={isDialog.actions.showComplianceQuestions.pe_compliance}
          />
        }

        {isDialog.actions.reviewCompliance.state &&
          <ReviewCompliance
            isOpen={isDialog.actions.reviewCompliance.state}
            pe_compliance={isDialog.actions.reviewCompliance.pe_compliance}
            handleClose={() => handleSubmitClose(setPeDialog)}
            refetch={refetch}
            setPeDialog={setPeDialog}
            snippet={isDialog.actions.reviewCompliance.snippet}
            expert_id={isDialog.actions.reviewCompliance.expert_id}
            company={isDialog.actions.reviewCompliance.company}
            designation={isDialog.actions.reviewCompliance.designation}
            meta={isDialog.actions.reviewCompliance.meta}
          />
        }


        {/* Share Profile */}
        {isDialog.actions.shareProfile.state &&
          <ShareProfileDialog
            isOpen={isDialog.actions.shareProfile.state}
            handleClose={() =>
              handleClose(
                setAlertNBackdrop,
                setPeDialog,
                isDialog.actions.shareProfile.isChange
              )
            }
            handleSubmitClose={() => handleSubmitClose(setPeDialog)}
            pe_id={isDialog.actions.shareProfile.pe_id}
            expert_id={isDialog.actions.shareProfile.expert_id}
            company={isDialog.actions.shareProfile.company}
            designation={isDialog.actions.shareProfile.designation}
            handleChange={() => handleFormChange(setPeDialog, "shareProfile")}
            is_agenda_respond={isDialog.actions.shareProfile.is_agenda_respond}
            location={isDialog.actions.shareProfile.location}
            setPeDialog={setPeDialog}
            meta={isDialog.actions.shareProfile.meta}
            group={ data?.projectData?.data?.[0]?.fk_group}
          />
        }


        {/* Share Profile */}
        {isDialog.actions.shareProfileExperts.state &&
          <ShareProfileDialogBulk
            isOpen={isDialog.actions.shareProfileExperts.state}
            handleClose={() =>
              handleClose(
                setAlertNBackdrop,
                setPeDialog,
                isDialog.actions.shareProfileExperts.isChange
              )
            }
            handleSubmitClose={() => handleSubmitClose(setPeDialog)}
            pe_id={isDialog.actions.shareProfileExperts.pe_id}
            handleChange={() => handleFormChange(setPeDialog, 'shareProfileExperts')}
            setPeDialog={setPeDialog}
            selectedCards={selectExpert.selectedCards}
            rows={data.peListData}
          />
        }

        {/* Email Format Dialog - All the details that is needed */}
        {isDialog.actions.shareProfile.email_format &&
          <EmailFormatDialog
            isOpen={isDialog.actions.shareProfile.email_format}
            handleClose={() => handleClose(setAlertNBackdrop, setPeDialog, true)}
            expert_id={isDialog.actions.shareProfile.expert_id}
            relevant_company={isDialog.actions.shareProfile.company}
            relevant_designation={isDialog.actions.shareProfile.designation}
            snippet={isDialog.actions.shareProfile.snippet}
            charges={isDialog.actions.shareProfile.charges}
            meta={isDialog.actions.shareProfile.meta}
          />
        }

        {isDialog.actions.shareProfileExperts.reaarange_expert &&
          <ReArrangeExpertsDialog
            isOpen={isDialog.actions.shareProfileExperts.reaarange_expert}
            handleClose={() => handleClose(setAlertNBackdrop, setPeDialog, false)}
            expertCards={isDialog.actions.shareProfileExperts.experts}
          />
        }

        {/* Email Format Dialog Bulk - All the details that is needed */}
        {isDialog.actions.shareProfileExperts.email_format &&
          <EmailFormatDialogBulk
            isOpen={isDialog.actions.shareProfileExperts.email_format}
            handleClose={() => handleClose(setAlertNBackdrop, setPeDialog, false)}
            experts={isDialog.actions.shareProfileExperts.experts}
            handleReArrangeExpert={(experts) => ExpertDetailsClickHandler(experts)}
          />
        }

        {/* Invite Expert */}
        <InviteExpertPE
          isOpen={isDialog.actions.inviteExpert.state}
          pe_id={isDialog.actions.inviteExpert.pe_id}
          project_id={isDialog.actions.inviteExpert.project_id}
          handleClose={() => handleSubmitClose(setPeDialog)}
          isReInvite={isDialog.actions.inviteExpert.isReInvite}
          selectedCards={selectExpert.selectedCards}
          isMultiple={isDialog.actions.inviteExpert.isMultiple}
          setLoading={(backdrop: boolean) => setAlertNBackdrop((prev) => ({ ...prev, isBackdrop: backdrop }))}
        />

        {/* Revert Reject */}
        <RevertReject
          isOpen={isDialog.actions.revertReject.state}
          id={isDialog.actions.revertReject.pe_id}
          handleClose={() => handleSubmitClose(setPeDialog)}
          refetch={refetch}
          show_compliance_status={!!isDialog.actions.revertReject.show_compliance_status}
          is_auto_rejected={!!isDialog.actions.revertReject.is_auto_rejected}
        />


        {/* This feature is removed after Compliances in Client introducted with Share CC and other Actions */}
        {/* Pending Compliance */}
        {/* {isDialog.actions.pendingCompliance.state &&
          <PendingComplianceDialog
            isOpen={isDialog.actions.pendingCompliance.state}
            handleClose={() => handleSubmitClose(setPeDialog)}
            pe_id={isDialog.actions.pendingCompliance.pe_id}
            selectedCards={selectExpert.selectedCards}
            isMultiple={isDialog.actions.pendingCompliance.is_multiple}
            setLoading={(backdrop: boolean) => setAlertNBackdrop((prev) => ({ ...prev, isBackdrop: backdrop }))}
          />
        } */}

        {/* Share Agenda */}
        {isDialog.actions.shareAgenda.state &&
          <WarningDialog
            text="Are you sure you want to Share Agenda with this Expert?"
            handleClose={() => handleSubmitClose(setPeDialog)}
            open={isDialog.actions.shareAgenda.state}
            handleYesClick={async () => await shareAgendaHandler(isDialog.actions.shareAgenda.pe_id, enqueueSnackbar, setPeDialog, setAlertNBackdrop, refetch)}
          />
        }

        {isDialog.actions.bulkRevert.state &&
          <BulkRevert
            isDialog={isDialog}
            setPeDialog={setPeDialog}
            selectExpert={selectExpert}
            refetch={refetch}
            handleCloseSubmit={() => {
              setSelectExpert((prev) => ({ selectedCards: [], isSelected: !prev.isSelected }))
            }}
          />
        }


        {/* ____________________________________________ */}


        {/* Filter Dialog */}
        <PeFilterDialog
          isOpen={isDialog.filter.state}
          handleClose={() =>
            handleSubmitClose(setPeDialog)
          }
          handleSubmitClose={() => handleSubmitClose(setPeDialog)}
          handleFormChange={() => {
            handleFormChange(setPeDialog, "filter");
          }}
          filterTextChange={(s: string) => {
            setPeDialog((prev) => ({
              ...prev,
              filter: { ...prev.filter, filterText: s, isChange: true, isFiltersApplied: true },
            }));
            navigate(`${AppRoutes.PROJECT_PE_MAPPING}?project_id=${project_id}&project_title=${project_title}`)
          }}
        />


      </PeMappingContext.Provider >



      {/* Icon Definition Dialog */}
      <IconDefinitionDialog
        isOpen={isDialog.iconDefine.isOpen}
        handleClose={() => handleSubmitClose(setPeDialog)}
      />

      {/* Form Close Warning Dialog */}
      <WarningDialog
        handleClose={() => handleAlertBoxClose(setAlertNBackdrop)}
        handleYesClick={() =>
          handleAlertBoxYesClick(setAlertNBackdrop, setPeDialog)
        }
        open={AlertNBackdrop.openAlertBox}
        text={isDialog.actions.shareProfile.email_format ?
          "Are you sure you want to close?" :
          "Are you sure you want to close the form without saving the changes?"
        }
      />

      {/* Backdrop */}
      <BackdropComponent isBackdrop={AlertNBackdrop.isBackdrop} />
    </>
  );
};

export default ProjectPeMapping;
