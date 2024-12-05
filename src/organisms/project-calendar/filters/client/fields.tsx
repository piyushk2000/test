import Grid from "@mui/material/Grid";
import BasicAutocomplete from "../../../../molecules/autocompletes/basic-autocomplete";
import AccordionActionsButtons from "../common/accordianAction";
import { useProjectCalenderContext } from "../../../../pages/project-calendar/context";
import { formatLabelValue } from "../../../project-detail/helper";

type Props = {
  clearAllAction: () => void
}

const Fields = ({ clearAllAction }: Props) => {
  const { clientContactOptions } = useProjectCalenderContext();

  const formattedClientOptions = clientContactOptions?.map((item) =>
    formatLabelValue(item)
  );

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <BasicAutocomplete
            label="Client"
            registerName="client"
            options={formattedClientOptions}
            multiple
          />
        </Grid>
      </Grid>
      <AccordionActionsButtons
        clearAllAction={clearAllAction}
        selectAllAction={() => { }}
        checkedLength={1}
      />
    </>
  );
};

export default Fields;
