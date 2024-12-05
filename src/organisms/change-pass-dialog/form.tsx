import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { defaultFormTheme } from "../../atoms/defaultFormTheme";
import Fields from "./fields";
import { useSnackbar } from "notistack";
import { APIRoutes } from "../../constants";
import { RequestServer } from "../../utils/services";
import { useFullPageLoading } from "../../atoms/full-page-loading/loadingContext";
import { removeWhiteSpacesFromForm } from "../../utils/utils";

type Props = {
    isChange(): void;
    handleClose(): void;
    handleSubmitClose(): void;
}

const ChangePassForm = ({ isChange, handleClose, handleSubmitClose }: Props) => {
    const { enqueueSnackbar } = useSnackbar();
    const { setLoading } = useFullPageLoading();

    const onSubmit: SubmitHandler<{ new_pass: string, old_pass: string, confirm_pass: string }> =
        async (formData) => {
            const newFormData = removeWhiteSpacesFromForm(formData, [])
            const { new_pass, old_pass, confirm_pass } = newFormData;
            const loggedInUserEmail = localStorage.getItem("email");


            // VALIDATIONS -------------------------- //
            if (new_pass !== confirm_pass) {
                enqueueSnackbar("Confirm New Password does not match with New Password", {
                    variant: "warning"
                })
                return;
            }

            if (!loggedInUserEmail) {
                enqueueSnackbar("Logged-in user email not found", {
                    variant: "warning"
                })
                return;
            }

            // -------------------------------------- //

            const payload = {
                username: loggedInUserEmail,
                new_password: new_pass,
                old_password: old_pass
            }

            setLoading(true);
            try {
                const response = await RequestServer(
                    APIRoutes.users + "/reset",
                    "POST",
                    payload
                );

                if (response.message === "Password reset successful") {
                    enqueueSnackbar("Password changed.", {
                        variant: "success",
                    });
                    handleSubmitClose();
                } else {
                    console.log({ response });
                    enqueueSnackbar(response.error.toString(), { variant: "warning" });
                }
            } catch (err: any) {
                console.log(err);
                enqueueSnackbar(err || "", { variant: "error" });
            } finally {
                setLoading(false);
            }
        }


    const defaultValues = {
        new_pass: "",
        old_pass: "",
        confirm_pass: ""
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
}

export default ChangePassForm