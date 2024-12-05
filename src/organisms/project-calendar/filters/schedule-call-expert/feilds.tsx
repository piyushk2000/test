import { Grid, Typography } from "@mui/material";
import { HookAutoComplete } from "../../../../atoms/form-fields/SLFieldAutoComplete";
import FormCancelSubmitBtns from "../../../../atoms/formCancelSubmitBtns";
import { useHookFormContext } from "../../../../utils/hooks/useHookFormContext";

type Props = {
  experts:{ value: number, label: string }[];
  handleClose: () => void;
};

export const inputRow = {
  padding: "10px 5px",
};

export const commonInputStyles: any = {
  className: "backgroundWhite",
  size: "small",
  variant: "outlined",
  fullWidth: true,
};


const Fields = ({experts, handleClose }: Props) => {
  const { registerState } = useHookFormContext();
  return (
    <Grid container mt="1px">

      
      <Grid item xs={3} sx={{ ...inputRow }}>
        <Typography sx={{ paddingTop:'7px',fontSize: "14px", fontWeight: "500" }}>
        Expert:
        </Typography>
      </Grid>
      <Grid sx={inputRow} item xs={9}>
      <HookAutoComplete
          {...registerState("expert")}
          textFieldProps={{
            label: "Expert",
            size: "small",
          }}
          rules={{
            required: { value: true, message: "This field is required" }
          }}
          autocompleteProps={{
            ...commonInputStyles,
            options: experts || [],
            isOptionEqualToValue: (option: any, value: any) =>
              option?.value === value?.value,
            style: { backgroundColor: "white" },
            renderOption: (props: any, option: { label: string, value: number }) => <li {...props} key={option.value}>{option.label}</li>
          }}
          
        />
      </Grid>
      <FormCancelSubmitBtns handleClose={handleClose} />
    </Grid>
  );
};

export default Fields;
