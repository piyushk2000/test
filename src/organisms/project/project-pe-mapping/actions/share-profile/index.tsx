import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material";
import Fields from "./fields";
import { formValues, shareProfileFormProps } from "./type";
import { defaultFormTheme } from "../../../../../atoms/defaultFormTheme";
import { useSnackbar } from "notistack";
import { RequestServer } from "../../../../../utils/services";
import { APIRoutes } from "../../../../../constants";
import { usePeMappingContext } from "../../helper";
import Loading from "../../../../../atoms/loading";
import { useFullPageLoading } from "../../../../../atoms/full-page-loading/loadingContext";
import { removeWhiteSpacesFromForm } from "../../../../../utils/utils";

const ShareProfileForm = ({
  pe_id,
  expert_id,
  handleClose,
  handleSubmitClose,
  handleChange,
  designation,
  company,
  is_agenda_respond,
  expertsData,
  defaultValues, location, setPeDialog, isUsedInBulk, setCurrentExpert, isBulkLast, rows, group }: shareProfileFormProps) => {

  const { enqueueSnackbar } = useSnackbar();
  const { refetch } = usePeMappingContext();
  const { setLoading } = useFullPageLoading();

  const onSubmit: SubmitHandler<formValues> = async (formData) => {

    const newFormData = removeWhiteSpacesFromForm(formData, [])

    if (!newFormData.snippets) {
      enqueueSnackbar("Please add Relevancy(ies) before sharing the profile with the client.", {
        variant: "warning"
      })
      return;
    }

    const { description: snippet, heading: snippet_title } = JSON.parse(newFormData.snippets);

    const payload = {
      action: "ShareProfile",
      id: pe_id, // pe_id
      cost_price: newFormData.cost_price,
      selling_price: newFormData.selling_price,
      selling_price_currency: newFormData.currency.value,
      time_multiplier: newFormData.multiplier?.value,
      snippet,
      snippet_title,
      ...(is_agenda_respond ? {share_agenda_responses: newFormData.share_agenda === "yes" ? true : false} : {})
    };

    setLoading(true);
    try {
      const response = await RequestServer(
        APIRoutes.peMapping,
        "PATCH",
        payload
      );
      if (response.success) {
        enqueueSnackbar("Profile shared.", {
          variant: "success",
        });
        if (!isUsedInBulk) {
          handleSubmitClose();
          refetch();

          // opening Expert details to page - copy to clipboard
          setPeDialog((prev) => ({
            ...prev,
            actions: {
              ...prev.actions,
              shareProfile: {
                ...prev.actions.shareProfile,
                email_format: true,
                snippet: snippet,
                expert_id: expert_id,
                company: company,
                designation: designation,
                charges: `${newFormData.currency.value} ${newFormData.selling_price}`,
                meta: response?.data?.meta
              }
            }
          }))
        } else {
          setCurrentExpert && setCurrentExpert({
            email_format: true,
            snippet: snippet,
            expert_id: expert_id,
            company: company,
            designation: designation,
            charges: `${newFormData.currency.value} ${newFormData.selling_price}`,
            meta: response?.data?.meta,
            pe_id: pe_id,
            location: location,
            is_agenda_respond: is_agenda_respond,
            expert_name: expertsData.name || "",
            badge: rows ? (rows.find(r => r.expert_id === expert_id)?.badge || null): null
          })
          // handleSubmitClose();
        }
      } else {
        console.log({ response });
        enqueueSnackbar(response.message.toString(), { variant: "warning" });
      }
    } catch (err) {
      console.error({ err });
      enqueueSnackbar("Request failed.", { variant: "error" });
    } finally {
      setLoading(false);
    }
  };

  const methods = useForm({ defaultValues });

  const defaultTheme = createTheme(defaultFormTheme);

  return (
    <FormProvider {...methods}>
      <ThemeProvider theme={defaultTheme}>
        <form onSubmit={methods.handleSubmit(onSubmit)} noValidate>
          {
            (expert_id && expertsData) ?
              <Fields
                expert_id={expert_id}
                handleClose={handleClose}
                handleChange={handleChange}
                designation={designation}
                company={company}
                is_agenda_respond={is_agenda_respond}
                expertsData={expertsData}
                location={location}
                isUsedInBulk={isUsedInBulk}
                isBulkLast={isBulkLast}
                group={group}
              /> :
              <Loading loading />
          }

        </form>
      </ThemeProvider>
    </FormProvider>
  );
};

export default ShareProfileForm;
