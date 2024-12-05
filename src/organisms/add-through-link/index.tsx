import { FormProvider, useForm } from "react-hook-form";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Fields from "./fields"
import { defaultFormTheme } from "../../atoms/defaultFormTheme";
import { DefaultValues } from "../add-expert-through-link/helper";

export type Props = {
    handleClose?: () => void;
    isChange?: any;
    onSubmit?: any;
    mapped_project?: { label: string; value: number; } | null;
    refetch?:  (() => Promise<void>) | null
}

type FormData = {
    source_link: any;
};

const AddThroughLinkForm = (props: Props) => {

  const { handleClose, isChange, onSubmit } = props;

    const defaultValues = {
        source_link: null,
    }

    const methods = useForm<FormData>({ defaultValues });

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

export default AddThroughLinkForm;
