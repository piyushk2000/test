import { FormProvider, useForm } from "react-hook-form";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useSnackbar } from "notistack";
import { removeWhiteSpacesFromForm } from "../../../utils/utils";
import { defaultFormTheme } from "../../../atoms/defaultFormTheme";
import { useFullPageLoading } from "../../../atoms/full-page-loading/loadingContext";
import { RequestServer } from "../../../utils/services";
import { APIRoutes } from "../../../constants";
import { setStatus } from "../../../pages/Calls/helpers";
import { SetCallDetail } from "../../../pages/Calls/types";
import ConfirmcallFields from "./fields";

type Props = {
    handleClose(): void;
    id: number;
    setCallDetails: SetCallDetail;
    openChoosePaymentRequest:() => void;
}

const ConfirmCallForm = ({ handleClose, id,setCallDetails, openChoosePaymentRequest }: Props) => {
    const { enqueueSnackbar } = useSnackbar();
    const { setLoading: setBackdrop } = useFullPageLoading();

    const onSubmit = async (formData: { check_1: boolean, check_2: boolean }) => {
        const newFormData = removeWhiteSpacesFromForm(formData, []);

        if(!newFormData.check_1 || !newFormData.check_2) {
            enqueueSnackbar("Please select all the checkboxes before confirming the call", {
                variant: "warning"
            });
            return;
        }

        try {
            setBackdrop(true);
            const payload = {
                action: "ConfirmCall",
                id,
            };

            const response = await RequestServer(
                APIRoutes.scheduleCall,
                "PATCH",
                payload
            );

            if (response.success) {
                await setStatus(id, setCallDetails);
            }

            handleClose();
            openChoosePaymentRequest();
        } catch (err) {
            console.log(err);
        } finally {
            setBackdrop(false);
        }
    };

    const defaultValues = {
        check_1: false,
        check_2: false
    }

    const methods = useForm({ defaultValues });

    const defaultTheme = createTheme(defaultFormTheme);

    return (
        <FormProvider {...methods}>
            <ThemeProvider theme={defaultTheme}>
                <form onSubmit={methods.handleSubmit(onSubmit)} noValidate>
                    <ConfirmcallFields handleClose={handleClose} />
                </form>
            </ThemeProvider>
        </FormProvider>
    );
};

export default ConfirmCallForm;
