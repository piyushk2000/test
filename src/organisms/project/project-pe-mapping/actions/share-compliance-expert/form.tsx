import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { ThemeProvider, createTheme } from "@mui/material";
import { useSnackbar } from "notistack";
import { usePeMappingContext } from "../../helper";
import { defaultFormTheme } from "../../../../../atoms/defaultFormTheme";
import { RequestServer } from "../../../../../utils/services";
import { FormDefaultValues } from "./types";
import { defaultValues } from "./helper";
import { useFullPageLoading } from "../../../../../atoms/full-page-loading/loadingContext";
import { APIRoutes } from "../../../../../constants";
import Fields from "./fields";
import { setDialogState } from "../../type";


type Props = {
    handleClose: () => void;
    pe_id: number;
    client_id: number;
    isEdit?: boolean;
};

const ShareComplianceWithExpertForm = ({ handleClose, pe_id, client_id , isEdit}: Props) => {
    const { refetch } = usePeMappingContext();
    const { enqueueSnackbar } = useSnackbar();
    const { setLoading } = useFullPageLoading();

    const onSubmit: SubmitHandler<Partial<FormDefaultValues>> = async (formData) => {
        const payload = {
            fk_compliance: formData.compliance,
            fk_pe: pe_id
        }

        setLoading(true);

        try {
            const url = APIRoutes.PE_COMPLIANCE;
            const response = await RequestServer(
                url,
                isEdit ? "PATCH" : "POST",
                payload
            );

            if (response.success) {
                enqueueSnackbar(response.message, {
                    variant: "success",
                });


                handleClose();
                refetch();

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
    };

    const methods = useForm({ defaultValues });

    const defaultTheme = createTheme(defaultFormTheme);

    return (
        <FormProvider {...methods}>
            <ThemeProvider theme={defaultTheme}>
                <form onSubmit={methods.handleSubmit(onSubmit)} noValidate>
                    <Fields handleClose={handleClose} client_id={client_id} />
                </form>
            </ThemeProvider>
        </FormProvider>
    );
};

export default ShareComplianceWithExpertForm;
