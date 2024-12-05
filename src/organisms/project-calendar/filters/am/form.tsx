import { FormProvider, useForm } from "react-hook-form";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import { defaultFormTheme } from "../../../../atoms/defaultFormTheme";
import { AMFormData } from "../type";
import Fields from "./fields";
import { useProjectCalenderContext } from "../../../../pages/project-calendar/context";
import { useProjectCalenderFilterContext } from "../filterContext";
import { removeWhiteSpacesFromForm } from "../../../../utils/utils";

const AmFormFilter = () => {
    const { setFiltersWithKey, filters } = useProjectCalenderContext();
    const { setExpanded } = useProjectCalenderFilterContext();
    const defaultValues: AMFormData = {
        am: filters.am || []
    }

    const onSubmit = (formData: AMFormData) => {
        const newFormData = removeWhiteSpacesFromForm(formData, [])
        setFiltersWithKey("am", newFormData.am);
        setExpanded((prev) => ({ ...prev, am: !prev.am }))
    };

    const methods = useForm({
        defaultValues
    });
    const clearAllAction = () => {
        setFiltersWithKey("am", null);
        methods.reset({ am: [] });
        setExpanded((prev) => ({ ...prev, am: !prev.am }))
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

export default AmFormFilter;
