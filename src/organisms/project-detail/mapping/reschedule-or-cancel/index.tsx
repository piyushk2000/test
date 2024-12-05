import { useSnackbar } from 'notistack';
import DialogModal from '../../../../atoms/dialog'
import { APIRoutes } from '../../../../constants';
import { useFetch } from '../../../../utils/hooks/useFetch';
import { RescheduleCancelContext } from './context';
import ReScheduleOrCancelCallForm from './form';
import { FormData, ScheduleCallsArr, cancelCall, formatScheduleCalls } from './helper';
import { useFullPageLoading } from '../../../../atoms/full-page-loading/loadingContext';
import dayjs from 'dayjs';
import { LocalDayjs } from '../../../../utils/timezoneService';
import { removeWhiteSpacesFromForm } from '../../../../utils/utils';
import { ReScheduleCallDialog } from '../../../project/project-pe-mapping/actions/reschedule-call';
import { useState } from 'react';

type Props = {
    isOpen: boolean;
    handleClose: () => void;
    expert_id: number | null;
    project_id: string | null;
    refetch: () => void;
    schedule_call_array?: ScheduleCallsArr;
    is_calendar_page?: boolean;
}

const ReScheduleOrCancelCallDialog = ({ isOpen, handleClose, expert_id, project_id, refetch, schedule_call_array, is_calendar_page }: Props) => {
    const { data: expert_calls } = useFetch(APIRoutes.scheduleCall + "?status=Scheduled&show_columns=id,title,scheduled_start_time,scheduled_end_time&fk_expert=" + expert_id + "&fk_project=" + project_id, {
        variables: [!schedule_call_array?.length]
    });
    const schedule_call_arr = schedule_call_array || formatScheduleCalls(expert_calls);
    const { enqueueSnackbar } = useSnackbar();
    const { setLoading } = useFullPageLoading();
    const [reScheduleDialog, setReScheduleDialog] = useState<{ call_id: number | null, state: boolean }>({
        call_id: null,
        state: false
    });

    const onSubmit = async (formData: FormData) => {
        const newFormData = removeWhiteSpacesFromForm(formData, [])
        if (newFormData.reschedule_or_cancel === "cancel") {
            await cancelCall(newFormData.schedule_call.value, enqueueSnackbar, setLoading);
            // reason to refetch in PE Mapping Values => 
            // Because after cancelling a call - expert can have zero call schedule and
            // this is the easier way to remove the expert from the Schedule status if the call_scheduled are ZERO.
            refetch();
            handleClose();
        } else if (newFormData.reschedule_or_cancel === "reschedule") {
            setReScheduleDialog(({ call_id: newFormData.schedule_call.value, state: true }))
        }
    }

    const defaultValues = {
        schedule_call: null,
        call_date: null,
        duration: null,
        reschedule_or_cancel: null
    }

    return (
        <RescheduleCancelContext.Provider value={{
            scheduleCalls: schedule_call_arr,
            handleClose
        }}>
            <DialogModal
                isOpen={isOpen}
                title="Reschedule or Cancel Call"
                handleClose={handleClose}
            >
                <ReScheduleOrCancelCallForm
                    onSubmit={onSubmit}
                    defaultValues={defaultValues}
                />
            </DialogModal>

            {/* ReSchedule Dialog */}
            {reScheduleDialog.call_id &&
                <ReScheduleCallDialog
                    isOpen={reScheduleDialog.state}
                    handleClose={() => {
                        setReScheduleDialog(() => ({ call_id: null, state: false }))
                        handleClose();
                    }}
                    callId={reScheduleDialog.call_id}
                    handleSubmitClose={() => {
                        setReScheduleDialog((prev) => ({ call_id: null, state: false }))
                        // if the dialog is in my Calendar Page , refetch only then
                        is_calendar_page && refetch();
                        handleClose();
                    }}
                />
            }

        </RescheduleCancelContext.Provider>
    )
}

export default ReScheduleOrCancelCallDialog