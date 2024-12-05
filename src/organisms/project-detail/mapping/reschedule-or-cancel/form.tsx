import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { defaultFormTheme } from "../../../../atoms/defaultFormTheme";
import Fields from "./fields";

type Props = {
    onSubmit: SubmitHandler<any>,
    defaultValues: any,
}

const ReScheduleOrCancelCallForm = (props: Props) => {
    const { onSubmit, defaultValues } = props;
    const methods = useForm({ defaultValues });

    const defaultTheme = createTheme(defaultFormTheme);

    return (
        <FormProvider {...methods}>
            <ThemeProvider theme={defaultTheme}>
                <form onSubmit={methods.handleSubmit(onSubmit)} noValidate>
                    <Fields />
                </form>
            </ThemeProvider>
        </FormProvider>
    );
};

export default ReScheduleOrCancelCallForm;
