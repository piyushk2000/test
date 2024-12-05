import { FormProvider, useForm } from "react-hook-form";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { defaultFormTheme } from "../../../../../atoms/defaultFormTheme";
import Fields from "./fields";
import { useContext } from "react";
import { MapMultipleProjectContext } from "../../helper";
import { RequestServer } from "../../../../../utils/services";
import { APIRoutes } from "../../../../../constants";
import { useSnackbar } from "notistack";
import { removeWhiteSpacesFromForm } from "../../../../../utils/utils";

type Props = {
  name: string;
  id: number;
};

const ExpertsForm = (props: Props) => {
  const { enqueueSnackbar } = useSnackbar();
  const defaultValues = { relevant_company: null };
  const methods = useForm({ defaultValues });
  const { projectSelected, setBackdrop } = useContext(
    MapMultipleProjectContext
  );

  const onSubmit = async (formData: {
    relevant_company: {
      company: string;
      designation: string;
      label: string;
      value: number;
      location: string;
    } | null;
  }) => {
    const newFormData = removeWhiteSpacesFromForm(formData, [])
    if (!projectSelected) {
      enqueueSnackbar("Choose a project", {
        variant: "warning",
      });
      return;
    }

    const payload = {
      action: "Map",
      fk_project: projectSelected?.value,
      fk_expert: props.id,
      fk_workex: newFormData.relevant_company?.value,
      relevant_company: newFormData.relevant_company?.company,
      relevant_designation: newFormData.relevant_company?.designation,
      relevant_company_location: newFormData.relevant_company?.location,
      compliance_shared: false,
    };

    try {
      setBackdrop(true);
      const response = await RequestServer(
        APIRoutes.peMapping,
        "POST",
        payload
      );
      if (response.success) {
        enqueueSnackbar("Expert added.", {
          variant: "success",
        });
      } else {
        console.log({ response });
        enqueueSnackbar(response.message.toString(), {
          variant: "warning",
        });
      }
    } catch (err) {
      console.error({ err });
      enqueueSnackbar("Request failed.", { variant: "error" });
    } finally {
      setBackdrop(false);
    }
  };

  const defaultTheme = createTheme(defaultFormTheme);

  return (
    <FormProvider {...methods}>
      <ThemeProvider theme={defaultTheme}>
        <form onSubmit={methods.handleSubmit(onSubmit)} noValidate>
          <Fields name={props.name} id={props.id} />
        </form>
      </ThemeProvider>
    </FormProvider>
  );
};

export default ExpertsForm;
