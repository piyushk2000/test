import React, { useEffect } from "react";
import DialogModal from "../../../atoms/dialog";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useSnackbar } from "notistack";
import { RequestmoreInfoFields } from "./fields";
import { defaultFormTheme } from "../../../atoms/defaultFormTheme";
import FormCancelSubmitBtns from "../../../atoms/formCancelSubmitBtns";
import { requestMoreInfo, requestMoreInfoFormDefaultValues } from "../helper";
import { genericPostPatch } from "../../../utils/services";
import { useBoolean } from "usehooks-ts";
import { removeWhiteSpacesFromForm } from "../../../utils/utils";
// import { defaultFormTheme } from "../../atoms/defaultFormTheme";

type Props = {
  open: boolean;
  handleClose: () => void;
  expertName: string;
  isRequestAgendaValid: boolean;
  peId: number;
};

export default function RequestMoreInformationForm({
  open,
  handleClose,
  expertName,
  isRequestAgendaValid,
  peId
}: Props) {
  const { enqueueSnackbar } = useSnackbar();
  const {value: loading, setValue: setLoading} = useBoolean();

  const methods = useForm({ defaultValues: requestMoreInfoFormDefaultValues });

  const onSubmit: SubmitHandler<typeof requestMoreInfoFormDefaultValues> = (
    formData
  ) => {
    const newFormData = removeWhiteSpacesFromForm(formData, [])
    genericPostPatch(
      () =>
        requestMoreInfo({
          peId: peId,
          agenda_response_requested: newFormData.is_agenda_response,
          notes: newFormData.notes,
        }),
      enqueueSnackbar,
      setLoading,
      () => {
        handleClose();
        methods.reset();
      }
    );

    console.log("formData", newFormData);
  };

  const defaultTheme = createTheme(defaultFormTheme);

  return (
    <DialogModal
      isOpen={open}
      handleClose={handleClose}
      title={`You are requesting More Information for ${expertName}`}
      loading={loading}
    >
      <FormProvider {...methods}>
        <ThemeProvider theme={defaultTheme}>
          <form onSubmit={methods.handleSubmit(onSubmit)} noValidate>
            <RequestmoreInfoFields
              isRequestAgendaValid={isRequestAgendaValid}
            />
            <FormCancelSubmitBtns handleClose={handleClose} />
          </form>
        </ThemeProvider>
      </FormProvider>
    </DialogModal>
  );
}
