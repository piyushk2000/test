import { useState } from "react";
import TextfieldAsyncSearchHook from "../../textfield-async-search/textfieldAsyncSearchHook";
import { searchProjectOrExpert } from "../../../organisms/expert-form/helper";
import { Button, Chip } from "@mui/material";
import { projectsChip, projectsOptions } from "../style";

type Props = {
  registerName: string;
  label: string;
};

export default function ProjectSearchAsync({ registerName, label }: Props) {
  const [projectOptions, setProjectOptions] = useState<any>([]);
  return (
    <TextfieldAsyncSearchHook
      registerStatename={registerName}
      options={projectOptions}
      searchFunction={(inputValue: string) =>
        searchProjectOrExpert(inputValue, "project")
      }
      setOptions={(state: any) => setProjectOptions(state)}
      label={label}
      isRequired={false}
      renderOption={(props: any, option: any) => {
        return (
          <li {...props} key={option.value}>
            <Button variant="text" sx={projectsOptions}>
              <Chip sx={projectsChip} label={`ID:${option?.value}`} />
              <Chip sx={projectsChip} label={option?.client_name} />
              <Chip sx={projectsChip} label={option?.label} />
            </Button>
          </li>
        );
      }}
    />
  );
}
