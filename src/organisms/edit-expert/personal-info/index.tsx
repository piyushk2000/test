import { FormProvider, useForm } from "react-hook-form";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import PersonalInfoFields from "./fields";
import { useSnackbar } from "notistack";
import { checkLength, isDateFuture, isDateValid, updateFields } from "../helper";
import { edit_expert_data } from "../../../utils/data/dataEditExpertMessages";
import { LocalDayjs } from "../../../utils/timezoneService";
import { isAdmin, isExpert, isSuperAdmin } from "../../../utils/role";
import { removeWhiteSpacesFromForm } from "../../../utils/utils";

const PersonalInfoForm = (props: any) => {
  const {
    defaultValues,
    id,
    setFormChange,
    setFormDefaultValues,
    setBackdropOpen,
  } = props;
  const { enqueueSnackbar } = useSnackbar();

  const onSubmit = async (formData: any) => {
    const newFormData = removeWhiteSpacesFromForm(formData, [])
    console.log(newFormData);

    // VALIDATIONS -------------------------------------------

    // Nickname should be upto 5
    if (
      !checkLength(
        newFormData?.nicknames,
        5,
        "array",
        edit_expert_data.personal_form.more_nicknames
      )
    ) {
      return;
    }

    // check isd & number both added or not
    if ((newFormData?.isd_code_add_one?.value && !newFormData?.additional_mobile_one) || (!newFormData?.isd_code_add_one?.value && newFormData?.additional_mobile_one)) {
      enqueueSnackbar(edit_expert_data.personal_form.isd_mobile_both, { variant: "warning" })
      return;
    }

    if ((newFormData?.isd_code_add_two?.value && !newFormData?.additional_mobile_two) || (!newFormData?.isd_code_add_two?.value && newFormData?.additional_mobile_two)) {
      enqueueSnackbar(edit_expert_data.personal_form.isd_mobile_both, { variant: "warning" })
      return;
    }

    // Check If Date is not of Future
    if (isDateFuture(newFormData.dob, edit_expert_data.future_date, enqueueSnackbar, "full")) {
      return;
    }

    if(!isDateValid(newFormData.dob,enqueueSnackbar,"Date of Birth")) {
      return;
    } 

    // -----------------------------------------------------------------

    const payload: any = {
      action: "PersonalInfo",
      id: parseInt(id),
      salutation: newFormData?.salutation?.value,
      name: (newFormData?.firstname + " "+ newFormData?.lastname),
      dob: newFormData.dob ? LocalDayjs(newFormData.dob).format("YYYY-MM-DD") : null,
      primary_email: newFormData.primary_email,
      primary_mobile: `${newFormData.isd_code.value} ${newFormData.primary_mobile}`,
      additional_email_one: newFormData?.additional_email_one || null,
      additional_email_two: newFormData?.additional_email_two || null,
      additional_mobile_one: newFormData?.additional_mobile_one ? `${newFormData?.isd_code_add_one?.value} ${newFormData?.additional_mobile_one}` : null,
      additional_mobile_two: newFormData?.additional_mobile_two ? `${newFormData?.isd_code_add_two?.value} ${newFormData?.additional_mobile_two}` : null,
      dnd_enabled: newFormData?.dnd_enabled || false,
      private_profile: newFormData?.private_profile || false,
    };

    if (isAdmin() || isSuperAdmin()) {
      payload.nicknames = newFormData?.nicknames?.join(", ") || null;
      payload.premium_expert = newFormData?.premium_expert || false;
      payload.rating = newFormData?.rating || null;
    }

    await updateFields(
      payload,
      id,
      setBackdropOpen,
      enqueueSnackbar,
      setFormChange,
      setFormDefaultValues,
      "personalInfo",
      edit_expert_data.personal_form.success,
      null
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
    <FormProvider {...methods}>
      <ThemeProvider theme={defaultTheme}>
        <form onSubmit={methods.handleSubmit(onSubmit)} noValidate>
          <PersonalInfoFields setFormChange={setFormChange} />
        </form>
      </ThemeProvider>
    </FormProvider>
  );
};

export default PersonalInfoForm;
