import CustomBtnFilled from "../../../atoms/form-molecules/CustomBtnFilled";
import styles from "../style.module.scss";
import Grid from "@mui/material/Grid";
import { docType } from "../helper";
import { useHookFormContext } from "../../../utils/hooks/useHookFormContext";
import { RequiredTextField } from "../../../molecules/input-components/RequiredTextField";
import { FileUpload } from "../../../molecules/input-components/FileUpload";
import BasicAutocomplete from "../../../molecules/autocompletes/basic-autocomplete";

export default function Fields(props: any) {
  const { watch } = useHookFormContext();

  const doc_type = watch("doc_type");

  return (
    <>
      <Grid item xs={12} md={12} className={styles.inputRow}>
        <BasicAutocomplete
          label="Document Type"
          registerName="doc_type"
          isRequired
          options={docType}
        />
      </Grid>

      {doc_type.value === "Other" && (
        <Grid item xs={12} sm={12} className={styles.inputRow}>
          <RequiredTextField id="other_doc" label="Please Specify" max={35} />
        </Grid>
      )}

      <Grid item xs={12} sm={12} className={styles.inputRow}>
        <FileUpload
          setUrl={props.setUrl}
          setLoading={props.setLoading}
          setController={props.setController}
        />
      </Grid>

      <Grid className={styles.actionRow} item xs={12}>
        <CustomBtnFilled
          label="cancel"
          variant="outlined"
          onClick={props.handleClose}
        />

        <CustomBtnFilled
          label="submit"
          variant="contained"
          buttonType="submit"
        />
      </Grid>
    </>
  );
}
