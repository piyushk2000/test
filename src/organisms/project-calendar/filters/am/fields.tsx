import Grid from "@mui/material/Grid";
import BasicAutocomplete from "../../../../molecules/autocompletes/basic-autocomplete";
import AccordionActionsButtons from "../common/accordianAction";
import { useProjectCalenderFilterContext } from "../filterContext";

type Props = {
  clearAllAction: () => void
}

const Fields = ({ clearAllAction }: Props) => {
  const { formOptions } = useProjectCalenderFilterContext();

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <BasicAutocomplete
            label="Account Manager"
            registerName="am"
            options={formOptions.am || []}
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
