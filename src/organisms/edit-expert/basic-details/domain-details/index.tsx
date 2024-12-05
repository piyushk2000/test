import { Grid } from "@mui/material";
import { useEffect } from "react";
import { useHookFormContext } from "../../../../utils/hooks/useHookFormContext";
import { useDomainFetch } from "../../../../utils/hooks/useFetchDomains";
import { HookAutoComplete } from "../../../../atoms/form-fields/SLFieldAutoComplete";
import { commonInputStyles } from "../../styles";
import { isExpert } from "../../../../utils/role";

const inputRowStyles = {
  padding: "5px"
}

const DomainDetails = () => {
  const { registerState, watch, setValue } = useHookFormContext();
  const { getOptionFromLevel } = useDomainFetch();
  const is_expert = isExpert();
  const [l0_domain_value, l1_domain_value, l2_domain_value] = watch([
    "l0_domain",
    "l1_domain",
    "l2_domain",
  ]);

  useEffect(() => {
    const subscription = watch((value, { name, type }) => {
      if (type === "change") {
        if (name === "l0_domain") {
          setValue("l1_domain", "");
          setValue("l2_domain", "");
          setValue("l3_domain", null);
        } else if (name === "l1_domain") {
          setValue("l2_domain", "");
          setValue("l3_domain", null);
          console.log(getOptionFromLevel("L2", value.l1_domain));
        } else if (name === "l2_domain") {
          setValue("l3_domain", null);
          console.log(getOptionFromLevel("L3", value.l2_domain));
        }
      }
    });
    return () => subscription.unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watch]);

  return (
    <>
      {
        !is_expert &&
        <>
          <Grid item sx={inputRowStyles} xs={6} md={3}>
            <HookAutoComplete
              {...registerState("l0_domain")}
              textFieldProps={{
                label: "L0 *",
                size: "small",
              }}
              rules={{
                required: { value: true, message: "This field is required" },
              }}
              autocompleteProps={{
                isOptionEqualToValue: (option: any, value: any) =>
                  option.value === value.value,
                size: "small",
                disablePortal: true,
                options: getOptionFromLevel("L0") || [],
                style: { backgroundColor: "white", ...commonInputStyles },
              }}
            />
          </Grid>

          <Grid item sx={inputRowStyles} xs={6} md={3}>
            <HookAutoComplete
              {...registerState("l1_domain")}
              textFieldProps={{
                label: "L1 *",
                size: "small",
              }}
              rules={{
                required: { value: true, message: "This field is required" },
              }}
              autocompleteProps={{
                isOptionEqualToValue: (option: any, value: any) =>
                  option.value === value.value,
                size: "small",
                disablePortal: true,
                options: getOptionFromLevel("L1", l0_domain_value?.value) || [],
                style: { backgroundColor: "white", ...commonInputStyles },
                disabled: !l0_domain_value,
              }}
            />
          </Grid>
          <Grid item sx={inputRowStyles} xs={6} md={3}>
            <HookAutoComplete
              {...registerState("l2_domain")}
              textFieldProps={{
                label: "L2 *",
                size: "small",
              }}
              rules={{
                required: { value: true, message: "This field is required" },
              }}
              autocompleteProps={{
                isOptionEqualToValue: (option: any, value: any) =>
                  option.value === value.value,
                size: "small",
                disablePortal: true,
                options: getOptionFromLevel("L2", l1_domain_value?.value) || [],
                style: { backgroundColor: "white", ...commonInputStyles },
                disabled: !l1_domain_value,
              }}
            />
          </Grid>
          <Grid item sx={inputRowStyles} xs={6} md={3}>
            <HookAutoComplete
              {...registerState("l3_domain")}
              textFieldProps={{
                label: "L3",
                size: "small",
              }}
              autocompleteProps={{
                isOptionEqualToValue: (option: any, value: any) =>
                  option.value === value.value,
                size: "small",
                disablePortal: true,
                options: getOptionFromLevel("L3", l2_domain_value?.value) || [],
                style: { backgroundColor: "white" },
                disabled: !l2_domain_value,
              }}
            />
          </Grid>
        </>
      }
    </>
  );
};

export default DomainDetails;
