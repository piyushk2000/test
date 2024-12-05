import { addOfficedefaultValues, defaultValues } from "./helper";
import { RequestServer } from "../../../../utils/services";
import { APIRoutes } from "../../../../constants";
import { useSnackbar } from "notistack";
import BillingOfficeForm from "./form";
import { removeWhiteSpacesFromForm } from "../../../../utils/utils";

type Props = {
  handleClose: () => void;
  setFormChange: () => void;
  handleSubmitClose: () => void;
  id: string | null;
  setBackdrop: (b: boolean) => void;
  refetch?: (() => Promise<void>) | null;
};

const AddBillingOffice = ({
  handleClose,
  setFormChange,
  id,
  handleSubmitClose,
  setBackdrop,
  refetch,
}: Props) => {

  const { enqueueSnackbar } = useSnackbar();

  const onSubmit = async (formData: addOfficedefaultValues) => {
    const newFormData = removeWhiteSpacesFromForm(formData, [])
    if (!newFormData.GSTIN) {
      delete newFormData?.GSTIN;
    }

    let newnewFormData = removeWhiteSpacesFromForm(newFormData, ['country']);
    
    const payload = {
      action: "CREATE",
      ...newnewFormData,
      country: newnewFormData?.country?.label,
      client_id: id,
    };

    try {
      setBackdrop(true);

      const response = await RequestServer(
        APIRoutes.addClientOffice,
        "POST",
        payload
      );

      if (response.success) {
        enqueueSnackbar(response.message, {
          variant: "success",
        });
        refetch && (await refetch());
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

  return (
    <BillingOfficeForm
      handleClose={handleClose}
      setFormChange={setFormChange}
      defaultValues={defaultValues}
      onSubmit={onSubmit}
    />
  );
};

export default AddBillingOffice;
