import { FormProvider, useForm } from "react-hook-form";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import { defaultFormTheme } from "../../../../atoms/defaultFormTheme";
import { FormData, GroupAMFormData } from "../type";
import Fields from "./fields";
import { useMyCalenderContext } from "../../../../pages/my-calendar/context";
import { useEffect, useRef } from "react";
import { useMyCalenderFilterContext } from "../filterContext";
import { getDefaultValue } from "./helper";
import { removeWhiteSpacesFromForm } from "../../../../utils/utils";

export type Props = {
    formOptions: FormData
}

const GroupAndAMFormFilter = ({ formOptions }: Props) => {
    const { setFilters, filters } = useMyCalenderContext();
    const { setExpanded, clearFilter } = useMyCalenderFilterContext();
    const formRef = useRef(null);

    const onSubmit = (formData: GroupAMFormData) => {
        const newFormData = removeWhiteSpacesFromForm(formData, [])
        const group = newFormData.group.map((g) => g.value).join(",");
        const am = newFormData.am.map((a) => a.value).join(",");
        setFilters((prev) => ({
            ...prev,
            isFilterChange: true,
            isFilterApplied: true,
            sidebarFilters: {
                ...prev.sidebarFilters,
                group: group,
                am: am
            }
        }))
        setExpanded((prev) => ({ ...prev, teamAM: !prev.teamAM }))
    };

    let defaultValues: GroupAMFormData = {
        group: filters.sidebarFilters.group ? getDefaultValue(filters.sidebarFilters.group.split(","), formOptions.group) : [],
        am: filters.sidebarFilters.am ? getDefaultValue(filters.sidebarFilters.am.split(","), formOptions.am) : [],
    };

    const methods = useForm({
        defaultValues
    });

    const defaultTheme = createTheme(defaultFormTheme);

    function clearFilterReset() {
        methods.reset({
            group: [],
            am: [],
        });
        setExpanded((prev) => ({ ...prev, teamAM: false }))
    }

    function handleReset() {
        clearFilterReset();
        setFilters((prev) => ({
            ...prev,
            isFilterChange: true,
            isFilterApplied: true,
            sidebarFilters: {
                ...prev.sidebarFilters,
                group: null,
                am: null
            }
        }))
    }

    const isFirstRender = useRef(true);
    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return; // Exit early on first render
        }
        if (clearFilter.current > 0) {
            clearFilterReset()
        }
    }, [clearFilter.current])

    return (
        <FormProvider {...methods}>
            <ThemeProvider theme={defaultTheme}>
                <form ref={formRef} onSubmit={methods.handleSubmit(onSubmit)} noValidate>
                    <Fields
                        formOptions={formOptions}
                        handleReset={handleReset}
                    />
                </form>
            </ThemeProvider>
        </FormProvider>
    );
};

export default GroupAndAMFormFilter;
