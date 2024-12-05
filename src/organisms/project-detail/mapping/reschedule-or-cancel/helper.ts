import { EnqueueSnackbar } from "notistack";
import { APIRoutes } from "../../../../constants";
import { RequestServer } from "../../../../utils/services";
import { LocalDayjs } from "../../../../utils/timezoneService";

type ScheduleCall = {
  label: string;
  value: number;
  callTime: string;
};

export type ScheduleCallsArr = ScheduleCall[];

export type FormData = {
  schedule_call: ScheduleCall;
  reschedule_or_cancel: "reschedule" | "cancel";
};

export const rescheduleCancelCall = [
  {
    label: "Reschedule",
    value: "reschedule",
  },
  {
    label: "Cancel",
    value: "cancel",
  },
];

export const formatScheduleCalls = (expert_calls: any[]) => {
  let schedule_call_arr: ScheduleCallsArr = [];

  if (expert_calls) {
    expert_calls.forEach((call: any) => {
      schedule_call_arr.push({
        value: call.id,
        label: `${LocalDayjs(call.scheduled_start_time).format(
          "DD-MMM-YY hh:mm A"
        )} - ${LocalDayjs(call.scheduled_end_time).format("hh:mm A")} | ${
          call.title
        }`,
        callTime: call.scheduled_start_time,
      });
    });
  }

  return schedule_call_arr;
};

export const cancelCall = async (
  id: number,
  enqueueSnackbar: EnqueueSnackbar,
  setLoading: (b: boolean) => void
) => {
  setLoading(true);
  try {
    const payload = {
      action: "Delete",
      id,
    };

    const response = await RequestServer(
      APIRoutes.scheduleCall,
      "PATCH",
      payload
    );

    if (response.success) {
      enqueueSnackbar(response.message, {
        variant: "success",
      });
    } else {
      console.log(response);
      enqueueSnackbar(response.message, {
        variant: "warning",
      });
    }
  } catch (err) {
    console.error(err);
    enqueueSnackbar("Request failed.", { variant: "error" });
  } finally {
    setLoading(false);
  }
};