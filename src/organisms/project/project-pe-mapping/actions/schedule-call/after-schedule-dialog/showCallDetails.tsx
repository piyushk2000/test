import { useEffect, useState } from "react";
import { APIRoutes } from "../../../../../../constants";
import CallDetailModal from "../../../../../../molecules/call-detail-modal";
import { useFetch } from "../../../../../../utils/hooks/useFetch";
import { ScheduledCall } from "../../../../../project-calendar/types";
import { RequestServer } from "../../../../../../utils/services";


type Props = {
    isOpen: boolean;
    handleClose(): void;
    call_id: number;
}

export function ShowCallDetails({ isOpen, handleClose, call_id }: Props) {
    const [callDetail, setCallDetail] = useState<Partial<ScheduledCall> | null>(null);

    useEffect(() => {
        if(isOpen) {
            (async function() {
                const response = await RequestServer(APIRoutes.scheduleCall + "?id=" + call_id + "&embed=YES","GET");

                if(response.success) {
                    setCallDetail(response.data[0]);
                }
            })()
        }
    },[isOpen]);

    return (
        <>
            {isOpen && callDetail &&
                <CallDetailModal
                    open={isOpen}
                    closeDialog={handleClose}
                    callDetail={callDetail}
                    showReschduleNCancelBtn={(callDetail?.status === "Scheduled")}
                />
            }
        </>
    )
}