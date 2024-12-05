import { useSnackbar } from "notistack";
import { RequestServer } from "../../../utils/services";
import { APIRoutes } from "../../../constants";
import { isValidType } from "../../../utils/isValidType";
import MarkContactedForm from "./form";
import { markAsContacted } from "../../../utils/data/dataMarkContactedDialog";
import { removeWhiteSpacesFromForm } from "../../../utils/utils";

function MarkContacted(props: any) {
  const { enqueueSnackbar } = useSnackbar();
  const { id, handleSubmitClose, handleClose, setExpertCards, setBackdrop, data } =
    props;

  const onSubmit: any = async (formData: any) => {
    const newFormData = removeWhiteSpacesFromForm(formData, [])

    /* ------------ VALIDATIONS ----------------------------- */

    // Check Linkedin URL
    let isLinkedinUrl = true;
    if (newFormData?.medium === "LinkedIn") {
      isLinkedinUrl = isValidType(newFormData?.value, "linkedinUrl");
    }

    if (!isLinkedinUrl) {
      enqueueSnackbar(markAsContacted.notLinkedinUrl, { variant: "warning" });
      return;
    }

    // Check URL
    let isUrl = true;
    if (newFormData?.medium === "Any_Other") {
      isUrl = isValidType(newFormData?.value, "url");
    }

    if (!isUrl) {
      enqueueSnackbar(markAsContacted.urlNotValid, { variant: "warning" });
      return;
    }

    // Check Email
    let isEmail = true;

    if (newFormData?.medium === "Email") {
      isEmail = isValidType(newFormData?.value, "email");
    }

    if (!isEmail) {
      enqueueSnackbar(markAsContacted.emailNotValid, { variant: "warning" });
      return;
    }

    let value = newFormData?.value;
    if (newFormData?.medium === "Mobile") {
      value = `${newFormData?.isd_code.value} ${newFormData?.value}`;
    }

    /* ------------------------------------------------------- */

    const payload = {
      id,
      action: "Contacted",
      medium: newFormData?.medium,
      value: value,
    };

    try {
      setBackdrop(true);
      const response = await RequestServer(
        APIRoutes.expertContacted,
        "PATCH",
        payload
      );

      if (response.success) {
        enqueueSnackbar(markAsContacted.success, {
          variant: "success",
        });
        setExpertCards(payload, response.data);
        handleSubmitClose();
      } else {
        console.log({ response });
        enqueueSnackbar(response.message.toString(), { variant: "warning" });
      }
    } catch (err) {
      console.error({ err });
      enqueueSnackbar("Request failed.", { variant: "error" });
    } finally {
      setBackdrop(false);
    }
  };

  const defaultValues = {
    medium: "LinkedIn",
    value: "",
    isd_code: "",
  };

  return (
    <>
      <MarkContactedForm
        onSubmit={onSubmit}
        defaultValues={defaultValues}
        handleClose={handleClose}
        data={data}
      />
    </>
  );
}

export default MarkContacted;
