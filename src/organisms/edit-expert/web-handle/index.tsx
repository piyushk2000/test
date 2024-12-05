import { FormProvider, useForm } from "react-hook-form";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useSnackbar } from "notistack";
import { addHttpsUrl, updateFields } from "../helper";
import { isValidType } from "../../../utils/isValidType";
import WebHandleFields from "./fields";
import { edit_expert_data } from "../../../utils/data/dataEditExpertMessages";
import { removeWhiteSpacesFromForm } from "../../../utils/utils";

const WebHandlesForm = (props: any) => {
  const {
    defaultValues,
    id,
    setFormChange,
    setFormDefaultValues,
    setBackdropOpen,
  } = props;
  const { enqueueSnackbar } = useSnackbar();

  const formValues: any = {
    Linkedin: null,
    Twitter: null,
    Facebook: null,
    Instagram: null,
    GitHub: null,
    Youtube: null,
    personal: null,
    Any_Other: null,
  };

  defaultValues?.forEach((web: any) => {
    const portal: string = web.portal;

    if (formValues.hasOwnProperty(portal)) {
      formValues[portal] = web.link;
    }
  });

  const onSubmit = async (formData: any) => {
    const newFormData = removeWhiteSpacesFromForm(formData, [])
    // VALIDATIONS -------------------------------------------

    let isAllUrlValid = true;

    for (const portal in newFormData) {
      if (!newFormData[portal]) {
        continue;
      }

      const isUrl = isValidType(newFormData[portal] || "", "url");
      if (!isUrl) {
        if (portal === "personal") {
          enqueueSnackbar(`Personal/Company is not a Valid URL`, {
            variant: "warning",
          });
        } else {
          enqueueSnackbar(`${portal} is not a Valid URL`, {
            variant: "warning",
          });
        }

        isAllUrlValid = false;
        break;
      }
    }

    if (!isAllUrlValid) {
      return;
    }

    // -----------------------------------------------------------------

    const webHandlesArr = [];

    for (const portal in newFormData) {
      if (!newFormData[portal]) {
        continue;
      }
      webHandlesArr.push({
        portal: portal,
        link: addHttpsUrl(newFormData[portal]),
      });
    }

    const payload = {
      action: "WebHandleInfo",
      id: id,
      webhandles: webHandlesArr,
    };

    await updateFields(
      payload,
      id,
      setBackdropOpen,
      enqueueSnackbar,
      setFormChange,
      setFormDefaultValues,
      "webHandles",
      edit_expert_data.web_form.success
    );
  };

  const methods = useForm({ defaultValues: formValues });

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
    <FormProvider {...methods}>
      <ThemeProvider theme={defaultTheme}>
        <form onSubmit={methods.handleSubmit(onSubmit)} noValidate>
          <WebHandleFields setFormChange={setFormChange} />
        </form>
      </ThemeProvider>
    </FormProvider>
  );
};

export default WebHandlesForm;
