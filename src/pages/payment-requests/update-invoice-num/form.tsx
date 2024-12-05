import { FormProvider, useForm } from "react-hook-form";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { defaultFormTheme } from "../../../atoms/defaultFormTheme";
import { useSnackbar } from "notistack";
import { RowData, SetSelect } from "../types";
import UpdateInvoiceNumFields from "./fields";
import { APIRoutes } from "../../../constants";
import { RequestServer } from "../../../utils/services";
import { usePaymentsRequestsContext } from "../context";

type Props = {
    handleClose(): void;
    rowsData: RowData[];
    setSelect: SetSelect;
}

const UpdateInvoiceNumForm = ({ handleClose, rowsData ,setSelect}: Props) => {
    const { enqueueSnackbar } = useSnackbar();
    const { refetchData } = usePaymentsRequestsContext();

    const onSubmit = async (formData: any) => {
        const payload = {
            transaction_details: rowsData.map(row => ({id: row.id, invoice_num: formData[`invoice_num_${row.id}`]})),
            action: 'UpdateInvoiceNums',
        }

        try {
            const response = await RequestServer(APIRoutes.getPayments, "PATCH", payload);

            if (response.success) {
                enqueueSnackbar(response.message, {
                    variant: "success"
                });
                handleClose();
                setSelect(() => ({
                    selectedCards: [],
                    isClicked: false,
                    callAction: null
                }))
                await refetchData();
                
            } else {
                enqueueSnackbar(response.message || response.error || "Something wrong happened", {
                    variant: "warning"
                })
            }
        } catch (error) {
            console.log(error);
        }
    };

    let defaultValues = {}

    for(let i = 0; i < rowsData.length; i++) {
        const call = rowsData[i];
        const invoice_name = `invoice_num_${call.id}`
        const invoice_number = call.auto_generated === "Yes" ? null : call.invoice_no;
        defaultValues = {
            ...defaultValues,
            [invoice_name]: invoice_number
        }
    }

    const methods = useForm({ defaultValues });

    const defaultTheme = createTheme(defaultFormTheme);

    return (
        <FormProvider {...methods}>
            <ThemeProvider theme={defaultTheme}>
                <form onSubmit={methods.handleSubmit(onSubmit)} noValidate>
                    <UpdateInvoiceNumFields
                        handleClose={handleClose}
                        rowsData={rowsData}
                    />
                </form>
            </ThemeProvider>
        </FormProvider>
    );
};

export default UpdateInvoiceNumForm;
