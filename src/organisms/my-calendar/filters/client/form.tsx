import { FormProvider, useForm } from "react-hook-form";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import { defaultFormTheme } from "../../../../atoms/defaultFormTheme";
import { ClientFormData, FormData } from "../type";
import Fields from "./fields";
import { useMyCalenderContext } from "../../../../pages/my-calendar/context";
import { useEffect, useRef } from "react";
import { useMyCalenderFilterContext } from "../filterContext";
import { labelValueType } from "../../../client/all-clients/types";
import { removeWhiteSpacesFromForm } from "../../../../utils/utils";

export type ClientProps = {
    clientValues: labelValueType[];
}

const ClientFormFilter = ({ clientValues }: ClientProps) => {
    const { setExpanded, clearFilter } = useMyCalenderFilterContext();
    const { setFilters } = useMyCalenderContext();
    const defaultValues: ClientFormData = {
        client: clientValues
    }

    const onSubmit = (formData: ClientFormData) => {
        const newFormData = removeWhiteSpacesFromForm(formData, [])
        const client = newFormData.client.map((g) => g.value).join(",");
        setExpanded((prev) => ({ ...prev, client: !prev.client }))
        setFilters((prev) => ({
            ...prev,
            isFilterChange: true,
            isFilterApplied: true,
            sidebarFilters: {
                ...prev.sidebarFilters,
                client,
            }
        }))
    };

    const methods = useForm({
        defaultValues
    });

    function handleReset() {
        clearFilterReset();
        setFilters((prev) => ({
            ...prev,
            isFilterChange: true,
            isFilterApplied: true,
            sidebarFilters: {
                ...prev.sidebarFilters,
                client: null,
            }
        }))
    }

    function clearFilterReset() {
        methods.reset({
            client: []
        });
        setExpanded((prev) => ({ ...prev, client: false }))
    }

    const isFirstRender = useRef(true);
    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }

        if (clearFilter.current > 0) {
            clearFilterReset()
        }
    }, [clearFilter.current])

    const defaultTheme = createTheme(defaultFormTheme);

    return (
        <FormProvider {...methods}>
            <ThemeProvider theme={defaultTheme}>
                <form onSubmit={methods.handleSubmit(onSubmit)} noValidate>
                    <Fields handleReset={handleReset} />
                </form>
            </ThemeProvider>
        </FormProvider>
    );
};

export default ClientFormFilter;
