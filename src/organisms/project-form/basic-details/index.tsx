import styles from "./../add-project.module.scss";
import { Checkbox, Grid } from "@mui/material";
import { HookTextField } from "../../../atoms/form-fields/SLFieldTextField";
import { useHookFormContext } from "../../../utils/hooks/useHookFormContext";
import { clientContactArr, commonInputStyles } from "../helper";
import { useEffect, useState } from "react";
import { useOptionsFetch } from "../../../utils/hooks/useOptionsFetch";
import { APIRoutes } from "../../../constants";
import { RequestServer } from "../../../utils/services";
import { formatData } from "../../../pages/Projects/helper";
import { HookAutoComplete } from "../../../atoms/form-fields/SLFieldAutoComplete";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import { HookRichTextField } from "../../../atoms/rich-text-editor/HookRichTextEditor";
import './test.scss';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

type Props = {
  isLogExtension: boolean | undefined;
  isEditProject: boolean | undefined;
}

const BasicDetails = ({ isLogExtension, isEditProject }: Props) => {
  const { registerState, watch, setValue } = useHookFormContext();
  const [billingOfficeList, setBillingOfficeList] = useState<any>([]);
  const [customerList, setCustomerList] = useState<any>([]);
  const {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    isLoading: clientLoading,
    apiData: clientsList,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    serverError: clientError,
  } = useOptionsFetch(APIRoutes.clients);
  const client_name_value = watch("client_id");
  const client_id = client_name_value?.value;

  useEffect(() => {
    const subscription = watch((value, { name, type }) => {
      if (type === "change") {
        if (name === "client_id") {
          setValue("billing_office", null);
          setValue("customer", []);
        }
      }
    });

    return () => subscription.unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watch]);

  useEffect(() => {
    fetchClientDetails(client_id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [client_id]);

  const fetchClientDetails = async (client_id: string) => {
    if (client_id) {
      try {
        let clientsData = await RequestServer(
          APIRoutes.clientOfficeUrl + "?client_id=" + client_id,
          "GET"
        );
        const data = formatData(clientsData?.data);
        setBillingOfficeList(data);

        let clientContacts = await RequestServer(
          APIRoutes.clientContactUrl + "?fkClient=" + client_id,
          "GET"
        );

        const data2 = clientContacts?.data?.map((client: clientContactArr) => ({
          label: `${client.name} - ${client.email}`,
          value: client.id
        }))
        setCustomerList(data2);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <>
      <Grid className={styles.inputRow} item xs={12}>
        <HookTextField
          {...registerState("topic")}
          rules={{
            required: { value: true, message: "This field is required" },
          }}
          textFieldProps={{
            ...commonInputStyles,
            label: "Subject",
            required: true,
            InputProps: {
              inputProps: {
                maxLength: "250",
              },
            },
          }}
        />
      </Grid>

      <Grid className={styles.inputRow} item xs={12}>
        <HookTextField
          {...registerState("external_topic")}
          rules={{
            required: { value: true, message: "This field is required" },
          }}
          textFieldProps={{
            ...commonInputStyles,
            label: "External Topic (Client & Expert)",
            required: true,
            InputProps: {
              inputProps: {
                maxLength: "250",
              },
            },
          }}
        />
      </Grid>

      <Grid className={styles.inputRow+" richFeildClassTest"} item xs={12}>
        <HookRichTextField
          {...registerState("description")}
          quillProps={{
            placeholder: "External Description (Need to be filled before inviting expert)",
          }}
        />
      </Grid>
      <Grid className={styles.inputRow} item xs={12}>
        <HookAutoComplete
          {...registerState("client_id")}
          textFieldProps={{
            label: (isLogExtension || isEditProject) ? "Client Name (read only)" : "Client Name *",
            size: "small",
          }}
          rules={{
            required: { value: true, message: "This field is required" },
          }}
          autocompleteProps={{
            isOptionEqualToValue: (option: any, value: any) =>
              option?.value === value?.value,
            size: "small",
            disablePortal: true,
            disabled: (isLogExtension || isEditProject),
            options: clientsList || [],
            style: { ...commonInputStyles, backgroundColor: "white" },
            renderOption: (props: any, option: any) => {
              return (
                <li {...props} key={option.value}>
                  {option.label}
                </li>
              );
            }
          }}
        />
      </Grid>

      <Grid className={styles.inputRow} item xs={12} md={6}>
        <HookAutoComplete
          {...registerState("billing_office")}
          textFieldProps={{
            label: "Billing Office",
            size: "small",
          }}
          autocompleteProps={{
            isOptionEqualToValue: (option: any, value: any) =>
              option?.value === value?.value,
            size: "small",
            disablePortal: true,
            disabled: !client_id,
            options: billingOfficeList,
            style: { backgroundColor: "white" },
          }}
        />
      </Grid>

      <Grid className={styles.inputRow} item xs={12} md={6}>
        <HookAutoComplete
          {...registerState("customer")}
          textFieldProps={{
            label: "Client Contact",
            size: "small",
          }}
          autocompleteProps={{
            isOptionEqualToValue: (option: any, value: any) =>
              option?.value === value?.value,
            size: "small",
            disablePortal: true,
            disabled: !client_id,
            options: customerList,
            multiple: true,
            disableCloseOnSelect: true,
            renderOption: (props, option: any, { selected }) => {
              return (
                <li {...props} key={option.value}>
                  <Checkbox
                    icon={icon}
                    checkedIcon={checkedIcon}
                    style={{ marginRight: 8 }}
                    checked={selected}
                  />
                  {option?.label}
                </li>
              );
            },
            style: { backgroundColor: "white" },
          }}
        />
      </Grid>
    </>
  );
};

export default BasicDetails;
