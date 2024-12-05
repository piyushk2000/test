import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material";
import { defaultFormTheme } from "../../../atoms/defaultFormTheme";
import { defaultValues } from "./helper";
import Fields from "./fields";

type Props = {
    onSubmit: SubmitHandler<any>,
    handleClose(): void;
    handleChange(): void;
}

const SuggestAnExpertForm = ({
    onSubmit,
    handleClose,
    handleChange
}: Props) => {

    const methods = useForm({ defaultValues });

    const defaultTheme = createTheme(defaultFormTheme);

    return (
        <FormProvider {...methods}>
            <ThemeProvider theme={defaultTheme}>
                <form onSubmit={methods.handleSubmit(onSubmit)} noValidate>
                    <Fields handleClose={handleClose} handleChange={handleChange} />
                </form>
            </ThemeProvider>
        </FormProvider>
    );
};

export default SuggestAnExpertForm;
