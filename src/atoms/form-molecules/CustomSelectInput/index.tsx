// import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import classes from "./Select.module.scss";
import { Controller, useFormContext } from "react-hook-form";

type InputProps = {
  labelSelect: string;
  labelInput: string;
  valueArray: any[];
  keySelect?: string;
  keyInput?: string;
};

export default function CustomSelectInput({
  labelSelect,
  valueArray,
  labelInput,
  keySelect,
  keyInput,
}: InputProps) {
  const { control } = useFormContext();
  return (
    <div className={classes.divFlex}>
      <FormControl
        className={classes.TextFieldSelect}
        size="small"
        style={{ width: "100px" }}
      >
        <Controller
          control={control}
          name={keySelect || ""}
          render={({ field: { onChange, value } }) => (
            <Select
              labelId="demo-simple-select-label"
              sx={{ background: "white" }}
              fullWidth
              onChange={onChange}
              value={value}
            >
              {valueArray.map((val) => (
                <MenuItem
                  sx={{ fontSize: "0.875rem" }}
                  value={val.value}
                  key={val.value}
                >
                  {val.label}
                </MenuItem>
              ))}
            </Select>
          )}
        />
      </FormControl>

      <Controller
        name={keyInput || ""}
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
            label={labelInput}
            className={classes.TextFieldInput}
            sx={{ fontSize: "0.875rem", background: "white" }}
            type="text"
            variant="outlined"
            fullWidth
            required
          />
        )}
      />
    </div>
  );
}
