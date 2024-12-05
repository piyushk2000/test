import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Fields from "./fields";

type Props = {
    handleClose(): void;
    onSubmit: SubmitHandler<{ action: string | null }>;
    actionOptions: Array<{ label: string, value: string }>;
    selectActionSubmitBtnName: string;
}

const SelectAnActionForm = ({ handleClose, onSubmit, actionOptions, selectActionSubmitBtnName }: Props) => {
    const defaultValues = {
        action: null
    }

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
                        actionOptions={actionOptions}
                        selectActionSubmitBtnName={selectActionSubmitBtnName}
                    />
                </form>
            </ThemeProvider>
        </FormProvider>
    );
};

export default SelectAnActionForm;
