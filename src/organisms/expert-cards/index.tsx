import Grid from "@mui/material/Grid";
import ProfileCard from "../../atoms/profile-cardV1/ProfileCardV1";
import { useEffect, useRef, useState } from "react";

import { useNavigate } from "react-router-dom";
import {
  defaultDialogValues,
  getExpertTableData,
  getProfileDetails,
  handleImageUpload,
  openProfileLink,
  payloadType,
  setContactedExpertCard,
  setExpertCards,
} from "./helper";

import FormCloseWarningDialog from "../../molecules/form-close-warning/index";
import EditExpertDialog from "./edit-expert-dialog/editExpertDialog";
import MarkContactedDialog from "./mark-contacted-dialog/markContactedDialog";
import AcceptRefuseDialog from "./accept-refuse-dialog/acceptRefuseDialog";
import ImageUploadDialog from "../../molecules/image-upload/imageUploadDialog";
import GenerateComplainceDialog from "./generate-compliance-dialog/generateComplianceDialog";
import RefuseReopenDialog from "./refuse-reopen-dialog";
import NoResultFoundFilters from "../../atoms/noResultsFilters";
import { AppRoutes } from "../../constants";
import CardsLoadingScreen from "../../atoms/cardsLoader";
import { isSelected, toggleItemInArray } from "../../common/select";
import { Dialogs, filterPayload } from "../../pages/Experts/types";
import BackdropComponent from "../../atoms/backdropComponent";
import ProfilePictureDialog from "../../atoms/profile-picture-dialog";
import { useSnackbar } from "notistack";
import { isClient } from "../../utils/role";
import { rowsPerPage } from "../../common";
import PaginationComponent from "../../atoms/pagination";
import { useGetParams } from "../../utils/hooks/useGetParams";
import ExpertTable from "./expert-table/expert-table";
import { AddToProject } from "./add-to-project";
import SkeletonLoader from "../../atoms/project-details/SkeletonLoader";
import { getExpertTableInitialColumns } from "./expert-table/helper";
import { settingsConfigTypeOptions } from "../../utils/settings";
import { getExpertDefaultMode } from "../../pages/Experts/helper";
import { formatCallData, getCallsData } from "../../atoms/profile-cardV1/expert-call-detail-tooltip/helper";

export type acceptRefuseStatus = "contacted" | "compliance" | null;

export type openDialog = {
  editExpertDialog: { id: any; state: boolean; isChange: boolean };
  markContacted: { id: any; state: boolean };
  acceptRefuse: { id: any; state: boolean; status: acceptRefuseStatus, isChange: boolean };
  showImage: { id: any; state: boolean; image: string | null };
  deleteImage: { id: any; state: boolean; },
  uploadImage: { id: any; state: boolean };
  generateCompliance: { id: any; state: boolean };
  refusedReopen: { id: any; state: boolean };
  resendCompliance: { id: string | null, state: boolean };
  addToProject: { id: number | null, name: string | null, state: boolean, isChange: boolean };
};

