import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material";
import Fields from "./fields";
import { defaultFormTheme } from "../../../../../../atoms/defaultFormTheme";
import {
  ScheduleCallFormDefault,
  ScheduleCallFormTypes,
  ZoomSetttingsFormDefault,
} from "../helper";
import { RequestServer } from "../../../../../../utils/services";
import { APIRoutes } from "../../../../../../constants";
import { usePeMappingContext } from "../../../helper";
import { useSnackbar } from "notistack";
import { LocalDayjs, getISTDateTime } from "../../../../../../utils/timezoneService";
import { Dayjs } from "dayjs";
import getDurationOptions from "../../../../../../utils/getDurationOptions";
import { useFullPageLoading } from "../../../../../../atoms/full-page-loading/loadingContext";
import { removeWhiteSpacesFromForm } from "../../../../../../utils/utils";
import { formatCallDuration, functionReturnZoomObject } from "./helper";

type Props = {
  allowUseContext: boolean;
  handleClose: () => void;
  handleSubmitClose: () => void;
  pe_id: number;
  project_id: string | null;
  startTime?: Dayjs | null;
  duration?: number | null;
  openCallError: (text: string) => void;
  openCallDetails: (id: number) => void;
  client_participant_invitation_text: string;
  formdefaultValues?: ScheduleCallFormTypes;
  call_id?: number;
};


const ShortlistForm = ({ allowUseContext, handleClose, handleSubmitClose, pe_id, project_id, startTime,
  duration, openCallError, formdefaultValues, call_id, openCallDetails,client_participant_invitation_text }: Props) => {

  const { refetch } = allowUseContext ? usePeMappingContext() : { refetch: () => { } };
  const { enqueueSnackbar } = useSnackbar();
  const { setLoading } = useFullPageLoading();

  const onSubmit: SubmitHandler<ScheduleCallFormTypes> = async (formData) => {
    const isEdit = !!call_id;
    const newFormData = removeWhiteSpacesFromForm(formData, [])

    if (!newFormData.scheduled_start_time) {
      enqueueSnackbar("Start time required", {
        variant: "warning",
      });
      return
    }

    if (!newFormData.call_title_for_expert) {
      enqueueSnackbar("Expert call title required", {
        variant: "warning",
      });
      return
    }

    if (!newFormData.invitation_text_for_expert) {
      enqueueSnackbar("Expert invitation text required", {
        variant: "warning",
      });
      return
    }

    if (!newFormData.client_participants.length) {
      enqueueSnackbar("Client participants required", {
        variant: "warning",
      });
      return
    }

    if (!newFormData.invitation_text) {
      enqueueSnackbar("Client invitation text required", {
        variant: "warning"
      })
      return;
    }

    if (!newFormData.title) {
      enqueueSnackbar("Client title required", {
        variant: "warning"
      })
      return;
    }

    const payload: any = {
      action: isEdit ? "RescheduleCall" : "ScheduleCall",
      pe_id: pe_id,
      scheduled_start_time: getISTDateTime(newFormData.scheduled_start_time),
      scheduled_end_time: newFormData.duration ? getISTDateTime(LocalDayjs(newFormData.scheduled_start_time).add(+newFormData.duration.value, "minutes")) : null,
      title: newFormData.title,
      invitation_text: newFormData.invitation_text,
      client_participants: newFormData.client_participants.map(item => item.value).join(","),
      call_title_for_expert: newFormData.call_title_for_expert,
      invitation_text_for_expert: newFormData.invitation_text_for_expert,
      do_not_send_email: newFormData.doNotSendEmail ? 1 : 0,
      research_analyst: newFormData.research_analyst?.value,
      name_masking: newFormData?.zoomSettings?.masking_participant|| false ,
    };

    if (call_id) {
      payload.id = call_id;
    }
    
    
    if (newFormData.videoLinkOption == 'zoom') {
      payload['zoomSettings'] = functionReturnZoomObject(newFormData, newFormData.zoomSettings || ZoomSetttingsFormDefault);
    } else if (newFormData.videoLinkOption == 'manual') {
      payload['call_link'] = newFormData.meetingLink;
    }

    setLoading(true);
    try {
      const response = await RequestServer(
        APIRoutes.scheduleCall,
        isEdit ? "PATCH" : "POST",
        payload
      );

      if (response.success) {
        enqueueSnackbar(`Call scheduled Successfully.`, {
          variant: "success",
        });

        const id = call_id || response.data.id;
        openCallDetails && openCallDetails(id);
        if (allowUseContext) {
          refetch();
        }
      } else {
        console.log({ response });
        enqueueSnackbar(response.message.toString(), {
          variant: "warning",
        });
        openCallError(response.message.toString());
      }
    } catch (err) {
      console.log(err);
      enqueueSnackbar("Request failed.", { variant: "error" });
    } finally {
      setLoading(false);
    }
  };

  let defaultValues = formdefaultValues ? { ...formdefaultValues } : { ...ScheduleCallFormDefault };

  if (duration) {
    const dur = formatCallDuration(duration);

    defaultValues.duration = dur;
    defaultValues.scheduled_start_time = startTime;
  }

  // Add the Invitation Text only if we didn't provide formdefaultValues - invitation_text
  if(client_participant_invitation_text && !formdefaultValues?.invitation_text) {
    defaultValues.invitation_text = client_participant_invitation_text;
  }

  const methods = useForm({ defaultValues });

  const defaultTheme = createTheme(defaultFormTheme);

  return (
    <FormProvider {...methods}>
      <ThemeProvider theme={defaultTheme}>
        <form onSubmit={methods.handleSubmit(onSubmit)} noValidate>
          <Fields handleClose={handleClose} project_id={project_id} />
        </form>
      </ThemeProvider>
    </FormProvider>
  );
};

export default ShortlistForm;
