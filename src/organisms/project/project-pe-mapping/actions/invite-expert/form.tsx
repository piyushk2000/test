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
    pe_id: string | null;
    project_id: string | null;
    isMultiple: boolean;
    selectedCards: SelectedCards[];
    setLoading(b: boolean): void;
};

const InviteExpertForm = ({ handleClose, pe_id, project_id, isMultiple, selectedCards, setLoading }: Props) => {
    const { refetch, setSelectExpert } = usePeMappingContext();
    const { enqueueSnackbar } = useSnackbar();

    const onSubmit: SubmitHandler<Partial<DefaultValues>> = async (formData) => {
        const newFormData = removeWhiteSpacesFromForm(formData, [])
        let cards_ids: number[] = [];
        if (isMultiple) {
            cards_ids = selectedCards.map((c) => c.value);
        }

        if (!pe_id && !isMultiple) {
            enqueueSnackbar("ID not found", {
                variant: "error"
            })
            return
        }


        let payload: { action: "Invite", id?: number | null, cards_ids?: number[], share_agenda?: boolean, send_calender_link?: boolean } = {
            action: "Invite",
        };

        if (isMultiple) {
            payload.cards_ids = cards_ids;
        } else {
            payload.id = parseInt(pe_id!);
        }

        if (newFormData.share_agenda) {
            payload.share_agenda = newFormData.share_agenda === "yes" ? true : false
        }

        setLoading(true);
        try {
            const url = isMultiple ? APIRoutes.projectExpertBulk : APIRoutes.peMappingExpertInvite
            const response = await RequestServer(
                url,
                "PATCH",
                payload
            );

            if (response.success) {
                enqueueSnackbar(`Expert${cards_ids.length > 1 ? "s" : ""} Invited Successfully`, {
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
                enqueueSnackbar(response.message.toString(), {
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
                    {project_id && <Fields handleClose={handleClose} project_id={project_id} isMultiple={isMultiple} />}
                </form>
            </ThemeProvider>
        </FormProvider>
    );
};

export default InviteExpertForm;
