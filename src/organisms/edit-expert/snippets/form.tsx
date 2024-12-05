import { FormProvider, useForm } from "react-hook-form";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useSnackbar } from "notistack";
import { updateFields } from "../helper";
import { multipleFieldContainerStyle } from "../styles";
import { Box } from "@mui/material";
import Fields from "./field";
import { edit_expert_data } from "../../../utils/data/dataEditExpertMessages";
import { removeWhiteSpacesFromForm } from "../../../utils/utils";

const Form = (props: any) => {
  const {
    defaultValues,
    id,
    snipID,
    setFormChange,
    setFormDefaultValues,
    setBackdropOpen,
    allSnipInfo,
    handleClose,
    handleSubmit
  } = props;
  const { enqueueSnackbar } = useSnackbar();

  const onSubmit = async (formData: any) => {
    const newFormData = removeWhiteSpacesFromForm(formData, [])
    const new_current_snippet = {
      heading: newFormData.heading,
      description: newFormData?.description || null,
    };

    let snipInfoCopy = [...allSnipInfo]
    const findIndex = snipInfoCopy.findIndex((snip: any) => snip.id === snipID);

    if (findIndex !== -1) {
      snipInfoCopy[findIndex] = new_current_snippet;
    }
    else {
      snipInfoCopy = [...snipInfoCopy, new_current_snippet]
    }

    // formating the data for remaining fields
    const finalSnipInfo = snipInfoCopy.map((snip: any) => ({
      heading: snip.heading,
      description: snip?.description || null,
    }));

    const payload = {
      action: "SnippetInfo",
      id: id,
      snippets: [...finalSnipInfo],
    };
    if (handleSubmit) {
      handleSubmit(payload)
    } else {
      await updateFields(
        payload,
        id,
        setBackdropOpen,
        enqueueSnackbar,
        setFormChange,
        setFormDefaultValues,
        "snippets",
        edit_expert_data.snip_form.success
      );
    }
  };

  const methods = useForm({ defaultValues });

  const defaultTheme = createTheme({
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

  return (
    <Box sx={{ mt: 2 }}>
      <FormProvider {...methods}>
        <ThemeProvider theme={defaultTheme}>
          {
            handleSubmit ?
              <form noValidate>
                <Fields
                  handleClose={handleClose} handleSubmitBtnClick={methods.handleSubmit(onSubmit)}
                />
              </form> : <form onSubmit={methods.handleSubmit(onSubmit)} noValidate>
                <Fields
                  handleClose={handleClose}
                />
              </form>

          }
        </ThemeProvider>
      </FormProvider>
    </Box>
  );
};

export default Form;
