import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import { Controller, useFormContext } from "react-hook-form";
// import classes from './Radio.module.scss';

type InputProps = {
  radioKey: string;
  required?: boolean;
  options: string[];
};

export default function CustomRadio({
  radioKey,
  required = false,
  options,
}: InputProps) {
  const { control } = useFormContext();
  return (
    <FormControl required={required}>
      <Controller
        name={radioKey}
        control={control}
        render={({
          field: { onChange, value },
          fieldState: { error },
          formState,
        }) => (
          <RadioGroup
            value={value}
            onChange={onChange}
            row
            name="row-radio-buttons-group"
          >
            {options.map((label) => (
              <FormControlLabel
                className="mr-8"
                value={label}
                control={<Radio />}
                label={label}
                key={label}
              />
            ))}
          </RadioGroup>
        )}
      />
    </FormControl>
  );
}
