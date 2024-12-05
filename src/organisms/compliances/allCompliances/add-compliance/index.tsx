import { useSnackbar } from "notistack";
import DialogModal from "../../../../atoms/dialog";
import { APIRoutes } from "../../../../constants";
import { RequestServer } from "../../../../utils/services";
import { removeWhiteSpacesFromForm } from "../../../../utils/utils";
import ComplianceForm from "../compliance-form/form";
import { DefaultValues } from "./types";
import { useFullPageLoading } from "../../../../atoms/full-page-loading/loadingContext";

type Props = {
    isOpen: boolean;
    handleClose(): void;
    handleSubmitClose(): void;
    setChange(): void;
    fk_client: number;
}

export default function AddComplianceDialog({ isOpen, handleClose, handleSubmitClose, setChange, fk_client }: Props) {
    const { enqueueSnackbar } = useSnackbar();
    const { setLoading } = useFullPageLoading();

    const defaultValues: DefaultValues = {
        title: "",
        description: "",
        questions: ""
    }

    const onSubmit = async (formData: DefaultValues) => {
        setLoading(true);

        try {
            const newFormData = removeWhiteSpacesFromForm(formData, [])

            const payload = {
                title: newFormData.title,
                description: newFormData.description,
                questions: JSON.parse(newFormData.questions),
                fk_client: fk_client
            }

            const response = await RequestServer(APIRoutes.EXPERT_COMPLIANCE, "POST", payload);

            if (response.success) {
                enqueueSnackbar("Compliance created", {
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
                isEdit={false}
                setChange={setChange}
                onSubmit={onSubmit}
                handleClose={handleClose}
            />
        </DialogModal>
    )
}