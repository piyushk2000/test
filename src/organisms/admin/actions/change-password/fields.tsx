import { useEffect } from "react";
import { Props } from "."
import { useHookFormContext } from "../../../../utils/hooks/useHookFormContext";
import { Grid } from "@mui/material";
import { HookTextField } from "../../../../atoms/form-fields/SLFieldTextField";
import { commonInputStyles } from "../../../../common/input-styles";
import FormCancelSubmitBtns from "../../../../atoms/formCancelSubmitBtns";

const Fields = ({ handleClose, isChange }: Omit<Props, "handleSubmitClose" | "admin_id">) => {
    const { watch, registerState } = useHookFormContext();

    useEffect(() => {
        const subscription = watch((value: any, { name, type }: any) => {
            if (type === "change") {
                isChange((prev: any) => {
                    if (prev.isChange) {
                        return prev;
                    }

                    return {
                        ...prev,
                        isChange: true,
                    };
                });
            }
        });

        return () => subscription.unsubscribe();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [watch]);

    return (
        <Grid container spacing={2} mt={1}>
            <Grid item xs={12}>
                <HookTextField
                    {...registerState("new_pass")}
                    rules={{
                        required: { value: true, message: "This field is required" },
                    }}
                    textFieldProps={{
                        ...commonInputStyles,
                        label: "New Password",
                        required: true,
                        type: "password",
                    }}
                />
            </Grid>
            <Grid item xs={12}>
                <HookTextField
                    {...registerState("confirm_pass")}
                    rules={{
                        required: { value: true, message: "This field is required" },
                    }}
                    textFieldProps={
                        {
                            ...commonInputStyles,
                            label: "Confirm Password",
                            required: true,
                            type: "password"
                        }
                    }
                />
            </Grid>
            <FormCancelSubmitBtns
                handleClose={handleClose}
            />
        </Grid>
    )
}

export default Fields