import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import classes from "./Autocomplete.module.scss";
import Grid from "@mui/material/Grid";
import { Controller, useFormContext } from "react-hook-form";

type InputProps = {
  label: string;
  multiple: boolean;
  defaultValue?: any;
  onChange?: any;
  required?: boolean;
  inputKey?: string;
} & (
  | {
      freeText: false;
      valueArray: any[];
      fetchOptions?: () => Promise<any[]>;
    }
  | {
      freeText: true;
      valueArray?: any[];
      fetchOptions?: () => Promise<any[]>;
    }
);

export default function CustomAutocomplete({
  label,
  multiple,
  freeText,
  defaultValue,
  onChange,
  required = false,
  inputKey = "",
  ...props
}: InputProps) {
  const { control } = useFormContext()
  return (
    <Controller
      render={({ field: { onChange, value } }) => (
        <Autocomplete
          size="small"
          multiple={multiple}
          freeSolo={freeText}
          fullWidth
          autoHighlight
          disablePortal
          defaultValue={defaultValue}
          onChange={(e, data) => onChange(data)}
          value={value}
          clearOnEscape
          options={props.valueArray || []}
          renderInput={(params: any) => (
            <RenderInput params={params} label={label} required={required} />
          )}
          isOptionEqualToValue={(option, value) => option.label === value.label}
          renderOption={(props, option) => {
            if (!option.id) return <li {...props}>{option.label}</li>;

            return (
              <li
                style={{ display: "flex", justifyContent: "space-between" }}
                {...props}
              >
                <Grid container spacing={2} rowSpacing={2}>
                  <Grid item xs={3}>
                    <p>Id: {option.id}</p>
                  </Grid>
                  <Grid item xs={9}>
                    <p>{option.label}</p>
                  </Grid>
                </Grid>
              </li>
            );
          }}
        />
      )}
      name={inputKey}
      control={control}
    />
  );
}

const RenderInput = ({
  params,
  label,
  required,
}: {
  params: any;
  label: string;
  required: boolean;
}) => {
  return (
    <TextField
      className={classes.backgroudWhite}
      {...params}
      label={label}
      required={required}
      placeholder={"Enter " + label}
    />
  );
};

//isOptionEqualToValue={(option, value) => option.title === value.title}
// getOptionLabel={(option) => option.title}
// options={options}
// loading={loading}
