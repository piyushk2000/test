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
    patID,
    setFormChange,
    setFormDefaultValues,
    setBackdropOpen,
    removeClickHandler,
    allPatInfo,
    isNewlyAdded,
    setAddMoreOpen,
  } = props;
  const { enqueueSnackbar } = useSnackbar();

  defaultValues.date = defaultValues.date ? LocalDayjs(defaultValues.date) : null;

  const onSubmit = async (formData: any) => {
    const newFormData = removeWhiteSpacesFromForm(formData, [])
    // VALIDATIONS --------------------------------------------------------------------
    if (newFormData.patent_url) {
      const isUrl = isValidType(newFormData?.patent_url || "", "url");

      if (!isUrl) {
        enqueueSnackbar("Invalid patent URL", {
          variant: "warning",
        });
        return;
      }
    }

    if (
      isDateFuture(
        newFormData?.date,
        "A future date is not allowed here.",
        enqueueSnackbar,
        "month"
      )
    ) {
      return;
    }

    if(!isDateValid(newFormData.date,enqueueSnackbar,"Patent Date")) {
      return;
    } 


    // --------------------------------------------------------------------------------

    const new_current_patent = {
      title: newFormData.title,
      number: newFormData.number,
      patent_url: newFormData?.patent_url || null,
      description: newFormData?.description || null,
      date: newFormData?.date ? LocalDayjs(newFormData.date).format("YYYY-MM") : null,
    };

    const findIndex = allPatInfo.findIndex((pat: any) => pat.id === patID);

    // updating the current patent to it's index
    allPatInfo[findIndex] = new_current_patent;

    // formating the data for remaining fields
    const finalPatInfo = allPatInfo
      // removing the newly added field that is not submitted to the database
      .filter((pat: any) => {
        if (pat?.isNewlyAdded) {
          return false;
        }
        // rest include everything
        return true;
      })
      // formating the data and removing all other unneccessary fields
      .map((pat: any) => ({
        title: pat.title,
        description: pat?.description || null,
        number: pat.number,
        patent_url: pat?.patent_url ? addHttpsUrl(pat?.patent_url) : null,
        date: pat?.date ? LocalDayjs(pat.date).format("YYYY-MM") : null,
      }));

    const payload = {
      action: "PatentInfo",
      id: id,
      patents: [...finalPatInfo],
    };

    console.log(payload);

    await updateFields(
      payload,
      id,
      setBackdropOpen,
      enqueueSnackbar,
      setFormChange,
      setFormDefaultValues,
      "patents",
      edit_expert_data.pat_form.success,
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
              patID={patID}
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
