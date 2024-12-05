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

type fieldProps = {
  handleClose: () => void;
};

const Fields = ({ handleClose }: fieldProps) => {
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
      <Grid item xs={12} sx={inputRow}>
        <TextfieldAsyncSearchHook
          registerStatename="experts"
          options={formValues || []}
          setOptions={(state: any) => setFormValues(state)}
          searchFunction={(inputValue: string) =>
            searchProjectOrExpert(inputValue, "expert", "Confirmed")
          }
          disablePortal={false}
          isRequired
          multi={true}
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
