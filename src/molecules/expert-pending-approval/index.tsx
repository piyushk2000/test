import Typography from "@mui/material/Typography"
import Grid from "@mui/material/Grid"
import Box from "@mui/material/Box";
import CustomBtnFilled from "../../atoms/form-molecules/CustomBtnFilled";
import { Stack, Tooltip } from "@mui/material";
import { changesBoxStyles, expertPendingHeadingStyles, pendingApprovalAction } from "./helper";
import { useSnackbar } from "notistack";
import { useExpertPendingApprovalsContext } from "../../organisms/expert-pending-approval/context";
import { InfoNameType } from "../../organisms/expert-pending-approval/type";
import { isExpert } from "../../utils/role";
import { useIsMobile } from "../../utils/hooks/useIsMobile";
import { useFullPageLoading } from "../../atoms/full-page-loading/loadingContext";

interface Props {
    heading: string;
    OldChangesEl: JSX.Element | null;
    NewChangesEl: JSX.Element | null;
    payloadId: number;
    info_name: InfoNameType;
    isAdded?: boolean;
    isDeleted?: boolean;
    showApprovDeclineBtn?: boolean;
}

function ExpertPendingApproval({ heading, OldChangesEl, NewChangesEl, payloadId, info_name, isAdded = false, isDeleted = false, showApprovDeclineBtn = true }: Props) {
    const { enqueueSnackbar } = useSnackbar();
    const { setData } = useExpertPendingApprovalsContext();
    const { setLoading } = useFullPageLoading();

    return (
        <Grid item container xs={12} sx={{ backgroundColor: "white", borderRadius: "10px" }}>
            <Grid item xs={12}>
                <Typography variant="h2" sx={{ fontSize: "1rem", fontWeight: "600", padding: "20px 20px" }}>
                    {heading}
                </Typography>
            </Grid>

            {!isAdded &&
                <Grid container item xs={12} sx={changesBoxStyles(false)}>
                    <Grid item xs={12}>
                        <Box>
                            <Typography variant="h2" sx={expertPendingHeadingStyles(false)}>
                                {isDeleted ? "Deleted" : "Current"}
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12}>
                        {OldChangesEl}
                    </Grid>
                </Grid>
            }

            {!isDeleted &&
                <Grid item xs={12} sx={changesBoxStyles(true)}>
                    <Typography variant="h2" sx={expertPendingHeadingStyles(true)}>
                        {isAdded ? "Added" : isExpert() ? "Your Changes" : "Expert Changes"}
                    </Typography>
                    {NewChangesEl}
                </Grid>
            }

            {!isExpert() && showApprovDeclineBtn &&
                <Grid
                    sx={{
                        padding: "20px",
                        display: "flex",
                        justifyContent: "flex-end",
                        gap: "1rem",
                    }}
                    item
                    xs={12}
                >
                    <CustomBtnFilled
                        label="Decline"
                        variant="outlined"
                        onClick={async () => {
                            await pendingApprovalAction("Reject", payloadId, enqueueSnackbar, setData, info_name, setLoading)
                        }}
                    />
                    <CustomBtnFilled
                        label="Approve"
                        variant="contained"
                        onClick={async () => {
                            await pendingApprovalAction("Approv", payloadId, enqueueSnackbar, setData, info_name, setLoading)
                        }}
                    />
                </Grid>
            }
        </Grid>
    )
}


export const TitleValueEl = ({ title,
    value, minWidth }: {
        title: string,
        value: string | null,
        minWidth?: string,
    }) => {
    const isMobile = useIsMobile();
    return (
        <Stack direction={isMobile ? "column" : "row"} gap={isMobile ? "0.25rem" : "1rem"} mt={"10px"}
            sx={{
                "& p": {
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                },
                "& .title": {
                    fontWeight: "500",
                    minWidth: minWidth || "80px"
                }
            }}
        >
            <p className="title">{title}</p>
            <Tooltip title={value || ""} arrow>
                <p>{value || "NA"}</p>
            </Tooltip>
        </Stack>
    )
}


export default ExpertPendingApproval