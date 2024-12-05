import { DefaultValues, FormInputProps } from "./helper";
import { SubmitHandler } from "react-hook-form";
import { useSnackbar } from "notistack";
import { APIRoutes } from "../../constants";
import { RequestServer } from "../../utils/services";
import { isValidType } from "../../utils/isValidType";
import { useFullPageLoading } from "../../atoms/full-page-loading/loadingContext";
import { removeWhiteSpacesFromForm } from "../../utils/utils";
import AddThroughLinkForm from "../add-through-link";

type Props = {
  handleSubmitClose: (linkedinData?: any) => void;
  handleClose: () => void;
  setChange?: () => void;
  mapped_project?: { label: string; value: number; } | null;
  refetch?:  (() => Promise<void>) | null
}

function AddExpertFormThroughLink(props: Props) {
  const { enqueueSnackbar } = useSnackbar();
  const { setLoading: setFullPageLoading } = useFullPageLoading();

  const onSubmit: SubmitHandler<FormInputProps> = async (formData: any) => {
    const newFormData = removeWhiteSpacesFromForm(formData, []);
    if (newFormData.source_link && !isValidType(newFormData.source_link, "url")) {
      enqueueSnackbar("Invalid source link", { variant: "warning" });
      return;
    }

    const payload = {
      source_link: newFormData?.source_link,
    };

    setFullPageLoading(true);

    try {
      const response = await RequestServer(
        `${APIRoutes.addExpertThroughLink}?source_link=${payload.source_link}`,
        "GET"
      );

      if (response?.success) {
        enqueueSnackbar(response?.message, {
          variant: "success",
        });

        props.handleSubmitClose && props.handleSubmitClose(response?.data);
      } else {
        enqueueSnackbar(response.message.toString(), { variant: "warning" });
      }
    } catch (err) {
      console.error({ err });
      enqueueSnackbar("Request failed.", { variant: "error" });
    } finally {
      setFullPageLoading(false);
    }
  };

  return (
    <AddThroughLinkForm
    onSubmit={onSubmit}
    handleClose={props.handleClose}
    
    />
  );
}

export default AddExpertFormThroughLink;
