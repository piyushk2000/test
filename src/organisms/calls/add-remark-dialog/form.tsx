import { FormProvider, useForm } from "react-hook-form";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useSnackbar } from "notistack";
import { removeWhiteSpacesFromForm } from "../../../utils/utils";
import { defaultFormTheme } from "../../../atoms/defaultFormTheme";
import { useFullPageLoading } from "../../../atoms/full-page-loading/loadingContext";
import { RequestServer } from "../../../utils/services";
import { APIRoutes } from "../../../constants";
import { CallDetail } from "../../../pages/Calls/types";
import AddRemarkFields from "./fields";

type Props = {
    handleClose(): void;
    callDetail: CallDetail;
    refetch: (id: number) => Promise<void>;
}

const AddRemarkForm = ({ handleClose, refetch, callDetail }: Props) => {
    const { enqueueSnackbar } = useSnackbar();
    const { setLoading: setBackdrop } = useFullPageLoading();

    const onSubmit = async (formData: { remark: string | null }) => {
        const newFormData = removeWhiteSpacesFromForm(formData, []);

        try {
            setBackdrop(true);
            const payload = {
                action: "UpdateRemark",
                id: callDetail.id,
                remark: newFormData.remark
            };

            const response = await RequestServer(
                APIRoutes.scheduleCall,
                "PATCH",
                payload
            );

            if (response.success) {
                await refetch(callDetail.id);
                enqueueSnackbar(response.message, {
                    variant: "success"
                })
                handleClose();
            } else {
                enqueueSnackbar(response.message || response.error || "Error occurred!!", {
                    variant: "warning"
                })
            }
        } catch (err) {
            console.log(err);
        } finally {
            setBackdrop(false);
        }
    };

    const defaultValues = {
        remark: callDetail.remark
    }

    const methods = useForm({ defaultValues });

    const defaultTheme = createTheme(defaultFormTheme);

    return (
        <FormProvider {...methods}>
            <ThemeProvider theme={defaultTheme}>
                <form onSubmit={methods.handleSubmit(onSubmit)} noValidate>
                    <AddRemarkFields handleClose={handleClose} />
                </form>
            </ThemeProvider>
        </FormProvider>
    );
};

export default AddRemarkForm;
