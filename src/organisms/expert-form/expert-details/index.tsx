import { FC, useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import styles from "../add-expert.module.scss";
import { HookRadioButton } from "../../../atoms/form-fields/SLFieldRadioButton";
import { useHookFormContext } from "../../../utils/hooks/useHookFormContext";
import {
  expertFields,
  isReferredFields,
  searchProjectOrExpert,
} from "../helper";
import { Button, Chip } from "@mui/material";
import TextfieldAsyncSearchHook from "../../../molecules/textfield-async-search/textfieldAsyncSearchHook";

const ExpertDetails: FC = () => {
  const { registerState, watch, setValue } = useHookFormContext();
  const [showExpertIdGrid, setExpertIdGrid] = useState<boolean>(false);
  const [expertOptions, setExpertOptions] = useState<any>([]);

  const is_referred_value = watch("is_referred");

  useEffect(() => {
    const subscription = watch((value, { name, type }) => {
      if (type === "change") {
        if (name === "is_referred") {
          if (value.is_referred === "no") {
            setExpertIdGrid(false);
            setValue("referred_by", null);
          } else if (value.is_referred === "yes") {
            setExpertIdGrid(true);
          }
        }
      }
    });

    return () => subscription.unsubscribe();
    // eslint-disable-next-line
  }, [watch]);

  useEffect(() => {
    if (is_referred_value === "yes") {
      setExpertIdGrid(true);
    } else {
      setExpertIdGrid(false);
    }
  }, []);

  return (
    <>
      <Grid item xs={12} className={`${styles.inputRow}`}>
        <HookRadioButton
          {...registerState("type_of_expert")}
          label="Type of Expert:*"
          rules={{
            required: { value: true, message: "This field is required" },
          }}
          radioGroupProps={{
            style: { display: "flex", gap: "1rem" },
          }}
          fields={expertFields}
        />
      </Grid>

      <Grid item xs={12} className={`${styles.inputRow}`}>
        <HookRadioButton
          {...registerState("is_referred")}
          label="Is this expert referred by someone?*"
          rules={{
            required: { value: true, message: "This field is required" },
          }}
          radioGroupProps={{
            style: { display: "flex", gap: "1rem" },
          }}
          fields={isReferredFields}
        />
      </Grid>

      {showExpertIdGrid && (
        <Grid item xs={12} className={styles.inputRow}>
          <TextfieldAsyncSearchHook
            registerStatename="referred_by"
            options={expertOptions}
            setOptions={(state: any) => setExpertOptions(state)}
            searchFunction={(inputValue: string) =>
              searchProjectOrExpert(inputValue, "expert")
            }
            label="Expert ID / Name"
            renderOption={(props: any, option: any) => {
              return (
                <li {...props} key={option.value}>
                  <Button variant="text" className={styles.projectsOptions}>
                    <Chip
                      className={styles.projectsChip}
                      label={`ID:${option?.value}`}
                    />
                    <Chip
                      className={styles.projectsChip}
                      label={option?.label}
                    />
                  </Button>
                </li>
              );
            }}
          />
        </Grid>
      )}
    </>
  );
};

export default ExpertDetails;
