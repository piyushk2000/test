import DialogModal from "../../../../../atoms/dialog";
import { APIRoutes } from "../../../../../constants";
import { useFetch } from "../../../../../utils/hooks/useFetch";
import ScheduleCall from "../schedule-call";
import { ScheduleCallFormTypes } from "../schedule-call/helper";
import { useEffect, useState } from "react";
import { getDefaultValues } from "./helper";
import { CircularProgress } from "@mui/material";

type Props = {
    isOpen: boolean;
    handleClose(): void;
    handleSubmitClose(): void;
    callId: number;
}

export function ReScheduleCallDialog({ isOpen, handleClose, callId, handleSubmitClose }: Props) {
    const { formattedData: data } = useFetch(APIRoutes.scheduleCall + "?id=" + callId + "&show_columns=fk_pe,fk_project,scheduled_start_time,scheduled_end_time,zoom_meeting_id,call_link,zoom_api_request,title,call_title_for_expert,invitation_text_for_expert,invitation_text,client_participants,research_analyst", {
        formatter(data) {
            return data && data[0];
        },
    });
    const [defaultValues, setDefaultValues] = useState<ScheduleCallFormTypes | null>(null)


    useEffect(() => {
        if (data) {
            getDefaultValues(data,setDefaultValues);
        }
    }, [data]);

    return (
        <DialogModal
            isOpen={isOpen}
            handleClose={handleClose}
            title={"ReSchedule Call"}
        >
            {(data && defaultValues) ?
                <ScheduleCall
                    allowUseContext={false}
                    handleClose={handleClose}
                    handleSubmitClose={handleSubmitClose}
                    pe_id={data.fk_pe}
                    project_id={data.fk_project}
                    defaultValues={defaultValues}
                    call_id={callId}
                /> : <CircularProgress sx={{marginTop: "10px"}} />
            }

        </DialogModal>
    )
}