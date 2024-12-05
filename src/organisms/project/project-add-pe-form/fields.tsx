import Grid from "@mui/material/Grid";
import CustomBtnFilled from "../../../atoms/form-molecules/CustomBtnFilled";
import { inputRow, submitbtnRow } from "./style";
import { HookAutoComplete } from "../../../atoms/form-fields/SLFieldAutoComplete";
import { useHookFormContext } from "../../../utils/hooks/useHookFormContext";
import { useContext, useEffect, useState } from "react";
import { AddPEFormContext, formValues, getRelevantValues, relevant_state } from "./helper";
import TextfieldAsyncSearchHook from "../../../molecules/textfield-async-search/textfieldAsyncSearchHook";
import { searchProjectOrExpert } from "../../expert-form/helper";
import Chip from "@mui/material/Chip";
import Button from "@mui/material/Button";
import styles from "../../expert-form/add-expert.module.scss";
import { isAdmin, isClient } from "../../../utils/role";
import BasicAutocomplete from "../../../molecules/autocompletes/basic-autocomplete";
import { useFetch } from "../../../utils/hooks/useFetch";
import { APIRoutes } from "../../../constants";
import { formatOpenProjectToLV, formatToLVProjectClient } from "../../../common/formatData";
import { projectApiDataItem } from "../../../pages/Projects/types";
import { getAdminProjects } from "../../experts/map-multiple-experts-to-project/helper";
import { ProjectSelected } from "../../experts/map-multiple-experts-to-project/types";
import { FormControl } from "@mui/base";
import { RadioGroup, FormControlLabel, Radio } from "@mui/material";

type fieldProps = {
  handleClose: () => void;
  valueRadio: string;
  setValueRadio: any;
};

