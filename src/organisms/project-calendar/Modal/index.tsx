import { useContext } from "react";
import { formatSingleEvent } from "../helper";
import { CalendarApi } from "fullcalendar";
import DialogModal from "../../../atoms/dialog";
import { FormProvider, useForm } from "react-hook-form";
import { defaultValues, getDefaultValues } from "./helper";
import { useSnackbar } from "notistack";
import Feilds from "./fields";
import { RequestServer } from "../../../utils/services";
import { APIRoutes } from "../../../constants";
import { LoadingContext } from "../../../atoms/loading/context";
import { LocalDayjs, getISTDateTime } from "../../../utils/timezoneService";
import { useGetParams } from "../../../utils/hooks/useGetParams";
import { isClient, isExpert } from "../../../utils/role";
import { removeWhiteSpacesFromForm } from "../../../utils/utils";

interface IModalInfosEventCalendaryProps {
  open: boolean;
  handleClose: () => void;
  eventInfos: any;
  isEditCard: boolean;
  refetch: () => Promise<void>;
  projectId: string | null;
  projectDetails: any;
}

export const ModalInfosEventCalendar = ({
  handleClose,
  open,
  eventInfos,
  isEditCard,
  refetch,
  projectId,
  projectDetails,
}: IModalInfosEventCalendaryProps) => {
  const { loading, setLoading } = useContext(LoadingContext);

  const expertId = useGetParams("expertId");
  const expertName = useGetParams("expertName");

  const methods = useForm({
    defaultValues: {
      type: "",
      expert: null,
      start_time: null,
      duration: "",
    }
  });
  const { enqueueSnackbar } = useSnackbar();

  const onSubmit = async (formData: any) => {
    if (isEditCard) {
    }
    setLoading(true);
    const newFormData = removeWhiteSpacesFromForm(formData, []) 

    const { type, expert, start_time, duration } = newFormData;

    let participant_id = "";
    let participant_name = "";
    let typeFromRole = ""
    if (isExpert()) {
      participant_id = localStorage.getItem("expert_id") || "";
      participant_name = localStorage.getItem("name") || "";
      typeFromRole = "Expert"
    } else if (isClient()) {
      participant_id = localStorage.getItem("client_id") || "";
      participant_name = localStorage.getItem("name") || "";
      typeFromRole = "Client"
    } else {
      participant_id =
        type === "Client" ? projectDetails[0].client_id : expert.value;
      participant_name =
        type === "Client" ? projectDetails[0].client_name : expert.label;
    }


    try {
      let response: any;

      console.log("eventInfos", eventInfos)
      if (isEditCard) {
        const payload = {
          action: "EditSlot",
          id: eventInfos.event.id,
          type: type || typeFromRole,
          start_time: getISTDateTime(start_time),
          end_time: getISTDateTime(
            LocalDayjs(start_time).add(duration, "minutes")
          ),
        };

        response = await RequestServer(APIRoutes.plan, "PATCH", payload);
      } else {
        const payload = {
          action: "AddSlot",
          participant_id,
          participant_name: participant_name || undefined,
          type: type || typeFromRole,
          project_id: projectId && parseInt(projectId),
          start_time: getISTDateTime(start_time),
          end_time: getISTDateTime(
            LocalDayjs(start_time).add(duration, "minutes")
          ),
        };
        response = await RequestServer(APIRoutes.plan, "POST", payload);
      }

      if (response.success) {
        methods.reset();
        await refetch();

        console.log(response.data);

        enqueueSnackbar(response.message, {
          variant: "success",
        });
        handleClose();
      } else {
        console.log({ response });
        if (response.error) {
          enqueueSnackbar(response?.error, { variant: "warning" });
        }
        if (response?.message) {
          enqueueSnackbar(response?.message?.toString(), {
            variant: "warning",
          });
        }
      }
    } catch (err) {
      console.error({ err });
      enqueueSnackbar("Request failed.", { variant: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <DialogModal
      title={
        isEditCard
          ? `Edit ${isClient() || isExpert() ? "your available " : ""}Time slot for ` +
          LocalDayjs(eventInfos?.event?.startStr).format("DD/MM/YYYY")
          : `Add ${isClient() || isExpert() ? "your available " : ""}Time slot for ` +
          LocalDayjs(eventInfos?.startStr).format("DD/MM/YYYY")
      }
      isOpen={open}
      handleClose={handleClose}
    >
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} noValidate>
          <Feilds
            handleClose={handleClose}
            eventInfos={eventInfos}
            isEditCard={isEditCard}
            projectId={projectId}
          />
        </form>
      </FormProvider>
    </DialogModal>
  );
};
