import { CircularProgress, Grid } from "@mui/material";
import DialogModal from "../../../atoms/dialog";
import dayjs, { LocalDayjs, LocalDayjsFromIST } from "../../../utils/timezoneService";
import { dateDifference } from "../../../utils/utils";
import { getTATProfileSharedFormat } from "../helper";
import React, { useEffect, useMemo } from "react";
import { RequestServer } from "../../../utils/services";
import { APIRoutes } from "../../../constants";
import { useSnackbar } from "notistack";

type Props = {
    isOpen: boolean;
    handleClose(): void;
    projectDetails?: any;
    expert_invitation_counts?: Record<string, number>;
}

export function TATDialog({ isOpen, handleClose, projectDetails, expert_invitation_counts }: Props) {
    const [highlight, setHighlight] = React.useState({ color: "black", bg: "white" })
    const first_profile_shared_date = projectDetails?.meta?.first_profile_shared_date;
    const first_call_done_date = projectDetails?.meta?.first_call_done_date;
    const receiving_date = projectDetails?.receiving_date;
    const group_name = projectDetails?.fk_group_value?.label;
    const internationalGroups = ["US-Abhay", "US-Ankur", "US-Vasundhara", "US-Yogesh group"];
    const isInternational = internationalGroups.includes(group_name);
    const { enqueueSnackbar } = useSnackbar();

    const profileShareTime = useMemo(() => {
        return dateDifference(receiving_date, first_profile_shared_date, false, isInternational)
    }, [receiving_date, first_profile_shared_date, isInternational])

    function formatWorkingTime(hours: number) {
        if (!hours && hours !== 0) return "";

        const days = Math.floor(hours / 9);
        const remainingHours = Math.floor(hours % 9);

        return `${days} working day${days !== 1 ? 's' : ''} and ${remainingHours} hr${remainingHours !== 1 ? 's' : ''}`;
    }

    const [serviceRatioData, setServiceRatioData] = React.useState<any>()



    async function fetchServiceRatio(projectId: number) {
        try {
            const response = await RequestServer(`${APIRoutes.projects}/tat?projectId=${projectId}`, 'GET');
            setServiceRatioData(response.data);
        } catch (error) {
            console.error('Error fetching service ratio:', error);
        }
    }

    useEffect(() => {
        if (projectDetails?.id) {
            fetchServiceRatio(projectDetails.id);
        }
    }, [projectDetails?.id]);

    const tat_profile_sharing: any = receiving_date && first_profile_shared_date ? dateDifference(receiving_date, first_profile_shared_date, false, isInternational) : null;
    const tat_call_done: any = receiving_date && first_call_done_date ? dateDifference(receiving_date, first_call_done_date, false, isInternational) : null;

    useEffect(() => {
        setHighlight(getTATProfileSharedFormat((profileShareTime).toString(), false))

    }, [profileShareTime])


    return (
        <DialogModal
            isOpen={isOpen}
            handleClose={handleClose}
            title={"TAT"}
        >
            <Grid container mt={1} rowSpacing={2} sx={{ fontSize: '14px', fontWeight: "500" }}>
                <Grid item xs={4}>
                    Received On Date :
                </Grid>
                <Grid item xs={6}>
                    {receiving_date ? LocalDayjs(receiving_date).format("DD/MM/YYYY hh:mm:ss A") : ""}
                </Grid>
                <Grid item xs={4}>
                    Profile shared on Date :
                </Grid>
                <Grid item xs={6}>
                    {first_profile_shared_date ? LocalDayjsFromIST(first_profile_shared_date).format("DD/MM/YYYY hh:mm:ss A") : ""}
                </Grid>
                <Grid item xs={4}>
                    Call Done on Date :
                </Grid>
                <Grid item xs={6}>
                    {first_call_done_date ? dayjs(first_call_done_date).format("DD/MM/YYYY hh:mm:ss A") : ""}
                </Grid>
                <Grid item xs={4}>
                    TAT (Profile Sharing) :
                </Grid>
                <Grid item xs={6}>
                    <p style={{ color: highlight.color, backgroundColor: highlight.bg, paddingLeft: "0.5rem", borderRadius: "1rem", marginLeft: "-0.5rem" }}>
                        {formatWorkingTime(tat_profile_sharing) || ""}</p>

                </Grid>
                <Grid item xs={4}>
                    TAT (Call Done) :
                </Grid>
                <Grid item xs={6}>
                    {formatWorkingTime(tat_call_done) || ""}
                </Grid>
                <Grid item xs={4}>
                    Service Ratio :
                </Grid>
                <Grid item xs={6}>
                    {serviceRatioData ?
                        `${(((serviceRatioData?.score * 100).toFixed(1)) + '%')} (P - ${serviceRatioData?.project_count} | WS - ${serviceRatioData?.ws_count} | EX - ${serviceRatioData?.extension_count})`
                        : <CircularProgress color="inherit" />}
                </Grid>
                <Grid item xs={12} sx={{ textAlign: "center", "& p": { fontSize: "18px" } }}>
                    <p>
                        Expert Invitation Count:
                    </p>
                </Grid>
                <Grid item xs={12} sx={{ textAlign: "center" }}>
                    {expert_invitation_counts && Object.keys(expert_invitation_counts).map((s, index) => (
                        <>
                            {s}: {expert_invitation_counts[s]}
                            {index === 4 ? "" : ", "}
                        </>
                    ))}
                </Grid>
            </Grid>
        </DialogModal>
    )
}