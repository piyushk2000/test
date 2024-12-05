import { FC, useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import {
  CurrentCompany,
  RelevantCompany,
  commonInputStyles,
} from "../helper";
import { HookTextField } from "../../../atoms/form-fields/SLFieldTextField";
import { useHookFormContext } from "../../../utils/hooks/useHookFormContext";
import styles from "../add-expert.module.scss";
import { HookAutoComplete } from "../../../atoms/form-fields/SLFieldAutoComplete";
import Checkbox from "@mui/material/Checkbox";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import BasicAutocomplete from "../../../molecules/autocompletes/basic-autocomplete";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

interface ProfessionalDetailsProps {
  geographiesList: any[];
  isMapped: boolean;
  isEdit: boolean;
  workExperienceList?: any[];
}

const ProfessionalDetails: FC<ProfessionalDetailsProps> = ({
  geographiesList,
  isMapped,
  isEdit,
  workExperienceList = [],
}) => {
  const { registerState, watch, setValue } =
    useHookFormContext();
  const [isReadOnly, setReadOnly] = useState<boolean>(false);
  const [isReadOnlyRelevant, setReadOnlyRelevant] = useState<boolean>(false);

  const [companyList, setCompanyList] = useState<{
    value: number | string;
    label: string;
  }[]>([]);
  const [current_company, relevant_company_name, relevant_designation, selected_current_company, selected_relevant_company] = watch([
    "current_company",
    "relevant_company_name",
    "relevant_designation",
    "selected_current_company",
    "selected_relevant_company",
  ]);

  useEffect(() => {
    if (!current_company) {
      setReadOnly(true);
      if (!relevant_company_name && !relevant_designation) {
        setReadOnlyRelevant(true);
      }
    } else if (current_company.value === "not_working") {
      setReadOnly(true);
      setValue("current_company_name", "NA");
      setValue("current_designation", "NA");
    } else if (current_company.value === "self_employed") {
      setReadOnly(true);
      setValue("current_company_name", "Self Employed");
      setValue("current_designation", "Freelancer");
    }
    if (workExperienceList?.length) {
      workExperienceList = workExperienceList.map((exp: any, index) => {
        return {
          ...exp,
          id: index + 1,
        }
      })
      setCompanyList(workExperienceList.map((exp: any) => {
        return {
          label: exp?.company + " | " + exp?.designation,
          value: exp?.id,
        }
      }));
      setValue("selected_current_company", null);
      setValue("selected_relevant_company", null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const subscription = watch((value, { name, type }) => {
      if (type === "change") {
        if (name === "current_company") {
          // reset all the fields whenever there is a change in current_company field
          setValue("current_company_name", "");
          setValue("current_designation", "");
          setValue("relevant_company", null);
          setValue("relevant_company_name", "");
          setValue("relevant_designation", "");
          setReadOnlyRelevant(true);

          if (value.current_company.value === "working") {
            // Finding if the "same as above" option exists or not
            let RelevantValueExists = RelevantCompany.find(
              (c) => c.value === "same"
            );

            // If "same as above" option not exist, we are putting at the 0 index
            if (!RelevantValueExists) {
              RelevantCompany.unshift({
                label: "Same as above",
                value: "same",
              });
            }

            // Setting the state to readonly to false and resetting the values of both current company and current designation fields
            setReadOnly(false);
            setValue("current_company_name", "");
            setValue("current_designation", "");
          } else if (value.current_company.value === "not_working") {
            // Finding "same a above" option Index
            let RelevantValueExistsIndex = RelevantCompany.findIndex(
              (c) => c.value === "same"
            );

            // If the Index is not -1 , we are deleting it
            if (RelevantValueExistsIndex !== -1) {
              RelevantCompany.splice(RelevantValueExistsIndex, 1);
            }

            // Setting the state to readonly to true and setting the values of both current company and current designation fields as "NA"
            setReadOnly(true);
            setValue("current_company_name", "NA");
            setValue("current_designation", "NA");
          } else if (value.current_company.value === "self_employed") {
            // Finding "same a above" option Index
            let RelevantValueExistsIndex = RelevantCompany.findIndex(
              (c) => c.value === "same"
            );

            // If "same as above" option not exist, we are putting at the 0 index
            if (RelevantValueExistsIndex === -1) {
              RelevantCompany.unshift({
                label: "Same as above",
                value: "same",
              });
            }

            // Setting the state to readonly to true and setting the values of both current company and current designation fields
            setReadOnly(true);
            setValue("current_company_name", "Self Employed");
            setValue("current_designation", "Freelancer");
          }
        }

        if (name === "relevant_company") {
          if (value.relevant_company.value === "same") {
            setReadOnlyRelevant(true);
            setValue("relevant_company_name", value.current_company_name);
            setValue("relevant_designation", value.current_designation);
          } else if (value.relevant_company.value === "different") {
            setReadOnlyRelevant(false);
            setValue("relevant_company_name", "");
            setValue("relevant_designation", "");
          }
        }

        if (name === "current_company_name" || name === "current_designation") {
          if (value.relevant_company.value === "same") {
            setReadOnlyRelevant(true);
            setValue("relevant_company_name", value.current_company_name);
            setValue("relevant_designation", value.current_designation);
          }
        }

        if (name === "selected_current_company") {
          const selectedCompanyId = value.selected_current_company?.value;
          if (selectedCompanyId) {
            const companyData: any = workExperienceList.find((exp: any) => exp.id === selectedCompanyId);
            setValue("current_company_name", companyData?.company);
            setValue("current_designation", companyData?.designation);
            if (value.relevant_company.value === "same") {
              setReadOnlyRelevant(true);
              setValue("relevant_company_name", companyData?.company);
              setValue("relevant_designation", companyData?.designation);
            }
          }
        }
        if (name === "selected_relevant_company") {
          const selectedCompanyId = value.selected_relevant_company?.value;
          if (selectedCompanyId) {
            const companyData: any = workExperienceList.find((exp: any) => exp.id === selectedCompanyId);
            setValue("relevant_company_name", companyData?.company);
            setValue("relevant_designation", companyData?.designation);
          }
        }
      }
    });
    return () => subscription.unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watch]);

  return (
    <>
      <Grid item xs={12} md={3 + (companyList?.length ? 0 : 1)} className={styles.inputRow}>
        <BasicAutocomplete
          label="Current Company*"
          registerName="current_company"
          isRequired
          options={CurrentCompany}
        />
      </Grid>

      {
        companyList?.length ?
          <Grid item xs={12} md={3 + (companyList?.length ? 0 : 1)} className={styles.inputRow}>
            <BasicAutocomplete
              label="Select Current Company"
              registerName="selected_current_company"
              isRequired={false}
              options={companyList}
              isDisabled={isReadOnly}
            />
          </Grid> : <></>
      }

      <Grid item xs={12} md={3 + (companyList?.length ? 0 : 1)} className={styles.inputRow}>
        <HookTextField
          {...registerState("current_company_name")}
          rules={{
            required: { value: true, message: "This field is required" },
          }}
          textFieldProps={{
            ...commonInputStyles,
            label: "Current Company Name",
            required: true,
            disabled: isReadOnly ? true : false,
          }}
        />
      </Grid>

      <Grid item xs={12} md={3 + (companyList?.length ? 0 : 1)} className={styles.inputRow}>
        <HookTextField
          {...registerState("current_designation")}
          rules={{
            required: { value: true, message: "This field is required" },
          }}
          textFieldProps={{
            ...commonInputStyles,
            label: "Current Designation",
            required: true,
            disabled: isReadOnly ? true : false,
          }}
        />
      </Grid>

      <Grid item xs={12} md={3 + (companyList?.length ? 0 : 1)} className={styles.inputRow}>
        <BasicAutocomplete
          label="Relevant Company*"
          registerName="relevant_company"
          isRequired
          options={RelevantCompany}
          />
      </Grid>

      {companyList?.length ? 
      <Grid item xs={12} md={3 + (companyList?.length ? 0 : 1)} className={styles.inputRow}>
        <BasicAutocomplete
          label="Select Relevant Company"
          registerName="selected_relevant_company"
          isRequired={false}
          options={companyList}
          isDisabled={isReadOnlyRelevant}
        />
      </Grid>
      : <></>}

      <Grid item xs={12} md={3 + (companyList?.length ? 0 : 1)} className={styles.inputRow}>
        <HookTextField
          {...registerState("relevant_company_name")}
          rules={{
            required: { value: true, message: "This field is required" },
          }}
          textFieldProps={{
            ...commonInputStyles,
            label: "Relevant Company Name",
            required: true,
            disabled: isReadOnlyRelevant ? true : false,
          }}
        />
      </Grid>

      <Grid item xs={12} md={3 + (companyList?.length ? 0 : 1)} className={styles.inputRow}>
        <HookTextField
          {...registerState("relevant_designation")}
          rules={{
            required: { value: true, message: "This field is required" },
          }}
          textFieldProps={{
            ...commonInputStyles,
            label: "Relevant Designation",
            required: true,
            disabled: isReadOnlyRelevant ? true : false,
          }}
        />
      </Grid>

      <Grid className={styles.inputRow} item xs={12}>
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
    </>
  );
};

export default ProfessionalDetails;
