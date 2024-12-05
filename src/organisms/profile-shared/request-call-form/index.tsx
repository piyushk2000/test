import React, { useEffect } from "react";
import DialogModal from "../../../atoms/dialog";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useSnackbar } from "notistack";
import RequestCallFields from "./fields";
import { defaultFormTheme } from "../../../atoms/defaultFormTheme";
import FormCancelSubmitBtns from "../../../atoms/formCancelSubmitBtns";
import { requestCall, requestCallFormDefaultValues } from "../helper";
import { genericPostPatch } from "../../../utils/services";
import { useBoolean } from "usehooks-ts";
import SlotDetails from "./slotDetails";
import { removeWhiteSpacesFromForm } from "../../../utils/utils";
// import { defaultFormTheme } from "../../atoms/defaultFormTheme";

type Props = {
  open: boolean;
  handleClose: () => void;
  expertName: string;
  peId: number;
  expertId: number;
  projectId: number;
};


export default function RequestCallForm({
  open,
  handleClose,
  expertName,
  peId,
  expertId,
  projectId
}: Props) {
  const { enqueueSnackbar } = useSnackbar();
  const {value: loading, setValue: setLoading} = useBoolean();

  const methods = useForm({ defaultValues: requestCallFormDefaultValues });

  const onSubmit: SubmitHandler<typeof requestCallFormDefaultValues> = (
    formData
  ) => {
    const newFormData = removeWhiteSpacesFromForm(formData, [])

    genericPostPatch(
      () =>
      requestCall({
          peId: peId,
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
      title={`You are requesting Call with ${expertName}`}
      loading={loading}
    >
      <FormProvider {...methods}>
        <ThemeProvider theme={defaultTheme}>
          <form onSubmit={methods.handleSubmit(onSubmit)} noValidate>
            <RequestCallFields />
            <SlotDetails projectId={projectId} expertId={expertId} />
            <FormCancelSubmitBtns handleClose={handleClose} />
          </form>
        </ThemeProvider>
      </FormProvider>
    </DialogModal>
  );
}
