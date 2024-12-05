import { FormProvider, useForm } from "react-hook-form";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Fields from "../add-group/fields";
import { useEffect } from "react";
import { useSnackbar } from "notistack";
import { APIRoutes } from "../../../constants";
import { RequestServer } from "../../../utils/services";
import { useOptionsFetch } from "../../../utils/hooks/useOptionsFetch";
import { addOfficedefaultValues,defaultValues,getEditDefaultValues } from "../add-group/helper";
import { removeWhiteSpacesFromForm } from "../../../utils/utils";

type Props = {
  handleClose: () => void;
  setFormChange: () => void;
  handleSubmitClose: (b: boolean) => void;
  data: any | null;
  setBackdrop: (b: boolean) => void;
  refetch?: (() => Promise<void>) | null;
};

const EditGroup = ({
  handleClose,
  setFormChange,
  data,
  handleSubmitClose,
  setBackdrop,
  refetch,
}: Props) => {
  const { apiData: userList } = useOptionsFetch(APIRoutes.adminUsers);
  // const [geoList, setGeoList] = useState<any>([]);
  const { enqueueSnackbar } = useSnackbar();
  const defualtData = getEditDefaultValues(data);
  const methods = useForm({ defaultValues:defualtData });

  const onSubmit = async (formData:addOfficedefaultValues) => {
    const newFormData = removeWhiteSpacesFromForm(formData, [])
    console.log(newFormData)
    let admins = newFormData.admins.map(
      (item: any) => item.value
    );

    console.log(admins.join(","))

    const payload = {
      "type": "Group", 
      "id":data.group_id.toString(),
      "label": newFormData.name, 
      "sublabel": admins.join(',') 
    };

    try {
      setBackdrop(true);

      const response = await RequestServer(
        APIRoutes.masters,
        "PATCH",
        payload
      );

      if (response.success) {
        enqueueSnackbar(response.message, {
          variant: "success",
        });
        handleSubmitClose(true);
      } else {
        console.log({ response });
        enqueueSnackbar(response.message.toString(), { variant: "warning" });
      }
    } catch (err) {
      console.error({ err });
      enqueueSnackbar("Request failed.", { variant: "error" });
    } finally {
      setBackdrop(false);
    }
  };

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

  useEffect(() => {
    // getGeoList(setGeoList);
  }, []);

  return (
    <FormProvider {...methods}>
      <ThemeProvider theme={defaultTheme}>
        <form onSubmit={methods.handleSubmit(onSubmit)} noValidate>
          <Fields
            handleClose={handleClose}
            geographiesList={userList}
            setFormChange={setFormChange}
          />
        </form>
      </ThemeProvider>
    </FormProvider>
  );
};

export default EditGroup;
