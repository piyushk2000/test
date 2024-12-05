import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
// import classes from "./Autocomplete.module.scss";
import Grid from "@mui/material/Grid";
import { Controller, useFormContext } from "react-hook-form";
import { useFetch } from "../../../utils/hooks/useFetch";
import { APIRoutes } from "../../../constants";
import { useMemo, useEffect } from "react";

type Props = {
  projectId: string | null;
  value: any,
  setValue: (value: {label: string, value: string}) => void;
  defaultId?: string | null;
};

export default function ExpertSelect({ projectId, value, setValue, defaultId}: Props) {
  const { data: experts_data } = useFetch(
    APIRoutes.peMapping +
      "?show_columns=fk_expert,expert_name&fk_project=" +
      projectId
  );

//   const [value, setValue] = useState<any>("");

  const experts = useMemo(() => {
    return experts_data?.map((expert: any) => ({
      value: expert.fk_expert,
      label: expert.expert_name,
    }));
  }, [JSON.stringify(experts_data)]);

  useEffect(() => {
    if (defaultId){
      const idefaultId = experts?.find((expert: any) => +expert.value === +defaultId)

      if (idefaultId){
        setValue(idefaultId)
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
      label={"Show Slots For"}
      placeholder={"Show Slots For"}
    />
  );
};
