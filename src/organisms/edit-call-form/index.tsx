import DialogModal from "../../atoms/dialog";
import { useSnackbar } from "notistack";
import { APIRoutes } from "../../constants";
import { RequestServer } from "../../utils/services";
import { useEffect, useRef, useState } from "react";
import { formValues, getFormValues, handleFormChange } from "./helper";
import { Box, CircularProgress } from "@mui/material";
import { LocalDayjs } from "../../utils/timezoneService";
import CallLogForm from "../project/project-call-log-form";
import { CallDetail } from "../../pages/Calls/types";
import { isSuperAdmin } from "../../utils/role";
import { useFullPageLoading } from "../../atoms/full-page-loading/loadingContext";
import { removeWhiteSpacesFromForm } from "../../utils/utils";
import WarningDialog from "../../molecules/form-close-warning";
import { useBoolean } from "../../utils/hooks/useBoolean";
import CustomBtnFilled from "../../atoms/form-molecules/CustomBtnFilled";

type Props = {
  open: boolean;
  handleClose: () => void;
  refetch: (() => Promise<void>) | null;
  callDetail: CallDetail;
};

const EditCallDialog = (props: Props) => {
  const { open, handleClose, callDetail, refetch } = props;
  const { value: isWarningShowing, setTrue: showWarning, setFalse: hideWarning } = useBoolean();
  const [formValues, setFormValues] = useState<formValues>({
    defaultValues: null,
    formOptions: null,
    isFormChange: false
  });
  const { enqueueSnackbar } = useSnackbar();
  const { setLoading } = useFullPageLoading();
  const countRef = useRef(0);

  const [isViewForm , setIsViewForm] = useState(true)

  const superAdmin = isSuperAdmin();

  const onSubmit = async (formData: any) => {
    const newFormData = removeWhiteSpacesFromForm(formData, [])
    /* CASE CODE ------------------------------- */
    let caseCode = newFormData.case_code;

    if (typeof caseCode !== "string") {
      caseCode = newFormData.case_code.label;
    }

    /* Expert Geographies ---------------------- */
    // If Cost Price is equal to or above 1 Lakh => Show a warning just for the first time.
    if (countRef.current === 0 && (newFormData.cost_price * newFormData.exchange_rate_payable >= 100000)) {
      countRef.current++;
      showWarning();
    } else {
      const geographies = newFormData.expert_geo.map((g: any) => g.value).join(",");
      const payload: any = {
        id: newFormData.schedule_call.value,
        action: "EditCall",
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
        account_manager: newFormData.account_manager.value,
        research_analyst: newFormData.research_analyst.value,
        call_type: newFormData.call_type.value,
        geographies,
        exchange_rate_chargeable: parseFloat(newFormData.exchange_rate_chargeable),
        exchange_rate_payable: parseFloat(newFormData.exchange_rate_payable),
        call_medium: newFormData.call_medium.value,
        ...(newFormData?.call_medium_reason?.value ? { call_medium_reason: newFormData?.call_medium_reason?.value } : { call_medium_reason: null }),
        // scheduled_start_time: newFormData.scheduled_start_time ,
        // scheduled_end_time : newFormData.scheduled_end_time
      };

      if (newFormData.expert_rating > 0) {
        payload.expert_rating = newFormData.expert_rating;
      }

      setLoading(true);

      try {
        const response = await RequestServer(
          APIRoutes.scheduleCall,
          "PATCH",
          payload
        );
        if (response.success) {
          enqueueSnackbar("Call edited", {
            variant: "success",
          });
          handleClose();
          refetch && (await refetch());
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
    }
  };

  const formValuesStore = async () => {
    const formValues = await getFormValues(callDetail)
    setFormValues(formValues);
  };

  useEffect(() => {
    open && formValuesStore();
    // eslint-disable-next-line
  }, [open]);

  return (
    <>
      <DialogModal isOpen={open} handleClose={handleClose} title={`${isViewForm? 'View': 'Edit'} #${callDetail?.id}`} 
      TitleEl={superAdmin ? 
      <CustomBtnFilled variant="contained" label={ isViewForm? 'Edit Call': 'View Call'} 
      onClick={()=>setIsViewForm(!isViewForm)}/>: <></>}>

        {formValues.defaultValues ? (
          <CallLogForm
            onSubmit={onSubmit}
            defaultValues={formValues.defaultValues}
            formOptions={formValues.formOptions}
            handleClose={handleClose}
            handleFormChange={() => handleFormChange(setFormValues)}
            isEditForm
            isViewForm = {isViewForm}
            status={callDetail.status}
          />
        ) : (
          <Box sx={{ display: "flex", justifyContent: "center", pt: 2 }}>
            <CircularProgress size={"2rem"} />
          </Box>
        )}
      </DialogModal>

      <WarningDialog
        open={isWarningShowing}
        handleClose={hideWarning}
        handleYesClick={hideWarning}
        text="Hourly Rate for Expert is Too High. Are You Sure You Want to Continue?"
      />
    </>
  );
};

export default EditCallDialog;
