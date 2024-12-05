import { useSnackbar } from "notistack";
import { APIRoutes } from "../../../constants";
import { RequestServer } from "../../../utils/services";
import CallLogForm from ".";
import { useEffect, useState } from "react";
import { formValues, getFormValues } from "./helper";
import { CircularProgress } from "@mui/material";
import { LocalDayjs } from "../../../utils/timezoneService";
import { useFullPageLoading } from "../../../atoms/full-page-loading/loadingContext";
import { removeWhiteSpacesFromForm } from "../../../utils/utils";

type Props = {
  handleClose: () => void;
  id: string | null;
  pe_id: string | null;
  refetch: (() => Promise<void>) | null;
  expert_id: string | null;
  handleFormChange: () => void;
  handleSubmitClose: () => void;
  is_account_manager: boolean;
  isOpen: boolean;
  is_group_admin: boolean;
  selected_call?: number | null;
};

function CallNewLog({
  handleClose,
  id,
  refetch,
  pe_id,
  expert_id,
  handleFormChange,
  handleSubmitClose,
  is_account_manager,
  is_group_admin,
  isOpen,
  selected_call
}: Props) {
  const [formValues, setFormValues] = useState<formValues>({
    defaultValues: null,
    formOptions: null,
  });
  const { setLoading } = useFullPageLoading();

  const { enqueueSnackbar } = useSnackbar();

  const onSubmit = async (formData: any) => {
    /* REMOVE WHITE SPACES ------------------------------- */
    const newFormData = removeWhiteSpacesFromForm(formData, [])

    /* CASE CODE ------------------------------- */
    let caseCode = newFormData.case_code;

    if (typeof caseCode !== "string") {
      caseCode = newFormData.case_code.label;
    }


    /* Expert Geographies ---------------------- */
    const geographies = newFormData.expert_geo.map((g: any) => g.value).join(",");

    const payload: any = {
      id: newFormData.schedule_call.value,
      action: "LogCall",
      call_status: newFormData.call_status,
      billing_office_id: newFormData.billing_office.value,
      casecode: caseCode,
      call_start_time: LocalDayjs(newFormData.call_date).utc().format(
        "YYYY-MM-DDTHH:mm:ss[Z]"
      ),
      selling_price: parseFloat(newFormData.selling_price).toFixed(2),
      selling_price_currency: newFormData.currency_1.value,
      chargeable_mins: parseInt(newFormData.chargeable_min),
      cost_price: parseFloat(newFormData.cost_price).toFixed(2),
      cost_price_currency: newFormData.currency_2.value,
      payable_mins: parseInt(newFormData.payable_min),
      client_contact: newFormData.client_contact.value,
      account_manager: formValues.formOptions.account_manager_id,
      research_analyst: newFormData.research_analyst.value,
      call_type: newFormData.call_type.value,
      geographies,
      call_medium: formData.call_medium.value,
      ...(formData?.call_medium_reason?.value && {call_medium_reason: formData?.call_medium_reason?.value}),
    };

    if (newFormData.expert_rating > 0) {
      payload.expert_rating = newFormData.expert_rating;
    }

    try {
      setLoading(true)
      const response = await RequestServer(
        APIRoutes.PeCallLog,
        "POST",
        payload
      );
      if (response.success) {
        enqueueSnackbar("Call logged", {
          variant: "success",
        });
        handleSubmitClose();
        refetch && (await refetch());
      } else {
        console.log({ response });
        enqueueSnackbar(response.message.toString(), { variant: "warning" });
      }
    } catch (err) {
      console.error({ err });
      enqueueSnackbar("Request failed.", { variant: "error" });
    } finally{
      setLoading(false)
    }
  };

  const formValuesStore = async () => {
    if (id && expert_id) {
      const formValues = await getFormValues(id, pe_id, expert_id,selected_call || null);
      setFormValues(formValues);
    }
  };

  useEffect(() => {
    if (isOpen) {
      formValuesStore();
    }
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  return (
    <>
      {formValues.defaultValues ? (
        <CallLogForm
          onSubmit={onSubmit}
          defaultValues={formValues.defaultValues}
          formOptions={formValues.formOptions}
          handleClose={handleClose}
          handleFormChange={handleFormChange}
          is_account_manager={is_account_manager}
          is_group_admin={is_group_admin}
        />
      ) : (
        <CircularProgress />
      )}
    </>
  );
}

export default CallNewLog;
