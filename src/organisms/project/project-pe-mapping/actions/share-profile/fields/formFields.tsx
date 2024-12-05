import Grid from "@mui/material/Grid";
import { HookTextField } from "../../../../../../atoms/form-fields/SLFieldTextField";
import { useHookFormContext } from "../../../../../../utils/hooks/useHookFormContext";
import { commonInputStyles, inputRow } from "../style";
import { price_per_hour_currency_values } from "../../../../../../utils/currencies";
import { useEffect, useState } from "react";
import { HookRadioButton } from "../../../../../../atoms/form-fields/SLFieldRadioButton";
import { multiplierOptions, sharedAgendaFields } from "../helper";
import { HookAutoComplete } from "../../../../../../atoms/form-fields/SLFieldAutoComplete";
import BasicAutocomplete from "../../../../../../molecules/autocompletes/basic-autocomplete";
import { group_to_show_cost_price_in_share_profile } from "../../../../../../constants/configConstants";

type FormFieldProps = {
  is_agenda_respond: boolean;
  group: string | number | undefined
}

const FormFields = ({ is_agenda_respond , group }: FormFieldProps) => {
  const { registerState, watch, setValue } = useHookFormContext();

  useEffect(() => {
    const subscription = watch((value, { name, type }) => {
      if (type === "change") {
        if (name === "selling_price") {
          const price =
            value.selling_price.length > 1
              ? Math.round(value.selling_price)
              : value.selling_price;
          setValue("selling_price", price);
        }
      }
    });

    return () => subscription.unsubscribe();
    // eslint-disable-next-line
  }, [watch]);

  return (
    <>
      <Grid item xs={12} sx={inputRow} mt={"1rem"}>
        {group_to_show_cost_price_in_share_profile.includes(Number(group)) && 
         <HookTextField
          {...registerState("cost_price")}
         
          textFieldProps={{
            ...commonInputStyles,
            label: "Cost Price",
            required: true,
            type: "number",
          }}
        />
        }
       
      </Grid>

      <Grid item xs={12} sx={inputRow} >
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
          }}
        />
      </Grid>

      {/* Currency */}
      <Grid item xs={12} sx={inputRow}>
        <BasicAutocomplete
          label="Currency *"
          registerName="currency"
          options={price_per_hour_currency_values}
          isRequired
        />
      </Grid>

      {/* Multipler */}
      <Grid item xs={12} sx={inputRow}>
        <HookAutoComplete
          {...registerState("multiplier")}
          textFieldProps={{
            label: "Multiplier *",
            size: "small",
          }}
          rules={{
            required: {
              value: true,
              message: "Multiplier is required",
            },
          }}
          autocompleteProps={{
            isOptionEqualToValue: (option, value) =>
              option.value === value.value,
            multiple: false,
            freeSolo: false,
            options: multiplierOptions,
            size: "small",
            style: { backgroundColor: "white" },
          }}
        />
      </Grid>

      {/* Shared Agenda Response */}
      {is_agenda_respond &&
        <Grid item container xs={12} sx={inputRow}>
          <HookRadioButton
            {...registerState("share_agenda")}
            label="Share Agenda Responses with Client? *"
            rules={{
              required: { value: true, message: "This field is required" },
            }}
            radioGroupProps={{
              style: { display: "flex", gap: "1rem" },
            }}
            fields={sharedAgendaFields}
          />
        </Grid>
      }

    </>
  );
};

export default FormFields;
