import styles from "./../add-project.module.scss";
import { Grid } from "@mui/material";
import { HookAutoComplete } from "../../../atoms/form-fields/SLFieldAutoComplete";
import { useHookFormContext } from "../../../utils/hooks/useHookFormContext";

const OtherDetails = () => {
  const { registerState } = useHookFormContext();

  return (
    <>
      <Grid className={styles.inputRow} item xs={12}>
        <HookAutoComplete
          {...registerState("functions")}
          textFieldProps={{ label: "Functions*", size: "small" }}
          rules={{
            required: { value: true, message: "This field is required" },
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
      <Grid className={styles.inputRow} item xs={12}>
        <HookAutoComplete
          {...registerState("target_companies")}
          textFieldProps={{
            label: "Target Companies",
            size: "small",
            className: "backgroundWhite",
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
      <Grid className={styles.inputRow} item xs={12}>
        <HookAutoComplete
          {...registerState("offlimit_topics")}
          textFieldProps={{
            label: "Off Limit Topics",
            size: "small",
            className: "backgroundWhite",
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
      <Grid className={styles.inputRow} item xs={12}>
        <HookAutoComplete
          {...registerState("offlimit_companies")}
          textFieldProps={{
            label: "Off Limit Companies",
            size: "small",
            className: "backgroundWhite",
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
    </>
  );
};

export default OtherDetails;
