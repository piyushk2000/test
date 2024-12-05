import * as React from "react";
import { ThemeProvider } from "@mui/material/styles";
import Dialog from '@mui/material/Dialog';
import Box from '@mui/material/Box';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import CloseIcon from "@mui/icons-material/Close";
import { CustomFontTheme, getFormattedDetails, isLogCallAllowed } from "./helper";
import styles from "./style.module.scss";
import { ScheduledCall } from "../../organisms/project-calendar/types";
import OpenIcon from "../../assets/images/open.png";
import { Link } from "react-router-dom";
import CustomBtnFilled from "../../atoms/form-molecules/CustomBtnFilled";
import { useBoolean } from "../../utils/hooks/useBoolean";
import ReScheduleOrCancelCallDialog from "../../organisms/project-detail/mapping/reschedule-or-cancel";
import { formatScheduleCalls } from "../../organisms/project-detail/mapping/reschedule-or-cancel/helper";
import ZoomDialog from "../../atoms/calls/zoom-dialog";
import { BoxFlex } from "../../atoms/boxSpaceBtw";
import { isAdmin, isSuperAdmin, isExpert, isClient } from "../../utils/role";
import CopyRichText from "../../atoms/copy-rich-content";
import { ZoomEmailMap } from "../../constants/zoom-emails";
import { LocalDayjs } from "../../utils/timezoneService";
import { useFetch } from "../../utils/hooks/useFetch";
import { APIRoutes } from "../../constants";
import { projectExpertGetApi } from "../../organisms/project/project-pe-mapping/type";
import { useSnackbar } from "notistack";
import RichTextDisplayer from "../../atoms/rich-text-editor/RichTextDisplayer";
import DialogModal from "../../atoms/dialog";
import { copyHtml } from "../../utils/copyHtml";
import { Key, KeyOff } from "@mui/icons-material";

type Props = {
  open: boolean;
  closeDialog: () => void;
  callDetail: Partial<ScheduledCall>;
  showReschduleNCancelBtn?: boolean;
  refetch?: () => Promise<void>;
  showLogCallBtn?: boolean;
  openLogCall?: (expert_id: number, call_id: number) => void;
};

