import { FC, useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import { commonInputStyles, getBankCountryCode, isValid_IFSC_Code, searchIFSC } from "../helper";
import { HookTextField } from "../../../atoms/form-fields/SLFieldTextField";
import { useHookFormContext } from "../../../utils/hooks/useHookFormContext";
import styles from "../style.module.scss";
import InputAdornment from "@mui/material/InputAdornment";
import CircularProgress from "@mui/material/CircularProgress";
import { useGetCountries } from "../../../utils/hooks/useGetCountries";
import { HookAutoComplete } from "../../../atoms/form-fields/SLFieldAutoComplete";

const CountryDetails: FC = () => {
  const { registerState, watch, resetField, setValue, setError, clearErrors } =
    useHookFormContext();

  const bank_country = watch("bank_country");

  const [loading, setLoading] = useState(false);
  const { data: Countries, loading: countriesLoading, rawData } = useGetCountries();
  function setIFSCError() {
    setError("ifsc_code", {
      type: "custom",
      message: "The IFSC is invalid",
    });
    resetField("bank_name");
    resetField("bank_address");
  }

  async function getbankDetails(ifscCode: string) {
    const isValidRegex = isValid_IFSC_Code(ifscCode);
    if (!isValidRegex) {
      setIFSCError();
    }
    try {
      setLoading(true);
      const response = await searchIFSC(ifscCode);

      if (response?.data) {
        setValue("bank_name", response.data.BANK);
        setValue("bank_address", response.data.ADDRESS);
        clearErrors("ifsc_code");
      }

      setLoading(false);
    } catch {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (bank_country) {
      const bank_country_code = getBankCountryCode(rawData, bank_country);
      setValue("bank_country_code", bank_country_code);
    } else {
      setValue("bank_country_code", "")
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bank_country]);

  useEffect(() => {
    const subscription = watch((value, { name, type }) => {
      if (type === "change") {
        if (name === "ifsc_code") {
          if (value.ifsc_code.length === 11) {
            getbankDetails(value.ifsc_code);
          } else {
            clearErrors("ifsc_code");
            resetField("bank_name");
            resetField("bank_address");
          }
        }
        // if (name === "bank_country") {
        //   if (value.bank_country) {
        //     const bank_country_code = getBankCountryCode(rawData, value.bank_country);
        //     setValue("bank_country_code", bank_country_code);
        //   } else {
        //     setValue("bank_country_code", "")
        //   }
        // }
      }
    });
    return () => subscription.unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watch]);

  return (
    <>
      <Grid item xs={12} md={12} className={styles.inputRow}>
        {/* <CountriesAutocomplete id="bank_country" label="My Bank Account is in:" /> */}
        <HookAutoComplete
          {...registerState("bank_country")}
          textFieldProps={{
            label: "My Bank Account is in:",
            size: "small",
          }}
          rules={{
            required: { value: true, message: "This field is required" },
          }}
          autocompleteProps={{
            ...commonInputStyles,
            options: Countries,
            loading: countriesLoading,
          }}
        />
      </Grid>

      {bank_country === "India" && (
        <>
          <Grid item xs={12} sm={12} className={styles.inputRow}>
            <HookTextField
              {...registerState("ifsc_code")}
              rules={{
                required: {
                  value: true,
                  message: "This field is required",
                },
                maxLength: {
                  value: 11,
                  message: "IFSC code should be only 11 characters"
                },
              }}
              textFieldProps={{
                ...commonInputStyles,
                label: "Enter Bank's IFSC Code",
                required: true,
                InputProps: {
                  endAdornment: loading ? (
                    <InputAdornment position="end">
                      <CircularProgress size={"1rem"} />
                    </InputAdornment>
                  ) : undefined,
                },
                disabled: loading,
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6} className={styles.inputRow}>
            <HookTextField
              {...registerState("bank_name")}
              rules={{
                required: {
                  value: true, message: "This field is required"
                }
              }}
              textFieldProps={{
                ...commonInputStyles,
                label: "Bank's Name *",
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6} className={styles.inputRow}>
            <HookTextField
              {...registerState("bank_address")}
              rules={{
                required: {
                  value: true, message: "This field is required"
                }
              }}
              textFieldProps={{
                ...commonInputStyles,
                label: "Bank's Address *",
              }}
            />
          </Grid>
        </>
      )}
    </>
  );
};

export default CountryDetails;
