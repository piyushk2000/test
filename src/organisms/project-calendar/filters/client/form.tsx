import { FormProvider, useForm } from "react-hook-form";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import { defaultFormTheme } from "../../../../atoms/defaultFormTheme";
import { ClientFormData } from "../type";
import Fields from "./fields";
import { useProjectCalenderContext } from "../../../../pages/project-calendar/context";
import { useProjectCalenderFilterContext } from "../filterContext";
import { removeWhiteSpacesFromForm } from "../../../../utils/utils";

type Props = {

}

const ClientFormFilter = ({ }: Props) => {
    const { setFiltersWithKey, filters } = useProjectCalenderContext();
    const { setExpanded } = useProjectCalenderFilterContext();
    const defaultValues: ClientFormData = {
        client: filters.client || []
    }

    const onSubmit = (formData: ClientFormData) => {
        const newFormData = removeWhiteSpacesFromForm(formData, [])
        setFiltersWithKey("client", newFormData.client);
        setExpanded((prev) => ({ ...prev, client: !prev.client }))
    };

    const methods = useForm({
        defaultValues
    });
    const clearAllAction = () => {
        methods.reset(defaultValues);
        setFiltersWithKey("client", null);
        setExpanded((prev) => ({ ...prev, client: !prev.client }))
    }


    const defaultTheme = createTheme(defaultFormTheme);

    return (
        <FormProvider {...methods}>
            <ThemeProvider theme={defaultTheme}>
                <form onSubmit={methods.handleSubmit(onSubmit)} noValidate>
                    <Fields clearAllAction={clearAllAction} />
                </form>
            </ThemeProvider>
        </FormProvider>
    );
};

export default ClientFormFilter;
