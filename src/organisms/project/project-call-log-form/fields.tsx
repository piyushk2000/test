import Grid from "@mui/material/Grid";
import CustomBtnFilled from "../../../atoms/form-molecules/CustomBtnFilled";
import { actionRow, inputRow } from "./style";
import BasicDetailsField from "./basic-details-field/basicDetailsField";
import PriceDetailsField from "./price-details-field/priceDetailsField";
import ClientDetailsField from "./client-details-field/clientDetailsField";
import CallDetailsFields from "./call-details-field/callDetailsField";
import ReadOnlyFields from "./read-only-details/readOnlyFields";
import { useHookFormContext } from "../../../utils/hooks/useHookFormContext";
import { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import { isSuperAdmin } from "../../../utils/role";
import { useSnackbar } from "notistack";
import { errorStyle } from "./helper";
import { useBoolean } from "../../../utils/hooks/useBoolean";

const AddCallLogsField = (props: any) => {
  const {
    billing_office_arr,
    case_code_arr,
    client_contact_arr,
    research_analyst_arr,
    call_type_arr,
    call_medium_reason_arr,
    call_medium_arr,
    call_status_arr,
    schedule_call_arr,
    geo_arr,
    account_manager_arr,
    client_id,
  } = props.formOptions;
  const { is_account_manager, status, is_group_admin, isEditForm, isViewForm } = props;
  const { watch } = useHookFormContext();
  const { enqueueSnackbar } = useSnackbar();
  const [exchange_rate_payable_value, exchange_rate_chargeable_value] = watch(["exchange_rate_payable",'exchange_rate_chargeable']);
  const [exchangeRate, setExchangeRate] = useState<{
    exchange_rate_payable: null | number,
    exchange_rate_chargeable: null | number
  }>({
    exchange_rate_payable: exchange_rate_payable_value || 1,
    exchange_rate_chargeable: exchange_rate_chargeable_value || 1
  })
  const { value: isEditAllowed, setFalse: setEditAllowedFalse, setTrue: setEditAllowedTrue } = useBoolean();


  useEffect(() => {
    const subscription = watch((value, { name, type }) => {
      if (type === "change") {
        props.handleFormChange();
      }
    });

    return () => subscription.unsubscribe();
    //eslint-disable-next-line
  }, [watch]);

  const checkEmptyArr = {
    'Billing Office': billing_office_arr,
    'Case Code': case_code_arr,
    'Client Contact': client_contact_arr
  };

  useEffect(() => {
    const emptyarr = []
    for (let [key, value] of Object.entries(checkEmptyArr)) {
      if (value.length == 0) {
        emptyarr.push(key)
      }
    }
    if ((!(emptyarr.length == 0)) && !isEditForm) {
      enqueueSnackbar(`Please fill ${emptyarr} on Project before logging the call`, { variant: "error" })
      props.handleClose()
    }
  }, [])

  const superAdmin = isSuperAdmin();

  const disabledStatus = status !== undefined && status !== "Scheduled" && status !== "Completed"

  return (
    <>
      <Grid container spacing={2} mt="2px">
        {!exchangeRate.exchange_rate_payable &&
        <Grid item xs={12} sx={inputRow}>
            <Typography sx={{ ...errorStyle, marginBottom: "1rem" }}>
              The exchange rate for the cost price currency was not found for the given call date and time.
            </Typography>
        </Grid>}
        <BasicDetailsField
          billing_office_arr={billing_office_arr}
          case_code_arr={case_code_arr}
          schedule_call_arr={schedule_call_arr}
          isEditForm={isEditForm}
          isViewForm={isViewForm}
          research_analyst_arr={research_analyst_arr}
          call_type_arr={call_type_arr}
          handleClose={props.handleClose}
          disabledStatus={disabledStatus}
        />
        <PriceDetailsField isEditForm={props.isEditForm} isViewForm={isViewForm} status={status} disabledStatus={disabledStatus} setExchangeRate={setExchangeRate} />
        <ClientDetailsField
          client_contact_arr={client_contact_arr}
          research_analyst_arr={research_analyst_arr}
          account_manager_arr={account_manager_arr}
          geo_arr={geo_arr}
          isViewForm={isViewForm}
        />
        <CallDetailsFields
          call_type_arr={call_type_arr}
          call_medium_arr={call_medium_arr}
          call_medium_reason_arr={call_medium_reason_arr}
          call_status_arr={call_status_arr}
          client_id={client_id}
          isEditForm={isEditForm}
          isViewForm={isViewForm}
          isEditAllowed={isEditAllowed}
          setEditAllowedTrue={setEditAllowedTrue}
          disabledStatus={disabledStatus}
        />
        {isViewForm &&
          <ReadOnlyFields />
        }
        
        {((superAdmin || is_account_manager || is_group_admin) && !isViewForm) ? <Grid sx={actionRow} item xs={12}>
          <CustomBtnFilled
            label="cancel"
            variant="outlined"
            onClick={props.handleClose}
          />
          <CustomBtnFilled
            label="submit"
            variant="contained"
            buttonType="submit"
          />
        </Grid> : <></>}

      </Grid>
    </>
  );
};

export default AddCallLogsField;
