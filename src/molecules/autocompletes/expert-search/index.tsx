import { useState } from "react";
import TextfieldAsyncSearchHook from "../../textfield-async-search/textfieldAsyncSearchHook";
import { searchProjectOrExpert } from "../../../organisms/expert-form/helper";
import { Button, Chip } from "@mui/material";
import { projectsChip, projectsOptions } from "../style";

type Props = {
  registerName: string;
  label: string;
};

export default function ExpertSearchAsync({ registerName, label }: Props) {
  const [expertOptions, setExpertOptions] = useState<any>([]);
  return (
    <TextfieldAsyncSearchHook
      registerStatename={registerName}
      options={expertOptions}
      setOptions={(state: any) => setExpertOptions(state)}
      searchFunction={(inputValue: string) =>
        searchProjectOrExpert(inputValue, "expert")
      }
      label={label}
      renderOption={(props: any, option: any) => {
        return (
          <li {...props} key={option.value}>
            <Button variant="text" sx={projectsOptions}>
              <Chip sx={projectsChip} label={`ID:${option?.value}`} />
              <Chip sx={projectsChip} label={option?.label} />
            </Button>
          </li>
        );
      }}
      isRequired={false}
    />
  );
}
