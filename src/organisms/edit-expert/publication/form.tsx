import { FormProvider, useForm } from "react-hook-form";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useSnackbar } from "notistack";
import { addHttpsUrl, isDateFuture, isDateValid, updateFields } from "../helper";
import { multipleFieldContainerStyle } from "../styles";
import { Box } from "@mui/material";
import Fields from "./field";
import { isValidType } from "../../../utils/isValidType";
import { edit_expert_data } from "../../../utils/data/dataEditExpertMessages";
import { LocalDayjs } from "../../../utils/timezoneService";
import { removeWhiteSpacesFromForm } from "../../../utils/utils";

const Form = (props: any) => {
  const {
    defaultValues,
    id,
    pubID,
    setFormChange,
    setFormDefaultValues,
    setBackdropOpen,
    removeClickHandler,
    allPubInfo,
    isNewlyAdded,
    setAddMoreOpen,
  } = props;
  const { enqueueSnackbar } = useSnackbar();

  defaultValues.date = defaultValues.date ? LocalDayjs(defaultValues.date) : null;

  const onSubmit = async (formData: any) => {
    const newFormData = removeWhiteSpacesFromForm(formData, [])
    // VALIDATIONS --------------------------------------------------------------------
    if (newFormData.description_url) {
      const isUrl = isValidType(newFormData?.description_url || "", "url");

      if (!isUrl) {
        enqueueSnackbar(edit_expert_data.pub_form.invalid_url, {
          variant: "warning",
        });
        return;
      }
    }

    if (isDateFuture(newFormData?.date, edit_expert_data.future_date, enqueueSnackbar, "month")) {
      return;
    }
    
    if(!isDateValid(newFormData?.date,enqueueSnackbar,"Publication Date")) {
      return;
    } 

    // --------------------------------------------------------------------------------

    const new_current_pub = {
      title: newFormData.title,
      publication: newFormData?.publication || null,
      description_url: newFormData?.description_url
        ? addHttpsUrl(newFormData?.description_url)
        : null,
      description: newFormData?.description || null,
      date: newFormData?.date ? LocalDayjs(newFormData.date).format("YYYY-MM") : null,
    };

    const findIndex = allPubInfo.findIndex((pub: any) => pub.id === pubID);

    // adding the current pub to it's index
    allPubInfo[findIndex] = new_current_pub;

    // formating the data for remaining fields
    const finalPubInfo = allPubInfo
      // removing the newly added field that is not submitted to the database
      .filter((pub: any) => {
        if (pub?.isNewlyAdded) {
          return false;
        }
        // rest include everything
        return true;
      })
      // formating the data and removing all other unneccessary fields
      .map((pub: any) => ({
        title: pub.title,
        description: pub?.description || null,
        publication: pub?.publication || null,
        description_url: pub?.description_url || null,
        date: pub?.date ? LocalDayjs(pub.date).format("YYYY-MM") : null,
      }));

    const payload = {
      action: "PublicationInfo",
      id: id,
      publications: [...finalPubInfo],
    };

    console.log(payload);

    await updateFields(
      payload,
      id,
      setBackdropOpen,
      enqueueSnackbar,
      setFormChange,
      setFormDefaultValues,
      "publication",
      edit_expert_data.pub_form.success,
      setAddMoreOpen
    );
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
    <Box sx={multipleFieldContainerStyle}>
      <FormProvider {...methods}>
        <ThemeProvider theme={defaultTheme}>
          <form onSubmit={methods.handleSubmit(onSubmit)} noValidate>
            <Fields
              removeClickHandler={removeClickHandler}
              pubID={pubID}
              setFormChange={setFormChange}
              isNewlyAdded={isNewlyAdded}
            />
          </form>
        </ThemeProvider>
      </FormProvider>
    </Box>
  );
};

export default Form;
