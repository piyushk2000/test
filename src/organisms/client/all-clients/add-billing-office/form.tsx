import { ThemeProvider, createTheme } from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";
import Fields from "./fields";
import { addOfficedefaultValues } from "./helper";

type Props = {
    handleClose(): void;
    setFormChange(): void;
    onSubmit(formData: addOfficedefaultValues): Promise<void>;
    defaultValues: addOfficedefaultValues;
}

const BillingOfficeForm = ({ handleClose, setFormChange, onSubmit, defaultValues }: Props) => {

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
                        setFormChange={setFormChange}
                    />
                </form>
            </ThemeProvider>
        </FormProvider>
    )
}

export default BillingOfficeForm