import styles from "./../add-project.module.scss";
import { Grid, Checkbox, IconButton } from "@mui/material";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import HookDatePicker from "../../../atoms/form-fields/SLFieldDatePicker";
import { HookTextField } from "../../../atoms/form-fields/SLFieldTextField";
import { HookAutoComplete } from "../../../atoms/form-fields/SLFieldAutoComplete";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import { useHookFormContext } from "../../../utils/hooks/useHookFormContext";
import { commonInputStyles, groupFormatter, priorities } from "../helper";
import { useOptionsFetch } from "../../../utils/hooks/useOptionsFetch";
import { APIRoutes } from "../../../constants";
import CloseIcon from "@mui/icons-material/Close";
import { useFetch } from "../../../utils/hooks/useFetch";
import { useEffect } from "react";
import { useGeoFetch } from "../../../utils/hooks/useGeoFetch";
import HookDateTimePicker from "../../../atoms/form-fields/SLFieldDateTimePicker";
import { isSuperAdmin, getUserId } from "../../../utils/role";
import { SpecialAccessToProjects } from "../../../utils/specialAccess";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const ProjectDetails = () => {
  const { registerState, watch, setValue } = useHookFormContext();
  const { onlyCountryList: clientGeoList, allGeoList: expertGeoList } = useGeoFetch();
  const { apiData: userList } = useOptionsFetch(APIRoutes.adminUsers + "&is_active=1"); //is_active is added to get active users

  const {
    formattedData: groupList,
    loading: groupLoading,
  } = useFetch<any, { label: string, value: string }[]>(APIRoutes.masters + "?type=Group", {
    formatter: groupFormatter
  });

  const target_date_value = watch("target_date");
  const fk_group = watch("fk_group");

  const handleCloseBtnClick = () => {
    setValue("target_date", null);
  };


  useEffect(() => {
    if (typeof fk_group === "number" && groupList && groupList.length > 0) {
      if (groupList.find((item: any) => item.value === fk_group)) {
        setValue("fk_group", groupList.find((item: any) => item.value === fk_group))
      }
    }

    //eslint-disable-next-line
  }, [groupLoading, fk_group])

  return (
    <>
      <Grid className={styles.inputRow} item xs={6}>
        <HookAutoComplete
          {...registerState("case_code")}
          textFieldProps={{ label: "Case Code", size: "small" }}
          rules={{
            minLength: {
              value: 4,
              message: "Case Code should be between 4-200 characters",
            },
            maxLength: {
              value: 200,
              message: "Case Code should be between 4-200 characters",
            },
          }}
          autocompleteProps={{
            multiple: true,
            freeSolo: true,
            options: [],
            size: "small",
            style: { backgroundColor: "white" },
          }}
        />
      </Grid>
      <Grid className={styles.inputRow} item xs={6}>
        <HookAutoComplete
          {...registerState("fk_group")}
          textFieldProps={{
            label: "Group *",
            size: "small",
          }}
          rules={{
            required: { value: true, message: "This field is required" },
          }}
          autocompleteProps={{
            isOptionEqualToValue: (option, value) =>
              option.value === value.value,
            size: "small",
            options: (groupList ? groupList : []),
            style: { backgroundColor: "white" }
          }}
        />
      </Grid>

      <Grid className={styles.inputRow} item xs={12} sm={6}>
        <HookTextField
          {...registerState("no_of_calls")}
          rules={{
            min: { value: 0, message: "Value should be between 0 to 1000" },
            max: { value: 1000, message: "Value should be between 0 to 1000" },
          }}
          textFieldProps={{
            ...commonInputStyles,
            label: "Number of Calls",
            type: "number",
          }}
        />

      </Grid>

      <Grid className={styles.inputRow} item xs={12} sm={6}>
        <HookAutoComplete
          {...registerState("priority")}
          textFieldProps={{
            label: "Priority",
            size: "small",
          }}
          autocompleteProps={{
            isOptionEqualToValue: (option: any, value: any) =>
              option.value === value.value,
            size: "small",
            disablePortal: true,
            options: priorities,
            style: { backgroundColor: "white" },
          }}
        />
      </Grid>

      <Grid
        className={`${styles.inputRow} ${styles.targetDate}`}
        item
        xs={12}
        sm={6}
      >
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <HookDatePicker
            {...registerState("target_date")}
            datePickerProps={{
              className: "date-picker",
              label: "Target Date",
              format: "DD/MM/YYYY",
              slotProps: { textField: { size: "small", fullWidth: true } },
            }}
          />
          {target_date_value && (
            <IconButton
              className={styles.closeBtn}
              onClick={handleCloseBtnClick}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          )}
        </LocalizationProvider>
      </Grid>
      <Grid className={styles.inputRow} item xs={12} sm={6}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <HookDateTimePicker
            {...registerState("receiving_date")}
            rules={{
              required: { value: true, message: "This field is required" },
            }}
            dateTimePickerProps={{
              className: "date-time-picker",
              label: "Receiving Date",
              format: "DD/MM/YYYY hh:mm A",
              slotProps: {
                textField: { required: true, size: "small", fullWidth: true },
              },
            }}
          />
        </LocalizationProvider>
      </Grid>

      <Grid className={styles.inputRow} item xs={12} md={6}>
        <HookAutoComplete
          {...registerState("client_geography")}
          textFieldProps={{
            label: "Client Geography",
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
            disablePortal: true,
            options: clientGeoList || [],
            filterOptions: (options, { inputValue }) => {
              const inputValueLowercased: string = inputValue.toLowerCase();
              return options.filter((option) =>
                option?.label.toLowerCase().includes(inputValueLowercased)
              );
            },
            style: { backgroundColor: "white" },
          }}
        />
      </Grid>

      <Grid className={styles.inputRow} item xs={12} md={6}>
        <HookAutoComplete
          {...registerState("expert_geographies")}
          textFieldProps={{
            label: "Expert Geography*",
            size: "small",
          }}
          rules={{
            required: { value: true, message: "This field is required" },
          }}
          autocompleteProps={{
            isOptionEqualToValue: (option, value) =>
              option.value === value.value,
            size: "small",
            disablePortal: true,
            options: expertGeoList || [],
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

      <Grid className={styles.inputRow} item xs={12} md={6}>
        <HookAutoComplete
          {...registerState("account_manager")}
          textFieldProps={{
            label: "Account Manager *",
            size: "small",
            InputProps: {
              readOnly: !(isSuperAdmin() || SpecialAccessToProjects(parseInt(getUserId() || "0"))),
            },
            disabled: !(isSuperAdmin() || SpecialAccessToProjects(parseInt(getUserId() || "0"))),
          }}
          rules={{
            required: { value: true, message: "This field is required" },
          }}
          autocompleteProps={{
            isOptionEqualToValue: (option: any, value: any) =>
              option?.value === value?.value,
            size: "small",
            disablePortal: true,
            options: userList || [],
            style: { ...commonInputStyles, backgroundColor: "white" },
            renderOption: (props: any, option: any) => {
              return (
                <li {...props} key={option.value}>
                  {option.label}
                </li>
              );
            },
            disabled: !(isSuperAdmin() || SpecialAccessToProjects(parseInt(getUserId() || "0"))),
          }}
        />
      </Grid>

      <Grid className={styles.inputRow} item xs={12} md={6}>
        <HookAutoComplete
          {...registerState("research_analysts")}
          rules={{
            required: { value: true, message: "This field is required" },
          }}
          textFieldProps={{
            label: "Research Analyst*",
            size: "small",
          }}
          autocompleteProps={{
            isOptionEqualToValue: (option, value) =>
              option.value === value.value,
            size: "small",
            disablePortal: true,
            options: userList,
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
    </>
  );
};

export default ProjectDetails;
