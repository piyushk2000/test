import { useFetch } from "../../utils/hooks/useFetch";
import Grid from "@mui/material/Grid";
import PageLayout from "../../atoms/page-layout";
import CallsHeader from "../../molecules/app-bars/calls-page";
import CallsCard from "../../atoms/calls/calls-card";
import {
  CallDetail,
  CallDetails,
  DeleteCallDialog,
  Select,
  SelectedCards,
  Users,
  ClientContact,
  filterPayload,
  paymentReceiptModalTypes,
  GenerateInvoiceTypes,
  ConfirmCallDialogType,
  ChoosePaymentRequestTypes,
  ShowReviewTypes,
  AddRemarkTypes,
} from "./types";
import {
  callsDefaultFilter,
  confirmedByExpert,
  defaultFilterPayloadFn,
  deleteCall,
  deleteDialogHandleClose,
  getAdminUsers,
  getCallCardProps,
  getCallTableData,
  getCallTableInitialState,
  getClientContactName,
  markCallAsPaid,
  refetchCalls,
  requestPayment,
  setGenerateInvoice,
  tableInitialState,
  url,
  viewPaymentReceiptPdfs,
  viewZohoPdfs,
} from "./helpers";
import { useEffect, useRef, useState } from "react";
import EditCallDialog from "../../organisms/edit-call-form";
import { useFullPageLoading } from "../../atoms/full-page-loading/loadingContext";
import { getQueryFromFilters } from "../../organisms/call-page-filter/helper";
import NoResultFoundFilters from "../../atoms/noResultsFilters";
import { useGetParams } from "../../utils/hooks/useGetParams";
import { useNavigate } from "react-router-dom";
import CardsLoadingScreen from "../../atoms/cardsLoader";
import { isSelected, toggleItemInArray } from "../../common/select";
import { useSnackbar } from "notistack";
import RequestPaymentModal from "../../organisms/calls/request-payment-form";
import WarningDialog from "../../molecules/form-close-warning";
import { isAdmin, isClient, isExpert, isSuperAdmin } from "../../utils/role";
import CallPageNavbar from "../../molecules/nav-bars/calls-page";
import { SelectedAction } from "../../molecules/nav-bar-common/type";
import { APIRoutes, AppRoutes } from "../../constants";
import { GroupDataItem } from "../../organisms/groups/types";
import { isEqual } from "lodash";
import { rowsPerPage } from "../../common";
import GenerateInvoice from "../../organisms/calls/generate-invoice";
import PaginationComponent from "../../atoms/pagination";
import FixedBox from "../../atoms/fixedBox";
import SearchBars from "../../molecules/calls-page/searchbars";
import ZoomDialog from "../../atoms/calls/zoom-dialog";
import { ZoomDialogOpen } from "../../atoms/calls/zoom-dialog/types";
import { useBoolean } from "../../utils/hooks/useBoolean";
import { DownloadBtnDialog } from "../../organisms/calls/download-btn-form";
import ConfirmCallDialog from "../../organisms/calls/confirm-call";
import ChoosePaymentRequest from "../../organisms/calls/choose-payment-request";
import SubmitPaymentRequest from "../../organisms/calls/submit-payment-request";
import ShowReviewDialog from "../../organisms/calls/show-review-dialog";
import { ZohoExpertStatementDialog } from "../../organisms/calls/zoho-expert-statement-dialog";
import AddRemarkDialog from "../../organisms/calls/add-remark-dialog";
import { AppbarToggleOptions } from "../../molecules/app-bar-common/types";
import CallsTable from "../../atoms/calls/calls-table/calls-table";
import DialogModal from "../../atoms/dialog";
import { Box, CircularProgress, Typography } from "@mui/material";
import PdfViewer from "../../atoms/pdf-viewer/pdf";
import BankDetailSection from "../../molecules/expert-profile-sidebar/bank-details-section/BankDetailSection";
import MultiPdfViewer from "../../atoms/multi-pdf-viewer/multiPdfViewer";
import BulkCaseCode from "../../organisms/calls/bulk-casecode";