export default function CallDetailModal({
  open,
  closeDialog,
  callDetail,
  showReschduleNCancelBtn = false,
  refetch = async () => { },
  showLogCallBtn = true,
  openLogCall
}: Props) {
  const { value: isOpenRescheduleAndCancel, setTrue: openRescheduleAndCancelForm, setFalse: closeRescheduleAndCancelForm } = useBoolean();
  const { value: isOpenZoomReports, setTrue: openZoomReportsForm, setFalse: closeZoomReportsForm } = useBoolean();
  const { value: isCopyMeetingDetailsOpen, setTrue: openCopyMeetingDetails, setFalse: closeCopyMeetingDetails } = useBoolean();
  const { enqueueSnackbar } = useSnackbar();

  const schedule_call_arr = formatScheduleCalls([callDetail]);
  const zoom_meeting_id = callDetail?.zoom_meeting_id || null;
  const call_link = callDetail?.call_link || null;

  const showZoomReportsBtn = LocalDayjs(callDetail.scheduled_end_time).isBefore(LocalDayjs());
  const copyMeetingDetailsComponentRef = React.useRef<React.ElementRef<"div">>(null);
  const [showHostKey, setShowHostKey] = React.useState(false);

  const handleCopyToClipboard = async () => {
    await copyHtml(copyMeetingDetailsComponentRef, enqueueSnackbar);
  };


  const handleToggleHostKey = () => {
    setShowHostKey((prev: any) => !prev);
  };

  // LOG CALL Btn Show or Not --------------------------------------------------------------------------- //

  const { value: show_log_call, setTrue: setShowLogCallTrue } = useBoolean();
  const { data: peData } = useFetch<projectExpertGetApi["data"]>(
    APIRoutes.peMapping +
    "?fk_expert=" +
    callDetail.fk_expert + "&fk_project=" + callDetail.fk_project +
    "&show_columns=id,fk_expert,agenda_shared_on,agenda_responses,expert_invitation,expert_name,relevant_designation,relevant_company,relevant_company_location,state,meta,calls_scheduled,client_specific_compliance_requirement,csc_marked_completed_by,csc_marked_completed_on,compliance_shared,client_compliance_requirement", {
    variables: [showLogCallBtn, !!openLogCall]
  });


  React.useEffect(() => {
    isLogCallAllowed(callDetail, peData, setShowLogCallTrue);
  }, [peData])

  // ------------------------------------------------------------------------------------ //

  return (
    <ThemeProvider theme={CustomFontTheme}>
      <Dialog maxWidth={"sm"} open={open} onClose={closeDialog}>
        <DialogTitle
          sx={{
            minWidth: "500px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
          className="dialog-header px-8 py-5"
        >
          <p>Call Detail</p>
          <IconButton aria-label="close" onClick={closeDialog}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent
          sx={{ paddingBottom: 1 }}
          className="add-project-modal-content gray-scroolbar"
        >
          <div className={styles.bankDetailsContainer}>
            <div className={styles.bankDetails}>
              <div>
                {(isClient() || isExpert()) ?
                  <p className={styles.accountNumber}>Call with Infollion Expert</p> :
                  <p className={styles.accountNumber}>{callDetail.fk_project_value?.topic}</p>
                }
                <Link target={'_blank'} to={`/layout/expert-profile?id=${callDetail.fk_expert}&page=1`}>
                  <p className={styles.bankName}>
                    {`#${callDetail?.fk_expert_value?.id} ${callDetail?.fk_expert_value?.name}`}
                  </p>
                </Link>
              </div>
            </div>
          </div>
          <div className={styles.devider}></div>

          <div className={styles.container}>
            <div className={styles.mainDetails}>
              {callDetail.fk_project ? (
                (isExpert() || isClient()) ?
                  (<div className={styles.row}>
                    <div className={styles.label}>Project Topic</div>
                    <div className={styles.value}>
                      {callDetail.fk_project_value?.external_topic}
                      {isClient() &&
                        <Link target={'_blank'} to={`/layout/projects/projectdetails?id=${callDetail.fk_project}&page=1`}>
                          <img
                            className={styles.linkIcon}
                            src={OpenIcon}
                          />
                        </Link>
                      }

                    </div>
                  </div>)
                  : (
                    <>
                      <div className={styles.row}>
                        <div className={styles.label}>Project ID</div>
                        <div className={styles.value}>
                          #{callDetail.fk_project}{" "}
                          <Link target={'_blank'} to={`/layout/projects/projectdetails?id=${callDetail.fk_project}&page=1`}>
                            <img
                              className={styles.linkIcon}
                              src={OpenIcon}
                            />
                          </Link>
                        </div>
                      </div>
                      <div className={styles.row}>
                        <div className={styles.label}>Call ID</div>
                        <div className={styles.value}>#{callDetail.id}{" "}
                          <Link target={'_blank'} to={`/layout/calls?call_id=${callDetail.id}`}>
                            <img
                              className={styles.linkIcon}
                              src={OpenIcon}
                            />
                          </Link>
                        </div>
                      </div>
                      {callDetail?.zoom_account_used && <div className={styles.row}>
                        <div className={styles.label}>Account used</div>
                        <div className={styles.value}>
                          {ZoomEmailMap[callDetail?.zoom_account_used] || callDetail?.zoom_account_used || " "}
                        </div>
                      </div>}
                      {callDetail?.zoom_host_key !== undefined && (
                        <div className={styles.row}>
                          <div className={styles.label}>Zoom Host Key</div>
                          <div className={styles.value}>
                            <span>
                              {showHostKey ? callDetail.zoom_host_key : '******'}
                            </span>
                            <IconButton onClick={handleToggleHostKey}>
                              {showHostKey ? <KeyOff /> : <Key />}
                            </IconButton>
                          </div>
                        </div>
                      )}
                    </>
                  )
              ) : null}
              {getFormattedDetails(callDetail).map((data) => {
                if (!data.value) return <></>;

                return (
                  <div className={styles.row} key={data.value}>
                    <div className={styles.label}>{data.label}</div>
                    <div className={styles.value}>{data.value}</div>
                  </div>
                );
              })}
            </div>
          </div>

          <BoxFlex sx={{ gap: "0.5rem", flexWrap: "wrap" }}>
            {showReschduleNCancelBtn && (isAdmin() || isSuperAdmin()) &&
              <>
                <div className={styles.reScheduleOrCancelBtn}>
                  <CustomBtnFilled
                    variant="outlined"
                    label="Reschedule/Cancel"
                    onClick={openRescheduleAndCancelForm}
                  />
                </div>

                {/* Rescheduled and Cancel Form */}
                <ReScheduleOrCancelCallDialog
                  isOpen={isOpenRescheduleAndCancel}
                  handleClose={() => {
                    closeDialog();
                    closeRescheduleAndCancelForm()
                  }}
                  expert_id={callDetail.fk_expert || null}
                  project_id={callDetail.fk_project?.toString() || null}
                  refetch={refetch}
                  schedule_call_array={schedule_call_arr}
                  is_calendar_page
                />
              </>
            }

            {call_link && showReschduleNCancelBtn && (isAdmin() || isSuperAdmin()) &&
              <div className={styles.reScheduleOrCancelBtn}>
                <CustomBtnFilled
                  variant="outlined"
                  label="Copy Meeting Details"
                  onClick={openCopyMeetingDetails}
                />
              </div>
            }

            {showLogCallBtn && openLogCall && show_log_call &&
              <div className={styles.reScheduleOrCancelBtn}>
                <CustomBtnFilled
                  label="Log Call"
                  variant="contained"
                  onClick={() => {
                    callDetail.fk_expert && callDetail.id && openLogCall(callDetail.fk_expert, callDetail.id)
                  }}
                />
              </div>
            }


            {zoom_meeting_id && showZoomReportsBtn && (isAdmin() || isSuperAdmin()) &&
              <>
                <div className={styles.reScheduleOrCancelBtn}>
                  <CustomBtnFilled
                    variant="outlined"
                    label="Meeting Report"
                    onClick={openZoomReportsForm}
                  />
                </div>


                {/* Zoom Reports Dialog */}
                <ZoomDialog
                  zoomDialogOpen={isOpenZoomReports}
                  zoomID={zoom_meeting_id}
                  handleClose={closeZoomReportsForm}
                />
              </>
            }
          </BoxFlex>
        </DialogContent>
      </Dialog>

      {/* Copy Meeting Details */}
      {isCopyMeetingDetailsOpen &&
        <DialogModal
          isOpen={isCopyMeetingDetailsOpen}
          handleClose={closeCopyMeetingDetails}
          title={"Meeting Details"}
          TitleEl={
            <CustomBtnFilled
              variant="outlined"
              label="Copy Meeting Details"
              onClick={handleCopyToClipboard}
            />
          }
        >
          <Box ref={copyMeetingDetailsComponentRef} sx={{ p: "0.5rem", backgroundColor: "#f5f4f4" }}>
            <RichTextDisplayer
              text={call_link}
            />
          </Box>
        </DialogModal>
      }
    </ThemeProvider>
  );
}
