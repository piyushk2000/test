import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Dialog, DialogContent, DialogTitle, Grid } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
// import AddBankDetailsForm from "./add-bank-form";
import Loading from "../../atoms/loading";
import { useBoolean } from "../../utils/hooks/useBoolean";
import Fields from "./Fields";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import styles from "./style.module.scss";
import { addDocument, defaultValues } from "./helper";
import { useGetParams } from "../../utils/hooks/useGetParams";
import { useSnackbar } from "notistack";
import { useState } from "react";
import DialogModal from "../../atoms/dialog";
import { removeWhiteSpacesFromForm } from "../../utils/utils";

const CustomFontTheme = createTheme({
  typography: {
    fontFamily: ["Montserrat"].join(","),
    fontSize: 12,
  },
  palette: {
    primary: {
      main: "#EC9324",
    },
  },
});

type Props = {
  open: boolean;
  closeDialog: () => void;
  refetch: () => Promise<void>;
  getAllProfileDetails: any;
};

export default function AddAttachmentForm({
  open,
  closeDialog,
  refetch,
  getAllProfileDetails,
}: Props) {
  const { value: loading, setValue: setLoading } = useBoolean();
  const [controller, setController] = useState({
    control: null,
    for: "",
    setSelectedFile: null,
  }); // abort controller
  const [fileUrl, setFileUrl] = useState("");
  const methods = useForm({ defaultValues });
  const id = useGetParams("id");
  const { enqueueSnackbar } = useSnackbar();

  const onSubmit: SubmitHandler<any> = async (formData: any) => {
    try {
      const newFormData = removeWhiteSpacesFromForm(formData, [])
      if (!id) return;
      if (!fileUrl) {
        enqueueSnackbar("Upload document.", {
          variant: "warning",
        });
        return;
      }
      setLoading(true);
      let response;
      if (newFormData.doc_type.value === "Other") {
        response = await addDocument(newFormData.other_doc, fileUrl, id);
      } else {
        response = await addDocument(newFormData.doc_type.value, fileUrl, id);
      }
      if (response.success) {
        methods.reset();
        await refetch();
        if (newFormData.doc_type.value === "no_pe_certificate") {
          await getAllProfileDetails();
        }
        enqueueSnackbar("Attachment added.", {
          variant: "success",
        });
        closeDialog();
      } else {
        console.log({ response });
        if (response.error) {
          enqueueSnackbar(response?.error, { variant: "warning" });
        }
        if (response?.message) {
          enqueueSnackbar(response?.message?.toString(), {
            variant: "warning",
          });
        }
      }
    } catch (err) {
      console.error({ err });
      enqueueSnackbar("Request failed.", { variant: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <ThemeProvider theme={CustomFontTheme}>
      <DialogModal
        isOpen={open}
        handleClose={closeDialog}
        title="Upload Attachment"
      >
        <Loading loading={loading} controller={controller} />
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)} noValidate>
            <Grid className={styles.formContainer} container>
              <Fields
                setUrl={setFileUrl}
                setLoading={setLoading}
                setController={setController}
              />
            </Grid>
          </form>
        </FormProvider>
      </DialogModal>
    </ThemeProvider>
  );
}
