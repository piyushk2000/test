import { FormProvider, useForm } from "react-hook-form";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Fields from "./fields";
import { useEffect, useState } from "react";
import { apiDataType, formDefaultValues, getApiData, getExpertFilterPayload } from "./helper";
import { useSnackbar } from "notistack";
import { AppRoutes } from "../../constants";
import { useNavigate } from "react-router-dom";
import { filterPayload } from "../../pages/Experts/types";
import { defaultFormTheme } from "../../atoms/defaultFormTheme";
import { removeWhiteSpacesFromForm } from "../../utils/utils";
import { useGetParams } from "../../utils/hooks/useGetParams";

const ExpertFilterForm = (props: any) => {
  const [apiData, setApiData] = useState<apiDataType>({
    domains: null,
    expert_geo: null,
    client_geo: null,
    users: null,
  });
  const {
    handleClose,
    defaultValues,
    setDefaultValues,
    handleSubmitClose,
    setFilterPayload,
    handleFormChange,
  } = props;
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const ce_mapping = useGetParams("ce_mapping");

  const onSubmit = (formData: any) => {
    const newFormData = removeWhiteSpacesFromForm(formData, [])
    /* ------------ VALIDATIONS --------------------- */
    if (newFormData.cost_min > newFormData.cost_max) {
      enqueueSnackbar(
        "USD Cost Price (min) should be smaller than USD Cost Price (max)",
        {
          variant: "warning",
        }
      );
    }
    /* ---------------------------------------------- */

    const payload: any = getExpertFilterPayload(newFormData);

    setFilterPayload((prev: any) => {
      let payloadFilter: filterPayload = {
        ...prev,
        advanceFilter: payload,
        isFilterChange: true,
      };
      return payloadFilter;
    });

    setDefaultValues(newFormData);
    navigate(AppRoutes.EXPERT_SEARCH + "?page=1" + (ce_mapping ? "&ce_mapping=" + ce_mapping : ""));
    handleSubmitClose();
  };

  const methods = useForm({ defaultValues });
  useEffect(() => {
    props.setFormResetFunction(() => {
      return () => {
        console.log("reset function calling")
        setDefaultValues(formDefaultValues)
        methods.reset(formDefaultValues)
      }
    })
  }, [])
  const defaultTheme = createTheme(defaultFormTheme);

  useEffect(() => {
    getApiData(setApiData);
  }, []);

  return (
    <>
      <FormProvider {...methods}>
        <ThemeProvider theme={defaultTheme}>
          <form onSubmit={methods.handleSubmit(onSubmit)} noValidate>
            <Fields
              handleClose={handleClose}
              apiData={apiData}
              handleFormChange={handleFormChange}
            />
          </form>
        </ThemeProvider>
      </FormProvider>
    </>
  );
};

export default ExpertFilterForm;
