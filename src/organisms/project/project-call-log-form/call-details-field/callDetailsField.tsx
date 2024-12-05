import Grid from "@mui/material/Grid";
import { HookTextField } from "../../../../atoms/form-fields/SLFieldTextField";
import { useHookFormContext } from "../../../../utils/hooks/useHookFormContext";
import { commonInputStyles, inputRow } from "../style";
import { HookRadioButton } from "../../../../atoms/form-fields/SLFieldRadioButton";
import BasicAutocomplete from "../../../../molecules/autocompletes/basic-autocomplete";
import { isSuperAdmin } from "../../../../utils/role";
import React, { useEffect, useState } from "react";
import { clients_requiring_reason } from "../../../../constants/configConstants";
import Info from "../../../../assets/images/info.png";
import {Divider, Paper, Popover, Typography } from "@mui/material";
import { BoxFlex } from "../../../../atoms/boxSpaceBtw";

const CallDetailsFields = (props: any) => {
  const [callMediumReason, setCallMediumReason] = useState(false);
  const { registerState, getValues, watch, setValue } = useHookFormContext();
  const { call_type_arr, call_medium_arr, call_status_arr, call_medium_reason_arr, client_id, isEditForm, isEditAllowed, setEditAllowedTrue, disabledStatus,isViewForm } = props;
  const disableField = !isSuperAdmin();
  const checkChange = watch(['call_type', 'call_medium']);


  useEffect(() => {
    const [call_type, call_medium ] = getValues(['call_type','call_medium'])
    if (clients_requiring_reason.includes(client_id)){
      if (["Internal - Automated", "Internal - Manual",  "Client - Manual"].includes(call_medium?.value) && ['Call', 'Follow up call', 'LOP (Letter of Proposal)'].includes(call_type?.value)) {
        setCallMediumReason(true)
      } else {
        setValue('call_medium_reason', null)
        setCallMediumReason(false)
      }
    }

  }, [checkChange])

  
  // Popover state and handlers
  const [anchorEl, setAnchorEl] = useState(null);
  const handlePopoverOpen = (event:any) => {
    setAnchorEl(event.currentTarget);
  };
  const handlePopoverClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);

  const dashboardOptions = [
    { option: 'Client - Automated', meaning: 'Call was done on client portal' },
    { option: 'Client - Manual', meaning: "Client's zoom/webex/or any other platform was used" },
    { option: 'Internal - Manual', meaning: 'Infollion\'s gmeet/webex/or any other platform was used' },
    { option: 'Internal - Automated', meaning: 'Infollion\'s zoom' },
    { option: 'Other', meaning: 'Written report / on site visit' },
  ];


  return (
    <>
      {/* Call Type */}
      <Grid item xs={5.7}>
        <BasicAutocomplete
          label="Call Type *"
          registerName="call_type"
          options={call_type_arr}
          isRequired
          isDisabled={isViewForm}
        />
      </Grid>

      {/* Call Medium */}
      <Grid item xs={5.7}>
        <BasicAutocomplete
          label="Call Medium *"
          registerName="call_medium"
          options={call_medium_arr}
          isRequired
          isDisabled={isViewForm}
        />
      </Grid>
      {/* Info Icon */}
      <Grid item xs={0.6} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <img
          src={Info}
          alt="Call Info"
          style={{ height: '20px', width: '20px', cursor: 'pointer', display: 'block' }}
          onClick={handlePopoverOpen}
        />
      </Grid>

      {/* Popover */}
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handlePopoverClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <Paper elevation={3} sx={{ maxWidth: 800, mx: 'auto', p: 2 }}>
          <Grid container spacing={1} sx={{ borderBottom: '1px solid #e0e0e0', pb: 1, mb: 1 }}>
            <Grid item xs={4}>
              <Typography variant="subtitle2" fontWeight="bold">Dashboard Option</Typography>
            </Grid>
            <Grid item xs={1}>
              <Typography variant="subtitle2" fontWeight="bold" align="left">-</Typography>
            </Grid>
            <Grid item xs={7}>
              <Typography variant="subtitle2" fontWeight="bold">Meaning</Typography>
            </Grid>
          </Grid>
          {dashboardOptions.map((item, index) => (
            <React.Fragment key={index}>
              <Grid container spacing={1} sx={{ py: 0.5 }}>
                <Grid item xs={4}>
                  <Typography variant="body2">{item.option}</Typography>
                </Grid>
                <Grid item xs={1}>
                  <Typography variant="body2" align="left">-</Typography>
                </Grid>
                <Grid item xs={7}>
                  <Typography variant="body2">{item.meaning}</Typography>
                </Grid>
              </Grid>
              {index < dashboardOptions.length - 1 && <Divider sx={{ my: 0.5 }} />}
            </React.Fragment>
          ))}
        </Paper>
      </Popover>



      {callMediumReason &&
        <Grid item xs={5.7}>
          <BasicAutocomplete
            label="Call Medium Reason:*"
            registerName="call_medium_reason"
            options={call_medium_reason_arr}
            isRequired={callMediumReason}
          />
        </Grid>
      }


      {/* Call Status */}
      {!isViewForm ?
        <Grid item container xs={12} sx={inputRow}>
          <HookRadioButton
            {...registerState("call_status")}
            label="Call Status:*"
            rules={{
              required: { value: true, message: "This field is required" },
            }}
            radioGroupProps={{
              style: { display: "flex", gap: "1rem" },
            }}
            fields={call_status_arr}
          />
        </Grid>
        :
        <><Grid item container xs={6.01} sx={inputRow}>
          <HookTextField
            {...registerState("call_status")}
            textFieldProps={{
              ...commonInputStyles,
              label: "Call Status:",
              disabled: true,
            }}
          />
        </Grid>
        </>
      }

      {isEditForm &&
        <>
          {/* Exchange Rate Chargeable */}
          <Grid item xs={12} md={6} sx={inputRow}>
            <HookTextField
              {...registerState("exchange_rate_chargeable")}
              rules={{
                required: { value: true, message: "This field is required" },
              }}
              textFieldProps={{
                ...commonInputStyles,
                label: "Exchange Rate Chargeable",
                type: "number",
                disabled:isViewForm
              }}
            />
          </Grid>

          {/* Exchange Rate Payable */}
          <Grid item xs={12} md={6} sx={inputRow}>
            <HookTextField
              {...registerState("exchange_rate_payable")}
              rules={{
                required: { value: true, message: "This field is required" },
              }}
              textFieldProps={{
                ...commonInputStyles,
                label: !isEditAllowed ? "Exchange Rate Payable (read only)" : "Exchange Rate Payable *",
                type: "number",
                disabled: ((isEditForm && !isEditAllowed) || isViewForm)
              }}
            />
            {isSuperAdmin() && !isEditAllowed && !disabledStatus &&
              <BoxFlex sx={{ justifyContent: "flex-end", color: "var(--green-color)", textDecoration: "underline", cursor: "pointer" }}>
                <BoxFlex onClick={setEditAllowedTrue}>
                  <Typography>edit</Typography>
                </BoxFlex>
              </BoxFlex>
            }
          </Grid>
        </>}
    </>
  );
};

export default CallDetailsFields;
