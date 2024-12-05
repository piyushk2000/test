import { Grid } from "@mui/material";
import BasicDetails from "./basic-details";
import OtherDetails from "./other-details";
import DomainDetails from "./domain-details/index";
import CustomBtnFilled from "../../atoms/form-molecules/CustomBtnFilled";
import styles from "./add-expert.module.scss";
import ProfessionalDetails from "./professional-details";
import ExpertDetails from "./expert-details";
import { useHookFormContext } from "../../utils/hooks/useHookFormContext";
import { useEffect } from "react";
import { useGeoFetch } from "../../utils/hooks/useGeoFetch";
import ProjectDetails from "./project-details";

const ExpertFields = (props: any) => {
  const { onlyCountryList: countryGeoList, allGeoList: geographiesList } = useGeoFetch();
  const { watch } = useHookFormContext();

  useEffect(() => {
    let subscription = watch((value, { name, type }) => {
      if (type === "change") {
        if (props?.setChange) {
          props?.setChange();
        }
      }
    });

    return () => subscription.unsubscribe();
    //eslint-disable-next-line
  }, [watch]);

  return (
    <>
      <Grid className={styles.formContainer} container>
        {geographiesList && countryGeoList && (
          <>
            <BasicDetails geographiesList={countryGeoList} />
            <ProjectDetails
              isMapped={props.isMapped}
              isEdit={props.isEdit}
            />
            <ProfessionalDetails
              isMapped={props.isMapped}
              geographiesList={geographiesList}
              workExperienceList={props?.workExperienceList || []}
              isEdit={props.isEdit}
            />
            <DomainDetails isEdit={props.isEdit} />
            <OtherDetails />
            <ExpertDetails />
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
        )}
      </Grid>
    </>
  );
};

export default ExpertFields;
