import { Checkbox, Grid } from "@mui/material";
import { useEffect } from "react";
import { HookAutoComplete } from "../../../atoms/form-fields/SLFieldAutoComplete";
import { HookTextField } from "../../../atoms/form-fields/SLFieldTextField";
import FormCancelSubmitBtns from "../../../atoms/formCancelSubmitBtns";
import { useHookFormContext } from "../../../utils/hooks/useHookFormContext";
import { commonInputStyles } from "../../admin/style";
import { formInputRowStyle } from "../../client/all-clients/style";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";


const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

type Props = {
  handleClose: () => void;
  geographiesList: any[];
  setFormChange: () => void;
};

const Fields = ({ geographiesList, handleClose, setFormChange }: Props) => {
  const { registerState, watch } = useHookFormContext();

  useEffect(() => {
    const subscription = watch((value, { name, type }) => {
      if (type === "change") {
        setFormChange();
      }
    });

    return () => subscription.unsubscribe();
    //eslint-disable-next-line
  }, [watch]);

  return (
    <>
      <Grid container mt="5px">
        {/* Name */}
        <Grid item xs={12} md={6} sx={formInputRowStyle}>
          <HookTextField
            {...registerState("name")}
            rules={{
              required: { value: true, message: "This field is required" },
            }}
            textFieldProps={{
              ...commonInputStyles,
              label: "Name",
              required: true,
            }}
          />
        </Grid>

        {/* Admins */}
        <Grid item xs={12} md={6} sx={formInputRowStyle}>
          <HookAutoComplete
            {...registerState("admins")}
            textFieldProps={{
              label: "Admins",
              size: "small",
              required: true,
            }}
            rules={{
              required: { value: true, message: "This field is required" },
            }}
            autocompleteProps={{
              isOptionEqualToValue: (option, value) =>
                option.value === value.value,
              size: "small",
              options: geographiesList,
              multiple: true,
              disableCloseOnSelect: true,
              style: { backgroundColor: "white" },
              renderOption: (props, option: any, { selected }) => {
                return (
                  <li {...props} key={option.value}>
                    <Checkbox
                      icon={icon}
                      checkedIcon={checkedIcon}
                      style={{ marginRight: 8 }}
                      checked={selected}
                    />
                    {option?.label}
                  </li>
                );
              },
            }}
          />
        </Grid>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <FormCancelSubmitBtns handleClose={handleClose} />
      </Grid>
    </>
  );
};

export default Fields;
