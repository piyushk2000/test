import { FormProvider, useForm } from "react-hook-form";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useSnackbar } from "notistack";
import ExperienceFormFields from "./fields";

import { Box } from "@mui/material";
import { isDateFuture, isDateValid, startEndCompare, updateFields } from "../helper";
import { edit_expert_data } from "../../../utils/data/dataEditExpertMessages";
import { LocalDayjs } from "../../../utils/timezoneService";
import { isExpert } from "../../../utils/role";
import { removeWhiteSpacesFromForm } from "../../../utils/utils";

const ExperienceForm = (props: any) => {
  const {
    defaultValues,
    id,
    setFormChange,
    setFormDefaultValues,
    setBackdropOpen,
    removeClickHandler,
    isNewlyAdded,
    relevant_company,
    all_work_experiences
  } = props;
  const { enqueueSnackbar } = useSnackbar();

  const isRelevant = () => {
    // if the relevant company is null
    if (!relevant_company) {
      return false;
    }

    if (
      defaultValues?.company === relevant_company?.name &&
      defaultValues?.designation === relevant_company?.designation
    ) {
      return true;
    }

    return false;
  };

  const formDefaultValues = {
    company: { label: defaultValues.company, value: defaultValues.fk_company },
    designation: defaultValues.designation,
    location: defaultValues.location,
    currently_works_here: defaultValues.currently_works_here,
    job_description: defaultValues.job_description,
    start_date: defaultValues.start_date
      ? LocalDayjs(defaultValues.start_date)
      : null,
    end_date: defaultValues.end_date ? LocalDayjs(defaultValues.end_date) : null,
    relevant: isRelevant(),
    division: defaultValues.division
  };

  const onSubmit = async (formData: any) => {
    const newFormData = removeWhiteSpacesFromForm(formData, [])
    // VALIDATIONS ---------------------------------------------------------------------

    if (isDateFuture(newFormData.start_date, edit_expert_data.future_date, enqueueSnackbar, "month")) {
      return;
    }

    if (isDateFuture(newFormData.end_date, edit_expert_data.future_date, enqueueSnackbar, "month")) {
      return;
    }

    if(newFormData.start_date  && !isDateValid(newFormData.start_date,enqueueSnackbar,"Start Date")) {
      return;
    } 

    
    if(newFormData.end_date && !isDateValid(newFormData.end_date,enqueueSnackbar,"End Date")) {
      return;
    } 

    if (!newFormData.currently_works_here) {
      if (
        (newFormData.end_date && !newFormData.start_date) ||
        (newFormData.start_date && !newFormData.end_date) ||
        !newFormData.start_date
      ) {
        enqueueSnackbar(edit_expert_data.exp_form.select_both_1, {
          variant: "warning",
        });

        return;
      }
    } else {
      if (!newFormData.start_date) {
        enqueueSnackbar(edit_expert_data.exp_form.select_both_2, {
          variant: "warning",
        });
        return;
      }
    }

    // checking if the start_date > end_date;
    if (
      newFormData.end_date &&
      startEndCompare(
        newFormData.start_date,
        newFormData.end_date,
        edit_expert_data.exp_form.start_year_greater,
        edit_expert_data.exp_form.start_month_greater
      )
    ) {
      return;
    }

    // ----------------------------------------------------------------------------------
    const payload: any = {
      id,
      action: "CompanyInfo",
      companies: [
        {
          start_date: LocalDayjs(newFormData.start_date).format("YYYY-MM"),
          end_date: newFormData.end_date
            ? LocalDayjs(newFormData.end_date).format("YYYY-MM")
            : null,
          job_description: newFormData?.job_description || null,
          designation: newFormData.designation,
          company: newFormData.company.label,
          currently_works_here: newFormData.currently_works_here,
          relevant: newFormData.relevant ? 1 : 0,
          fk_company: newFormData.company.value,
          division: newFormData.division || null
        },
      ],
    };

    // when user is selecting the location, location is coming the
    // form of object {label:string , value: string}
    // but when the user is submitting the prefilled value of location
    // it is only a string
    if (newFormData.location?.label) {
      payload.companies[0].location = newFormData.location?.label
    } else if (newFormData.location) {
      payload.companies[0].location = newFormData.location
    }

    // if updating a existing experience
    if (defaultValues.status === "Added") {
      payload.companies[0].id = defaultValues.id;
      payload.companies[0].fk_creator = defaultValues.fk_creator;
      payload.companies[0].action = "Update";
    }

    // ----------------------  EXPERT - CURRENT SNAPSHOT  -------------------------------- //

    if (isExpert()) {

      let latest_work_experiences = [...all_work_experiences];

      // If Expert is logged in, we are sending current_snapshot
      // in which the latest state of work experience is shown
      const current_work_experience = { ...payload.companies[0] }

      // If defaultValues.status === "Added" , means we are updating the existing work experience
      // we will do two things to basically mimic the default Value Array
      // 1) Action from current_work_experience from "Update" to "Added" 
      // 2) Delete the existing work experience from the latest_work_experiences so that we will add
      // new updated version.
      if (defaultValues.status === "Added") {
        current_work_experience.status = "Added";
        delete current_work_experience.action;
        latest_work_experiences = latest_work_experiences.filter((exp: any) => exp.id !== defaultValues.id)
      }


      // If current_work_experience is already present in lastest_work_experience
      // we are overwriting on top of it else we are pushing it to latest_work_experience
      const current_work_experience_index = latest_work_experiences.findIndex((exp) => exp.id === current_work_experience.id);
      if (current_work_experience_index === -1) {
        latest_work_experiences.push(current_work_experience)
      } else {
        latest_work_experiences.splice(current_work_experience_index, 1, current_work_experience);
      }

      latest_work_experiences = latest_work_experiences.map((exp: any) => {
        delete exp.is_exp_allowed;
        return exp
      })

      payload.current_snapshot = latest_work_experiences;
    }

    // --------------------------------------------------------------------------------- //

    await updateFields(
      payload,
      id,
      setBackdropOpen,
      enqueueSnackbar,
      setFormChange,
      setFormDefaultValues,
      "experience",
      edit_expert_data.exp_form.success
    );
  };

  const methods = useForm({ defaultValues: formDefaultValues });

  const defaultTheme = createTheme({
    typography: {
      fontFamily: ["Montserrat"].join(","),
      fontSize: 12,
    },
    palette: {
      primary: {
        main: "#3C3F48",
      },
    },
  });

  return (
    <Box pt={3}>
      <FormProvider {...methods}>
        <ThemeProvider theme={defaultTheme}>
          <form onSubmit={methods.handleSubmit(onSubmit)} noValidate>
            <ExperienceFormFields
              setFormChange={setFormChange}
              removeClickHandler={removeClickHandler}
              expID={defaultValues.id}
              isNewlyAdded={isNewlyAdded}
            />
          </form>
        </ThemeProvider>
      </FormProvider>
    </Box>
  );
};

export default ExperienceForm;
