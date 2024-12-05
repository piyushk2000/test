import React from "react";
import { HookAutoComplete } from "../../../atoms/form-fields/SLFieldAutoComplete";
import { useHookFormContext } from "../../../utils/hooks/useHookFormContext";
import Checkbox from "@mui/material/Checkbox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";

type Props = {
  label: string;
  registerName: string;
  options:
  | {
    value: number | string;
    label: string;
  }[]
  | null;
  multiple?: boolean;
  isRequired?: boolean;
  isValueNeeded?: boolean;
  disablePortal?: boolean;
  getValue?: (input: any) => void;
  isDisabled?: boolean;
};

export default function BasicAutocomplete({
  label,
  registerName,
  options,
  multiple,
  isRequired,
  isValueNeeded = false,
  getValue = () => { },
  disablePortal = false,
  isDisabled = false
}: Props) {
  const { registerState } = useHookFormContext();

  return (
    <HookAutoComplete
      {...registerState(registerName)}
      textFieldProps={{
        label: label,
        size: "small",
      }}
      rules={{
        required: {
          value: !!isRequired, message: "This field is required"
        }
      }}
      autocompleteProps={{
        disabled: isDisabled,
        isOptionEqualToValue: (option: any, value: any) =>
          option?.value === value?.value,
        size: "small",
        options: options || [],
        noOptionsText: "no options",
        multiple: multiple,
        disablePortal: disablePortal,
        sx: { backgroundColor: "white" },
        renderOption: multiple
          ? CheckboxOptions
          : (props: any, option: any) => (
            <li {...props} key={option.value}>
              {option?.label}
            </li>
          ),
        getOptionLabel: (option) => option?.label,
        disableCloseOnSelect: multiple,
        onChange: (event, newValue: any) => {
          if (isValueNeeded) {
            getValue(newValue);
          }
        }
      }}
    />
  );
}

const CheckboxOptions = (props: any, option: any, { selected }: any) => (
  <li {...props} key={option.value}>
    <Checkbox
      icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
      checkedIcon={<CheckBoxIcon fontSize="small" />}
      style={{ marginRight: "8px" }}
      checked={selected}
    />
    {option?.label}
  </li>
);
