import DialogModal from '../../dialog'
import { Grid } from '@mui/material'
import { useIsMobile } from '../../../utils/hooks/useIsMobile';
import { SetZoomDialogOpen, ZoomMeetingParticipantsResponse, ZoomReportsApiResponse } from './types';
import CustomBtnFilled from '../../form-molecules/CustomBtnFilled';
import { onZoomReportsClickHandler } from '../../../pages/Calls/helpers';
import { useEffect, useState } from 'react';
import { RequestServer } from '../../../utils/services';
import { APIRoutes } from '../../../constants';
import NoResultFoundFilters from '../../noResultsFilters';
import { useFullPageLoading } from '../../full-page-loading/loadingContext';
import { downloadExcel } from '../../../utils/download-excel';
import { ZoomReportsFormat } from './helper';

type Props = {
    zoomDialogOpen: boolean;
    handleClose: () => void
    zoomID: string | null
}

const ZoomDialog = ({ zoomDialogOpen, handleClose, zoomID }: Props) => {
    const isMobile = useIsMobile();
    const [zoomCallDetails, setZoomCallDetails] = useState<ZoomMeetingParticipantsResponse | null>(null);
    const { setLoading, isLoading } = useFullPageLoading();
    const [page, setPage] = useState({
        current: 0,
        max: 0
    });

    const getZoomDetails = async (zoomID: string | null) => {
        try {
            setLoading(true);
            const response: ZoomMeetingParticipantsResponse = await RequestServer(APIRoutes.getZoomReports + "?id=" + zoomID, "GET");

            if (response.success) {
                setZoomCallDetails(response);
                setPage({
                    current: 0,
                    max: response.data.length - 1
                })
            } else {
                setZoomCallDetails(null);
            }
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (zoomDialogOpen) {
            getZoomDetails(zoomID);
        }
    }, [zoomID, zoomDialogOpen])

    const downloadReportExcel = async () => {
        if (zoomCallDetails && zoomID) {
            await downloadExcel({
                title: "Zoom Meeting Reports",
                data: [ZoomReportsFormat(zoomCallDetails.data, 0, zoomID)]
            }, setLoading)
        }
    }

    return (
        <DialogModal isOpen={zoomDialogOpen} handleClose={() => handleClose()} title={"Zoom Meeting Participants"} children={
            <>
                {!isLoading &&
                    <>

                        {zoomCallDetails ?
                            <Grid container sx={{ display: "flex", flexDirection: "column", alignItems: "stretch", mt: "1rem" }}>
                                <Grid xs={12} item container spacing={1} alignItems="center" justifyContent="center" marginBottom={1.5}>
                                    <Grid item xs={1} sx={{ fontWeight: "bold", wordBreak: "break-all", ...(isMobile && { typography: 'body2' }) }}>S.No</Grid>
                                    <Grid item xs={3} sx={{ fontWeight: "bold", ...(isMobile && { typography: 'body2' }) }}>Name</Grid>
                                    <Grid item xs={2} sx={{ fontWeight: "bold", ...(isMobile && { typography: 'body2' }) }}>Duration</Grid>
                                    <Grid item xs={3} sx={{ fontWeight: "bold", ...(isMobile && { typography: 'body2' }) }}>Join Time</Grid>
                                    <Grid item xs={3} sx={{ fontWeight: "bold", ...(isMobile && { typography: 'body2' }) }}>Leave Time</Grid>
                                </Grid>
                                {zoomCallDetails?.data?.map((element, index: number) => (
                                    <Grid xs={12} item container key={element.user_id} spacing={1} alignItems="center" justifyContent="center" marginBottom={1}>
                                        <Grid item xs={1} sx={{ display: "flex", justifyContent: "flex-start", ...(isMobile && { typography: 'body2' }) }}>{index + 1}</Grid>
                                        <Grid item xs={3} sx={{ display: "flex", justifyContent: "flex-start", ...(isMobile && { typography: 'body2' }) }}>{element?.name}</Grid>
                                        <Grid item xs={2} sx={{ display: "flex", justifyContent: "flex-start", ...(isMobile && { typography: 'body2' }) }}>{element?.duration}</Grid>
                                        <Grid item xs={3} sx={{ display: "flex", justifyContent: "flex-start", ...(isMobile && { typography: 'body2' }) }}>{element?.join_time}</Grid>
                                        <Grid item xs={3} sx={{ display: "flex", justifyContent: "flex-start", ...(isMobile && { typography: 'body2' }) }}>{element?.leave_time}</Grid>
                                    </Grid>
                                ))}
                                <Grid item container xs={12} alignItems="center" justifyContent="flex-end" display={"flex"}>
                                    <CustomBtnFilled
                                        variant='outlined'
                                        label='Meeting Reports'
                                        onClick={downloadReportExcel}
                                    />
                                </Grid>
                            </Grid>
                            : <NoResultFoundFilters text='No Zoom Reports Found' sx={{ marginBottom: "1rem" }} />
                        }
                    </>
                }
            </>

        } />
    )
}

export default ZoomDialog