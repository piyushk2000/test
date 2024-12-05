import Grid from "@mui/material/Grid";
import CustomBtnFilled from "../../atoms/form-molecules/CustomBtnFilled";
import { inputRow, submitbtnRow } from "./style";
import DomainFields from "./fields/domainFields";
import GeoFields from "./fields/geoFields";
import UserNExpertsFields from "./fields/usersNExpertsFields";
import SwitchFields from "./fields/switchFields";
import OtherFields from "./fields/otherFields";
import RadioFields from "./fields/radioFields";
import CompanyFilters from "./fields/companyFilters";
import { useHookFormContext } from "../../utils/hooks/useHookFormContext";
import { useEffect } from "react";
import { apiDataType } from "./helper";
import { isClient } from "../../utils/role";

type Props = {
  apiData: apiDataType;
  handleClose: () => void;
  handleFormChange: () => void;
}

const Fields = ({ apiData, handleClose, handleFormChange }: Props) => {
  const { domains, expert_geo, client_geo, users } = apiData;
  const { watch } = useHookFormContext();

  useEffect(() => {
    const subscription = watch((value, { name, type }) => {
      if (type === "change") {
        if (handleFormChange) {
          handleFormChange();
        }
      }
    });

    return () => subscription.unsubscribe();
  }, [watch]);

  return (
    <Grid container spacing={2} mt={"5px"}>
      {!isClient() && <UserNExpertsFields users={users} />}
      <DomainFields domains={domains} />
      <GeoFields expert_geo={expert_geo} client_geo={client_geo} />
      <OtherFields />
      {!isClient() && <>
        <RadioFields />
        <SwitchFields />
      </>}
      <CompanyFilters />

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
