import { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import { commonInputStyles, BankCountry } from "../helper";
import { HookTextField } from "../../../atoms/form-fields/SLFieldTextField";
import { useHookFormContext } from "../../../utils/hooks/useHookFormContext";
import { HookCheckBox } from "../../../atoms/form-fields/SLFieldCheckBox";
import styles from "../style.module.scss";
import CountriesAutocomplete from "../../../molecules/input-components/countriesAutocomplete";
import { RequiredTextField } from "../../../molecules/input-components/RequiredTextField";

type Props = {
  country: string;
};

const BankDetailsOthers = ({ country }: Props) => {
  const { registerState, watch, getValues } = useHookFormContext();

  function isDifferentCountry(state: any) {
    if (state.bank_country && state.account_holder_country) {
      return state.bank_country !== state.account_holder_country;
    } else {
      return false;
    }
  }

  const [isCountryDiferent, setIsCountryDifferent] = useState(
    isDifferentCountry(getValues())
  );

  useEffect(() => {
    const subscription = watch((value, { name, type }) => {
      if (type === "change") {
        setIsCountryDifferent(isDifferentCountry(value));
      }
    });
    return () => subscription.unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watch]);

  const addIntermediatry = watch("add_intermediatry");

  return (
    <>
      <Grid item xs={12} md={12} className={styles.inputRow}>
        <RequiredTextField
          id="bank_country"
          label="My Bank Account is in:"
          disabled
        />
      </Grid>

      <Grid item xs={12} sm={6} className={styles.inputRow}>
        <RequiredTextField id="holder_name" label="Account Holder Name" />
      </Grid>

      <Grid item xs={12} sm={6} className={styles.inputRow}>
        <RequiredTextField
          max={35}
          id="account_number"
          label="Account Number"
        />
      </Grid>

      <Grid item xs={12} sm={6} className={styles.inputRow}>
        <RequiredTextField id="bank_name" label="Bank Name" />
      </Grid>

      <Grid item xs={12} sm={6} className={styles.inputRow}>
        <RequiredTextField max={140} id="bank_address" label="Bank Address" />
      </Grid>

      <Grid item xs={12} sm={6} className={styles.inputRow}>
        <RequiredTextField
          id="account_holder_address"
          label="Account Holder's Address"
          max={140}
        />
      </Grid>

      <Grid item xs={12} sm={6} className={styles.inputRow}>
        <CountriesAutocomplete
          id="account_holder_country"
          label="Account Holder's Residing country"
        />
      </Grid>

      <Grid item xs={12} sm={6} className={styles.inputRow}>
        <RequiredTextField max={35} id="swift_code" label="SWIFT Code" />
      </Grid>

      <Grid item xs={12} sm={6} className={styles.inputRow}>
        {country === "United States" ? (
          <RequiredTextField max={35} id="routing_code" label="Routing Code" />
        ) : country === "Canada" ? (
          <RequiredTextField max={35} id="canada_code" label="Canadian Code" />
        ) : (
          <RequiredTextField max={35} required={false} id="iban" label="IBAN" />
        )}
      </Grid>

      {isCountryDiferent && (
        <Grid item xs={12} sm={12} className={styles.inputRow}>
          <RequiredTextField
            id="reason_for_different_country"
            label="Bank and Beneficiary's country are different. Provide the reason."
          />
        </Grid>
      )}

      <Grid item xs={12} sm={12} className={styles.inputRow}>
        <HookCheckBox
          {...registerState("is_primary")}
          label="Set This Account as Primary"
        />
      </Grid>
      <Grid item xs={12} sm={12} className={styles.inputRow}>
        <HookCheckBox
          {...registerState("add_intermediatry")}
          label="Add Intermediary Bank details"
        />
      </Grid>
      {addIntermediatry && (
        <>
          <Grid item xs={12} sm={6} className={styles.inputRow}>
            <RequiredTextField
              id="intermediary_bank_name"
              label="Intermediary Bank Name"
            />
          </Grid>
          <Grid item xs={12} sm={6} className={styles.inputRow}>
            <RequiredTextField
              id="intermediary_bank_address"
              label="Intermediary Bank address"
              max={140}
            />
          </Grid>
          <Grid item xs={12} sm={6} className={styles.inputRow}>
            <RequiredTextField
              id="intermediary_bank_swift_code"
              label="Intermediary Bank Swift Code"
              max={35}
            />
          </Grid>
          <Grid item xs={12} sm={6} className={styles.inputRow}>
            <RequiredTextField
              id="intermediary_bank_account_number"
              label="Intermediary Bank Account Number"
              max={35}
            />
          </Grid>
        </>
      )}
    </>
  );
};

export default BankDetailsOthers;