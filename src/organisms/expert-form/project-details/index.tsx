import { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import {
    commonInputStyles,
    searchProjectOrExpert,
} from "../helper";
import { HookTextField } from "../../../atoms/form-fields/SLFieldTextField";
import styles from "../add-expert.module.scss";
import { HookAutoComplete } from "../../../atoms/form-fields/SLFieldAutoComplete";
import { Button, Chip } from "@mui/material";
import TextfieldAsyncSearchHook from "../../../molecules/textfield-async-search/textfieldAsyncSearchHook";
import { isAdmin, isSuperAdmin } from "../../../utils/role";
import { projectApiDataItem } from "../../../pages/Projects/types";
import { formatOpenProjectToLV } from "../../../common/formatData";
import { APIRoutes } from "../../../constants";
import { ProjectSelected } from "../../experts/map-multiple-experts-to-project/types";
import { useFetch } from "../../../utils/hooks/useFetch";
import { getAdminProjects } from "../../experts/map-multiple-experts-to-project/helper";
import { useHookFormContext } from "../../../utils/hooks/useHookFormContext";
import { BoxFlex } from "../../../atoms/boxSpaceBtw";
import { LocalDayjs } from "../../../utils/timezoneService";

type Props = {
    isMapped: boolean;
    isEdit: boolean;
}

const ProjectDetails = ({ isMapped, isEdit }: Props) => {
    const { registerState, setValue, getValues } = useHookFormContext();

    const allowAdminMap = ((LocalDayjs()).diff((getValues('updated_at')), 'days')) > 30; //true if its not updated in last 30 days



    // This is used to deselect any project that is wrongly showing selected in UI when Add Expert Form Load 
    // - This is a temporary solution of the bug
    // DATED - 22 March 2024
    // TODO: find another way to fix the issue
    useEffect(() => {
        (!isEdit && !isMapped) && setValue("mapped_project", null);
    }, []);

    // PROJECT --------------------------------------------------------------------- // 

    // used only for superAdmin Async search word by word
    const [projectOptions, setProjectOptions] = useState<any>([]);

    const {
        formattedData: projectData, loading: projectLoading
    } = useFetch<projectApiDataItem[], { label: string, value: number, client_name: string }[]>(
        APIRoutes.projectWorkspace, { formatter(data) {
            const final_data = data.map(r => ({...r, topic: `ID: ${r.id}, Topic: ${r.topic}`}));
            return formatOpenProjectToLV(final_data);
        }, }
    )

    /* Fetching Projects for Admins in which he is either AM or RA or Group Admin */
    const [adminProjects, setAdminProjects] = useState<ProjectSelected[] | null>(null);

    useEffect(() => {
        // If the workspace projects are 0, then fetching all the projects in which admin is either Group, AM or RA
        if (Array.isArray(projectData) && !projectLoading) {
            if (isAdmin() && !projectData?.length) {
                getAdminProjects(setAdminProjects, setValue);
            }

            // selecting the value if only one value is there and isMapped is null
            if (projectData.length === 1 && !(Boolean(getValues('mapped_project')))) {
                setValue("mapped_project", projectData[0]);
            }
        }
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [projectData?.length, projectLoading])

    // ----------------------------------------------------------------------------- //

    const allowMap = (isMapped) || (((isEdit && !isSuperAdmin()) &&  !allowAdminMap))

    return (
        <>
            <Grid item xs={12} sm={6} className={styles.inputRow}>
                <HookTextField
                    {...registerState("source_link")}
                    rules={{
                        required: { value: true, message: "This field is required" },
                    }}
                    textFieldProps={{
                        ...commonInputStyles,
                        label: "Enter Source Link",
                        required: true,
                    }}
                />
            </Grid>
            {!projectLoading &&
                <Grid item xs={12} className={styles.inputRow}>
                    {projectData?.length ?
                        <HookAutoComplete
                            {...registerState("mapped_project")}
                            textFieldProps={{
                                label: allowMap  ? "Mapped Project (read only)" : "Mapped Project *",
                                size: "small",
                            }}
                            rules={{
                                required: { value: true, message: "This field is required" },
                            }}
                            autocompleteProps={{
                                isOptionEqualToValue: (option: any, value: any) =>
                                    option.value === value.value,
                                size: "small",
                                options: projectData || [],
                                style: { backgroundColor: "white" },
                                loading: projectLoading,
                                disabled: allowMap  ,
                                renderOption: (props: any, option: any) => {
                                    return (
                                        <li {...props} key={option.value}>
                                            <Button className={styles.projectsOptions}>
                                                    <Chip
                                                        className={`${styles.projectsChipProject} ${styles.projectsChip}`}
                                                        label={option?.label}
                                                        sx={{flex: 2}}
                                                    />
                                                    <Chip
                                                        className={`${styles.projectsChipProject} ${styles.projectsChip}`}
                                                        label={option?.client_name}
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
                                {...registerState("mapped_project")}
                                textFieldProps={{
                                    label: allowMap ? "Mapped Project (read only)" : "Mapped Project *",
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
                                    disabled: allowMap,
                                    renderOption: (props: any, option: any) => {
                                        return (
                                            <li {...props} key={option.value}>
                                                <Button className={styles.projectsOptions}>
                                                    <Chip
                                                        className={`${styles.projectsChipProject} ${styles.projectsChip}`}
                                                        label={option?.label}
                                                        sx={{ flex: 2 }}
                                                    />
                                                    <Chip
                                                        className={`${styles.projectsChipProject} ${styles.projectsChip}`}
                                                        label={option?.client_name}
                                                    />
                                                </Button>
                                            </li>
                                        );
                                    }
                                }}
                            /> :
                            <TextfieldAsyncSearchHook
                                registerStatename="mapped_project"
                                options={projectOptions}
                                inputLength={1}
                                searchFunction={(inputValue: string) =>
                                    searchProjectOrExpert(inputValue, "project")
                                }
                                setOptions={(state: any) => setProjectOptions(state)}
                                label={allowMap ? "Mapped Project (read only)" : "Mapped Project *"}
                                disabled={allowMap}
                                renderOption={(props: any, option: any) => {
                                    return (
                                        <li {...props} key={option.value}>
                                            <Button className={styles.projectsOptions}>
                                                <Chip
                                                    className={`${styles.projectsChipProject} ${styles.projectsChip}`}
                                                    label={option?.label}
                                                    sx={{ flex: 2 }}
                                                />
                                                <Chip
                                                    className={`${styles.projectsChipProject} ${styles.projectsChip}`}
                                                    label={option?.client_name}
                                                />
                                            </Button>
                                        </li>
                                    );
                                }}
                            />
                    }
                </Grid>
            }
        </>
    )
}

export default ProjectDetails