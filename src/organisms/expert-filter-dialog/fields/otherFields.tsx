import Grid from "@mui/material/Grid";
import { HookTextField } from "../../../atoms/form-fields/SLFieldTextField";
import { useHookFormContext } from "../../../utils/hooks/useHookFormContext";
import { commonInputStyles, inputRow } from "../style";
import { useEffect } from "react";
import { isClient } from "../../../utils/role";

const OtherFields = () => {
  const { registerState, watch, setValue } = useHookFormContext();

  useEffect(() => {
    const subscription = watch((value, { name, type }) => {
      if (type === "change") {
        if (name === "no_of_calls") {
          const price =
            value.no_of_calls.length > 1
              ? Math.round(value.no_of_calls)
              : value.no_of_calls;
          setValue("no_of_calls", price);
        }

        if (name === "cost_min") {
          const price =
            value.cost_min.length > 1
              ? Math.round(value.cost_min)
              : value.cost_min;
          setValue("cost_min", price);
        }

        if (name === "cost_max") {
          const price =
            value.cost_max.length > 1
              ? Math.round(value.cost_max)
              : value.cost_max;
          setValue("cost_max", price);
        }
      }
    });

    return () => subscription.unsubscribe();
    // eslint-disable-next-line
  }, [watch]);

  return (
    <>
      {/* No of calls */}
      {!isClient() &&
        <Grid item xs={12} md={4} sx={inputRow}>
          <HookTextField
            {...registerState("no_of_calls")}
            textFieldProps={{
              ...commonInputStyles,
              label: "Minimum Calls Done",
              type: "number",
            }}
          />
        </Grid>
      }


      {/* Functions */}
      <Grid
        item
        xs={12}
        md={isClient() ? 8 : 6}
        sx={inputRow}
        alignItems={"flex-end"}
        display={"flex"}
      >
        <HookTextField
          {...registerState("functions")}
          textFieldProps={{
            ...commonInputStyles,
            label: "Functions",
          }}
        />
      </Grid>

      {/* Cost Price */}
      {!isClient() && <>
        <Grid item xs={3} sx={inputRow}>
          <HookTextField
            {...registerState("cost_min")}
            textFieldProps={{
              ...commonInputStyles,
              label: "Min Cost Price US$",
              type: "number",
            }}
          />
        </Grid>
        <Grid item xs={3} sx={inputRow}>
          <HookTextField
            {...registerState("cost_max")}
            textFieldProps={{
              ...commonInputStyles,
              label: "Max Cost Price US$",
              type: "number",
            }}
          />
        </Grid>
      </>}

    </>
  );
};

export default OtherFields;
