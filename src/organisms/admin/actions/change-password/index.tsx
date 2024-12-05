import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Fields from "./fields"
import { defaultFormTheme } from "../../../../atoms/defaultFormTheme";
import { useSnackbar } from "notistack";
import { RequestServer } from "../../../../utils/services";
import { APIRoutes } from "../../../../constants";
import { useFullPageLoading } from "../../../../atoms/full-page-loading/loadingContext";
import { removeWhiteSpacesFromForm } from "../../../../utils/utils";

export type Props = {
    handleClose: () => void;
    isChange: any;
    handleSubmitClose: () => void;
    admin_id: string | null;
}

const ChangeAdminPass = ({ handleClose, isChange, handleSubmitClose, admin_id }: Props) => {
    const { enqueueSnackbar } = useSnackbar();
    const { setLoading } = useFullPageLoading();

    const onSubmit: SubmitHandler<{ new_pass: string | null, confirm_pass: string | null }> =
        async (
            formData: {
                new_pass: string | null,
                confirm_pass: string | null
            }
        ) => {
            const newFormData = removeWhiteSpacesFromForm(formData, [])
            const { new_pass, confirm_pass } = newFormData;


            // VALIDATIONS -------------------------- //
            if (new_pass !== confirm_pass) {
                enqueueSnackbar("Passwords don't match", {
                    variant: "warning"
                })
                return;
            }


            if (!admin_id) {
                return;
            }
            // -------------------------------------- //

            const payload = {
                action: "ChangePassword",
                id: parseInt(admin_id),
                new_password: new_pass
            }

            setLoading(true);
            try {
                const response = await RequestServer(
                    APIRoutes.users,
                    "PATCH",
                    payload
                );

                if (response.success) {
                    enqueueSnackbar("Admin password changed.", {
                        variant: "success",
                    });
                    handleSubmitClose();
                } else {
                    console.log({ response });
                    enqueueSnackbar(response.message.toString(), { variant: "warning" });
                }
            } catch (err) {
                console.error({ err });
                enqueueSnackbar("Request failed.", { variant: "error" });
            } finally {
                setLoading(false);
            }
        }

    const defaultValues = {
        new_pass: null,
        confirm_pass: null
    }

    const methods = useForm({ defaultValues });

    const defaultTheme = createTheme(defaultFormTheme);

    return (
        <FormProvider {...methods}>
            <ThemeProvider theme={defaultTheme}>
                <form onSubmit={methods.handleSubmit(onSubmit)} noValidate>
                    <Fields handleClose={handleClose} isChange={isChange} />
                </form>
            </ThemeProvider>
        </FormProvider>
    );
};

export default ChangeAdminPass;
