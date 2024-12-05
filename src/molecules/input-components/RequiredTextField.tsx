import { HookTextField } from "../../atoms/form-fields/SLFieldTextField";
import { useHookFormContext } from "../../utils/hooks/useHookFormContext";

type Props = {
  label: string;
  id: string;
  disabled?: boolean;
  required?: boolean;
  pattern?: {
    value: RegExp;
    message: string;
  };
  max?: number;
  type?: React.HTMLInputTypeAttribute;
  multiline?: boolean;
  minRows?: string | number;
  maxRows?: string | number;
};

export function RequiredTextField({
  label,
  id,
  disabled = false,
  required = true,
  max = 70,
  pattern,
  type = "text",
  multiline = false,
  minRows,
  maxRows
}: Props) {
  const { registerState } = useHookFormContext();

  return (
    <HookTextField
      rules={{
        required: {
          value: required,
          message: "This field is required",
        },
        maxLength: {
          value: max,
          message: `Input must be less than ${max} characters`
        },
        pattern,
      }}
      {...registerState(id)}
      textFieldProps={{
        className: "backgroundWhite-description",
        size: "small",
        variant: "outlined",
        fullWidth: true,
        sx: { background: "white" },
        label,
        disabled,
        type,
        multiline,
        minRows,
        maxRows
      }}
    />
  );
}
