import { FormProvider, useForm } from "react-hook-form";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import { defaultFormTheme } from "../../../../atoms/defaultFormTheme";
import { ExpertClientAMPOC, FormData } from "../type";
import Fields from "./fields";
import { useMyCalenderContext } from "../../../../pages/my-calendar/context";
import { useEffect, useRef } from "react";
import { useMyCalenderFilterContext } from "../filterContext";
import { LocalDayjs } from "../../../../utils/timezoneService";
import { removeWhiteSpacesFromForm } from "../../../../utils/utils";

export type ClientProps = {
    formOptions: FormData
}

const FormFilter = ({ formOptions }: ClientProps) => {
    const { setExpanded, clearFilter } = useMyCalenderFilterContext();
    const { setFilters, date, filters } = useMyCalenderContext();
    const defaultValues: ExpertClientAMPOC = {
        am: [],
        poc: []
    }

    const onSubmit = (formData: ExpertClientAMPOC) => {
        const newFormData = removeWhiteSpacesFromForm(formData, [])
        const client_am = newFormData.am.map((g) => g.value).join(",");
        const expert_poc = newFormData.poc.map((poc) => poc.value).join(",");
        setExpanded((prev) => ({ ...prev, expertClientFilter: false }))
        setFilters((prev) => ({
            ...prev,
            isFilterChange: true,
            isFilterApplied: true,
            sidebarFilters: {
                ...prev.sidebarFilters,
                client_am: client_am,
                expert_poc: expert_poc
            }
        }))
    };

    const methods = useForm({
        defaultValues
    });

    function clearFilterReset() {
        methods.reset(defaultValues);
        setExpanded((prev) => ({ ...prev, expertClientFilter: false }))
    }

    function handleReset() {
        clearFilterReset()
        setFilters((prev) => ({
            ...prev,
            isFilterChange: true,
            isFilterApplied: true,
            sidebarFilters: {
                ...prev.sidebarFilters,
                client_am: null,
                expert_poc: null
            }
        }))

    }

    const isFirstRender = useRef(true);
    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return; // Exit early on first render
        }
        clearFilterReset()
    }, [clearFilter.current])

    const defaultTheme = createTheme(defaultFormTheme);

    return (
        <FormProvider {...methods}>
            <ThemeProvider theme={defaultTheme}>
                <form onSubmit={methods.handleSubmit(onSubmit)} noValidate>
                    <Fields formOptions={formOptions} handleReset={handleReset} />
                </form>
            </ThemeProvider>
        </FormProvider>
    );
};

export default FormFilter;
