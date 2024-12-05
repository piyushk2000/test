import { useSnackbar } from "notistack";
import { RequestServer } from "../../../utils/services";
import { APIRoutes } from "../../../constants";
import AcceptRefuseForm from "./form";
import { isFutureDate } from "../helper";
import { LocalDayjs } from "../../../utils/timezoneService";
import { removeWhiteSpacesFromForm } from "../../../utils/utils";

function AcceptRefuse(props: any) {
  const { enqueueSnackbar } = useSnackbar();
  const {
    id,
    handleSubmitClose,
    handleClose,
    setExpertCards,
    setBackdrop,
    status,
    isComplianceDone,
    handleFormChange
  } = props;

  const onSubmit: any = async (formData: any) => {
    const newFormData = removeWhiteSpacesFromForm(formData, [])
    if (!newFormData?.response) {
      enqueueSnackbar("Choose a response", { variant: "warning" })
      return;
    }

    const isResponseApproved = newFormData?.response === "Approved";
    const refusal_reason = newFormData?.refusal_reason?.value;
    const isContacted = status === "contacted";

    /* ----------------- VALIDATIONS ------------------------------- */

    if (newFormData?.future_date && !isFutureDate(newFormData?.future_date, "Please Select a Future Date")) {
      return;
    }


    /* ------------------------------------------------------------- */

    const refusePayload: any = {
      id,
      action: "Refused",
      reason: refusal_reason,
      future_date: newFormData?.future_date
        ? LocalDayjs(newFormData?.future_date).format("YYYY-MM-DD")
        : null,
    };

    if (refusePayload.reason === "Others") {
      refusePayload.other_reason = newFormData?.other_reason;
    }

    const payload = isResponseApproved
      ? { id, action: isContacted ? "Approved" : "ApproveCompliance" }
      : refusePayload;

    try {
      setBackdrop(true);
      const url = isResponseApproved
        ? isContacted
          ? APIRoutes.approveExpert
          : APIRoutes.approveExpertCompliance
        : APIRoutes.refuseExpert;

      const responseApi = await RequestServer(url, "PATCH", payload);

      if (responseApi.success) {
        enqueueSnackbar(responseApi.message, {
          variant: "success",
        });

        await setExpertCards();
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
    response: null,
    refusal_reason: null,
    other_reason: null,
    future_date: null,
  };

  return (
    <>
      <AcceptRefuseForm
        onSubmit={onSubmit}
        defaultValues={defaultValues}
        handleClose={handleClose}
        handleSubmitClose={handleSubmitClose}
        isComplianceDone={isComplianceDone}
        handleFormChange={handleFormChange}
      />
    </>
  );
}

export default AcceptRefuse;
