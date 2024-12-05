import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import { HookTextField } from "../../../../atoms/form-fields/SLFieldTextField";
import { useHookFormContext } from "../../../../utils/hooks/useHookFormContext";
import { commonInputStyles, inputRow } from "../style";
import { HookAutoComplete } from "../../../../atoms/form-fields/SLFieldAutoComplete";
import HookDateTimePicker from "../../../../atoms/form-fields/SLFieldDateTimePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { dateClearBtnStyles } from "../../../edit-expert/styles";
import CloseIcon from "@mui/icons-material/Close";
import { useEffect } from "react";
import { LocalDayjs } from "../../../../utils/timezoneService";

const BasicDetailsField = (props: any) => {
  const { billing_office_arr, case_code_arr, schedule_call_arr, isEditForm,research_analyst_arr,call_type_arr, disabledStatus,isViewForm } = props;
  const { registerState, watch, setValue } = useHookFormContext();

  const handleClearBtn = () => {
    setValue("call_date", null);
  };

  const call_date_value = watch("call_date");
  const schedule_call = watch("schedule_call")

  useEffect(() => {
    if (schedule_call?.callTime&&!isEditForm) {
      setValue("call_date", LocalDayjs(schedule_call?.callTime))
      
      if(schedule_call?.research_analyst){
        let research_analyst=research_analyst_arr.find((val:any)=>val.value==schedule_call?.research_analyst);
        setValue("research_analyst", research_analyst)
      }else{
        setValue("research_analyst", null)
      }
      if(schedule_call?.call_type){
        let call_type=call_type_arr.find((val:any)=>val.value==schedule_call?.call_type);
        setValue("call_type", call_type)
      }else{
        setValue("call_type", null)
      }
        
    }
    // eslint-disable-next-line
  }, [schedule_call?.callTime])

  useEffect(()=>{
    if (case_code_arr.lenth == 1){
      setValue("case_code", case_code_arr[0].value)
    }
  })


  return (
    <>
      {/* Schedule Call */}
      <Grid item xs={12} sx={inputRow}>
        <HookAutoComplete
          {...registerState("schedule_call")}
          textFieldProps={{
            label: "Pick one of the scheduled calls *",
            size: "small",
          }}
          rules={{
            required: { value: true, message: "This field is required" },
          }}
          autocompleteProps={{
            disabled: Boolean(isEditForm),
            isOptionEqualToValue: (option: any, value: any) =>
              option?.value === value?.value,
            size: "small",
            disablePortal: true,
            options: schedule_call_arr,
            style: { backgroundColor: "white" },
            renderOption: (props, option) => (
              <li
                {...props}
                key={option.label+Math.random()}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  width: "100%",
                }}
              >
                <p style={{ width: "fit-content" }}>
                  {option.label.split("|")[0]}
                </p>
                {"( "}
                <p
                  style={{
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    maxWidth: "60%",
                  }}
                >
                  {option.label.split("|")[1]}
                </p>
                {" )"}
              </li>
            ),
          }}
        />
      </Grid>

      {/* Expert name */}
      <Grid item xs={12} md={6} sx={inputRow}>
        <HookTextField
          {...registerState("expert_name")}
          textFieldProps={{
            ...commonInputStyles,
            label: "Expert Name (read only)",
            disabled: true,
          }}
        />
      </Grid>

      {/* Billing Office */}

      <Grid sx={inputRow} item xs={12} md={6}>
        <HookAutoComplete
          {...registerState("billing_office")}
          textFieldProps={{
            label: "Billing Office *",
            size: "small",
          }}
          rules={{
            required: { value: true, message: "This field is required" },
          }}
          autocompleteProps={{
            isOptionEqualToValue: (option: any, value: any) =>
              option?.value === value?.value,
            size: "small",
            disablePortal: true,
            disabled: isViewForm,
            options: billing_office_arr,
            style: { backgroundColor: "white" },
          }}
        />
      </Grid>

      {/* Case Code */}
      <Grid sx={inputRow} item xs={12} md={6}>
        
          <HookAutoComplete
            {...registerState("case_code")}
            textFieldProps={{
              label: "Case Code *",
              size: "small",
            }}
            rules={{
              required: { value: true, message: "This field is required" },
            }}
            autocompleteProps={{
              isOptionEqualToValue: (option: any, value: any) =>
                option?.value === value?.value,
              size: "small",
              disablePortal: true,
              options: case_code_arr,
              style: { backgroundColor: "white" },
              disabled: isViewForm,
            }}
          />
      </Grid>

      {/* Call Date */}
      <Grid item xs={12} md={6} sx={{ ...inputRow, position: "relative" }}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <HookDateTimePicker
            {...registerState("call_date")}
            rules={{
              required: { value: true, message: "This field is required" },
            }}
            dateTimePickerProps={{
              disabled: (disabledStatus || isViewForm),
              format: "DD/MM/YYYY h:mm A",
              className: "date-time-picker",
              label: disabledStatus ?  "Call Date & Time (in IST) - (read only)" : "Call Date & Time (in IST) *",
              slotProps: { textField: { size: "small", fullWidth: true } },
              sx: {
                backgroundColor: "white",
              },
            }}
          />
          {call_date_value && (
            <IconButton sx={dateClearBtnStyles()} onClick={handleClearBtn}>
              <CloseIcon fontSize="small" />
            </IconButton>
          )}
        </LocalizationProvider>
      </Grid>
    </>
  );
};

export default BasicDetailsField;
