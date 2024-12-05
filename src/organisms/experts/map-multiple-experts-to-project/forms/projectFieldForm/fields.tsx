import TextfieldAsyncSearchHook from "../../../../../molecules/textfield-async-search/textfieldAsyncSearchHook";
import { searchProjectOrExpert } from "../../../../expert-form/helper";
import styles from "../../../../expert-form/add-expert.module.scss";
import Chip from "@mui/material/Chip";
import Button from "@mui/material/Button";
import { useContext, useEffect, useState } from "react";
import { MapMultipleProjectContext, getAdminProjects } from "../../helper";
import Box from "@mui/material/Box";
import { ProjectSelected } from "../../types";
import BasicAutocomplete from "../../../../../molecules/autocompletes/basic-autocomplete";
import { isAdmin, isClient } from "../../../../../utils/role";
import { useFetch } from "../../../../../utils/hooks/useFetch";
import { formatOpenProjectToLV, formatToLVProjectClient } from "../../../../../common/formatData";
import { APIRoutes } from "../../../../../constants";
import { projectApiDataItem } from "../../../../../pages/Projects/types";
import { HookAutoComplete } from "../../../../../atoms/form-fields/SLFieldAutoComplete";
import { useHookFormContext } from "../../../../../utils/hooks/useHookFormContext";

const Fields = () => {
  const context = useContext(MapMultipleProjectContext);

  /* Fetching Client Project Options  */
  const client_id = localStorage.getItem("id");
  const { formattedData: clientProjectOptions } = useFetch<any, { value: number, label: string }[]>(`${APIRoutes.projects}?client_id=${client_id}`, {
    variables: [isClient()],
    formatter: formatToLVProjectClient<{ id: number, external_topic: string }>
  });

  /* Fetching Workspace Projects => [For Admin and SuperAdmin] */
  const {
    formattedData: workspaceProjects, loading: projectLoading
  } = useFetch<projectApiDataItem[], { label: string, value: number, client_name: string }[]>(APIRoutes.projectWorkspace, {
    formatter: formatOpenProjectToLV,
    variables: [!isClient()]
  })

  /* Fetching Projects for Admins in which he is either AM or RA or Group Admin */
  const [adminProjects, setAdminProjects] = useState<ProjectSelected[] | null>(null);

  const { projectOptions, setProjectOptions, setProjectSelected } = context;
  const { registerState, setValue } = useHookFormContext();

  // If there only one project in the workspace, it will be selected automatically
  if (workspaceProjects?.length === 1) {
    setValue("project", workspaceProjects[0]);
    setProjectSelected && setProjectSelected(workspaceProjects[0]);
  }

  useEffect(() => {
    if (Array.isArray(workspaceProjects) && !workspaceProjects?.length) {
      !projectLoading && getAdminProjects(setAdminProjects, setValue, "project")
    }


    // selecting the value if only one value is there
    if (workspaceProjects?.length === 1) {
      setValue("mapped_project", workspaceProjects[0]);
    }
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [workspaceProjects?.length, projectLoading])

  return (
    <Box m={"15px 0"}>
      {isClient() ?
        <BasicAutocomplete
          label="Choose a Project *"
          registerName="project"
          isRequired
          options={clientProjectOptions || []}
          isValueNeeded
          getValue={(value) => {
            setProjectSelected && setProjectSelected(value);
          }}
        /> :
        <>
          {
            workspaceProjects?.length ?
              // workspace Projects
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
                  options: workspaceProjects || [],
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
                  onChange: async (event, newValue: any) => {
                    setProjectSelected && setProjectSelected(newValue);
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
                    },
                    onChange: async (event, newValue: any) => {
                      setProjectSelected && setProjectSelected(newValue);
                    },
                  }}
                />
                :
                // If no workspace projects , then showing every project to the superadmin that are open
                <TextfieldAsyncSearchHook
                  registerStatename="project"
                  options={projectOptions}
                  searchFunction={(inputValue: string) =>
                    searchProjectOrExpert(inputValue, "project")
                  }
                  setOptions={(state: any) =>
                    setProjectOptions && setProjectOptions(state)
                  }
                  isValueNeeded={true}
                  getValue={(Input: ProjectSelected) => {
                    setProjectSelected && setProjectSelected(Input);
                  }}
                  label="Choose a Project"
                  disablePortal={false}
                  renderOption={(props: any, option: any) => {
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
                  }}
                />
          }
        </>
      }
    </Box>
  );
};

export default Fields;
