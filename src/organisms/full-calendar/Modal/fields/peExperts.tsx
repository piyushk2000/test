import Grid from "@mui/material/Grid";
import styles from "../../../../common/inputs.module.scss";
import { HookAutoComplete } from "../../../../atoms/form-fields/SLFieldAutoComplete";
import { useHookFormContext } from "../../../../utils/hooks/useHookFormContext";
import { APIRoutes } from "../../../../constants";
import { useFetch } from "../../../../utils/hooks/useFetch";
import { useMemo } from "react";

type Props = {
  is_visible: boolean;
  projectId: string;
  disabled?: boolean;
};

const PeExpert = ({ is_visible, projectId, disabled }: Props) => {
  const { registerState } = useHookFormContext();
  const { data: experts_data } = useFetch(
    APIRoutes.peMapping +
      "?show_columns=fk_expert,expert_name&fk_project=" +
      projectId
  );

  const experts = useMemo(() => {
    return experts_data?.map((expert: any) => ({
      value: expert.fk_expert,
      label: expert.expert_name,
    }));
  }, [experts_data]);

  return (
    <>
      {/* expert */}
      {is_visible && (
        <Grid item xs={12} className={styles.inputRow}>
          <HookAutoComplete
            {...registerState("expert")}
            textFieldProps={{
              label: "Choose Expert",
              size: "small",
              disabled: disabled,
            }}
            rules={{
              required: { value: true, message: "This is required" },
              maxLength: {
                value: 70,
                message: "This should be less than 70 characters",
              },
            }}
            autocompleteProps={{
              isOptionEqualToValue: (option: any, value: any) =>
                option?.value === value?.value,
              size: "small",
              options: experts || [],
              noOptionsText: "Loading...",
              multiple: false,
              sx: { backgroundColor: "white" },
              renderOption: (props: any, option: any) => (
                <li {...props} key={option.value}>
                  {option?.label}
                </li>
              ),
              disabled: disabled
            }}
          />
        </Grid>
      )}
    </>
  );
};

export default PeExpert;
