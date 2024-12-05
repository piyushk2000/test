import { Grid } from "@mui/material";
import FormCancelSubmitBtns from "../../../../../atoms/formCancelSubmitBtns";
import { useHookFormContext } from "../../../../../utils/hooks/useHookFormContext";
import { HookRadioButton } from "../../../../../atoms/form-fields/SLFieldRadioButton";
import { inputRowCommonStyles } from "../../../../../common/formStyles";
import { sendInviteFields, yesNoOptions } from "./helper";
import { APIRoutes } from "../../../../../constants";
import { useFetch } from "../../../../../utils/hooks/useFetch";

type Props = {
    project_id: string;
    handleClose: () => void;
    isMultiple: boolean;
}

const Fields = ({ project_id, handleClose, isMultiple }: Props) => {
    const { registerState } = useHookFormContext();
    const { data: ProjectData } = useFetch<[{ applicable_agenda_id: null | number }]>(APIRoutes.projects + "?show_columns=applicable_agenda_id&id=" + project_id)

    const isAgendaApplicable = ProjectData && Boolean(ProjectData[0].applicable_agenda_id);

    return (
        <Grid container spacing={2} sx={!isMultiple ? { marginTop: "10px" } : {}}>
            <Grid item xs={12} sx={inputRowCommonStyles}>
                <HookRadioButton
                    {...registerState("send_invite")}
                    label="Send invite via: *"
                    rules={{
                        required: { value: true, message: "This field is required" },
                    }}
                    radioGroupProps={{
                        style: { display: "flex", gap: "1rem" },
                    }}
                    fields={sendInviteFields}
                />
            </Grid>
            {isAgendaApplicable &&
                <Grid item xs={12} sx={inputRowCommonStyles}>
                    <HookRadioButton
                        {...registerState("share_agenda")}
                        label="Send Agenda:"
                        radioGroupProps={{
                            style: { display: "flex", gap: "1rem" },
                        }}
                        fields={yesNoOptions}
                        enableDeselect
                    />
                </Grid>
            }
            <FormCancelSubmitBtns
                handleClose={handleClose}
            />
        </Grid>
    )
}

export default Fields