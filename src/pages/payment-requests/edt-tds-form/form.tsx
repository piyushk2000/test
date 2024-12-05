import { FormProvider, useForm } from "react-hook-form";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { defaultFormTheme } from "../../../atoms/defaultFormTheme";
import { useSnackbar } from "notistack";
import { RowData } from "../types";
import { RequestServer } from "../../../utils/services";
import { APIRoutes } from "../../../constants";
import { usePaymentsRequestsContext } from "../context";
import EditTdsFields from "./fields";
import { removeWhiteSpacesFromForm } from "../../../utils/utils";

type Props = {
    handleClose(): void;
    rowData: RowData;
}

const EditTdsForm = ({ handleClose, rowData }: Props) => {
    const { enqueueSnackbar } = useSnackbar();
    const { refetchData } = usePaymentsRequestsContext();
    
    const onSubmit = async (formData: { remarks: string , tds_amount: number}) => {
        const newFormData = removeWhiteSpacesFromForm(formData,["tds_amount"]);

        const payload = {
            action: "UpdateTds",
            id: rowData.id,
            tds_amount: newFormData.tds_amount,
            remarks: newFormData.remarks
        }

        try {
            const response = await RequestServer(APIRoutes.getPayments, "PATCH", payload);

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
        remarks: rowData.review_remarks || "",
        tds_amount: rowData.tds_amount || 0
    }

    const methods = useForm({ defaultValues });

    const defaultTheme = createTheme(defaultFormTheme);

    return (
        <FormProvider {...methods}>
            <ThemeProvider theme={defaultTheme}>
                <form onSubmit={methods.handleSubmit(onSubmit)} noValidate>
                    <EditTdsFields
                        handleClose={handleClose}
                    />
                </form>
            </ThemeProvider>
        </FormProvider>
    );
};

export default EditTdsForm;
