import { Grid } from "@mui/material";
import BasicDetails from "./basic-details";
import OtherDetails from "./other-details";
import DomainDetails from "./domain-details/index";
import ProjectDetails from "./project-details";
import CustomBtnFilled from "../../atoms/form-molecules/CustomBtnFilled";
import styles from "./add-project.module.scss";
import { useHookFormContext } from "../../utils/hooks/useHookFormContext";
import { useEffect } from "react";

const AddProjectFields = (props: any) => {
  const { watch } = useHookFormContext();

  useEffect(() => {
    const subscription = watch((value, { name, type }) => {
      if (type === "change") {
        if (props.handleFormChange) {
          props.handleFormChange();
        }
      }
    });

    return () => subscription.unsubscribe();
    //eslint-disable-next-line
  }, []);

  return (
    <>
      <Grid container>
        <BasicDetails isLogExtension={props.isLogExtension} isEditProject={props.isEditProject} />
        <ProjectDetails />
        <DomainDetails />
        <OtherDetails />
        <Grid className={styles.actionRow} item xs={12}>
          <CustomBtnFilled
            label="cancel"
            variant="outlined"
            onClick={props.handleClose}
          />
          <CustomBtnFilled
            label={props.isLogExtension ? "Continue" : "submit"}
            variant="contained"
            buttonType="submit"
          />

        </Grid>
      </Grid>
    </>
  );
};

export default AddProjectFields;
