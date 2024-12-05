import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material";
import Fields from "./fields";
import { defaultFormTheme } from "../../../../../../atoms/defaultFormTheme";
import { PeShortlistPayloadTypes } from "../helper";
import { RequestServer } from "../../../../../../utils/services";
import { APIRoutes } from "../../../../../../constants";
import { usePeMappingContext } from "../../../helper";
import { useSnackbar } from "notistack";
import { SelectedCards } from "../../../type";
import { removeWhiteSpacesFromForm } from "../../../../../../utils/utils";

type Props = {
  handleClose: () => void;
  handleSubmitClose: () => void;
  pe_id: number | null;
  setBackdrop: (b: boolean) => void;
  selectedCards: SelectedCards[];
  isMultiple: boolean;
};

const ShortlistForm = ({ handleClose, handleSubmitClose, pe_id, selectedCards, isMultiple }: Props) => {
  const { refetch, setSelectExpert } = usePeMappingContext();
  const { enqueueSnackbar } = useSnackbar();

  const defaultValues: any = {
    shortlist: null,
  };

  const onSubmit: SubmitHandler<{
    shortlist: "Reject" | "Shortlist";
  }> = async (formData) => {
    const newFormData = removeWhiteSpacesFromForm(formData, [])
    
    const action = newFormData.shortlist;

    if (!pe_id && !isMultiple) {
      enqueueSnackbar("Expert ID not found", {
        variant: "error"
      })
      return;
    }

    const singlePayload: PeShortlistPayloadTypes = {
      action,
      id: pe_id!,
    };

    const cards_ids = selectedCards.map((c) => c.value);

    const bulkPayload = {
      action,
      cards_ids
    }

    try {
      const url = isMultiple ? APIRoutes.projectExpertBulk : APIRoutes.peMapping;
      const payload = isMultiple ? bulkPayload : singlePayload;

      const response = await RequestServer(
        url,
        "PATCH",
        payload
      );

      if (response.success) {
        enqueueSnackbar(`Expert${cards_ids.length > 1 ? "s" : ""} ${action} Successfully.`, {
          variant: "success",
        });
        handleSubmitClose();
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

export default ShortlistForm;
