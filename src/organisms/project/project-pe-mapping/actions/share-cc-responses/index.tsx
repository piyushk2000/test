import { Grid } from "@mui/material";
import DialogModal from "../../../../../atoms/dialog";
import FormCancelSubmitBtns from "../../../../../atoms/formCancelSubmitBtns";
import ShowAnswersForm from "../../../../compliances/autoAprovalDialog/showAnswersForm";
import { MetaType, PeComplianceData, setDialogState } from "../../type";
import { useSnackbar } from "notistack";
import { RequestServer } from "../../../../../utils/services";
import { APIRoutes } from "../../../../../constants";
import { useFullPageLoading } from "../../../../../atoms/full-page-loading/loadingContext";
import { usePeMappingContext } from "../../helper";

type Props = {
    isOpen: boolean;
    handleClose: () => void;
    pe_compliance: PeComplianceData | null;
    setPeDialog: setDialogState;
    snippet: string | null;
    client_id: number | null;
    expert_id: number | null;
    company: string | null;
    designation: string | null;
    meta: MetaType;
}

const ShareCCResponses = ({ isOpen, handleClose, pe_compliance, setPeDialog, snippet, client_id, expert_id, company, designation, meta }: Props) => {
    const { enqueueSnackbar } = useSnackbar();
    const { setLoading } = useFullPageLoading();
    const { refetch } = usePeMappingContext();

    const handleShare = async () => {

        if (!pe_compliance) {
            enqueueSnackbar("PE compliance not found", {
                variant: "error"
            })
            return;
        }


        setLoading(true);

        try {
            const payload = {
                unique_code: pe_compliance.unique_code,
                action: "Share"
            }

            const response = await RequestServer(APIRoutes.PE_COMPLIANCE + "/share", "POST", payload);

            if (response.success) {
                enqueueSnackbar(response.message, {
                    variant: "success",
                });

                handleClose();
                refetch();

                // opening Expert details to page - copy to clipboard
                setPeDialog((prev) => ({
                    ...prev,
                    actions: {
                        ...prev.actions,
                        shareProfile: {
                            ...prev.actions.shareProfile,
                            email_format: true,
                            snippet: snippet,
                            expert_id: expert_id,
                            company: company,
                            designation: designation,
                            charges: meta.selling_price_currency && meta.selling_price ? `${meta.selling_price_currency} ${meta.selling_price}` : "",
                            meta: meta
                        }
                    }
                }))

            } else {
                console.log({ response });
                enqueueSnackbar(response.message.toString() || response.error.toString() || "something went wrong", {
                    variant: "warning",
                });
            }
        } catch (err) {
            console.log(err);
            enqueueSnackbar("Request failed.", { variant: "error" });
        } finally {
            setLoading(false);
        }
    }

    return (
        <DialogModal
            isOpen={isOpen}
            handleClose={handleClose}
            title={"Share Compliance Responses with Client"}
        >
            <ShowAnswersForm questions={pe_compliance?.answers || null} />
            <Grid container mt={"10px"}>
                <FormCancelSubmitBtns
                    submitLabel="Share"
                    handleClose={handleClose}
                    handleSubmitBtnClick={handleShare}
                />
            </Grid>
        </DialogModal>
    )
}

export default ShareCCResponses;