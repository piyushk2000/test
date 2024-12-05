import Grid from "@mui/material/Grid";
import { HookTextField } from "../../../../atoms/form-fields/SLFieldTextField";
import { useHookFormContext } from "../../../../utils/hooks/useHookFormContext";
import { commonInputStyles, inputRow } from "../style";
import { price_per_hour_currency_values } from "../../../../utils/currencies";
import BasicAutocomplete from "../../../../molecules/autocompletes/basic-autocomplete";
import { useEffect } from "react";
import { getCallExchangeRates } from "../helper";
import { useSnackbar } from "notistack";
import { useFullPageLoading } from "../../../../atoms/full-page-loading/loadingContext";

const PriceDetailsField = (props: any) => {
  const { registerState , watch, setValue} = useHookFormContext();
  const { disabledStatus } = props;
  const { enqueueSnackbar } = useSnackbar();
  const { setLoading } = useFullPageLoading();

  useEffect(() => {
    const subscription = watch((value, { name, type }) => {
      if (type === "change" && (name === "currency_1" || name === "currency_2" || name === 'call_date')) {
       if(value.currency_1 && value.currency_2 && value.call_date) {
        (async () => {
          const data = await getCallExchangeRates(value.currency_2.value,value.currency_1.value,value.call_date,setLoading,enqueueSnackbar);
          if(data) {
            props.setExchangeRate(data);
            setValue('exchange_rate_payable', data.exchange_rate_payable)
            setValue('exchange_rate_chargeable', data.exchange_rate_chargeable)

          }
        })()
       }
      }
    });

    return () => subscription.unsubscribe();
    //eslint-disable-next-line
  }, [watch]);

  return (
    <>
      {/* Selling Price */}
      <Grid item xs={6} md={4} sx={inputRow}>
        <HookTextField
          {...registerState("selling_price")}
          rules={{
            required: { value: true, message: "This field is required" },
          }}
          textFieldProps={{
            ...commonInputStyles,
            label: "Selling Price",
            required: true,
            type: "number",
            disabled: props?.isViewForm,
          }}
        />
      </Grid>

      {/* Currency */}
      <Grid item xs={6} md={4}>
        <BasicAutocomplete
          label={"Currency *"}
          registerName="currency_1"
          options={price_per_hour_currency_values}
          isRequired
          isDisabled={props?.isViewForm}
        />
      </Grid>
      {/* Chargeable Min */}
      <Grid item xs={6} md={4} sx={inputRow}>
        <HookTextField
          {...registerState("chargeable_min")}
          rules={{
            required: { value: true, message: "This field is required" },
          }}
          textFieldProps={{
            ...commonInputStyles,
            label: "Chargeable minutes",
            required: true,
            type: "number",
            disabled: props?.isViewForm,
          }}
        />
      </Grid>
      {/* Cost Price */}
      <Grid item xs={6} md={4} sx={inputRow}>
        <HookTextField
          {...registerState("cost_price")}
          rules={{
            required: { value: true, message: "This field is required" },
          }}
          textFieldProps={{
            ...commonInputStyles,
            label: disabledStatus ? "Cost Price (read only)" : "Cost Price",
            required: true,
            type: "number",
            disabled: (disabledStatus || props?.isViewForm)
          }}
        />
      </Grid>

      {/* Currency */}
      <Grid item xs={6} md={4}>
        <BasicAutocomplete
          label={disabledStatus ? "Currency (read only)" :"Currency *"}
          registerName="currency_2"
          options={price_per_hour_currency_values}
          isRequired
          isDisabled={(disabledStatus || props?.isViewForm)}
        />
      </Grid>
      {/* Payable Min */}
      <Grid item xs={6} md={4} sx={inputRow}>
        <HookTextField
          {...registerState("payable_min")}
          rules={{
            required: { value: true, message: "This field is required" },
          }}
          textFieldProps={{
            ...commonInputStyles,
            label: disabledStatus ? "Payable minutes (read only)" : "Payable minutes",
            required: true,
            type: "number",
            disabled: ((disabledStatus || props?.isViewForm))
          }}
        />
      </Grid>
    </>
  );
};

export default PriceDetailsField;
