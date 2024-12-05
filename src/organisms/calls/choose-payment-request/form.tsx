import { FormProvider, useForm } from "react-hook-form";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { defaultFormTheme } from "../../../atoms/defaultFormTheme";
import ConfirmcallFields from "./fields";
import { PrimaryBankValue } from "../../../pages/Profile-shared/types";
import { Dispatch, SetStateAction } from "react";
import { CallDetail, GenerateInvoiceTypes, SetSelect } from "../../../pages/Calls/types";
import { useSnackbar } from "notistack";

type Props = {
    handleClose(): void;
    payment_options: { label: string, value: string }[];
    bankDetails: PrimaryBankValue | null;
    setGenerateInvoiceOpen: Dispatch<SetStateAction<GenerateInvoiceTypes>>;
    openUploadInvoice(): Promise<void>;
    setSelect: SetSelect;
    callDetail: CallDetail;
}

const ConfirmCallForm = ({ handleClose, payment_options, openUploadInvoice, setGenerateInvoiceOpen, bankDetails, setSelect, callDetail }: Props) => {
    const { enqueueSnackbar } = useSnackbar();

    const onSubmit = async (formData: { payment_options: string | null }) => {

        if (!formData.payment_options) {
            enqueueSnackbar("Select an option", {
                variant: "warning"
            })
            return;
        }

        if (formData.payment_options === "upload_invoice") {
            await openUploadInvoice();
        }

        if (formData.payment_options === "generate_invoice") {
            setSelect((prev) => ({
                ...prev,
                selectedCards: [
                    { ...callDetail, value: callDetail.id }
                ],
            }));
            setGenerateInvoiceOpen(() => ({
                state: true,
                bank_details: bankDetails,
            }));
        }

        handleClose();
    };

    const defaultValues = {
        payment_options: null
    }

    const methods = useForm({ defaultValues });

    const defaultTheme = createTheme(defaultFormTheme);

    return (
        <FormProvider {...methods}>
            <ThemeProvider theme={defaultTheme}>
                <form onSubmit={methods.handleSubmit(onSubmit)} noValidate>
                    <ConfirmcallFields handleClose={handleClose} payment_options={payment_options} />
                </form>
            </ThemeProvider>
        </FormProvider>
    );
};

export default ConfirmCallForm;
