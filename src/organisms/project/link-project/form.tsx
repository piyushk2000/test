import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Fields from "./fields";
import { formOptions } from "./types";

type Props = {
    onSubmit: SubmitHandler<any>;
    defaultValues: any;
    handleClose: () => void;
    handleFormChange: () => void;
    formOptions: formOptions;
}

const LinkProjectForm = ({ onSubmit, defaultValues, handleClose, handleFormChange, formOptions }: Props) => {
    const methods = useForm({ defaultValues });

    const defaultTheme = createTheme({
        typography: {
            fontFamily: ["Montserrat"].join(","),
            fontSize: 12,
        },
        palette: {
            primary: {
                main: "#EC9324",
            },
        },
    });

    return (
        <FormProvider {...methods}>
            <ThemeProvider theme={defaultTheme}>
                <form onSubmit={methods.handleSubmit(onSubmit)} noValidate>
                    <Fields
                        handleClose={handleClose}
                        handleFormChange={handleFormChange}
                        formOptions={formOptions}
                    />
                </form>
            </ThemeProvider>
        </FormProvider>
    );
};

export default LinkProjectForm;
