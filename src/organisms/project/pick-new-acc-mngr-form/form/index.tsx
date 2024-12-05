import { FormProvider, useForm } from "react-hook-form";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Fields from "./fields";
import { useContext } from "react";
import { RequestServer } from "../../../../utils/services";
import { useSnackbar } from "notistack";
import { APIRoutes } from "../../../../constants";
import { defaultFormTheme } from "../../../../atoms/defaultFormTheme";
import { Select } from "../../../project-cards/helper";
import { removeWhiteSpacesFromForm } from "../../../../utils/utils";

type Props = {
  selectedProjects: Select["selectedCards"];
  handleClose: () => void;
  allAccManagers: { label: string; value: number }[] | null;
  setBackdrop: any;
  refetch: () => void
};

const ChooseAccountManagerForm = ({
  selectedProjects,
  handleClose,
  allAccManagers,
  setBackdrop,
  refetch
}: Props) => {
  const { enqueueSnackbar } = useSnackbar();
  const defaultValues = { account_manager: null };
  const methods = useForm({ defaultValues });

  const onSubmit = async (formData: {
    account_manager: null | { label: string; value: number };
  }) => {
    const newFormData = removeWhiteSpacesFromForm(formData, [])
    const payload = {
      action: "Assign",
      account_manager: newFormData.account_manager?.value,
      projects: selectedProjects.map((d) => d.value).join(","),
    };
    try {
      setBackdrop(true);
      const response = await RequestServer(
        APIRoutes.projectAccountManager,
        "PATCH",
        payload
      );
      if (response.success) {
        enqueueSnackbar("Account manager changed", {
          variant: "success",
        });
        refetch()
        handleClose();
      } else {
        console.log({ response });
        enqueueSnackbar(response?.message?.toString(), {
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
          <Fields allAccManagers={allAccManagers || []} />
        </form>
      </ThemeProvider>
    </FormProvider>
  );
};

export default ChooseAccountManagerForm;
