import Grid from "@mui/material/Grid";
import CustomBtnFilled from "../../atoms/form-molecules/CustomBtnFilled";
import { inputRow, submitbtnRow } from "./style";
import AdminUsersField from "./fields/adminUsersField";
import ClientFields from "./fields/clientFields";
import GeoFields from "./fields/geoFields";
import OtherFields from "./fields/otherFields";
import DomainFields from "./fields/domainFields";
import { useEffect } from "react";
import { useHookFormContext } from "../../utils/hooks/useHookFormContext";
import { isClient } from "../../utils/role";

const Fields = ({ handleClose, apiData, handleFormChange }: any) => {
  const { users, client_geo, expert_geo, client, clientOffice, domains, groups } = apiData;
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
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watch]);

  return (
    <Grid container spacing={2} mt={"5px"}>
      {!isClient()
        &&
        <>
          <AdminUsersField users={users} />
          <ClientFields clientName={client} clientOffice={clientOffice} />
          <GeoFields expert_geo={expert_geo} client_geo={client_geo} />
          <DomainFields domains={domains} />
        </>
      }

      <OtherFields groups={groups} />
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
