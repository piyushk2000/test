import Grid from "@mui/material/Grid";
import { useHookFormContext } from "../../../utils/hooks/useHookFormContext";
import { companySeperatorStyle, inputRow } from "../style";
import { HookRadioButton } from "../../../atoms/form-fields/SLFieldRadioButton";
import {
  CheckboxOptions,
  andOrOptions,
  companyFieldsOptions,
  period1,
  period2,
  period3,
} from "../helper";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";
import { HookAutoComplete } from "../../../atoms/form-fields/SLFieldAutoComplete";
import TextfieldAsyncSearchHook from "../../../molecules/textfield-async-search/textfieldAsyncSearchHook";
import { getCompanies } from "../../../pages/Experts/helper";
import { useEffect, useState } from "react";

const CompanyFilters = () => {
  const { registerState, watch, setValue } = useHookFormContext();
  const [companiesOptions, setCompaniesOptions] =
    useState<companyFieldsOptions>({
      current: [],
      past: [],
      exclude: [],
    });

  const [past_company_value, exclude_company_value] = watch(["past_company", "exclude_company"]);

  useEffect(() => {
    const subscription = watch((value, { name, type }) => {
      if (
        type === "change"
      ) {

        if (name === "past_company" &&
          value.past_company.length === 0) {
          setValue("past_more_than", null);
          setValue("past_less_than", null);
        }

        if (name === "exclude_company" &&
          value.exclude_company.length === 0
        ) {
          setValue("exclude_period_3", null);
        }
      }
    });

    return () => subscription.unsubscribe();
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watch]);

  return (
    <>
      {/* Current Company */}
      <Grid item xs={12} sx={{ display: "flex", alignItems: "center" }}>
        <Typography color={"grey"}>Current Company</Typography>
        <Box sx={companySeperatorStyle}></Box>
      </Grid>
      <Grid item xs={12} md={8}>
        <TextfieldAsyncSearchHook
          registerStatename="current_company"
          options={companiesOptions.current}
          searchFunction={(inputValue: string) => getCompanies(inputValue, "current")}
          setOptions={(state: any) =>
            setCompaniesOptions((prev: companyFieldsOptions) => ({
              ...prev,
              current: state,
            }))
          }
          label="Company"
          multi={true}
          isRequired={false}
          disableCloseOnSelect={true}
        />
      </Grid>

      {/* And / OR */}
      <Grid item xs={4} sx={inputRow}>
        <HookRadioButton
          {...registerState("and_or_company")}
          radioGroupProps={{
            style: { display: "flex", gap: "0.25rem" },
          }}
          fields={andOrOptions}
        />
      </Grid>

      {/* Past Company  */}
      <Grid item xs={12} sx={{ display: "flex", alignItems: "center" }}>
        <Typography color={"grey"}>Past Company</Typography>
        <Box sx={companySeperatorStyle}></Box>
      </Grid>
      <Grid item xs={12} md={4}>
        <TextfieldAsyncSearchHook
          registerStatename="past_company"
          options={companiesOptions.past}
          searchFunction={(inputValue: string) => getCompanies(inputValue, "past")}
          setOptions={(state: any) =>
            setCompaniesOptions((prev: companyFieldsOptions) => ({
              ...prev,
              past: state,
            }))
          }
          label="Company"
          lengthMax={{
            value: 1,
            message: "Company Name should be less than 100 characters",
          }}
          multi={true}
          isRequired={false}
          disableCloseOnSelect={true}
        />
      </Grid>
      {/* Past Period 1 */}
      <Grid item xs={12} md={4} sx={inputRow}>
        <HookAutoComplete
          {...registerState("past_more_than")}
          textFieldProps={{
            label: "More than",
            size: "small",
          }}
          autocompleteProps={{
            isOptionEqualToValue: (option: any, value: any) =>
              option?.value === value?.value,
            size: "small",
            disablePortal: true,
            options: period1,
            sx: { backgroundColor: "white" },
            disabled: past_company_value.length === 0,
          }}
        />
      </Grid>

      {/* Past Period 2 */}
      <Grid item xs={12} md={4} sx={inputRow}>
        <HookAutoComplete
          {...registerState("past_less_than")}
          textFieldProps={{
            label: "Less than",
            size: "small",
          }}
          autocompleteProps={{
            isOptionEqualToValue: (option: any, value: any) =>
              option?.value === value?.value,
            size: "small",
            disablePortal: true,
            options: period2,
            sx: { backgroundColor: "white" },
            disabled: past_company_value.length === 0,
          }}
        />
      </Grid>

      {/* EXCLUDE */}
      <Grid item xs={12} sx={{ display: "flex", alignItems: "center" }}>
        <Typography color={"grey"}>Exclude</Typography>
        <Box sx={companySeperatorStyle}></Box>
      </Grid>
      <Grid item xs={12} md={8}>
        <TextfieldAsyncSearchHook
          registerStatename="exclude_company"
          options={companiesOptions.exclude}
          searchFunction={(inputValue: string) => getCompanies(inputValue)}
          setOptions={(state: any) =>
            setCompaniesOptions((prev: companyFieldsOptions) => ({
              ...prev,
              exclude: state,
            }))
          }
          label="Company"
          multi={true}
          isRequired={false}
          disableCloseOnSelect={true}
        />
      </Grid>

      {/* Exclude Period 3 */}
      <Grid item xs={12} md={4} sx={inputRow}>
        <HookAutoComplete
          {...registerState("exclude_period_3")}
          textFieldProps={{
            label: "Has Worked",
            size: "small",
          }}
          autocompleteProps={{
            isOptionEqualToValue: (option: any, value: any) =>
              option?.value === value?.value,
            size: "small",
            disablePortal: true,
            options: period3,
            sx: { backgroundColor: "white" },
            disabled: exclude_company_value.length === 0,
          }}
        />
      </Grid>
    </>
  );
};

export default CompanyFilters;
