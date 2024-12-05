import TextField from "@mui/material/TextField";
import classes from "./Input.module.scss";

type InputProps = {
  label: string;
  required?: boolean;
  multiline?: boolean;
  rows?: number;
  value?:any;
  name?:any
};

function customInput({
  label,
  required = true,
  multiline = false,
  rows = 1,
  value,
  name
}: InputProps) {
  return (
    <TextField
      size="small"
      required={required}
      multiline={multiline}
      rows={rows}
      name={name}
      value={value}
      className={classes.TextFieldInput}
      label={label}
      type="text"
      variant="outlined"
      fullWidth
    />
  );
}

export default customInput;
