import Grid from "@mui/material/Grid"
import { HookAutoComplete } from "../../../../atoms/form-fields/SLFieldAutoComplete"
import { inputRowCommonStyles } from "../../../../common/formStyles"
import { useHookFormContext } from "../../../../utils/hooks/useHookFormContext"
import { useRescheduleCancelContext } from "./context"
import FormCancelSubmitBtns from "../../../../atoms/formCancelSubmitBtns"
import { HookRadioButton } from "../../../../atoms/form-fields/SLFieldRadioButton"
import { rescheduleCancelCall } from "./helper"
import { useEffect } from "react"


const Fields = () => {
    const { registerState, watch, setValue } = useHookFormContext();
    const { scheduleCalls, handleClose } = useRescheduleCancelContext();
    const [call_date_value, reschedule_or_cancel_value] = watch(["call_date", "reschedule_or_cancel"]);

    const handleClearBtn = () => {
        setValue("call_date", null);
    }

    useEffect(() => {
        if (scheduleCalls) {
            if (scheduleCalls.length === 1) {
                setValue("schedule_call", scheduleCalls[0])
            }
        }
    }, [scheduleCalls])

    return (
        <Grid container spacing={2} mt="2px">
            {/* Schedule Call */}
            <Grid item xs={12} sx={inputRowCommonStyles}>
                <HookAutoComplete
                    {...registerState("schedule_call")}
                    textFieldProps={{
                        label: "Pick one of the scheduled calls *",
                        size: "small",
                    }}
                    rules={{
                        required: { value: true, message: "This field is required" },
                    }}
                    autocompleteProps={{
                        isOptionEqualToValue: (option: any, value: any) =>
                            option?.value === value?.value,
                        size: "small",
                        options: scheduleCalls || [],
                        // loading: Boolean(scheduleCalls),
                        style: { backgroundColor: "white" },
                        renderOption: (props, option) => (
                            <li
                                {...props}
                                key={option.value}
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "0.5rem",
                                    width: "100%",
                                }}
                            >
                                <p style={{ width: "fit-content" }}>
                                    {option.label.split("|")[0]}
                                </p>
                                {"( "}
                                <p
                                    style={{
                                        whiteSpace: "nowrap",
                                        overflow: "hidden",
                                        textOverflow: "ellipsis",
                                        maxWidth: "60%",
                                    }}
                                >
                                    {option.label.split("|")[1]}
                                </p>
                                {" )"}
                            </li>
                        ),
                    }}
                />
            </Grid>

            {/* Reschedule or Cancel Call */}
            <Grid item xs={12} sx={inputRowCommonStyles}>
                <HookRadioButton
                    {...registerState("reschedule_or_cancel")}
                    label="Do you want to reschedule or cancel call? *"
                    radioGroupProps={{
                        sx: {
                            "& .MuiTypography-root": {
                                marginLeft: "-5px !important",
                            },
                        },
                    }}
                    rules={{
                        required: { value: true, message: "This field is required" },
                    }}
                    fields={rescheduleCancelCall}
                />
            </Grid>


            {/* SubmitBtns */}
            <FormCancelSubmitBtns
                handleClose={handleClose}
                submitLabel={reschedule_or_cancel_value === "reschedule" ? "ReSchedule Call" : "Cancel Call"}
            />
        </Grid>
    )
}

export default Fields