const Fields = ({ handleClose, valueRadio, setValueRadio }: fieldProps) => {
  const { registerState, watch, setValue } = useHookFormContext();


  const client_id = localStorage.getItem("id"); // use only to get clients project if client if logged in
  const { isProjectField, handleChangeForm } =
    useContext(AddPEFormContext);

  const { formattedData: clientProjects } = useFetch<any, { value: number, label: string }[]>(`${APIRoutes.projects}?client_id=${client_id}`, {
    variables: [isClient(), isProjectField],
    formatter: formatToLVProjectClient<{ id: number, external_topic: string }>
  });
  const {
    formattedData: projectData, loading: projectLoading
  } = useFetch<projectApiDataItem[], { label: string, value: number, client_name: string }[]>(APIRoutes.projectWorkspace, { formatter: formatOpenProjectToLV, variables: [isProjectField] })

  const [relevant, setRelevant] = useState<relevant_state>({
    options: null,
    loading: false,
  });

  const [projectOptions, setProjectOptions] = useState<any>(null);
  /* Fetching Projects for Admins in which he is either AM or RA or Group Admin */
  const [adminProjects, setAdminProjects] = useState<ProjectSelected[] | null>(null);
  const [formValues, setFormValues] = useState<formValues | null>(null);

  const expert_value = watch("expert");

  useEffect(() => {
    const subscription = watch((value, { name, type }) => {
      if (type === "change") {
        handleChangeForm();

        if (name === "expert") {
          setValue("relevant_company", "");
        }
      }
    });

    return () => subscription.unsubscribe();
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watch]);

  useEffect(() => {
    if (expert_value) {
      getRelevantValues(expert_value.value, setRelevant);
    }
  }, [expert_value]);

  useEffect(() => {
    if (Array.isArray(projectData) && !projectData?.length && isProjectField && isAdmin()) {
      !projectLoading && getAdminProjects(setAdminProjects, setValue, "project");
    }

    // If the Workspace projectData only had one option in the dropdown menu, It will be selected automatically
    if (projectData?.length === 1) {
      setValue("project", projectData[0])
    }
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectData?.length, projectLoading])


  return (
    <Grid container spacing={2} mt={"5px"}>
      {/* Expert */}
      <Grid item xs={12}>
        <FormControl>
          <RadioGroup
            row
            aria-labelledby="demo-controlled-radio-buttons-group"
            name="controlled-radio-buttons-group"
            value={valueRadio}
            onChange={setValueRadio}
          >
            <FormControlLabel value="single" control={<Radio />} label="Single" />
            <FormControlLabel value="multiple" control={<Radio />} label="Multiple" />
          </RadioGroup>
        </FormControl>

      </Grid>
      <Grid item xs={12} sx={inputRow}>
        <TextfieldAsyncSearchHook
          registerStatename="expert"
          options={formValues || []}
          setOptions={(state: any) => setFormValues(state)}
          searchFunction={(inputValue: string) =>
            searchProjectOrExpert(inputValue, "expert", "Confirmed",true)
          }
          disablePortal={false}
          isRequired
          disabled={isProjectField}
          label={isProjectField ? "Expert (read only)" : "Expert *"}
          renderOption={(props: any, option: any) => {
            return (
              <li {...props} key={option.value}>
                <Button variant="text" className={styles.projectsOptions}>
                  <Chip
                    className={styles.projectsChip}
                    label={`ID:${option?.value}`}
                  />
                  <Chip
                    className={styles.projectsChip}
                    label={option?.label}
                  />
                </Button>
              </li>
            );
          }}
        />
      </Grid>

      {/* Relevant Company */}
      {expert_value && (
        <Grid item xs={12} sx={inputRow}>
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
              disablePortal: false,
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
      )}

      {/* Project */}
      {isProjectField && (
        <Grid item xs={12} sx={inputRow}>
          {isClient() ?
            <BasicAutocomplete
              label="Choose a Project *"
              registerName="project"
              isRequired
              options={clientProjects || []}
            /> :
            <>
              {projectData?.length ?
                <HookAutoComplete
                  {...registerState("project")}
                  textFieldProps={{
                    label: "Choose a Project *",
                    size: "small",
                  }}
                  rules={{
                    required: { value: true, message: "This field is required" },
                  }}
                  autocompleteProps={{
                    size: "small",
                    disablePortal: false,
                    options: projectData || [],
                    style: { backgroundColor: "white" },
                    loading: projectLoading,
                    renderOption: (props: any, option: any) => {
                      return (
                        <li {...props} key={option.value}>
                          <Button className={styles.projectsOptions}>
                            <Chip
                              className={styles.projectsChip}
                              label={`ID:${option?.value}`}
                            />
                            <Chip
                              className={styles.projectsChip}
                              label={option?.client_name}
                            />
                            <Chip
                              className={`${styles.projectsChipProject} ${styles.projectsChip}`}
                              label={option?.label}
                            />
                          </Button>
                        </li>
                      );
                    },
                  }}
                /> :
                isAdmin() ?
                  // showing admin all the projects in which he is either AM or RA or one of the Admin of the group which is mapped with the project
                  <HookAutoComplete
                    {...registerState("project")}
                    textFieldProps={{
                      label: "Choose a Project *",
                      size: "small",
                    }}
                    rules={{
                      required: { value: true, message: "This field is required" },
                    }}
                    autocompleteProps={{
                      size: "small",
                      disablePortal: false,
                      options: adminProjects || [],
                      style: { backgroundColor: "white" },
                      loading: !!adminProjects,
                      renderOption: (props: any, option: any) => {
                        return (
                          <li {...props} key={option.value}>
                            <Button className={styles.projectsOptions}>
                              <Chip
                                className={styles.projectsChip}
                                label={`ID:${option?.value}`}
                              />
                              <Chip
                                className={styles.projectsChip}
                                label={option?.client_name}
                              />
                              <Chip
                                className={`${styles.projectsChipProject} ${styles.projectsChip}`}
                                label={option?.label}
                              />
                            </Button>
                          </li>
                        );
                      }
                    }}
                  /> :
                  <TextfieldAsyncSearchHook
                    registerStatename="project"
                    options={projectOptions}
                    searchFunction={(inputValue: string) =>
                      searchProjectOrExpert(inputValue, "project")
                    }
                    disablePortal={false}
                    setOptions={(state: any) => setProjectOptions(state)}
                    label="Choose a Project *"
                    isRequired={true}
                    renderOption={(props: any, option: any) => {
                      return (
                        <li {...props} key={option.value}>
                          <Button variant="text" className={styles.projectsOptions}>
                            <Chip
                              className={styles.projectsChip}
                              label={`ID:${option?.value}`}
                            />
                            <Chip
                              className={styles.projectsChip}
                              label={option?.client_name}
                            />
                            <Chip
                              className={`${styles.projectsChipProject} ${styles.projectsChip}`}
                              label={option?.label}
                            />
                          </Button>
                        </li>
                      );
                    }}
                  />
              }
            </>
          }
        </Grid>
      )}

      <Grid sx={{ ...inputRow, ...submitbtnRow }} item xs={12}>
        <CustomBtnFilled
          label="cancel"
          variant="outlined"
          onClick={handleClose}
        />
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
