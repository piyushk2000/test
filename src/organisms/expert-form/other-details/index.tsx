import { FC } from "react";
import Grid from "@mui/material/Grid";
import styles from "../add-expert.module.scss";
import { HookAutoComplete } from "../../../atoms/form-fields/SLFieldAutoComplete";
import { useHookFormContext } from "../../../utils/hooks/useHookFormContext";
import { HookTextField } from "../../../atoms/form-fields/SLFieldTextField";
import { commonInputStyles } from "../helper";

const OtherDetails: FC = () => {
  const { registerState } = useHookFormContext();

  return (
    <>
      <Grid className={styles.inputRow} item xs={12}>
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

      <Grid className={styles.inputRow} item xs={12}>
        <HookTextField
          {...registerState("internal_notes")}
          textFieldProps={{
            ...commonInputStyles,
            className: styles.description,
            label: "Internal Notes",
            multiline: true,
            rows: 2,
            style: { backgroundColor: "white" },
          }}
        />
      </Grid>

      <Grid className={styles.inputRow} item xs={12}>
        <HookTextField
          {...registerState("remarks_visible_to_client")}
          textFieldProps={{
            ...commonInputStyles,
            className: styles.description,
            label: "Remarks Visible to Client",
            multiline: true,
            rows: 2,
            style: { backgroundColor: "white" },
          }}
        />
      </Grid>

      <Grid className={styles.inputRow} item xs={12}>
        <HookAutoComplete
          {...registerState("offlimit_topics")}
          textFieldProps={{ label: "Off Limit Topics", size: "small" }}
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
          textFieldProps={{ label: "Off Limit Companies", size: "small" }}
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
