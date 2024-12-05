import { useSnackbar } from "notistack";
import { RequestServer } from "../../../utils/services";
import { APIRoutes } from "../../../constants";
import GenerateComplianceForm from "./form";
import { removeWhiteSpacesFromForm } from "../../../utils/utils";

function GenerateCompliance(props: any) {
  const { enqueueSnackbar } = useSnackbar();
  const { id, handleSubmitClose, handleClose, setBackdrop, setExpertCards, isResendCompliance, setExpertApiData } =
    props;

  const onSubmit: any = async (formData: any) => {
    try {
      const newFormData = removeWhiteSpacesFromForm(formData, [])
      setBackdrop(true);
      const url = APIRoutes.expertGenerateCompliance;
      const payload = {
        id,
        mode: newFormData?.mode || null,
        action: isResendCompliance ? "ResendCompliance" : "GenerateCompliance",
      };

      const responseApi = await RequestServer(url, "PATCH", payload);
      if (responseApi.success) {
        enqueueSnackbar(responseApi.message, {
          variant: "success",
        });
        setExpertCards && await setExpertCards();

        // If we have resend the compliance or generate compliance,here updating the new shared Link
        // which is coming in the api response
        if (setExpertApiData) {
          setExpertApiData((prev: any) => {
            const expert = prev.data.find((expert: any) => expert.id === id);
            if (expert) {
              const shared_link = responseApi.data.shared_link;
              expert.meta.tutorial_completion_link = shared_link;
              return { ...prev };
            } else {
              return prev;
            }
          })
        }

        handleSubmitClose();
      } else {
        console.log({ responseApi });
        enqueueSnackbar(responseApi.message.toString(), { variant: "warning" });
      }
    } catch (err) {
      console.error({ err });
      enqueueSnackbar("Request failed.", { variant: "error" });
    } finally {
      setBackdrop(false);
    }
  };

  const defaultValues = {
    mode: "",
  };

  return (
    <>
      <GenerateComplianceForm
        onSubmit={onSubmit}
        defaultValues={defaultValues}
        handleClose={handleClose}
        handleSubmitClose={handleSubmitClose}
      />
    </>
  );
}

export default GenerateCompliance;
