import { Grid, TextField, Typography } from "@mui/material";
import DialogModal from "../../../atoms/dialog";
import { RowsData } from "../types";
import { useState } from "react";
import { inputRowCommonStyles } from "../../../common/formStyles";
import FormCancelSubmitBtns from "../../../atoms/formCancelSubmitBtns";
import { useCEMappingExpertContext } from "../../../pages/ce-mapping-expert/context";
import { RequestServer } from "../../../utils/services";
import { APIRoutes } from "../../../constants";
import { useSnackbar } from "notistack";
import { useFullPageLoading } from "../../../atoms/full-page-loading/loadingContext";

type Props = {
    isOpen: boolean;
    handleClose(): void;
    data: RowsData;
}

export function PrioritizeExpertDialog({ isOpen, handleClose, data }: Props) {
    const { enqueueSnackbar } = useSnackbar();
    const {project_id, refetch} = useCEMappingExpertContext();
    const { setLoading } = useFullPageLoading();
    const [remarks, setRemarks] = useState<string>("");

    const prioritizeExpertSubmit = async () => {
        if(!project_id) {
            enqueueSnackbar("Project ID not found");
            return;
        }

        const payload: any = {
            project_id: +project_id,
            expert_id: data.id
        }

        if(remarks) {
            payload.remark = remarks;
        }

        setLoading(true);
        try {
            const response = await RequestServer(APIRoutes.PRIORITIZE_EXPERT, "PATCH", payload);

            if(response.success) {
                enqueueSnackbar(response.message,{variant: "success"});
                handleClose();

                // Used to re-fetch the page
                await refetch()
            } else {
                console.log({response});
                enqueueSnackbar(response.message, {variant: "warning"} )
            }
        } catch(err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    }

    return (
        <DialogModal
            title={"Prioritize Expert"}
            isOpen={isOpen}
            handleClose={handleClose}
        >
            <Grid container sx={{ mt: "10px" }} spacing={2}>
                <Grid item xs={12} sx={inputRowCommonStyles}>
                    <Typography sx={{ fontSize: "14px", fontWeight: "500" }}>Are You Sure you want to Prioritize this Expert ( {data.expert_name} ) ?</Typography>
                </Grid>
                <Grid item xs={12} sx={inputRowCommonStyles}>
                    <TextField
                        id="remark"
                        label="Remark (Optional)"
                        value={remarks}
                        sx={{width: "100%"}}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                            setRemarks(event.target.value);
                        }}
                    />
                </Grid>
                <FormCancelSubmitBtns 
                    submitLabel="Prioritize Expert"
                    handleClose={handleClose}
                    handleSubmitBtnClick={prioritizeExpertSubmit}
                />
            </Grid>

        </DialogModal>
    )
}