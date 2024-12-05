import { DefaultValues, FormInputProps } from "./helper";
import { SubmitHandler } from "react-hook-form";
import AdminForm from "../admin-form";
import { useSnackbar } from "notistack";
import { isValidType } from "../../../../utils/isValidType";
import { RequestServer } from "../../../../utils/services";
import { APIRoutes } from "../../../../constants";
import { useFullPageLoading } from "../../../../atoms/full-page-loading/loadingContext";
import { removeWhiteSpacesFromForm } from "../../../../utils/utils";

function AddAdminForm(props: any) {
  const { enqueueSnackbar } = useSnackbar();
  const { setLoading } = useFullPageLoading();

  const onSubmit: SubmitHandler<FormInputProps> = async (formData: any) => {
    const newFormData = removeWhiteSpacesFromForm(formData, [])

    /* _________________VALIDATIONS _____________________________________ */

    // Email Validation
    const isEmail = isValidType(newFormData.email, "email");
    if (!isEmail) {
      enqueueSnackbar("Enter correct email", {
        variant: "warning",
      });
      return;
    }

    // Mobile Number Validation
    const isMobile = isValidType(newFormData.mobile_number, "number");

    if (!isMobile) {
      enqueueSnackbar("Enter correct mobile number", {
        variant: "warning",
      });
      return;
    }

    const name: string = formData.name;

    const payload = {
      role: newFormData.role.value,
      name: newFormData.name,
      email: newFormData.email,
      mobile: newFormData.isd_code.value + " " + newFormData.mobile_number,
    };
    /*___________________________________________________________________ */

    setLoading(true);
    try {
      const response = await RequestServer(
        APIRoutes.signUp,
        "POST",
        payload
      );

      if (response.success) {
        enqueueSnackbar("Employee added.", {
          variant: "success",
        });
        props.refetch();
        props.handleSubmitClose();
      } else {
        console.log({ response });
        enqueueSnackbar(response.message.toString(), { variant: "warning" });
      }
    } catch (err) {
      console.error({ err });
      enqueueSnackbar("Request failed.", { variant: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminForm
      onSubmit={onSubmit}
      defaultValues={DefaultValues}
      handleClose={props.handleClose}
      isChange={props.isChange}
    />
  );
}

export default AddAdminForm;
