import TextField from "@mui/material/TextField";
import { Controller, useFormContext } from "react-hook-form";

type InputProps = {
  label: string;
  required?: boolean;
  multiline?: boolean;
  rows?: number;
  value?: string;
  onChange?: any;
  onBlur?: any;
  error?: any;
  helperText?: any;
  id?:string;
  inputKey?: string;
};

function CustomInput({
  label,
  required = true,
  multiline = false,
  rows = 1,
  value = "",
  onChange,
  onBlur,
  error,
  helperText,
  id,
  inputKey = "",
}: InputProps) {
  const { control } = useFormContext();
  return (
    <Controller
      name={inputKey}
      control={control}
      render={({
        field: { onChange, value },
        fieldState: { error },
        formState,
      }) => (
        <TextField
          helperText={error ? error.message : null}
          size="small"
          error={!!error}
          onChange={onChange}
          value={value}
          required={required}
          multiline={multiline}
          rows={rows}
          label={label}
          type="text"
          variant="outlined"
          fullWidth
          InputProps={{
            sx: {
              borderRadius: "4px",
              background: "white",
            },
          }}
        />
      )}
    />
  );
}

export default CustomInput;
