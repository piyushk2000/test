import {  Grid, Typography } from "@mui/material";
import {
  actionRowStyles,
  commonInputStyles,
  pricePerHourStyle,
} from "../styles";
import { useHookFormContext } from "../../../utils/hooks/useHookFormContext";
import { HookTextField } from "../../../atoms/form-fields/SLFieldTextField";
import DomainDetails from "./domain-details";
import { HookAutoComplete } from "../../../atoms/form-fields/SLFieldAutoComplete";
import CustomBtnFilled from "../../../atoms/form-molecules/CustomBtnFilled";
import { useEffect } from "react";
import { price_per_hour_currency_values } from "../../../utils/currencies";
import { isExpert } from "../../../utils/role";
import { useBoolean } from "../../../utils/hooks/useBoolean";
import BasicAutocomplete from "../../../molecules/autocompletes/basic-autocomplete";
import { isAdmin } from "../../../utils/role";
import { useGeoFetch } from "../../../utils/hooks/useGeoFetch";
import Checkbox from "@mui/material/Checkbox";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;


const BasicDetailFields = (props: any) => {
  const { setFormChange } = props;
  const { registerState, watch, setValue } = useHookFormContext();
  const { onlyCountryList: countryGeoList, allGeoList: geographiesList } = useGeoFetch();
  const { value: isFormChange, setTrue: setFormChangeTrue } = useBoolean();
  const headline = watch("headline");

  useEffect(() => {
    const subscription = watch((value, { name, type }) => {
      if (type === "change") {
        setFormChangeTrue();
        if (name === "price_per_hour") {
          const price =
            value.price_per_hour.length > 1
              ? Math.round(value.price_per_hour)
              : value.price_per_hour;
          setValue("price_per_hour", price);
        }

        setFormChange((prevFormChangeValues: any) => {
          if (prevFormChangeValues.basicDetails === false) {
            return {
              ...prevFormChangeValues,
              basicDetails: true,
            };
          }

          return prevFormChangeValues;
        });
      }
    });

    return () => subscription.unsubscribe();
    // eslint-disable-next-line
  }, [watch]);

  return (
    <Grid container spacing={{ xs: 2, sm: 3 }}>
      {/* Headline */}
      <Grid item xs={12} sx={{ position: "relative" }}>
        <HookTextField
          {...registerState("headline")}
          rules={{
            required: { value: true, message: "This field is required" },
            maxLength: {
              value: 150,
              message: "Headline must be less than 150 Characters",
            },
            minLength: {
              value: isAdmin() ? 50 : 0,
              message: "Headline should be minimum 50 characters"
            }
          }}
          textFieldProps={{
            ...commonInputStyles,
            label: "Headline *",
            padding: "1rem"
          }}
        />
        <p style={{
          fontSize: "10px", color: "rgba(0,0,0,0.5)", position: "absolute", bottom: "0",
          right: "4px"
        }}>
          {headline?.length || 0}/150
        </p>
      </Grid>
      {/* Cost Price */}
      <Grid item xs={6} lg={2}>
        <BasicAutocomplete
          label="Currency *"
          registerName="price_per_hour_currency"
          isRequired
          options={price_per_hour_currency_values}
        />
      </Grid>
      <Grid container item xs={6} lg={10} spacing={2}>
        <Grid item xs={8} lg={2.5}>
          <HookTextField
            {...registerState("price_per_hour")}
            rules={{
              required: { value: true, message: "This field is required" },
            }}
            textFieldProps={{
              ...commonInputStyles,
              label: "Price *",
              type: "number",
            }}
          />
        </Grid>
        <Grid item xs={4} lg={9.5} sx={pricePerHourStyle}>
          <Typography>/ hr</Typography>
        </Grid>
      </Grid>

      {/* Domains */}
      {!isExpert() && <DomainDetails />}

      {/* Other Domains */}
      <Grid item xs={12}>
        <HookAutoComplete
          {...registerState("domain_other")}
          textFieldProps={{ label: "Other Domains", size: "small" }}
          autocompleteProps={{
            multiple: true,
            freeSolo: true,
            options: [],
            size: "small",
            style: { backgroundColor: "white" },
          }}
        />
      </Grid>

      {/* Functions */}
      <Grid item xs={12}>
        <HookAutoComplete
          {...registerState("functions")}
          textFieldProps={{ label: "Functions", size: "small" }}
          autocompleteProps={{
            multiple: true,
            freeSolo: true,
            options: [],
            size: "small",
            style: { backgroundColor: "white" },
          }}
        />
      </Grid>

      <Grid item xs={6}>
        <HookAutoComplete
          {...registerState("current_base_location")}
          textFieldProps={{
            label: "Current Base Location",
            size: "small",
            required: true,
          }}
          rules={{
            required: { value: true, message: "This field is required" },
          }}
          autocompleteProps={{
            isOptionEqualToValue: (option: any, value: any) =>
              option.value === value.value,
            size: "small",
            disablePortal: true,
            options: countryGeoList || [],
            style: { backgroundColor: "white" },
          }}
        />
      </Grid>

      <Grid item xs={6}>
        <HookAutoComplete
          {...registerState("expert_geographies")}
          textFieldProps={{
            label: "Expertise Geography*",
            size: "small",
          }}
          rules={{
            required: { value: true, message: "This field is required" },
          }}
          autocompleteProps={{
            isOptionEqualToValue: (option: any, value: any) =>
              option.value === value.value,
            size: "small",
            disablePortal: true,
            options: geographiesList || [],
            multiple: true,
            disableCloseOnSelect: true,
            style: { backgroundColor: "white" },
            renderOption: (props, option: any, { selected }) => {
              return (
                <li {...props} key={option.value}>
                  <Checkbox
                    icon={icon}
                    checkedIcon={checkedIcon}
                    style={{ marginRight: 8 ,color: "var(--primary-color)"}}
                    checked={selected}
                  />
                  {option?.label}
                </li>
              );
            },
          }}
        />
      </Grid>

      {/* ACTION BUTTONS */}
      {isFormChange &&
        <Grid sx={actionRowStyles} item xs={12}>
          <CustomBtnFilled
            label="submit"
            variant="contained"
            buttonType="submit"
          />
        </Grid>}
    </Grid>
  );
};

export default BasicDetailFields;
