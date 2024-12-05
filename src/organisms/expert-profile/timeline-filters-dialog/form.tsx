import { FormProvider, useForm } from "react-hook-form";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useEffect, useState } from "react";
import Fields from "./fields";
import {
  DefaultValuesState,
  SetDefaultValuesState,
  getApiData,
} from "./helper";
import { LocalDayjs } from "../../../utils/timezoneService";
import { defaultFormTheme } from "../../../atoms/defaultFormTheme";
import { useSnackbar } from "notistack";
import { removeWhiteSpacesFromForm } from "../../../utils/utils";

type Props = {
  handleClose: () => void;
  setElementsData: (action: any, actor: any, date: string | null, filterAdded: boolean) => void;
  defaultValues: DefaultValuesState;
  setDefaultValues: SetDefaultValuesState;
};

const TimelineFilters = ({
  handleClose,
  setElementsData,
  defaultValues,
  setDefaultValues,
}: Props) => {
  const [apiData, setApiData] = useState<{
    users: { label: string; value: number }[];
  }>({
    users: [],
  });

  const { enqueueSnackbar } = useSnackbar();

  const onSubmit = (formData: DefaultValuesState) => {
    const newFormData = removeWhiteSpacesFromForm(formData, [])
    const {
      action,
      actor,
      greaterthanequalto___timeStamp,
      lessthanequalto___timeStamp,
    } = newFormData;

    let filterAdded: boolean = true;

    if (
      action.length === 0 &&
      !actor &&
      !greaterthanequalto___timeStamp &&
      !lessthanequalto___timeStamp
    ) {
      filterAdded = false;
    }

    let date: string = "";

    // VALIDATIONS ------------------------------------------- //

    // Before Date cannot be smaller than Afterdate
    if (LocalDayjs(lessthanequalto___timeStamp).isBefore(greaterthanequalto___timeStamp)) {
      enqueueSnackbar("'Before' date must follow 'After' date", {
        variant: "warning"
      })
      return;
    }

    // ------------------------------------------------------- //

    if (greaterthanequalto___timeStamp) {
      date += `&greaterthanequalto___timeStamp=${LocalDayjs(
        greaterthanequalto___timeStamp
      ).format("YYYY-MM-DD")}T00:00:00.000Z`;
    }

    if (lessthanequalto___timeStamp) {
      date += `&lessthanequalto___timeStamp=${LocalDayjs(
        lessthanequalto___timeStamp
      ).format("YYYY-MM-DD")}T23:59:59.000Z`;
    }

    setDefaultValues(newFormData);
    setElementsData(
      action?.map((a) => a?.value)?.join(","),
      actor?.value || null,
      date,
      filterAdded);
    handleClose();
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
            <Fields handleClose={handleClose} users={apiData.users} />
          </form>
        </ThemeProvider>
      </FormProvider>
    </>
  );
};

export default TimelineFilters;
