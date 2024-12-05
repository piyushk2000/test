import { Grid } from "@mui/material";
import DialogModal from "../../../../../atoms/dialog";
import FormCancelSubmitBtns from "../../../../../atoms/formCancelSubmitBtns";
import { RequestServer } from "../../../../../utils/services";
import { APIRoutes } from "../../../../../constants";
import { useSnackbar } from "notistack";
import { useFullPageLoading } from "../../../../../atoms/full-page-loading/loadingContext";
import React, { useState } from "react";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

type Props = {
    isOpen: boolean;
    handleClose(): void;
    refetch: () => Promise<void>,
    id: number | null,
    show_compliance_status: boolean;
    is_auto_rejected: boolean;
}

const RevertReject = ({ isOpen, handleClose, refetch, id, show_compliance_status, is_auto_rejected }: Props) => {
    const { enqueueSnackbar } = useSnackbar();
    const { setLoading } = useFullPageLoading();
    const [complianceStatus, setComplianceStatus] = React.useState("");

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setComplianceStatus((event.target as HTMLInputElement).value);
    };


    const revertReject = async () => {
        const payload: any = {
            action: "RevertReject",
            id,
        };

        if (show_compliance_status) {
            if (!complianceStatus) {
                enqueueSnackbar("Select compliance status", { variant: "warning" });
                return;
            } else {
                payload.compliance_status = complianceStatus;
            }
        }

        setLoading(true);
        try {
            const response = await RequestServer(APIRoutes.peMapping, "PATCH", payload);
            if (response.success) {
                enqueueSnackbar(
                    "The expert's status for this project has been restored",
                    {
                        variant: "success",
                    }
                );
                handleClose();
                refetch();
            } else {
                console.log("Response", response);
                enqueueSnackbar(response.message, {
                    variant: "success",
                });
            }
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <DialogModal
            title={"Revert Reject"}
            isOpen={isOpen}
            handleClose={handleClose}
        >
            <Grid container spacing={2} mt={"10px"}>
                <Grid item xs={12}>
                    <p style={{ fontSize: "14px", fontWeight: "500" }}>
                        Are you sure you want to restore to expert's status for this project?
                    </p>
                </Grid>
                {show_compliance_status &&
                    <Grid item xs={12}>
                        <FormControl>
                            <FormLabel id="compliance_status">Compliance Status</FormLabel>
                            <RadioGroup
                                aria-labelledby="compliance_status"
                                name="compliance-status"
                                row
                                value={complianceStatus}
                                onChange={handleChange}
                            >
                                <FormControlLabel value="Answered" control={<Radio />} label="Answered" />
                                <FormControlLabel value="SharedWithExpert" control={<Radio />} label="Shared With Expert" />
                                {!is_auto_rejected &&
                                    <FormControlLabel value="SharedWithClient" control={<Radio />} label="Shared With Client" />
                                }
                            </RadioGroup>
                        </FormControl>
                    </Grid>
                }
                <FormCancelSubmitBtns
                    handleClose={handleClose}
                    handleSubmitBtnClick={revertReject}
                />
            </Grid>
        </DialogModal>
    )
}

export default RevertReject;