import { SubmitHandler } from "react-hook-form";
import DialogModal from "../../../atoms/dialog"
import SuggestAnExpertForm from "./form";
import { useSnackbar } from "notistack";
import { useGetParams } from "../../../utils/hooks/useGetParams";
import { RequestServer } from "../../../utils/services";
import { APIRoutes } from "../../../constants";
import { removeWhiteSpacesFromForm } from "../../../utils/utils";

type Props = {
    isOpen: boolean;
    handleClose(): void;
    handleChange(): void;
    handleSubmitClose(): void;
}

const SuggestAnExpertDialog = ({ isOpen, handleClose, handleChange, handleSubmitClose }: Props) => {
    const project_id = useGetParams("id");
    const { enqueueSnackbar } = useSnackbar();
    const onSubmit: SubmitHandler<any> = async (formData: any) => {

        const newFormData = removeWhiteSpacesFromForm(formData, [])

        const {
            name,
            curr_company,
            curr_designation,
            source_link,
            email,
            isd_code,
            mobile,
            notes
        } = newFormData;

        // VALIDATION ________________________________________________________________________ //

        if (!curr_company && !source_link) {
            enqueueSnackbar("Provide company or valid source link", {
                variant: "warning"
            })
            return;
        }

        if (!project_id) {
            enqueueSnackbar("Project ID missing in URL", {
                variant: "warning"
            })
            return;
        }

        if (mobile && !isd_code) {
            enqueueSnackbar("Include ISD code with mobile number", {
                variant: "warning"
            })
            return;
        }

        // ___________________________________________________________________________________ //

        const payload = {
            name,
            current_company: curr_company || null,
            current_designation: curr_designation || null,
            mobile: mobile ? `${isd_code.value} ${mobile}` : null,
            email: email || null,
            source_link: source_link || null,
            notes: notes || null,
            project_id: parseInt(project_id)
        }

        try {
            const response = await RequestServer(APIRoutes.suggestExpert, "POST", payload);

            if (response.success) {
                enqueueSnackbar(response.message, {
                    variant: "success"
                })
                handleSubmitClose();
            } else {
                enqueueSnackbar(response.message || response.error, {
                    variant: "warning"
                })
            }
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <DialogModal
            isOpen={isOpen}
            handleClose={handleClose}
            title={"Suggest an Expert"}
        >
            <SuggestAnExpertForm
                handleClose={handleClose}
                onSubmit={onSubmit}
                handleChange={handleChange}
            />
        </DialogModal>
    )
}

export default SuggestAnExpertDialog