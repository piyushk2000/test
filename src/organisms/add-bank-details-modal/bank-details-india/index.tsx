import { FC, useEffect } from "react";
import Grid from "@mui/material/Grid";
import { isValid_IFSC_Code, msme_options, searchIFSC } from "../helper";
import { useHookFormContext } from "../../../utils/hooks/useHookFormContext";
import { HookCheckBox } from "../../../atoms/form-fields/SLFieldCheckBox";
import styles from "../style.module.scss";
import { RequiredTextField } from "../../../molecules/input-components/RequiredTextField";
import { HookRadioButton } from "../../../atoms/form-fields/SLFieldRadioButton";
import CustomBtnFilled from "../../../atoms/form-molecules/CustomBtnFilled";
import { useBoolean } from "../../../utils/hooks/useBoolean";
import AddMSMECerticate from "../add-msme-certificate";
import { useBankContext } from "../context";
import { Link } from "react-router-dom";
import Typography from "@mui/material/Typography";
import CountriesAutocomplete from "../../../molecules/input-components/countriesAutocomplete";
import { useFullPageLoading } from "../../../atoms/full-page-loading/loadingContext";

const BankDetailsIndia = ({isEdit}: {isEdit: boolean}) => {
  const { registerState, watch, setError, resetField, setValue, clearErrors } = useHookFormContext();
  const { setController, setLoading, setMsmeUrl: setUrl, msmeFileUrl } = useBankContext();
  const { setLoading: setFullLoading } = useFullPageLoading();
  const { value: isUploadMsme, setTrue: openUploadMsme, setFalse } = useBoolean();
  const isGstin = watch("is_gstin");
  const isMsme = watch("msme") === "yes";

  const closeUploadMsme = () => {
    setController({
      control: null,
      for: "",
      setSelectedFile: null,
    });
    setUrl("");
    setFalse();
  }

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
      setFullLoading(true);
      const response = await searchIFSC(ifscCode);

      if (response?.data) {
        setValue("bank_name", response.data.BANK);
        setValue("bank_address", response.data.ADDRESS);
        clearErrors("ifsc_code");
      }

      setFullLoading(false);
    } catch {
      setFullLoading(false);
    }
  }

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
      }
    });
    return () => subscription.unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watch]);

  useEffect(() => {
    if(!isEdit) {
      setValue("account_holder_country", "India")
    }
  },[]);

  return (
    <>
      <Grid item xs={12} md={12} className={styles.inputRow}>
        <RequiredTextField
          id="bank_country"
          label="My Bank Account is in:"
          disabled
        />
      </Grid>
      <Grid item xs={12} sm={12} className={styles.inputRow}>
        <RequiredTextField id="holder_name" label="Account Holder Name" />
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
      <Grid item xs={12} className={styles.inputRow}>
        <RequiredTextField id="ifsc_code" label="IFSC Code" max={11} />
      </Grid>
      <Grid item xs={12} sm={6} className={styles.inputRow}>
        <RequiredTextField id="bank_name" label="Bank's Name" />
      </Grid>
      <Grid item xs={12} sm={6} className={styles.inputRow}>
        <RequiredTextField  id="bank_address" label="Bank's Address *" max={1000} />
      </Grid>
      <Grid item xs={12} sm={6} className={styles.inputRow}>
        <RequiredTextField
          max={10}
          id="pan_number"
          label="Pan Card No"
          pattern={{
            value: /^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}$/,
            message: "Please Enter a valid PAN Number",
          }}
        />
      </Grid>
      <Grid item xs={12} sm={6} className={styles.inputRow}>
        <RequiredTextField
          id="account_number"
          label="Enter Bank Account Number"
          max={35}
        />
      </Grid>
      <Grid item xs={12} sm={12} className={styles.inputRow}>
        <HookCheckBox
          {...registerState("is_primary")}
          label="Set This Account as Primary"
        />
      </Grid>
      <Grid item xs={12} sm={isGstin ? 6 : 12} className={styles.inputRow}>
        <HookCheckBox
          {...registerState("is_gstin")}
          label="Do you have GSTIN?"
        />
      </Grid>

      {isGstin && (
        <>
          <Grid item xs={12} sm={6} className={styles.inputRow}>
            <RequiredTextField
              id="gstin"
              label="GSTIN"
              max={35}
              pattern={{
                value:
                  /^([0-9]){2}([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}([0-9]){1}([a-zA-Z1-9]){1}([a-zA-Z0-9]){1}$/,
                message: "Please Enter a valid GSTIN",
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6} className={styles.inputRow}>
            <RequiredTextField id="gst_name" label="Name" />
          </Grid>
          <Grid item xs={12} sm={6} className={styles.inputRow}>
            <RequiredTextField id="gst_address" label="Address" max={140} />
          </Grid>
        </>
      )}

      <Grid container item xs={12} sm={12} className={styles.inputRow}>
        <Grid item xs={12}>
          <HookRadioButton
            {...registerState("msme")}
            label="Are you registered under MSME act?"
            radioGroupProps={{
              sx: {
                "& .MuiTypography-root": {
                  marginLeft: "-5px !important",
                },
              },
            }}
            fields={msme_options}
          />
        </Grid>

        {isMsme &&
          (<Grid item xs={12}>
            {msmeFileUrl ?
              <Link to={msmeFileUrl} target="_blank" rel="noopener noreferrer">
                <Typography sx={{
                  fontSize: "12px",
                  color: "var(--green-color)",
                  "&:hover": {
                    textDecoration: "underline"
                  },
                  "&:focus": {
                    textDecoration: "underline"
                  }
                }}>
                  View MSME Certificate
                </Typography>
              </Link> :
              <CustomBtnFilled
                label="Upload  MSME Certificate"
                variant="outlined"
                onClick={openUploadMsme}
              />}
          </Grid>)
        }
      </Grid>

      {/* <Grid item xs={12} className={styles.inputRow}>
        <HookRadioButton
          {...registerState("itr")}
          label="Have you filed ITR for AY 2022-23 and AY 2023-24?"
          radioGroupProps={{
            sx: {
              "& .MuiTypography-root": {
                marginLeft: "-5px !important",
              },
            },
          }}
          fields={msme_options}
        />
      </Grid>


      {isItr ?
        <>
          <Grid item xs={12} className={styles.inputRow}>
            <RequiredTextField
              id="itr_2years_ago"
              label={isMobile ? "AY 2022-23 acknowledgement number of ITR" : "Please share the acknowledgement number of ITR for AY 2022-23"}
            />
          </Grid>
          <Grid item xs={12} className={styles.inputRow}>
            <RequiredTextField
              id="itr_previous_year"
              label={isMobile ? "AY 2023-24 acknowledgement number of ITR" : "Please share the acknowledgement number of ITR for AY 2023-24"}
            />
          </Grid>
        </> :
        noItr ?
          <Grid item xs={12}>
            <Typography sx={{ color: "red", fontWeight: "500" }}>
              TDS shall be deducted at 20% instead of 10%.
            </Typography>
          </Grid> :
          <></>
      } */}




      {/* Upload MSME Certificate */}
      <AddMSMECerticate
        isOpen={isUploadMsme}
        handleClose={closeUploadMsme}
        handleSubmitClose={setFalse}
      />
    </>
  );
};

export default BankDetailsIndia;
