import { FormProvider, useForm } from "react-hook-form";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Fields from "./fields";
import { defaultFormTheme } from "../../../../atoms/defaultFormTheme";
import { projectDefaultValues } from "../types";
import { RequestServer } from "../../../../utils/services";
import { APIRoutes } from "../../../../constants";
import { selectedCardsTypes } from "../../../../pages/Experts/types";
import { useSnackbar } from "notistack";
import { useFullPageLoading } from "../../../../atoms/full-page-loading/loadingContext";
import { removeWhiteSpacesFromForm } from "../../../../utils/utils";

type Props = {
  handleClose(): void;
  selectedCards: selectedCardsTypes;
  handleStageSubmit: (res:any) => void;
}

const ProjectFieldForm = ({handleClose, selectedCards,handleStageSubmit}: Props) => {
  const {enqueueSnackbar} = useSnackbar();
  const { setLoading } = useFullPageLoading();

  const onSubmit = async (formData: projectDefaultValues) => {
    const newFormData = removeWhiteSpacesFromForm(formData, [])
    if (!newFormData.project?.value) {
      enqueueSnackbar("Project Id not Found",{
        variant: "warning"
      })
      return;
    }

    const payload = {
      fk_project: newFormData.project.value,
      fk_expert_ids: selectedCards.map((s) => s.value).join(",")
    }

    setLoading(true);
    try {
      const response = await RequestServer(`${APIRoutes.ADD_STAGING}`,"POST", payload );

      if(response.success) {
        enqueueSnackbar("Experts added to staging area",{
          variant: "success"
        });
        handleStageSubmit(response.data);
        handleClose();
      } else {
        console.log({response});
        enqueueSnackbar(response?.message || "Error occurred...",{
          variant: "warning"
        })
      }

    } catch(err) {
      enqueueSnackbar(err as string,{
        variant: "error"
      })
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  const defaultValues: projectDefaultValues = { project: null };
  const methods = useForm({ defaultValues });
  const defaultTheme = createTheme(defaultFormTheme);

  return (
    <FormProvider {...methods}>
      <ThemeProvider theme={defaultTheme}>
        <form onSubmit={methods.handleSubmit(onSubmit)} noValidate>
          <Fields handleClose={handleClose} />
        </form>
      </ThemeProvider>
    </FormProvider>
  );
};

export default ProjectFieldForm;
