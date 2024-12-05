import { Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { HookAutoComplete } from "../../../../atoms/form-fields/SLFieldAutoComplete";
import { useHookFormContext } from "../../../../utils/hooks/useHookFormContext";
import CustomBtnFilled from "../../../../atoms/form-molecules/CustomBtnFilled";
import { inputRow } from "../style";
import FormCancelSubmitBtns from "../../../../atoms/formCancelSubmitBtns";

type Props = {
  allAccManagers: { label: string; value: number }[];
};

const Fields = ({ allAccManagers }: Props) => {
  const { registerState } = useHookFormContext();

  return (
    <Grid container mt={"1rem"}>
      {/*  Choose new account manager */}
      <Grid item xs={12} sx={inputRow} mb={"1rem"}>
        <HookAutoComplete
          {...registerState("account_manager")}
          textFieldProps={{
            label: "Choose New Account Manager",
            size: "small",
          }}
          rules={{
            required: {
              value: true,
              message: "This field is required",
            },
          }}
          autocompleteProps={{
            isOptionEqualToValue: (option: any, value: any) =>
              option?.value === value?.value,
            size: "small",
            options: allAccManagers,
            noOptionsText: "Loading...",
            multiple: false,
            sx: { backgroundColor: "white" },
          }}
        />
      </Grid>
      <FormCancelSubmitBtns handleClose={() => {}} />
    </Grid>
  );
};

export default Fields;
