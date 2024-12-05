import { Grid, IconButton } from "@mui/material";
import React from "react";
import FormCancelSubmitBtns from "../../../atoms/formCancelSubmitBtns";
import { HookAutoComplete } from "../../../atoms/form-fields/SLFieldAutoComplete";
import { useHookFormContext } from "../../../utils/hooks/useHookFormContext";
import { actionOptions, dateClearBtnStyles, inputRow } from "./helper";
import { CheckboxOptions } from "../../expert-filter-dialog/helper";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import HookDatePicker from "../../../atoms/form-fields/SLFieldDatePicker";
import CloseIcon from "@mui/icons-material/Close";

type Props = {
  handleClose: () => void;
  users: { label: string; value: number }[];
};

const Fields = ({ handleClose, users }: Props) => {
  const { registerState, watch, setValue } = useHookFormContext();

  const [after_date, before_date] = watch([
    "greaterthanequalto___timeStamp",
    "lessthanequalto___timeStamp",
  ]);

  const handleClearBtn = (value: string) => {
    setValue(value, null);
  };

  return (
    <Grid container mt="1rem">
      {/* Actor */}
      <Grid item xs={12} sx={inputRow}>
        <HookAutoComplete
          {...registerState("actor")}
          textFieldProps={{
            label: "Actor",
            size: "small",
          }}
          autocompleteProps={{
            isOptionEqualToValue: (option: any, value: any) =>
              option?.value === value?.value,
            size: "small",
            options: users || [],
            noOptionsText: "Loading...",
            multiple: false,
            sx: { backgroundColor: "white" },
            renderOption: (props: any, option: any) => (
              <li {...props} key={option.value}>
                {option?.label}
              </li>
            ),
          }}
        />
      </Grid>

      {/* Actions  */}
      <Grid item xs={12} sx={inputRow}>
        <HookAutoComplete
          {...registerState("action")}
          textFieldProps={{
            label: "Actions",
            size: "small",
          }}
          autocompleteProps={{
            isOptionEqualToValue: (option: any, value: any) =>
              option?.value === value?.value,
            size: "small",
            options: actionOptions,
            multiple: true,
            disableCloseOnSelect: true,
            renderOption: CheckboxOptions,
            sx: { backgroundColor: "white" },
          }}
        />
      </Grid>

      {/* After Date */}
      <Grid item xs={6} sx={{ ...inputRow, position: "relative" }}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <HookDatePicker
            {...registerState("greaterthanequalto___timeStamp")}
            datePickerProps={{
              format: "DD/MM/YYYY",
              className: "date-picker",
              label: "After Date",
              slotProps: { textField: { size: "small", fullWidth: true } },
              disableFuture: true,
              sx: {
                backgroundColor: "white",
              },
            }}
          />
          {after_date && (
            <IconButton
              sx={dateClearBtnStyles}
              onClick={() => handleClearBtn("greaterthanequalto___timeStamp")}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          )}
        </LocalizationProvider>
      </Grid>

      {/* Before Date */}
      <Grid item xs={6} sx={{ ...inputRow, position: "relative" }}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <HookDatePicker
            {...registerState("lessthanequalto___timeStamp")}
            datePickerProps={{
              format: "DD/MM/YYYY",
              className: "date-picker",
              label: "Before Date",
              slotProps: { textField: { size: "small", fullWidth: true } },
              disableFuture: true,
              sx: {
                backgroundColor: "white",
              },
            }}
          />
          {before_date && (
            <IconButton
              sx={dateClearBtnStyles}
              onClick={() => handleClearBtn("lessthanequalto___timeStamp")}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          )}
        </LocalizationProvider>
      </Grid>

      <FormCancelSubmitBtns handleClose={handleClose} />
    </Grid>
  );
};

export default Fields;
