import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Controller, useFormContext } from "react-hook-form";

type InputProps = {
  label: string;
  valueArray: any[];
  selectFirst?: boolean;
  value?: string;
  onChange?: any;
  onBlur?: any;
  error?: any;
  helperText?: any;
  required?: boolean;
  id?: string;
  selectKey?: string;
};

export default function CustomSelect({
  label,
  valueArray,
  selectFirst = false,
  value,
  onChange,
  onBlur,
  error,
  helperText,
  required = false,
  id,
  selectKey = "",
}: InputProps) {
  const { control } = useFormContext();
  return (
    <FormControl size="small" fullWidth>
      <InputLabel>{label}</InputLabel>
      <Controller
        render={({ field: { onChange, value } }) => (
          <Select
            label={label}
            fullWidth
            inputProps={{
              sx: {
                borderRadius: "4px",
                background: "white",
              },
            }}
            onChange={onChange}
            value={value}
          >
            {valueArray.map((item) => (
              <MenuItem
                sx={{ fontSize: "0.875rem" }}
                key={item.value}
                value={item.value}
              >
                {item.label}
              </MenuItem>
            ))}
          </Select>
        )}
        control={control}
        name={selectKey}
      />
    </FormControl>
  );
}
