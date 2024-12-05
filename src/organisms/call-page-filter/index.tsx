import { formDefaultValues } from "./helper";
import DialogModal from "../../atoms/dialog";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Fields from "./fields";
import { FilterType, getQueryFromFilters } from "./helper";
import { defaultFormTheme } from "../../atoms/defaultFormTheme";
import { useGetParams } from "../../utils/hooks/useGetParams";
import { useImperativeHandle } from "react";
import { removeWhiteSpacesFromForm } from "../../utils/utils";

type expertFilterProps = {
  openDialog: boolean;
  handleClose: () => void;
  setQueryString: (query: string) => void;
  filterFormRef: React.MutableRefObject<any>
};

const MyCalendarFilter = ({
  openDialog,
  handleClose,
  setQueryString,
  filterFormRef
}: expertFilterProps) => {
  const client_id = useGetParams("client_id");
  const client_name = useGetParams("client_name");
  const expert_id = useGetParams("expert_id");
  const expert_name = useGetParams("expert_name");
  const onSubmit: SubmitHandler<FilterType> = (formData) => {
    const newFormData = removeWhiteSpacesFromForm(formData, [])
    const queryString = getQueryFromFilters(newFormData);
    setQueryString(queryString);
    handleClose();
  };


  const methods = useForm({ defaultValues: formDefaultValues(client_id, client_name, expert_id, expert_name) });


  useImperativeHandle(filterFormRef, () => ({
    resetForm: methods.reset,
  }), []);

  const defaultTheme = createTheme(defaultFormTheme);

  return (
    <DialogModal
      isOpen={openDialog}
      handleClose={handleClose}
      title="Advance Search"
    >
      <FormProvider {...methods}>
        <ThemeProvider theme={defaultTheme}>
          <form onSubmit={methods.handleSubmit(onSubmit)} noValidate>
            <Fields handleClose={handleClose} />
          </form>
        </ThemeProvider>
      </FormProvider>
    </DialogModal>
  );
};

export default MyCalendarFilter;
