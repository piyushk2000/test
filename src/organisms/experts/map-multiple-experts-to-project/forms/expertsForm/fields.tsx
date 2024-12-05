import { Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { inputRow } from "../../helper";
import { HookAutoComplete } from "../../../../../atoms/form-fields/SLFieldAutoComplete";
import { useHookFormContext } from "../../../../../utils/hooks/useHookFormContext";
import CustomBtnFilled from "../../../../../atoms/form-molecules/CustomBtnFilled";
import {
  getRelevantValues,
  relevant_state,
} from "../../../../project/project-add-pe-form/helper";

type Props = {
  name: string;
  id: number;
};

const Fields = (props: Props) => {
  const { registerState } = useHookFormContext();
  const [relevant, setRelevant] = useState<relevant_state>({
    options: null,
    loading: false,
  });

  useEffect(() => {
    if (props.id) {
      getRelevantValues(props.id, setRelevant);
    }
  }, []);

  return (
    <Grid container>
      <Grid
        item
        xs={12}
        md={3.4}
        sx={inputRow}
        display={"flex"}
        alignItems={"center"}
      >
        <Typography>{props.name}</Typography>
      </Grid>
      <Grid item xs={12} md={6.6} sx={inputRow}>
        <HookAutoComplete
          {...registerState("relevant_company")}
          textFieldProps={{
            label: "Relevant Company *",
            size: "small",
          }}
          rules={{
            required: { value: true, message: "This is Required" },
          }}
          autocompleteProps={{
            isOptionEqualToValue: (option: any, value: any) =>
              option?.value === value?.value,
            size: "small",
            options: relevant.options || [],
            noOptionsText: "No Options",
            loadingText: "Loading...",
            loading: relevant.loading,
            multiple: false,
            sx: { backgroundColor: "white" },
            renderOption: (props: any, option: any) => (
              <li {...props} key={option.value}>
                {option?.label}
              </li>
            ),
          }}
        />
      </Grid>
      <Grid
        item
        xs={12}
        md={2}
        display={"flex"}
        alignItems={"Center"}
        justifyContent={{
          md: "flex-end",
          xs: "flex-start",
        }}
        sx={inputRow}
      >
        <CustomBtnFilled
          label="submit"
          variant="contained"
          buttonType="submit"
        />
      </Grid>
    </Grid>
  );
};

export default Fields;
