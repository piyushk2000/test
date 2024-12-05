import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { ThemeProvider } from "@emotion/react";
import { Box, createTheme } from "@mui/material";
import Fields from "./fields";
import { Dispatch, SetStateAction } from "react";
import FormCancelSubmitBtns from "../../../../../atoms/formCancelSubmitBtns";
import { defaultFormTheme } from "../../../../../atoms/defaultFormTheme";
import { agendaContainer } from "../styles";
import { saveAgendaResponse, submitAgendaResponse } from "../../helper";
import AcceptInvitationActionButtons from "../../../../accept-invitation-form/action-buttons";
import { useSnackbar } from "notistack";
import { removeWhiteSpacesFromForm } from "../../../../../utils/utils";

type Props = {
  responses: saveAgendaResponse;
  setResponses: Dispatch<SetStateAction<saveAgendaResponse>>;
  handleClose: () => void;
  pe_id: number | null;
  setBackdrop: Dispatch<SetStateAction<boolean>> | ((loading: boolean) => void);
  handleSubmitClose: () => void;
  isAcceptInvitation?: boolean;
  invitationId?: string;
};

const SaveAgendaResponseForm = ({
  responses,
  setResponses,
  handleClose,
  pe_id,
  setBackdrop,
  handleSubmitClose,
  isAcceptInvitation,
  invitationId,
}: Props) => {
  let defaultValues: any = {};
  const { enqueueSnackbar } = useSnackbar();

  responses.forEach((res, index) => {
    defaultValues[`question-${index}`] = res.question;
    defaultValues[`answer-${index}`] = res.answer;
    defaultValues[`expert_note-${index}`] = res.expert_note;
  });

  const methods = useForm({ defaultValues });



  const onSubmit = async (formData: any) => {
    const newFormData = removeWhiteSpacesFromForm(formData, [])
    
    const agendaQuesResponse = responses.map((res, index) => ({
      question: newFormData[`question-${index}`],
      answer: newFormData[`answer-${index}`],
      expert_note: newFormData[`expert_note-${index}`] || null,
    }));

    pe_id &&
      (await submitAgendaResponse(
        agendaQuesResponse,
        pe_id,
        handleSubmitClose,
        setResponses,
        setBackdrop,
        enqueueSnackbar
      ));
  };

  const defaultTheme = createTheme(defaultFormTheme);

  return (
    <FormProvider {...methods}>
      <ThemeProvider theme={defaultTheme}>
        <form onSubmit={methods.handleSubmit(onSubmit)} noValidate>
          <Box sx={{ ...agendaContainer, padding: "20px 0 0", mb: "10px" }}>
            {responses.map((res, index) => (
              <Fields
                question={res.question}
                index={index}
                isLast={index === responses.length - 1}
                key={res.question + index}
              />
            ))}
          </Box>

          {isAcceptInvitation && invitationId ? (
            <AcceptInvitationActionButtons
              invitationId={invitationId}
              submitLabel="Submit"
              onSubmit={() => { }}
            />
          ) : (
            <FormCancelSubmitBtns handleClose={handleClose} />
          )}
        </form>
      </ThemeProvider>
    </FormProvider>
  );
};

export default SaveAgendaResponseForm;
