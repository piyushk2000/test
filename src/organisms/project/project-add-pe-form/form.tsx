import { FormProvider, useForm } from "react-hook-form";
import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material";
import Fields from "./fields";
import { AddPEFormContext } from "./helper";
import { useContext, useState } from "react";

const AddPEForm = (props: any) => {
  const { onSubmit, handleClose } = props;
  const [value, setValueRadio] = useState('single');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValueRadio((event.target as HTMLInputElement).value);
  };

  const { selectedExpert } = useContext(AddPEFormContext);
  const defaultValues = {
    expert: selectedExpert || null,
    relevant_company: null,
    project: null,
  };

 

  const methods = useForm({ defaultValues });

  const submit = (formData: any) => {
    onSubmit(formData, value);
    if (value == 'multiple') {
      methods.reset();
    }
  }

  const defaultTheme = createTheme({
    typography: {
      fontFamily: ["Montserrat"].join(","),
      fontSize: 12,
    },
    palette: {
      primary: {
        main: "#EC9324",
      },
    },
  });

  return (
    <FormProvider {...methods}>
      <ThemeProvider theme={defaultTheme}>
        <form onSubmit={methods.handleSubmit(submit)} noValidate>
          <Fields handleClose={handleClose} valueRadio={value} setValueRadio={handleChange} />
        </form>
      </ThemeProvider>
    </FormProvider>
  );
};

export default AddPEForm;
