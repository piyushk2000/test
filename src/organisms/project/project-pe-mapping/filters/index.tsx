import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material";
import Fields from "./fields";
import { defaultFormTheme } from "../../../../atoms/defaultFormTheme";
import { Dispatch, SetStateAction, useState } from "react";
import { DefaultValuesPeFilters, PeMappingFormOptions } from "./types";
import { expertStatusOptions } from "./helper";
import { removeWhiteSpacesFromForm } from "../../../../utils/utils";

type Props = {
  handleClose(): void;
  handleSubmitClose(): void;
  filterTextChange(s: string): void;
  handleFormChange(): void;
  defaultValues: DefaultValuesPeFilters;
  setDefaultValues: Dispatch<SetStateAction<DefaultValuesPeFilters>>;
};

const PEMappingFilterForm = ({
  handleClose,
  handleSubmitClose,
  filterTextChange,
  handleFormChange,
  defaultValues,
  setDefaultValues,
}: Props) => {
  const [formOptions, setFormOptions] = useState<PeMappingFormOptions>({
    statusFields: expertStatusOptions,
  });

  const onSubmit: SubmitHandler<DefaultValuesPeFilters> = async (formData) => {
    const newFormData = removeWhiteSpacesFromForm(formData, [])
    const stateFilter: string = newFormData.expert_status?.value
      ? `&expert_invitation=${newFormData.expert_status?.value}`
      : "";
    filterTextChange(stateFilter);
    handleSubmitClose();
    setDefaultValues(newFormData);
  };

  const methods = useForm({ defaultValues });

  const defaultTheme = createTheme(defaultFormTheme);

  return (
    <FormProvider {...methods}>
      <ThemeProvider theme={defaultTheme}>
        <form onSubmit={methods.handleSubmit(onSubmit)} noValidate>
          <Fields handleClose={handleClose} formOptions={formOptions} />
        </form>
      </ThemeProvider>
    </FormProvider>
  );
};

export default PEMappingFilterForm;
