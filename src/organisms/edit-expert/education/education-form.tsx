import { FormProvider, useForm } from "react-hook-form";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useSnackbar } from "notistack";
import { isDateFuture, isDateValid, startEndCompare, updateFields } from "../helper";
import EducationInfoFields from "./field";
import { multipleFieldContainerStyle } from "../styles";
import { Box } from "@mui/material";
import { edit_expert_data } from "../../../utils/data/dataEditExpertMessages";
import { LocalDayjs } from "../../../utils/timezoneService";
import { removeWhiteSpacesFromForm } from "../../../utils/utils";

const EducationForm = (props: any) => {
  const {
    defaultValues,
    id,
    eduID,
    setFormChange,
    setFormDefaultValues,
    setBackdropOpen,
    removeClickHandler,
    allEducationInfo,
    isNewlyAdded,
    setAddMoreOpen,
  } = props;
  const { enqueueSnackbar } = useSnackbar();

  defaultValues.start_year = defaultValues.start_year
    ? LocalDayjs(defaultValues.start_year)
    : null;
  defaultValues.end_year = defaultValues.end_year
    ? LocalDayjs(defaultValues.end_year)
    : null;

  const onSubmit = async (formData: any) => {
    const newFormData = removeWhiteSpacesFromForm(formData, [])
    // VALIDATIONS ----------------------------------------------------------------------------------

    if (
      startEndCompare(
        newFormData.start_year,
        newFormData.end_year,
        edit_expert_data.edu_form.start_greater,
        ""
      )
    ) {
      return;
    }

    if (isDateFuture(newFormData.start_year, edit_expert_data.future_date, enqueueSnackbar, "year")) {
      return;
    }

    if (isDateFuture(newFormData.end_year, edit_expert_data.future_date, enqueueSnackbar, "year")) {
      return;
    }

    if(!isDateValid(newFormData.start_year,enqueueSnackbar,"Start Year")) {
      return;
    } 

    
    if(!isDateValid(newFormData.end_year,enqueueSnackbar,"End Year")) {
      return;
    } 

    // ---------------------------------------------------------------------------------------------

    const current_edu_details = {
      course: newFormData?.course,
      end_year: newFormData?.end_year
        ? LocalDayjs(newFormData.end_year).format("YYYY")
        : null,
      start_year: newFormData?.start_year
        ? LocalDayjs(newFormData.start_year).format("YYYY")
        : null,
      institution: newFormData?.institution,
    };

    let finalEduInfo = []

    if (allEducationInfo){
      const findIndex = allEducationInfo.findIndex(
        (edu: any) => edu.id === eduID
      );
  
      if (findIndex !== -1){
        allEducationInfo[findIndex] = current_edu_details;
      } else{
        allEducationInfo[allEducationInfo.length] = current_edu_details;
      }
          // formating the data for remanaing fields that is to be added with current formData in payload
      finalEduInfo = allEducationInfo
      .filter((edu: any) => {
        if (edu?.isNewlyAdded) {
          return false;
        }

        // rest include everything
        return true;
      })
      // formating the data and removing all other unneccessary fields
      .map((edu: any) => ({
        course: edu?.course || null,
        institution: edu?.institution || null,
        start_year: edu?.start_year
          ? LocalDayjs(edu.start_year).format("YYYY")
          : null,
        end_year: edu?.end_year ? LocalDayjs(edu.end_year).format("YYYY") : null,
      }));

    } else{
      finalEduInfo.push(current_edu_details)
    }
  
    const payload = {
      action: "EducationInfo",
      id: id,
      education: [...finalEduInfo],
    };

    await updateFields(
      payload,
      id,
      setBackdropOpen,
      enqueueSnackbar,
      setFormChange,
      setFormDefaultValues,
      "education",
      edit_expert_data.edu_form.success,
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
    <Box pt={3}>
      <FormProvider {...methods}>
        <ThemeProvider theme={defaultTheme}>
          <form onSubmit={methods.handleSubmit(onSubmit)} noValidate>
            <EducationInfoFields
              removeClickHandler={removeClickHandler}
              eduID={eduID}
              setFormChange={setFormChange}
              isNewlyAdded={isNewlyAdded}
            />
          </form>
        </ThemeProvider>
      </FormProvider>
    </Box>
  );
};

export default EducationForm;
