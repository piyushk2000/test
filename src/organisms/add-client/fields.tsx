import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { useEffect } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import CustomBtnFilled from "../../atoms/form-molecules/CustomBtnFilled";
import styles from "./add-client.module.scss";
import HookDatePicker from "../../atoms/form-fields/SLFieldDatePicker";
import { HookTextField } from "../../atoms/form-fields/SLFieldTextField";
import { useHookFormContext } from "../../utils/hooks/useHookFormContext";
import { commonInputStyles, clientType, minDateValue, getAdminsAPI, cscOptions, compliance_start_after_options, compliance_end_before_options, getComplianceEndBeforeOptions } from "./helper";
import { HookAutoComplete } from "../../atoms/form-fields/SLFieldAutoComplete";
import { useFetch } from "../../utils/hooks/useFetch";
import { APIRoutes } from "../../constants";
import { formatToLV } from "../../common/formatData";
import BasicAutocomplete from "../../molecules/autocompletes/basic-autocomplete";
import { HookRichTextField } from "../../atoms/rich-text-editor/HookRichTextEditor";


const AddClientFields = (props: any) => {
  const { registerState, watch, setValue } = useHookFormContext();
  const { formattedData: allAdmins, loading: adminLoading } = useFetch<getAdminsAPI["data"], { value: number, label: string }[]>(APIRoutes.adminUsers + "&show_columns=id,name", {
    formatter: formatToLV<{ id: number, name: string }>
  });

  useEffect(() => {
    const subscription = watch((value, { name, type }) => {
      if (type === "change") {
        props.setFormChange();

        if(name === "compliance_start_after") {
          setValue("compliance_end_before","");
        }
      }
    });

    return () => subscription.unsubscribe();
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watch]);

  const [contract_valid_till_value, compliance_start_after] = watch(["contract_valid_till", "compliance_start_after"])

  const handleCloseBtnClick = () => {
    setValue("contract_valid_till", null);
  };

  return (
    <>
      <Grid container>
        <Grid className={styles.inputRow} item xs={12}>
          <HookTextField
            {...registerState("name")}
            rules={{
              required: { value: true, message: "This is required" },
              maxLength: {
                value: 70,
                message: "This should be less than 70 characters",
              },
            }}
            textFieldProps={{
              ...commonInputStyles,
              label: "Client Name *",
            }}
          />
        </Grid>
        <Grid className={styles.inputRow} style={{ position: "relative" }} item xs={12}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <HookDatePicker
              {...registerState("contract_valid_till")}
              datePickerProps={{
                minDate: minDateValue,
                className: "date-picker",
                label: "Contract Valid Till",
                slotProps: { textField: { size: "small", fullWidth: true } },
              }}
            />
            {contract_valid_till_value && (
              <IconButton
                className={styles.closeBtn}
                onClick={handleCloseBtnClick}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            )}
          </LocalizationProvider>
        </Grid>

        <Grid className={styles.inputRow} item xs={12}>
          <BasicAutocomplete
            label="Client Type *"
            registerName="type"
            options={clientType}
            isRequired
          />
        </Grid>

        <Grid className={styles.inputRow} item xs={12}>
          <HookAutoComplete
            {...registerState("CEM")}
            textFieldProps={{
              label: "CEM",
              size: "small"
            }}
            autocompleteProps={{
              ...commonInputStyles,
              options: allAdmins || [],
              isOptionEqualToValue: (option: any, value: any) =>
                option?.value === value?.value,
              loading: adminLoading,
              style: { backgroundColor: "white" },
              renderOption: (props: any, option: { label: string, value: number }) => <li {...props} key={option.value}>{option.label}</li>
            }}
          />
        </Grid>
        {/* 
        <Grid className={styles.inputRow} item xs={12}>
          <HookAutoComplete
            {...registerState("csc")}
            textFieldProps={{
              label: "Client specific compliance requirement",
              size: "small"
            }}
            autocompleteProps={{
              ...commonInputStyles,
              options: cscOptions,
              isOptionEqualToValue: (option: any, value: any) =>
                option?.value === value?.value,
              style: { backgroundColor: "white" },
              renderOption: (props: any, option: { label: string, value: number }) => <li {...props} key={option.value}>{option.label}</li>
            }}
          />
        </Grid> */}


        <Grid className={styles.inputRow} item xs={6}>
          <HookAutoComplete
            {...registerState("compliance_start_after")}
            textFieldProps={{
              label: "Compliance Start After *",
              size: "small"
            }}
            autocompleteProps={{
              ...commonInputStyles,
              options: compliance_start_after_options,
              isOptionEqualToValue: (option: any, value: any) =>
                option?.value === value?.value,
              style: { backgroundColor: "white" },
              renderOption: (props: any, option: { label: string, value: number }) => <li {...props} key={option.value}>{option.label}</li>
            }}
          />
        </Grid>

        {compliance_start_after?.value !== "Not Required" &&
          <Grid className={styles.inputRow} item xs={6}>
            <HookAutoComplete
              {...registerState("compliance_end_before")}
              textFieldProps={{
                label: "Compliance End Before *",
                size: "small"
              }}
              rules={{
                required: { value: true, message: "This is required" },
              }}
              autocompleteProps={{
                ...commonInputStyles,
                options: getComplianceEndBeforeOptions(compliance_start_after),
                isOptionEqualToValue: (option: any, value: any) =>
                  option?.value === value?.value,
                style: { backgroundColor: "white" },
                renderOption: (props: any, option: { label: string, value: number }) => <li {...props} key={option.value}>{option.label}</li>
              }}
            />
          </Grid>
        }

        <Grid className={styles.inputRow} item xs={12}>
          <HookRichTextField
            {...registerState("compliance_email_format")}
            quillProps={{
              placeholder: "Client Compliance Email Format",
            }}
          />
        </Grid>

        <Grid className={styles.inputRow} item xs={12}>
          <HookRichTextField
            {...registerState("compliance_description")}
            quillProps={{
              placeholder: "Client Compliance Description",
            }}
          />
        </Grid>



        <Grid className={styles.actionRow} item xs={12}>
          <CustomBtnFilled
            label="cancel"
            variant="outlined"
            onClick={props.handleClose}
          />
          <CustomBtnFilled
            disabled={props.submitting}
            label={props.submitting ? "loading..." : "submit"}
            variant="contained"
            buttonType="submit"
          />
        </Grid>
      </Grid>
    </>
  );
};

export default AddClientFields;
