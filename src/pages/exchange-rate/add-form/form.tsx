import { FormProvider, useForm } from "react-hook-form";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { defaultFormTheme } from "../../../atoms/defaultFormTheme";
import { useSnackbar } from "notistack";
import { RequestServer } from "../../../utils/services";
import { APIRoutes } from "../../../constants";
import ExchangeRateFields from "./fields";
import { removeWhiteSpacesFromForm } from "../../../utils/utils";
import { useExchangeRateContext } from "../context";
import { useState } from "react";
import { DateOptions, DefaultFormValue, ExcelFile } from "../types";

type Props = {
    handleClose(): void;
    dateOptions: DateOptions;
}

const ExchangeRateForm = ({ handleClose, dateOptions }: Props) => {
    const { enqueueSnackbar } = useSnackbar();
    const { refetch } = useExchangeRateContext();
    const [file, setFile] = useState<ExcelFile>(null);

    const onSubmit = async (formData: DefaultFormValue) => {
        const newFormData = removeWhiteSpacesFromForm(formData, []);

        const payload = new FormData();

        if (!file) {
            enqueueSnackbar("Upload Excel file first, then we'll process your exchange rate insertion");
            return;
        }

        if (!newFormData.date) {
            enqueueSnackbar("Select a date");
            return;
        }

        payload.append("excelFile", file);
        payload.append('date', newFormData.date.value);

        try {
            const response = await RequestServer(APIRoutes.EXCHANGE_RATE + "/data", "POST", payload, true);

            if (response.success) {
                enqueueSnackbar(response.message, {
                    variant: "success"
                });
                handleClose();
                refetch();
            } else {
                enqueueSnackbar(response.message || response.error || "Something wrong happened", {
                    variant: "warning"
                })
            }
        } catch (error) {
            console.log(error);
        }
    };

    const defaultValues: DefaultFormValue = {
        date: null
    }

    const methods = useForm({ defaultValues });

    const defaultTheme = createTheme(defaultFormTheme);

    return (
        <FormProvider {...methods}>
            <ThemeProvider theme={defaultTheme}>
                <form onSubmit={methods.handleSubmit(onSubmit)} noValidate>
                    <ExchangeRateFields
                        handleClose={handleClose}
                        setFile={setFile}
                        dateOptions={dateOptions}
                    />
                </form>
            </ThemeProvider>
        </FormProvider>
    );
};

export default ExchangeRateForm;