const AllExperts = (props: any) => {
  const {
    apiData,
    setApiData,
    filterPayload,
    selectedCards,
    setSelectedCards,
    selectExpert,
    isExpertLoading,
    setExpertLoading,
    setFilterPayload,
    setDialogs,
    mode,
    controllerRef
  } = props;

  const [openDialog, setOpenDialog] = useState<openDialog>(defaultDialogValues);
  const [openAlertBox, setAlertBox] = useState<boolean>(false);
  const [isBackdrop, setBackdrop] = useState<boolean>(false);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const page = useGetParams("page");
  let ce_mapping = useGetParams("ce_mapping");
  const project_id = ce_mapping ? ce_mapping.split("___")[1] : null;
  const [expertCallData, setExpertCallData] =useState<any>({})
  



  ce_mapping = ce_mapping && encodeURIComponent(ce_mapping);

  const expertUrl = (page: string): string => AppRoutes.EXPERT_SEARCH + "?page=" + page + (ce_mapping ? "&ce_mapping=" + ce_mapping : "");

  const paginationHandler = async (e: any, value: any) => {
    if (page && +page !== value) {
      setExpertLoading(true);
      navigate(expertUrl(value));
    }
  };

  const handleEditExpertDialogOpen = (id: any) => {
    setOpenDialog((prev) => ({
      ...prev,
      editExpertDialog: { state: true, id, isChange: false },
    }));
  };

  const handleMarkContactedDialogOpen = (id: any) => {
    setOpenDialog((prev) => ({
      ...prev,
      markContacted: { state: true, id },
    }));
  };

  const handleAcceptRefuseDialogOpen = (
    id: any,
    status: acceptRefuseStatus
  ) => {
    console.log(status);
    setOpenDialog((prev) => ({
      ...prev,
      acceptRefuse: { state: true, id, status, isChange: false },
    }));
  };

  const handleUploadImageDialogOpen = (id: any) => {
    setOpenDialog((prev) => ({
      ...prev,
      uploadImage: { state: true, id },
    }));
  };

  const handleShowImageDialogOpen = (id: any, image: string | null) => {
    setOpenDialog((prev) => ({
      ...prev,
      showImage: { state: true, id, image },
    }));
  };
  const handleDeleteImageDialogOpen = (id: any) => {
    setOpenDialog((prev) => ({
      ...prev,
      deleteImage: { state: true, id },
    }));
  };


  const handleGenerateComplianceOpen = (id: any) => {
    setOpenDialog((prev) => ({
      ...prev,
      generateCompliance: { state: true, id },
    }));
  };

  const handleResendComplianceOpen = (id: any) => {
    setOpenDialog((prev) => ({
      ...prev,
      resendCompliance: { state: true, id },
    }));
  }

  const refusedReopenDialogOpen = (id: any) => {
    setOpenDialog((prev) => ({
      ...prev,
      refusedReopen: { state: true, id },
    }));
  };

  const handleSubmitClose = () => {
    setOpenDialog(() => (defaultDialogValues));
  };

  const handleClose = () => {
    setAlertBox(true);
  };

  const handleAlertBoxClose = () => {
    setAlertBox(false);
  };

  const handleAlertBoxYesClick = () => {
    setAlertBox(false);
    handleSubmitClose();
  };

  useEffect(() => {
    if (!filterPayload.isFilterChange) {
      if (page) {
        getProfileDetails(
          page,
          setApiData,
          setExpertLoading,
          filterPayload,
          setFilterPayload,
          project_id,
          controllerRef
        );
      } else {
        navigate(expertUrl("1"));
      }
    }
    // eslint-disable-next-line
  }, [page, filterPayload.isFilterChange]);

  useEffect(() => {
    if (filterPayload.isFilterChange) {
      setFilterPayload((filters: filterPayload) => ({
        ...filters,
        isFilterChange: false,
      }));
      navigate(expertUrl("1"));
    }
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterPayload.isFilterChange]);


  return (
    <>

      {mode === "list" ?
        <>
            <ExpertTable
              data={getExpertTableData(apiData)}
              apiData={apiData}
              paginationHandler={paginationHandler}
              editExpertClickHandler={handleEditExpertDialogOpen}
              setFilterPayload={setFilterPayload}
              filterPayload={filterPayload}
              isLoading={!apiData}
              expert_url={expertUrl(page || "1")}
              getProfileDetails={async () =>{ 
                await getProfileDetails(
                page || "1",
                setApiData,
                setExpertLoading,
                filterPayload,
                setFilterPayload,
                project_id,
                controllerRef
              )
            }}
            actions={{
              markContactedClickHandler: handleMarkContactedDialogOpen,
              handleAcceptRefuseDialogOpen,
              refusedReopenDialogOpen,
              handleResendComplianceOpen,
              handleGenerateComplianceOpen,
              handleOpenAddExpert: (id, name) => setOpenDialog((prev) => ({ ...prev, addToProject: { ...prev.addToProject, state: true, name, id } }))
            }}
            selectedCards={selectedCards}
            setSelectedCards={setSelectedCards}
            selectExpert={selectExpert}
            handleOpenProfileLink={async (id: number) => await openProfileLink(id.toString(), setBackdrop, enqueueSnackbar)}
            openTimeline={(id: number) => {
              setDialogs((prev: Dialogs) => ({
                ...prev,
                timeline: {
                  ...prev.timeline,
                  state: true,
                  id: id.toString()
                }
              }))
            }}
            tableInititalState={getExpertTableInitialColumns(!!ce_mapping)}
            mode={getExpertDefaultMode()}
          />
        </>
        : <>
          {apiData ? (
            <>
              {apiData?.total === 0 ? (
                (!filterPayload.isFilterChange && project_id) ?
                  <NoResultFoundFilters text={"No experts are mapped to the specified Project with ID: " + project_id} /> : <NoResultFoundFilters />
              ) : (
                <>
                  {mode === "card" &&
                    <>
                      <Grid container spacing={2} mt={1}>
                        {apiData?.data?.map((profile: any) => (
                          <Grid key={profile.id} item xs={12} md={6} lg={4}>
                            <ProfileCard
                              {...profile}
                              pageNo={page}
                              editExpertClickHandler={handleEditExpertDialogOpen}
                              markContactedClickHandler={handleMarkContactedDialogOpen}
                              handleAcceptRefuseDialogOpen={
                                handleAcceptRefuseDialogOpen
                              }
                              handleShowImageDialogOpen={() => handleShowImageDialogOpen(profile.id, profile.picture)}
                              handleOpenProfileLink={(id: string | null) => openProfileLink(id, setBackdrop, enqueueSnackbar)}
                              handleGenerateComplianceOpen={
                                handleGenerateComplianceOpen
                              }
                              handleResendComplianceOpen={handleResendComplianceOpen}
                              selected={isSelected<{ label: string; value: number }>(profile.id, selectedCards)}
                              toggleSelected={() => {
                                setSelectedCards(
                                  toggleItemInArray<{ label: string; value: number }>(selectedCards, {
                                    label: profile.name,
                                    value: profile.id,
                                  })
                                );
                              }}
                              selectExpert={selectExpert}
                              refusedReopenDialogOpen={refusedReopenDialogOpen}
                              openTimeline={(id: string) => {
                                setDialogs((prev: Dialogs) => ({
                                  ...prev,
                                  timeline: {
                                    ...prev.timeline,
                                    state: true,
                                    id
                                  }
                                }))
                              }}

                            />

                          </Grid>
                        ))}
                      </Grid>
                      <PaginationComponent
                        page={apiData?.page}
                        totalPages={apiData?.totalPages}
                        totalResult={apiData?.total}
                        paginationHandler={paginationHandler}
                        hideRowsPerPage={isClient()}
                        dropdownFilterProps={{
                          link: AppRoutes.EXPERT_SEARCH + "?page=1" + (ce_mapping ? "&ce_mapping=" + ce_mapping : ""),
                          setFilterPayload(page) {
                            setFilterPayload((prev: filterPayload) => {
                              prev = {
                                ...prev,
                                rowsPerPage: parseInt(page),
                                isFilterChange: true,
                              };
                              return prev;
                            })
                          },
                          dropDownItems: rowsPerPage,
                          filterValue: filterPayload.rowsPerPage.toString()
                        }}
                      />
                    </>
                  }
                </>

              )}
            </>
          ) : (
            <CardsLoadingScreen />
          )}
        </>
      }



      {/* Edit Expert Dialog */}
      <EditExpertDialog
        isOpen={openDialog.editExpertDialog.state}
        handleClose={() => openDialog.editExpertDialog.isChange ? handleClose() : handleSubmitClose()}
        handleSubmitClose={handleSubmitClose}
        handleFormChange={() => {
          setOpenDialog((prev) => {
            if (!prev.editExpertDialog.isChange) {
              prev.editExpertDialog.isChange = true;
            }
            return prev;
          });
        }}
        id={openDialog.editExpertDialog.id}
        setLoading={setExpertLoading}
        getUpdatedExpertValues={() => {
          page &&
            getProfileDetails(
              page,
              setApiData,
              setExpertLoading,
              filterPayload,
              setFilterPayload,
              project_id,
              controllerRef
            )
        }
        }
      />


      {/* "Add to Project Dialog" */}
      {openDialog.addToProject.name && openDialog.addToProject.id &&
        <AddToProject
          isOpen={openDialog.addToProject.state}
          handleClose={handleClose}
          handleSubmitClose={handleSubmitClose}
          selectedExpert={{ label: openDialog.addToProject.name, value: openDialog.addToProject.id }}
          handleFormChange={() => {
            setOpenDialog((prev) => {
              if (!prev.addToProject.isChange) {
                return {
                  ...prev,
                  addToProject: { ...prev.addToProject, isChange: true },
                };
              }
              return prev;
            });
          }}
        />
      }

      {/* Marked Contacted Dialog */}
      <MarkContactedDialog
        isOpen={openDialog.markContacted.state}
        handleClose={handleClose}
        id={openDialog.markContacted.id}
        handleSubmitClose={handleSubmitClose}
        setExpertCards={(payload: payloadType, apiData: any) =>
          setContactedExpertCard(setApiData, payload, apiData)
        }
        setBackdrop={setBackdrop}
      />

      {/* AcceptRefuse Dialog */}
      <AcceptRefuseDialog
        isOpen={openDialog.acceptRefuse.state}
        handleClose={() => openDialog.acceptRefuse.isChange ? handleClose() : handleSubmitClose()}
        handleFormChange={
          () =>
            setOpenDialog((prev) => {
              if (!prev.acceptRefuse.isChange) {
                prev.acceptRefuse.isChange = true;
              }
              return prev;
            })
        }
        id={openDialog.acceptRefuse.id}
        handleSubmitClose={handleSubmitClose}
        status={openDialog.acceptRefuse.status}
        setBackdrop={setBackdrop}
        setExpertCards={async () =>
          await setExpertCards(setApiData, openDialog.acceptRefuse.id)
        }
        pageNo={apiData?.page}
      />



      {/* Image Dialogs */}
      {openDialog.showImage.state &&
        <ProfilePictureDialog
          isOpen={openDialog.showImage.state}
          handleClose={handleSubmitClose}
          image={openDialog.showImage.image}
          openEditDialog={() => handleUploadImageDialogOpen(openDialog.showImage.id)}
          openDeleteDialog={() => handleDeleteImageDialogOpen(openDialog.showImage.id)}
        />
      }


      <ImageUploadDialog
        isOpen={openDialog.uploadImage.state}
        handleClose={handleSubmitClose}
        handleImageUpload={(
          image: any,
          setBackdrop: any,
          handleClose: any
        ) =>
          handleImageUpload(
            image,
            openDialog.uploadImage.id,
            setBackdrop,
            handleClose,
            setApiData,
            false,
            enqueueSnackbar
          )
        }
        setBackdrop={setBackdrop}
      />

      {/* Delete Image Warning Dialog */}
      {openDialog.deleteImage.state &&
        <FormCloseWarningDialog
          open={openDialog.deleteImage.state}
          handleClose={() => { setOpenDialog((prev) => ({ ...prev, deleteImage: { state: false, id: null } })) }}
          handleYesClick={() => handleImageUpload(
            null,
            openDialog.deleteImage.id,
            setBackdrop,
            handleSubmitClose,
            setApiData,
            false,
            enqueueSnackbar,
            true)}
          text="Are you sure you want to delete the profile picture?"
        />
      }


      {/* Generate Complaince Dialog */}
      <GenerateComplainceDialog
        isOpen={openDialog.generateCompliance.state}
        handleClose={handleSubmitClose}
        id={openDialog.generateCompliance.id}
        handleSubmitClose={handleSubmitClose}
        setBackdrop={setBackdrop}
        pageNo={apiData?.page}
        setExpertCards={async () =>
          await setExpertCards(setApiData, openDialog.generateCompliance.id)
        }
        setExpertApiData={setApiData}
      />

      {/* Resend Compliance Dialog */}
      <GenerateComplainceDialog
        isOpen={openDialog.resendCompliance.state}
        handleClose={handleSubmitClose}
        id={openDialog.resendCompliance.id}
        handleSubmitClose={handleSubmitClose}
        setBackdrop={setBackdrop}
        pageNo={apiData?.page}
        isResendCompliance={true}
        setExpertCards={async () =>
          await setExpertCards(setApiData, openDialog.resendCompliance.id)
        }
        setExpertApiData={setApiData}
      />

      {/* Refused Reopen Dialog */}
      <RefuseReopenDialog
        isOpen={openDialog.refusedReopen.state}
        handleSubmitClose={handleSubmitClose}
        setBackdrop={setBackdrop}
        id={openDialog.refusedReopen.id}
        setExpertCards={async () =>
          await setExpertCards(setApiData, openDialog.refusedReopen.id)
        }
      />

      {/* Form Close Warning Dialog */}
      <FormCloseWarningDialog
        handleClose={handleAlertBoxClose}
        handleYesClick={handleAlertBoxYesClick}
        open={openAlertBox}
      />

      {/* Backdrop */}
      <BackdropComponent
        isBackdrop={isBackdrop}
      />
    </>
  );
};

export default AllExperts;
