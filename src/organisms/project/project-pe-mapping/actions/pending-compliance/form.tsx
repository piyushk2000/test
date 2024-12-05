import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material";
import { useSnackbar } from "notistack";
import { usePeMappingContext } from "../../helper";
import { defaultFormTheme } from "../../../../../atoms/defaultFormTheme";
import Fields from "./fields";
import { RequestServer } from "../../../../../utils/services";
import { APIRoutes } from "../../../../../constants";
import { DefaultValues, defaultValues } from "./helper";
import { SelectedCards } from "../../type";
import { removeWhiteSpacesFromForm } from "../../../../../utils/utils";


type Props = {
    handleClose: () => void;
    pe_id: number | null;
    selectedCards: SelectedCards[];
    isMultiple: boolean;
    setLoading: (b: boolean) => void;
};

const PendingComplianceForm = ({ handleClose, pe_id, isMultiple, selectedCards, setLoading }: Props) => {
    const { refetch, setSelectExpert } = usePeMappingContext();
    const { enqueueSnackbar } = useSnackbar();

    const onSubmit: SubmitHandler<Partial<DefaultValues>> = async (formData) => {
        const newFormData = removeWhiteSpacesFromForm(formData, [])
        if (!pe_id && !isMultiple) {
            return;
        }

        const single_payload = {
            action: "ApproveCompliance",
            id: pe_id,
        }

        const cards_ids = selectedCards.map((c) => c.value);

        const bulk_payload = {
            action: "ApproveCompliance",
            cards_ids,
        }

        setLoading(true);
        try {
            const payload = isMultiple ? bulk_payload : single_payload;
            const url = isMultiple ? APIRoutes.projectExpertBulk : APIRoutes.peMapping;
            const response = await RequestServer(
                url,
                "PATCH",
                payload
            );

            if (response.success) {
                enqueueSnackbar(response.message, {
                    variant: "success",
                });
                handleClose();
                refetch();
                // If isMultiple is true, means if we are selecting multiple experts to invite or reinvite,
                // we are setting selected cards to blank after response is successful
                if (isMultiple) {
                    setSelectExpert((prev) => ({
                        ...prev,
                        selectedCards: []
                    }))
                }
            } else {
                console.log({ response });
                enqueueSnackbar(response.message.toString() || response.error.toString() || "something went wrong", {
                    variant: "warning",
                });
            }
        } catch (err) {
            console.log(err);
            enqueueSnackbar("Request failed.", { variant: "error" });
        } finally {
            setLoading(false);
        }
    };

    const methods = useForm({ defaultValues });

    const defaultTheme = createTheme(defaultFormTheme);

    return (
        <FormProvider {...methods}>
            <ThemeProvider theme={defaultTheme}>
                <form onSubmit={methods.handleSubmit(onSubmit)} noValidate>
                    <Fields handleClose={handleClose} />
                </form>
            </ThemeProvider>
        </FormProvider>
    );
};

export default PendingComplianceForm;
