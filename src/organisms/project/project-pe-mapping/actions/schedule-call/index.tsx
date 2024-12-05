import { Dayjs } from "dayjs";
import ScheduleCallForm from "./form";
import CallError from "./after-schedule-dialog/errorDialog";
import { useEffect, useState } from "react";
import { ScheduleCallFormTypes } from "./helper";
import { ShowCallDetails } from "./after-schedule-dialog/showCallDetails";
import { APIRoutes } from "../../../../../constants";
import { RequestServer } from "../../../../../utils/services";
import EmailFormatDialog from "../share-profile/email-format-dialog";
import { BoxFlex } from "../../../../../atoms/boxSpaceBtw";
import CircularProgress from "@mui/material/CircularProgress";

type Props = {
  allowUseContext: boolean;
  handleClose: () => void;
  handleSubmitClose: () => void;
  pe_id: number | null;
  project_id: string | null;
  startTime?: Dayjs | null;
  duration?: number | null;
  defaultValues?: ScheduleCallFormTypes;
  call_id?: number;
};

const ScheduleCall = ({
  allowUseContext,
  handleClose,
  handleSubmitClose,
  pe_id,
  project_id,
  startTime,
  duration,
  defaultValues,
  call_id
}: Props) => {
  const [callError, setCallError] = useState({
    state: false,
    error: ""
  });
  const [callDetailsDialog, setCallDetailsDialog] = useState<{ state: boolean, call_id: number | null }>({
    state: false,
    call_id: null
  });

  const [clientInvitationText, setClientInvitationText] = useState<string | null>(null);
  const [emailDetails, setEmailDetails] = useState<{
    expert_id: number | null,
    meta: any,
    pe_meta: any
  }>({
    expert_id: null,
    meta: {},
    pe_meta: {}
  });

  useEffect(() => {

    (async function () {
      if (!defaultValues?.invitation_text && pe_id) {
        const pe_expert_response = await RequestServer(APIRoutes.peMapping + "?id=" + pe_id + "&show_columns=id,fk_expert,meta", "GET");

        if (pe_expert_response.success) {
          const expert_response = await RequestServer(APIRoutes.getExpert + "?id=" + pe_expert_response.data[0].fk_expert + "&show_columns=id,meta", "GET");

          const expert_data = expert_response.data[0];

          const expert_id = expert_data.id;
          const meta = expert_data.meta;
          const pe_meta = pe_expert_response.data[0].meta;

          setEmailDetails({ expert_id, meta, pe_meta });
        }
      } else {
        setClientInvitationText("");
      }
    })();
  }, [pe_id]);

  return (
    <>
      {pe_id && (clientInvitationText || defaultValues?.invitation_text) ? (
        <ScheduleCallForm
          startTime={startTime} duration={duration}
          handleClose={handleClose}
          handleSubmitClose={handleSubmitClose}
          pe_id={pe_id}
          project_id={project_id}
          allowUseContext={allowUseContext}
          openCallDetails={(id: number) => {
            setCallDetailsDialog(() => ({ state: true, call_id: id }))
          }}
          openCallError={(text: string) => setCallError(() => ({ error: text, state: true }))}
          formdefaultValues={defaultValues}
          call_id={call_id}
          client_participant_invitation_text={clientInvitationText || ""}
        />
      ):
      <CircularProgress sx={{mt: "10px"}} />
      }

      {/* Call Error Dialog */}
      <CallError
        isOpen={callError.state}
        text={callError.error}
        handleClose={() => setCallError(() => ({ error: "", state: false }))}
      />

      {/* Call Detail Dialog */}
      {callDetailsDialog.call_id &&
        <ShowCallDetails
          isOpen={callDetailsDialog.state}
          handleClose={() => {
            handleSubmitClose();
            setCallDetailsDialog(() => ({ call_id: null, state: false }));
          }}
          call_id={callDetailsDialog.call_id}
        />
      }


      {/* Only used to get the component as a string to fill in the client Invitation Text */}
      <BoxFlex sx={{ display: "none" }}>
        {emailDetails.expert_id && emailDetails.meta && emailDetails.pe_meta &&
          <EmailFormatDialog
            isOpen={false}
            isBulkFirst
            forBulk
            handleClose={() => { }}
            expert_id={emailDetails.expert_id}
            meta={emailDetails.meta}
            relevant_company={emailDetails.meta?.current_company?.name}
            relevant_designation={emailDetails.meta?.current_company?.designation}
            snippet={emailDetails.pe_meta?.snippet}
            charges={emailDetails.pe_meta.selling_price_currency && emailDetails.pe_meta.selling_price ? `${emailDetails.pe_meta.selling_price_currency} ${emailDetails.pe_meta.selling_price}` : ""}
            componentHtml={(html) => setClientInvitationText(html)}
          />
        }
      </BoxFlex>
    </>
  );
};

export default ScheduleCall;
