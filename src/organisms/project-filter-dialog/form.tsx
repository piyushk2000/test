import { FormProvider, useForm } from "react-hook-form";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useContext, useEffect, useState } from "react";
import Fields from "./fields";
import { getApiData, getProjectAdvanceFilterPayload } from "./helper";
import { ProjectContext } from "../../pages/Projects/helper";
import { useNavigate } from "react-router-dom";
import { AppRoutes } from "../../constants";
import { filterPayload } from "../../pages/Projects/types";
import { defaultFormTheme } from "../../atoms/defaultFormTheme";
import { removeWhiteSpacesFromForm } from "../../utils/utils";

const ProjectFilterForm = (props: any) => {
  const [apiData, setApiData] = useState<any>({
    users: null,
    client: null,
    clientOffice: null,
    geo: null,
    domains: null
  });
  const { handleClose, defaultValues, setDefaultValues, handleSubmitClose, handleFormChange } =
    props;
  const { setFilterPayload } = useContext(ProjectContext);
  const navigate = useNavigate();

  const onSubmit = (formData: any) => {
    const newFormData = removeWhiteSpacesFromForm(formData,[])
    const advanceFilterPayload: any = getProjectAdvanceFilterPayload(newFormData);
    setFilterPayload((filterPayload: filterPayload) => {
      filterPayload.advanceFilter = advanceFilterPayload;
      filterPayload.isFilterChange = true;
      return filterPayload;
    });

    console.log("form Data", formData);

    setDefaultValues(formData);
    navigate(AppRoutes.PROJECTS + "/all?page=1");
    handleSubmitClose();
  };

  const methods = useForm({ defaultValues });

  const defaultTheme = createTheme(defaultFormTheme);

  useEffect(() => {
    getApiData(setApiData);
  }, []);

  return (
    <>
      <FormProvider {...methods}>
        <ThemeProvider theme={defaultTheme}>
          <form onSubmit={methods.handleSubmit(onSubmit)} noValidate>
            <Fields handleClose={handleClose} apiData={apiData} handleFormChange={handleFormChange} />
          </form>
        </ThemeProvider>
      </FormProvider>
    </>
  );
};

export default ProjectFilterForm;
