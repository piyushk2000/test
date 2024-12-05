import { Autocomplete, Grid } from "@mui/material";
import { inputRow } from "../style";
import { useGetOptions } from "../../../utils/hooks/useGetOptions";
import BasicAutocomplete from "../../../molecules/autocompletes/basic-autocomplete";
import ExpertSearchAsync from "../../../molecules/autocompletes/expert-search";
import ProjectSearchAsync from "../../../molecules/autocompletes/project-search";
import { statusOptions } from "../helper";

const UserNExpertsFields = () => {
  const { formattedData: adminOptions } = useGetOptions("admins");
  const { formattedData: clientOptions } = useGetOptions("clients");

  return (
    <>
      <Grid item xs={12} md={6} sx={inputRow}>
        <BasicAutocomplete
          registerName="research_analyst"
          label="Research Analyst"
          options={adminOptions}
          multiple
        />
      </Grid>

      <Grid item xs={12} md={6} sx={inputRow}>
        <BasicAutocomplete
          registerName="account_manager"
          label="Account Manager"
          options={adminOptions}
        />
      </Grid>

      <Grid item xs={12} md={6} sx={inputRow}>
        <BasicAutocomplete
          registerName="client"
          label="Client"
          options={clientOptions}
        />
      </Grid>
      <Grid item xs={12} md={6} sx={inputRow}>
        <ExpertSearchAsync registerName="expert" label="Expert" />
      </Grid>

      <Grid item xs={12} md={6} sx={inputRow}>
        <ProjectSearchAsync registerName="project" label="Project" />
      </Grid>

      <Grid item xs={12} md={6} sx={inputRow}>
        <BasicAutocomplete registerName="status" label="Status" multiple options={statusOptions} />
      </Grid>
    </>
  );
};

export default UserNExpertsFields;
