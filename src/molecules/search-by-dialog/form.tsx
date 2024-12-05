import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Fields from "./fields";
import { defaultValues } from "./helper";
import { filterPayload } from "../../pages/Experts/types";



type Props = {
    onSubmit: SubmitHandler<typeof defaultValues>;
    handleClose(): void;
    defaultValues: filterPayload["otherSearchFilter"];
}

const SearchByForm = (props: Props) => {
    const { onSubmit, handleClose, defaultValues } = props;

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
                    <Fields handleClose={handleClose} />
                </form>
            </ThemeProvider>
        </FormProvider>
    );
};

export default SearchByForm;
