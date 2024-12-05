import Grid from "@mui/material/Grid";
import { inputRow } from "../style";
import { HookAutoComplete } from "../../../atoms/form-fields/SLFieldAutoComplete";
import { useHookFormContext } from "../../../utils/hooks/useHookFormContext";
import { useEffect, useState } from "react";
import { CheckboxOptions, getClientOfficeOptions } from "../helper";

const ClientFields = ({ clientName, clientOffice }: any) => {
  const { registerState, watch, setValue } = useHookFormContext();
  const [office, setOffice] = useState<any>(null);
  const [officeLoading, setOfficeLoading] = useState<boolean>(false);

  const client_name_value = watch("client_name");

  useEffect(() => {
    setValue("client_office", []);

    getClientOfficeOptions(
      client_name_value?.value,
      clientOffice,
      setOffice,
      setOfficeLoading,
      client_name_value?.label
    );

    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [client_name_value]);

  useEffect(() => {
    if (clientOffice) {
      setOffice(clientOffice);
    }
  }, [clientOffice]);

  return (
    <>
      {/* Client Name */}
      <Grid item xs={12} md={6} sx={inputRow}>
        <HookAutoComplete
          {...registerState("client_name")}
          textFieldProps={{
            label: "Client Name",
            size: "small",
          }}
          autocompleteProps={{
            isOptionEqualToValue: (option: any, value: any) =>
              option?.value === value?.value,
            size: "small",
            options: clientName || [],
            noOptionsText: "Loading...",
            multiple: false,
            sx: { backgroundColor: "white" },
            renderOption: (props: any, option: any) => (
              <li {...props} key={option.value}>
                {option?.label}
              </li>
            ),
          }}
        />
      </Grid>

      {/*  Client Office */}
      <Grid item xs={12} md={6} sx={inputRow}>
        <HookAutoComplete
          {...registerState("client_office")}
          textFieldProps={{
            label: "Client Office",
            size: "small",
          }}
          autocompleteProps={{
            isOptionEqualToValue: (option: any, value: any) =>
              option?.value === value?.value,
            size: "small",
            options: office || [],
            loadingText: "Loading...",
            loading: officeLoading,
            noOptionsText: "No Options",
            disableCloseOnSelect: true,
            multiple: true,
            sx: { backgroundColor: "white" },
            renderOption: CheckboxOptions,
          }}
        />
      </Grid>
    </>
  );
};

export default ClientFields;
