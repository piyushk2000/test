import { useSnackbar } from "notistack";
import DialogModal from "../../../../atoms/dialog";
import { APIRoutes } from "../../../../constants";
import { RequestServer } from "../../../../utils/services";
import { removeWhiteSpacesFromForm } from "../../../../utils/utils";
import ComplianceForm from "../compliance-form/form";
import { DefaultValues } from "./types";
import { useFullPageLoading } from "../../../../atoms/full-page-loading/loadingContext";
import { complianceData } from "../types";

type Props = {
    isOpen: boolean;
    handleClose(): void;
    handleSubmitClose(): void;
    setChange(): void;
    fk_client: number;
    data: Partial<complianceData>;
}

export default function EditComplianceDialog({ isOpen, handleClose, handleSubmitClose, setChange, fk_client , data}: Props) {
    const { enqueueSnackbar } = useSnackbar();
    const { setLoading } = useFullPageLoading();

    const defaultValues = {
        title: data.title,
        description: data.description,
        questions: JSON.stringify(data.questions),
        state: data.state
    }

    const onSubmit = async (formData: DefaultValues) => {
        setLoading(true);

        try {
            const newFormData = removeWhiteSpacesFromForm(formData, [])

            const payload = {
                title: newFormData.title,
                description: newFormData.description,
                questions: JSON.parse(newFormData.questions),
                fk_client: fk_client,
                state: newFormData.state,
                id: data.id
            }

            const response = await RequestServer(APIRoutes.EXPERT_COMPLIANCE, "PATCH", payload);

            if (response.success) {
                enqueueSnackbar("Compliance updated", {
                    variant: "success",
                });
                handleSubmitClose();
            } else {
                console.log({ response });
                enqueueSnackbar(response.message.toString(), { variant: "warning" });
            }
        } catch (err) {
            console.error({ err });
            enqueueSnackbar("Request failed", { variant: "error" });
        } finally {
            setLoading(false);
        }
    }

    return (
        <DialogModal
            isOpen={isOpen}
            handleClose={handleClose}
            title={"Add Compliance"}
        >
            <ComplianceForm
                defaultValues={defaultValues}
                isEdit={true}
                setChange={setChange}
                onSubmit={onSubmit}
                handleClose={handleClose}
            />
        </DialogModal>
    )
}