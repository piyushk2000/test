import { FormProvider, useForm } from "react-hook-form";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { defaultFormTheme } from "../../../atoms/defaultFormTheme";
import { useSnackbar } from "notistack";
import { RowData } from "../types";
import { RequestServer } from "../../../utils/services";
import { APIRoutes } from "../../../constants";
import { usePaymentsRequestsContext } from "../context";
import EditDeclarationFields from "./fields";
import { LocalDayjs } from "../../../utils/timezoneService";
import { Dayjs } from "dayjs";

type Props = {
    handleClose(): void;
    rowDatas: RowData[];
    isBulk: boolean;
}

const EditDeclarationForm = ({ handleClose, rowDatas , isBulk}: Props) => {
    const { enqueueSnackbar } = useSnackbar();
    const { refetchData } = usePaymentsRequestsContext();
    
    const onSubmit = async (formData: { date: any}) => {

        if(!formData.date) {
            enqueueSnackbar("Provide date");
            return;
        }

        const payload = {
            ...(isBulk ? {invoice_numbers: rowDatas.map(d => d.invoice_no).join(",")} : {invoice_number: rowDatas[0].invoice_no}),
            declaration_date: LocalDayjs(formData.date).toDate()
        }

        try {
            const response = await RequestServer(APIRoutes.getPayments + "/declaration" + (isBulk ? "/bulk" : ""), "POST", payload);

            if (response.success) {
                enqueueSnackbar(response.message, {
                    variant: "success"
                });
                handleClose();
                refetchData();
            } else {
                enqueueSnackbar(response.message || response.error || "Something wrong happened", {
                    variant: "warning"
                })
            }
        } catch (error) {
            console.log(error);
        }
    };

    const defaultValues = {
        date: isBulk ? null : rowDatas[0].declaration_date ? LocalDayjs(rowDatas[0].declaration_date) : null,
    }

    const methods = useForm({ defaultValues });

    const defaultTheme = createTheme(defaultFormTheme);

    return (
        <FormProvider {...methods}>
            <ThemeProvider theme={defaultTheme}>
                <form onSubmit={methods.handleSubmit(onSubmit)} noValidate>
                    <EditDeclarationFields
                        handleClose={handleClose}
                    />
                </form>
            </ThemeProvider>
        </FormProvider>
    );
};

export default EditDeclarationForm;