export default function Calls() {
  const client_id = useGetParams("client_id");
  const client_name = useGetParams("client_name");
  const expert_id = useGetParams("expert_id");
  const expert_name = useGetParams("expert_name");
  const page = useGetParams("page") || "1";
  const project_id = useGetParams("project_id");
  const call_id = useGetParams("call_id");
  const call_ids = useGetParams("call_ids");
  const start_call_month = useGetParams("start_call_month");
  const start_call_year = useGetParams("start_call_year");

  const filterFormRef = useRef<any>();
  const [zoomReports, setZoomReports] = useState<ZoomDialogOpen>({
    state: false,
    zoomID: null
  });
  const [submitFunction, setSubmitFunction] = useState<Function | undefined>();
  const [adminUsers, setAdminUsers] = useState<Users | null>(null);
  const [clientContactNames, setClientContactNames] = useState<ClientContact | null>(null);
  const [selectedAction, setSelectedAction] = useState<SelectedAction>(null);
  const defaultQueryString = getQueryFromFilters(
    callsDefaultFilter(client_id, client_name, expert_id, expert_name)
  )
  const [queryString, setQueryString] = useState<string | null>(defaultQueryString);
  const defaultFilterPayload = defaultFilterPayloadFn(call_id);
  const [filterPayload, setFilterPayload] = useState<filterPayload>(defaultFilterPayload);
  const [editCallModal, setEditCallModal] = useState<{
    open: boolean;
    data: null | CallDetail;
  }>({
    open: false,
    data: null,
  });
  const [mode, setMode] = useState<AppbarToggleOptions>("card");
  const [pdfLink, setPdfLink] = useState(null)
  const [expertForBd , setExpertForBd] = useState({expertId:null, primary_bank_id:null}) //BankDetails dialog
  const [pdfUrls, setPdfUrls] = useState([]);




  const handleCloseDialog = () => {
    setPdfUrls([]);
  };


  function handlePdfClose() {
    setPdfLink(null)
  }
  function handleBankDetailsClose() {
    setExpertForBd({expertId:null, primary_bank_id:null})
  }

  function handleFiltersReset() {
    setQueryString(defaultQueryString)
    setFilterPayload(defaultFilterPayload)

    if (filterFormRef.current && filterFormRef.current.resetForm) {
      filterFormRef.current.resetForm()
    }
  }

  function isFilterApplied() {
    // if filter is applied , defaultFilterPayload !== filterPayload , else equal
    return defaultQueryString !== queryString || !isEqual(defaultFilterPayload, filterPayload)
  }

  const [select, setSelect] = useState<Select>({
    isClicked: false,
    selectedCards: [],
    callAction: null
  });
  const [paymentReceiptModalOpen, setPaymentReceiptModal] = useState<paymentReceiptModalTypes>({
    state: false,
    expert_name: null
  });
  const [generateInvoiceOpen, setGenerateInvoiceOpen] = useState<GenerateInvoiceTypes>({
    state: false,
    bank_details: null
  });
  const [choosePaymentRequest, setChoosePaymentRequest] = useState<ChoosePaymentRequestTypes>({
    state: false,
    callDetail: null,
  })
  const [deleteCallDialog, setDeleteCallDialog] = useState<DeleteCallDialog>({
    state: false,
    call_id: null
  });
  const [confirmCallDialog, setConfirmCallDialog] = useState<ConfirmCallDialogType>({
    state: false,
    call_id: null
  })
  const [submitPaymentRequest, setSubmitPaymentRequest] = useState<any>({
    state: false,
    callDetails: []
  })

  const [caseCodeDialog, setCaseCodeDialog] = useState<any>({
    state: false,
    callIds: []
  })
  const [showReviewDialog, setShowReviewDialog] = useState<ShowReviewTypes>({
    state: false,
    callDetail: null,
    review_type: null
  })
  const [zohoExpertStatement, setZohoExpertStatement] = useState<any>({
    state: false,
    expert_id: null,
    expert_name: null
  })

  const [addRemarkDialog, setAddRemarkDialog] = useState<AddRemarkTypes>({
    state: false,
    callDetail: null
  })

  const { value: isDownloadDialogOpen, setTrue: openDownloadDialog, setFalse: closeDownloadDialog
  } = useBoolean();


  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const { setLoading } = useFullPageLoading();

  const {
    data: callsDetails,
    setData: setCallsDetails,
    refetch: refetchCallsDetails,
    loading,
    pagination: paginationData,
  } = useFetch<CallDetails>(url(page, project_id, queryString, filterPayload, start_call_month, start_call_year, expert_id, call_ids));

  const {
    data: groupData,
  } = useFetch<GroupDataItem[]>(APIRoutes.getGroup, {
    variables: [isAdmin()]
  });

  function onEditCallClick(data: CallDetail) {
    setEditCallModal({
      open: true,
      data: data,
    });
  }

  function handleClose() {
    setEditCallModal({
      open: false,
      data: null,
    });
  }

  const paginationUrl = (page: string) => ("/layout/calls?page=" +
    page +
    (project_id ? "&project_id=" + project_id : "")
    + (expert_id ? ("&expert_id=" + expert_id) : "")
    + (expert_name ? ("&expert_name=" + expert_name) : "")
    + (call_ids ? ("&call_ids=" + call_ids) : ""))

  function paginationHandler(e: any, value: any) {
    navigate(
      paginationUrl(value)
    );
  }

  useEffect(() => {
    setAdminUsers(null);
    getAdminUsers(callsDetails, setAdminUsers);
    try {
      if (callsDetails) {
        const CCID = callsDetails.map((call) => call.client_contact)
        getClientContactName(CCID).then(data => {
          setClientContactNames(data)
        })
      }
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }

    
  }, [callsDetails]);

  async function setRequestPayment() {
    const func = await requestPayment(
      setPaymentReceiptModal,
      enqueueSnackbar,
      select.selectedCards,
      setSelect,
      setLoading,
      setCallsDetails,
      refetchCallsDetails,
      callsDetails,
    )
    setSubmitFunction(() => func);
  }

  useEffect(() => {
    if (select.callAction) {
      const selectedCardsIds = select.selectedCards.map((call) => call.id).join(",");

      if (select.callAction === "Paid") {
        markCallAsPaid(selectedCardsIds, "Paid", enqueueSnackbar, setLoading, refetchCallsDetails, setSelect)
      } else if (select.callAction === "UnPaid") {
        markCallAsPaid(selectedCardsIds, "UnPaid", enqueueSnackbar, setLoading, refetchCallsDetails, setSelect)
      } else if (select.callAction === "Request_Payment") {
        setRequestPayment();
      } else if (select.callAction === "generate_invoice") {
        setGenerateInvoice(select, enqueueSnackbar, setGenerateInvoiceOpen);
      } else if (select.callAction === "Submit Payment Request") {
        setSubmitPaymentRequest(() => ({ state: true, callDetails: select.selectedCards }))
      } else if (select.callAction === "Change Casecode") {
        setCaseCodeDialog(() => ({ state: true, callIds: selectedCardsIds }))
      } 
      setSelect((prev) => ({ ...prev, callAction: null }))
    }
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [select.callAction])

  return (
    <PageLayout>
      <FixedBox>
        <CallsHeader
          downloadBtnClickHandler={openDownloadDialog}
          setQueryString={(queryString: string) => setQueryString(queryString)}
          isAdvanceFilter={Boolean(queryString)}
          searchFilter={(text: string) => {
            setFilterPayload((prev) => ({ ...prev, search: text }));
          }}
          filterFormRef={filterFormRef}
          mode={mode}
          setToggle={setMode}
          searchValue={filterPayload.search || ""}
        />
        {(isSuperAdmin() || isAdmin()) &&
          <SearchBars
            filterPayload={filterPayload}
            setFilterPaylod={setFilterPayload}
          />
        }
        <CallPageNavbar
          setFilterPayload={setFilterPayload}
          filterPayload={filterPayload}
          queryString={url(page, project_id, queryString, filterPayload, start_call_month, start_call_year, expert_id, call_ids)}
          select={select}
          setSelect={setSelect}
          submitPaymentRequest={async () => {
            setSubmitPaymentRequest(() => ({ state: true, callDetails: select.selectedCards }))
          }}
          SubmitPaymentRequestClickHandler={async () => {
            setSelect((prev) => ({ ...prev, callAction: "Submit Payment Request" }))
          }}
          changeCaseCodeClickHandler={async () => {
            setSelect((prev) => ({ ...prev, callAction: "Change Casecode" }));
          }}
          handleFiltersReset={handleFiltersReset}
          isFilterApplied={isFilterApplied()}
          selectedAction={selectedAction}
          onActionSelect={(action) => setSelectedAction(action)}
        />
      </FixedBox>
      {mode === "list" ?
        (
          <>
            <CallsTable
              data={!!adminUsers && getCallTableData(callsDetails)}
              tableInititalState={getCallTableInitialState()}
              paginationHandler={paginationHandler}
              setFilterPayload={setFilterPayload}
              filterPayload={filterPayload}
              isLoading={!callsDetails || !adminUsers}
              paginationData={paginationData}
              adminUsers={adminUsers}
              isExpert={isExpert()}
              setPdfLink={setPdfLink}
              setExpertForBd={setExpertForBd}
              clientContactNames={clientContactNames}
              // setPrimaryBankId={sesetPrimaryBankIdtExpertForBd}
              onDeleteCallClick={(call_id: number) => setDeleteCallDialog((prev) => ({
                call_id: call_id, state: true
              }))}
              onEditCallClick={(call: any) => onEditCallClick(call)}
              onConfirmByExpert={async (call_id: number) =>
                await confirmedByExpert(
                  call_id,
                  setLoading,
                  setCallsDetails
                )
              }
              onPaidCallClick={async (call_id: number) => {
                await markCallAsPaid(call_id.toString(), "Paid", enqueueSnackbar, setLoading, refetchCallsDetails, null)
              }}
              onUnPaidCallClick={async (call_id: number) => {
                await markCallAsPaid(call_id.toString(), "UnPaid", enqueueSnackbar, setLoading, refetchCallsDetails, null)
              }}
              requestPayment={async (expert_name: string, callid: number) => {
                const func = await requestPayment(
                  setPaymentReceiptModal,
                  enqueueSnackbar,
                  select.selectedCards,
                  setSelect,
                  setLoading,
                  setCallsDetails,
                  refetchCallsDetails,
                  callsDetails,
                  callid,
                  true,
                  expert_name
                );
                setSubmitFunction(() => func);
              }}
              onZoomreportsClick={(zoom_meeting_id: string) => {
                setZoomReports((prev) => ({ state: true, zoomID: zoom_meeting_id }));
              }}
              viewPaymentReceiptClickHandler={async (call:any) => {
                await viewPaymentReceiptPdfs(call.id, enqueueSnackbar, setLoading, setPdfUrls);
              }}
              viewSoAClickHandler={async (call:any) => {
                setZohoExpertStatement(() => ({ state: true, expert_id: call.fk_expert, expert_name: call.fk_expert_value.name }))
              }}
              onViewReviewClickHandler={(call,review_type) => {
                setShowReviewDialog(() => ({ state: true, callDetail: call, review_type }))
              }}
              addRemarkClickHandler={(call:any) => {
                setAddRemarkDialog(() => ({state: true, callDetail: call}))
              }}
              groupData={groupData}
            />
          </>
        )
        :
        (
          <>
            <Grid container spacing={2} >
              {!loading ? (
                <>
                  {(callsDetails && adminUsers && (!isClient() || clientContactNames)) && (isAdmin() ? !!groupData : true) ? (
                    callsDetails.length > 0
                      ? (
                        <>
                          {callsDetails.map((call) => (
                            <Grid key={call.id} item xs={12} md={6} lg={4}>
                              <CallsCard
                                onDeleteCallClick={() => setDeleteCallDialog((prev) => ({
                                  call_id: call.id, state: true
                                }))}
                                onEditCallClick={() => onEditCallClick(call)}
                                onConfirmByExpert={async () => {
                                  if (isExpert()) {
                                    setConfirmCallDialog((prev) => ({
                                      state: true,
                                      call_id: call.id
                                    }))
                                  } else {
                                    await confirmedByExpert(
                                      call.id,
                                      setLoading,
                                      setCallsDetails
                                    )
                                  }
                                }}
                                onZoomreportsClick={() => {
                                  setZoomReports((prev) => ({ state: true, zoomID: call.zoom_meeting_id }));
                                }}
                                onPaidCallClick={async () => {
                                  await markCallAsPaid(call.id.toString(), "Paid", enqueueSnackbar, setLoading, refetchCallsDetails, null)
                                }}
                                onUnPaidCallClick={async () => {
                                  await markCallAsPaid(call.id.toString(), "UnPaid", enqueueSnackbar, setLoading, refetchCallsDetails, null)
                                }}
                                onApprovedForPaymentClick={async () => {
                                  await markCallAsPaid(call.id.toString(), "ApprovedForPayment", enqueueSnackbar, setLoading, refetchCallsDetails, null)
                                }}
                                viewPaymentReceiptClickHandler={async () => {
                                  await viewPaymentReceiptPdfs(call.id, enqueueSnackbar, setLoading, setPdfUrls);
                                }}
                                viewSoAClickHandler={async () => {
                                  setZohoExpertStatement(() => ({ state: true, expert_id: call.fk_expert, expert_name: call.fk_expert_value.name }))
                                  // await viewZohoPdfs(call.fk_expert,call.fk_expert_value.name, enqueueSnackbar, setLoading);
                                }}
                                onViewReviewClickHandler={(review_type) => {
                                  setShowReviewDialog(() => ({ state: true, callDetail: call, review_type }))
                                }}
                                {...getCallCardProps(call, adminUsers, clientContactNames, selectedAction, groupData)}
                                isSelectClicked={select.isClicked}
                                selected={isSelected<SelectedCards>(
                                  call.id,
                                  select.selectedCards
                                )}
                                addRemarkClickHandler={() => {
                                  setAddRemarkDialog(() => ({ state: true, callDetail: call }))
                                }}
                                toggleSelected={() => {
                                  setSelect((prev) => ({
                                    ...prev,
                                    selectedCards: toggleItemInArray<SelectedCards>(
                                      prev.selectedCards,
                                      { ...call, value: call.id }
                                    ),
                                  }));
                                }}
                                requestPayment={async (expert_name: string) => {
                                  const func = await requestPayment(
                                    setPaymentReceiptModal,
                                    enqueueSnackbar,
                                    select.selectedCards,
                                    setSelect,
                                    setLoading,
                                    setCallsDetails,
                                    refetchCallsDetails,
                                    callsDetails,
                                    call.id,
                                    true,
                                    expert_name
                                  );
                                  setSubmitFunction(() => func);
                                }}
                                setPdfLink={setPdfLink}
                                setExpertForBd={setExpertForBd}
                              />
                            </Grid>
                          ))}
                          <Grid item xs={12}>
                            <PaginationComponent
                              page={paginationData?.page || 1}
                              totalResult={paginationData?.total || 0}
                              totalPages={paginationData.totalPages || 0}
                              paginationHandler={paginationHandler}
                              dropdownFilterProps={{
                                link: paginationUrl("1"),
                                setFilterPayload: (page) => {
                                  setFilterPayload((prev: filterPayload) => {
                                    return {
                                      ...prev,
                                      rowsPerPage: parseInt(page),
                                    };
                                  })
                                },
                                dropDownItems: rowsPerPage,
                                filterValue: filterPayload.rowsPerPage.toString()
                              }}
                              hideRowsPerPage={isClient()}
                            />
                          </Grid>
                        </>
                      ) : (
                        <NoResultFoundFilters text={isFilterApplied() ? undefined : "No calls Found"} />
                      )
                  ) : null}
                </>
              ) : (
                <CardsLoadingScreen />
              )}
            </Grid>
          </>
        )}

      {
        editCallModal.data ? (
          <EditCallDialog
            callDetail={editCallModal.data}
            refetch={refetchCallsDetails}
            open={editCallModal.open}
            handleClose={handleClose}
          />
        ) : null
      }

      {submitPaymentRequest.state &&
        <SubmitPaymentRequest
          isOpen={submitPaymentRequest.state}
          handleClose={() => setSubmitPaymentRequest(() => ({ state: false, callDetails: [] }))}
          callDetails={submitPaymentRequest.callDetails}
          refetch={async (callIds) => {
            await refetchCalls(callIds, setCallsDetails);
          }}
          setSelect={setSelect}
        />
      }

      {addRemarkDialog.callDetail && 
        <AddRemarkDialog
          isOpen={addRemarkDialog.state}
          handleClose={() => setAddRemarkDialog(() => ({ state: false, callDetail: null }))}
          callDetail={addRemarkDialog.callDetail}
          refetch={async (id: number) => {
            await refetchCalls([id], setCallsDetails);
          }}
        />
      }

      {zohoExpertStatement.state &&
        <ZohoExpertStatementDialog
          isOpen={zohoExpertStatement.state}
          handleClose={() => setZohoExpertStatement(() => ({ state: false, expert_id: null, expert_name: null }))}
          expert_id={zohoExpertStatement.expert_id}
          expert_name={zohoExpertStatement.expert_name}
        />
      }

      {
        submitFunction ? (
          <RequestPaymentModal
            isOpen={paymentReceiptModalOpen.state}
            handleClose={() => {
              setSubmitFunction(undefined);
              setPaymentReceiptModal(() => ({ state: false, expert_name: null }));
            }}
            onSubmit={submitFunction}
            expertName={paymentReceiptModalOpen.expert_name || ""}
            select={select}
          />
        ) : null
      }

      <BulkCaseCode isOpen={caseCodeDialog.state} callIds={caseCodeDialog?.callIds} setDialog={setCaseCodeDialog} />

      {confirmCallDialog.state && confirmCallDialog.call_id &&
        <ConfirmCallDialog
          isOpen={confirmCallDialog.state}
          handleClose={() => {
            setConfirmCallDialog(() => ({
              state: false,
              call_id: null
            }))
          }}
          id={confirmCallDialog.call_id}
          setCallDetails={setCallsDetails}
          callDetails={callsDetails || []}
          openChoosePaymentRequest={() => {
            const callDetail = callsDetails?.find(c => c.id === confirmCallDialog.call_id) || null;
            setChoosePaymentRequest({ state: true, callDetail })
          }}
        />
      }

      {
        choosePaymentRequest.state &&
        <ChoosePaymentRequest
          isOpen={choosePaymentRequest.state}
          handleClose={() => setChoosePaymentRequest({ state: false, callDetail: null })}
          callDetail={choosePaymentRequest.callDetail}
          setGenerateInvoiceOpen={setGenerateInvoiceOpen}
          openUploadInvoice={async () => {
            const func = await requestPayment(
              setPaymentReceiptModal,
              enqueueSnackbar,
              select.selectedCards,
              setSelect,
              setLoading,
              setCallsDetails,
              refetchCallsDetails,
              callsDetails,
              choosePaymentRequest?.callDetail?.id,
              true,
              choosePaymentRequest?.callDetail?.fk_expert_value?.name
            );
            setSubmitFunction(() => func);
          }}
          setSelect={setSelect}
        />
      }

      {
        generateInvoiceOpen.state &&
        <GenerateInvoice
          isOpen={generateInvoiceOpen.state}
          handleClose={() => {
            setGenerateInvoiceOpen(() => ({ state: false, bank_details: null }));
          }}
          select={select}
          setSelect={setSelect}
          bankDetails={generateInvoiceOpen.bank_details}
          refetch={refetchCallsDetails}
        />
      }

      {
        deleteCallDialog.state &&
        <WarningDialog
          open={deleteCallDialog.state}
          handleClose={() => deleteDialogHandleClose(setDeleteCallDialog)}
          text="Are you sure you want to delete this call?"
          handleYesClick={async () => {
            deleteCallDialog.call_id && await deleteCall(deleteCallDialog.call_id, enqueueSnackbar, setLoading, refetchCallsDetails, () => deleteDialogHandleClose(setDeleteCallDialog))
          }}
        />
      }

      {showReviewDialog.state &&
        <ShowReviewDialog
          isOpen={showReviewDialog.state}
          handleClose={() => setShowReviewDialog((prev) => ({ state: false, callDetail: null, review_type: null }))}
          callDetail={showReviewDialog.callDetail}
          review_type={showReviewDialog.review_type}
        />
      }
      {
        pdfLink &&
        <DialogModal isOpen={pdfLink} dialogSx={{ height: '100%' }} handleClose={handlePdfClose} title={'Pe Certificate'}>
          <Box sx={{ height: '90vh' }}>
            <PdfViewer pdfUrl={pdfLink} />
          </Box>
        </DialogModal>
      }
      {
        <Box display={'none'}>
          <BankDetailSection expertDetails={expertForBd} setExpertDetails={setExpertForBd} />
        </Box>
      }
      
      {pdfUrls.length > 0 && (
        <MultiPdfViewer 
          pdfUrls={pdfUrls} 
          handleClose={handleCloseDialog} 
        />
      )}
      {
        isDownloadDialogOpen &&
        <DownloadBtnDialog
          isOpen={isDownloadDialogOpen}
          handleClose={closeDownloadDialog}
        />
      }

      {/* Zoom Reports Dialog */}
      <ZoomDialog
        zoomDialogOpen={zoomReports.state}
        zoomID={zoomReports.zoomID}
        handleClose={() => setZoomReports((prev) => ({ ...prev, state: false }))}
      />
    </PageLayout >
  );
}
