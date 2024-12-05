import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
// import classes from "./Autocomplete.module.scss";
import { useEffect } from "react";

type Props = {
  experts:any[];
  projectId: string | null;
  value: any;
  setValue: (value: { label: string; value: string }) => void;
  defaultId?: string | null;
};

export default function ExpertSelect({
  experts,
  projectId,
  value,
  setValue,
  defaultId,
}: Props) {
  
  useEffect(() => {
    if (defaultId) {
      const idefaultId = experts?.find(
        (expert: any) => +expert.value === +defaultId
      );

      if (idefaultId) {
        setValue(idefaultId);
      }
    }
  }, [experts]);

  return (
    <Autocomplete
      sx={{ backgroundColor: "white", minWidth: "200px" }}
      size="small"
      fullWidth
      autoHighlight
      disablePortal
      onChange={(e, data) => setValue(data)}
      value={value}
      clearOnEscape
      options={experts || []}
      isOptionEqualToValue={(option, value) => option.value === value}
      disabled={!!defaultId}
      readOnly={!!defaultId}
      renderInput={(params: any) => <RenderInput params={params} />}
    />
  );
}

const RenderInput = ({ params }: { params: any }) => {
  return (
    <TextField
      // className={classes.backgroudWhite}
      {...params}
      label={"Show Slots For Experts"}
      placeholder={"Show Slots For Experts"}
    />
  );
};
