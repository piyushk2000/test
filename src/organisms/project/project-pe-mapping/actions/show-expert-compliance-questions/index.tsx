import DialogModal from "../../../../../atoms/dialog";
import AutoApprovalForm from "../../../../compliances/autoAprovalDialog";
import { useFetch } from "../../../../../utils/hooks/useFetch";
import { APIRoutes, AppRoutes } from "../../../../../constants";
import { CircularProgress, Grid } from "@mui/material";
import FormCancelSubmitBtns from "../../../../../atoms/formCancelSubmitBtns";
import { PeComplianceData } from "../../type";
import { OpenComplianceForm } from "./helper";
import { handleCopy } from "../../../../../molecules/expert-profile-sections/profile-section/helper";
import { useSnackbar } from "notistack";

type Props = {
    isOpen: boolean;
    handleClose(): void;
    pe_compliance:  PeComplianceData;
}

export default function ExpertComplianceDialog({ isOpen, handleClose, pe_compliance }: Props) {
    const { fk_compliance, unique_code } = pe_compliance;
    const { enqueueSnackbar } = useSnackbar();
    const { data } = useFetch(APIRoutes.EXPERT_COMPLIANCE + "?id=" + fk_compliance);
    const url = window.location.origin + AppRoutes.EXPERTCOMPLIANCE + "?unique_code=" + unique_code

    return (
        <DialogModal
            isOpen={isOpen}
            handleClose={handleClose}
            title={"Compliance's Questions"}
        >
            {data ?
                <>
                    <AutoApprovalForm
                        questions={data[0].questions}
                    />

                    <Grid container mt={2}>
                        <FormCancelSubmitBtns
                            handleClose={async () => { await handleCopy(url,enqueueSnackbar,"Expert Compliance Link") }}
                            cancelLabel="Copy Compliance Link"
                            submitLabel="Open Compliance"
                            handleSubmitBtnClick={() => OpenComplianceForm(url)}
                        />
                    </Grid>
                </>
                :
                <CircularProgress
                    sx={{ marginTop: "10px" }}
                />
            }

        </DialogModal>
    )
}