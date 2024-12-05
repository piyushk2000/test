import { FormProvider, useForm } from "react-hook-form";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useSnackbar } from "notistack";
import { isDateFuture, isDateValid, updateFields } from "../helper";
import { multipleFieldContainerStyle } from "../styles";
import { Box } from "@mui/material";
import Fields from "./field";
import { edit_expert_data } from "../../../utils/data/dataEditExpertMessages";
import { LocalDayjs } from "../../../utils/timezoneService";
import { removeWhiteSpacesFromForm } from "../../../utils/utils";

const Form = (props: any) => {
  const {
    defaultValues,
    id,
    awardID,
    setFormChange,
    setFormDefaultValues,
    setBackdropOpen,
    removeClickHandler,
    allAwardsInfo,
    isNewlyAdded,
    setAddMoreOpen,
  } = props;
  const { enqueueSnackbar } = useSnackbar();

  defaultValues.date = defaultValues.date ? LocalDayjs(defaultValues.date) : null;

  const onSubmit = async (formData: any) => {
    const newFormData = removeWhiteSpacesFromForm(formData, [])

    // VALIDATION ====================================== //

    if (isDateFuture(newFormData.date, edit_expert_data.future_date, enqueueSnackbar, "month")) {
      return;
    }

    if(newFormData.date && !isDateValid(newFormData.date,enqueueSnackbar,"Date")) {
      return;
    } 

    // ================================================= //

    const new_current_award = {
      title: newFormData?.title || null,
      description: newFormData?.description || null,
      date: newFormData?.date ? LocalDayjs(newFormData.date).format("YYYY-MM") : null,
    };

    const findIndex = allAwardsInfo.findIndex(
      (award: any) => award.id === awardID
    );

    // adding the current award to it's index
    allAwardsInfo[findIndex] = new_current_award;

    // formating the data for remaining fields
    const finalAwardsInfo = allAwardsInfo
      // removing the newly added field that is not submitted to the database
      .filter((award: any) => {
        if (award?.isNewlyAdded) {
          return false;
        }
        // rest include everything
        return true;
      })
      // formating the data and removing all other unneccessary fields
      .map((award: any) => ({
        title: award?.title || null,
        description: award?.description || null,
        date: award?.date ? LocalDayjs(award.date).format("YYYY-MM") : null,
      }));

    const payload = {
      action: "AwardsInfo",
      id: id,
      awards: [...finalAwardsInfo],
    };

    await updateFields(
      payload,
      id,
      setBackdropOpen,
      enqueueSnackbar,
      setFormChange,
      setFormDefaultValues,
      "awards",
      edit_expert_data.award_form.success,
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
              awardID={awardID}
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
